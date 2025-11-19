"use client";

import { X, Target, Plus, TrendingUp, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Funcionario } from "@/lib/funcionarios/funcionarios";

interface ModalAdicionarMetasProps {
  isOpen: boolean;
  onClose: () => void;
  funcionario: Funcionario;
  onSuccess: (funcionarioAtualizado: Funcionario) => void;
}

export default function ModalAdicionarMetas({
  isOpen,
  onClose,
  funcionario,
  onSuccess,
}: ModalAdicionarMetasProps) {
  const [quantidadeMetas, setQuantidadeMetas] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validate = () => {
    if (quantidadeMetas <= 0) {
      setError("A quantidade de metas deve ser maior que zero");
      return false;
    }

    if (quantidadeMetas > 100) {
      setError("Quantidade máxima de metas: 100");
      return false;
    }

    return true;
  };

const handleSubmit = () => {
    if (!validate()) return;

    setIsSaving(true);

    // Simula sucesso sem chamar adicionarMetas
    setTimeout(() => {
        try {
            // Atualiza os dados localmente (mock)
            const funcionarioAtualizado = {
                ...funcionario,
                totalMetas: funcionario.totalMetas + quantidadeMetas,
                resgatesDisponiveis: funcionario.resgatesDisponiveis + quantidadeMetas,
            };

            onSuccess(funcionarioAtualizado);
            setShowSuccess(true);
            setIsSaving(false);

            setTimeout(() => {
                setShowSuccess(false);
                setQuantidadeMetas(1);
                setError("");
                onClose();
            }, 1500);
        } catch (err: any) {
            setError("Erro ao adicionar metas");
            setIsSaving(false);
        }
    }, 800);
};

  const handleClose = () => {
    if (!isSaving) {
      setQuantidadeMetas(1);
      setError("");
      setShowSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  const novoTotalMetas = funcionario.totalMetas + quantidadeMetas;
  const novosResgates = funcionario.resgatesDisponiveis + quantidadeMetas;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Adicionar Metas</h2>
                <p className="text-blue-100 text-sm max-w-xs truncate">{funcionario.nome}</p>
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
              <p className="font-semibold text-green-800">Metas adicionadas com sucesso!</p>
              <p className="text-sm text-green-600">
                +{quantidadeMetas} meta(s) e +{quantidadeMetas} resgate(s)
              </p>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Estatísticas Atuais */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center border-2 border-blue-200">
              <p className="text-xs text-gray-600 mb-1">Metas Atuais</p>
              <p className="text-lg font-bold text-blue-600">{funcionario.totalMetas}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center border-2 border-yellow-200">
              <p className="text-xs text-gray-600 mb-1">Coins</p>
              <p className="text-lg font-bold text-yellow-600">{funcionario.totalCoins}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center border-2 border-green-200">
              <p className="text-xs text-gray-600 mb-1">Resgates</p>
              <p className="text-lg font-bold text-green-600">
                {funcionario.resgatesDisponiveis}
              </p>
            </div>
          </div>

          {/* Input de Quantidade */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Target className="w-4 h-4 text-blue-500" />
              Quantidade de Metas *
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantidadeMetas((prev) => Math.max(1, prev - 1))}
                disabled={isSaving || showSuccess}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors disabled:opacity-50"
              >
                -
              </button>
              <input
                type="number"
                value={quantidadeMetas}
                onChange={(e) => {
                  setQuantidadeMetas(Math.max(1, Number(e.target.value)));
                  if (error) setError("");
                }}
                className={`flex-1 px-4 py-3 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                disabled={isSaving || showSuccess}
                min="1"
                max="100"
              />
              <button
                onClick={() => setQuantidadeMetas((prev) => Math.min(100, prev + 1))}
                disabled={isSaving || showSuccess}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-colors disabled:opacity-50"
              >
                +
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="font-semibold">⚠</span> {error}
              </p>
            )}
          </div>

          {/* Preview */}
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-700 text-sm">Após Confirmação:</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-600">Total de Metas</p>
                <p className="text-2xl font-bold text-blue-600">{novoTotalMetas}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Resgates Disponíveis</p>
                <p className="text-2xl font-bold text-green-600">{novosResgates}</p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200">
            <h4 className="font-semibold text-amber-700 mb-2 text-sm">⚠️ Importante</h4>
            <p className="text-sm text-amber-600">
              Cada meta adicionada gera automaticamente 1 resgate disponível para o funcionário.
            </p>
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
              disabled={isSaving || showSuccess || quantidadeMetas <= 0}
              className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adicionando...
                </>
              ) : showSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Adicionado!
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Confirmar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}