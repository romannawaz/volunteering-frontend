import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { ProductsServiceInterface } from 'src/app/services/products/products.service.interface';

// Interfaces
import { Product } from 'src/app/services/products/product.interface';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  private _subscription: Subscription = new Subscription();

  public products: Product[] = [];

  constructor(
    @Inject('ProductsServiceInterface')
    private productsService: ProductsServiceInterface,
  ) { }

  ngOnInit(): void {
    this._subscription.add(
      this.productsService.getAllProducts()
        .subscribe((products: Product[]) => {
          this.products = products;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
