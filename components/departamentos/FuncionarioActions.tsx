import { Eye, EyeOff, TrendingUp, Gift, History, Edit } from "lucide-react";
import { useState } from "react";
import { Funcionario } from "@/lib/funcionarios/funcionarios";
import ModalAdicionarMetas from "@/components/Modal/ModalAdicionarMetas";
import ModalAjusteDados from "@/components/Modal/ModalAjusteDados";
import ModalHistorico from "@/components/Modal/ModalHistorico";

interface FuncionarioActionsProps {
  funcionario: Funcionario;
  isPending: boolean;
  onToggleStatus: (id: string) => void;
  onAdicionarCoins?: (funcionarioAtualizado: Funcionario) => void;
  onResgatarProduto?: (funcionarioAtualizado: Funcionario) => void;
  onAjusteDados?: (funcionarioAtualizado: Funcionario) => void;
}

export function FuncionarioActions({
  funcionario,
  isPending,
  onAdicionarCoins,
  onResgatarProduto,
  onAjusteDados,
}: FuncionarioActionsProps) {
  const [modalAjusteOpen, setModalAjusteOpen] = useState(false);
  const [modalMetasOpen, setModalMetasOpen] = useState(false);
  const [modalResgatarOpen, setModalResgatarOpen] = useState(false);
  const [modalHistoricoOpen, setModalHistoricoOpen] = useState(false);

  const handleSuccessAjuste = (funcionarioAtualizado: Funcionario) => {
    if (onAjusteDados) {
      onAjusteDados(funcionarioAtualizado);
    }
  };

  const handleSuccessMetas = (funcionarioAtualizado: Funcionario) => {
    if (onAdicionarCoins) {
      onAdicionarCoins(funcionarioAtualizado);
    }
  };

  const handleSuccessResgate = (funcionarioAtualizado: Funcionario) => {
    if (onResgatarProduto) {
      onResgatarProduto(funcionarioAtualizado);
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setModalAjusteOpen(true)}
          className="p-2 bg-purple-400/50 text-purple-900 rounded-lg hover:bg-purple-200 transition-all disabled:opacity-50"
          disabled={isPending}
          title="Ajustar dados"
        >
          <Edit className="w-4 h-4" />
        </button>

        <button
          onClick={() => setModalMetasOpen(true)}
          className="p-2 bg-green-400/50 text-green-900 rounded-lg hover:bg-green-200 transition-all disabled:opacity-50"
          disabled={isPending || !funcionario.ativo}
          title="Adicionar metas"
        >
          <TrendingUp className="w-4 h-4" />
        </button>

        <button
          onClick={() => setModalHistoricoOpen(true)}
          className="p-2 bg-blue-400/50 text-blue-800 rounded-lg hover:bg-blue-200 transition-all"
          disabled={isPending}
          title="Ver histórico"
        >
          <History className="w-4 h-4" />
        </button>
      </div>

      {/* Modal de Ajuste de Dados */}
      <ModalAjusteDados
        isOpen={modalAjusteOpen}
        onClose={() => setModalAjusteOpen(false)}
        funcionario={funcionario}
        onSuccess={handleSuccessAjuste}
      />

      {/* Modal de Adicionar Metas */}
      <ModalAdicionarMetas
        isOpen={modalMetasOpen}
        onClose={() => setModalMetasOpen(false)}
        funcionario={funcionario}
        onSuccess={handleSuccessMetas}
      />

      {/* Modal de Histórico */}
      <ModalHistorico
        isOpen={modalHistoricoOpen}
        onClose={() => setModalHistoricoOpen(false)}
        funcionario={funcionario}
      />
    </>
  );
}