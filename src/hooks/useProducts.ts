import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { originalShoes } from "@/data/allProducts";
import { parseMurphyProducts } from "@/utils/murphyParser";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(originalShoes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMurphyProducts() {
      try {
        const response = await fetch('/murphy_items_final.txt');
        if (response.ok) {
          const text = await response.text();
          const murphyProducts = parseMurphyProducts(text);
          setProducts([...originalShoes, ...murphyProducts]);
          console.log(`Loaded ${originalShoes.length + murphyProducts.length} total products`);
        }
      } catch (error) {
        console.error('Failed to load Murphy products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMurphyProducts();
  }, []);

  return { products, loading };
}
