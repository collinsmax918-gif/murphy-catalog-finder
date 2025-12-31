import { ArrowRight, Package, Link, Search, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const ToolsSection = () => {
  return (
    <div className="pt-32 pb-16 space-y-6">
      {/* Top Row - Two Large Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Promo Card */}
        <div className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden">
          <Lock className="absolute top-6 right-6 w-6 h-6 text-muted-foreground" />
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">KakoBuy</h3>
            <p className="text-muted-foreground">
              Register on Kakobuy and claim coupons worth 410 dollars.
            </p>
            <Button 
              variant="outline" 
              className="bg-card border-border hover:bg-secondary"
            >
              Check
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Guide Card */}
        <div className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden">
          <FileText className="absolute top-6 right-6 w-6 h-6 text-muted-foreground" />
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Guide</h3>
            <p className="text-muted-foreground">
              See how to order on Kakobuy.
            </p>
            <Button className="w-full bg-secondary hover:bg-secondary/80 text-foreground border-0">
              Watch now
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Row - Three Small Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tracking Card */}
        <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
          <Package className="absolute top-6 right-6 w-5 h-5 text-muted-foreground" />
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-foreground">Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Track your parcel status with ease.
            </p>
            <Button className="w-full bg-secondary hover:bg-secondary/80 text-foreground border-0">
              Track package
            </Button>
          </div>
        </div>

        {/* Link Converter Card */}
        <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
          <Link className="absolute top-6 right-6 w-5 h-5 text-muted-foreground" />
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-foreground">Link converter</h3>
            <p className="text-sm text-muted-foreground">
              Convert links from multiple platforms.
            </p>
            <Button className="w-full bg-secondary hover:bg-secondary/80 text-foreground border-0">
              Convert now
            </Button>
          </div>
        </div>

        {/* Quality Checks Card */}
        <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
          <Search className="absolute top-6 right-6 w-5 h-5 text-muted-foreground" />
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-foreground">Quality checks</h3>
            <p className="text-sm text-muted-foreground">
              Check product price, QC, and more.
            </p>
            <Button className="w-full bg-secondary hover:bg-secondary/80 text-foreground border-0">
              Search now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsSection;