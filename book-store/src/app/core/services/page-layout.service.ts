import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PageLayout } from '../Enums/page-layout';

@Injectable({
    providedIn: 'root'
})
export class PageLayoutService {
    constructor() { }

    layoutSubject = new Subject<PageLayout>();
    layout$ = this.layoutSubject.asObservable();

    setLayout(newLayout: PageLayout) {
        this.layoutSubject.next(newLayout);
    }
}
