interface bookUpdate {
    book: string;
    quantity: number;
}

export interface CartUpdate {
    items: bookUpdate[];
}
