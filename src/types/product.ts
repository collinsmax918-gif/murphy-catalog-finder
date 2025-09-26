export interface Product {
  sku: string;
  title: string;
  store: string;
  category: string;
  price: number;
  image_url: string;
  product_url: string;
  tags: string[];
  description: string;
  inStock: boolean;
}

export interface ProductFilters {
  search: string;
  category: string;
  store: string;
  brand: string;
  priceRange: [number, number];
}