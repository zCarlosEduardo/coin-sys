import React from "react";

type FormularioNovoPremioProps = {
  premio: { nome: string; valor: number; quantidade: number };
  onChange: (premio: {
    nome: string;
    valor: number;
    quantidade: number;
  }) => void;
  onSave: () => void;
  onCancel: () => void;
};

export const FormularioNovoPremio: React.FC<FormularioNovoPremioProps> = ({
  premio,
  onChange,
  onSave,
  onCancel,
}) => (
  <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
      <input
        type="text"
        placeholder="Nome (ex: 5 Coins)"
        value={premio.nome}
        onChange={(e) => onChange({ ...premio, nome: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Valor"
        min="1"
        value={premio.valor || ""}
        onChange={(e) => onChange({ ...premio, valor: Number(e.target.value) })}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Quantidade"
        min="1"
        value={premio.quantidade || ""}
        onChange={(e) =>
          onChange({ ...premio, quantidade: Number(e.target.value) })
        }
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="flex gap-2">
      <button
        onClick={onSave}
        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Salvar
      </button>
      <button
        onClick={onCancel}
        className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
      >
        Cancelar
      </button>
    </div>
  </div>
);