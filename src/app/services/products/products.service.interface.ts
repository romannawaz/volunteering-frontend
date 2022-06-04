import { Observable } from "rxjs";

import { Product } from "./product.interface";

export interface ProductsServiceInterface {
    readonly $currentUsersProducts: Observable<Product[]>;

    get getCurrentUsersProducts(): Product[];
    set currentUsersProducts(product: Product);

    getAllProducts(): Observable<Product[]>;
    getProductById(id: string): Observable<Product>;
    getProductsByUserId(user_id: string): Observable<Product[]>
    createProduct(product: Product): Observable<Product>;
    updateProduct(id: string, product: Product): Observable<Product>
    deleteProduct(id: string): Observable<Product>;

    replaceProduct(newProduct: Product): void;
    removeProduct(removedProduct: Product): void;
}