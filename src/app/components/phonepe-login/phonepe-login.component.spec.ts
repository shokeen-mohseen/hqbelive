import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonepeLoginComponent } from './phonepe-login.component';

describe('PhonepeLoginComponent', () => {
  let component: PhonepeLoginComponent;
  let fixture: ComponentFixture<PhonepeLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonepeLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonepeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
