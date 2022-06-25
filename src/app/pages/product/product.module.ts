import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

// Shared Components Module
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedComponentsModule,
    ClipboardModule
  ]
})
export class ProductModule { }
