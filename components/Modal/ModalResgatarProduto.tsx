"use client";

import {
  X,
  ShoppingCart,
  Search,
  Package,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Funcionario } from "@/lib/funcionarios/funcionarios";
import { Produto, getProdutosAtivos } from "@/lib/produtos/produtos";

interface ModalResgatarProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  funcionario: Funcionario;
  onSuccess: (funcionarioAtualizado: Funcionario) => void;
}

export default function ModalResgatarProduto({
  isOpen,
  onClose,
  funcionario,
  onSuccess,
}: ModalResgatarProdutoProps) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null
  );
  const [valorCoins, setValorCoins] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const produtosAtivos = getProdutosAtivos();
      setProdutos(produtosAtivos);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (produtoSelecionado) {
      setValorCoins(produtoSelecionado.valorPontos);
    }
  }, [produtoSelecionado]);

  const validate = () => {
    if (!produtoSelecionado) {
      setError("Selecione um produto");
      return false;
    }

    if (valorCoins <= 0) {
      setError("O valor em coins deve ser maior que zero");
      return false;
    }

    if (valorCoins > funcionario.totalCoins) {
      setError("Saldo insuficiente de coins");
      return false;
    }

    if (funcionario.resgatesDisponiveis <= 0) {
      setError("Funcionário não possui resgates disponíveis");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validate() || !produtoSelecionado) return;

    setIsSaving(true);
    // Mock da função resgatarProduto
    function resgatarProduto(
      funcionarioId: string,
      produtoId: string,
      valor: number
    ): Funcionario | null {
      // Simula atualização do funcionário
      if (
        funcionario.totalCoins < valor ||
        funcionario.resgatesDisponiveis <= 0
      ) {
        return null;
      }
      return {
        ...funcionario,
        totalCoins: funcionario.totalCoins - valor,
        resgatesDisponiveis: funcionario.resgatesDisponiveis - 1,
      };
    }
    setTimeout(() => {
      try {
        const funcionarioAtualizado = resgatarProduto(
          funcionario.id,
          produtoSelecionado.id,
          valorCoins
        );

        if (!funcionarioAtualizado) {
          throw new Error("Erro ao resgatar produto");
        }

        onSuccess(funcionarioAtualizado);
        setShowSuccess(true);
        setIsSaving(false);

        setTimeout(() => {
          setShowSuccess(false);
          setProdutoSelecionado(null);
          setValorCoins(0);
          setSearchTerm("");
          setError("");
          onClose();
        }, 2000);
      } catch (err: any) {
        setError(err.message || "Erro ao resgatar produto");
        setIsSaving(false);
      }
    }, 800);
  };

  const handleClose = () => {
    if (!isSaving) {
      setProdutoSelecionado(null);
      setValorCoins(0);
      setSearchTerm("");
      setError("");
      setShowSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const saldoRestante = funcionario.totalCoins - valorCoins;
  const saldoInsuficiente = valorCoins > funcionario.totalCoins;
  const semResgates = funcionario.resgatesDisponiveis <= 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Resgatar Produto</h2>
                <p className="text-green-100 text-sm max-w-xs truncate">
                  {funcionario.nome}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isSaving}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mx-6 mt-6 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
            <div>
              <p className="font-semibold text-green-800">
                Produto resgatado com sucesso!
              </p>
              <p className="text-sm text-green-600">
                {produtoSelecionado?.nome} - {valorCoins} coins
              </p>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Saldo */}
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-linear-to-br from-yellow-50 to-amber-50 rounded-lg p-4 border-2 border-yellow-200">
              <p className="text-sm text-gray-600 mb-1">Saldo Disponível</p>
              <p className="text-2xl font-bold text-yellow-600">
                {funcionario.totalCoins}
              </p>
              <p className="text-xs text-gray-500">coins</p>
            </div>
          </div>

          {semResgates && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-800">
                    Sem Resgates Disponíveis
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    Este funcionário precisa ter resgates disponíveis. Adicione
                    metas primeiro.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Busca */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Search className="w-4 h-4 text-green-500" />
              Buscar Produto
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Digite o nome do produto..."
                disabled={semResgates}
              />
            </div>
          </div>

          {/* Lista de Produtos */}
          {!semResgates && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Produtos Disponíveis ({produtosFiltrados.length})
              </p>
              {produtosFiltrados.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Nenhum produto encontrado</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {produtosFiltrados.map((produto) => (
                    <button
                      key={produto.id}
                      onClick={() => setProdutoSelecionado(produto)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        produtoSelecionado?.id === produto.id
                          ? "border-green-500 bg-green-50 shadow-md"
                          : "border-gray-200 hover:border-green-300 bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900">
                            {produto.nome}
                          </p>
                          {produto.descricao && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {produto.descricao}
                            </p>
                          )}
                          {produto.categoria && (
                            <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                              {produto.categoria}
                            </span>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm text-gray-600">Valor</p>
                          <p className="text-xl font-bold text-green-600">
                            {produto.valorPontos}
                          </p>
                          <p className="text-xs text-gray-500">coins</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Ajuste de Valor */}
          {produtoSelecionado && !semResgates && (
            <>
              <div></div>

              {/* Preview */}
              <div
                className={`rounded-lg p-4 border-2 ${
                  saldoInsuficiente
                    ? "bg-red-50 border-red-200"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex items-start gap-2 mb-3">
                  {saldoInsuficiente ? (
                    <AlertCircle
                      className="text-red-600 shrink-0 mt-1"
                      size={20}
                    />
                  ) : (
                    <ShoppingCart
                      className="text-green-600 shrink-0 mt-1"
                      size={20}
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Resumo do Resgate:
                    </p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Saldo Atual:</span>
                        <span className="font-semibold">
                          {funcionario.totalCoins} coins
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Valor do Resgate:</span>
                        <span className="font-semibold text-red-600">
                          -{valorCoins} coins
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-300">
                        <span className="text-gray-700 font-semibold">
                          Saldo Final:
                        </span>
                        <span
                          className={`font-bold text-lg ${
                            saldoInsuficiente
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {saldoRestante}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {saldoInsuficiente && (
                  <p className="text-xs text-red-700 mt-2">
                    ⚠️ Saldo insuficiente
                  </p>
                )}
              </div>
            </>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 font-semibold">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSaving || showSuccess}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              isSaving ||
              showSuccess ||
              !produtoSelecionado ||
              saldoInsuficiente ||
              semResgates
            }
            className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processando...
              </>
            ) : showSuccess ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Resgatado!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Confirmar Resgate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
