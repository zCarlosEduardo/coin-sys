"use client";

import { Trophy, Medal, Award, ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { getTopFuncionarios } from "@/lib/funcionarios/funcionarios";

export default function TopFuncionarios() {
  // Estado para controlar se a lista está expandida
  const [isExpanded, setIsExpanded] = useState(false);

  // Busca os funcionários da lib
  const funcionarios = getTopFuncionarios(10);

  const { topThree, podiumOrder, restOfEmployees } = useMemo(() => {
    const top = funcionarios.slice(0, 3);
    const podium = [top[1], top[0], top[2]];
    const rest = funcionarios.slice(3, 10);
    
    return {
      topThree: top,
      podiumOrder: podium,
      restOfEmployees: rest
    };
  }, [funcionarios]);

  const podiumConfig = [
    {
      heightClass: "h-12 md:h-48",
      icon: Medal,
      iconColor: "text-gray-400",
      position: "2º",
      bgGradient: "from-gray-500 to-gray-700",
    },
    {
      heightClass: "h-12 md:h-64",
      icon: Trophy,
      iconColor: "text-yellow-500",
      position: "1º",
      bgGradient: "from-yellow-400 to-yellow-500",
    },
    {
      heightClass: "h-12 md:h-40",
      icon: Award,
      iconColor: "text-orange-600",
      position: "3º",
      bgGradient: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto p-6">
      <header className="text-center mb-8">
        <h2 className="font-bold text-2xl uppercase">Top Funcionários</h2>
        <span className="uppercase text-xs text-gray-800">por pontuação</span>
      </header>

      {/* Podium */}
      <div className="flex flex-col md:flex-row justify-center items-end gap-4 mb-8">
        {podiumOrder.map((funcionario, index) => {
          if (!funcionario) return null;

          const config = podiumConfig[index];
          const Icon = config.icon;

          return (
            <article
              key={`${funcionario.id}-${index}`}
              className={`flex flex-col items-center w-full md:w-52 ${
                index === 1
                  ? "order-1"
                  : index === 0
                  ? "order-2"
                  : "order-3"
              } md:order-0`}
            >
              {/* Card do funcionário */}
              <div className="bg-blue-50/50 rounded-lg shadow-lg p-4 mb-2 w-full hover:shadow-xl hover:drop-shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="flex justify-center mb-3">
                  <Icon className={`w-8 h-8 ${config.iconColor}`} aria-hidden="true" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-1 truncate">
                    {funcionario.nome}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 truncate">
                    {funcionario.departamentoNome}
                  </p>
                  <dl className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Pontuação:</dt>
                      <dd className="font-semibold">
                        {funcionario.totalPontos.toLocaleString('pt-BR')}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Coins:</dt>
                      <dd className="font-semibold">
                        {funcionario.totalCoins.toLocaleString('pt-BR')}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Metas:</dt>
                      <dd className="font-semibold">
                        {funcionario.totalMetas.toLocaleString('pt-BR')}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Pedestal */}
              <div
                className={`w-full ${config.heightClass} bg-gradient-to-b ${config.bgGradient} rounded-t-lg flex items-center justify-center shadow-md`}
                aria-label={`Posição ${config.position}`}
              >
                <span className="text-3xl font-bold text-white drop-shadow-lg">
                  {config.position}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Lista dos demais funcionários - EXPANSÍVEL */}
      {restOfEmployees.length > 0 && (
        <div className="mt-8">
          {/* Botão para expandir/recolher */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between font-semibold text-lg mb-4 p-4 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg hover:from-blue-100 hover:to-gray-100 transition-colors shadow-sm"
          >
            <span>Outros Funcionários</span>
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </button>

          {/* Lista expansível com animação */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="space-y-0 overflow-hidden rounded-lg shadow">
              {restOfEmployees.map((funcionario, index) => (
                <li
                  key={`${funcionario.id}-${index}`}
                  className={`p-4 flex items-center justify-between transition-colors hover:bg-blue-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-500 w-8">
                      {index + 4}º
                    </span>
                    <div>
                      <div className="font-semibold">{funcionario.nome}</div>
                      <div className="text-sm text-gray-600">
                        {funcionario.departamentoNome}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="text-gray-600">Pontos: </span>
                      <span className="font-semibold">
                        {funcionario.totalPontos.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Coins: </span>
                      <span className="font-semibold">
                        {funcionario.totalCoins.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}