import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAuthLoginComponent } from './company-auth-login.component';

describe('CompanyAuthLoginComponent', () => {
  let component: CompanyAuthLoginComponent;
  let fixture: ComponentFixture<CompanyAuthLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyAuthLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
