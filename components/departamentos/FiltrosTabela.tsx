import { Search } from "lucide-react";
import ExcelReportGenerator from "@/components/ExcelExport";

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
  totalFiltrados,
  totalGeral,
}: FiltrosTabelaProps) {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-xl md:text-2xl font-bold uppercase">
          Tabela de funcionários
        </h2>
        <div className="flex gap-3">
         <ExcelReportGenerator funcionarios={[]} departamentoNome={"slug"} />
        </div>
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
      </div>

      <p className="mt-3 text-sm text-gray-600">
        Mostrando {totalFiltrados} de {totalGeral} funcionários
      </p>
    </div>
  );
}