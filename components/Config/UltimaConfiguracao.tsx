import React from "react";
import { Clock } from "lucide-react";

type UltimaConfiguracaoProps = {
  data: string;
};

export const UltimaConfiguracao: React.FC<UltimaConfiguracaoProps> = ({
  data,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
      <Clock className="text-gray-600" />
      Última Configuração Salva
    </h2>
    <div className="p-4 bg-stone-200 rounded-r-xl shadow-md border-l-6 border-stone-600">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Data
      </label>
      <p className="text-xl font-bold text-gray-800">
        {new Date(data).toLocaleDateString("pt-BR")}
      </p>
    </div>
  </div>
);
