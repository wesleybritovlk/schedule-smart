import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-public-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './public-navbar.component.html',
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
