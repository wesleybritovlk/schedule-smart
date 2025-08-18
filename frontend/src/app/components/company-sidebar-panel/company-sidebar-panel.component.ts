import { AuthService } from '../../services/schedulesmart/auth.service';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UiButtonComponent } from "../ui-button/ui-button.component";
import { UiLinkComponent } from '../ui-link/ui-link.component';

@Component({
  selector: 'app-company-sidebar-panel',
  imports: [RouterLink, UiButtonComponent, UiLinkComponent],
  templateUrl: './company-sidebar-panel.component.html',
  styleUrl: './company-sidebar-panel.component.scss'
})
export class CompanySidebarPanelComponent {
  items = [
    {
      label: 'Dashboard',
      routerLink: '/painel'
    },
    {
      label: 'Perfil',
      routerLink: '/painel'
    },
    {
      label: 'Funcionários',
      routerLink: '/painel'
    },
    {
      label: 'Catálogo de produtos',
      routerLink: '/painel'
    },
    {
      label: 'Configurações',
      routerLink: '/painel'
    }
  ]
  constructor(readonly router: Router, readonly authService: AuthService) {}

  onLogout() {
    this.authService.logout('company');
    this.router.navigate(['/painel/entrar']);
  }
}
