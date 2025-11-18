"use client";

import { useState } from "react";
import { FileSpreadsheet, Download, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";

// Tipos baseados no seu schema
type Status = "ATIVO" | "INATIVO";

type Funcionario = {
  id: number;
  nome: string;
  cpf: string;
  coins: number;
  meta: number;
  pontuacaoTotal: number;
  status: Status;
  departamento: { id: number; nome: string };
  criadoEm: Date;
  atualizadoEm: Date;
};

interface ExcelReportProps {
  funcionarios: Funcionario[];
  departamentoNome: string;
}

// Função para formatar data
function formatarData(data: Date): string {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ExcelReportGenerator({
  funcionarios,
  departamentoNome,
}: ExcelReportProps) {
  const [gerando, setGerando] = useState(false);

  const gerarRelatorioExcel = async () => {
    try {
      setGerando(true);

      // Filtra apenas funcionários ativos
      const funcionariosAtivos = funcionarios.filter(
        (func) => func.status === "ATIVO"
      );

      if (funcionariosAtivos.length === 0) {
        alert("Não há funcionários ativos para gerar o relatório.");
        setGerando(false);
        return;
      }

      // Prepara os dados para o Excel (SEM CPF)
      const dadosRelatorio = funcionariosAtivos.map((func) => ({
        Nome: func.nome,
        Meta: func.meta,
        Coins: func.coins,
        "Pontuação Total": Number(func.pontuacaoTotal.toFixed(2)),
      }));

      // Cria uma nova planilha
      const worksheet = XLSX.utils.json_to_sheet(dadosRelatorio);

      // Define larguras das colunas
      const colWidths = [
        { wch: 35 }, // Nome
        { wch: 10 }, // Meta
        { wch: 10 }, // Coins
        { wch: 15 }, // Pontuação Total
      ];
      worksheet["!cols"] = colWidths;

      // Cria o workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        departamentoNome.substring(0, 31)
      ); // Excel limita nome de aba a 31 chars

      // Adiciona uma segunda aba com resumo
      const totalCoins = funcionariosAtivos.reduce((acc, f) => acc + f.coins, 0);
      const totalMetas = funcionariosAtivos.reduce((acc, f) => acc + f.meta, 0);
      const totalPontuacao = funcionariosAtivos.reduce(
        (acc, f) => acc + f.pontuacaoTotal,
        0
      );

      const resumo = [
        { Métrica: "Departamento", Valor: departamentoNome },
        { Métrica: "Total de Funcionários Ativos", Valor: funcionariosAtivos.length },
        { Métrica: "Total de Coins", Valor: totalCoins },
        { Métrica: "Total de Metas", Valor: totalMetas },
        {
          Métrica: "Total de Pontuação",
          Valor: Number(totalPontuacao.toFixed(2)),
        },
        {
          Métrica: "Média de Coins",
          Valor: Number((totalCoins / funcionariosAtivos.length).toFixed(2)),
        },
        {
          Métrica: "Média de Metas",
          Valor: Number((totalMetas / funcionariosAtivos.length).toFixed(2)),
        },
        {
          Métrica: "Média de Pontuação",
          Valor: Number((totalPontuacao / funcionariosAtivos.length).toFixed(2)),
        },
      ];

      const worksheetResumo = XLSX.utils.json_to_sheet(resumo);
      worksheetResumo["!cols"] = [{ wch: 35 }, { wch: 20 }];
      XLSX.utils.book_append_sheet(workbook, worksheetResumo, "Resumo");

      // Gera o arquivo e faz download
      const dataAtual = new Date()
        .toLocaleDateString("pt-BR")
        .replace(/\//g, "-");
      const nomeArquivo = `Relatorio_${departamentoNome.replace(
        /\s+/g,
        "_"
      )}_${dataAtual}.xlsx`;

      XLSX.writeFile(workbook, nomeArquivo);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert("Erro ao gerar relatório. Tente novamente.");
    } finally {
      setGerando(false);
    }
  };

  const funcionariosAtivos = funcionarios.filter((f) => f.status === "ATIVO");

  return (
    <button
      onClick={gerarRelatorioExcel}
      disabled={gerando || funcionariosAtivos.length === 0}
      className="px-4 py-2 bg-linear-to-br from-lime-400 via-green-500 to-green-600 hover:scale-102 hover:shadow-lg text-white transition-all text-sm font-medium rounded-md shadow-lg md:flex items-center  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hidden"
      title={
        funcionariosAtivos.length === 0
          ? "Não há funcionários ativos"
          : "Gerar relatório Excel"
      }
    > 
      {gerando ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Gerando...
        </>
      ) : (
        <>
          <FileSpreadsheet className="w-5 h-5 mr-2" />
          Gerar Relatório Excel
        </>
      )}
    </button>
  );
}