import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCabinetRoutingModule } from './user-cabinet-routing.module';

import { UserCabinetComponent } from './user-cabinet.component';

// Shared Components Module
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  declarations: [
    UserCabinetComponent,
  ],
  imports: [
    CommonModule,
    UserCabinetRoutingModule,
    SharedComponentsModule
  ]
})
export class UserCabinetModule { }
