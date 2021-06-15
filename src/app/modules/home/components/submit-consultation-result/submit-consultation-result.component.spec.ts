import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitConsultationResultComponent } from './submit-consultation-result.component';

describe('SubmitConsultationResultComponent', () => {
  let component: SubmitConsultationResultComponent;
  let fixture: ComponentFixture<SubmitConsultationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitConsultationResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitConsultationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
