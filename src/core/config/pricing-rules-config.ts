import { PricingRule } from "../common/interface/pricing-rule.interface";
import { BulkDiscountStrategy } from "../common/usecase/checkout-system/pricing-rule-strategy/bulk-discount-strategy";
import { BuyNGetMFreeStrategy } from "../common/usecase/checkout-system/pricing-rule-strategy/buy-n-get-m-free-strategy";

export const createDefaultPricingRules = (): PricingRule[] => {
  return [
    new BuyNGetMFreeStrategy("atv", 3, 1), // 3 for 2 deal on Apple TVs
    new BulkDiscountStrategy("ipd", 4, 499.99), // Bulk discount on iPads
  ];
};
