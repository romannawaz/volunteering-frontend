import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/services/products/produts.service.interface';

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
