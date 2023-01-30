import { IProduct } from "./product"

export interface iCartProduct{
    productId?: number,
    quantity: number
}


export interface iCart {
    id: number,
    userId: string,
    date: string,
    products: Array<iCartProduct>
}