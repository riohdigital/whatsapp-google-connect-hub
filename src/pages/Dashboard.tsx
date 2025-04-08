
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, Calendar, RefreshCw, Settings, AlertCircle, CheckCircle, 
  XCircle, Info, ArrowRight, ExternalLink, Users, ShieldCheck
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import ProfileForm from "@/components/ProfileForm";

const Dashboard = () => {
  const { toast } = useToast();
  const { user, userPlan, googleConnected, connectGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const isAdmin = user?.role === 'admin';
  const planName = userPlan?.planName || "Básico";
  const planExpiry = userPlan?.expiresAt 
    ? new Intl.DateTimeFormat('pt-BR').format(userPlan.expiresAt)
    : "06/05/2025";
  
  const handleRefreshToken = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Token atualizado",
        description: "As credenciais foram atualizadas com sucesso!",
      });
    }, 1500);
  };
  
  const handleRevokeAccess = () => {
    toast({
      title: "Acesso revogado",
      description: "Para reconectar sua conta, visite a página 'Conectar'.",
      variant: "destructive",
    });
  };

  const handleConnectGoogle = () => {
    connectGoogle();
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Gerencie suas conexões e monitore o status de integração
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div>
              <Card className="border border-gray-200 shadow-sm mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Status da Conta</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                    <CheckCircle className="text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Conta conectada</p>
                      <p className="text-green-700 text-sm">Login ativo</p>
                    </div>
                  </div>
                  
                  {/* Status da conexão Google */}
                  <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                    {googleConnected ? (
                      <>
                        <CheckCircle className="text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">Google conectado</p>
                          <p className="text-green-700 text-sm">OAuth funcionando</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="text-red-600" />
                        <div>
                          <p className="font-medium text-red-800">Google não conectado</p>
                          <p className="text-red-700 text-sm">OAuth não autorizado</p>
                          <Button 
                            variant="link" 
                            className="text-blue-700 p-0 h-auto text-sm"
                            onClick={handleConnectGoogle}
                          >
                            Conectar Google
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Plano atual do usuário */}
                  <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                    <Info className="text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800">Plano: {planName}</p>
                      <p className="text-blue-700 text-sm">Válido até: {planExpiry}</p>
                      <Button 
                        variant="link" 
                        className="text-blue-700 p-0 h-auto text-sm"
                        onClick={() => navigate('/dashboard/planos')}
                      >
                        Alterar plano
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Gmail</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        {googleConnected ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle size={14} /> Ativo
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center gap-1">
                            <XCircle size={14} /> Desconectado
                          </span>
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Google Calendar</span>
                      <span className="text-sm font-medium flex items-center gap-1">
                        {googleConnected ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle size={14} /> Ativo
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center gap-1">
                            <XCircle size={14} /> Desconectado
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Ações</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={handleRefreshToken}
                      disabled={isLoading || !googleConnected}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      {isLoading ? "Atualizando..." : "Atualizar Token"}
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleRevokeAccess}
                      disabled={!googleConnected}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Revogar Acesso
                    </Button>
                    
                    {!googleConnected && (
                      <Button 
                        variant="default" 
                        className="w-full justify-start"
                        onClick={handleConnectGoogle}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Conectar Google
                      </Button>
                    )}
                    
                    <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm mt-4">
                      <Info className="text-yellow-600 shrink-0" size={16} />
                      <p className="text-yellow-700">
                        Você também pode revogar o acesso através das configurações de sua conta Google.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="profile">Perfil</TabsTrigger>
                  <TabsTrigger value="permissions">Permissões</TabsTrigger>
                  <TabsTrigger value="logs">Logs</TabsTrigger>
                  {isAdmin && (
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="overview">
                  <Card className="border border-gray-200 shadow-sm mb-6">
                    <CardHeader>
                      <CardTitle>Detalhes da Conexão</CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Conta Google</h3>
                          {googleConnected ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Email</p>
                                <p>{user?.email || "usuario@gmail.com"}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Status da Autorização</p>
                                <p className="flex items-center gap-2 text-green-600">
                                  <CheckCircle size={16} /> Autorizado
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Data de Conexão</p>
                                <p>05/04/2025</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Expiração do Token</p>
                                <p>05/04/2026</p>
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                              <p className="text-gray-600 mb-4">
                                Você ainda não conectou sua conta Google.
                              </p>
                              <Button onClick={handleConnectGoogle}>
                                Conectar Conta Google
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Serviços Conectados</h3>
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                                    <Mail className="text-brand-blue" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Gmail</h4>
                                    <p className="text-sm text-gray-500">Acesso de leitura</p>
                                  </div>
                                </div>
                                {googleConnected ? (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    Ativo
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                    Desconectado
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                Permite ao assistente ler seus emails e notificá-lo sobre mensagens importantes.
                              </p>
                              {!googleConnected && (
                                <Button variant="default" size="sm" onClick={handleConnectGoogle}>
                                  Conectar
                                </Button>
                              )}
                              {googleConnected && (
                                <a href="#" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                  Ver detalhes de permissões <ExternalLink size={14} />
                                </a>
                              )}
                            </div>
                            
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-brand-green/10 rounded-lg flex items-center justify-center">
                                    <Calendar className="text-brand-green" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Google Calendar</h4>
                                    <p className="text-sm text-gray-500">Acesso de leitura e escrita</p>
                                  </div>
                                </div>
                                {googleConnected ? (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    Ativo
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                    Desconectado
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                Permite ao assistente criar eventos, verificar sua agenda e enviar lembretes.
                              </p>
                              {!googleConnected && (
                                <Button variant="default" size="sm" onClick={handleConnectGoogle}>
                                  Conectar
                                </Button>
                              )}
                              {googleConnected && (
                                <a href="#" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                  Ver detalhes de permissões <ExternalLink size={14} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle>DigiRioh no WhatsApp</CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="p-6 text-center">
                        <p className="text-gray-600 mb-4">
                          Seu assistente está configurado e pronto para uso!
                        </p>
                        <p className="text-gray-600 mb-6">
                          Você pode enviar comandos como "leia meus emails recentes" ou
                          "agende uma reunião amanhã às 14h" para o seu assistente WhatsApp.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                          <Button asChild>
                            <a href="https://wa.me/seu-numero-digirioh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              Iniciar chat no WhatsApp <ArrowRight size={16} />
                            </a>
                          </Button>
                          
                          <Button variant="outline" asChild>
                            <Link to="/como-funciona">Ver exemplos de comandos</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="profile">
                  <ProfileForm />
                </TabsContent>
                
                <TabsContent value="permissions">
                  <Card className="border border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle>Permissões Concedidas</CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-6">
                        <div className="mb-6">
                          <p className="text-gray-600 mb-4">
                            Você concedeu as seguintes permissões ao conectar sua conta Google:
                          </p>
                          
                          <div className="space-y-4">
                            <div className="p-4 border border-gray-200 rounded-lg">
                              <div className="flex items-center gap-3 mb-2">
                                <Mail className="text-brand-blue" size={20} />
                                <h3 className="font-medium">Gmail API</h3>
                              </div>
                              <ul className="ml-9 space-y-2">
                                <li className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle size={16} className="text-green-600" />
                                  <span>https://www.googleapis.com/auth/gmail.readonly</span>
                                </li>
                                <li className="text-sm text-gray-500 ml-6">
                                  Permite ler mensagens e metadados dos emails no Gmail
                                </li>
                              </ul>
                            </div>
                            
                            <div className="p-4 border border-gray-200 rounded-lg">
                              <div className="flex items-center gap-3 mb-2">
                                <Calendar className="text-brand-green" size={20} />
                                <h3 className="font-medium">Google Calendar API</h3>
                              </div>
                              <ul className="ml-9 space-y-2">
                                <li className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle size={16} className="text-green-600" />
                                  <span>https://www.googleapis.com/auth/calendar</span>
                                </li>
                                <li className="text-sm text-gray-500 ml-6">
                                  Permite acesso completo ao Calendário (leitura e escrita)
                                </li>
                                <li className="flex items-center gap-2 text-gray-700 mt-2">
                                  <CheckCircle size={16} className="text-green-600" />
                                  <span>https://www.googleapis.com/auth/calendar.events</span>
                                </li>
                                <li className="text-sm text-gray-500 ml-6">
                                  Permite gerenciar eventos no calendário
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={18} />
                          <div>
                            <p className="font-medium text-yellow-800">Como revogar permissões</p>
                            <p className="text-yellow-700 text-sm mb-2">
                              Se você deseja revogar essas permissões, você pode fazer isso das seguintes formas:
                            </p>
                            <ul className="list-disc text-sm text-yellow-700 ml-5 space-y-1">
                              <li>Clicando em "Revogar Acesso" no menu lateral</li>
                              <li>
                                Através das <a href="https://myaccount.google.com/permissions" target="_blank" className="text-yellow-800 underline">configurações de segurança da sua conta Google</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="logs">
                  <Card className="border border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle>Logs de Atividade</CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="text-green-600" size={18} />
                              <h3 className="font-medium">Autenticação bem-sucedida</h3>
                            </div>
                            <span className="text-sm text-gray-500">05/04/2025 14:30</span>
                          </div>
                          <p className="text-gray-600 text-sm ml-7">
                            Conta Google autenticada com sucesso via OAuth 2.0
                          </p>
                        </div>
                        
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="text-green-600" size={18} />
                              <h3 className="font-medium">Webhook configurado</h3>
                            </div>
                            <span className="text-sm text-gray-500">05/04/2025 14:32</span>
                          </div>
                          <p className="text-gray-600 text-sm ml-7">
                            Webhook configurado e testado com sucesso
                          </p>
                        </div>
                        
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <Mail className="text-brand-blue" size={18} />
                              <h3 className="font-medium">Acesso ao Gmail</h3>
                            </div>
                            <span className="text-sm text-gray-500">05/04/2025 15:05</span>
                          </div>
                          <p className="text-gray-600 text-sm ml-7">
                            Assistente acessou os emails pela primeira vez
                          </p>
                        </div>
                        
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="text-brand-green" size={18} />
                              <h3 className="font-medium">Acesso ao Calendário</h3>
                            </div>
                            <span className="text-sm text-gray-500">05/04/2025 15:10</span>
                          </div>
                          <p className="text-gray-600 text-sm ml-7">
                            Assistente criou seu primeiro evento no calendário
                          </p>
                        </div>
                        
                        <div className="flex justify-center mt-4">
                          <Button variant="outline" size="sm">Carregar mais logs</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Admin Tab - Visible only to admin users */}
                {isAdmin && (
                  <TabsContent value="admin">
                    <Card className="border border-gray-200 shadow-sm mb-6">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ShieldCheck className="text-brand-blue" size={20} />
                          Painel de Administração
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-6">
                          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
                              <Users size={18} /> Gerenciamento de Usuários
                            </h3>
                            <p className="text-gray-600 mb-4">
                              Total de usuários ativos: <span className="font-medium">247</span>
                            </p>
                            
                            <div className="grid grid-cols-3 gap-4 mb-4">
                              <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                                <p className="text-sm text-gray-600">Plano Básico</p>
                                <p className="text-2xl font-bold text-green-700">168</p>
                              </div>
                              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                <p className="text-sm text-gray-600">Plano Pro</p>
                                <p className="text-2xl font-bold text-blue-700">64</p>
                              </div>
                              <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
                                <p className="text-sm text-gray-600">Plano Enterprise</p>
                                <p className="text-2xl font-bold text-purple-700">15</p>
                              </div>
                            </div>
                            
                            <Button variant="outline" size="sm">
                              Ver todos os usuários
                            </Button>
                          </div>
                          
                          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                            <h3 className="font-medium text-lg mb-3 flex items-center gap-2">
                              <Settings size={18} /> Configurações do Sistema
                            </h3>
                            
                            <div className="space-y-4">
                              <div className="flex justify-between items-center p-3 border border-gray-200 bg-white rounded-lg">
                                <div>
                                  <p className="font-medium">Manutenção Programada</p>
                                  <p className="text-sm text-gray-600">Domingo, 10/04/2025, 2:00 - 4:00</p>
                                </div>
                                <Button variant="outline" size="sm">Editar</Button>
                              </div>
                              
                              <div className="flex justify-between items-center p-3 border border-gray-200 bg-white rounded-lg">
                                <div>
                                  <p className="font-medium">Status do Webhook</p>
                                  <p className="text-sm text-green-600 flex items-center gap-1">
                                    <CheckCircle size={14} /> Operacional
                                  </p>
                                </div>
                                <Button variant="outline" size="sm">Verificar</Button>
                              </div>
                              
                              <div className="flex justify-between items-center p-3 border border-gray-200 bg-white rounded-lg">
                                <div>
                                  <p className="font-medium">Permissões de Acesso</p>
                                  <p className="text-sm text-gray-600">3 perfis de acesso configurados</p>
                                </div>
                                <Button variant="outline" size="sm">Gerenciar</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
