export interface basketItem {
    book: string,
    quantity: number,
    _id: string
}

export interface GetBasketResponse {
    _id: string,
    customer: string,
    items: basketItem[],
    total: number
}
