import { CheckoutError } from "../src/core/common/errors/checkout-error";
import { ProductCatalog } from "../src/core/common/usecase/checkout-system/catalog/product-catalog";
import { Checkout } from "../src/core/common/usecase/checkout-system/checkout/checkout";
import { BulkDiscountStrategy } from "../src/core/common/usecase/checkout-system/pricing-rule-strategy/bulk-discount-strategy";
import { BuyNGetMFreeStrategy } from "../src/core/common/usecase/checkout-system/pricing-rule-strategy/buy-n-get-m-free-strategy";
import { PricingRuleStrategySelector } from "../src/core/common/usecase/checkout-system/pricing-rule-strategy/pricing-rule-strategy-selector";

describe("Checkout", () => {
  let checkout: Checkout;
  let catalog: ProductCatalog;
  let discountStrategySelector: PricingRuleStrategySelector;

  beforeEach(() => {
    catalog = new ProductCatalog();
    discountStrategySelector = new PricingRuleStrategySelector([]);
    checkout = new Checkout(catalog as any);
  });

  afterEach(() => {
    checkout.clear();
  });

  describe("scanning items", () => {
    it("should throw error for invalid SKU", () => {
      expect(() => checkout.scan("invalid")).toThrow(CheckoutError);
    });
  });

  describe("calculating total", () => {
    it("should calculate total correctly for single item", () => {
      catalog.addProduct({ sku: "ipd", name: "iPad", price: 549.99 });
      checkout.scan("ipd");
      expect(checkout.total()).toEqual(549.99);
    });

    it("should calculate total correctly for multiple items", () => {
      catalog.addProduct({ sku: "ipd", name: "iPad", price: 549.99 });
      catalog.addProduct({ sku: "atv", name: "Apple TV", price: 109.5 });
      checkout.scan("ipd");
      checkout.scan("atv");
      expect(checkout.total()).toEqual(549.99 + 109.5);
    });
  });

  describe("applying pricing rules", () => {
    it("should apply bulk discount correctly", () => {
      catalog.addProduct({ sku: "ipd", name: "iPad", price: 549.99 });
      discountStrategySelector.addRule(
        new BulkDiscountStrategy("ipd", 4, 499.99)
      );

      checkout.scan("ipd");
      checkout.scan("ipd");
      checkout.scan("ipd");
      checkout.scan("ipd");
      checkout.scan("ipd");

      expect(checkout.total()).toEqual(2499.95);
    });

    it('should apply "3 for 2" deal correctly', () => {
      catalog.addProduct({ sku: "atv", name: "Apple TV", price: 109.5 });
      discountStrategySelector.addRule(new BuyNGetMFreeStrategy("atv", 3, 1));

      checkout.scan("atv");
      checkout.scan("atv");
      checkout.scan("atv");

      expect(checkout.total()).toEqual(219.0);
    });

    it("should handle multiple applicable rules", () => {
      catalog.addProduct({ sku: "ipd", name: "iPad", price: 549.99 });
      catalog.addProduct({ sku: "atv", name: "Apple TV", price: 109.5 });

      discountStrategySelector.addRule(
        new BulkDiscountStrategy("ipd", 4, 499.99)
      );
      discountStrategySelector.addRule(new BuyNGetMFreeStrategy("atv", 3, 1));

      checkout.scan("ipd");
      checkout.scan("ipd");
      checkout.scan("ipd");
      checkout.scan("ipd");
      checkout.scan("atv");
      checkout.scan("atv");
      checkout.scan("atv");

      expect(checkout.total()).toEqual(2328.45);
    });
  });

  describe("edge cases", () => {
    it("should handle empty cart", () => {
      expect(checkout.total()).toEqual(0);
    });

    it("should handle invalid pricing rules", () => {
      discountStrategySelector.addRule(
        new BulkDiscountStrategy("invalid", 4, 499.99)
      );
      discountStrategySelector.addRule(
        new BuyNGetMFreeStrategy("invalid", 3, 1)
      );

      catalog.addProduct({ sku: "ipd", name: "iPad", price: 549.99 });
      catalog.addProduct({ sku: "atv", name: "Apple TV", price: 109.5 });

      checkout.scan("ipd");
      checkout.scan("atv");

      expect(checkout.total()).toEqual(659.49);
    });
  });
});
