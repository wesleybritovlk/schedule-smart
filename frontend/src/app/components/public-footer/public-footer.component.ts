import { Component } from '@angular/core';
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'app-public-footer',
  imports: [InfoComponent],
  template: `
    <footer class="w-full text-center py-6 border-t-2 border-gray-200">
        <div class="text-sm text-gray-600 font-medium">
            &copy; {{ year }} wesleybritovlk
        </div>
        <div class="mt-4 flex justify-center">
            <app-info></app-info>
        </div>
    </footer>
  `,
  styleUrl: './public-footer.component.scss'
})
export class PublicFooterComponent {
  year: number = new Date().getFullYear();
}
