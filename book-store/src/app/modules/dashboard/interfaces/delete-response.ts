export interface DeleteResItems {
    book: {
        _id: string,
        price: number
    } | null,
    quantity: number,
    _id: string
}

export interface DeleteResponse {
    data : {
        _id: string,
        customer: string,
        items: DeleteResItems[]
    } 
    message     : string;
    code        : number;
    status      : string;
    timestamp   : string;
}
