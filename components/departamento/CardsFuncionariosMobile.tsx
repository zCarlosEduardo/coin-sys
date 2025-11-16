import { Funcionario } from "@/lib/funcionarios/funcionarios";
import { TrendingUp, Gift, History } from "lucide-react";

interface CardsFuncionariosMobileProps {
  funcionarios: Funcionario[];
  isPending: boolean;
  onToggleStatus: (id: string) => void;
  onAdicionarCoins: (func: Funcionario) => void;
  onResgatarProduto: (func: Funcionario) => void;
  onVerHistorico: (func: Funcionario) => void;
}

export function CardsFuncionariosMobile({
  funcionarios,
  isPending,
  onToggleStatus,
  onAdicionarCoins,
  onResgatarProduto,
  onVerHistorico,
}: CardsFuncionariosMobileProps) {
  if (funcionarios.length === 0) return null;

  return (
    <div className="md:hidden divide-y">
      {funcionarios.map((funcionario) => (
        <div
          key={funcionario.id}
          className={`p-4 ${!funcionario.ativo ? "opacity-60" : ""}`}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg">{funcionario.nome}</h3>
              <p className="text-sm text-gray-600 font-mono">
                {funcionario.cpf}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                funcionario.ativo
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {funcionario.ativo ? "Ativo" : "Inativo"}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
            <div>
              <p className="text-gray-600">Metas</p>
              <p className="font-semibold text-blue-600">
                {funcionario.totalMetas}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Coins</p>
              <p className="font-semibold text-yellow-600">
                {funcionario.totalCoins}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Pontos</p>
              <p className="font-semibold text-orange-600">
                {funcionario.totalPontos.toLocaleString("pt-BR")}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onToggleStatus(funcionario.id)}
              className={`flex-1 p-2 rounded-lg text-sm font-medium transition-all ${
                funcionario.ativo
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
              disabled={isPending}
            >
              {funcionario.ativo ? "Inativar" : "Ativar"}
            </button>
            <button
              onClick={() => onAdicionarCoins(funcionario)}
              className="p-2 bg-green-100 text-green-600 rounded-lg disabled:opacity-50"
              disabled={isPending || !funcionario.ativo}
            >
              <TrendingUp className="w-5 h-5" />
            </button>
            <button
              onClick={() => onResgatarProduto(funcionario)}
              className="p-2 bg-red-100 text-red-600 rounded-lg disabled:opacity-50"
              disabled={isPending || !funcionario.ativo}
            >
              <Gift className="w-5 h-5" />
            </button>
            <button
              onClick={() => onVerHistorico(funcionario)}
              className="p-2 bg-blue-100 text-blue-600 rounded-lg"
              disabled={isPending}
            >
              <History className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}