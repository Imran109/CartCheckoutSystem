import { createDefaultPricingRules } from "../../../config/pricing-rules-config";
import { PricingRule } from "../../interface/pricing-rule.interface";
import { Checkout } from "./checkout/checkout";

class InitiateCheckout {
  private pricingRules: Array<PricingRule>;
  constructor() {
    this.pricingRules = createDefaultPricingRules();
  }

  apply() {
    const checkout = new Checkout(this.pricingRules);

    // Given TestCase - 1: 3 Apple TVs and 1 VGA adapter
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("vga");

    //👆🏻need to await for each scan if a network / DB call is required

    console.log(
      `Checkout Value: $${checkout.total().toLocaleString("en", {
        minimumFractionDigits: 2,
        useGrouping: false,
      })}`
    ); // Expected: $249.00

    //to proceed with the next checkout in the queue
    checkout.clear();

    // Given TestCase - 2: 5 iPads and 2 Apple TVs
    checkout.scan("atv");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("atv");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("ipd");

    console.log(
      `Checkout Value: $${checkout.total().toLocaleString("en", {
        minimumFractionDigits: 2,
      })}`
    ); // Expected: $2718.95

    checkout.clear();
  }
}

export default InitiateCheckout;
