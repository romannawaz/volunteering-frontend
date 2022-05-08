import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { CreateProductFormComponent } from './create-product-form/create-product-form.component';
import { HeaderComponent } from './header/header.component';

const components = [
  CreateProductFormComponent,
  HeaderComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ]
})
export class SharedComponentsModule { }
