
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Lock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ComoFunciona = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Entenda o processo de conexão entre o Google e seu assistente WhatsApp
            e como mantemos suas informações seguras.
          </p>
        </div>
      </section>
      
      {/* Steps Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-12 text-center">Processo de Conexão</h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Autorização do Google</h3>
                  <p className="text-gray-600">
                    Você autoriza nosso aplicativo a acessar seus dados do Gmail e Google Calendar
                    através do processo seguro de OAuth 2.0 do Google.
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 pl-14">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-green shrink-0 mt-1" size={18} />
                  <span className="text-gray-600">Você mantém controle completo sobre suas permissões</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-green shrink-0 mt-1" size={18} />
                  <span className="text-gray-600">Suas credenciais nunca são compartilhadas diretamente conosco</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-green shrink-0 mt-1" size={18} />
                  <span className="text-gray-600">Você pode revogar o acesso a qualquer momento</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
              <img 
                src="https://storage.googleapis.com/gweb-cloudblog-publish/images/permission_popup.max-1100x1100.jpg" 
                alt="Tela de autorização do Google" 
                className="rounded-md"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <div className="order-2 md:order-1 bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="rounded-md bg-white border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Assistente WhatsApp</p>
                    <p className="text-xs text-gray-500">Hoje, 14:32</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-green-50 rounded-lg p-3 max-w-xs ml-auto">
                    <p className="text-sm">Leia meus emails recentes</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Você recebeu 3 emails importantes hoje:</p>
                    <p className="text-sm font-medium mt-2">1. Reunião de equipe - 16h</p>
                    <p className="text-sm font-medium mt-1">2. Proposta comercial - Cliente X</p>
                    <p className="text-sm font-medium mt-1">3. Fatura de luz - Vencimento dia 10</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Integração com n8n</h3>
                  <p className="text-gray-600">
                    As credenciais de acesso são seguramente enviadas para o nosso sistema n8n,
                    que gerencia a comunicação entre o WhatsApp e os serviços do Google.
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 pl-14">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-green shrink-0 mt-1" size={18} />
                  <span className="text-gray-600">Tokens de acesso armazenados com criptografia</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-green shrink-0 mt-1" size={18} />
                  <span className="text-gray-600">Cada usuário tem sua sessão individual</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-green shrink-0 mt-1" size={18} />
                  <span className="text-gray-600">Automações personalizadas para cada caso de uso</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Usando seu Assistente</h3>
                  <p className="text-gray-600">
                    Após a configuração, você pode usar seu assistente WhatsApp para acessar
                    seus emails e agenda diretamente pelo chat.
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 pl-14 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-green shrink-0 mt-1" size={18} />
                  <span className="text-gray-600">Leitura de emails recentes e importantes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-green shrink-0 mt-1" size={18} />
                  <span className="text-gray-600">Criação de eventos no calendário</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-brand-green shrink-0 mt-1" size={18} />
                  <span className="text-gray-600">Lembretes de compromissos</span>
                </li>
              </ul>
              
              <div className="pl-14">
                <Button asChild>
                  <Link to="/conectar" className="flex items-center gap-2">
                    Conectar agora <ArrowRight size={18} />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="rounded-md bg-white border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Assistente WhatsApp</p>
                    <p className="text-xs text-gray-500">Hoje, 15:05</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-green-50 rounded-lg p-3 max-w-xs ml-auto">
                    <p className="text-sm">Agende uma reunião com Marcelo amanhã às 14h</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Evento criado com sucesso:</p>
                    <p className="text-sm font-medium mt-2">Reunião com Marcelo</p>
                    <p className="text-sm">Amanhã, 14:00 - 15:00</p>
                    <p className="text-sm text-green-600 mt-2">Adicionado ao seu Google Calendar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Segurança em Primeiro Lugar</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Entendemos que estamos lidando com dados sensíveis. Por isso, implementamos várias
              camadas de segurança para proteger suas informações.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Autenticação OAuth 2.0</h3>
              <p className="text-gray-600">
                Utilizamos o protocolo padrão OAuth 2.0 do Google, sem armazenar suas senhas e permitindo acesso apenas aos recursos necessários.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-green"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Dados Criptografados</h3>
              <p className="text-gray-600">
                Todas as credenciais e tokens de acesso são armazenados com criptografia e transmitidos por conexões seguras (HTTPS).
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-brand-red"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Permissões Limitadas</h3>
              <p className="text-gray-600">
                Solicitamos apenas as permissões necessárias para o funcionamento do serviço, e você pode revogá-las a qualquer momento.
              </p>
            </div>
          </div>
          
          <div className="mt-12 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-4">
            <AlertCircle className="text-yellow-600 shrink-0" />
            <div>
              <p className="font-medium text-yellow-800">Importante</p>
              <p className="text-yellow-700">
                Nunca compartilhe suas senhas do Google diretamente. Nossa plataforma utiliza apenas o método oficial de autorização do Google,
                que não exige que você nos forneça sua senha em nenhum momento.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Comece a usar agora mesmo</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Conecte sua conta Google em poucos cliques e aproveite todas as funcionalidades
            do seu assistente pessoal no WhatsApp.
          </p>
          <Button size="lg" variant="default" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
            <Link to="/conectar" className="flex items-center gap-2">
              Conectar minha conta Google <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ComoFunciona;
