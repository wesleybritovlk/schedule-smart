import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLinkComponent } from './ui-link.component';

describe('UiLinkComponent', () => {
  let component: UiLinkComponent;
  let fixture: ComponentFixture<UiLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
