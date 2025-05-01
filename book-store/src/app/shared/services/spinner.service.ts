import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    constructor() { }

    private isEnabled = signal<boolean>(false);

    enable() {
        this.isEnabled.set(true);
    }

    disable() {
        this.isEnabled.set(false);
    }

    status(): boolean {
        return this.isEnabled();
    }


    // isEnabled: boolean = false;
}
