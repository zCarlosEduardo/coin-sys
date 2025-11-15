import Link from "next/link";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  type?: "500" | "error";
  title?: string;
  description?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  errorMessage?: string;
}

export default function ErrorPage({
  type = "error",
  title,
  description,
  showRetry = false,
  onRetry,
  errorMessage,
}: ErrorPageProps) {
  const config = {
    "500": {
      icon: AlertTriangle,
      iconColor: "text-red-500",
      bgColor: "from-red-50",
      code: "500",
      defaultTitle: "Erro Interno",
      defaultDescription:
        "Encontramos um problema no servidor. Por favor, tente novamente mais tarde.",
    },
    error: {
      icon: AlertTriangle,
      iconColor: "text-orange-500",
      bgColor: "from-orange-50",
      code: "Oops!",
      defaultTitle: "Algo Deu Errado",
      defaultDescription:
        "Encontramos um problema inesperado. Não se preocupe, estamos trabalhando para resolver isso.",
    },
  };

  const currentConfig = config[type];
  const Icon = currentConfig.icon;

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${currentConfig.bgColor} to-white flex items-center justify-center p-6`}
    >
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 text-center">
          {/* Ícone animado */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div
                className={`absolute inset-0 ${currentConfig.iconColor.replace(
                  "text-",
                  "bg-"
                )} rounded-full blur-2xl opacity-20 animate-pulse`}
              ></div>
              <Icon
                className={`w-24 h-24 ${currentConfig.iconColor} relative animate-bounce`}
              />
            </div>
          </div>

          {/* Código */}
          <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">
            {currentConfig.code}
          </h1>

          {/* Título */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 uppercase">
            {title || currentConfig.defaultTitle}
          </h2>

          {/* Descrição */}
          <p className="text-gray-600 mb-2 text-lg">
            {description || currentConfig.defaultDescription}
          </p>

          {/* Mensagem de erro (apenas em dev) */}
          {errorMessage && process.env.NODE_ENV === "development" && (
            <div className="mt-4 mb-6 p-4 bg-gray-50 rounded-lg text-left">
              <p className="text-xs text-gray-600 font-mono break-all">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {showRetry && onRetry && (
              <button
                onClick={onRetry}
                className={`flex items-center justify-center gap-2 ${currentConfig.iconColor.replace(
                  "text-",
                  "bg-"
                )} hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105`}
              >
                <RefreshCw className="w-5 h-5" />
                Tentar Novamente
              </button>
            )}

            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
