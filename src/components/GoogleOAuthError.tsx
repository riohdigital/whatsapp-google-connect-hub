
import { useState, useEffect } from 'react';
import { AlertCircle, ExternalLink, RefreshCw } from "lucide-react";
import { getConfigTimeElapsed } from "@/utils/googleAuth";

interface GoogleOAuthErrorProps {
  errorMessage: string;
  errorDetails?: string | null;
  isRedirectUriError: boolean;
  configTimestamp?: number;
}

export function GoogleOAuthError({ errorMessage, errorDetails, isRedirectUriError, configTimestamp }: GoogleOAuthErrorProps) {
  const [timeElapsed, setTimeElapsed] = useState<string>(getConfigTimeElapsed(configTimestamp));
  
  useEffect(() => {
    if (!configTimestamp) return;
    
    // Atualizar o tempo decorrido a cada minuto
    const intervalId = setInterval(() => {
      setTimeElapsed(getConfigTimeElapsed(configTimestamp));
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [configTimestamp]);
  
  return (
    <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-lg">
      <div className="flex items-center gap-3">
        <AlertCircle className="text-red-500 shrink-0" />
        <div>
          <p className="font-medium text-red-800">Erro de autenticação</p>
          <p className="text-red-700 text-sm">{errorMessage}</p>
          {isRedirectUriError && (
            <div className="mt-3 p-3 border border-red-300 bg-red-100 rounded-md">
              <p className="text-red-800 font-medium mb-2">Problema de URI de Redirecionamento</p>
              <p className="text-red-700 text-sm mb-2">{errorDetails}</p>
              <p className="text-red-700 text-sm mb-3">Você precisa adicionar este URI exato nas configurações do seu projeto no Google Cloud Console:</p>
              <div className="bg-red-200 p-2 rounded flex items-center justify-between">
                <code className="text-sm font-mono text-red-900">https://whatsapp-google-connect-hub.lovable.app/conectar</code>
              </div>
              
              {configTimestamp && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded">
                  <div className="flex items-start gap-2">
                    <RefreshCw className="text-yellow-700 w-5 h-5 mt-0.5 animate-spin" />
                    <div>
                      <p className="text-yellow-800 font-medium">Aguardando propagação das configurações</p>
                      <p className="text-yellow-700 text-sm">
                        As configurações de redirecionamento URI foram salvas há {timeElapsed}.
                      </p>
                      <p className="text-yellow-700 text-sm mt-2">
                        O Google pode levar de 5 minutos a algumas horas para processar alterações nas configurações de OAuth.
                        Por favor, aguarde um pouco e tente novamente.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <a 
                href="https://console.cloud.google.com/apis/credentials" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 text-red-700 flex items-center gap-1 hover:underline text-sm"
              >
                Abrir Google Cloud Console <ExternalLink size={14} />
              </a>
            </div>
          )}
          {!isRedirectUriError && errorDetails && (
            <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto max-h-40">
              {errorDetails}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
