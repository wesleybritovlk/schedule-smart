import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicFooterComponent } from '../../components/public-footer/public-footer.component';
import { PublicNavbarComponent } from '../../components/public-navbar/public-navbar.component';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, PublicNavbarComponent, PublicFooterComponent],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss'
})
export class PublicLayout {

}
