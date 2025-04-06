
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Obtenha as variáveis de ambiente
const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID') || "";
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET') || "";
const REDIRECT_URI = "https://whatsapp-google-connect-hub.lovable.app/conectar";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("Função auth-google-exchange chamada", { 
    method: req.method, 
    url: req.url,
    headers: Object.fromEntries([...req.headers.entries()])
  });
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Requisição OPTIONS recebida, retornando 204");
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    // Verificar se as credenciais estão configuradas
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      console.error("Credenciais do Google não configuradas", {
        clientIdPresente: Boolean(GOOGLE_CLIENT_ID),
        clientSecretPresente: Boolean(GOOGLE_CLIENT_SECRET)
      });
      
      return new Response(
        JSON.stringify({
          error: "Credenciais do Google não configuradas no servidor",
          clientIdPresente: Boolean(GOOGLE_CLIENT_ID),
          clientSecretPresente: Boolean(GOOGLE_CLIENT_SECRET),
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Obter o código de autorização da requisição
    let requestBody;
    try {
      requestBody = await req.json();
      console.log("Body da requisição recebido");
    } catch (e) {
      console.error("Erro ao parsear JSON do body:", e);
      return new Response(
        JSON.stringify({ error: "Body da requisição inválido" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    const { code } = requestBody;
    
    if (!code) {
      console.error("Código de autorização não fornecido");
      return new Response(
        JSON.stringify({ error: "Código de autorização não fornecido" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Código recebido (primeiros caracteres): ${code.substring(0, 10)}...`);
    console.log(`REDIRECT_URI configurado: ${REDIRECT_URI}`);
    console.log(`GOOGLE_CLIENT_ID presente: ${Boolean(GOOGLE_CLIENT_ID)}`);
    
    // Construir os parâmetros para a troca de código por tokens
    const tokenParams = new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    console.log("Enviando requisição para obter token do Google");
    console.log("Parâmetros da requisição de token:", {
      client_id_length: GOOGLE_CLIENT_ID.length,
      client_secret_length: GOOGLE_CLIENT_SECRET.length,
      redirect_uri: REDIRECT_URI,
      code_length: code.length,
      grant_type: "authorization_code"
    });

    // Trocar o código por tokens de acesso e refresh
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenParams,
    });

    const tokenResponseStatus = tokenResponse.status;
    const tokenResponseHeaders = Object.fromEntries([...tokenResponse.headers.entries()]);
    const tokenResponseText = await tokenResponse.text();
    
    console.log(`Status da resposta de token: ${tokenResponseStatus}`);
    console.log(`Headers da resposta de token:`, tokenResponseHeaders);
    console.log(`Resposta de token (texto): ${tokenResponseText}`);
    
    let tokenData;
    try {
      tokenData = JSON.parse(tokenResponseText);
      console.log("Resposta do token parseada com sucesso");
    } catch (e) {
      console.error("Erro ao parsear resposta JSON de token:", e);
      return new Response(
        JSON.stringify({ 
          error: "Resposta inválida da API do Google",
          details: tokenResponseText
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    if (tokenData.error) {
      // Tratamento específico para o erro de redirect_uri_mismatch
      if (tokenData.error === "redirect_uri_mismatch") {
        console.error("Erro de redirecionamento URI:", {
          error: tokenData.error,
          error_description: tokenData.error_description,
          configured_uri: REDIRECT_URI
        });
        
        return new Response(
          JSON.stringify({
            error: "Erro de configuração no Google Cloud Console",
            error_type: "redirect_uri_mismatch",
            message: "O URI de redirecionamento não corresponde ao configurado no Google Cloud Console.",
            details: {
              configured_uri: REDIRECT_URI,
              suggestion: "Certifique-se que este URI exato esteja adicionado nas URIs de redirecionamento autorizadas no Console Google Cloud.",
              propagation_time: "As configurações do Google Cloud podem levar de 5 minutos a algumas horas para entrar em vigor."
            }
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      console.error("Erro retornado pela API do Google:", {
        error: tokenData.error,
        error_description: tokenData.error_description,
        details: tokenData
      });
      
      return new Response(
        JSON.stringify({
          error: `Falha ao trocar o código por tokens: ${tokenData.error_description || tokenData.error}`,
          details: tokenData,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Extrair o token de acesso
    const { access_token, refresh_token, id_token } = tokenData;
    console.log("Tokens obtidos com sucesso", {
      access_token_present: Boolean(access_token),
      refresh_token_present: Boolean(refresh_token),
      id_token_present: Boolean(id_token)
    });

    // Obter informações do usuário com o token de acesso
    console.log("Fazendo requisição para obter informações do usuário");
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userInfoStatus = userInfoResponse.status;
    const userInfoHeaders = Object.fromEntries([...userInfoResponse.headers.entries()]);
    const userInfoText = await userInfoResponse.text();
    
    console.log(`Status da resposta de userInfo: ${userInfoStatus}`);
    console.log(`Headers da resposta de userInfo:`, userInfoHeaders);
    console.log(`Resposta de userInfo (texto): ${userInfoText}`);
    
    let userInfo;
    try {
      userInfo = JSON.parse(userInfoText);
      console.log("Informações do usuário obtidas com sucesso", {
        email_present: Boolean(userInfo.email),
        name_present: Boolean(userInfo.name)
      });
    } catch (e) {
      console.error("Erro ao parsear informações do usuário:", e);
      return new Response(
        JSON.stringify({
          error: "Erro ao parsear informações do usuário",
          details: userInfoText
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    if (userInfo.error) {
      console.error("Erro ao obter informações do usuário:", userInfo.error);
      return new Response(
        JSON.stringify({
          error: `Falha ao obter informações do usuário: ${userInfo.error}`,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Retornar informações do usuário e tokens para o cliente
    console.log("Retornando dados para o cliente");
    return new Response(
      JSON.stringify({
        success: true,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        accessToken: access_token,
        refreshToken: refresh_token
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro não tratado na função auth-google-exchange:", {
      message: error.message,
      stack: error.stack
    });
    
    return new Response(
      JSON.stringify({
        error: `Erro interno do servidor: ${error.message}`,
        stack: error.stack
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
