import { Customer } from './customer';
import { PurchaseProduct } from './purchaseProduct';

export interface Purchase {
    id?: number;
    customer?: Customer;
    products?: Array<PurchaseProduct>;
    createdate?: Date;
    shippingdate?: Date;
    subtotal?: number;
    salestax?: number;
    total?: number;
}
