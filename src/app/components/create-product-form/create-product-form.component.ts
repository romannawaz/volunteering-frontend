import { Component, Inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

// Models
import { ProductModel } from 'src/app/services/products/models/product.model';

// Interfaces
import { Product } from 'src/app/services/products/product.interface';
import { Category } from 'src/app/services/products/category.interface';

// Services
import { AuthServiceInterface } from 'src/app/services/auth/auth.service.interface';
import { ProductsServiceInterface } from 'src/app/services/products/products.service.interface';

interface Controls {
  title: FormControl;
  description: FormControl;
  price: FormControl;
  categories: FormGroup;
}

@Component({
  selector: 'create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.scss']
})
export class CreateProductFormComponent implements OnInit, OnChanges, OnDestroy {
  private _subscription: Subscription = new Subscription();

  @Input()
  public editableProduct?: Product;
  public editStatus: boolean = false;

  public productForm!: FormGroup;

  public controls!: Controls;

  public categories: Category[] = [];

  public isResponseLoading: boolean = false;

  constructor(
    @Inject('ProductsServiceInterface')
    private productsService: ProductsServiceInterface,
    @Inject('AuthServiceInterface')
    private authService: AuthServiceInterface,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.productForm = this._createProductForm();

    this.controls = {
      title: this.productForm.controls['title'] as FormControl,
      description: this.productForm.controls['description'] as FormControl,
      price: this.productForm.controls['price'] as FormControl,
      categories: this.productForm.controls['categories'] as FormGroup,
    };

    this._subscription.add(
      this.productsService.getAllCategories()
        .subscribe((categories: Category[]) => {
          this.categories = [...categories];

          this.categories.forEach(({ name }) => {
            if (name in this.controls.categories.controls) return;

            this.controls.categories.addControl(name, this.formBuilder.control(false))
          })
        })
    );
  }

  ngOnChanges(): void {
    if (!this.editableProduct) {
      this.editStatus = false;

      return;
    }

    this.productForm.patchValue(this.editableProduct);
    this.editStatus = true;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public createProduct(): void {
    console.log(this.controls.categories.value);
    // if (!this.productForm.valid) return;

    // this.isResponseLoading = true;

    // const { title, description, price } = this.productForm.value;

    // const newProduct: Product = new ProductModel(title, description, price, this.authService.user!._id);

    // if (this.editStatus) {
    //   this._subscription.add(
    //     this.productsService.updateProduct(this.editableProduct!._id!, newProduct)
    //       .subscribe(
    //         () => {
    //           this.productsService.replaceProduct(Object.assign({ id: this.editableProduct!._id }, newProduct));

    //           this.productForm.reset();
    //           this.isResponseLoading = false;
    //         }
    //       )
    //   );
    // }
    // else {
    //   this._subscription.add(
    //     this.productsService.createProduct(newProduct)
    //       .subscribe(
    //         (product: Product) => {
    //           this.productsService.currentUsersProducts = product;

    //           this.productForm.reset();
    //           this.isResponseLoading = false;
    //         }
    //       )
    //   );
    // }

  }

  private _createProductForm(): FormGroup {
    return this.formBuilder.group({
      title: [''],
      description: [''],
      price: [''],
      categories: this.formBuilder.group({}),
    });
  }

}
