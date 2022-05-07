import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Product, ProductsServiceInterface } from './produts.service.interface';

import { WindowServiceInterface } from '../window/window.service.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements ProductsServiceInterface {

  constructor(
    @Inject('WindowServiceInterface')
    private windowService: WindowServiceInterface,
    private http: HttpClient,
  ) { }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.windowService.endpointApi()}/products`);
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(`${this.windowService.endpointApi()}/products`, product)
      .pipe(
        take(1)
      );
  }
}
