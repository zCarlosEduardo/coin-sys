import React from "react";
import { CheckCircle, Coins } from "lucide-react";
import { StatCard } from "./StatCard";

type ResumoCalculosProps = {
  premios1Coin: number;
  sorteiosMaximos: number;
  totalEspeciais: number;
  poolTotal: number;
};

export const ResumoCalculos: React.FC<ResumoCalculosProps> = ({
  premios1Coin,
  sorteiosMaximos,
  totalEspeciais,
  poolTotal,
}) => (
  <div className="bg-stone-50 rounded-lg shadow-lg p-6">
    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-stone-800">
      <CheckCircle className="text-stone-600" />
      Cálculo dos Coins do Dia
    </h2>

    <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <Coins className="text-blue-600" size={28} />
        <div>
          <p className="text-sm text-gray-600">Coins de 1 Coin</p>
          <p className="text-3xl font-bold text-blue-700">
            {premios1Coin} unidades
          </p>
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-3 text-xs text-gray-700">
        <p className="font-semibold mb-2">Cálculo Automático:</p>
        <p>• Sorteios máximos: {sorteiosMaximos}</p>
        <p>• Especiais: -{totalEspeciais}</p>
        <p>• Base: {sorteiosMaximos - totalEspeciais}</p>
        <p>
          • Margem de segurança (10%): +
          {premios1Coin - (sorteiosMaximos - totalEspeciais)}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        label="Total"
        value={poolTotal}
        color="bg-white"
        sublabel="prêmios"
      />
      <StatCard
        label="Sorteios Máximos"
        value={sorteiosMaximos}
        color="bg-white"
        sublabel="possíveis"
      />
      <StatCard
        label="Margem de Sobra"
        value={poolTotal - sorteiosMaximos}
        color="bg-white"
        sublabel="prêmios"
      />
      <StatCard
        label="Especiais"
        value={totalEspeciais}
        color="bg-white"
        sublabel="configurados"
      />
    </div>
  </div>
);