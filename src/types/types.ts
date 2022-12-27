export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    password: string;
};
export type Product = {
    product_id?: number;
    product_name: string;
    price: number;
    category: string;
    quantity?: number;
};
export type ProductsDTO = {
    product_id: number;
    quantity: number;
};
export type Order = {
    order_id: number;
    user_id: number;
    status: string;
    product_name?: string;
    quantity?: number;
    order_date?: string;
};
