import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductTable from "@/components/ProductTable";
import { mockProducts } from "@/data/mockProducts";
import { useToast } from "@/hooks/use-toast";

const Catalog = () => {
  const [email, setEmail] = useState("");
  const [showEmailSignup, setShowEmailSignup] = useState(false);
  const { toast } = useToast();

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
      {/* Hero Header */}
      <div className="relative border-b border-table-border bg-gradient-to-br from-background via-secondary to-accent overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
                🔍 Murphy's Product Catalog
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up">
                Discover authentic Taobao & 1688 products in our <span className="text-primary font-semibold">spreadsheet-style</span> format. 
                <br className="hidden md:block"/>
                Professional product research made simple. 📊✨
              </p>
            </div>
            
            {/* Email Signup - Compact Design */}
            <div className="animate-scale-in">
              {!showEmailSignup ? (
                <Button
                  onClick={() => setShowEmailSignup(true)}
                  className="mb-6 h-14 px-8 text-lg gradient-hero hover-lift rounded-xl shadow-medium"
                >
                  <Mail className="mr-3 h-5 w-5" />
                  📬 Get Product Updates
                </Button>
              ) : (
                <div className="bg-card/80 backdrop-blur-sm border border-table-border rounded-xl p-6 max-w-md mx-auto mb-6 shadow-medium">
                  <form onSubmit={handleEmailSignup} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="✉️ Enter your email for updates"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 text-base"
                    />
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1 h-12">
                        Subscribe 🚀
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowEmailSignup(false)}
                        className="px-4"
                      >
                        ❌
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
            {/* Quick Stats */}
            <div className="flex justify-center gap-8 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="bg-card/60 backdrop-blur-sm rounded-lg px-6 py-3 border border-table-border">
                <div className="text-2xl font-bold text-primary">{mockProducts.length}+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-lg px-6 py-3 border border-table-border">
                <div className="text-2xl font-bold text-primary">5⭐</div>
                <div className="text-sm text-muted-foreground">Quality</div>
              </div>
              <div className="bg-card/60 backdrop-blur-sm rounded-lg px-6 py-3 border border-table-border">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="container mx-auto px-4 py-8">
        <ProductTable products={mockProducts} />
      </div>

      {/* Exit Intent Simulation (shows after 10 seconds) */}
      {/* In a real app, this would be triggered by mouse movement toward browser tab */}
    </div>
  );
};

export default Catalog;