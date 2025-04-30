import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { PageLayout } from '../Enums/page-layout';

@Injectable({
    providedIn: 'root'
})
export class PageLayoutService {
    constructor() { }

    private _layout = signal<PageLayout>(PageLayout.START);
    layout = this._layout.asReadonly();

    setLayout(pgLayout: PageLayout) {
        this._layout.set(pgLayout);
    }

    
    // pageLayout: PageLayout = PageLayout.START;

    // layoutSubject = new Subject<PageLayout>();
    // layout$ = this.layoutSubject.asObservable();

    // setLayout(newLayout: PageLayout) {
    //     this.layoutSubject.next(newLayout);
    // }
}
