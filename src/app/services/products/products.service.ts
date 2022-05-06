import { Injectable } from '@angular/core';
import { ProductsServiceInterface } from './produts.service.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements ProductsServiceInterface {

  constructor() { }
}
