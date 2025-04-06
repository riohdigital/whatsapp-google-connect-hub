
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Loader2 } from "lucide-react";

interface WebhookConfigProps {
  userEmail: string | null;
  onLogout: () => void;
}

const WebhookConfig = ({ userEmail, onLogout }: WebhookConfigProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState("");

  const handleConfigureWebhook = () => {
    if (!n8nWebhookUrl) {
      toast({
        title: "URL necessária",
        description: "Por favor, insira a URL do webhook do n8n",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Enviar credenciais para o webhook do n8n
    fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        status: "connected",
      }),
    })
      .then(response => {
        if (!response.ok) throw new Error("Falha ao enviar para webhook");
        return response.json();
      })
      .then(() => {
        toast({
          title: "Credenciais enviadas",
          description: "As credenciais foram enviadas com sucesso para o n8n!",
        });
      })
      .catch(error => {
        toast({
          title: "Erro ao enviar credenciais",
          description: error.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Configurar Webhook do n8n</h3>
      <p className="text-gray-600 mb-4">
        Agora você precisa inserir a URL do webhook do n8n para enviar as credenciais de acesso:
      </p>
      
      <div>
        <label htmlFor="webhook" className="block text-sm font-medium text-gray-700 mb-1">
          URL do Webhook
        </label>
        <input
          type="text"
          id="webhook"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="https://seu-n8n.exemplo.com/webhook/..."
          value={n8nWebhookUrl}
          onChange={(e) => setN8nWebhookUrl(e.target.value)}
        />
      </div>
      
      <Button 
        onClick={handleConfigureWebhook}
        disabled={isLoading || !n8nWebhookUrl}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando credenciais...
          </>
        ) : (
          "Enviar credenciais para n8n"
        )}
      </Button>
      
      <Button
        onClick={onLogout}
        variant="outline"
        className="w-full mt-4"
      >
        Desconectar conta Google
      </Button>
      
      <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm mt-4">
        <AlertCircle className="text-yellow-600 w-5 h-5 shrink-0" />
        <p className="text-yellow-700">
          Em um ambiente de produção, este passo seria automatizado e seguro, sem expor a URL do webhook.
          As credenciais reais são armazenadas no Supabase.
        </p>
      </div>
    </div>
  );
};

export default WebhookConfig;
