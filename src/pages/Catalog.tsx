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
      {/* Header */}
      <div className="border-b border-table-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
              Murphy's Product Catalog
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Discover authentic Taobao & 1688 products in our easy-to-browse spreadsheet format. 
              Find exactly what you're looking for with instant search and smart filters.
            </p>
            
            {/* Email Signup CTA */}
            {!showEmailSignup ? (
              <Button
                onClick={() => setShowEmailSignup(true)}
                className="mb-4"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get Product Updates
              </Button>
            ) : (
              <form onSubmit={handleEmailSignup} className="flex max-w-md mx-auto gap-2 mb-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit">Subscribe</Button>
              </form>
            )}
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