"use client";

import { ShoppingCart, Coins, DollarSign, Trash2 } from "lucide-react";
import { useState } from "react";

type Produto = {
  id: string;
  categoria?: string;
  nome: string;
  descricao: string;
  valorPontos: number;
  valorEstimadoReal: number;
};

interface ProdutosCardProps {
  produto: Produto;
  onEdit: (produto: Produto) => void;
}

export default function ProdutosCard({ produto, onEdit }: ProdutosCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleInativar = () => {
    setIsDeleting(true);
    console.log("Inativar produto:", produto.id);
    setTimeout(() => setIsDeleting(false), 1000);
  };

  return (
    <div className="flex flex-col h-full relative group">
      {/* Conteúdo do Card */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Categoria */}
        {produto.categoria && (
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mb-3">
            {produto.categoria}
          </span>
        )}

        {/* Nome */}
        <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-2 line-clamp-2 min-h-14 flex items-center">
          {produto.nome}
        </h3>

        {/* Descrição */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-16 flex-1">
          {produto.descricao}
        </p>

        {/* Preços */}
        <div className="space-y-3 mb-5">
          {/* Valor em Pontos - Destaque */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between bg-yellow-100 p-2 rounded-lg">
              <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-600" />
                Pontos
              </span>
              <span className="font-bold text-lg text-yellow-600">
                {produto.valorPontos.toLocaleString("pt-BR")}
              </span>
            </div>
          </div>

          {/* Valor em Reais */}
          <div className="flex items-center justify-between px-2 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-green-600" />
              Valor estimado
            </span>
            <span className="font-semibold text-green-600">
              R${" "}
              {produto.valorEstimadoReal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Botões lado a lado para mobile e desktop */}
      <div className="p-4 sm:p-5 pt-0 mt-auto">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(produto)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">Editar</span>
          </button>

          <button
            onClick={handleInativar}
            disabled={isDeleting}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold py-2.5 px-4 rounded-lg transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed min-w-[100px]"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
