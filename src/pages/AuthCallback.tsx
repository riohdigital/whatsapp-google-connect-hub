
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Log para depuração
        console.log("Processando callback de autenticação...");
        console.log("URL atual:", window.location.href);
        
        // Process the OAuth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erro ao processar callback de autenticação:', error);
          toast({
            title: "Erro na autenticação",
            description: "Ocorreu um erro durante o processo de autenticação: " + error.message,
            variant: "destructive",
          });
          navigate('/auth');
          return;
        }
        
        // Log session data for debugging
        console.log("Dados da sessão de autenticação:", data);
        
        // If we have a session, redirect to dashboard
        if (data.session) {
          console.log("Sessão válida encontrada, redirecionando para dashboard");
          toast({
            title: "Autenticação realizada",
            description: "Login realizado com sucesso!",
          });
          
          // Remover o código da URL e redirecionar
          const baseUrl = window.location.origin;
          const dashboardUrl = `${baseUrl}/dashboard`;
          
          // Usar replace para não manter o histórico com o código
          window.location.replace(dashboardUrl);
        } else {
          // If no session (rare), redirect to auth page
          console.error("Nenhuma sessão encontrada no callback");
          toast({
            title: "Falha na autenticação",
            description: "Não foi possível criar uma sessão. Por favor, tente novamente.",
            variant: "destructive",
          });
          navigate('/auth');
        }
      } catch (error) {
        console.error('Erro inesperado no callback de autenticação:', error);
        toast({
          title: "Erro inesperado",
          description: "Ocorreu um erro inesperado durante o processo de autenticação.",
          variant: "destructive",
        });
        navigate('/auth');
      }
    };

    // Adicionar um pequeno delay para garantir que supabase tenha tempo de processar o token
    const timeoutId = setTimeout(() => {
      handleAuthCallback();
    }, 500); // Aumentando para 500ms para dar mais tempo para processar

    return () => clearTimeout(timeoutId);
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold">Autenticando...</h1>
        <p className="text-gray-500 mt-2">Por favor, aguarde enquanto processamos seu login.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
