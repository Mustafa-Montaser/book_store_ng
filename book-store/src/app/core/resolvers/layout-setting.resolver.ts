import { ResolveFn } from '@angular/router';
import { PageLayoutService } from '../services/page-layout.service';
import { inject } from '@angular/core';
import { PageLayout } from '../Enums/page-layout';

export const layoutSettingResolver: ResolveFn<boolean> = (route, state) => {
    if(typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const _PageLayoutService = inject(PageLayoutService);
        const token: string | null = !!localStorage.getItem('userToken') ?
            localStorage.getItem('userToken') : sessionStorage.getItem('userToken');
    
        // Set layout in a signal or subject
        _PageLayoutService.setLayout(!!token ? PageLayout.AUTHORIZED : PageLayout.UNAUTHORIZED);
    }
    
    return true;
};
