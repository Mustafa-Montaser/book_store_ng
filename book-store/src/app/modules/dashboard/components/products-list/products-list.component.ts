import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';

import { AllBooks, Book } from '../../interfaces/all-books';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-products-list',
    imports: [CommonModule, MatIconModule, RouterLink],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {

    private _ProductService = inject(ProductService);
    private _MatSnackBar = inject(MatSnackBar);
    private _SpinnerService = inject(SpinnerService);
    private _CartService = inject(CartService);

    private _books = signal<AllBooks | null>(null);
    public books = this._books.asReadonly();
    
    ngOnInit(): void {
        this._SpinnerService.enable();
        this._ProductService.getAllBooks().subscribe({
            next: (res) => {
                this._books.set(res);
                this._SpinnerService.disable();
            },
            error: (e) => {
                this._MatSnackBar.open(e.error?.message, "Undo");
                this._SpinnerService.disable();
            },
            complete: () => {
                // 
            }
        });
    }

    addBookToCart(book: Book) {
        this._SpinnerService.enable();
        this._CartService.addItem({book: book._id, quantity: 1}).subscribe({
            next: (res) => {
                this._MatSnackBar.open(res.message, "Done", {
                    duration: 3000
                });
                this._SpinnerService.disable();
            },
            error: (e) => {
                this._MatSnackBar.open(e.error?.message, "Undo");
                this._SpinnerService.disable();
            },
            complete: () => {
                // 
            }
        });
    }
}
