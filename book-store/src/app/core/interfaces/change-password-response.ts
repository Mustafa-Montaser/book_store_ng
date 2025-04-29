export interface ChangePasswordResponse {
    "message": string,
    "data": {
        "_id": string,
        "first_name": string,
        "last_name": string,
        "email": string,
        "status": string,
        "role": string,
        "shipping_addresses": any[]
    },
    "code": number,
    "status": string,
    "timestamp": string
}