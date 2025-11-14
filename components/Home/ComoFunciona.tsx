import { Target, Coins, TrendingUp, Gift } from 'lucide-react';

export default function ComoFunciona() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 rounded-lg mb-8">
      <h2 className="font-bold text-xl mb-4 text-center uppercase ">
        Como Funciona
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50/50 p-6 rounded-lg text-center flex flex-col items-center shadow-xl hover:scale-105 transition-transform hover:shadow-2xl">
          <Target className="w-12 h-12 mb-3 text-blue-500" />
          <h3 className="font-semibold text-lg mb-2">1. Bata Metas</h3>
          <p className="text-sm text-gray-600">
            Bate metas e ganhe coins!
          </p>
        </div>
        <div className="bg-blue-50/50 p-6 rounded-lg text-center flex flex-col items-center shadow-xl hover:scale-105 transition-transform hover:shadow-2xl">
          <Coins className="w-12 h-12 mb-3 text-yellow-500" />
          <h3 className="font-semibold text-lg mb-2">2. Ganhe Coins</h3>
          <p className="text-sm text-gray-600">
            Ao bater suas metas, você recebe coins.
          </p>
        </div>
        <div className="bg-blue-50/50 p-6 rounded-lg text-center flex flex-col items-center shadow-xl hover:scale-105 transition-transform hover:shadow-2xl">
          <TrendingUp className="w-12 h-12 mb-3 text-green-500" />
          <h3 className="font-semibold text-lg mb-2">3. Multiplique em Pontos</h3>
          <p className="text-sm text-gray-600">
            Seus coins são convertidos em pontos através de um multiplicador.
          </p>
        </div>
        <div className="bg-blue-50/50 p-6 rounded-lg text-center flex flex-col items-center shadow-xl hover:scale-105 transition-transform hover:shadow-2xl">
          <Gift className="w-12 h-12 mb-3 text-purple-500" />
          <h3 className="font-semibold text-lg mb-2">4. Resgate Produtos</h3>
          <p className="text-sm text-gray-600">
            Use seus coins acumulados para resgatar produtos na loja de recompensas.
          </p>
        </div>
      </div>
    </div>
  );
}