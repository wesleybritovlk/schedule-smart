import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySidebarPanelComponent } from './company-sidebar-panel.component';

describe('CompanyMenuPanelComponent', () => {
  let component: CompanySidebarPanelComponent;
  let fixture: ComponentFixture<CompanySidebarPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanySidebarPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanySidebarPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
