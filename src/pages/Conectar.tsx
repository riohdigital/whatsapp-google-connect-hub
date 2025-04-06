
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { checkLocalAuthState, clearLocalAuthState } from "@/utils/googleAuth";
import GoogleOAuthButton from "@/components/GoogleOAuthButton";
import ConnectionStatus from "@/components/ConnectionStatus";
import WebhookConfig from "@/components/WebhookConfig";
import ErrorDisplay from "@/components/ErrorDisplay";
import ConnectionBenefits from "@/components/ConnectionBenefits";
import ConnectionPermissions from "@/components/ConnectionPermissions";
import ConnectionInfo from "@/components/ConnectionInfo";

// Configurações do ambiente
const GOOGLE_CLIENT_ID = "414232145280-as5a3ntt18cj35c97gadceaaadstrsja.apps.googleusercontent.com"; 
// Use o URL completo da função Edge, incluindo o ID do projeto Supabase
const SUPABASE_EDGE_FUNCTION_URL = "https://uoeshejtkzngnqxtqtbl.supabase.co/functions/v1/auth-google-exchange"; 

const Conectar = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  
  // Carregar o script do Google Identity Services
  useEffect(() => {
    const loadGoogleScript = () => {
      if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
        console.log("Script do Google já carregado");
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => console.log("Google Identity Services carregado com sucesso");
      script.onerror = (e) => console.error("Erro ao carregar Google Identity Services:", e);
      document.body.appendChild(script);
    };

    loadGoogleScript();
  }, []);
  
  // Verificar estado de autenticação ao carregar
  useEffect(() => {
    const authState = checkLocalAuthState();
    if (authState?.authenticated) {
      setIsAuthorized(true);
      setUserEmail(authState.email);
    }
    
    // Limpar estados de erro anteriores
    setAuthError(null);
    setErrorDetails(null);
    
    console.log("Página Conectar iniciada - Ambiente:", {
      urlAtual: window.location.href,
      edgeFunctionUrl: SUPABASE_EDGE_FUNCTION_URL
    });
  }, []);

  const handleAuthSuccess = (email: string) => {
    setIsAuthorized(true);
    setUserEmail(email);
  };

  const handleAuthError = (errorMessage: string, details?: string) => {
    setAuthError(errorMessage);
    setErrorDetails(details || null);
  };
  
  const handleLogout = () => {
    setIsAuthorized(false);
    setUserEmail(null);
    clearLocalAuthState();
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Conectar Conta Google</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Conecte sua conta Google de forma segura para integrar com seu assistente WhatsApp
          </p>
        </div>
      </section>
      
      {/* Connection Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Conectar com Google</h2>
                  <p className="text-gray-600 mb-6">
                    Ao clicar no botão abaixo, você será redirecionado para a página de autorização 
                    do Google para conceder acesso ao seu Gmail e Google Calendar.
                  </p>
                  
                  <ConnectionPermissions />
                </div>
                
                <ErrorDisplay errorMessage={authError || ''} errorDetails={errorDetails} />
                
                <ConnectionInfo 
                  edgeFunctionUrl={SUPABASE_EDGE_FUNCTION_URL}
                  clientId={GOOGLE_CLIENT_ID}
                />
                
                {!isAuthorized ? (
                  <GoogleOAuthButton
                    clientId={GOOGLE_CLIENT_ID}
                    edgeFunctionUrl={SUPABASE_EDGE_FUNCTION_URL}
                    onAuthSuccess={handleAuthSuccess}
                    onAuthError={handleAuthError}
                  />
                ) : (
                  <div className="mb-8">
                    <ConnectionStatus userEmail={userEmail} />
                    
                    <WebhookConfig
                      userEmail={userEmail}
                      onLogout={handleLogout}
                    />
                  </div>
                )}
                
                <ConnectionBenefits />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Conectar;
