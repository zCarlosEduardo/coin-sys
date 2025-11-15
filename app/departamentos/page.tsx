import Link from "next/link";
import { departamentos } from "@/lib/departamentos/departamentos";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Departamentos - Coin System",
  description: "Visualize todos os departamentos da empresa",
};

export default function DepartamentosPage() {
  // TODO: Futuramente, filtrar por permissão do usuário logado
  // const userRole = await getUserRole();
  // const departamentosPermitidos = getDepartamentosPermitidos(userRole);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 uppercase">
            Departamentos
          </h1>
          <p className="text-gray-600 text-lg">
            Selecione um departamento para visualizar detalhes e métricas
          </p>
        </header>

        {/* Grid de Departamentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                <div className="p-6">

                  {/* Informações rápidas */}
                  {dept.funcionarios && (
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>Funcionários:</span>
                      <span className="font-semibold text-gray-700">
                        {dept.funcionarios}
                      </span>
                    </div>
                  )}


                  {/* Botão ver mais */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      Ver detalhes
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Aviso de permissões (futuro) */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 text-center">
            💡 <strong>Em breve:</strong> Sistema de permissões por função. 
            Gestores verão apenas seus departamentos, administradores verão tudo.
          </p>
        </div>
      </div>
    </div>
  );
}