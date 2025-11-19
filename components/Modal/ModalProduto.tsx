"use client";

import {
  X,
  Save,
  Package,
  Coins,
  DollarSign,
  FileText,
  Tag,
  Plus,
} from "lucide-react";
import { useState, useEffect } from "react";

type Produto = {
  id: string;
  categoria?: string;
  nome: string;
  descricao: string;
  valorPontos: number;
  valorEstimadoReal: number;
};

interface ModalProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  produto?: Produto | null;
  onSave: (produto: Produto) => void;
  categorias: string[];
}

export default function ModalProduto({
  isOpen,
  onClose,
  produto = null,
  onSave,
  categorias,
}: ModalProdutoProps) {
  const isEdit = !!produto;

  const [formData, setFormData] = useState<Produto>(
    produto || {
      id: "",
      categoria: "",
      nome: "",
      descricao: "",
      valorPontos: 0,
      valorEstimadoReal: 0,
    }
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Bloqueia scroll quando modal abre
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

  useEffect(() => {
    if (produto) {
      setFormData(produto);
    } else {
      setFormData({
        id: "",
        categoria: "",
        nome: "",
        descricao: "",
        valorPontos: 0,
        valorEstimadoReal: 0,
      });
    }
    setErrors({});
  }, [produto, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = "Descrição é obrigatória";
    }

    if (formData.valorPontos <= 0) {
      newErrors.valorPontos = "Valor em pontos deve ser maior que zero";
    }

    if (formData.valorEstimadoReal <= 0) {
      newErrors.valorEstimadoReal = "Valor em reais deve ser maior que zero";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setIsSaving(true);

    // Simula salvamento
    setTimeout(() => {
      const produtoParaSalvar = {
        ...formData,
        id: formData.id || `produto-${Date.now()}`, // Gera ID se for novo
      };
      onSave(produtoParaSalvar);
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  const handleChange = (field: keyof Produto, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-amber-500 to-orange-600 text-white p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 bg-opacity-20 rounded-xl flex items-center justify-center text-white">
                {isEdit ? (
                  <Package className="w-6 h-6" />
                ) : (
                  <Plus className="w-6 h-6" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {isEdit ? "Editar Produto" : "Criar Produto"}
                </h2>
                <p className="text-blue-100 text-sm">
                  {isEdit
                    ? "Atualize as informações do produto"
                    : "Preencha os dados do novo produto"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-500 hover:bg-opacity-20 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Categoria */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Tag className="w-4 h-4 text-orange-500" />
              Categoria
            </label>
            <select
              value={formData.categoria || ""}
              onChange={(e) => handleChange("categoria", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Nome */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Package className="w-4 h-4 text-orange-500" />
              Nome do Produto *
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.nome ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ex: Notebook Dell Inspiron"
            />
            {errors.nome && (
              <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-orange-500" />
              Descrição *
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none ${
                errors.descricao ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Descreva o produto..."
            />
            {errors.descricao && (
              <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>
            )}
          </div>

          {/* Valores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Valor em Pontos */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Coins className="w-4 h-4 text-yellow-500" />
                Valor em Pontos *
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.valorPontos}
                  onChange={(e) =>
                    handleChange("valorPontos", Number(e.target.value))
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.valorPontos ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0"
                  min="0"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-600 font-semibold">
                  pts
                </div>
              </div>
              {errors.valorPontos && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.valorPontos}
                </p>
              )}
            </div>

            {/* Valor em Reais */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                Valor Estimado (R$) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 font-semibold">
                  R$
                </span>
                <input
                  type="number"
                  value={formData.valorEstimadoReal}
                  onChange={(e) =>
                    handleChange("valorEstimadoReal", Number(e.target.value))
                  }
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.valorEstimadoReal
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              {errors.valorEstimadoReal && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.valorEstimadoReal}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-red-300 text-gray-700 font-semibold rounded-lg bg-red-100 hover:bg-red-200 transition-all "
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-amber-500 to-orange-500 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isEdit ? "Salvar Alterações" : "Criar Produto"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
