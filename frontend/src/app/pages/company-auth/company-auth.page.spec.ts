import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAuthPage } from './company-auth.page';

describe('CompanyAuthPage', () => {
  let component: CompanyAuthPage;
  let fixture: ComponentFixture<CompanyAuthPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyAuthPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
