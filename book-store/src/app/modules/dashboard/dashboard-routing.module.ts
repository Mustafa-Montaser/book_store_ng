import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: "",
        redirectTo: "books",
        // redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
    },
    {
        path: "books",
        loadComponent: () => import('./components/products-list/products-list.component').then(c => c.ProductsListComponent),
    },
    {
        path: "cart",
        loadComponent: () => import('./components/cart/cart.component').then(c => c.CartComponent),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
