import { Product, ProductUsersData } from '../produts.service.interface';

export class ProductModel implements Product {
    public user_info: ProductUsersData;

    constructor(
        public title: string,
        public description: string,
        public price: number,
    ) {
        const { first_name, email, _id } = JSON.parse(localStorage.getItem('user')!);

        this.user_info = {
            _id,
            first_name,
            email,
        };
    }
}