// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// export const appConfig: ApplicationConfig = {
//     providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
//         provideRouter(routes), provideClientHydration(withEventReplay())]
// };


import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import {
    provideClientHydration,
    withEventReplay,
} from '@angular/platform-browser';
import { globalInterceptor } from './core/interseptors/global.interceptor';
import { provideStore } from '@ngrx/store';
import { _store_ } from './store/store.store';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        provideHttpClient(withInterceptors([globalInterceptor])),
        provideStore(_store_)
    ],
};