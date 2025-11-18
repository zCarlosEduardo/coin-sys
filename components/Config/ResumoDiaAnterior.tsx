import React from "react";
import { Calendar } from "lucide-react";
import { StatCard } from "./StatCard";
import { ResumoAnterior } from "@/app/types/configuracao.types";

type ResumoDiaAnteriorProps = {
  resumo: ResumoAnterior;
};

export const ResumoDiaAnterior: React.FC<ResumoDiaAnteriorProps> = ({
  resumo,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center gap-2 mb-4">
      <Calendar className="text-gray-600" />
      <h2 className="text-lg font-bold">Resumo do Dia Anterior</h2>
    </div>

    <div className="text-sm text-gray-600 mb-4">
      {new Date(resumo.data).toLocaleDateString("pt-BR")}
    </div>

    <div className="space-y-3">
      <StatCard
        label="Sorteios Realizados"
        value={resumo.sorteiosRealizados}
        color="bg-indigo-50"
      />
      <StatCard
        label="Coins Distribuídos"
        value={resumo.premiosDistribuidos}
        color="bg-blue-50"
      />
      <StatCard
        label="Funcionários que não resgataram"
        value={resumo.funcionariosParticipantes}
        color="bg-violet-50"
      />
    </div>
  </div>
);