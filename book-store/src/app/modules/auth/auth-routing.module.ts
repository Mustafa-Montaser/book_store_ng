import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent),
    },
    {
        path: "register",
        loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent),
    },
    {
        path: "forget-password",
        loadComponent: () => import('./components/forget-password/forget-password.component').then(c => c.ForgetPasswordComponent),
    },
    {
        path: "reset-password",
        loadComponent: () => import('./components/reset-password/reset-password.component').then(c => c.ResetPasswordComponent),
    },
    {
        path: "change-password",
        loadComponent: () => import('./components/change-password/change-password.component').then(c => c.ChangePasswordComponent),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
