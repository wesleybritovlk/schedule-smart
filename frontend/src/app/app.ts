import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Info } from './components/info/info';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Info],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
