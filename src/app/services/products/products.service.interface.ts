import { Observable } from "rxjs";

import { Product } from "./product.interface";

export interface ProductsServiceInterface {
    getAllProducts(): Observable<Product[]>;
    createProduct(product: Product): Observable<Product>;
}