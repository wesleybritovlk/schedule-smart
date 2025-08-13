import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLoginFormComponent } from './company-login-form.component';

describe('CompanyLoginFormComponent', () => {
  let component: CompanyLoginFormComponent;
  let fixture: ComponentFixture<CompanyLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyLoginFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
