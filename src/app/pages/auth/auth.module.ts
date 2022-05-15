import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

// Shared Components Module
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

// Components
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthComponent } from './auth.components';

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedComponentsModule,
  ],
  bootstrap: [AuthComponent],
})
export class AuthModule { }
