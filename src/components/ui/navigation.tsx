import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LogIn, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import murphyFindsLogo from "@/assets/murphy-finds-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
    { href: "/", label: "Spreadsheet" },
    { href: "/socials", label: "Socials" },
    { href: "/tutorial", label: "How to Order" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-pink-700 text-white py-2 text-sm font-medium overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-8">📈 HUNDREDS OF NEW FINDS EVERY WEEK 📊</span>
          <span className="mx-8">📈 HUNDREDS OF NEW FINDS EVERY WEEK 📊</span>
          <span className="mx-8">📈 HUNDREDS OF NEW FINDS EVERY WEEK 📊</span>
          <span className="mx-8">📈 HUNDREDS OF NEW FINDS EVERY WEEK 📊</span>
        </div>
      </div>
      
      <nav className="sticky top-0 z-50 border-b border-table-border bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src={murphyFindsLogo} 
                alt="Murphy Finds" 
                className="h-36 md:h-40 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`font-medium transition-colors duration-fast ${
                    isActive(item.href)
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Admin Link */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`font-medium transition-colors duration-fast flex items-center gap-2 ${
                    isActive("/admin")
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
              
              {/* Auth Button */}
              {user ? (
                <Button onClick={signOut} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-table-border bg-background">
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`block px-4 py-2 font-medium transition-colors duration-fast ${
                      isActive(item.href)
                        ? "text-primary bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Admin Link - Mobile */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors duration-fast ${
                      isActive("/admin")
                        ? "text-primary bg-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                )}
                
                {/* Auth Button - Mobile */}
                <div className="px-4 pt-2">
                  {user ? (
                    <Button onClick={() => { signOut(); setIsOpen(false); }} variant="outline" size="sm" className="w-full">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  ) : (
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;