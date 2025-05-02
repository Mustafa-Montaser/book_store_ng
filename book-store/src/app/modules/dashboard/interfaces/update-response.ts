export interface UpdateResponse {
    data: {
        _id: string;
        customer: string;
        items: {
            book: {
                _id: string;
                price: number
            };
            quantity: number;
            _id: string
        } [];
        total: number;
        updatedAt: string;
        createdAt: string
    };
    message: string;
    code: number;
    status: string;
    timestamp: string
}
