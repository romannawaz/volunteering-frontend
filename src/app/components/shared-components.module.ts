import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { CreateProductFormComponent } from './create-product-form/create-product-form.component';
import { HeaderComponent } from './header/header.component';
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { FooterComponent } from './footer/footer.component';
import { DonateProgressBarComponent } from './donate-progress-bar/donate-progress-bar.component';

const components = [
  CreateProductFormComponent,
  HeaderComponent,
  ProductPreviewComponent,
  FooterComponent,
  DonateProgressBarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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
