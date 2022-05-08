import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { ProductsServiceInterface } from 'src/app/services/products/produts.service.interface';

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

    this.productsService.createProduct(this.createProductForm.value)
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
