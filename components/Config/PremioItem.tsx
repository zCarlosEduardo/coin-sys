import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { PremioConfig } from "@/app/types/configuracao.types";

type PremioItemProps = {
  premio: PremioConfig;
  editando: boolean;
  onEdit: () => void;
  onSave: (campo: keyof PremioConfig, valor: any) => void;
  onCancelEdit: () => void;
  onRemove: () => void;
};

export const PremioItem: React.FC<PremioItemProps> = ({
  premio,
  editando,
  onEdit,
  onSave,
  onCancelEdit,
  onRemove,
}) => {
  if (editando) {
    return (
      <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input
            type="text"
            value={premio.nome}
            onChange={(e) => onSave("nome", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            min="1"
            value={premio.valor}
            onChange={(e) => onSave("valor", Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            min="1"
            value={premio.quantidade}
            onChange={(e) => onSave("quantidade", Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancelEdit}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Salvar
          </button>
          <button
            onClick={onCancelEdit}
            className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="bg-blue-600 text-white rounded-lg px-4 py-2 font-bold text-lg">
            {premio.valor}
          </div>
          <div>
            <p className="font-bold text-gray-800">{premio.nome}</p>
            <p className="text-sm text-gray-600">
              Quantidade: {premio.quantidade} unidades
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={onRemove}
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};