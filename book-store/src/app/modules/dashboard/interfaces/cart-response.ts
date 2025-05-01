interface item {
    book: {
        _id: string,
        price: number
    } | null,
    quantity: number,
    _id: string
}

export interface CartResponse {
    data: {
        _id: string,
        customer: string,
        items: item[],
        total: 0
    },
    message: string,
    code: number,
    status: string,
    timestamp: string
}
