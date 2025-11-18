import React from "react";
import { Users } from "lucide-react";

type InformacoesSistemaProps = {
  funcionariosAtivos: number;
  metaMaxima: number;
  multiplicadorPontos: number;
  onMetaChange: (value: number) => void;
  onMultiplicadorChange: (value: number) => void;
};

export const InformacoesSistema: React.FC<InformacoesSistemaProps> = ({
  funcionariosAtivos,
  metaMaxima,
  multiplicadorPontos,
  onMetaChange,
  onMultiplicadorChange,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
      <Users className="text-blue-600" />
      Informações do Sistema
    </h2>

    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg shadow-md">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Funcionários Ativos
        </label>
        <p className="text-3xl font-bold text-blue-600">
          {funcionariosAtivos}
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Meta Máxima por Funcionário
        </label>
        <input
          type="number"
          min="1"
          value={metaMaxima}
          onChange={(e) => onMetaChange(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Multiplicador de Pontos
        </label>
        <input
          type="number"
          min="1"
          value={multiplicadorPontos}
          onChange={(e) => onMultiplicadorChange(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">
          1 coin = {multiplicadorPontos} pontos
        </p>
      </div>
    </div>
  </div>
);