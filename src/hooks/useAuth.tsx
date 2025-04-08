
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

type User = {
  id: string;
  email: string;
  role: 'admin' | 'user';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
        
        // Evitar execução de código async diretamente no callback
        // para prevenir problemas de deadlock com Supabase
        if (session?.user) {
          // Atualização síncrona básica primeiro
          const basicUser: User = {
            id: session.user.id,
            email: session.user.email!,
            role: 'user', // Default role as a valid union type
          };
          setUser(basicUser);
          setLoading(false);
          
          // Então buscar o perfil de forma assíncrona
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );
    
    // Função auxiliar para buscar o perfil do usuário
    const fetchUserProfile = async (userId: string) => {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single();
          
        if (profile) {
          // Ensure the role is of the correct type
          const userRole = profile.role === 'admin' ? 'admin' : 'user';
          
          setUser(prev => prev ? {...prev, role: userRole} : null);
        }
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
        // Já temos o usuário básico definido, então não é necessário fazer nada aqui
      }
    };

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        console.log("Sessão inicial encontrada:", session.user.email);
        // O básico será tratado pelo onAuthStateChange
        // Aqui apenas garantimos que o loading não seja infinito
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
      console.log("Iniciando login com Google");
      
      // Obter URL atual para callback - usando URL completa do site
      const siteUrl = window.location.origin;
      console.log("URL base do site:", siteUrl);
      
      // Usar a URL com referência absoluta para o callback
      const callbackUrl = `${siteUrl}/auth/callback`;
      console.log("URL completa para callback:", callbackUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
          skipBrowserRedirect: false,
        },
      });
      
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
      
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          emailRedirectTo: callbackUrl,
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
      await supabase.auth.signOut();
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
