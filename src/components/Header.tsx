import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png"; // Import your logo image

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Calendar", href: "/calendar" },
    { name: "Officers", href: "/officers" },
    { name: "Resources", href: "/resources" },
    { name: "Archive", href: "/archive" },
    { name: "EVMT", href: "/evmt" },
  ];

  const isActivePage = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="backdrop-blur-xl bg-background/80 border-b border-border/50 sticky top-0 z-50 supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Adjusted logo size (w-10 h-10) and reduced glow opacity (opacity-10) */}
              <img src={Logo} alt="EVHS Math Club Logo" className="w-9 h-9 object-contain" />
              <div className="absolute -inset-1 bg-gradient-primary rounded-xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">EVHS Math Club</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative transition-all duration-300 ${
                  isActivePage(item.href)
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                } group`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full ${
                  isActivePage(item.href) ? "w-full" : ""
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-primary/10 hover:text-primary"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActivePage(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
