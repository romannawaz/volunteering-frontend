import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// Interfaces
import { Product } from 'src/app/services/products/product.interface';

// Services
import { AuthServiceInterface } from 'src/app/services/auth/auth.service.interface';
import { ProductsServiceInterface } from 'src/app/services/products/products.service.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  public editableProduct?: Product;

  constructor(
    @Inject('ProductsServiceInterface')
    public productsService: ProductsServiceInterface,
    @Inject('AuthServiceInterface')
    private authService: AuthServiceInterface,
  ) { }

  ngOnInit(): void {
    this._subscription.add(
      this.productsService.getProductsByUserId(this.authService.user!._id)
        .pipe(
          map((products: Product[]) => {
            products.forEach((product: Product) => this.productsService.currentUsersProducts = product);
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public editProduct(product: Product): void {
    this.editableProduct = product;
  }

  public deleteProduct(product: Product): void {
    this._subscription.add(
      this.productsService.deleteProduct(product._id!)
        .subscribe((product: Product) => {
          this.productsService.removeProduct(product);
        })
    );
  }

}