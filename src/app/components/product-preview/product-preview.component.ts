import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

// Interfaces
import { Product } from 'src/app/services/products/product.interface';
import { User } from 'src/app/services/auth/user.interface';

// Services
import { AuthServiceInterface } from 'src/app/services/auth/auth.service.interface';

@Component({
  selector: 'product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  @Input()
  public product!: Product;

  public user!: User;
  public isUserLoaded: boolean = false;

  constructor(
    @Inject('AuthServiceInterface')
    private authService: AuthServiceInterface,
  ) { }

  ngOnInit(): void {
    this._subscription.add(
      this.authService.getUserById(this.product.user_id)
        .subscribe((user: User) => {
          this.user = user;

          this.isUserLoaded = true;
        })
    )
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public percentOfCollected(): string {
    const { amount, collected } = this.product;
    
    return (collected / amount * 100).toFixed(2);
  }
}
