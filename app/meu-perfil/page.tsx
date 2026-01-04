"use client";

import React, { useState, useEffect } from "react";
import { User, Coins, Trophy, Target, Gift, Sparkles } from "lucide-react";
import RoletaSimples from "@/components/MeuPerfil/RoletaSimples";
import ModalResgatarProduto from "@/components/Modal/ModalResgatarProduto";
import { Funcionario } from "@/lib/funcionarios/funcionarios";

// ==================== COMPONENT: MeuPerfil ====================
export default function MeuPerfil() {
  const [perfil, setPerfil] = useState<Funcionario | null>(null);
  const [mostrarRoleta, setMostrarRoleta] = useState(false);
  const [modalResgatarOpen, setModalResgatarOpen] = useState(false);

  // Simulando dados do usuário (depois virá do banco)
  useEffect(() => {
    const data: Funcionario = {
      id: "1",
      nome: "João Silva",
      cpf: "123.456.789-00",
      departamentoId: "7",
      departamentoNome: "Financeiro",
      grupo: "Analista",
      totalCoins: 300,
      totalPontos: 1500,
      totalMetas: 12,
      resgatesDisponiveis: 5,
      ativo: true,
    };
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPerfil(data);
  }, []);

  const handlePremio = (premio: { valor: number }) => {
    setPerfil((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        totalCoins: prev.totalCoins + premio.valor,
        resgatesDisponiveis: prev.resgatesDisponiveis - 1,
      };
    });
  };

  const handleSuccessResgate = (funcionarioAtualizado: Funcionario) => {
    setPerfil(funcionarioAtualizado);
  };

  if (!perfil)
    return (
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto mt-6 mb-22">
      <section className="container flex flex-col bg-white justify-center p-4 rounded-lg shadow-md m-4 mx-auto">
        {/* Header do Perfil */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-300">
          <div className="rounded-xl w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 shadow-md flex items-center justify-center text-white">
            <User size={32} />
          </div>
          <div>
            <h1 className="font-bold text-2xl">{perfil.nome}</h1>
            <span className="text-sm text-gray-600">
              {perfil.departamentoNome} • {perfil.grupo}
            </span>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-linear-to-br from-yellow-400 to-orange-600 rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
            <div className="bg-white/20 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <p className="text-white/90 text-xs md:text-sm mb-1">
              Total de Pontos
            </p>
            <p className="text-2xl md:text-3xl font-bold text-white">
              {perfil.totalPontos}
            </p>
          </div>

          <div className="bg-linear-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
            <div className="bg-white/20 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3">
              <Coins className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <p className="text-white/90 text-xs md:text-sm mb-1">
              Total de Coins
            </p>
            <p className="text-2xl md:text-3xl font-bold text-white">
              {perfil.totalCoins}
            </p>
          </div>

          <div className="bg-linear-to-br from-green-400 to-green-600 rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
            <div className="bg-white/20 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3">
              <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <p className="text-white/90 text-xs md:text-sm mb-1">
              Metas Concluídas
            </p>
            <p className="text-2xl md:text-3xl font-bold text-white">
              {perfil.totalMetas}
            </p>
          </div>

          <div className="bg-linear-to-br from-indigo-600 to-indigo-800 rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow">
            <div className="bg-white/20 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3">
              <Gift className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <p className="text-white/90 text-xs md:text-sm mb-1">
              Resgates Disponíveis
            </p>
            <p className="text-2xl md:text-3xl font-bold text-white">
              {perfil.resgatesDisponiveis}
            </p>
          </div>
        </div>

        {/* Seção de Resgate */}
        <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200 flex flex-col justify-center items-center gap-4">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-blue-600" size={28} />
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Resgatar Prêmios
              </h2>
              <p className="text-sm text-gray-600">
                Você tem {perfil.resgatesDisponiveis} resgates disponíveis
              </p>
            </div>
          </div>

          <button
            onClick={() => setMostrarRoleta(true)}
            disabled={perfil.resgatesDisponiveis <= 0}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors flex items-center gap-2"
          >
            <Gift size={20} />
            {perfil.resgatesDisponiveis > 0
              ? "Girar Roleta de Prêmios"
              : "Sem Resgates Disponíveis"}
          </button>
        </div>
      </section>

      {mostrarRoleta && (
        <RoletaSimples
          onClose={() => setMostrarRoleta(false)}
          onPremio={handlePremio}
          resgatesDisponiveis={perfil.resgatesDisponiveis}
        />
      )}

      <section>
        <div className="container mx-auto mt-6">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col justify-between md:flex-row items-center gap-4">
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Meus Prêmios e Resgates
                </h2>
                <span className="text-gray-600">
                  Acompanhe os produtos que você já conquistou e resgate novas
                  recompensas para celebrar suas conquistas!
                </span>
              </div>
              <button
                onClick={() => setModalResgatarOpen(true)}
                className="px-6 py-3 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-semibold"
                disabled={!perfil.ativo}
                title="Resgatar produto"
              >
                <Gift className="w-5 h-5" />
                Resgatar Produto
              </button>
            </div>
            {/* Mock de produtos resgatados */}
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">
                Histórico de Produtos Resgatados
              </h3>
              <ul className="divide-y divide-gray-200">
                {[
                  {
                    id: 1,
                    produtoNome: "Fone de Ouvido Bluetooth",
                    dataSolicitacao: "2024-05-10",
                    status: "Solicitado",
                  },
                  {
                    id: 2,
                    produtoNome: "Vale Presente R$50",
                    dataSolicitacao: "2024-04-22",
                    status: "Entregue",
                  },
                  {
                    id: 3,
                    produtoNome: "Caneca Personalizada",
                    dataSolicitacao: "2024-03-15",
                    status: "Entregue",
                  },
                ].map((produto) => (
                  <li
                    key={produto.id}
                    className="py-3 flex justify-between items-center"
                  >
                    <div>
                      <span className="">#{produto.id}</span>
                      <span className="font-medium mx-1.5">{produto.produtoNome}</span>
                      <span className="ml-12 text-gray-500 text-sm">
                        ({produto.dataSolicitacao})
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        produto.status === "Entregue"
                          ? "bg-green-100 text-green-700"
                          : produto.status === "Solicitado"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {produto.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto mt-6 mb-22">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Dúvidas sobre o sistema ARX Coins?
            </h2>
            <p className="text-gray-600">
              Entre em contato com o RH ou seu gestor para mais informações.
            </p>
          </div>
        </div>
      </section>

      {/* Modal de Resgatar Produto */}
      <ModalResgatarProduto
        isOpen={modalResgatarOpen}
        onClose={() => setModalResgatarOpen(false)}
        funcionario={perfil}
        onSuccess={handleSuccessResgate}
      />
    </div>
  );
}
