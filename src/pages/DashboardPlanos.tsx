
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const DashboardPlanos = () => {
  const { user, userPlan } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setIsConfirmOpen(true);
  };
  
  const handleConfirmPlan = async () => {
    if (!selectedPlan || !user) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('user_plans')
        .update({ 
          plan_name: selectedPlan,
          updated_at: new Date().toISOString(),
          // Set expiration date to 30 days from now
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      toast({
        title: "Plano atualizado com sucesso",
        description: `Seu plano foi atualizado para ${selectedPlan.toUpperCase()}.`,
      });
      
      // Redirect back to dashboard
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Error updating plan:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar plano",
        description: error.message || "Ocorreu um erro ao atualizar seu plano. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
      setIsConfirmOpen(false);
    }
  };
  
  return (
    <Layout>
      <section className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Atualizar Plano</h1>
          <p className="text-gray-600 mb-8">
            Escolha um novo plano para a sua conta
            {userPlan && (
              <span className="block mt-2 text-brand-blue font-medium">
                Plano atual: {userPlan.planName.toUpperCase()}
              </span>
            )}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plano Básico */}
            <Card className={`border-2 ${userPlan?.planName === 'basic' ? 'border-brand-blue' : 'border-gray-200 hover:border-brand-blue transition-all'}`}>
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
                  variant={userPlan?.planName === 'basic' ? 'default' : 'outline'}
                  onClick={() => handleSelectPlan('basic')}
                  disabled={userPlan?.planName === 'basic'}
                >
                  {userPlan?.planName === 'basic' ? 'Plano Atual' : 'Selecionar Plano'}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Plano Pro */}
            <Card className={`border-2 ${userPlan?.planName === 'pro' 
              ? 'border-brand-blue shadow-lg' 
              : 'border-gray-200 shadow-lg hover:border-brand-blue transition-all'} relative`}>
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
                  variant={userPlan?.planName === 'pro' ? 'secondary' : 'default'}
                  onClick={() => handleSelectPlan('pro')}
                  disabled={userPlan?.planName === 'pro'}
                >
                  {userPlan?.planName === 'pro' ? 'Plano Atual' : 'Selecionar Plano'}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Plano Enterprise */}
            <Card className={`border-2 ${userPlan?.planName === 'enterprise' ? 'border-brand-blue' : 'border-gray-200 hover:border-brand-blue transition-all'}`}>
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
                  variant={userPlan?.planName === 'enterprise' ? 'default' : 'outline'}
                  onClick={() => handleSelectPlan('enterprise')}
                  disabled={userPlan?.planName === 'enterprise'}
                >
                  {userPlan?.planName === 'enterprise' ? 'Plano Atual' : 'Selecionar Plano'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar alteração de plano</DialogTitle>
            <DialogDescription>
              Você está prestes a alterar seu plano para {selectedPlan?.toUpperCase()}. Esta alteração será aplicada imediatamente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmPlan} disabled={isLoading}>
              {isLoading ? "Processando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default DashboardPlanos;
