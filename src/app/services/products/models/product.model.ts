// Interfaces
import { Product } from '../product.interface';

export class ProductModel implements Product {
    constructor(
        public title: string,
        public description: string,
        public price: number,
        public user_id: string,
    ) { }
}