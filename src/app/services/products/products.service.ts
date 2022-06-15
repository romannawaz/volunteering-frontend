import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';

// Interfaces
import { Product } from './product.interface';
import { Category } from './category.interface';

// Services
import { ProductsServiceInterface } from './products.service.interface';
import { WindowServiceInterface } from '../window/window.service.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements ProductsServiceInterface {
  private readonly _currentUsersProducts: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public readonly $currentUsersProducts: Observable<Product[]> = this._currentUsersProducts.asObservable();

  private productsEndpoint: string = `${this.windowService.endpointApi()}/products`;
  private categoriesEndpoint: string = `${this.windowService.endpointApi()}/categories`;

  constructor(
    @Inject('WindowServiceInterface')
    private windowService: WindowServiceInterface,
    private http: HttpClient,
  ) { }

  public get getCurrentUsersProducts(): Product[] {
    return this._currentUsersProducts.getValue();
  }

  public set currentUsersProducts(newProduct: Product) {
    const currensUsersProducts: Product[] = [...this.getCurrentUsersProducts];

    if (currensUsersProducts.find(product => product._id == newProduct._id)) return;

    currensUsersProducts.push(newProduct);
    this._currentUsersProducts.next(currensUsersProducts);
  }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsEndpoint);
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productsEndpoint}/${id}`);
  }

  public getProductsByUserId(user_id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsEndpoint}/user/${user_id}`);
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.productsEndpoint, product)
      .pipe(
        take(1)
      );
  }

  public updateProduct(id: string, product: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.productsEndpoint}/${id}`, product);
  }

  public deleteProduct(id: string): Observable<Product> {
    return this.http
      .delete<Product>(`${this.productsEndpoint}/${id}`);
  }

  public replaceProduct(newProduct: Product): void {
    const currentUsersProducts: Product[] = [...this.getCurrentUsersProducts];
    const productIndex: number = currentUsersProducts.findIndex((product: Product) => product._id == newProduct._id);

    currentUsersProducts.splice(productIndex, 1, newProduct);

    this._currentUsersProducts.next(currentUsersProducts);
  }

  public removeProduct(removedProduct: Product): void {
    const currentUsersProducts: Product[] = [...this.getCurrentUsersProducts].filter((product: Product) => product._id != removedProduct._id);

    this._currentUsersProducts.next(currentUsersProducts);
  }

  public getAllCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.categoriesEndpoint).pipe(
        first(),
      );
  }
}
