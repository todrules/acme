import { PurchaseProduct } from './purchaseProduct';

export interface Product {
    purchases?: Array<PurchaseProduct>;
    name?: string;
    description?: string;
    price?: number;
    amountAvailable?: number;
    id?: number;
}
