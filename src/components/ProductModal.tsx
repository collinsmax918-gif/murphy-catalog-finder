import { useState } from "react";
import { X, ExternalLink, Share2, Copy, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const { toast } = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!isOpen || !product) return null;

  const handleProductClick = () => {
    // Track conversion event
    console.log('Product click tracked:', { sku: product.sku, title: product.title });
    window.open(product.product_url, '_blank');
  };

  const handleShare = async (platform: string) => {
    const shareUrl = `${window.location.origin}/#product-${product.sku}`;
    const shareText = `Check out ${product.title} - ${shareUrl}`;
    
    try {
      if (platform === 'copy') {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Product link copied to clipboard.",
        });
      } else if (platform === 'wechat') {
        // WeChat sharing would need specific integration
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Text copied for WeChat",
          description: "Share text copied to clipboard.",
        });
      } else if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
      }
    } catch (error) {
      toast({
        title: "Sharing failed",
        description: "Could not share the product link.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative mx-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-lg shadow-medium">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-table-border bg-card rounded-t-lg">
          <h2 className="text-xl font-semibold text-card-foreground line-clamp-1">
            {product.title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-lg bg-muted overflow-hidden">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">Store:</span>
                  <span className="font-medium text-foreground">{product.store}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <span className="text-foreground">{product.category}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-muted-foreground">SKU:</span>
                  <span className="font-mono text-sm text-foreground">{product.sku}</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
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
                    padding: '4px 8px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    minHeight: '20px',
                    boxSizing: 'border-box',
                    backgroundColor: product.inStock ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
                    color: product.inStock ? 'hsl(var(--primary-foreground))' : 'hsl(var(--secondary-foreground))'
                  }}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

               {/* Tags */}
               <div className="flex flex-wrap gap-2">
                 {product.tags.map((tag) => (
                   <span 
                     key={tag}
                     style={{
                       display: 'inline-flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       borderRadius: '9999px',
                       border: '1px solid transparent',
                       fontSize: '12px',
                       fontWeight: '500',
                       lineHeight: '1',
                       padding: '4px 8px',
                       whiteSpace: 'nowrap',
                       flexShrink: 0,
                       minHeight: '20px',
                       boxSizing: 'border-box',
                       backgroundColor: 'hsl(var(--secondary))',
                       color: 'hsl(var(--secondary-foreground))'
                     }}
                   >
                     🏷️ {tag}
                   </span>
                 ))}
               </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* CTA Button */}
              <Button 
                onClick={handleProductClick}
                className="w-full h-12 text-base font-semibold"
                disabled={!product.inStock}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {product.inStock ? "View on Taobao/1688" : "Out of Stock"}
              </Button>

              {/* Share Buttons */}
              <div className="border-t border-table-border pt-4">
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Share this product</h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('copy')}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Link
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('whatsapp')}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('wechat')}
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    WeChat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky CTA */}
        <div className="sticky bottom-0 p-4 border-t border-table-border bg-card md:hidden">
          <Button 
            onClick={handleProductClick}
            className="w-full h-12 text-base font-semibold"
            disabled={!product.inStock}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            {product.inStock ? "View on Taobao/1688" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;