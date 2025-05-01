import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';
import { PageLayoutService } from '../services/page-layout.service';
import { PageLayout } from '../Enums/page-layout';

export const authGuard: CanActivateFn = (route, state) => {
    let _Router = inject(Router);
    let _snackBar = inject(MatSnackBar);
    
    let guardActivate = false;
    
    if(
        (typeof window !== 'undefined' && typeof localStorage !== 'undefined') && 
        (localStorage.getItem("userToken") !== null || sessionStorage.getItem("userToken") !== null)
    ) {
        guardActivate = true;        
    } else {
        _Router.navigate(["/auth/login"]);
        _snackBar.open("PLZ login first !!", "Undo", {
            duration: 3000
        });
    }

    return guardActivate;
};
