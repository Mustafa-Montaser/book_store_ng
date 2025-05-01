import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../../../../shared/services/spinner.service';
import { CartService } from '../../services/cart.service';

import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { basketItem, GetBasketResponse } from '../../interfaces/get-basket-response';
import { ProductService } from '../../services/product.service';
import { CartDetail } from '../../interfaces/cart-detail';
import { CommonModule } from '@angular/common';
import { DeleteResItems, DeleteResponse } from '../../interfaces/delete-response';

import { of, forkJoin } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';


@Component({
    selector: 'app-cart',
    imports: [MatTableModule, CommonModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {

    private _MatSnackBar = inject(MatSnackBar);
    private _SpinnerService = inject(SpinnerService);
    private _CartService = inject(CartService);
    private _ProductService = inject(ProductService);
    constructor() { }

    dataItems = signal<CartDetail[]>([]);
    dataSource = signal<CartDetail[]>([]);

    ngOnInit(): void {
        this.getProductsDetails();
    }

    getProductsDetails() {
        this._SpinnerService.enable();
        this._CartService.getBasket().subscribe({
            next: (basketRes) => {
                this.setUpProductDetails(basketRes.items);
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

    setUpProductDetails(items: basketItem[]) {
        items.forEach((item, i) => {
            if (item.quantity > 0) {
                this._SpinnerService.enable();
                this._ProductService.getSingleBook(item.book).subscribe({
                    next: (bookRes) => {
                        if (!!bookRes) {
                            this.dataItems.set([...this.dataItems(), {
                                cost: bookRes.price,
                                name: bookRes.name,
                                id: bookRes._id,
                                imgURL: `https://picsum.photos/${70 + i}/${100 + i}`,
                                amount: item.quantity,
                                subTotal: (item.quantity * bookRes.price)
                            }]);
                        }
                        this._SpinnerService.disable();
                    },
                    error: (e) => {
                        this._MatSnackBar.open(e.error?.message, "Undo");
                        this._SpinnerService.disable();
                    },
                    complete: () => {
                        this.dataSource.set([...this.dataItems()]);
                    }
                });
            }
        });
    }

    modifyBookAmount() {

    }

    handleDeleteBtnClk(id: string) {
        this.handleDeleteItem(id);
    }

    handleDeleteItem(id: string) {
        this._SpinnerService.enable();
        this._CartService.deleteItem(id).subscribe({
            next: (res) => {
                this.setUpProductDetails2(res.data.items);
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

    setUpProductDetails2(items: DeleteResItems[]) {
        this.dataItems.set([]);
        this.dataSource.set([...this.dataItems()]);
        items.forEach((item, i) => {
            if (!!item.book && item.quantity > 0) {
                this._SpinnerService.enable();
                this._ProductService.getSingleBook(item.book._id).subscribe({
                    next: (bookRes) => {
                        if (!!bookRes) {
                            this.dataItems.set([...this.dataItems(), {
                                cost: bookRes.price,
                                name: bookRes.name,
                                id: bookRes._id,
                                imgURL: `https://picsum.photos/${70 + i}/${100 + i}`,
                                amount: item.quantity,
                                subTotal: (item.quantity * bookRes.price)
                            }]);
                        }
                        this._SpinnerService.disable();
                    },
                    error: (e) => {
                        this._MatSnackBar.open(e.error?.message, "Undo");
                        this._SpinnerService.disable();
                    },
                    complete: () => {
                        this.dataSource.set([...this.dataItems()]);
                    }
                });
            }
        });
    }

}

// loadB{asketDetails(): void {
//     this._SpinnerService.enable();
//     this._CartService.getBasket().pipe(
//         switchMap(basket => {
//             const itemRequests = basket.items
//                 .filter(item => item.quantity > 0)
//                 .map((item, i) =>
//                     this._ProductService.getSingleBook(item.book).pipe(
//                         map(bookRes => ({
//                             cost: bookRes.price,
//                             name: bookRes.name,
//                             id: bookRes._id,
//                             imgURL: `https://picsum.photos/${70 + i}/${100 + i}`,
//                             amount: item.quantity,
//                             subTotal: item.quantity * bookRes.price
//                         })),
//                         catchError(error => {
//                             this._MatSnackBar.open(error.error?.message || 'Failed to fetch product', 'Undo');
//                             return of(null); // Skip this item
//                         })
//                     )
//                 );
//             return forkJoin(itemRequests); // wait for all product requests
//         }),
//         tap(() => this._SpinnerService.disable())
//     ).subscribe({
//         next: productDetails => {
//             const validItems = productDetails.filter(item => item !== null);
//             this.dataItems.set(validItems);
//             this.dataSource.set(validItems);
//         },
//         error: err => {
//             this._MatSnackBar.open(err.error?.message || 'Failed to fetch basket', 'Undo');
//             this._SpinnerService.disable();
//         }
//     });
// }}