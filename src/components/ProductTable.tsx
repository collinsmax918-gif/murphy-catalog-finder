import { useState } from "react";
import { ExternalLink, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    brand: "",
    priceRange: [0, 1000],
  });

  // Get unique values for filter dropdowns
  const categories = [...new Set(products.map(p => p.category))];
  const stores = [...new Set(products.map(p => p.store))];
  const brands = [...new Set(products.map(p => p.store))].filter(Boolean);

  // Filter products based on current filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = filters.search === "" || 
      product.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.store.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = filters.category === "" || filters.category === "all" || product.category === filters.category;
    const matchesStore = filters.store === "" || filters.store === "all" || product.store === filters.store;
    const matchesBrand = filters.brand === "" || filters.brand === "all" || 
      product.store.toLowerCase().includes(filters.brand.toLowerCase());
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];

    return matchesSearch && matchesCategory && matchesStore && matchesBrand && matchesPrice;
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
          {/* Search - Mobile Optimized */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary animate-pulse-soft" />
            <Input
              placeholder="🔍 Search products or stores..."
              className="pl-12 h-12 md:h-14 text-sm md:text-base bg-gradient-to-r from-background to-secondary border-2 border-primary/20 focus:border-primary/50 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>

          {/* Filter Row - Mobile Optimized */}
          <div className="space-y-3 md:space-y-0 md:flex md:flex-wrap md:gap-4 animate-slide-up">
            {/* Mobile: Stack vertically, Desktop: Row */}
            <div className="grid grid-cols-1 lg:grid-cols-auto gap-3 md:gap-4 lg:flex lg:flex-wrap">
              <Select 
                value={filters.category || "all"} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, category: value === "all" ? "" : value }))}
              >
                <SelectTrigger className="w-full md:w-[170px] h-12 md:h-11 bg-background border-2 border-table-border hover:border-primary/50 rounded-lg transition-all duration-300 hover:shadow-soft text-sm">
                  <SelectValue placeholder="📂 All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-table-border rounded-lg shadow-medium">
                  <SelectItem value="all">📋 All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>📦 {category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={filters.brand || "all"} 
                onValueChange={(value) => setFilters(prev => ({ ...prev, brand: value === "all" ? "" : value }))}
              >
                <SelectTrigger className="w-full md:w-[170px] h-12 md:h-11 bg-background border-2 border-table-border hover:border-primary/50 rounded-lg transition-all duration-300 hover:shadow-soft text-sm">
                  <SelectValue placeholder="🔮 All Brands" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-table-border rounded-lg shadow-medium z-50">
                  <SelectItem value="all">🔮 All Brands</SelectItem>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>🔮 {brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              {/* Clear Filters */}
              {(filters.search || filters.category || filters.brand) && (
                <Button
                  variant="outline"
                  onClick={() => setFilters({
                    search: "",
                    category: "",
                    store: "",
                    brand: "",
                    priceRange: [0, 1000],
                  })}
                  className="h-12 md:h-11 px-4 rounded-lg border-2 border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground hover-scale text-sm flex-1 sm:flex-none"
                >
                  ❌ Clear Filters
                </Button>
              )}
            </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
        {filteredProducts.map((product, index) => (
          <div
            key={product.sku}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Product Image */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 aspect-square flex items-center justify-center overflow-hidden">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
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
              brand: "",
              priceRange: [0, 1000],
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