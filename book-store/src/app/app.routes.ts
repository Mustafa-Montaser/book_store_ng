import { Routes } from '@angular/router';
import { setLayoutResolver } from './core/resolvers/set-layout.resolver';
import { PageLayout } from './core/Enums/page-layout';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "auth",
        pathMatch: "full"
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
        resolve: { layout: setLayoutResolver(PageLayout.UNAUTHORIZED) }
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        resolve: { layout: setLayoutResolver(PageLayout.AUTHORIZED) }
    },
    {
        path: '**',
        loadComponent: () => import('./shared/components/not-found/not-found.component').then(c => c.NotFoundComponent),
        resolve: { layout: setLayoutResolver(PageLayout.ERROR) }
    },
];
