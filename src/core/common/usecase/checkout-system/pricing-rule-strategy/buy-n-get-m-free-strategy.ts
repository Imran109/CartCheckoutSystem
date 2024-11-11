import { CartItem } from "../../../../dto/cart.dto";
import { PricingRule } from "../../../interface/pricing-rule.interface";

export class BuyNGetMFreeStrategy implements PricingRule {
  constructor(
    private readonly sku: string,
    private readonly eligibleBuyQuantity: number,
    private readonly eligibleFreeQuantity: number
  ) {}

  public isApplicable(items: CartItem[]): boolean {
    const item = items.find((item) => item.product.sku === this.sku);
    return !!item && item.quantity >= this.eligibleBuyQuantity;
  }

  public apply(items: CartItem[]): number {
    const item = items.find((item) => item.product.sku === this.sku);
    if (!item) return 0;

    // Calculate the number of full sets that qualify for the discount
    const fullSets = Math.floor(item.quantity / this.eligibleBuyQuantity);

    //This line calculates the total discount amount by multiplying the number of full sets that qualify for the discount (fullSets)
    //by the number of items that are eligible to be free (this.eligibleFreeQuantity) and the price of each item (item.product.price).
    return fullSets * this.eligibleFreeQuantity * item.product.price;
  }
}
