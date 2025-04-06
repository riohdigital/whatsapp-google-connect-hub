
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
    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      console.error("Credenciais do Google não configuradas");
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

    const { code } = await req.json();
    
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
    
    // Troca o código por tokens de acesso e refresh
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log("Resposta do token:", JSON.stringify(tokenData, null, 2));
    
    if (tokenData.error) {
      console.error("Erro ao obter tokens:", tokenData.error_description || tokenData.error);
      return new Response(
        JSON.stringify({
          error: `Falha ao trocar o código por tokens: ${
            tokenData.error_description || tokenData.error
          }`,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Extrair o token de acesso
    const { access_token, refresh_token, id_token } = tokenData;

    // Obter informações do usuário
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userInfo = await userInfoResponse.json();
    console.log("Informações do usuário:", userInfo);
    
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

    // Armazenar tokens e informações do usuário no Supabase ou no banco de dados
    // Implementar conforme necessário

    return new Response(
      JSON.stringify({
        success: true,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro na função auth-google-exchange:", error);
    return new Response(
      JSON.stringify({
        error: `Erro interno do servidor: ${error.message}`,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
