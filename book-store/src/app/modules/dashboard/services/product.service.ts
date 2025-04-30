import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleBook } from '../interfaces/single-book';
import { AllBooks } from '../interfaces/all-books';
import { SingleCategory } from '../interfaces/single-category';
import { AllCategories } from '../interfaces/all-categories';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    
    constructor(private _HttpClient: HttpClient) { }

    getSingleBook(id: string) : Observable<SingleBook> {
        return this._HttpClient.get<SingleBook>(`api/book/${id}`);
    }
    
    getAllBooks() : Observable<AllBooks> {
        return this._HttpClient.get<AllBooks>("api/book");
    }
    
    getSingleCategory(id: string) : Observable<SingleCategory> {
        return this._HttpClient.get<SingleCategory>(`api/category/${id}`);
    }
    
    getAllCategories() : Observable<AllCategories> {
        return this._HttpClient.get<AllCategories>("api/category");
    }

}
