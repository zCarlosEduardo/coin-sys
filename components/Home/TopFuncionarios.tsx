import { Trophy, Medal, Award } from "lucide-react";

export default function TopFuncionarios() {
  const funcionarios = [
    {
      nome: "João Silva",
      Pontuacao: 1500,
      Coins: 300,
      Meta: 500,
      departamento: "Financeiro",
    },
    {
      nome: "Maria Oliveira",
      Pontuacao: 125500,
      Coins: 250,
      Meta: 450,
      departamento: "Recursos Humanos",
    },
    {
      nome: "Carlos Souza",
      Pontuacao: 1800,
      Coins: 200,
      Meta: 400,
      departamento: "Jurídico",
    },
    {
      nome: "Ana Costa",
      Pontuacao: 1100,
      Coins: 200,
      Meta: 400,
      departamento: "Cadastro",
    },
    {
      nome: "Pedro Lima",
      Pontuacao: 900,
      Coins: 150,
      Meta: 300,
      departamento: "Assistência 24h",
    },
    {
      nome: "Luiza Fernandes",
      Pontuacao: 23800,
      Coins: 100,
      Meta: 250,
      departamento: "Sistemas",
    },
    {
      nome: "Rafael Gomes",
      Pontuacao: 800,
      Coins: 120,
      Meta: 280,
      departamento: "Marketing",
    },
    {
      nome: "Beatriz Ramos",
      Pontuacao: 950,
      Coins: 130,
      Meta: 290,
      departamento: "Vendas",
    },
    {
      nome: "Felipe Alves",
      Pontuacao: 700,
      Coins: 110,
      Meta: 270,
      departamento: "Suporte Técnico",
    },
    {
      nome: "Camila Pinto",
      Pontuacao: 1050,
      Coins: 220,
      Meta: 350,
      departamento: "Logística",
    },
  ];

  const topThree = funcionarios
    .sort((a, b) => b.Pontuacao - a.Pontuacao)
    .slice(0, 3);

  // Reorder: 2nd, 1st, 3rd
  const podiumOrder = [topThree[1], topThree[0], topThree[2]];

  const podiumConfig = [
    {
      // 2nd place
      heightClass: "h-12 md:h-48",
      icon: Medal,
      iconColor: "text-gray-400",
      position: "2º",
      bgGradient: "from-gray-500 to-gray-700",
    },
    {
      // 1st place
      heightClass: "h-12 md:h-64",
      icon: Trophy,
      iconColor: "text-yellow-500",
      position: "1º",
      bgGradient: "from-yellow-400 to-yellow-500",
    },
    {
      // 3rd place
      heightClass: "h-12 md:h-40",
      icon: Award,
      iconColor: "text-orange-600",
      position: "3º",
      bgGradient: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="font-bold text-2xl uppercase">Top Funcionários</h2>
        <span className="uppercase text-xs text-gray-800">
          por pontuação
        </span>
      </div>

      {/* Podium */}
      <div className="flex flex-col md:flex-row justify-center items-end gap-4 mb-8">
        {podiumOrder.map((funcionario, index) => {
          if (!funcionario) return null;

          const config = podiumConfig[index];
          const Icon = config.icon;

            return (
            <div
              key={`${funcionario.nome}-${index}`}
              className={`flex flex-col items-center w-full md:w-52 ${
              // Para mobile, coloca o top 1 (index === 1) em primeiro usando order-1, os outros order-2/3
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
                <Icon className={`w-8 h-8 ${config.iconColor}`} />
              </div>
              <div className="text-center">
                <div className="font-bold text-lg mb-1 truncate">
                {funcionario.nome}
                </div>
                <div className="text-sm text-gray-600 mb-3 truncate">
                {funcionario.departamento}
                </div>
                <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                  Pontuação:
                  </span>
                  <span className="font-semibold">
                  {funcionario.Pontuacao.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                  Coins:
                  </span>
                  <span className="font-semibold">
                  {funcionario.Coins.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                  Meta:
                  </span>
                  <span className="font-semibold">
                  {funcionario.Meta.toLocaleString('pt-BR')}
                  </span>
                </div>
                </div>
              </div>
              </div>

              {/* Pedestal */}
              <div
              className={`w-full ${config.heightClass} bg-linear-to-b ${config.bgGradient} rounded-t-lg flex items-center justify-center shadow-md`}
              >
              <span className="text-3xl font-bold text-white drop-shadow-lg">
                {config.position}
              </span>
              </div>
            </div>
            );
        })}
      </div>

      {/* Lista dos demais funcionários */}
      {funcionarios.length > 3 && (
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-4">Outros Funcionários</h3>
          <div className="space-y-0 overflow-hidden rounded-lg shadow">
            {funcionarios
              .sort((a, b) => b.Pontuacao - a.Pontuacao)
              .slice(3, 10)
              .map((funcionario, index) => (
                <div
                  key={`${funcionario.nome}-${index}`}
                  className={`p-4 flex items-center justify-between transition-colors hover:bg-blue-50 ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-500 w-8">
                      {index + 4}º
                    </span>
                    <div>
                      <div className="font-semibold">{funcionario.nome}</div>
                      <div className="text-sm text-gray-600">
                        {funcionario.departamento}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <span className="text-gray-600">
                        Pontos:{" "}
                      </span>
                      <span className="font-semibold">
                        {funcionario.Pontuacao.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">
                        Coins:{" "}
                      </span>
                      <span className="font-semibold">
                        {funcionario.Coins.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}