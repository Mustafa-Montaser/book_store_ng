import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLayoutService } from './core/services/page-layout.service';
import { CommonModule } from '@angular/common';
import { PageLayout } from './core/Enums/page-layout';
import { AuthLayoutComponent } from './modules/auth/components/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './modules/dashboard/components/dashboard-layout/dashboard-layout.component';
import { ErrorLayoutComponent } from './shared/components/error-layout/error-layout.component';
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        CommonModule,
        AuthLayoutComponent,
        DashboardLayoutComponent,
        ErrorLayoutComponent,
        NotFoundComponent,
        SpinnerComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    constructor(
        public _PageLayoutService: PageLayoutService,
        public _SpinnerService: SpinnerService,
    ) {}
    readonly pageLayout = PageLayout;
}
