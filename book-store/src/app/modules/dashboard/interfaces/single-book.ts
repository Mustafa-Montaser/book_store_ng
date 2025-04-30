export interface SingleBook {
    _id: string,
    name: string,
    description: string,
    author: string,
    price: number,
    image: string,
    category: {
        _id: string,
        title: string,
        status: string,
        updatedAt: string,
        createdAt: string,
        __v: number
    },
    status: string
}
