
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Planos = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSelectPlan = (planId: string) => {
    console.log(`Selecionando plano ${planId}`);
    
    // If user is not logged in, redirect to auth page
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para selecionar um plano",
      });
      navigate('/auth');
      return;
    }
    
    // Here you would implement your payment flow
    // For now, we'll just redirect to dashboard with a simulated plan
    navigate('/dashboard');
  };
  
  return (
    <Layout>
      <section className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Planos DigiRioh</h1>
          <p className="text-gray-600 mb-8">
            Escolha o plano ideal para suas necessidades
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plano Básico */}
            <Card className="border-2 border-gray-200 hover:border-brand-blue transition-all">
              <CardHeader>
                <CardTitle className="text-xl text-center">Básico</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">R$9,90</span>
                  <span className="text-gray-500">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="mt-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>Acesso ao DigiRioh via WhatsApp</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>Consulta a emails</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>Gerenciamento de calendário básico</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>50 consultas por mês</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => handleSelectPlan('basic')}
                >
                  Selecionar Plano
                </Button>
              </CardFooter>
            </Card>
            
            {/* Plano Pro */}
            <Card className="border-2 border-brand-blue shadow-lg relative">
              <div className="absolute top-0 left-0 right-0 bg-brand-blue text-white py-1 text-center text-sm font-medium">
                MAIS POPULAR
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-center">Pro</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">R$29,90</span>
                  <span className="text-gray-500">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="mt-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>Tudo do plano Básico</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>Integração completa com Gmail</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>Gerenciamento avançado de calendário</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>Criação assistida de conteúdo</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>200 consultas por mês</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleSelectPlan('pro')}
                >
                  Selecionar Plano
                </Button>
              </CardFooter>
            </Card>
            
            {/* Plano Enterprise */}
            <Card className="border-2 border-gray-200 hover:border-brand-blue transition-all">
              <CardHeader>
                <CardTitle className="text-xl text-center">Enterprise</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold">R$89,90</span>
                  <span className="text-gray-500">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="mt-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>Tudo do plano Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>Integrações empresariais personalizadas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>Assistente dedicado para finanças</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>Suporte prioritário</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-brand-green mr-2 h-5 w-5" />
                    <span>Consultas ilimitadas</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => handleSelectPlan('enterprise')}
                >
                  Selecionar Plano
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Planos;
