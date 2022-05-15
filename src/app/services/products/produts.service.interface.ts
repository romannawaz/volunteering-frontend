import { Observable } from "rxjs";

export interface ProductUsersData {
    _id: string;
    first_name: string;
    email: string;
}

export interface Product {
    title: string;
    description: string;
    price: number;
    user_info: ProductUsersData;
}

export interface ProductsServiceInterface {
    getAllProducts(): Observable<Product[]>;
    createProduct(product: Product): Observable<Product>;
}