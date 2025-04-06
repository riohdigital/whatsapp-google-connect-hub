import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Mail, Calendar, AlertCircle, MessageSquare, Edit, DollarSign, Globe, Calculator, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      {/* Intro Section - Novo */}
      <section className="bg-gradient-to-b from-brand-blue/10 to-white py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-red"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-green"></div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-red rounded-full flex items-center justify-center text-white font-bold">
                AI
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            Olá! Eu sou o <span className="text-brand-blue">DigiRioh</span>! 👋
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 animate-fade-in">
            Seu assistente digital brasileiro que vai facilitar seu dia a dia direto no seu WhatsApp!
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Calendar className="text-brand-blue w-6 h-6" />
              </div>
              <p className="font-medium">Sua Agenda</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-brand-red/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Mail className="text-brand-red w-6 h-6" />
              </div>
              <p className="font-medium">Seus Emails</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-brand-yellow/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Users className="text-brand-yellow w-6 h-6" />
              </div>
              <p className="font-medium">Seus Contatos</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-brand-green/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Edit className="text-brand-green w-6 h-6" />
              </div>
              <p className="font-medium">Criação de Textos</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <DollarSign className="text-purple-500 w-6 h-6" />
              </div>
              <p className="font-medium">Suas Finanças</p>
              <span className="text-xs text-gray-500">Em breve</span>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Clock className="text-blue-500 w-6 h-6" />
              </div>
              <p className="font-medium">Mestre do Tempo</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-cyan-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Globe className="text-cyan-500 w-6 h-6" />
              </div>
              <p className="font-medium">Buscas na Web</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-amber-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Calculator className="text-amber-500 w-6 h-6" />
              </div>
              <p className="font-medium">Cálculos Rápidos</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/auth" className="flex items-center gap-2">
                Começar agora <ArrowRight size={18} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/como-funciona">Como funciona</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Hero Section - Modificado */}
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
                  <Link to="/auth" className="flex items-center gap-2">
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
                      <MessageSquare className="text-white w-6 h-6" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Leva menos de um minuto para criar sua conta e começar a usar seu assistente pessoal com todas as funcionalidades.
          </p>
          <Button size="lg" variant="default" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
            <Link to="/auth" className="flex items-center gap-2">
              Criar minha conta <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
