export class PriceValidator {
  //basic price validations.
  //This can be extensive as per business requirement
  public static validate(price: number): boolean {
    return price >= 0 && Number.isFinite(price);
  }
}
