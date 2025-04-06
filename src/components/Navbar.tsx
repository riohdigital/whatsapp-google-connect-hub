
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 md:px-12 relative z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
            <div className="w-3 h-3 rounded-full bg-brand-red"></div>
            <div className="w-3 h-3 rounded-full bg-brand-yellow"></div>
            <div className="w-3 h-3 rounded-full bg-brand-green"></div>
          </div>
          <Link to="/" className="font-bold text-xl">DigiRioh</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
            Início
          </Link>
          <Link to="/como-funciona" className="text-gray-700 hover:text-gray-900 font-medium">
            Como Funciona
          </Link>
          <Link to="/planos" className="text-gray-700 hover:text-gray-900 font-medium">
            Planos
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium">
                Dashboard
              </Link>
              <Button variant="outline" onClick={signOut}>
                Sair
              </Button>
            </>
          ) : (
            <Button variant="default" asChild>
              <Link to="/auth">Entrar</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMenu}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-10">
          <div className="flex flex-col py-4 px-6 space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-gray-900 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/como-funciona" 
              className="text-gray-700 hover:text-gray-900 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link 
              to="/planos" 
              className="text-gray-700 hover:text-gray-900 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Planos
            </Link>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-gray-900 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button variant="outline" onClick={() => { signOut(); setIsMenuOpen(false); }}>
                  Sair
                </Button>
              </>
            ) : (
              <Button variant="default" asChild onClick={() => setIsMenuOpen(false)}>
                <Link to="/auth">Entrar</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
