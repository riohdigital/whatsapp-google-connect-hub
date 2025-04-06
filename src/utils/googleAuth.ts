
// This file contains the Google OAuth configuration and helper functions

// Google OAuth client configuration
interface GoogleOAuthConfig {
  clientId: string;
  scopes: string[];
  callbackFunction: (response: { code: string }) => void;
}

// Initialize the Google OAuth client
export const initGoogleOAuthClient = ({
  clientId,
  scopes,
  callbackFunction,
}: GoogleOAuthConfig) => {
  return (window as any).google.accounts.oauth2.initCodeClient({
    client_id: clientId,
    scope: scopes.join(' '),
    callback: callbackFunction,
    ux_mode: 'popup',
  });
};

// Send authorization code to backend (Supabase Edge Function)
export const sendCodeToBackend = async (code: string, edgeFunctionUrl: string) => {
  try {
    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Falha na autenticação');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar código para o backend:', error);
    throw error;
  }
};
