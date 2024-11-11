import { CartItem } from "../../dto/cart.dto";

export interface Discount {
  calculateDiscount(items: CartItem[]): number;
}
