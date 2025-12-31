import { useState, useEffect } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductTable from "@/components/ProductTable";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import murphyBanner from "@/assets/murphy-banner.png";
import murphyFindsTitle from "@/assets/murphy-finds-title.png";

const Catalog = () => {
  const [email, setEmail] = useState("");
  const [showEmailSignup, setShowEmailSignup] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data) {
          // Map database fields to Product type
          const mappedProducts: Product[] = data.map(item => ({
            sku: item.sku,
            title: item.title,
            store: item.store,
            category: item.category,
            price: item.price,
            image_url: item.image_url,
            product_url: item.product_url,
            tags: item.tags || [],
            description: item.description || '',
            inStock: item.in_stock ?? true,
          }));
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error loading products",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Email signup:', email);
      toast({
        title: "Welcome to Murphy Finds!",
        description: "You'll receive updates about new products and deals.",
      });
      setEmail("");
      setShowEmailSignup(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Header with Murphy Banner */}
      <div className="relative border-b border-gray-800 bg-gray-900 overflow-hidden">
        {/* Murphy Banner Image - Larger */}
        <div className="flex justify-center pt-12 pb-2">
          <img 
            src={murphyBanner}
            alt="Murphy Reps Banner"
            className="h-24 md:h-48 object-contain"
          />
        </div>
        
        
        {/* Content overlay */}
        <div className="">
          <div className="container mx-auto px-4 py-2 md:py-4 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="animate-fade-in">
                <p className="text-sm md:text-lg text-gray-400 mb-6 md:mb-8 animate-slide-up">
                  Discover and browse my BEST Finds and Recent Pickups from my videos. 📥
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="animate-scale-in flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Button
                  variant="outline"
                  onClick={() => setShowEmailSignup(true)}
                  className="h-12 px-8 text-base bg-transparent border-2 border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500 rounded-xl font-medium"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Join Community
                </Button>
                <Button
                  onClick={() => document.getElementById('product-table')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-12 px-8 text-base bg-white text-gray-900 hover:bg-gray-200 rounded-xl font-medium"
                >
                  Browse Finds
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              {/* Email Signup Modal */}
              {showEmailSignup && (
                <div className="bg-gray-800/95 backdrop-blur-sm border-2 border-gray-700 rounded-xl p-6 max-w-md mx-auto mb-8 shadow-medium animate-scale-in">
                  <form onSubmit={handleEmailSignup} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="✉️ Enter your email for updates"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 text-base border-2 border-gray-600 bg-gray-900 text-white placeholder:text-gray-500 focus:border-purple-500"
                    />
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 text-white">
                        Subscribe 🚀
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowEmailSignup(false)}
                        className="px-4 border-2 border-gray-600 text-white hover:bg-gray-700"
                      >
                        ❌
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Quick Stats */}
              <div className="flex justify-center gap-6 md:gap-8 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 md:px-6 py-4 border border-gray-700 hover-scale">
                  <div className="text-xl md:text-2xl font-bold text-white">3000+</div>
                  <div className="text-xs md:text-sm text-gray-400">Products</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 md:px-6 py-4 border border-gray-700 hover-scale">
                  <div className="text-xl md:text-2xl font-bold text-white">500+</div>
                  <div className="text-xs md:text-sm text-gray-400">Verified Sellers</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 md:px-6 py-4 border border-gray-700 hover-scale">
                  <div className="text-xl md:text-2xl font-bold text-white">24/7</div>
                  <div className="text-xs md:text-sm text-gray-400">Updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div id="product-table" className="container mx-auto px-4 py-8 bg-gray-950">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <ProductTable products={products} />
        )}
      </div>

      {/* Exit Intent Simulation (shows after 10 seconds) */}
      {/* In a real app, this would be triggered by mouse movement toward browser tab */}
    </div>
  );
};

export default Catalog;