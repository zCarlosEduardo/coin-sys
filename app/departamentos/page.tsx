import Link from "next/link";
import { departamentos } from "@/lib/departamentos/departamentos";
import { ArrowRight } from "lucide-react";
import DepartamentoPageGeral from "@/components/Departamento/DepartamentoPageGeral";

export const metadata = {
  title: "Departamentos - Coin System",
  description: "Visualize todos os departamentos da empresa",
};

export default function DepartamentosPage() {
  // TODO: Futuramente, filtrar por permissão do usuário logado
  // const userRole = await getUserRole();
  // const departamentosPermitidos = getDepartamentosPermitidos(userRole);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center my-12">
          <h1 className="text-4xl sm: font-bold text-gray-800 mb-4 uppercase">
            Departamentos
          </h1>
          <p className="text-gray-600 text-lg sm:text-sm">
            Selecione um departamento ou visualize a visão geral abaixo
          </p>
        </header>

        {/* Grid de Departamentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 container mx-auto p-4">
          {departamentos.map((dept) => {
            const Icon = dept.icon;
            
            return (
              <Link
                key={dept.id}
                href={`/departamentos/${dept.slug}`}
                className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                {/* Header colorido */}
                <div className={`${dept.cor} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 opacity-10">
                    <Icon className="w-32 h-32" />
                  </div>
                  <Icon className="w-12 h-12 mb-3 relative z-10" />
                  <h3 className="text-xl font-bold relative z-10">
                    {dept.nome}
                  </h3>
                </div>

                {/* Conteúdo */}

              </Link>
            );
          })}
        </div>
      </div>
      <DepartamentoPageGeral></DepartamentoPageGeral>
    </div>
  );
}