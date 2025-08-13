import { CommonModule } from '@angular/common';
import { Component, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/schedulesmart/auth.service';

@Component({
  selector: 'app-company-login-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-login-form.component.html',
  styleUrl: './company-login-form.component.scss'
})
export class CompanyLoginFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = signal(false);

  toastChange = output<{
    message: string | null;
    success: boolean;
    error: string | null;
  }>();
  registerClick = output<void>();

  constructor(
    readonly fb: FormBuilder,
    readonly auth: AuthService,
    readonly router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      cnpj: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  emitToastSuccess() {
    this.toastChange.emit({
      message: '✅ Login realizado com sucesso',
      success: true,
      error: null
    });
  }

  emitToastError(msg?: string) {
    this.toastChange.emit({
      message: '❌ Erro ao registrar',
      success: false,
      error: msg || 'Falha desconhecida'
    });
  }

  showCNPJError() {
    const control = this.form.get('cnpj');
    return control?.invalid && control?.touched;
  }

  showPasswordError() {
    const control = this.form.get('password');
    return control?.invalid && control?.touched;
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting.set(true);
      const { cnpj, password } = this.form.value;
      this.auth.companyLogin({ cnpj, password }).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.emitToastSuccess();
          setTimeout(() => this.router.navigate(['/painel']), 800);
        },
        error: err => {
          this.isSubmitting.set(false);
          this.emitToastError(err?.message);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
