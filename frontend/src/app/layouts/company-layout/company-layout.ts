import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-company-layout',
  imports: [RouterOutlet],
  template: `
    <p>
      company-layout works!
    </p>
    <router-outlet></router-outlet>
  `,
  styleUrl: './company-layout.scss'
})
export class CompanyLayout {

}
