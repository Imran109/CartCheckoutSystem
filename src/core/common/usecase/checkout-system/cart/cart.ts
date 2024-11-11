import { CartItem } from "../../../../dto/cart.dto";
import { Product } from "../../../../dto/product.dto";

export class Cart {
  private items: Map<string, CartItem>;

  constructor() {
    this.items = new Map();
  }

  public addItem(product: Product): void {
    const existingItem = this.items.get(product.sku);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.set(product.sku, { product, quantity: 1 });
    }
  }

  public removeItem(sku: string): void {
    const item = this.items.get(sku);
    if (item) {
      if (item.quantity > 1) item.quantity -= 1;
      else this.items.delete(sku);
    }
  }

  public getItems(): CartItem[] {
    return Array.from(this.items.values());
  }

  public clear(): void {
    this.items.clear();
  }
}
