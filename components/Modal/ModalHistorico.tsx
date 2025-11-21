"use client";

import { X, History, TrendingUp, TrendingDown, Calendar, User, Package, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Funcionario } from "@/lib/funcionarios/funcionarios";
import { 
  Historico, 
  getHistoricoByFuncionario, 
  formatarTipoTransacao,
  getCorTipo,
  getEstatisticasFuncionario
} from "@/lib/funcionarios/historico";

interface ModalHistoricoProps {
  isOpen: boolean;
  onClose: () => void;
  funcionario: Funcionario;
}

export default function ModalHistorico({
  isOpen,
  onClose,
  funcionario,
}: ModalHistoricoProps) {
  const [historico, setHistorico] = useState<Historico[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const hist = getHistoricoByFuncionario(funcionario.id);
      setHistorico(hist);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, funcionario.id]);

  const handleClose = () => {
    setFiltroTipo("todos");
    onClose();
  };

  if (!isOpen) return null;

  const historicoFiltrado = filtroTipo === "todos" 
    ? historico 
    : historico.filter(h => h.tipo === filtroTipo);

  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <History className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Histórico de Transações</h2>
                <p className="text-blue-100 text-sm max-w-xs truncate">{funcionario.nome}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/20 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">


          {/* Filtros */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filtrar por tipo
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFiltroTipo("todos")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filtroTipo === "todos"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Todos ({historico.length})
              </button>
              <button
                onClick={() => setFiltroTipo("meta_adicionada")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filtroTipo === "meta_adicionada"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Metas
              </button>
              <button
                onClick={() => setFiltroTipo("resgate_produto")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filtroTipo === "resgate_produto"
                    ? "bg-amber-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Resgates
              </button>
              <button
                onClick={() => setFiltroTipo("ajuste_manual")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filtroTipo === "ajuste_manual"
                    ? "bg-purple-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Ajustes
              </button>
            </div>
          </div>

          {/* Lista de Histórico */}
          {historicoFiltrado.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <History size={48} className="mx-auto mb-3 opacity-50" />
              <p className="font-semibold">Nenhum registro encontrado</p>
              <p className="text-sm">Este funcionário ainda não possui histórico de transações</p>
            </div>
          ) : (
            <div className="space-y-3">
              {historicoFiltrado.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Header da transação */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCorTipo(item.tipo)}`}>
                          {formatarTipoTransacao(item.tipo)}
                        </span>
                        {item.valorTransacao > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                      </div>

                      {/* Descrição */}
                      <p className="font-semibold text-gray-900 mb-1">{item.descricao}</p>
                      
                      {/* Produto se houver */}
                      {item.produtoNome && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Package className="w-4 h-4" />
                          <span>{item.produtoNome}</span>
                        </div>
                      )}

                      {/* Observação */}
                      {item.observacao && (
                        <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded mt-2">
                          <FileText className="w-4 h-4 shrink-0 mt-0.5" />
                          <span className="italic">{item.observacao}</span>
                        </div>
                      )}

                      {/* Detalhes da transação */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-xs">
                        <div>
                          <p className="text-gray-500">Coins</p>
                          <p className="font-semibold">
                            {item.coinsAntes} → {item.coinsDepois}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Pontos</p>
                          <p className="font-semibold">
                            {item.pontosAntes.toFixed(0)} → {item.pontosDepois.toFixed(0)}
                          </p>
                        </div>
                        {item.metasAntes !== undefined && (
                          <div>
                            <p className="text-gray-500">Metas</p>
                            <p className="font-semibold">
                              {item.metasAntes} → {item.metasDepois}
                            </p>
                          </div>
                        )}
                        {item.resgatesAntes !== undefined && (
                          <div>
                            <p className="text-gray-500">Resgates</p>
                            <p className="font-semibold">
                              {item.resgatesAntes} → {item.resgatesDepois}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Rodapé */}
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatarData(item.criadoEm)}</span>
                        </div>
                        {item.criadoPor && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{item.criadoPor}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Valor da transação */}
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-500 mb-1">Valor</p>
                      <p className={`text-2xl font-bold ${
                        item.valorTransacao > 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {item.valorTransacao > 0 ? "+" : ""}{item.valorTransacao}
                      </p>
                      <p className="text-xs text-gray-500">coins</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}