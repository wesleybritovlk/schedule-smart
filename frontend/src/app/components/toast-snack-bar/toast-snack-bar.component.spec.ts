import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastSnackBarComponent } from './toast-snack-bar.component';

describe('ToastSnackBarComponent', () => {
  let component: ToastSnackBarComponent;
  let fixture: ComponentFixture<ToastSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastSnackBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
