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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fade-in">
        {filteredProducts.map((product, index) => (
          <div
            key={product.sku}
            className="bg-gradient-to-br from-card via-card/95 to-secondary/30 border-2 border-primary/20 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 group flex flex-col h-full"
            onClick={() => handleProductClick(product)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Product Image */}
            <div className="relative overflow-hidden bg-secondary/20">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-72 object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Store Badge */}
              <div className="absolute top-2 left-2">
                <span 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '9999px',
                    border: '1px solid transparent',
                     fontSize: '12px',
                     fontWeight: '500',
                     lineHeight: '1',
                     padding: '0px 6px',
                     whiteSpace: 'nowrap',
                     flexShrink: 0,
                    boxSizing: 'border-box',
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))'
                  }}
                >
                  🏪 {product.store}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-3 space-y-2 flex flex-col h-full">
              {/* Title */}
              <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200">
                {product.title}
              </h3>

              {/* Category */}
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  borderRadius: '9999px',
                  border: '1px solid transparent',
                  fontSize: '11px',
                  fontWeight: '500',
                  lineHeight: '1',
                  padding: '2px 8px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                  backgroundColor: 'hsl(var(--accent))',
                  color: 'hsl(var(--accent-foreground))',
                  width: 'fit-content'
                }}
              >
                📂 {product.category}
              </span>

              {/* Price */}
              <div className="text-lg font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </div>

              {/* Action Button - Pushed to bottom */}
              <div className="mt-auto pt-2">
                <Button
                  size="sm"
                  onClick={(e) => handleDirectLink(product, e)}
                  className="w-full gradient-hero hover:opacity-90 hover-lift text-xs h-8"
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  🚀 View Product
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