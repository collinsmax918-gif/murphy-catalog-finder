import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductTable from "@/components/ProductTable";
import { mockProducts } from "@/data/mockProducts";
import { useToast } from "@/hooks/use-toast";
import murphyBanner from "@/assets/murphy-banner.png";
import murphyFindsTitle from "@/assets/murphy-finds-title.png";

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
      {/* Hero Header with Murphy Banner */}
      <div className="relative border-b border-table-border bg-gradient-to-b from-purple-500 via-pink-300 via-pink-100 to-white overflow-hidden">
        {/* Murphy Banner Image - Smaller */}
        <div className="flex justify-center pt-12 pb-1">
          <img 
            src={murphyBanner}
            alt="Murphy Reps Banner"
            className="h-20 md:h-28 object-contain"
          />
        </div>
        
        {/* Murphy Finds Title Image */}
        <div className="flex justify-center pb-6">
          <img 
            src={murphyFindsTitle}
            alt="Murphy Finds Huge Spreadsheet"
            className="h-20 md:h-28 object-contain"
          />
        </div>
        
        {/* Content overlay */}
        <div className="">
          <div className="container mx-auto px-4 py-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="animate-fade-in">
                <p className="text-lg md:text-xl text-gray-700 mb-8 animate-slide-up">
                  Discover authentic Taobao & 1688 products in our <span className="text-gray-800 font-semibold">spreadsheet-style</span> format. 
                  <br className="hidden md:block"/>
                  Professional product research made simple. 📊✨
                </p>
              </div>
              
              {/* Email Signup - Compact Design */}
              <div className="animate-scale-in">
                {!showEmailSignup ? (
                  <Button
                    onClick={() => setShowEmailSignup(true)}
                    className="mb-8 h-12 px-8 text-base gradient-hero hover-lift rounded-xl shadow-medium"
                  >
                    <Mail className="mr-3 h-5 w-5" />
                    📊 Get Spreadsheet Updates
                  </Button>
                ) : (
                  <div className="bg-card/95 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-6 max-w-md mx-auto mb-8 shadow-medium">
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
                        <Button type="submit" className="flex-1 h-12 gradient-hero">
                          Subscribe 🚀
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowEmailSignup(false)}
                          className="px-4 border-2"
                        >
                          ❌
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              
              {/* Quick Stats */}
              <div className="flex justify-center gap-6 md:gap-8 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl px-4 md:px-6 py-4 border-2 border-gray-200 hover-scale">
                  <div className="text-xl md:text-2xl font-bold text-gray-800">3000+</div>
                  <div className="text-xs md:text-sm text-gray-600">Products</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl px-4 md:px-6 py-4 border-2 border-gray-200 hover-scale">
                  <div className="text-xl md:text-2xl font-bold text-gray-800">500+</div>
                  <div className="text-xs md:text-sm text-gray-600">Verified Sellers</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl px-4 md:px-6 py-4 border-2 border-gray-200 hover-scale">
                  <div className="text-xl md:text-2xl font-bold text-gray-800">24/7</div>
                  <div className="text-xs md:text-sm text-gray-600">Updates</div>
                </div>
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