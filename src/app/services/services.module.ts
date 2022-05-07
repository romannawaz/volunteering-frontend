import { NgModule } from '@angular/core';

import { WindowService } from './window/window.service';
import { ProductsService } from './products/products.service';

@NgModule({
  declarations: [],
  providers: [
    { provide: 'WindowServiceInterface', useClass: WindowService },
    { provide: 'ProductsServiceInterface', useClass: ProductsService },
  ],
})
export class ServicesModule { }
