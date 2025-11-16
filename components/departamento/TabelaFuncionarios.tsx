import { Funcionario } from "@/lib/funcionarios/funcionarios";
import { FuncionarioActions } from "./FuncionarioActions";

interface TabelaFuncionariosProps {
  funcionarios: Funcionario[];
  isPending: boolean;
  onToggleStatus: (id: string) => void;
  onAdicionarCoins: (func: Funcionario) => void;
  onResgatarProduto: (func: Funcionario) => void;
  onVerHistorico: (func: Funcionario) => void;
}

export function TabelaFuncionarios({
  funcionarios,
  isPending,
  onToggleStatus,
  onAdicionarCoins,
  onResgatarProduto,
  onVerHistorico,
}: TabelaFuncionariosProps) {
  if (funcionarios.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500">
        <p className="text-lg">Nenhum funcionário encontrado</p>
      </div>
    );
  }

  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Nome
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              CPF
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Metas
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Coins
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Pontuação
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario, idx) => (
            <tr
              key={funcionario.id}
              className={`border-b hover:bg-gray-50 transition-colors ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              } ${!funcionario.ativo ? "opacity-60" : ""}`}
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {funcionario.nome}
              </td>
              <td className="px-6 py-4 text-center text-gray-600 font-mono text-sm">
                {funcionario.cpf}
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    funcionario.ativo
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {funcionario.ativo ? "Ativo" : "Inativo"}
                </span>
              </td>
              <td className="px-6 py-4 text-center font-semibold text-blue-600">
                {funcionario.totalMetas}
              </td>
              <td className="px-6 py-4 text-center font-semibold text-yellow-600">
                {funcionario.totalCoins}
              </td>
              <td className="px-6 py-4 text-center font-semibold text-orange-600">
                {funcionario.totalPontos.toLocaleString("pt-BR")}
              </td>
              <td className="px-6 py-4">
                <FuncionarioActions
                  funcionario={funcionario}
                  isPending={isPending}
                  onToggleStatus={onToggleStatus}
                  onAdicionarCoins={onAdicionarCoins}
                  onResgatarProduto={onResgatarProduto}
                  onVerHistorico={onVerHistorico}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}