import { LucideIcon } from "lucide-react";

interface DepartamentoHeaderProps {
  nome: string;
  cor: string;
  Icon: LucideIcon;
}

export function DepartamentoHeader({ nome, cor, Icon }: DepartamentoHeaderProps) {
  return (
    <div
      className={`${cor} rounded-xl p-6 md:p-8 text-white shadow-2xl mb-6 md:mb-8 relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 opacity-10">
        <Icon className="w-32 h-32 md:w-48 md:h-48" />
      </div>
      <div className="relative z-10">
        <Icon className="w-12 h-12 md:w-16 md:h-16 mb-3" />
        <h1 className="text-2xl md:text-4xl font-bold">{nome}</h1>
      </div>
    </div>
  );
}
