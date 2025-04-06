
import { CheckCircle2 } from "lucide-react";

const ConnectionPermissions = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500" />
        <span className="text-gray-700">Acesso ao Gmail para leitura de emails</span>
      </div>
      <div className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500" />
        <span className="text-gray-700">Acesso ao Google Calendar para gerenciamento de eventos</span>
      </div>
      <div className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500" />
        <span className="text-gray-700">Você pode revogar o acesso a qualquer momento</span>
      </div>
    </div>
  );
};

export default ConnectionPermissions;
