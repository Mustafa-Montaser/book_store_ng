export interface LoginResponse {
    message: string,
    data: {
        accessToken: string,
        refreshToken: string,
        profile: {
            _id: string,
            first_name: string,
            last_name: string,
            email: string,
            status: string,
            role: string,
            shipping_addresses: any []
        }
    },
    code: number,
    status: string,
    timestamp: string
}
