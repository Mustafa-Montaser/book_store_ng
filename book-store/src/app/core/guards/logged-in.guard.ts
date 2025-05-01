import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';


export const loggedInGuard: CanActivateFn = (route, state) => {
    let _Router = inject(Router);
    
    let guardActivate = false;

    if(
        (typeof window !== 'undefined' && typeof localStorage !== 'undefined') && 
        (localStorage.getItem("userToken") !== null || sessionStorage.getItem("userToken") !== null)
    ) {
        _Router.navigate(["/dashboard/home"]);
    } else {
        guardActivate = true;
    }

    return guardActivate;
};
