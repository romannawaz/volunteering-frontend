export interface Product {
    title: string;
    description: string;
    amount: number;
    collected: number;
    region: string;
    date: Date;
    user_id: string;
    _id?: string;
}
