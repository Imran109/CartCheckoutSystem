import { CheckoutError } from "../../../errors/checkout-error";
import { PricingRule } from "../../../interface/pricing-rule.interface";
import { Cart } from "../cart/cart";
import { ProductCatalog } from "../catalog/product-catalog";
import { PricingRuleStrategySelector } from "../pricing-rule-strategy/pricing-rule-strategy-selector";

export class Checkout {
  private cart: Cart;
  private catalog: ProductCatalog;
  private pricingRuleStrategySelector: PricingRuleStrategySelector;

  constructor(pricingRules: PricingRule[]) {
    this.cart = new Cart();
    this.catalog = new ProductCatalog();
    this.pricingRuleStrategySelector = new PricingRuleStrategySelector(
      pricingRules || []
    );
  }

  public scan(sku: string): void {
    const product = this.catalog.getProduct(sku);
    //it's a product team's call as to how we shall handle this error
    if (!product) throw new CheckoutError(`Product with SKU ${sku} not found`);
    this.cart.addItem(product);
  }

  public total(): number {
    const items = this.cart.getItems();
    const subtotal = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const discount = this.pricingRuleStrategySelector.calculateDiscount(items);
    return subtotal - discount;
  }

  public clear(): void {
    this.cart.clear();
  }
}
