import { AfterContentInit, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { AllBooks } from '../../interfaces/all-books';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
    selector: 'app-home',
    imports: [NavbarComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class HomeComponent implements OnInit {
export class HomeComponent {
    constructor() {}

    private _ProductService = inject(ProductService);
    private _snackBar = inject(MatSnackBar);
    private _SpinnerService = inject(SpinnerService);

    ngOnInit(): void {
        this._SpinnerService.isEnabled = true;
        this._ProductService.getAllBooks().subscribe({
            next: (res) => {
                console.log(res);
                this._SpinnerService.isEnabled = false;
            }, 
            error: (e) => {
                this._snackBar.open(e.error?.message, "Undo");
                this._SpinnerService.isEnabled = false;
            },
            complete: () => {

            }
        });
    }
}

