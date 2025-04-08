
import { useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { AuthContext } from './AuthContext';
import { User } from './auth.types';
import { AuthError } from '@supabase/supabase-js';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [googleConnected, setGoogleConnected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check if the current path is within the dashboard
  const isDashboardPath = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Auth state changed: ${event}`, session);
        
        if (session?.user) {
          // Get user profile with role
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          // Check if the user has a Google OAuth connection
          const { data: googleData } = await supabase
            .from('digirioh_app_google_user_tokens')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
            
          setGoogleConnected(!!googleData?.google_refresh_token);
          
          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: profile?.role || 'user',
          });
        } else {
          setUser(null);
          setGoogleConnected(false);
          
          // Only redirect to home if we're on a protected route and there's no session
          if (isDashboardPath) {
            navigate('/');
          }
        }
        setLoading(false);
      }
    );

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // This will be handled by onAuthStateChange
      } else {
        setLoading(false);
        // Only redirect to home if we're on a protected route and there's no session
        if (isDashboardPath) {
          navigate('/');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, isDashboardPath]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao entrar',
        description: error.message || 'Ocorreu um erro durante o login.',
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar',
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao entrar com Google',
        description: error.message || 'Ocorreu um erro durante o login com Google.',
      });
    }
  };

  const connectGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar',
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao conectar com Google',
        description: error.message || 'Ocorreu um erro durante a conexão com Google.',
      });
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
      toast({
        title: 'Cadastro realizado!',
        description: 'Verifique seu email para confirmar o cadastro.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao cadastrar',
        description: error.message || 'Ocorreu um erro durante o cadastro.',
      });
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Added a toast to confirm logout
      toast({
        title: 'Logout realizado',
        description: 'Você foi desconectado com sucesso.',
      });
      
      // Ensure we always navigate to the home page after logout
      navigate('/');
    } catch (error) {
      let message = 'Ocorreu um erro ao encerrar a sessão.';
      if (error instanceof AuthError) {
        message = error.message;
      }
      
      toast({
        variant: 'destructive',
        title: 'Erro ao sair',
        description: message,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      googleConnected,
      signIn, 
      signInWithGoogle, 
      connectGoogle,
      signUp, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
