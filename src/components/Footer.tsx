import { useState } from "react";
import { Mail, MessageCircle, Instagram, Music, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import murphyBannerFooter from "@/assets/murphy-banner-footer.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter signup:', email);
      toast({
        title: "Thanks for subscribing!",
        description: "You'll receive our latest product updates and deals.",
      });
      setEmail("");
    }
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/murphyfinds", label: "Instagram" },
    { icon: Music, href: "https://tiktok.com/@murphyfinds", label: "TikTok" },
    { icon: MessageCircle, href: "https://discord.gg/murphyfinds", label: "Discord" },
    { icon: Youtube, href: "https://youtube.com/@murphyfinds", label: "YouTube" },
    { icon: Twitter, href: "https://twitter.com/murphyfinds", label: "Twitter" },
  ];

  return (
    <footer className="border-t border-table-border bg-card mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src={murphyBannerFooter} 
                alt="Murphy Finds Banner" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-muted-foreground">
              Your trusted guide to authentic Taobao & 1688 products. 
              Discover quality items with our easy-to-use spreadsheet format.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-fast"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-muted-foreground hover:text-primary transition-colors duration-fast"
              >
                Product Spreadsheet
              </Link>
              <Link 
                to="/tutorial" 
                className="block text-muted-foreground hover:text-primary transition-colors duration-fast"
              >
                How to Order
              </Link>
              <Link 
                to="/socials" 
                className="block text-muted-foreground hover:text-primary transition-colors duration-fast"
              >
                Follow Us
              </Link>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="font-semibold text-card-foreground">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Get notified about new product discoveries and exclusive deals.
            </p>
            <form onSubmit={handleNewsletterSignup} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              <Button type="submit" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-table-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>© 2024 Murphy Finds. All rights reserved. We help you discover authentic products from Taobao & 1688.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;