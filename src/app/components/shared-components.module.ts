import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { CreateProductFormComponent } from './create-product-form/create-product-form.component';

const components = [
  CreateProductFormComponent,
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ]
})
export class SharedComponentsModule { }
