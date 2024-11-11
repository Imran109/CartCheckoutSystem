import { CartItem } from "../../../../dto/cart.dto";
import { PricingRule } from "../../../interface/pricing-rule.interface";

export class BulkDiscountStrategy implements PricingRule {
  constructor(
    private readonly sku: string,
    private readonly minQuantity: number,
    private readonly discountedPrice: number
  ) {}

  public isApplicable(items: CartItem[]): boolean {
    const item = items.find((item) => item.product.sku === this.sku);
    return !!item && item.quantity > this.minQuantity;
  }

  public apply(items: CartItem[]): number {
    const item = items.find((item) => item.product.sku === this.sku);
    if (!item) return 0;

    // Calculate the total cost of the items at the regular price
    const regularTotal = item.product.price * item.quantity;
    // Calculate the total cost of the items at the discounted price
    const discountedTotal = this.discountedPrice * item.quantity;
    // Return the difference between the regular total and the discounted total as the discount amount
    return regularTotal - discountedTotal;
  }
}
