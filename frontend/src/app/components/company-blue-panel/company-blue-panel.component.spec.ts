import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBluePanelComponent } from './company-blue-panel.component';

describe('CompanyBluePanelComponent', () => {
  let component: CompanyBluePanelComponent;
  let fixture: ComponentFixture<CompanyBluePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyBluePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyBluePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
