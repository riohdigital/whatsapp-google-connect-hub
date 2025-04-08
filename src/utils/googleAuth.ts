
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
  if (!(window as any).google?.accounts?.oauth2) {
    console.error("Biblioteca do Google OAuth não carregada corretamente");
    throw new Error("Biblioteca do Google OAuth não está disponível");
  }
  
  return (window as any).google.accounts.oauth2.initCodeClient({
    client_id: clientId,
    scope: scopes.join(' '),
    callback: callbackFunction,
    ux_mode: 'popup',
    error_callback: (error: any) => {
      console.error("Erro na autenticação Google:", error);
    }
  });
};

// Send authorization code to backend (Supabase Edge Function)
export const sendCodeToBackend = async (code: string, edgeFunctionUrl: string) => {
  try {
    console.log(`Iniciando envio do código para: ${edgeFunctionUrl}`);
    console.log(`Tamanho do código: ${code.length} caracteres`);
    console.log(`Primeiros caracteres do código: ${code.substring(0, 10)}...`);
    
    // Verificar se a URL da função é válida
    if (!edgeFunctionUrl.startsWith('http')) {
      throw new Error(`URL da função inválida: ${edgeFunctionUrl}`);
    }
    
    // Adicionando timestamp para evitar cache
    const urlWithParam = `${edgeFunctionUrl}?_=${Date.now()}`;
    console.log(`URL final com param anti-cache: ${urlWithParam}`);
    
    console.log("Enviando requisição POST para a função Edge...");
    const response = await fetch(urlWithParam, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    console.log("Status da resposta:", response.status);
    console.log("Headers da resposta:", Object.fromEntries([...response.headers.entries()]));
    
    const responseText = await response.text();
    console.log("Texto da resposta:", responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
      console.log("Dados parseados:", data);
    } catch (e) {
      console.error("Erro ao parsear resposta JSON:", e);
      const error = new Error(`Resposta inválida do servidor: ${responseText}`);
      // Adicionar informações extras ao erro sem usar a propriedade cause
      (error as any).responseText = responseText;
      throw error;
    }

    if (!response.ok) {
      console.error("Resposta não-OK do servidor:", data);
      
      // Tratamento específico para erro de redirect_uri_mismatch
      if (data.error_type === "redirect_uri_mismatch") {
        const error = new Error(
          "Erro de configuração no Google Cloud Console: O URI de redirecionamento não corresponde " +
          "ao configurado. Verifique se o URI " + data.details?.configured_uri + 
          " está listado nas URIs de redirecionamento autorizadas no Console Google Cloud."
        );
        (error as any).statusCode = response.status;
        (error as any).responseData = data;
        (error as any).redirectUriMismatch = true;
        (error as any).configTimestamp = Date.now(); // Adicionando timestamp da configuração
        throw error;
      }
      
      const error = new Error(data.error || `Falha na autenticação (${response.status}): ${JSON.stringify(data)}`);
      // Adicionar informações extras ao erro sem usar a propriedade cause
      (error as any).statusCode = response.status;
      (error as any).responseData = data;
      throw error;
    }

    // Force a complete page refresh to ensure UI state is updated
    window.location.href = '/dashboard';
    
    return data;
  } catch (error) {
    console.error('Erro detalhado ao enviar código para o backend:', error);
    
    // Adicionar mais detalhes de diagnóstico no erro sem usar cause
    if (error instanceof Error) {
      // Preservar a mensagem original e adicionar contexto
      error.message = `Falha ao processar autenticação: ${error.message}`;
      
      // Enriquecer o objeto de erro com informações adicionais sem usar cause
      console.log("Erro detalhado:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
    
    throw error;
  }
};

// Esta função verifica se o token está armazenado localmente (útil para persistir o estado de login)
export const checkLocalAuthState = () => {
  const authState = localStorage.getItem('googleAuthState');
  if (authState) {
    try {
      return JSON.parse(authState);
    } catch (e) {
      console.error('Erro ao parsear estado de autenticação:', e);
      localStorage.removeItem('googleAuthState');
    }
  }
  return null;
};

// Esta função salva o estado de autenticação localmente
export const saveLocalAuthState = (email: string) => {
  localStorage.setItem('googleAuthState', JSON.stringify({
    email,
    authenticated: true,
    timestamp: new Date().toISOString()
  }));
};

// Esta função limpa o estado de autenticação local
export const clearLocalAuthState = () => {
  localStorage.removeItem('googleAuthState');
};

// Função para calcular tempo decorrido desde a configuração
export const getConfigTimeElapsed = (configTimestamp?: number): string => {
  if (!configTimestamp) return "";
  
  const now = Date.now();
  const elapsedMs = now - configTimestamp;
  const minutes = Math.floor(elapsedMs / 60000);
  
  if (minutes < 1) return "menos de 1 minuto";
  if (minutes === 1) return "1 minuto";
  if (minutes < 60) return `${minutes} minutos`;
  
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return "1 hora";
  return `${hours} horas`;
};
