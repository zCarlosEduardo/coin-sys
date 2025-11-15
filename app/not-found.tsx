import Link from "next/link";
import { Home, Search, ArrowLeft, Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 text-center">
          {/* Ícone animado */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <Frown className="w-24 h-24 text-blue-500 relative animate-bounce" />
            </div>
          </div>

          {/* Código 404 */}
          <h1 className="text-8xl md:text-9xl font-bold text-gray-800 mb-4">
            404
          </h1>

          {/* Título */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 uppercase">
            Página Não Encontrada
          </h2>

          {/* Descrição */}
          <p className="text-gray-600 mb-8 text-lg">
            Ops! Parece que você se perdeu no caminho das coins.
            <br className="hidden md:block" />A página que você procura não
            existe ou foi movida.
          </p>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
