import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { PageLayout } from '../Enums/page-layout';
import { inject } from '@angular/core';
import { PageLayoutService } from '../services/page-layout.service';

export const setLayoutResolver = (inputLayoyt: PageLayout): ResolveFn<void> => {
    return (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
        inject(PageLayoutService).setLayout(inputLayoyt);
    };
};
