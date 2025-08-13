import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAuthPanelComponent } from './company-auth-panel.component';

describe('CompanyAuthPanelComponent', () => {
  let component: CompanyAuthPanelComponent;
  let fixture: ComponentFixture<CompanyAuthPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyAuthPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAuthPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
