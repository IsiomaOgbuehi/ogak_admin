import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanGuarantorsComponent } from './loan-guarantors.component';

describe('LoanGuarantorsComponent', () => {
  let component: LoanGuarantorsComponent;
  let fixture: ComponentFixture<LoanGuarantorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanGuarantorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanGuarantorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
