import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';
import { UiButtonComponent } from "../ui-button/ui-button.component";

@Component({
  selector: 'app-toast-snack-bar',
  templateUrl: './toast-snack-bar.component.html',
  styleUrls: ['./toast-snack-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [UiButtonComponent]
})
export class ToastSnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<ToastSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string; error?: string | null; success: boolean }
  ) { }

  static open(snackBar: MatSnackBar, data: { message: string; error?: string | null; success: boolean }) {
    snackBar.openFromComponent(ToastSnackBarComponent, {
      data,
      duration: 3000,
      panelClass: ['toast-snackbar-container']
    });
  }
}
