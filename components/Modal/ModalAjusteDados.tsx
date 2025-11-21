"use client";

import { X, Edit, Save, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Funcionario } from "@/lib/funcionarios/funcionarios";

interface ModalAjusteDadosProps {
  isOpen: boolean;
  onClose: () => void;
  funcionario: Funcionario;
  onSuccess: (funcionarioAtualizado: Funcionario) => void;
}

export default function ModalAjusteDados({
  isOpen,
  onClose,
  funcionario,
  onSuccess,
}: ModalAjusteDadosProps) {
  const [dados, setDados] = useState({
    totalMetas: funcionario.totalMetas,
    totalCoins: funcionario.totalCoins,
    totalPontos: funcionario.totalPontos,
    resgatesDisponiveis: funcionario.resgatesDisponiveis,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setDados({
        totalMetas: funcionario.totalMetas,
        totalCoins: funcionario.totalCoins,
        totalPontos: funcionario.totalPontos,
        resgatesDisponiveis: funcionario.resgatesDisponiveis,
      });
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, funcionario]);

  const validate = () => {
    if (dados.totalMetas < 0) {
      setError("Total de metas não pode ser negativo");
      return false;
    }

    if (dados.totalCoins < 0) {
      setError("Total de coins não pode ser negativo");
      return false;
    }

    if (dados.totalPontos < 0) {
      setError("Total de pontos não pode ser negativo");
      return false;
    }

    if (dados.resgatesDisponiveis < 0) {
      setError("Resgates disponíveis não pode ser negativo");
      return false;
    }

    return true;
  };

  const atualizarFuncionario = (
    id: string,
    novosDados: typeof dados
  ): Funcionario => {
    return {
      ...funcionario,
      ...novosDados,
    };
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setIsSaving(true);

    setTimeout(() => {
      try {
        const funcionarioAtualizado = atualizarFuncionario(
          funcionario.id,
          dados
        );

        if (!funcionarioAtualizado) {
          throw new Error("Erro ao atualizar dados");
        }

        onSuccess(funcionarioAtualizado);
        setShowSuccess(true);
        setIsSaving(false);

        setTimeout(() => {
          setShowSuccess(false);
          setError("");
          onClose();
        }, 1500);
      } catch (err: any) {
        setError(err.message || "Erro ao atualizar dados");
        setIsSaving(false);
      }
    }, 800);
  };

  const handleClose = () => {
    if (!isSaving) {
      setDados({
        totalMetas: funcionario.totalMetas,
        totalCoins: funcionario.totalCoins,
        totalPontos: funcionario.totalPontos,
        resgatesDisponiveis: funcionario.resgatesDisponiveis,
      });
      setError("");
      setShowSuccess(false);
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSaving) handleClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, isSaving]);

  const handleChange = (campo: keyof typeof dados, valor: number) => {
    setDados((prev) => ({ ...prev, [campo]: Math.max(0, valor) }));
    if (error) setError("");
  };

  if (!isOpen) return null;

  const houveAlteracao =
    dados.totalMetas !== funcionario.totalMetas ||
    dados.totalCoins !== funcionario.totalCoins ||
    dados.totalPontos !== funcionario.totalPontos ||
    dados.resgatesDisponiveis !== funcionario.resgatesDisponiveis;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-zinc-700 to-neutral-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Edit className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Ajuste de Dados</h2>
                <p className="text-purple-100 text-sm max-w-xs truncate">
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
                Dados atualizados com sucesso!
              </p>
              <p className="text-sm text-green-600">
                As alterações foram salvas
              </p>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Info do Funcionário */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600">Funcionário</p>
            <p className="font-semibold text-gray-900 text-lg max-w-xs truncate">
              {funcionario.nome}
            </p>
            <p className="text-xs text-gray-500 mt-1">CPF: {funcionario.cpf}</p>
          </div>

          {/* Grid de Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Total de Metas */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total de Metas
              </label>
              <input
                type="number"
                value={dados.totalMetas}
                onChange={(e) =>
                  handleChange("totalMetas", Number(e.target.value))
                }
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-semibold text-lg"
                disabled={isSaving || showSuccess}
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Atual: {funcionario.totalMetas}
              </p>
            </div>

            {/* Total de Coins */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total de Coins
              </label>
              <input
                type="number"
                value={dados.totalCoins}
                onChange={(e) =>
                  handleChange("totalCoins", Number(e.target.value))
                }
                className="w-full px-4 py-3 border-2 border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all font-semibold text-lg"
                disabled={isSaving || showSuccess}
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Atual: {funcionario.totalCoins}
              </p>
            </div>

            {/* Total de Pontos */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Total de Pontos
              </label>
              <input
                type="number"
                value={dados.totalPontos}
                onChange={(e) =>
                  handleChange("totalPontos", Number(e.target.value))
                }
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all font-semibold text-lg"
                disabled={isSaving || showSuccess}
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Atual: {funcionario.totalPontos.toFixed(2)}
              </p>
            </div>

            {/* Resgates Disponíveis */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Resgates Disponíveis
              </label>
              <input
                type="number"
                value={dados.resgatesDisponiveis}
                onChange={(e) =>
                  handleChange("resgatesDisponiveis", Number(e.target.value))
                }
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-semibold text-lg"
                disabled={isSaving || showSuccess}
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Atual: {funcionario.resgatesDisponiveis}
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800">Erro de validação</p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Aviso */}
          <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-700 mb-1 text-sm">
                  ⚠️ Atenção
                </h4>
                <p className="text-sm text-amber-600">
                  Ajustes manuais devem ser feitos com cuidado. Essas alterações
                  afetarão diretamente o saldo e os resgates do funcionário.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSaving || showSuccess}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving || showSuccess || !houveAlteracao}
              className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-zinc-500 to-neutral-600 hover:from-zinc-600 hover:to-neutral-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Salvando...
                </>
              ) : showSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Salvo!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salvar Alterações
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
