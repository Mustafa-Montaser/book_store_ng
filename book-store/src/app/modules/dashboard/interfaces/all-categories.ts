import { SingleCategory } from "./single-category";

interface book {
    _id: string,
    name: string,
    description: string,
    author: string,
    price: number,
    image: string,
    status: string
}

interface category extends SingleCategory {
    books: book[]
}

export type AllCategories = category[];