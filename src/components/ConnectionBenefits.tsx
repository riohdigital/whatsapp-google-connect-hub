
import { Mail, Calendar } from "lucide-react";

const ConnectionBenefits = () => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-medium mb-3">O que acontece depois?</h3>
      <p className="text-gray-600 mb-4">
        Após a autorização, seu assistente WhatsApp estará habilitado para:
      </p>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex gap-3">
          <Mail className="text-blue-500 shrink-0" />
          <div>
            <p className="font-medium">Acessar seus emails</p>
            <p className="text-sm text-gray-500">Ler e notificar sobre emails importantes</p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex gap-3">
          <Calendar className="text-green-500 shrink-0" />
          <div>
            <p className="font-medium">Gerenciar eventos</p>
            <p className="text-sm text-gray-500">Criar e lembrá-lo de compromissos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionBenefits;
