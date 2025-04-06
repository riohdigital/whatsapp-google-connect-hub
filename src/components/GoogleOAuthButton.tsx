
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { initGoogleOAuthClient, sendCodeToBackend, saveLocalAuthState } from "@/utils/googleAuth";

interface GoogleOAuthButtonProps {
  clientId: string;
  edgeFunctionUrl: string;
  onAuthSuccess: (email: string) => void;
  onAuthError: (error: string, details?: string) => void;
}

const GoogleOAuthButton = ({ 
  clientId, 
  edgeFunctionUrl, 
  onAuthSuccess, 
  onAuthError 
}: GoogleOAuthButtonProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Google OAuth Configuration
  const googleScopes = [
    "email", 
    "profile", 
    "https://mail.google.com/", 
    "https://www.googleapis.com/auth/calendar.events"
  ];

  const handleGoogleAuth = () => {
    setIsLoading(true);
    
    console.log("Iniciando processo de autenticação");
    
    // Verificar se a biblioteca do Google foi carregada
    if (!(window as any).google?.accounts?.oauth2) {
      const errorMsg = "Biblioteca do Google não carregada. Recarregue a página e tente novamente.";
      console.error(errorMsg);
      toast({
        title: "Erro de carregamento",
        description: errorMsg,
        variant: "destructive",
      });
      setIsLoading(false);
      onAuthError(errorMsg);
      return;
    }
    
    const handleOAuthResponse = async (response: { code: string }) => {
      try {
        console.log("Código de autorização recebido:", response.code.substring(0, 10) + "...");
        
        // Enviar o código para o backend (Supabase Edge Function)
        console.log("Enviando código para o backend:", edgeFunctionUrl);
        const result = await sendCodeToBackend(response.code, edgeFunctionUrl);
        console.log("Resposta do backend:", result);
        
        // Salvar estado de autenticação
        saveLocalAuthState(result.email);
        
        onAuthSuccess(result.email);
        
        toast({
          title: "Autenticação realizada",
          description: `Sua conta Google (${result.email}) foi conectada com sucesso!`,
        });
      } catch (error) {
        console.error("Erro detalhado durante autenticação:", error);
        const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
        
        // Extrair mais detalhes do erro sem usar a propriedade 'cause'
        let errorDetails;
        if (error instanceof Error) {
          // Se o erro tiver alguma estrutura adicional, tente extraí-la como string
          errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error));
        }
        
        onAuthError(errorMessage, errorDetails);
        
        toast({
          title: "Falha na autenticação",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    try {
      console.log("Iniciando fluxo de autenticação com Google");
      console.log("Client ID:", clientId);
      console.log("Escopos solicitados:", googleScopes.join(', '));
      
      const client = initGoogleOAuthClient({
        clientId: clientId,
        scopes: googleScopes,
        callbackFunction: handleOAuthResponse,
      });
      
      // Iniciar o fluxo de autenticação
      console.log("Solicitando código de autorização");
      client.requestCode();
    } catch (error) {
      console.error("Erro ao iniciar autenticação:", error);
      setIsLoading(false);
      
      const errorMsg = error instanceof Error 
        ? `Erro na inicialização: ${error.message}` 
        : "Não foi possível iniciar o processo de autenticação Google.";
      
      onAuthError(errorMsg);
      toast({
        title: "Erro na inicialização",
        description: errorMsg,
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      onClick={handleGoogleAuth}
      disabled={isLoading}
      className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 w-full justify-center gap-3 mb-6"
      size="lg"
    >
      <div className="flex space-x-1">
        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
        <div className="w-4 h-4 rounded-full bg-red-500"></div>
        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
        <div className="w-4 h-4 rounded-full bg-green-500"></div>
      </div>
      <span>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Autorizando...
          </>
        ) : (
          "Autorizar com Google"
        )}
      </span>
    </Button>
  );
};

export default GoogleOAuthButton;
