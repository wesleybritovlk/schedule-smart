import { CommonModule } from '@angular/common';
import { Component, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, CompanyRegister } from '../../services/schedulesmart/auth.service';

@Component({
  selector: 'app-company-register-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-register-form.component.html',
  styleUrl: './company-register-form.component.scss'
})
export class CompanyRegisterFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = signal(false);

  toastChange = output<{ message: string | null; success: boolean; error: string | null }>();
  backToLogin = output<void>();

  constructor(
    readonly fb: FormBuilder,
    readonly auth: AuthService,
    readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cnpj: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      legal_name: ['', Validators.required],
      slug: ['', Validators.required],
      contact_full_name: ['', Validators.required],
      contact_email: ['', [Validators.required, Validators.email]],
      contact_phone: ['', Validators.required]
    });
  }

  hasError(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }

  emitToastSuccess() {
    this.toastChange.emit({
      message: '✅ Registro realizado com sucesso',
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

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting.set(true);

      const payload: CompanyRegister = this.form.value;
      this.auth.companyRegister(payload).subscribe({
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
