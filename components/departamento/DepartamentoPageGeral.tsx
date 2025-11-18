"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { departamentos } from "@/lib/departamentos/departamentos";
import {
  funcionarios,
  type Funcionario,
} from "@/lib/funcionarios/funcionarios";

// Componentes separados
import { EstatisticasGrid } from "@/components/Departamento/EstatisticasGrid";
import { TabelaFuncionarios } from "@/components/Departamento/TabelaFuncionarios";

export default function DepartamentosPage() {
  const [searchTerm] = useState("");
  const [somenteInativos] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [departamentoExpandido, setDepartamentoExpandido] = useState<string | null>(null);

  // Calcula estatísticas gerais
  const estatisticasGerais = useMemo(() => {
    const ativos = funcionarios.filter((f) => f.ativo);
    return {
      funcionariosAtivos: ativos.length,
      pontuacaoTotal: ativos.reduce((acc, f) => acc + f.totalPontos, 0),
      coinsDistribuidas: ativos.reduce((acc, f) => acc + f.totalCoins, 0),
      metasAlcancadas: ativos.reduce((acc, f) => acc + f.totalMetas, 0),
    };
  }, []);

  // Agrupa funcionários por departamento
  const departamentosComFuncionarios = useMemo(() => {
    return departamentos.map((dept) => {
      const todosFuncionarios = funcionarios.filter(
        (f) => f.departamentoId === dept.id
      );

      const funcionariosFiltrados = todosFuncionarios
        .filter((func) => {
          const matchSearch =
            func.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            func.cpf.replace(/\D/g, "").includes(searchTerm.replace(/\D/g, ""));
          const matchStatus = somenteInativos ? !func.ativo : func.ativo;
          return matchSearch && matchStatus;
        })
        .sort((a, b) => b.totalPontos - a.totalPontos);

      const ativos = todosFuncionarios.filter((f) => f.ativo);
      const estatisticas = {
        funcionariosAtivos: ativos.length,
        pontuacaoTotal: ativos.reduce((acc, f) => acc + f.totalPontos, 0),
        coinsDistribuidas: ativos.reduce((acc, f) => acc + f.totalCoins, 0),
        metasAlcancadas: ativos.reduce((acc, f) => acc + f.totalMetas, 0),
      };

      return {
        departamento: dept,
        todosFuncionarios,
        funcionariosFiltrados,
        estatisticas,
      };
    });
  }, [searchTerm, somenteInativos]);

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

  const toggleDepartamento = (deptId: string) => {
    setDepartamentoExpandido(departamentoExpandido === deptId ? null : deptId);
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="container mx-auto">

        {/* Divisor */}
        <div className="relative m-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-6 py-2 md:py-1 text-lg font-semibold text-gray-700 rounded-md shadow-md text-center">
              Visão Geral de Todos os Departamentos
            </span>
          </div>
        </div>

        {/* Estatísticas Gerais */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Estatísticas Gerais
          </h2>
          <EstatisticasGrid estatisticas={estatisticasGerais} />
        </div>

        {/* Lista de Departamentos com Expansão */}
        <div className="space-y-12">
          {departamentosComFuncionarios.map(
            ({
              departamento,
              todosFuncionarios,
              funcionariosFiltrados,
              estatisticas,
            }) => (
              <div
                key={departamento.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border-2 border-gray-300"
              >
                {/* Header do Departamento - Clicável */}
                <button
                  onClick={() => toggleDepartamento(departamento.id)}
                  className="w-full text-left hover:bg-gray-50/80 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-16 h-16 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: `${departamento.cor}20`,
                          }}
                        >
                          <departamento.icon
                            className="w-8 h-8"
                            style={{ color: departamento.cor }}
                          />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">
                            {departamento.nome}
                          </h2>
                          <p className="text-gray-600">
                            {funcionariosFiltrados.length} de{" "}
                            {todosFuncionarios.length} funcionários
                          </p>
                        </div>
                      </div>
                      <div className="text-2xl text-gray-400">
                        {departamentoExpandido === departamento.id ? (
                          <ChevronDown />
                        ) : (
                          <ChevronRight />
                        )}
                      </div>
                    </div>

                    {/* Mini Estatísticas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="text-center p-3 bg-blue-200/50 rounded-lg">
                        <p className="text-sm text-gray-600">Ativos</p>
                        <p className="text-xl font-bold text-gray-900">
                          {estatisticas.funcionariosAtivos}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-blue-200/50 rounded-lg">
                        <p className="text-sm text-gray-600">Pontos</p>
                        <p className="text-xl font-bold text-gray-900">
                          {estatisticas.pontuacaoTotal.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-blue-200/50 rounded-lg">
                        <p className="text-sm text-gray-600">Coins</p>
                        <p className="text-xl font-bold text-gray-900">
                          {estatisticas.coinsDistribuidas.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-blue-200/50 rounded-lg">
                        <p className="text-sm text-gray-600">Metas</p>
                        <p className="text-xl font-bold text-gray-900">
                          {estatisticas.metasAlcancadas}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Tabela de Funcionários - Expansível */}
                {departamentoExpandido === departamento.id && (
                  <div>
                    <TabelaFuncionarios
                      funcionarios={funcionariosFiltrados}
                      isPending={isPending}
                      onToggleStatus={handleToggleStatus}
                      onAdicionarCoins={handleAdicionarCoins}
                      onResgatarProduto={handleResgatarProduto}
                      onVerHistorico={handleVerHistorico}
                    />
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}