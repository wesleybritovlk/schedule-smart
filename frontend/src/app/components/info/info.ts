import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { InfoService } from '../../services/schedulesmart/info.service';

@Component({
  selector: 'app-info',
  imports: [NgClass],
  templateUrl: './info.html',
  styleUrl: './info.scss'
})
export class Info implements OnInit {
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
