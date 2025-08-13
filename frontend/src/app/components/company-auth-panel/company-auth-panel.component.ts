import { Component, signal } from '@angular/core';
import { CompanyLoginFormComponent } from '../company-login-form/company-login-form.component';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { CompanyRegisterFormComponent } from '../company-register-form/company-register-form.component';

@Component({
  selector: 'app-company-auth-panel',
  imports: [CompanyLoginFormComponent, CompanyRegisterFormComponent, ToastMessageComponent],
  templateUrl: './company-auth-panel.component.html',
  styleUrl: './company-auth-panel.component.scss'
})
export class CompanyAuthPanelComponent {
  toastMessage = signal<string | null>(null);
  toastSuccess = signal(false);
  toastError = signal<string | null>(null);

  isRegisterMode = signal(false);

  onToastChange(e: { message: string | null; success: boolean; error: string | null }) {
    this.toastMessage.set(e.message);
    this.toastSuccess.set(e.success);
    this.toastError.set(e.error);
  }

  goToRegister() {
    this.isRegisterMode.set(true);
  }

  goToLogin() {
    this.isRegisterMode.set(false);
  }
}
