import { useState, useEffect } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductTable from "@/components/ProductTable";
import ToolsSection from "@/components/ToolsSection";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";
import murphyBanner from "@/assets/murphy-banner.png";

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
    <div className="min-h-screen bg-background">
      {/* Navbar with animated bar */}
      <Navbar />
      
      {/* Hero Header with Murphy Banner */}
      <div className="relative bg-gradient-to-b from-purple-500 via-pink-300 via-pink-200 via-pink-100 to-background overflow-hidden min-h-[54vh] flex flex-col justify-center">
        {/* Murphy Banner Image - Larger */}
        <div className="flex justify-center pt-16 md:pt-24 pb-8">
          <img 
            src={murphyBanner}
            alt="Murphy Reps Banner"
            className="h-24 md:h-48 object-contain"
          />
        </div>
        
        {/* Content overlay */}
        <div className="flex-1 flex items-start">
          <div className="container mx-auto px-4 py-4 md:py-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                <Button
                  variant="outline"
                  onClick={() => setShowEmailSignup(true)}
                  className="h-12 px-8 text-base bg-white/90 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 rounded-xl font-medium shadow-soft hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fade-in group"
                  style={{ animationDelay: "300ms" }}
                >
                  <Mail className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Join Community
                </Button>
                <Button
                  onClick={() => document.getElementById('product-table')?.scrollIntoView({ behavior: 'smooth' })}
                  className="h-12 px-8 text-base gradient-hero hover:opacity-90 rounded-xl font-medium shadow-medium hover:scale-105 hover:shadow-xl transition-all duration-300 animate-fade-in group"
                  style={{ animationDelay: "400ms" }}
                >
                  Browse Finds
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </div>
              
              {/* Tutorial Link */}
              <a 
                href="/tutorial" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm md:text-base animate-fade-in"
                style={{ animationDelay: "500ms" }}
              >
                See the KakoBuy ordering tutorial
              </a>
              
              {/* Email Signup Modal */}
              {showEmailSignup && (
                <div className="bg-card/95 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-6 max-w-md mx-auto mt-8 shadow-medium animate-scale-in">
                  <form onSubmit={handleEmailSignup} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="✉️ Enter your email for updates"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 text-base border-2 border-primary/30 focus:border-primary"
                    />
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1 h-12 gradient-hero hover:scale-[1.02] transition-transform duration-300">
                        Subscribe 🚀
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowEmailSignup(false)}
                        className="px-4 border-2 hover:scale-105 transition-transform duration-300"
                      >
                        ❌
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div id="product-table" className="container mx-auto px-4 pt-16 pb-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <ProductTable products={products} />
        )}
        
        {/* Tools Section */}
        <ToolsSection />
      </div>

      {/* Exit Intent Simulation (shows after 10 seconds) */}
      {/* In a real app, this would be triggered by mouse movement toward browser tab */}
    </div>
  );
};

export default Catalog;