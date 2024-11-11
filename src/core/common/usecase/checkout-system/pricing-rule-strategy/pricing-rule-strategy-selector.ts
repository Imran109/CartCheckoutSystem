import { CartItem } from "../../../../dto/cart.dto";
import { PricingRule } from "../../../interface/pricing-rule.interface";

export class PricingRuleStrategySelector {
  constructor(private rules: PricingRule[]) {}

  public calculateDiscount(items: CartItem[]): number {
    if (!this.rules.length) return 0;

    return this.rules
      .filter((rule) => rule.isApplicable(items))
      .reduce((total, rule) => total + rule.apply(items), 0);
  }

  public addRule(rule: PricingRule): void {
    this.rules.push(rule);
  }

  public removeRule(ruleIndex: number): void {
    this.rules.splice(ruleIndex, 1);
  }
}
