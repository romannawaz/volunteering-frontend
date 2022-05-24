// Interfaces
import { User } from '../../auth/user.interface';
import { Product, ProductUsersData } from '../product.interface';

export class ProductModel implements Product {
    public user_info: ProductUsersData;

    constructor(
        public title: string,
        public description: string,
        public price: number,
        public user: User,
    ) {
        const { first_name, email, _id } = user;

        this.user_info = {
            _id,
            first_name,
            email,
        };
    }
}