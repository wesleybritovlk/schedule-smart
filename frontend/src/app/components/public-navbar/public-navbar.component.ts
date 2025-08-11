import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-public-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="border-b border-gray-200 shadow-sm px-6 py-4 flex justify-between items-center">
      <a [routerLink]="['/']" class="text-lg font-bold tracking-wide text-gray-800 hover:text-blue-600 transition-colors">
        Schedule Smart
      </a>
      <div class="flex gap-3 text-sm">
        <a [routerLink]="['/']"
          routerLinkActive="text-white" #home="routerLinkActive"
          [routerLinkActiveOptions]="{ exact: true }"
          [class]="routeState(home.isActive)"
          class="px-4 py-2 rounded-md border transition-all duration-200">
          Início
        </a>
        <a [routerLink]="['/sobre']"
          routerLinkActive="text-white" #about="routerLinkActive"
          [class]="routeState(about.isActive)"
          class="px-4 py-2 rounded-md border transition-all duration-200">
          Sobre
        </a>
        <a [routerLink]="['/painel']"
          routerLinkActive="text-white" #panel="routerLinkActive"
          [class]="routeState(panel.isActive)"
          class="px-4 py-2 rounded-md border transition-all duration-200">
          Minha Empresa
        </a>
      </div>
    </nav>
  `,
  styleUrl: './public-navbar.component.scss'
})
export class PublicNavbarComponent {
  routeState(isActive: boolean): string {
    const base = 'hover:bg-blue-600 hover:text-white';
    const active = 'bg-blue-600 border-blue-400';
    const inactive = 'bg-white text-gray-700 border-gray-300';
    return `${isActive ? active : inactive} ${base}`;
  }
}
