import { Component } from '@angular/core';
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'app-public-footer',
  imports: [InfoComponent],
  templateUrl: './public-footer.component.html',
  styleUrl: './public-footer.component.scss'
})
export class PublicFooterComponent {
  year: number = new Date().getFullYear();
}
