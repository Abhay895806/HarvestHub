# HarvestHub Backend Setup

## One-time setup

1. Make sure the existing MySQL database `harvesthub` is available on `localhost:3306`.
   This project does not create, drop, or recreate the database. Hibernate uses `update`
   so existing tables and records are preserved.
2. From the repository root, run `.\start-backend.ps1` in PowerShell. On the first run,
   the script copies `.env.example` to `auth-backend/.env` and stops with setup instructions.
3. Open `auth-backend/.env` and replace the `DB_PASSWORD` placeholder with the actual
   password for the configured MySQL user. Do not add quotes. The `.env` file is ignored
   by Git and must never be committed.

## Every later start

Open a PowerShell terminal at the repository root and run:

```powershell
.\start-backend.ps1
```

The script checks the MySQL Windows service, TCP port 3306, and local credentials, then
runs the Maven wrapper. It reports clear messages for stopped/unavailable MySQL, an
unknown database, or rejected credentials. Press Ctrl+C in the same terminal to stop
the backend.

The backend uses `jdbc:mysql://localhost:3306/harvesthub`, Spring Data JPA, and Hibernate
with `ddl-auto=update`. It serves APIs on port 8081. To start it directly instead of using
the script, first set `DB_USERNAME` and `DB_PASSWORD` in that PowerShell session, then run
`cd auth-backend` and `.\mvnw.cmd spring-boot:run`.
