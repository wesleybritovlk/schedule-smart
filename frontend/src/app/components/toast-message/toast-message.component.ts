import { Component, input } from '@angular/core';

@Component({
  selector: 'app-toast-message',
  imports: [],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.scss'
})
export class ToastMessageComponent {
  toastMessage = input<string | null>(null);
  toastSuccess = input(false);
  toastError = input<string | null>(null);
}
