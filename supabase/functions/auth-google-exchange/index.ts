
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID') || "";
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET') || "";
const REDIRECT_URI = "https://whatsapp-google-connect-hub.lovable.app/conectar";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  console.log("Função auth-google-exchange chamada");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    // Verificar se as credenciais estão configuradas
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      console.error("Credenciais do Google não configuradas");
      console.log(`Client ID disponível: ${GOOGLE_CLIENT_ID ? "Sim" : "Não"}`);
      console.log(`Client Secret disponível: ${GOOGLE_CLIENT_SECRET ? "Sim" : "Não"}`);
      
      return new Response(
        JSON.stringify({
          error: "Credenciais do Google não configuradas no servidor",
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

    console.log("Código recebido, trocando por tokens...");
    console.log(`REDIRECT_URI: ${REDIRECT_URI}`);
    
    // Construir os parâmetros para a troca de código por tokens
    const tokenParams = new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    console.log("Parâmetros da requisição de token:", tokenParams.toString());

    // Trocar o código por tokens de acesso e refresh
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenParams,
    });

    const tokenResponseStatus = tokenResponse.status;
    const tokenResponseText = await tokenResponse.text();
    console.log(`Status da resposta de token: ${tokenResponseStatus}`);
    console.log(`Resposta de token (texto): ${tokenResponseText}`);
    
    let tokenData;
    try {
      tokenData = JSON.parse(tokenResponseText);
      console.log("Resposta do token parsada com sucesso");
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
      console.error("Erro retornado pela API do Google:", tokenData.error, tokenData.error_description);
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
    console.log("Tokens obtidos com sucesso");

    // Obter informações do usuário com o token de acesso
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userInfoStatus = userInfoResponse.status;
    const userInfoText = await userInfoResponse.text();
    console.log(`Status da resposta de userInfo: ${userInfoStatus}`);
    console.log(`Resposta de userInfo (texto): ${userInfoText}`);
    
    let userInfo;
    try {
      userInfo = JSON.parse(userInfoText);
      console.log("Informações do usuário obtidas com sucesso");
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
    console.error("Erro não tratado na função auth-google-exchange:", error);
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
