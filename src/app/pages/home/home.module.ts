import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

import { ProductsListComponent } from './products-list/products-list.component';

// Shared Components Module
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    SharedComponentsModule,
  ],
  bootstrap: [HomeComponent],
})
export class HomeModule { }
