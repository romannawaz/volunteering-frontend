import { Observable } from "rxjs";

export interface Product {
    title: string;
}

export interface ProductsServiceInterface {
    getAllProducts(): Observable<Product[]>;
}