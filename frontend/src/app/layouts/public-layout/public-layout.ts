import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicFooterComponent } from '../../components/public-footer/public-footer.component';
import { PublicNavbarComponent } from '../../components/public-navbar/public-navbar.component';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, PublicNavbarComponent, PublicFooterComponent],
  template: `
    <app-public-navbar></app-public-navbar>
      <main class="flex-1 flex items-center justify-center bg-gray-5">
        <div class="fade-wrapper">
          <router-outlet></router-outlet>
        </div>
      </main>
    <app-public-footer></app-public-footer>
  `,
  styleUrl: './public-layout.scss'
})
export class PublicLayout {

}
