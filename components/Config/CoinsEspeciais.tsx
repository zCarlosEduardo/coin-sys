import React, { useState, useCallback, useMemo } from "react";
import { Gift, Plus } from "lucide-react";
import { PremioConfig } from "@/app/types/configuracao.types";
import { PremioItem } from "./PremioItem";
import { FormularioNovoPremio } from "./FormularioNovoPremio";

type CoinsEspeciaisProps = {
  premios: PremioConfig[];
  onAdd: (premio: PremioConfig) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, campo: keyof PremioConfig, valor: any) => void;
};

export const CoinsEspeciais: React.FC<CoinsEspeciaisProps> = ({
  premios,
  onAdd,
  onRemove,
  onEdit,
}) => {
  const [adicionando, setAdicionando] = useState(false);
  const [editando, setEditando] = useState<string | null>(null);
  const [novoPremio, setNovoPremio] = useState({
    nome: "",
    valor: 0,
    quantidade: 0,
  });

  const totalEspeciais = useMemo(
    () => premios.reduce((sum, p) => sum + p.quantidade, 0),
    [premios]
  );

  const handleAdicionarPremio = useCallback(() => {
    if (novoPremio.nome && novoPremio.valor > 0 && novoPremio.quantidade > 0) {
      onAdd({ ...novoPremio, id: Date.now().toString() });
      setNovoPremio({ nome: "", valor: 0, quantidade: 0 });
      setAdicionando(false);
    }
  }, [novoPremio, onAdd]);

  const handleCancelar = useCallback(() => {
    setAdicionando(false);
    setNovoPremio({ nome: "", valor: 0, quantidade: 0 });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Gift className="text-blue-600" />
          Coins Especiais
        </h2>
        {!adicionando && (
          <button
            onClick={() => setAdicionando(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold flex items-center gap-2"
          >
            <Plus size={18} />
            Adicionar
          </button>
        )}
      </div>

      <div className="space-y-3">
        {adicionando && (
          <FormularioNovoPremio
            premio={novoPremio}
            onChange={setNovoPremio}
            onSave={handleAdicionarPremio}
            onCancel={handleCancelar}
          />
        )}

        {premios.map((premio) => (
          <PremioItem
            key={premio.id}
            premio={premio}
            editando={editando === premio.id}
            onEdit={() => setEditando(premio.id)}
            onSave={(campo, valor) => onEdit(premio.id, campo, valor)}
            onCancelEdit={() => setEditando(null)}
            onRemove={() => onRemove(premio.id)}
          />
        ))}
      </div>

      <div className="mt-4 bg-blue-100 border border-blue-300 rounded-lg p-3">
        <p className="text-sm font-semibold text-blue-900">
          Total de Coins Especiais Configurados:{" "}
          <span className="text-xl">{totalEspeciais}</span>
        </p>
      </div>
    </div>
  );
};