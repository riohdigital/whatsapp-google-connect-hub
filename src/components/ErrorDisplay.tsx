
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  errorMessage: string;
  errorDetails: string | null;
}

const ErrorDisplay = ({ errorMessage, errorDetails }: ErrorDisplayProps) => {
  if (!errorMessage) return null;
  
  return (
    <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-lg">
      <div className="flex items-center gap-3">
        <AlertCircle className="text-red-500" />
        <div>
          <p className="font-medium text-red-800">Erro de autenticação</p>
          <p className="text-red-700 text-sm">{errorMessage}</p>
          {errorDetails && (
            <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto max-h-40">
              {errorDetails}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
