"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { getDepartamentoBySlug } from "@/lib/departamentos/departamentos";
import {
  funcionarios,
  type Funcionario,
} from "@/lib/funcionarios/funcionarios";
import {
  ArrowLeft,
  Users,
  TrendingUp,
  Award,
  Target,
  Search,
  Eye,
  EyeOff,
  Gift,
  History,
} from "lucide-react";

interface Props {
  slug: string;
}

export default function DepartamentoPageClient({ slug }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [somenteInativos, setSomenteInativos] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const departamento = getDepartamentoBySlug(slug);

  // Busca TODOS os funcionários do departamento
  const todosFuncionarios = useMemo(() => {
    if (!departamento) return [];
    return funcionarios.filter((f) => f.departamentoId === departamento.id);
  }, [departamento]);

  // Calcula estatísticas
  const estatisticas = useMemo(() => {
    const ativos = todosFuncionarios.filter((f) => f.ativo);
    return {
      funcionariosAtivos: ativos.length,
      pontuacaoTotal: ativos.reduce((acc, f) => acc + f.totalPontos, 0),
      coinsDistribuidas: ativos.reduce((acc, f) => acc + f.totalCoins, 0),
      metasAlcancadas: ativos.reduce((acc, f) => acc + f.totalMetas, 0),
    };
  }, [todosFuncionarios]);

  // Filtragem e ordenação
  const funcionariosFiltrados = useMemo(() => {
    return todosFuncionarios
      .filter((func) => {
        const matchSearch =
          func.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          func.cpf.replace(/\D/g, "").includes(searchTerm.replace(/\D/g, ""));
        const matchStatus = somenteInativos ? !func.ativo : func.ativo;
        return matchSearch && matchStatus;
      })
      .sort((a, b) => b.totalPontos - a.totalPontos);
  }, [todosFuncionarios, searchTerm, somenteInativos]);

  // Early return após todos os hooks
  if (!departamento) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Departamento não encontrado
          </h1>
          <Link
            href="/departamentos"
            className="text-blue-600 hover:text-blue-700"
          >
            Voltar para Departamentos
          </Link>
        </div>
      </div>
    );
  }

  const Icon = departamento.icon;

  // Handlers
  const handleToggleStatus = (id: string) => {
    setIsPending(true);
    console.log("Toggle status:", id);
    setTimeout(() => setIsPending(false), 500);
  };

  const handleAdicionarCoins = (funcionario: Funcionario) => {
    console.log("Adicionar coins:", funcionario);
  };

  const handleResgatarProduto = (funcionario: Funcionario) => {
    console.log("Resgatar produto:", funcionario);
  };

  const handleVerHistorico = (funcionario: Funcionario) => {
    console.log("Ver histórico:", funcionario);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Botão Voltar */}
        <Link
          href="/departamentos"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para Departamentos
        </Link>

        {/* Header do Departamento */}
        <div
          className={`${departamento.cor} rounded-xl p-6 md:p-8 text-white shadow-2xl mb-6 md:mb-8 relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 opacity-10">
            <Icon className="w-32 h-32 md:w-48 md:h-48" />
          </div>
          <div className="relative z-10">
            <Icon className="w-12 h-12 md:w-16 md:h-16 mb-3" />
            <h1 className="text-2xl md:text-4xl font-bold">
              {departamento.nome}
            </h1>
          </div>
        </div>

        {/* Estatísticas em Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
            <div className="bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-indigo-800" />
            </div>
            <p className="text-gray-600 text-xs md:text-sm mb-1">
              Funcionários Ativos
            </p>
            <p className="text-2xl md:text-3xl font-bold text-indigo-800">
              {estatisticas.funcionariosAtivos}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
            <div className="bg-yellow-50 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-gray-600 text-xs md:text-sm mb-1">
              Pontuação Total
            </p>
            <p className="text-2xl md:text-3xl font-bold text-yellow-600">
              {estatisticas.pontuacaoTotal.toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-600 text-xs md:text-sm mb-1">
              Coins Distribuídas
            </p>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">
              {estatisticas.coinsDistribuidas.toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
            <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-gray-600 text-xs md:text-sm mb-1">
              Metas Alcançadas
            </p>
            <p className="text-2xl md:text-3xl font-bold text-green-600">
              {estatisticas.metasAlcancadas}
            </p>
          </div>
        </div>

        {/* Tabela de Funcionários */}
        <div className="rounded-xl overflow-hidden">
          {/* Header com busca */}
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <h2 className="text-xl md:text-2xl font-bold uppercase">
                Tabela de funcionários
              </h2>
              <button className="px-4 py-2 bg-linear-to-br from-lime-400 via-green-500 to-green-600 hover:scale-102 hover:shadow-lg text-white transition-all text-sm font-medium rounded-md">
                Exportar em Excel
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou CPF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg bg-gradient-to-r from-rose-50 to-red-50 border border-red-200 hover:border-blue-300 hover:shadow-md transition-all group">
                <input
                  type="checkbox"
                  checked={somenteInativos}
                  onChange={(e) => setSomenteInativos(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                  Mostrar somente inativos
                </span>
              </label>
            </div>

            <p className="mt-3 text-sm text-gray-600">
              Mostrando {funcionariosFiltrados.length} de {todosFuncionarios.length} funcionários
            </p>
          </div>

          {/* Tabela Desktop */}
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
                {funcionariosFiltrados.map((funcionario, idx) => (
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
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleToggleStatus(funcionario.id)}
                          className={`p-2 rounded-lg transition-all ${
                            funcionario.ativo
                              ? "bg-red-100 text-red-600 hover:bg-red-200"
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
                          onClick={() => handleAdicionarCoins(funcionario)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all disabled:opacity-50"
                          disabled={isPending || !funcionario.ativo}
                          title="Adicionar coins"
                        >
                          <TrendingUp className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleResgatarProduto(funcionario)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all disabled:opacity-50"
                          disabled={isPending || !funcionario.ativo}
                          title="Resgatar produto"
                        >
                          <Gift className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleVerHistorico(funcionario)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                          disabled={isPending}
                          title="Ver histórico"
                        >
                          <History className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards Mobile */}
          <div className="md:hidden divide-y">
            {funcionariosFiltrados.map((funcionario) => (
              <div
                key={funcionario.id}
                className={`p-4 ${!funcionario.ativo ? "opacity-60" : ""}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {funcionario.nome}
                    </h3>
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
                    onClick={() => handleToggleStatus(funcionario.id)}
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
                    onClick={() => handleAdicionarCoins(funcionario)}
                    className="p-2 bg-green-100 text-green-600 rounded-lg disabled:opacity-50"
                    disabled={isPending || !funcionario.ativo}
                  >
                    <TrendingUp className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleResgatarProduto(funcionario)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg disabled:opacity-50"
                    disabled={isPending || !funcionario.ativo}
                  >
                    <Gift className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleVerHistorico(funcionario)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg"
                    disabled={isPending}
                  >
                    <History className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {funcionariosFiltrados.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg">Nenhum funcionário encontrado</p>
              {searchTerm && (
                <p className="text-sm mt-2">
                  Tente ajustar os filtros de busca
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}