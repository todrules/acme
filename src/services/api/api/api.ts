export * from './customerController.service';
import { CustomerControllerService } from './customerController.service';
export * from './productController.service';
import { ProductControllerService } from './productController.service';
export * from './purchaseController.service';
import { PurchaseControllerService } from './purchaseController.service';
export const APIS = [CustomerControllerService, ProductControllerService, PurchaseControllerService];
