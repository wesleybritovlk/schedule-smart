import { Routes } from '@angular/router';
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

