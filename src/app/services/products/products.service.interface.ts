import { Observable } from "rxjs";

import { Product } from "./product.interface";

export interface ProductsServiceInterface {
    getAllProducts(): Observable<Product[]>;
    getProductById(id: string): Observable<Product>;
    createProduct(product: Product): Observable<Product>;
}