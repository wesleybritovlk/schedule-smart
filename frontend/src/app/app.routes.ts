import { Routes } from '@angular/router';
import { authCompanyGuard } from './guards/auth-company-guard';
import { slugExistenceGuard, slugMatcher } from './guards/slug-existence-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/public-layout/public-layout').then(m => m.PublicLayout),
        loadChildren: () => Promise.resolve([
            {
                path: '',
                loadComponent: () => import('./pages/public-home/public-home.page').then(m => m.PublicHomePage)
            },
            {
                path: 'sobre',
                loadComponent: () => import('./pages/public-about/public-about.page').then(m => m.PublicAboutPage)
            }
        ])
    },
    {
        path: 'painel',
        loadComponent: () => import('./layouts/company-layout/company-layout').then(m => m.CompanyLayout),
        loadChildren: () => Promise.resolve([
            {
                path: '',
                canActivate: [authCompanyGuard],
                loadComponent: () => import('./pages/company-dashboard/company-dashboard.page').then(m => m.CompanyDashboardPage)
            },
            {
                path: 'entrar',
                loadComponent: () => import('./pages/company-auth/company-auth.page').then(m => m.CompanyAuthPage)
            }
        ])
    },
    {
        matcher: slugMatcher,
        canActivate: [slugExistenceGuard],
        loadComponent: () => import('./layouts/client-layout/client-layout').then(m => m.ClientLayout),
        loadChildren: () => Promise.resolve([
        ]),
    },
    { path: '**', loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent) },
];
