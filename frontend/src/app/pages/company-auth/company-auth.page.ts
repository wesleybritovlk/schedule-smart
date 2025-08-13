import { Component } from '@angular/core';
import { CompanyAuthPanelComponent } from '../../components/company-auth-panel/company-auth-panel.component';
import { CompanyBluePanelComponent } from '../../components/company-blue-panel/company-blue-panel.component';

@Component({
  selector: 'app-company-auth',
  imports: [CompanyAuthPanelComponent, CompanyBluePanelComponent],
  templateUrl: './company-auth.page.html',
  styleUrl: './company-auth.page.scss'
})
export class CompanyAuthPage {

}
