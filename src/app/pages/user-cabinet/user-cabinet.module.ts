import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserCabinetRoutingModule } from './user-cabinet-routing.module';

// Shared Components Module
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

// Components
import { UserCabinetComponent } from './user-cabinet.component';
import { ProductsComponent } from './products/products.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    UserCabinetComponent,
    ProductsComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserCabinetRoutingModule,
    SharedComponentsModule,
  ]
})
export class UserCabinetModule { }
