
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
        // Process the OAuth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        // Check if this was a Google connection (not a sign-in)
        const url = new URL(window.location.href);
        const provider = url.searchParams.get('provider');
        
        // If we have a session, redirect appropriately
        if (data.session) {
          // Show success message for Google connection
          if (provider === 'google') {
            toast({
              title: 'Conta Google conectada',
              description: 'Sua conta Google foi conectada com sucesso!',
            });
          }
          
          // Always navigate to dashboard after successful auth
          navigate('/dashboard');
        } else {
          // If no session (rare), redirect to auth page
          navigate('/auth');
        }
      } catch (error) {
        console.error('Error processing auth callback:', error);
        toast({
          variant: 'destructive',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao processar a autenticação.',
        });
        navigate('/auth');
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        {isProcessing && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue mx-auto mb-4"></div>
            <h1 className="text-xl font-semibold">Autenticando...</h1>
            <p className="text-gray-500 mt-2">Por favor, aguarde enquanto processamos seu login.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
