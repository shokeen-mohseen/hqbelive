import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPhonepeComponent } from './verify-phonepe.component';

describe('VerifyPhonepeComponent', () => {
  let component: VerifyPhonepeComponent;
  let fixture: ComponentFixture<VerifyPhonepeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyPhonepeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPhonepeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
