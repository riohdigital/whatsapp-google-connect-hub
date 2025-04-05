
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Mail, Calendar, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Conecte suas contas Google ao seu assistente WhatsApp
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Integre seu Gmail e Google Calendar de forma segura para que seu assistente 
                pessoal possa ler seus emails e gerenciar seus compromissos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/conectar" className="flex items-center gap-2">
                    Conectar agora <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/como-funciona">Saiba mais</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-40 h-40 bg-brand-blue/10 rounded-full"></div>
                <div className="absolute -bottom-8 -right-8 w-60 h-60 bg-brand-green/10 rounded-full"></div>
                
                <div className="relative bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                  <div className="flex gap-4 items-center mb-6">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Assistente WhatsApp</h3>
                      <p className="text-sm text-gray-500">Conectado</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex gap-3">
                      <Mail className="text-brand-red" />
                      <div>
                        <p className="font-medium">Gmail</p>
                        <p className="text-sm text-gray-500">Acesso autorizado</p>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex gap-3">
                      <Calendar className="text-brand-blue" />
                      <div>
                        <p className="font-medium">Google Calendar</p>
                        <p className="text-sm text-gray-500">Acesso autorizado</p>
                      </div>
                    </div>
                    
                    <div className="p-3 flex items-center justify-between">
                      <p className="text-sm text-gray-500">Autorização válida até 27/04/2026</p>
                      <Lock className="text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Por que conectar suas contas?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-4">
                <Mail className="text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Acesso aos Emails</h3>
              <p className="text-gray-600">
                Permita que seu assistente acesse e leia seus emails importantes, mantendo você informado via WhatsApp.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="text-brand-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gerenciamento de Agenda</h3>
              <p className="text-gray-600">
                Seu assistente poderá criar, verificar e modificar eventos no seu calendário diretamente pelo WhatsApp.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-brand-yellow/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="text-brand-yellow" />
              </div>
              <h3 className="text-xl font-bold mb-2">Total Segurança</h3>
              <p className="text-gray-600">
                Utilizamos OAuth 2.0 para autenticação segura, sem armazenar senhas e com permissões que você controla.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para conectar?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Leva menos de um minuto para autorizar o acesso e começar a usar seu assistente pessoal com todas as funcionalidades.
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

export default Index;
