import { Product } from "../../../../dto/product.dto";

// This file shall simulate DB Transactions
export class ProductCatalog {
  private products: Map<string, Product>;

  constructor() {
    this.products = new Map();
    this.initializeProducts();
  }

  // this method is not required if the data is stored in a datastore / DB
  private initializeProducts(): void {
    this.addProduct({ sku: "ipd", name: "Super iPad", price: 549.99 });
    this.addProduct({ sku: "mbp", name: "MacBook Pro", price: 1399.99 });
    this.addProduct({ sku: "atv", name: "Apple TV", price: 109.5 });
    this.addProduct({ sku: "vga", name: "VGA adapter", price: 30.0 });
  }

  // this can be a DB write query to add a product
  public addProduct(product: Product): void {
    this.products.set(product.sku.toLowerCase(), product);
  }

  //Shall be a DB Read Query to fetch the product
  public getProduct(sku: string): Product {
    const product = this.products.get(sku.toLowerCase());
    //if the product is not found, maybe throw an error or handle it gracefully
    return product as Product;
  }

  //DB Update / Patch query to update a product
  public updateProduct(sku: string, updates: Partial<Product>): void {
    const product = this.getProduct(sku);
    if (product) {
      this.products.set(sku.toLowerCase(), {
        ...product,
        ...updates,
      } as Product);
    }
  }
}
