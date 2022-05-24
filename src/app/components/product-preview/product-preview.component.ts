import { Component, Input, OnInit } from '@angular/core';

// Interfaces
import { Product } from 'src/app/services/products/product.interface';

@Component({
  selector: 'product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {

  @Input()
  public product!: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
