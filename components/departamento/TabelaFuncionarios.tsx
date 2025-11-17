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
    <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden h-[calc(100vh-15rem)]">
      {/* Tabela para Desktop */}
      <div className="hidden md:block overflow-auto h-full">
        <table className="w-full">
          <thead className="bg-slate-800 border-b border-gray-700 sticky top-0">
            <tr>
              <th className="w-22 py-4 text-center text-sm font-semibold text-gray-100">
                Status
              </th>
              <th className="w-20 py-4 text-center text-sm font-semibold text-gray-100">
                Meta
              </th>
              <th className="w-20 py-4 text-center text-sm font-semibold text-gray-100">
                Coins
              </th>
              <th className="w-24 py-4 text-center text-sm font-semibold text-gray-100">
                Pontuação
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-100">
                Nome
              </th>
              <th className="w-40 py-4 text-center text-sm font-semibold text-gray-100">
                CPF
              </th>
              <th className="w-32 py-4 text-center text-sm font-semibold text-gray-100">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario, idx) => (
              <tr
                key={funcionario.id}
                className={`border-b hover:bg-gray-50 transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-200/70"
                } ${!funcionario.ativo ? "opacity-60" : ""}`}
              >
                <td className="px-6 py-4 text-center">
                  <span
                    className={`p-1 rounded-full text-xs font-semibold ${
                      funcionario.ativo ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {funcionario.ativo ? "" : ""}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 rounded-lg font-semibold text-blue-400">
                    {funcionario.totalMetas}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 text-yellow-400 rounded-lg font-semibold">
                    {funcionario.totalCoins}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 text-orange-400 rounded-lg font-semibold">
                    {funcionario.totalPontos.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 max-w-96 truncate">
                  {funcionario.nome}
                </td>
                <td className="px-6 py-4 text-center text-gray-950 font-mono text-sm">
                  {funcionario.cpf}
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

      {/* Cards para Mobile */}
      <div className="md:hidden overflow-auto h-full p-4 space-y-3">
        {funcionarios.map((funcionario, idx) => (
          <div
            key={funcionario.id}
            className={`rounded-xl border p-4 border-gray-400 ${
              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
            } ${!funcionario.ativo ? "opacity-60" : ""}`}
          >
            {/* Header do Card - Nome e Status */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-base mb-1 truncate max-w-64">
                  {funcionario.nome}
                </h3>
                <p className="text-xs text-gray-600 font-mono">
                  {funcionario.cpf}
                </p>
              </div>
              <span
                className={`p-1.5 rounded-full ${
                  funcionario.ativo ? "bg-green-500 " : "bg-red-500"
                }`}
              >
                {funcionario.ativo ? "" : ""}
              </span>
            </div>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-blue-50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-800 mb-1">Meta</p>
                <p className="font-bold text-blue-500 truncate">
                  {funcionario.totalMetas}
                </p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-800 mb-1 ">Coins</p>
                <p className="font-bold text-yellow-500 truncate">
                  {funcionario.totalCoins}
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-800 mb-1">Pontos</p>
                <p className="font-bold text-orange-500 truncate">
                  {funcionario.totalPontos.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Ações */}
            <div className="pt-3 border-t border-gray-500">
              <FuncionarioActions
                funcionario={funcionario}
                isPending={isPending}
                onToggleStatus={onToggleStatus}
                onAdicionarCoins={onAdicionarCoins}
                onResgatarProduto={onResgatarProduto}
                onVerHistorico={onVerHistorico}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
