import { Product } from "./product.dto";

export interface CartItem {
  product: Product;
  quantity: number;
}
