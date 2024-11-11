import { CartItem } from "../../dto/cart.dto";

export interface PricingRule {
  apply(items: CartItem[]): number;
  isApplicable(items: CartItem[]): boolean;
}
