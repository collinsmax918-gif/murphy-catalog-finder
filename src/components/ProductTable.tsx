import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import ProductModal from "./ProductModal";
import ProductImage from "./ProductImage";

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDirectLink = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Product click tracked:', { sku: product.sku, title: product.title });
    window.open(product.product_url, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Latest products</h2>
        <p className="text-muted-foreground">Latest W2C drops from trusted sellers.</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
        {products.map((product, index) => (
          <div
            key={product.sku}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Product Image */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 aspect-square flex items-center justify-center overflow-hidden">
              <ProductImage
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Store Badge */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-sm">
                  🏪 {product.store}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-3 flex flex-col flex-1 bg-card">
              {/* Title */}
              <h3 
                className="font-semibold text-base line-clamp-2 text-foreground min-h-[3rem] cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleProductClick(product)}
              >
                {product.title}
              </h3>

              {/* Category */}
              <span className="inline-flex items-center w-fit px-2.5 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                📂 {product.category}
              </span>

              {/* Price */}
              <div className="text-2xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-auto pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleProductClick(product)}
                  className="flex-1 h-9 text-sm font-medium"
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  onClick={(e) => handleDirectLink(product, e)}
                  className="flex-1 h-9 text-sm font-medium bg-primary hover:bg-primary/90"
                >
                  <ExternalLink className="mr-1.5 h-4 w-4" />
                  Buy
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProductTable;