// Interfaces
import { Product } from '../product.interface';

export class ProductModel implements Product {
    public date: Date;

    constructor(
        public title: string,
        public description: string,
        public amount: number,
        public collected: number,
        public region: string,
        public user_id: string,
    ) {
        this.date = new Date();
    }
}