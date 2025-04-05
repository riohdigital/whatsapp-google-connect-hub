
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Calendar, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Conectar = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState("");
  
  // No ambiente real, isso seria substituído pela integração com o Google OAuth
  const handleGoogleAuth = () => {
    setIsLoading(true);
    
    // Simulando o processo de autenticação
    setTimeout(() => {
      setIsAuthorized(true);
      setIsLoading(false);
      
      toast({
        title: "Autenticação realizada",
        description: "Sua conta Google foi conectada com sucesso!",
      });
    }, 2000);
  };
  
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
    
    // Simulando o envio para o webhook
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Credenciais enviadas",
        description: "As credenciais foram enviadas com sucesso para o n8n!",
      });
    }, 1500);
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
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-brand-green" />
                      <span className="text-gray-700">Acesso ao Gmail para leitura de emails</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-brand-green" />
                      <span className="text-gray-700">Acesso ao Google Calendar para gerenciamento de eventos</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-brand-green" />
                      <span className="text-gray-700">Você pode revogar o acesso a qualquer momento</span>
                    </div>
                  </div>
                </div>
                
                {!isAuthorized ? (
                  <Button 
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                    className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 w-full justify-center gap-3 mb-6"
                    size="lg"
                  >
                    <div className="flex space-x-1">
                      <div className="w-4 h-4 rounded-full bg-brand-blue"></div>
                      <div className="w-4 h-4 rounded-full bg-brand-red"></div>
                      <div className="w-4 h-4 rounded-full bg-brand-yellow"></div>
                      <div className="w-4 h-4 rounded-full bg-brand-green"></div>
                    </div>
                    <span>
                      {isLoading ? "Autorizando..." : "Autorizar com Google"}
                    </span>
                  </Button>
                ) : (
                  <div className="mb-8">
                    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-8">
                      <CheckCircle2 className="text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Conta Google conectada</p>
                        <p className="text-green-700 text-sm">Sua autenticação foi concluída com sucesso</p>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4">Configurar Webhook do n8n</h3>
                    <p className="text-gray-600 mb-4">
                      Agora você precisa inserir a URL do webhook do n8n para enviar as credenciais de acesso:
                    </p>
                    
                    <div className="space-y-4">
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
                        {isLoading ? "Enviando credenciais..." : "Enviar credenciais para n8n"}
                      </Button>
                      
                      <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                        <AlertCircle className="text-yellow-600 w-5 h-5 shrink-0" />
                        <p className="text-yellow-700">
                          Em um ambiente de produção, este passo seria automatizado e seguro, sem expor a URL do webhook.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium mb-3">O que acontece depois?</h3>
                  <p className="text-gray-600 mb-4">
                    Após a autorização, seu assistente WhatsApp estará habilitado para:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex gap-3">
                      <Mail className="text-brand-blue shrink-0" />
                      <div>
                        <p className="font-medium">Acessar seus emails</p>
                        <p className="text-sm text-gray-500">Ler e notificar sobre emails importantes</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex gap-3">
                      <Calendar className="text-brand-green shrink-0" />
                      <div>
                        <p className="font-medium">Gerenciar eventos</p>
                        <p className="text-sm text-gray-500">Criar e lembrá-lo de compromissos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Conectar;
