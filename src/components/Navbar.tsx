import { Search, Grid3X3, SearchIcon, CheckCircle, Users, Settings2, Heart, Settings, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import murphyFindsLogo from "@/assets/murphy-finds-logo.png";

const Navbar = () => {
  const navItems = [
    { label: "Spreadsheet", icon: Grid3X3, href: "/" },
    { label: "Browse finds", icon: SearchIcon, href: "/" },
    { label: "Quality checks", icon: CheckCircle, href: "/" },
    { label: "Sellers", icon: Users, href: "/" },
    { label: "Tools", icon: Settings2, href: "/" },
  ];

  return (
    <>
      {/* Animated Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-pink-700 text-white py-2 text-sm font-medium overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-8">📈 HUNDREDS OF NEW FINDS EVERY WEEK 📊</span>
          <span className="mx-8">👥 JOIN OUR COMMUNITY WITH 10K+ MEMBERS 🔥</span>
          <span className="mx-8">📋 OVER 5K ITEMS ON SPREADSHEET 💎</span>
          <span className="mx-8">📈 HUNDREDS OF NEW FINDS EVERY WEEK 📊</span>
          <span className="mx-8">👥 JOIN OUR COMMUNITY WITH 10K+ MEMBERS 🔥</span>
          <span className="mx-8">📋 OVER 5K ITEMS ON SPREADSHEET 💎</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex flex-shrink-0 items-center gap-2" aria-label="Murphy Finds home">
              <img
                src={murphyFindsLogo}
                alt="Murphy Finds logo"
                className="h-10 w-auto object-contain"
                loading="eager"
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex relative max-w-xs flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 h-10 bg-secondary/50 border-border rounded-xl"
              />
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors duration-200"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-2">
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors duration-200">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors duration-200">
                <Settings className="h-5 w-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors duration-200">
                <ShoppingCart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;