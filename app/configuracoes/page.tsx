"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Settings, Save } from "lucide-react";
import {
  PremioConfig,
  ResumoAnterior,
  ConfiguracaoSistema,
} from "@/app/types/configuracao.types";
import { ResumoDiaAnterior } from "@/components/Config/ResumoDiaAnterior";
import { InformacoesSistema } from "@/components/Config/InformacoesSistema";
import { UltimaConfiguracao } from "@/components/Config/UltimaConfiguracao";
import { JanelaTroca } from "@/components/Config/JanelaTroca";
import { CoinsEspeciais } from "@/components/Config/CoinsEspeciais";
import { ResumoCalculos } from "@/components/Config/ResumoCalculos";

export default function ConfiguracaoDia() {
  // Estados
  const [funcionariosAtivos] = useState(117);
  const [metaMaxima, setMetaMaxima] = useState(3);
  const [multiplicadorPontos, setMultiplicadorPontos] = useState(3);
  const [premios, setPremios] = useState<PremioConfig[]>([
    { id: "1", nome: "5 Coins", valor: 5, quantidade: 5 },
    { id: "2", nome: "3 Coins", valor: 3, quantidade: 10 },
    { id: "3", nome: "2 Coins", valor: 2, quantidade: 15 },
  ]);
  const [statusAtivo, setStatusAtivo] = useState(false);

  const [resumoAnterior] = useState<ResumoAnterior>({
    data: "2024-11-17",
    sorteiosRealizados: 203,
    premiosDistribuidos: 203,
    especialesDistribuidos: 28,
    funcionariosParticipantes: 89,
  });

  // Cálculos memoizados
  const margemSeguranca = 10;

  const { sorteiosMaximos, totalEspeciais, premios1Coin, poolTotal } =
    useMemo(() => {
      const maxSorteios = funcionariosAtivos * metaMaxima;
      const especiais = premios.reduce((sum, p) => sum + p.quantidade, 0);
      const base = maxSorteios - especiais;
      const comMargem = Math.ceil(base * (1 + margemSeguranca / 100));
      const total = especiais + comMargem;

      return {
        sorteiosMaximos: maxSorteios,
        totalEspeciais: especiais,
        premios1Coin: comMargem,
        poolTotal: total,
      };
    }, [funcionariosAtivos, metaMaxima, premios]);

  // Handlers
  const handleAdicionarPremio = useCallback((premio: PremioConfig) => {
    setPremios((prev) => [...prev, premio]);
  }, []);

  const handleRemoverPremio = useCallback((id: string) => {
    setPremios((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleEditarPremio = useCallback(
    (id: string, campo: keyof PremioConfig, valor: any) => {
      setPremios((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [campo]: valor } : p))
      );
    },
    []
  );

  const handleSalvarConfiguracao = useCallback(() => {
    const config: ConfiguracaoSistema = {
      metaMaxima,
      multiplicadorPontos,
      premiosEspeciais: premios,
      premios1Coin,
      poolTotal,
      sorteiosMaximos,
      data: new Date().toISOString(),
    };
    console.log("Configuração salva:", config);
    // TODO: Implementar chamada à API
    alert("Configuração salva com sucesso!");
  }, [
    metaMaxima,
    multiplicadorPontos,
    premios,
    premios1Coin,
    poolTotal,
    sorteiosMaximos,
  ]);

  const dataFormatada = useMemo(
    () =>
      new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  );

  return (
    <div className="container mx-auto mt-6 mb-22">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 text-gray-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-xl w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-zinc-500 via-neutral-600 to-gray-700 shadow-md flex items-center justify-center text-white">
            <Settings className="w-6 h-6 md:w-10 md:h-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Configuração do Dia
            </h1>
            <p className="text-gray-700 text-sm">{dataFormatada}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna 1: Lateral Esquerda */}
        <div className="lg:col-span-1 space-y-6">
          <ResumoDiaAnterior resumo={resumoAnterior} />

          <UltimaConfiguracao data={resumoAnterior.data} />

          <JanelaTroca
            statusAtivo={statusAtivo}
            onToggle={() => setStatusAtivo((prev) => !prev)}
          />
        </div>

        {/* Coluna 2 e 3: Área Principal */}
        <div className="lg:col-span-2 space-y-6">
          <CoinsEspeciais
            premios={premios}
            onAdd={handleAdicionarPremio}
            onRemove={handleRemoverPremio}
            onEdit={handleEditarPremio}
          />
          
          <InformacoesSistema
            funcionariosAtivos={funcionariosAtivos}
            metaMaxima={metaMaxima}
            multiplicadorPontos={multiplicadorPontos}
            onMetaChange={setMetaMaxima}
            onMultiplicadorChange={setMultiplicadorPontos}
          />

          <ResumoCalculos
            premios1Coin={premios1Coin}
            sorteiosMaximos={sorteiosMaximos}
            totalEspeciais={totalEspeciais}
            poolTotal={poolTotal}
          />

          {/* Botão Salvar */}
          <button
            onClick={handleSalvarConfiguracao}
            className="w-full bg-linear-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg text-lg font-bold flex items-center justify-center gap-3"
          >
            <Save size={24} />
            Salvar Configuração do Dia
          </button>
        </div>
      </div>
    </div>
  );
}
