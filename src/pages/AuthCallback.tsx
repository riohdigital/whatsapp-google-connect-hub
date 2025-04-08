
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Process the OAuth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        // If we have a session, redirect to dashboard
        if (data.session) {
          navigate('/dashboard');
        } else {
          // If no session (rare), redirect to auth page
          navigate('/auth');
        }
      } catch (error) {
        console.error('Error processing auth callback:', error);
        navigate('/auth');
      }
    };

    handleAuthCallback();
  }, [navigate]);

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
