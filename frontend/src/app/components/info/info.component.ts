import { Component, inject, OnInit, signal } from '@angular/core';
import { InfoService } from '../../services/schedulesmart/info.service';
@Component({
  selector: 'app-info',
  imports: [],
  template: `
    <div class="p-2 w-56">
      <div class="flex flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-gray-600 text-sm">API</span>
          <span class="w-3 h-3 rounded-full" [class]="{
            'bg-green-500': apiStatus() === 'UP',
            'bg-red-500': apiStatus() !== 'UP'
          }"></span>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-semibold text-gray-600 text-sm">Database</span>
          <span class="w-3 h-3 rounded-full" [class]="{
            'bg-green-500': dbStatus() === 'UP',
            'bg-red-500': dbStatus() !== 'UP'
          }"></span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit {
  readonly infoService = inject(InfoService);

  apiStatus = signal('DOWN');
  dbStatus = signal('DOWN');

  constructor() { }

  ngOnInit(): void {
    this.infoService.getApiInfo().subscribe({
      next: (response) => {
        this.apiStatus.set('UP');
        if (response.data.database === 'UP') {
          this.dbStatus.set('UP');
        }
      },
      error: (err) => {
        this.apiStatus.set('DOWN');
        this.dbStatus.set('DOWN');
      }
    });
  }

}