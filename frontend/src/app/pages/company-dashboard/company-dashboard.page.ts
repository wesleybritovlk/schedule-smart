import { Component } from '@angular/core';
import { CompanySidebarPanelComponent } from '../../components/company-sidebar-panel/company-sidebar-panel.component';

@Component({
  selector: 'app-company-dashboard',
  imports: [CompanySidebarPanelComponent],
  templateUrl: './company-dashboard.page.html',
  styleUrl: './company-dashboard.page.scss'
})
export class CompanyDashboardPage {

}
