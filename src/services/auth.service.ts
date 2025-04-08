
import { supabase } from "@/integrations/supabase/client";

export const authService = {
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  signInWithGoogle: async (callbackUrl: string) => {
    console.log("Iniciando login com Google");
    
    // Obter URL atual para callback
    console.log("URL base do site:", callbackUrl);
    console.log("URL completa para callback:", callbackUrl);
    
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: callbackUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
          scope: 'email profile https://www.googleapis.com/auth/calendar https://mail.google.com/'
        }
      }
    });
  },

  signUp: async (email: string, password: string, callbackUrl: string) => {
    return await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: callbackUrl,
      }
    });
  },

  signOut: async () => {
    return await supabase.auth.signOut();
  },

  getSession: async () => {
    return await supabase.auth.getSession();
  },

  getUserProfile: async (userId: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
      
    return profile;
  }
};
