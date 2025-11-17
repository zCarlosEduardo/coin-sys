import { sortearDoPool } from "@/lib/premios/premios";
import { Coins } from "lucide-react";
import { useState } from "react";

type RoletaSimplesProps = {
  onClose: () => void;
  onPremio: (premio: { id: string; nome: string; valor: number }) => void;
  resgatesDisponiveis: number;
};

function RoletaSimples({
  onClose,
  onPremio,
  resgatesDisponiveis,
}: RoletaSimplesProps) {
  const [sorteando, setSorteando] = useState(false);
  const [premioSorteado, setPremioSorteado] = useState<{
    id: string;
    nome: string;
    valor: number;
  } | null>(null);
  const [indexAtual, setIndexAtual] = useState(0);
  
  // Prêmios para exibir na roleta (baseado na configuração)
  const premiosVisuais = [
    { nome: "Coin 1", valor: 1 },
    { nome: "Coin 2", valor: 2 },
    { nome: "Coin 3", valor: 3 },
    { nome: "Coin 5", valor: 5 },
  ];

  const sortear = () => {
    if (sorteando || resgatesDisponiveis <= 0) return;

    setSorteando(true);
    setPremioSorteado(null);

    // Sorteia o prêmio REAL do pool
    const premioReal = sortearDoPool();

    let contador = 0;
    const intervalo = setInterval(() => {
      setIndexAtual((prev: number) => (prev + 1) % premiosVisuais.length);
      contador++;

      // Após 20 iterações, para e mostra o prêmio REAL
      if (contador >= 20) {
        clearInterval(intervalo);
        setPremioSorteado(premioReal);
        setSorteando(false);
        onPremio(premioReal);
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Roleta de Coins</h2>
          <button
            onClick={onClose}
            disabled={sorteando}
            className="text-gray-500 hover:text-red-700 bg-red-200 px-3 py-1.5 rounded-lg hover:bg-red-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✕
          </button>
        </div>

        {/* Display da Roleta */}
        <div className="bg-linear-to-br from-blue-100 to-green-100 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {premiosVisuais.map((premio, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg text-center transition-all ${
                  indexAtual === idx && sorteando
                    ? "bg-blue-600 text-white scale-110 shadow-lg"
                    : "bg-white text-gray-700"
                }`}
              >
                <Coins className="w-6 h-6 mx-auto mb-2" />
                <p className="font-bold">{premio.valor}</p>
                <p className="text-xs">Coins</p>
              </div>
            ))}
          </div>

          {premioSorteado && (
            <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 text-center">
              <p className="text-lg font-bold text-blue-800 mb-2">
                🎉 Parabéns!
              </p>
              <p className="text-3xl font-bold text-blue-600">
                +{premioSorteado.valor} Coins
              </p>
            </div>
          )}
        </div>

        {/* Botão de Sortear */}
        <button
          onClick={sortear}
          disabled={sorteando || resgatesDisponiveis <= 0}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:bg-indigo-800 disabled:cursor-not-allowed font-semibold transition-colors"
        >
          {sorteando
            ? "🎲 Sorteando..."
            : premioSorteado
            ? "🎲 Sortear Novamente"
            : "🎲 Sortear Prêmio"}
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Resgates disponíveis:{" "}
          <span className="font-bold text-blue-600">{resgatesDisponiveis}</span>
        </p>
      </div>
    </div>
  );
}
export default RoletaSimples;