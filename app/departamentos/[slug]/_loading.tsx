// app/departamentos/[slug]/loading.tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Skeleton do Botão Voltar */}
        <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>

        {/* Skeleton do Header */}
        <div className="bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl p-6 md:p-8 mb-6 md:mb-8 animate-pulse">
          <div className="h-12 md:h-16 w-12 md:w-16 bg-white/30 rounded-lg mb-3"></div>
          <div className="h-8 md:h-10 w-64 bg-white/30 rounded"></div>
        </div>

        {/* Skeleton das Estatísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-4 md:p-6 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 w-16 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        {/* Skeleton da Tabela */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header da tabela */}
          <div className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-gray-50 border-b">
            <div className="h-7 w-64 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Linhas da tabela (skeleton) */}
          <div className="hidden md:block">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`p-6 border-b flex items-center gap-4 ${
                  i % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                }`}
              >
                <div className="flex-1 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Cards Mobile (skeleton) */}
          <div className="md:hidden divide-y">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 space-y-3">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="space-y-1">
                      <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-5 w-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicador de carregamento centralizado */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-gray-700 font-medium">Carregando departamento...</p>
          </div>
        </div>
      </div>
    </div>
  );
}