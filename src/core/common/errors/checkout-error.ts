export class CheckoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CartCheckoutError";
  }
}
