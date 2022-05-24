export interface ProductUsersData {
    _id: string;
    first_name: string;
    email: string;
}

export interface Product {
    title: string;
    description: string;
    price: number;
    user_info: ProductUsersData;
}
