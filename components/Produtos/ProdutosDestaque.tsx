import Link from "next/link";
import { getProdutosAtivos } from "@/lib/produtos/produtos";
import { ShoppingCart, Coins, DollarSign, Package } from "lucide-react";

export default function ProdutosDestaque() {
  // Pega os 4 produtos mais baratos (em pontos) para mostrar em destaque
  const produtosDestaque = getProdutosAtivos()
    .sort((a, b) => a.valorPontos - b.valorPontos)
    .slice(0, 4);

  return (
    <section className="w-full max-w-6xl mx-auto p-6 mb-8">
      <header className="text-center mb-8">
        <h2 className="font-bold text-2xl uppercase mb-2">
          Produtos em Destaque
        </h2>
        <p className="text-gray-600">
          Confira alguns produtos que você pode resgatar com seus pontos
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {produtosDestaque.map((produto) => (
          <article
            key={produto.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            {/* Imagem do produto (placeholder por enquanto) */}
            <div className="bg-linear-to-br from-blue-100 to-purple-100 h-48 flex items-center justify-center animate-pulse">
              <Package className="w-20 h-20 text-blue-500 opacity-50 animate-pulse" />
            </div>

            {/* Conteúdo */}
            <div className="p-4">
              {/* Categoria */}
              {produto.categoria && (
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {produto.categoria}
                </span>
              )}

              {/* Nome */}
              <h3 className="font-bold text-lg mt-2 mb-2 line-clamp-2 min-h-14">
                {produto.nome}
              </h3>

              {/* Descrição */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-10">
                {produto.descricao}
              </p>

              {/* Preços */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between bg-yellow-50 p-2 rounded-lg">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Coins className="w-4 h-4 text-yellow-600" />
                    Pontos
                  </span>
                  <span className="font-bold text-lg text-yellow-600">
                    {produto.valorPontos.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Botão para ver todos */}
      <div className="text-center mt-8">
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Package className="w-5 h-5" />
          Ver Todos os Produtos
        </Link>
      </div>
    </section>
  );
}
