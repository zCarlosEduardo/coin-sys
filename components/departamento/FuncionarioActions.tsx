import { Eye, EyeOff, TrendingUp, Gift, History } from "lucide-react";
import { Funcionario } from "@/lib/funcionarios/funcionarios";

interface FuncionarioActionsProps {
  funcionario: Funcionario;
  isPending: boolean;
  onToggleStatus: (id: string) => void;
  onAdicionarCoins: (func: Funcionario) => void;
  onResgatarProduto: (func: Funcionario) => void;
  onVerHistorico: (func: Funcionario) => void;
}

export function FuncionarioActions({
  funcionario,
  isPending,
  onToggleStatus,
  onAdicionarCoins,
  onResgatarProduto,
  onVerHistorico,
}: FuncionarioActionsProps) {
  return (
    <div className="flex gap-2 justify-center">
      <button
        onClick={() => onToggleStatus(funcionario.id)}
        className={`p-2 rounded-lg transition-all ${
          funcionario.ativo
            ? "bg-red-400/50 text-red-900 hover:bg-red-200"
            : "bg-green-100 text-green-600 hover:bg-green-200"
        }`}
        disabled={isPending}
        title={funcionario.ativo ? "Inativar" : "Ativar"}
      >
        {funcionario.ativo ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>

      <button
        onClick={() => onAdicionarCoins(funcionario)}
        className="p-2 bg-green-400/50 text-green-900 rounded-lg hover:bg-green-200 transition-all disabled:opacity-50"
        disabled={isPending || !funcionario.ativo}
        title="Adicionar coins"
      >
        <TrendingUp className="w-4 h-4" />
      </button>

      <button
        onClick={() => onResgatarProduto(funcionario)}
        className="p-2 bg-amber-400/50 text-orange-800 rounded-lg hover:bg-amber-200/80 transition-all disabled:opacity-50"
        disabled={isPending || !funcionario.ativo}
        title="Resgatar produto"
      >
        <Gift className="w-4 h-4" />
      </button>

      <button
        onClick={() => onVerHistorico(funcionario)}
        className="p-2 bg-blue-400/50 text-blue-800 rounded-lg hover:bg-blue-200 transition-all"
        disabled={isPending}
        title="Ver histórico"
      >
        <History className="w-4 h-4" />
      </button>
    </div>
  );
}