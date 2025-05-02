import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddItem } from '../interfaces/add-item';
import { CartResponse } from '../interfaces/cart-response';
import { GetBasketResponse } from '../interfaces/get-basket-response';
import { DeleteItem } from '../interfaces/delete-item';
import { DeleteResponse } from '../interfaces/delete-response';
import { UpdateResponse } from '../interfaces/update-response';
import { UpdateItem } from '../interfaces/update-item';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor() { }

    private _HttpClient = inject(HttpClient)

    addItem(data: AddItem): Observable<CartResponse> {
        return this._HttpClient.post<CartResponse>("api/basket/item", data);
    }

    deleteItem(bookID: string): Observable<DeleteResponse> {
        return this._HttpClient.delete<DeleteResponse>("api/basket/item", { body: { book: bookID } });
    }

    getBasket(): Observable<GetBasketResponse> {
        return this._HttpClient.get<GetBasketResponse>("api/basket");
    }

    updateBasket(basketID: string, updatedItems: UpdateItem): Observable<UpdateResponse> {
        return this._HttpClient.put<UpdateResponse>(`api/basket/${basketID}`, { items: updatedItems.items });
    }
}
