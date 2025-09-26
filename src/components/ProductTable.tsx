import { useState } from "react";
import { ExternalLink, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Product, ProductFilters } from "@/types/product";
import ProductModal from "./ProductModal";

interface ProductTableProps {
  products: Product[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "",
    store: "",
    priceRange: [0, 1000],
    inStock: false,
  });

  // Get unique values for filter dropdowns
  const categories = [...new Set(products.map(p => p.category))];
  const stores = [...new Set(products.map(p => p.store))];

  // Filter products based on current filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = filters.search === "" || 
      product.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.store.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
    
    const matchesCategory = filters.category === "" || filters.category === "all" || product.category === filters.category;
    const matchesStore = filters.store === "" || filters.store === "all" || product.store === filters.store;
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesStock = !filters.inStock || product.inStock;

    return matchesSearch && matchesCategory && matchesStore && matchesPrice && matchesStock;
  });

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
    <div className="space-y-6">
      {/* Filters Header */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-table-border pb-4">
        <div className="space-y-4 animate-fade-in">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary animate-pulse-soft" />
            <Input
              placeholder="🔍 Search products, stores, or tags..."
              className="pl-12 h-14 text-base bg-gradient-to-r from-background to-secondary border-2 border-primary/20 focus:border-primary/50 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-4 animate-slide-up">
            <Select 
              value={filters.category || "all"} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, category: value === "all" ? "" : value }))}
            >
              <SelectTrigger className="w-[170px] h-11 bg-background border-2 border-table-border hover:border-primary/50 rounded-lg transition-all duration-300 hover:shadow-soft">
                <SelectValue placeholder="📂 Category" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-table-border rounded-lg shadow-medium">
                <SelectItem value="all">📋 All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>📦 {category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={filters.store || "all"} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, store: value === "all" ? "" : value }))}
            >
              <SelectTrigger className="w-[190px] h-11 bg-background border-2 border-table-border hover:border-primary/50 rounded-lg transition-all duration-300 hover:shadow-soft">
                <SelectValue placeholder="🏪 Store" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-table-border rounded-lg shadow-medium">
                <SelectItem value="all">🏬 All Stores</SelectItem>
                {stores.map(store => (
                  <SelectItem key={store} value={store}>🏪 {store}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={filters.inStock ? "default" : "outline"}
              onClick={() => setFilters(prev => ({ ...prev, inStock: !prev.inStock }))}
              className="h-11 px-6 rounded-lg hover-scale"
            >
              <Filter className="mr-2 h-4 w-4" />
              ✅ In Stock Only
            </Button>

            {/* Clear Filters */}
            {(filters.search || filters.category || filters.store || filters.inStock) && (
              <Button
                variant="outline"
                onClick={() => setFilters({
                  search: "",
                  category: "",
                  store: "",
                  priceRange: [0, 1000],
                  inStock: false,
                })}
                className="h-11 px-4 rounded-lg border-2 border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground hover-scale"
              >
                ❌ Clear Filters
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
              📊 Showing {filteredProducts.length} of {products.length} products
            </span>
            {filteredProducts.length !== products.length && (
              <span className="text-muted-foreground animate-pulse-soft">
                🔍 Filtered results
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-in">
        {filteredProducts.map((product, index) => (
          <div
            key={product.sku}
            className="bg-gradient-to-br from-card via-card/95 to-secondary/30 border-2 border-primary/20 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 group"
            onClick={() => handleProductClick(product)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Stock Badge */}
              <div className="absolute top-2 right-2">
                <Badge 
                  variant={product.inStock ? "default" : "secondary"} 
                  className={`text-xs font-semibold ${
                    product.inStock 
                      ? 'bg-success text-success-foreground animate-pulse-soft shadow-lg' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                </Badge>
              </div>

              {/* Store Badge */}
              <div className="absolute top-2 left-2">
                <Badge className="text-xs bg-primary/90 text-primary-foreground shadow-lg">
                  🏪 {product.store}
                </Badge>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200 min-h-[2.5rem]">
                {product.title}
              </h3>

              {/* Category */}
              <Badge variant="outline" className="text-xs bg-accent/50 hover:bg-accent transition-colors">
                📂 {product.category}
              </Badge>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {product.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs bg-secondary/50 hover:bg-secondary transition-colors">
                    🏷️ {tag}
                  </Badge>
                ))}
                {product.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs bg-muted/50">
                    +{product.tags.length - 2}
                  </Badge>
                )}
              </div>

              {/* Action Button */}
              <Button
                size="sm"
                onClick={(e) => handleDirectLink(product, e)}
                disabled={!product.inStock}
                className="w-full mt-3 gradient-hero hover:opacity-90 disabled:opacity-50 hover-lift"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {product.inStock ? "🚀 View Product" : "❌ Unavailable"}
              </Button>

              {/* SKU */}
              <div className="text-xs text-muted-foreground font-mono text-center border-t pt-2 border-border/50">
                SKU: {product.sku}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your filters.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setFilters({
              search: "",
              category: "",
              store: "",
              priceRange: [0, 1000],
              inStock: false,
            })}
          >
            Clear All Filters
          </Button>
        </div>
      )}

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