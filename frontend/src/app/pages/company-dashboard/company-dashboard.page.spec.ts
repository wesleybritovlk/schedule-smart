import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardPage } from './company-dashboard.page';

describe('CompanyDashboardPage', () => {
  let component: CompanyDashboardPage;
  let fixture: ComponentFixture<CompanyDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyDashboardPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
