import { NgModule } from '@angular/core';

import { WindowService } from './window/window.service';
import { ProductsService } from './products/products.service';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [],
  providers: [
    { provide: 'WindowServiceInterface', useClass: WindowService },
    { provide: 'ProductsServiceInterface', useClass: ProductsService },
    { provide: 'AuthServiceInterface', useClass: AuthService },
  ],
})
export class ServicesModule { }
