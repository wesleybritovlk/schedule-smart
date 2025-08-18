import { Component, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompanyLoginFormComponent } from '../company-login-form/company-login-form.component';
import { CompanyRegisterFormComponent } from '../company-register-form/company-register-form.component';
import { ToastSnackBarComponent } from '../toast-snack-bar/toast-snack-bar.component';

@Component({
  selector: 'app-company-auth-panel',
  imports: [CompanyLoginFormComponent, CompanyRegisterFormComponent],
  templateUrl: './company-auth-panel.component.html',
  styleUrl: './company-auth-panel.component.scss'
})
export class CompanyAuthPanelComponent {
  toastMessage = signal<string | null>(null);
  toastSuccess = signal(false);
  toastError = signal<string | null>(null);

  isRegisterMode = signal(false);

  constructor(readonly snackBar: MatSnackBar, readonly router: Router) { }

  onToastChange(event: { message: string | null; success: boolean; error: string | null }) {
    ToastSnackBarComponent.open(this.snackBar, {
      message: event.message || '',
      error: event.error,
      success: event.success,
    });
  }

  goToRegister() {
    this.isRegisterMode.set(true);
  }

  goToLogin() {
    this.isRegisterMode.set(false);
  }
}
