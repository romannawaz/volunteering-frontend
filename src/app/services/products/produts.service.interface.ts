import { Observable } from "rxjs";

export interface Product {
    title: string;
    description: string;
    price: number;
}

export interface ProductsServiceInterface {
    getAllProducts(): Observable<Product[]>;
    createProduct(product: Product): Observable<Product>;
}