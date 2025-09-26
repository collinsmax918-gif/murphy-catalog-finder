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
    
    const matchesCategory = filters.category === "" || product.category === filters.category;
    const matchesStore = filters.store === "" || product.store === filters.store;
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
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, stores, or tags..."
              className="pl-10 h-12 text-base"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-3">
            <Select 
              value={filters.category} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={filters.store} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, store: value }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Stores</SelectItem>
                {stores.map(store => (
                  <SelectItem key={store} value={store}>{store}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={filters.inStock ? "default" : "outline"}
              onClick={() => setFilters(prev => ({ ...prev, inStock: !prev.inStock }))}
            >
              <Filter className="mr-2 h-4 w-4" />
              In Stock Only
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
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="border border-table-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-table-header">
              <tr>
                <th className="text-left p-4 font-semibold text-table-header-foreground">Image</th>
                <th className="text-left p-4 font-semibold text-table-header-foreground">Product</th>
                <th className="text-left p-4 font-semibold text-table-header-foreground">Store</th>
                <th className="text-left p-4 font-semibold text-table-header-foreground">Price</th>
                <th className="text-left p-4 font-semibold text-table-header-foreground">Tags</th>
                <th className="text-left p-4 font-semibold text-table-header-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr
                  key={product.sku}
                  className={`cursor-pointer transition-colors duration-fast hover:bg-table-row-hover ${
                    index % 2 === 0 ? 'bg-table-row-even' : 'bg-table-row-odd'
                  }`}
                  onClick={() => handleProductClick(product)}
                >
                  <td className="p-4">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-foreground line-clamp-2">
                      {product.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {product.category}
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{product.store}</td>
                  <td className="p-4">
                    <div className="font-semibold text-foreground">
                      ${product.price.toFixed(2)}
                    </div>
                    <Badge variant={product.inStock ? "default" : "secondary"} className="mt-1">
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {product.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <Button
                      size="sm"
                      onClick={(e) => handleDirectLink(product, e)}
                      disabled={!product.inStock}
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      View
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