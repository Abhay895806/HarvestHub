import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationRecord } from './rotation-record';

describe('RotationRecord', () => {
  let component: RotationRecord;
  let fixture: ComponentFixture<RotationRecord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotationRecord],
    }).compileComponents();

    fixture = TestBed.createComponent(RotationRecord);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
