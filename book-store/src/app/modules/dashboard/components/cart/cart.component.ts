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
import { UpdateItem } from '../../interfaces/update-item';


@Component({
    selector: 'app-cart',
    imports: [MatTableModule, CommonModule],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {

    constructor() { }

    private _MatSnackBar = inject(MatSnackBar);
    private _SpinnerService = inject(SpinnerService);
    private _CartService = inject(CartService);
    private _ProductService = inject(ProductService);

    private TAX = 0.21;

    dataItems = signal<CartDetail[]>([]);
    dataSource = signal<CartDetail[]>([]);
    basketID: string = "";
    cartCost = signal<{total: number; tax: number; totalCost: number}>({
        total: 0, 
        tax: 0,
        totalCost: 0
    });


    ngOnInit(): void {
        this.getProductsDetails();
    }


    getProductsDetails() {
        this._SpinnerService.enable();
        this._CartService.getBasket().subscribe({
            next: (basketRes) => {
                this.basketID = basketRes._id;
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
                        this.calcTotalCost();
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

    modifyBookAmount(op: "inc" | "dec", book: CartDetail) {
        let newQuantity = (op === "inc") ? (book.amount + 1) : (book.amount - 1);
        let itemsTemp: UpdateItem = {
            items: [ {book: book.id, quantity: newQuantity} ]
        };
        this.dataItems()
            .filter(fBook => fBook.id !== book.id)
            .map(mBook => itemsTemp.items.push({book: mBook.id, quantity: mBook.amount}));
        this._SpinnerService.enable();
        this._CartService.updateBasket(this.basketID, itemsTemp).subscribe({
            next: (res) => {
                if(res.code === 200) {
                    let tempDataItems = this.dataItems();
                    let index = tempDataItems.findIndex(item => item.id === book.id);
                    if(newQuantity === 0) {
                        tempDataItems.splice(index, 1);
                    } else {
                        tempDataItems[index].amount = newQuantity;
                        tempDataItems[index].subTotal = newQuantity * tempDataItems[index].cost;
                    }
                    this.dataItems.set(tempDataItems);
                    this.dataSource.set([...this.dataItems()]);
                    this._MatSnackBar.open(res.message, "Undo");
                    this.calcTotalCost();
                } else {
                    this._MatSnackBar.open("Something is wrong. Please try again", "Undo");
                }
            },
            error: (e) => {
                this._MatSnackBar.open(e.error?.message, "Undo");
                this._SpinnerService.disable();
            },
            complete: () => {
                this._SpinnerService.disable();
            }
        });
    }

    deleteSingleBook(id: string) {
        this._SpinnerService.enable();
        this._CartService.deleteItem(id).subscribe({
            next: (res) => {
                if(res.code === 200) {
                    this.dataItems.set(this.dataItems().filter(book => book.id !== id));
                    this.dataSource.set([...this.dataItems()]);
                    this.calcTotalCost();
                } else {
                    this._MatSnackBar.open("Something is wrong. Please try again", "Undo");
                }
            },
            error: (e) => {
                this._MatSnackBar.open(e.error?.message, "Undo");
                this._SpinnerService.disable();
            },
            complete: () => {
                this._MatSnackBar.open("Book is DELETED !", "Done", {
                    duration: 3000
                });
                this._SpinnerService.disable();
            }
        });
    }

    calcTotalCost() {
        let total = this.dataItems().reduce((acc, book) => acc + (book.cost * book.amount), 0);
        let temp = this.cartCost();
        temp.total = total;
        temp.tax = total * this.TAX;
        temp.totalCost = total + total * this.TAX;
        this.cartCost.set(temp);
    }
}
