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

      {/* Desktop Spreadsheet */}
      <div className="hidden md:block animate-fade-in">
        <div className="border-2 border-table-border rounded-xl overflow-hidden shadow-medium bg-card">
          <table className="w-full">
            <thead className="spreadsheet-header">
              <tr>
                <th className="spreadsheet-cell py-4 w-20">🖼️ Image</th>
                <th className="spreadsheet-cell py-4">📦 Product Details</th>
                <th className="spreadsheet-cell py-4 w-48">🏪 Store</th>
                <th className="spreadsheet-cell py-4 w-32">💰 Price</th>
                <th className="spreadsheet-cell py-4 w-52">🏷️ Tags</th>
                <th className="spreadsheet-cell py-4 w-32">🔗 Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr
                  key={product.sku}
                  className={`spreadsheet-row ${
                    index % 2 === 0 ? 'bg-table-row-even' : 'bg-table-row-odd'
                  }`}
                  onClick={() => handleProductClick(product)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="spreadsheet-cell">
                    <div className="relative">
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-14 h-14 rounded-lg object-cover shadow-soft hover:shadow-medium transition-all duration-300 hover-scale"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </td>
                  <td className="spreadsheet-cell">
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors duration-200">
                        {product.title}
                      </div>
                      <div className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full w-fit">
                        📂 {product.category}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        SKU: {product.sku}
                      </div>
                    </div>
                  </td>
                  <td className="spreadsheet-cell">
                    <div className="font-medium text-foreground">🏪 {product.store}</div>
                  </td>
                  <td className="spreadsheet-cell">
                    <div className="space-y-2">
                      <div className="text-lg font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </div>
                      <Badge 
                        variant={product.inStock ? "default" : "secondary"} 
                        className={`text-xs ${product.inStock ? 'animate-pulse-soft' : ''}`}
                      >
                        {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                      </Badge>
                    </div>
                  </td>
                  <td className="spreadsheet-cell">
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs hover-scale">
                          🏷️ {tag}
                        </Badge>
                      ))}
                      {product.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs hover-scale">
                          +{product.tags.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="spreadsheet-cell">
                    <Button
                      size="sm"
                      onClick={(e) => handleDirectLink(product, e)}
                      disabled={!product.inStock}
                      className="w-full hover-lift"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      {product.inStock ? "🚀 View" : "❌ Unavailable"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredProducts.map((product) => (
          <div
            key={product.sku}
            className="bg-card border border-table-border rounded-lg p-4 cursor-pointer hover:bg-secondary transition-colors duration-fast"
            onClick={() => handleProductClick(product)}
          >
            <div className="flex gap-3">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-16 h-16 rounded object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-card-foreground line-clamp-2 mb-1">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{product.store}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {product.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
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