"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { getDepartamentoBySlug } from "@/lib/departamentos/departamentos";
import { funcionarios, type Funcionario } from "@/lib/funcionarios/funcionarios";

// Componentes separados
import { DepartamentoHeader } from "@/components/departamento/DepartamentoHeader";
import { EstatisticasGrid } from "@/components/departamento/EstatisticasGrid";
import { FiltrosTabela } from "@/components/departamento/FiltrosTabela";
import { TabelaFuncionarios } from "@/components/departamento/TabelaFuncionarios";
import { CardsFuncionariosMobile } from "@/components/departamento/CardsFuncionariosMobile";

interface Props {
  slug: string;
}

export default function DepartamentoPageClient({ slug }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [somenteInativos, setSomenteInativos] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // 🔍 DEBUG - Adicione isso temporariamente
  useEffect(() => {
    console.log("=== DEBUG DEPARTAMENTO ===");
    console.log("Slug recebido no Client:", slug);
    console.log("Tipo do slug:", typeof slug);
    console.log("Slug é string?", typeof slug === "string");
    
    const dept = getDepartamentoBySlug(slug);
    console.log("Departamento encontrado:", dept);
    console.log("========================");
  }, [slug]);

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
          <p className="text-gray-600 mb-4">
            Slug buscado: <code className="bg-gray-200 px-2 py-1 rounded">{slug}</code>
          </p>
          <Link
            href="/departamentos"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Voltar para Departamentos
          </Link>
        </div>
      </div>
    );
  }

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
        <DepartamentoHeader
          nome={departamento.nome}
          cor={departamento.cor}
          Icon={departamento.icon}
        />

        {/* Estatísticas em Grid */}
        <EstatisticasGrid estatisticas={estatisticas} />

        {/* Tabela de Funcionários */}
        <div className="rounded-xl overflow-hidden">
          {/* Filtros */}
          <FiltrosTabela
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            somenteInativos={somenteInativos}
            setSomenteInativos={setSomenteInativos}
            totalFiltrados={funcionariosFiltrados.length}
            totalGeral={todosFuncionarios.length}
          />

          {/* Tabela Desktop */}
          <TabelaFuncionarios
            funcionarios={funcionariosFiltrados}
            isPending={isPending}
            onToggleStatus={handleToggleStatus}
            onAdicionarCoins={handleAdicionarCoins}
            onResgatarProduto={handleResgatarProduto}
            onVerHistorico={handleVerHistorico}
          />

          {/* Cards Mobile */}
          <CardsFuncionariosMobile
            funcionarios={funcionariosFiltrados}
            isPending={isPending}
            onToggleStatus={handleToggleStatus}
            onAdicionarCoins={handleAdicionarCoins}
            onResgatarProduto={handleResgatarProduto}
            onVerHistorico={handleVerHistorico}
          />

          {/* Mensagem quando não há resultados */}
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