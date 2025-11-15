import { Target, Coins, TrendingUp, Gift } from 'lucide-react';

export default function ComoFunciona() {
  const steps = [
    {
      icon: Target,
      title: "1. Bata Metas",
      description: "Complete suas metas e ganhe coins como recompensa!",
      color: "text-blue-500"
    },
    {
      icon: Coins,
      title: "2. Ganhe Coins",
      description: "Ao bater suas metas, você recebe coins automaticamente.",
      color: "text-yellow-500"
    },
    {
      icon: TrendingUp,
      title: "3. Acumule Pontos",
      description: "Seus coins são convertidos em pontos através de um multiplicador.",
      color: "text-green-500"
    },
    {
      icon: Gift,
      title: "4. Resgate Produtos",
      description: "Use seus pontos acumulados para resgatar produtos incríveis na loja.",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto p-6 rounded-lg mb-8">
      <h2 className="font-bold text-xl mb-4 text-center uppercase">
        Como Funciona
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article
              key={index}
              className="bg-blue-50/50 p-6 rounded-lg text-center flex flex-col items-center shadow-xl hover:scale-105 transition-transform hover:shadow-2xl"
            >
              <Icon className={`w-12 h-12 mb-3 ${step.color}`} aria-hidden="true" />
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}