export interface Book {
    _id: string,
    name: string,
    description: string,
    author: string
    price: number,
    image: string,
    category: string,
    status: string,
    updatedAt: string,
    createdAt: string,
    __v: number
}

export interface AllBooks {
    data: Book[],
    total: number,
    page: number,
    limit: number,
    hasNextPage: boolean,
    hasPrevPage: boolean
}
