$ErrorActionPreference = 'Stop'

$backendDir = Join-Path $PSScriptRoot 'auth-backend'
$envExample = Join-Path $backendDir '.env.example'
$envFile = Join-Path $backendDir '.env'
$mavenWrapper = Join-Path $backendDir 'mvnw.cmd'

if (-not (Test-Path -LiteralPath $backendDir -PathType Container)) {
    Write-Host "Backend folder not found: $backendDir" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path -LiteralPath $envFile -PathType Leaf)) {
    if (-not (Test-Path -LiteralPath $envExample -PathType Leaf)) {
        Write-Host "Configuration template not found: $envExample" -ForegroundColor Red
        exit 1
    }

    Copy-Item -LiteralPath $envExample -Destination $envFile
    Write-Host 'Created auth-backend\.env from the template.' -ForegroundColor Yellow
    Write-Host 'Edit DB_PASSWORD in that file with your actual local MySQL password, then run this script again.' -ForegroundColor Yellow
    exit 2
}

$config = @{}
foreach ($line in Get-Content -LiteralPath $envFile) {
    $trimmedLine = $line.Trim()
    if (-not $trimmedLine -or $trimmedLine.StartsWith('#')) {
        continue
    }

    if ($trimmedLine -match '^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$') {
        $config[$Matches[1]] = $Matches[2].Trim()
    }
}

$dbUsername = if ($config.ContainsKey('DB_USERNAME') -and $config['DB_USERNAME']) { $config['DB_USERNAME'] } else { 'root' }
$dbPassword = $config['DB_PASSWORD']
if (-not $dbPassword -or $dbPassword -match '^replace_with_') {
    Write-Host 'DB_PASSWORD is missing or still contains the template value in auth-backend\.env.' -ForegroundColor Red
    Write-Host 'Edit that file with the actual MySQL password (without quotes), then run this script again.' -ForegroundColor Yellow
    exit 2
}

$mysqlServices = @(Get-Service -ErrorAction SilentlyContinue | Where-Object {
    $_.Name -match '^MySQL' -or $_.DisplayName -match 'MySQL'
})
$runningMysql = @($mysqlServices | Where-Object Status -eq 'Running')

if ($runningMysql.Count -eq 0 -and $mysqlServices.Count -gt 0) {
    foreach ($service in $mysqlServices) {
        try {
            Start-Service -Name $service.Name -ErrorAction Stop
            $service.WaitForStatus('Running', [TimeSpan]::FromSeconds(20))
            $runningMysql = @($service)
            break
        }
        catch {
            # Report a concise service instruction below; do not expose environment values.
        }
    }
}

if ($mysqlServices.Count -eq 0) {
    Write-Host 'No MySQL Windows service was found. Install MySQL Server or start the service, then retry.' -ForegroundColor Red
    exit 1
}

if ($runningMysql.Count -eq 0) {
    $serviceNames = ($mysqlServices | ForEach-Object Name) -join ', '
    Write-Host "MySQL service is stopped ($serviceNames), and could not be started automatically." -ForegroundColor Red
    Write-Host "Start it from Windows Services or run Start-Service <service-name> in an Administrator PowerShell, then retry." -ForegroundColor Yellow
    exit 1
}

if (-not (Test-NetConnection -ComputerName localhost -Port 3306 -InformationLevel Quiet -WarningAction SilentlyContinue)) {
    Write-Host 'MySQL service is running, but localhost:3306 is not accepting TCP connections.' -ForegroundColor Red
    Write-Host 'Check the MySQL listener/port configuration; the script will not create or modify a database.' -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path -LiteralPath $mavenWrapper -PathType Leaf)) {
    Write-Host "Maven wrapper not found: $mavenWrapper" -ForegroundColor Red
    exit 1
}

$oldDbUsername = $env:DB_USERNAME
$oldDbPassword = $env:DB_PASSWORD
$oldDbUrl = $env:DB_URL
$logFile = Join-Path $env:TEMP "harvesthub-backend-startup-$PID.log"
$mavenExitCode = 0

try {
    $env:DB_USERNAME = $dbUsername
    $env:DB_PASSWORD = $dbPassword
    Push-Location $backendDir
    Write-Host 'MySQL service and TCP port are available. Starting HarvestHub on port 8081...' -ForegroundColor Green
    & $mavenWrapper spring-boot:run 2>&1 | Tee-Object -FilePath $logFile
    $mavenExitCode = $LASTEXITCODE
}
finally {
    if ((Get-Location).Path -eq $backendDir) {
        Pop-Location
    }
    $env:DB_USERNAME = $oldDbUsername
    $env:DB_PASSWORD = $oldDbPassword
    $env:DB_URL = $oldDbUrl
}

$startupLog = if (Test-Path -LiteralPath $logFile) { Get-Content -LiteralPath $logFile -Raw } else { '' }
if ($startupLog -match "Access denied for user") {
    Write-Host 'MySQL rejected the configured username/password. Correct DB_USERNAME or DB_PASSWORD in auth-backend\.env.' -ForegroundColor Red
    exit 1
}
if ($startupLog -match "Unknown database ['`"]?harvesthub") {
    Write-Host "The MySQL server is reachable, but the existing 'harvesthub' database was not found. No database was created or changed." -ForegroundColor Red
    exit 1
}
if ($startupLog -match 'Communications link failure|CommunicationsException|Connection refused|Could not connect') {
    Write-Host 'The application could not connect to MySQL. Check that MySQL is listening on localhost:3306.' -ForegroundColor Red
    exit 1
}
if ($startupLog -notmatch 'Started HarvesthubApplication') {
    Write-Host "HarvestHub did not report a successful startup (Maven exit code $mavenExitCode). Review the output above." -ForegroundColor Red
    Write-Host "Startup output was also saved to: $logFile" -ForegroundColor Yellow
    exit 1
}
