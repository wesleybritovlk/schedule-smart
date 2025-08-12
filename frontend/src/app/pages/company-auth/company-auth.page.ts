import { Component } from '@angular/core';
import { CompanyAuthLoginComponent } from '../../components/company-auth-login/company-auth-login.component';

@Component({
  selector: 'app-company-auth',
  imports: [CompanyAuthLoginComponent],
  template: `<app-company-auth-login></app-company-auth-login>`,
  styleUrl: './company-auth.page.scss'
})
export class CompanyAuthPage {

}
