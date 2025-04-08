
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import AuthContext from '@/contexts/AuthContext';
import { User } from '@/types/auth.types';
import { authService } from '@/services/auth.service';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        
        // Avoid async code directly in callback
        // to prevent deadlock issues with Supabase
        if (session?.user) {
          // Synchronous basic update first
          const basicUser = {
            id: session.user.id,
            email: session.user.email!,
            role: 'user' as const // Use a type assertion to satisfy TypeScript
          };
          setUser(basicUser);
          setLoading(false);
          
          // Then fetch profile asynchronously
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );
    
    // Helper function to fetch user profile
    const fetchUserProfile = async (userId: string) => {
      try {
        const profile = await authService.getUserProfile(userId);
          
        if (profile) {
          // Ensure the role is of the correct type
          const userRole: 'admin' | 'user' = profile.role === 'admin' ? 'admin' : 'user';
          
          setUser(prev => prev ? {...prev, role: userRole} : null);
        }
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
        // We already have the basic user set, so no need to do anything here
      }
    };

    // Check initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Erro ao verificar sessão inicial:", error);
        setLoading(false);
        return;
      }
      
      if (session?.user) {
        console.log("Sessão inicial encontrada:", session.user.email);
        // The basic handling will be done by onAuthStateChange
        // Just ensure loading isn't infinite
        if (loading) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      } else {
        console.log("Nenhuma sessão inicial encontrada");
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await authService.signIn(email, password);
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
      console.log("Iniciando login com Google");
      
      // Obter URL atual para callback
      const siteUrl = window.location.origin;
      console.log("URL base do site:", siteUrl);
      
      // Usar a URL com referência explícita para o callback
      const callbackUrl = `${siteUrl}/auth/callback`;
      console.log("URL completa para callback:", callbackUrl);
      
      const { data, error } = await authService.signInWithGoogle(callbackUrl);
      
      if (error) {
        console.error("Erro no login com Google:", error);
        throw error;
      }
      
      console.log("Google auth iniciada, URL:", data?.url);
      
      // Redirecionamento explícito para garantir que vamos para a página certa
      if (data?.url) {
        console.log("Redirecionando para:", data.url);
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error("Erro detalhado:", error);
      toast({
        variant: 'destructive',
        title: 'Erro ao entrar com Google',
        description: error.message || 'Ocorreu um erro durante o login com Google.',
      });
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      // Obter URL atual para callback
      const currentUrl = window.location.origin;
      const callbackUrl = `${currentUrl}/auth/callback`;
      
      const { error } = await authService.signUp(email, password, callbackUrl);
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
      await authService.signOut();
      navigate('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao sair',
        description: error.message || 'Ocorreu um erro ao encerrar a sessão.',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithGoogle, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
