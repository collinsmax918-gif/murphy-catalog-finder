import { useState } from "react";
import { Heart, Eye, ShoppingCart, ExternalLink } from "lucide-react";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {products.map((product, index) => (
          <div
            key={product.sku}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 group flex flex-col"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Product Image */}
            <div className="relative bg-zinc-950 aspect-[4/3] flex items-center justify-center overflow-hidden p-6">
              <ProductImage
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Heart Button */}
              <button className="absolute top-4 right-4 w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors">
                <Heart className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            {/* Product Details */}
            <div className="p-5 space-y-3 flex flex-col flex-1">
              {/* Title + Price Row */}
              <div className="flex items-start justify-between gap-3">
                <h3 
                  className="font-semibold text-base text-white line-clamp-2 cursor-pointer hover:text-zinc-300 transition-colors flex-1"
                  onClick={() => handleProductClick(product)}
                >
                  {product.title}
                </h3>
                <span className="text-xl font-bold text-white whitespace-nowrap">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Category + Batch */}
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span>{product.category}</span>
                <span>•</span>
                <span>Best batch</span>
              </div>

              {/* Quality Badge */}
              <div className="inline-flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Heart className="w-3 h-3 fill-emerald-400" />
                Quality: 10/10
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-auto pt-3">
                <Button
                  size="sm"
                  onClick={(e) => handleDirectLink(product, e)}
                  className="flex-1 h-10 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 text-white border-0"
                >
                  <ExternalLink className="mr-2 h-4 w-4 text-emerald-400" />
                  Order product
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleProductClick(product)}
                  className="h-10 w-10 bg-transparent border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600"
                >
                  <Eye className="h-4 w-4 text-zinc-400" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={(e) => handleDirectLink(product, e)}
                  className="h-10 w-10 bg-transparent border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600"
                >
                  <ShoppingCart className="h-4 w-4 text-zinc-400" />
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