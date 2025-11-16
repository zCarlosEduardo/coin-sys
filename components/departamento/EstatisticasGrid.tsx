import { Users, TrendingUp, Award, Target } from "lucide-react";

interface Estatisticas {
  funcionariosAtivos: number;
  pontuacaoTotal: number;
  coinsDistribuidas: number;
  metasAlcancadas: number;
}

interface EstatisticasGridProps {
  estatisticas: Estatisticas;
}

export function EstatisticasGrid({ estatisticas }: EstatisticasGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
        <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
          <Users className="w-6 h-6 text-indigo-800" />
        </div>
        <p className="text-gray-600 text-xs md:text-sm mb-1">
          Funcionários Ativos
        </p>
        <p className="text-2xl md:text-3xl font-bold text-indigo-800">
          {estatisticas.funcionariosAtivos}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
        <div className="bg-yellow-50 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
          <TrendingUp className="w-6 h-6 text-yellow-600" />
        </div>
        <p className="text-gray-600 text-xs md:text-sm mb-1">
          Pontuação Total
        </p>
        <p className="text-2xl md:text-3xl font-bold text-yellow-600">
          {estatisticas.pontuacaoTotal.toLocaleString("pt-BR")}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
        <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
          <Award className="w-6 h-6 text-blue-600" />
        </div>
        <p className="text-gray-600 text-xs md:text-sm mb-1">
          Coins Distribuídas
        </p>
        <p className="text-2xl md:text-3xl font-bold text-blue-600">
          {estatisticas.coinsDistribuidas.toLocaleString("pt-BR")}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
        <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
          <Target className="w-6 h-6 text-green-600" />
        </div>
        <p className="text-gray-600 text-xs md:text-sm mb-1">
          Metas Alcançadas
        </p>
        <p className="text-2xl md:text-3xl font-bold text-green-600">
          {estatisticas.metasAlcancadas}
        </p>
      </div>
    </div>
  );
}