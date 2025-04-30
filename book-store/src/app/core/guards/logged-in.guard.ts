import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';


export const loggedInGuard: CanActivateFn = (route, state) => {
    let _Router = inject(Router);
    
    let guardActivate = false;

    if(localStorage.getItem("userToken") !== null || sessionStorage.getItem("userToken") !== null) {
        _Router.navigate(["/dashboard/home"]);
    } else {
        guardActivate = true;
    }

    return guardActivate;
};
