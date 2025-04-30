export interface RegisterResponse {
    message: string,
    data: {
        first_name: string,
        last_name: string,
        email: string,
        status: string,
        role: string,
        _id: string,
        shipping_addresses: any[],
        updatedAt: string,
        createdAt: string,
        __v: number
    },
    code: number,
    status: string,
    timestamp: string
}
