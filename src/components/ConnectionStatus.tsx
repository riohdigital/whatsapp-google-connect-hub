
import { CheckCircle2 } from "lucide-react";

interface ConnectionStatusProps {
  userEmail: string | null;
}

const ConnectionStatus = ({ userEmail }: ConnectionStatusProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-8">
      <CheckCircle2 className="text-green-600" />
      <div>
        <p className="font-medium text-green-800">Conta Google conectada</p>
        <p className="text-green-700 text-sm">
          {userEmail ? `${userEmail} autenticado com sucesso` : 'Sua autenticação foi concluída com sucesso'}
        </p>
      </div>
    </div>
  );
};

export default ConnectionStatus;
