import { Search } from "lucide-react";

interface FiltrosTabelaProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  somenteInativos: boolean;
  setSomenteInativos: (value: boolean) => void;
  totalFiltrados: number;
  totalGeral: number;
}

export function FiltrosTabela({
  searchTerm,
  setSearchTerm,
  somenteInativos,
  setSomenteInativos,
  totalFiltrados,
  totalGeral,
}: FiltrosTabelaProps) {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-xl md:text-2xl font-bold uppercase">
          Tabela de funcionários
        </h2>
        <button className="px-4 py-2 bg-linear-to-br from-lime-400 via-green-500 to-green-600 hover:scale-102 hover:shadow-lg text-white transition-all text-sm font-medium rounded-md">
          Exportar em Excel
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <label className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg bg-gradient-to-r from-rose-50 to-red-50 border border-red-200 hover:border-blue-300 hover:shadow-md transition-all group">
          <input
            type="checkbox"
            checked={somenteInativos}
            onChange={(e) => setSomenteInativos(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
          />
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
            Mostrar somente inativos
          </span>
        </label>
      </div>

      <p className="mt-3 text-sm text-gray-600">
        Mostrando {totalFiltrados} de {totalGeral} funcionários
      </p>
    </div>
  );
}