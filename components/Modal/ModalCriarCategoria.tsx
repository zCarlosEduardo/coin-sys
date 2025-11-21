"use client";

import { X, Plus, Tag, Sparkles, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface ModalCriarCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoria: string) => void;
  categoriasExistentes: string[];
}

export default function ModalCriarCategoria({
  isOpen,
  onClose,
  onSave,
  categoriasExistentes,
}: ModalCriarCategoriaProps) {
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSaving) handleClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, isSaving]);

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
    if (!nomeCategoria.trim()) {
      setError("Nome da categoria é obrigatório");
      return false;
    }

    if (nomeCategoria.trim().length < 3) {
      setError("Nome da categoria deve ter pelo menos 3 caracteres");
      return false;
    }

    if (
      categoriasExistentes.some(
        (cat) => cat.toLowerCase() === nomeCategoria.trim().toLowerCase()
      )
    ) {
      setError("Esta categoria já existe");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setIsSaving(true);

    setTimeout(() => {
      onSave(nomeCategoria.trim());
      setShowSuccess(true);
      setIsSaving(false);

      setTimeout(() => {
        setShowSuccess(false);
        setNomeCategoria("");
        setError("");
        onClose();
      }, 1500);
    }, 800);
  };

  const handleChange = (value: string) => {
    setNomeCategoria(value);
    if (error) setError("");
  };

  const handleClose = () => {
    if (!isSaving) {
      setNomeCategoria("");
      setError("");
      setShowSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-sky-500 to-blue-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-800/50 bg-opacity-20 rounded-xl flex items-center justify-center">
                <Tag className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black">
                  Nova Categoria
                </h2>
                <p className="text-gray-800 text-sm">
                  Crie uma nova categoria para produtos
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isSaving}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-400/50 hover:bg-opacity-20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                Categoria criada com sucesso!
              </p>
              <p className="text-sm text-green-600">
                "{nomeCategoria}" foi adicionada à lista
              </p>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Input */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              Nome da Categoria *
            </label>
            <input
              type="text"
              value={nomeCategoria}
              onChange={(e) => handleChange(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ex: Eletrônicos, Livros, Cursos..."
              disabled={isSaving || showSuccess}
              maxLength={50}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="font-semibold">⚠</span> {error}
              </p>
            )}
            <p className="text-gray-500 text-xs mt-2">
              {nomeCategoria.length}/50 caracteres
            </p>
          </div>

          {/* Categorias Existentes */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Categorias Existentes ({categoriasExistentes.length})
            </h3>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {categoriasExistentes.length > 0 ? (
                categoriasExistentes.map((cat) => (
                  <span
                    key={cat}
                    className="bg-white text-gray-700 px-3 py-1.5 rounded-lg text-sm border border-gray-200 font-medium"
                  >
                    {cat}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">
                  Nenhuma categoria cadastrada ainda
                </p>
              )}
            </div>
          </div>

          {/* Dicas */}
          <div className="bg-linear-to-br from-blue-50 to-pink-50 rounded-xl p-4 border-2 border-blue-200">
            <h4 className="font-semibold text-blue-700 mb-2 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Dicas para criar categorias
            </h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>Use nomes claros e descritivos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>Evite categorias muito específicas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>Mantenha consistência na nomenclatura</span>
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSaving || showSuccess}
              className="flex-1 px-6 py-3 border-2 border-red-300 text-gray-700 font-semibold rounded-lg bg-red-100 hover:bg-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving || showSuccess || !nomeCategoria.trim()}
              className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Criando...
                </>
              ) : showSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Criada!
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Criar Categoria
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
