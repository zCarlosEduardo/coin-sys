"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { getDepartamentoBySlug } from "@/lib/departamentos/departamentos";
import { funcionarios, type Funcionario } from "@/lib/funcionarios/funcionarios";

// Componentes separados
import { DepartamentoHeader } from "@/components/departamentos/DepartamentoHeader";
import { EstatisticasGrid } from "@/components/departamentos/EstatisticasGrid";
import { FiltrosTabela } from "@/components/departamentos/FiltrosTabela";
import { TabelaFuncionarios } from "@/components/departamentos/TabelaFuncionarios";

type Props = {
  slug: string;
};

export default function DepartamentoPageClient({ slug }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [somenteInativos, setSomenteInativos] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // (Opcional) debug rápido
  useEffect(() => {
    console.log("DepartamentoPageClient slug:", slug);
  }, [slug]);

  const departamento = getDepartamentoBySlug(slug);

  const todosFuncionarios = useMemo(() => {
    if (!departamento) return [];
    return funcionarios.filter((f) => f.departamentoId === departamento.id);
  }, [departamento]);

  const estatisticas = useMemo(() => {
    const ativos = todosFuncionarios.filter((f) => f.ativo);
    return {
      funcionariosAtivos: ativos.length,
      pontuacaoTotal: ativos.reduce((acc, f) => acc + f.totalPontos, 0),
      coinsDistribuidas: ativos.reduce((acc, f) => acc + f.totalCoins, 0),
      metasAlcancadas: ativos.reduce((acc, f) => acc + f.totalMetas, 0),
    };
  }, [todosFuncionarios]);

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

  // Se slug inválido (deveria cair no notFound do server, mas fica como fallback)
  if (!departamento) {
    return (
      <div className="min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Departamento não encontrado
          </h1>
          <p className="text-gray-600 mb-4">
            Slug buscado:{" "}
            <code className="bg-gray-200 px-2 py-1 rounded">{slug}</code>
          </p>
          <Link
            href="/Departamentos"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Voltar para Departamentos
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen p-4 md:p-6">
      <div className="container mx-auto">
        <Link
          href="/Departamentos"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para Departamentos
        </Link>

        <DepartamentoHeader
          nome={departamento.nome}
          cor={departamento.cor}
          Icon={departamento.icon}
        />

        <EstatisticasGrid estatisticas={estatisticas} />

        <div className="rounded-xl overflow-hidden">
          <FiltrosTabela
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            somenteInativos={somenteInativos}
            setSomenteInativos={setSomenteInativos}
            totalFiltrados={funcionariosFiltrados.length}
            totalGeral={todosFuncionarios.length}
          />

          <TabelaFuncionarios
            funcionarios={funcionariosFiltrados}
            isPending={isPending}
            onToggleStatus={handleToggleStatus}
            onAdicionarCoins={handleAdicionarCoins}
            onResgatarProduto={handleResgatarProduto}
            onVerHistorico={handleVerHistorico}
          />
        </div>
      </div>
    </div>
  );
}