
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
                <div className="w-3 h-3 rounded-full bg-brand-red"></div>
                <div className="w-3 h-3 rounded-full bg-brand-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-brand-green"></div>
              </div>
              <span className="font-bold text-lg">WhatsApp Connect</span>
            </div>
            <p className="text-gray-600 max-w-md">
              Integração simples e segura entre seu assistente WhatsApp, Gmail e Google Calendar.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">Início</Link>
              </li>
              <li>
                <Link to="/como-funciona" className="text-gray-600 hover:text-gray-900">Como Funciona</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
              </li>
              <li>
                <Link to="/conectar" className="text-gray-600 hover:text-gray-900">Conectar Conta</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <span className="font-medium">Email:</span> contato@exemplo.com
              </li>
              <li className="text-gray-600">
                <span className="font-medium">WhatsApp:</span> +55 (11) 99999-9999
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} WhatsApp Connect. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
