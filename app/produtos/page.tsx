"use client";

import { useState, useMemo } from "react";
import { getProdutosAtivos } from "@/lib/produtos/produtos";
import { Package, Plus, Search, Filter, Tag } from "lucide-react";
import ProdutosCard from "@/components/Produtos/ProdutosCard";
import ModalProduto from "@/components/Modal/ModalProduto";
import ModalCriarCategoria from "@/components/Modal/ModalCriarCategoria";

type Produto = {
  id: string;
  categoria?: string;
  nome: string;
  descricao: string;
  valorPontos: number;
  valorEstimadoReal: number;
};

export default function ProdutosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("todas");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Estados para os modals
  const [modalProdutoAberto, setModalProdutoAberto] = useState(false);
  const [modalCategoriaAberto, setModalCategoriaAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null
  );

  // Busca todos os produtos ativos
  const todosProdutos = getProdutosAtivos();

  // Extrai categorias únicas
  const categorias = useMemo(() => {
    const cats = new Set(todosProdutos.map((p) => p.categoria).filter(Boolean));
    return Array.from(cats).sort() as string[];
  }, [todosProdutos]);

  // Filtra produtos
  const produtosFiltrados = useMemo(() => {
    return todosProdutos.filter((produto) => {
      const matchSearch =
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategoria =
        categoriaFiltro === "todas" || produto.categoria === categoriaFiltro;

      return matchSearch && matchCategoria;
    });
  }, [todosProdutos, searchTerm, categoriaFiltro]);

  // Função para abrir modal de edição
  const handleEditarProduto = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setModalProdutoAberto(true);
  };

  // Função para abrir modal de criação
  const handleCriarProduto = () => {
    setProdutoSelecionado(null);
    setModalProdutoAberto(true);
  };

  // Função para salvar produto (criar ou editar)
  const handleSalvarProduto = (produtoAtualizado: Produto) => {
    // TODO: Implementar lógica de criação/atualização no backend
  };

  // Função para criar nova categoria
  const handleCriarCategoria = (novaCategoria: string) => {
    // TODO: Implementar lógica de criação de categoria
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="container mx-auto py-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          {/* Título e Botões */}
          <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-yellow-400 via-amber-500 to-orange-600 shadow-md flex items-center justify-center text-white">
                <Package size={32} className="md:w-10 md:h-10" />
              </div>
              <div className="-space-y-1">
                <h1 className="font-bold text-2xl md:text-3xl text-gray-800">
                  Produtos
                </h1>
                <span className="text-sm text-gray-600">
                  Exibindo {produtosFiltrados.length} de {todosProdutos.length}{" "}
                  produtos
                </span>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setModalCategoriaAberto(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg hover:scale-105"
              >
                <Tag size={20} />
                <span className="hidden sm:inline">Nova Categoria</span>
              </button>
              <button
                onClick={handleCriarProduto}
                className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all shadow-md hover:shadow-lg hover:scale-105"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Adicionar Produto</span>
              </button>
            </div>
          </div>

          {/* Barra de Busca e Filtros */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Campo de Busca */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Botão de Filtros */}
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg ${
                mostrarFiltros
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Filter size={20} />
              <span className="font-medium">Filtros</span>
            </button>
            {/* Botão de Alternar Inativos */}
            <button
              onClick={() =>
              setCategoriaFiltro(
                categoriaFiltro === "inativos" ? "todas" : "inativos"
              )
              }
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg ${
              categoriaFiltro === "inativos"
                ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                : "bg-red-500 text-white hover:bg-red-400"
              }`}
            >
              {categoriaFiltro === "inativos" ? (
              <Package size={20} className="-rotate-180 transition-transform duration-1000" />
              ) : (
              <Package size={20} className=" transition-transform duration-1000" />
              )}
              <span className="font-medium">
              {categoriaFiltro === "inativos"
                ? "Ocultar Inativos"
                : "Mostrar Inativos"}
              </span>
            </button>
          </div>

          {/* Painel de Filtros Expansível */}
          {mostrarFiltros && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3">
                Filtrar por Categoria
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategoriaFiltro("todas")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    categoriaFiltro === "todas"
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  Todas ({todosProdutos.length})
                </button>
                {categorias.map((cat) => {
                  const count = todosProdutos.filter(
                    (p) => p.categoria === cat
                  ).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategoriaFiltro(cat)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        categoriaFiltro === cat
                          ? "bg-orange-500 text-white shadow-md"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lista de Produtos */}
      <section className="container mx-auto pb-8">
        {produtosFiltrados.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou realizar uma nova busca
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-300"
              >
                <ProdutosCard produto={produto} onEdit={handleEditarProduto} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modals */}
      <ModalProduto
        isOpen={modalProdutoAberto}
        onClose={() => setModalProdutoAberto(false)}
        produto={produtoSelecionado}
        onSave={handleSalvarProduto}
        categorias={categorias}
      />

      <ModalCriarCategoria
        isOpen={modalCategoriaAberto}
        onClose={() => setModalCategoriaAberto(false)}
        onSave={handleCriarCategoria}
        categoriasExistentes={categorias}
      />
    </div>
  );
}
