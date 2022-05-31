import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { ProductModel } from 'src/app/services/products/models/product.model';

// Services
import { AuthServiceInterface } from 'src/app/services/auth/auth.service.interface';
import { ProductsServiceInterface } from 'src/app/services/products/products.service.interface';

// Interfaces
import { Product } from 'src/app/services/products/product.interface';

@Component({
  selector: 'create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.scss']
})
export class CreateProductFormComponent implements OnInit {

  public createProductForm!: FormGroup;

  public controls!: { [key: string]: AbstractControl };

  constructor(
    @Inject('ProductsServiceInterface')
    private productsService: ProductsServiceInterface,
    @Inject('AuthServiceInterface')
    private authService: AuthServiceInterface,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createProductForm = this._createForm();

    this.controls = {
      title: this.createProductForm.controls['title'],
      description: this.createProductForm.controls['description'],
      price: this.createProductForm.controls['price'],
    }

  }

  public createProduct(): void {
    if (!this.createProductForm.valid) return;

    const { title, description, price } = this.createProductForm.value;

    const newProduct: Product = new ProductModel(title, description, price, this.authService.user!._id);

    this.productsService.createProduct(newProduct)
      .subscribe();

    this.createProductForm.reset();
  }

  private _createForm(): FormGroup {
    return this.formBuilder.group({
      title: [''],
      description: [''],
      price: [''],
    });
  }

}
