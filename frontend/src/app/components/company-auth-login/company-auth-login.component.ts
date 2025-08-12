import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/schedulesmart/auth.service';

@Component({
  selector: 'app-company-auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './company-auth-login.component.scss',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md space-y-4">
        @if (toastMessage()) {
          <div
            class="p-4 rounded text-white font-medium"
            [class.bg-green-600]="toastSuccess()"
            [class.bg-red-600]="!toastSuccess()">
            {{ toastMessage() }}

            @if (!toastSuccess() && toastError()) {
              <div class="mt-2 text-sm text-red-100">{{ toastError() }}</div>
            }
          </div>
        }

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="bg-white p-8 rounded shadow-md space-y-6">
          <h2 class="text-2xl font-bold text-center text-gray-800">Login da Empresa</h2>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
            <input formControlName="cnpj" type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            @if (showCNPJError()) {
              <span class="text-red-600 text-sm">CNPJ inválido</span>
            }
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input formControlName="password" type="password"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            @if (showPasswordError()) {
              <span class="text-red-600 text-sm">Senha obrigatória</span>
            }
          </div>

          <button type="submit" [disabled]="form.invalid || isSubmitting()"
            class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400">
            Entrar
          </button>
        </form>
      </div>
    </div>
  `
})
export class CompanyAuthLoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = signal(false);
  toastMessage = signal<string | null>(null);
  toastSuccess = signal(false);
  toastError = signal<string | null>(null);

  constructor(
    readonly fb: FormBuilder,
    readonly auth: AuthService,
    readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cnpj: ['', Validators.required],
      password: ['', Validators.required]
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
      this.toastMessage.set(null);
      this.toastError.set(null);

      const { cnpj, password } = this.form.value;
      this.auth.companyLogin({ cnpj, password }).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.toastMessage.set('✅ Login realizado com sucesso');
          this.toastSuccess.set(true);
          setTimeout(() => this.router.navigate(['/painel']), 800); // Delay opcional p/ mostrar toast
        },
        error: err => {
          this.isSubmitting.set(false);
          this.toastMessage.set('❌ Erro ao logar');
          this.toastSuccess.set(false);
          this.toastError.set(err?.message || 'Falha desconhecida');
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
