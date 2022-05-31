import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

// Interfaces
import { Product } from 'src/app/services/products/product.interface';
import { User } from 'src/app/services/auth/user.interface';

// Services
import { ProductsServiceInterface } from 'src/app/services/products/products.service.interface';
import { AuthServiceInterface } from 'src/app/services/auth/auth.service.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  public product!: Product;
  public user!: User;

  public isReady: boolean = false;

  constructor(
    @Inject('ProductsServiceInterface')
    private productsService: ProductsServiceInterface,
    @Inject('AuthServiceInterface')
    private authService: AuthServiceInterface,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._subscription.add(
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.productsService.getProductById(id)),
          mergeMap((product: Product) => {
            this.product = product;
            
            return this.authService.getUserById(product.user_id)
          })
        )
        .subscribe((user: User) => {
          this.user = user;
          
          this.isReady = true;
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
