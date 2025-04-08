
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Log para depuração
        console.log("Processando callback de autenticação...");
        console.log("URL atual:", window.location.href);
        
        const hashParams = window.location.hash;
        const queryParams = window.location.search;
        
        console.log("Hash params:", hashParams);
        console.log("Query params:", queryParams);
        
        if (hashParams && (hashParams.includes("access_token") || hashParams.includes("error"))) {
          console.log("Hash detectado na URL, processando...");
        } else if (queryParams && (queryParams.includes("code") || queryParams.includes("error"))) {
          console.log("Query params detectados na URL, processando código de autorização...");
        }
        
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
          
          // Limpar URL antes de redirecionar (remover hash e parâmetros de consulta)
          if (window.history && (hashParams || queryParams)) {
            console.log("Limpando hash/query da URL antes de redirecionar...");
            window.history.replaceState(
              null,
              document.title,
              window.location.pathname
            );
          }
          
          // Forçar uma pequena pausa antes de redirecionar para garantir que os eventos de autenticação sejam processados
          console.log("Aguardando 1 segundo antes de redirecionar...");
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          console.log("Redirecionando para o dashboard após pausa deliberada");
          
          // Usar o método mais confiável para redirecionamento
          window.location.href = "/dashboard";
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
      } finally {
        setIsProcessing(false);
      }
    };

    // Executar imediatamente, mas com um setTimeout mínimo
    // para garantir que o contexto do navegador esteja pronto
    const timeoutId = setTimeout(() => {
      handleAuthCallback();
    }, 500); // Aumentando para 500ms para dar mais tempo para o token ser processado

    return () => clearTimeout(timeoutId);
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue mx-auto mb-4"></div>
        <h1 className="text-xl font-semibold">Autenticando...</h1>
        <p className="text-gray-500 mt-2">Por favor, aguarde enquanto processamos seu login.</p>
        <p className="text-gray-400 text-sm mt-4">Se a página não redirecionar em alguns segundos, <button onClick={() => window.location.href = "/dashboard"} className="text-blue-500 underline">clique aqui</button>.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
