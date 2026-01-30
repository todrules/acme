import { Purchase } from './purchase';

export interface Customer {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    orders?: Array<Purchase>;
}
