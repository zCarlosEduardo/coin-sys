import { Package, Plus } from "lucide-react";
import { Search } from "lucide-react";

const mockProdutos = [
  { id: 1, nome: "Produto 1", valorPonto: 10, valorReal: 100 },
  { id: 2, nome: "Produto 2", valorPonto: 20, valorReal: 200 },
  { id: 3, nome: "Produto 3", valorPonto: 30, valorReal: 300 },
];

export default function MeuPerfil() {
  return (
    <div>
      <section className="container flex flex-col bg-white justify-center p-4 rounded-lg shadow-md m-4 mx-auto">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-4 sm:ml-16 md:ml-24 lg:ml-32 space-y-5 md:space-y-0 md:flex-row mb-6">
            <div className="rounded-xl w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-yellow-400 via-amber-500 to-orange-600 shadow-md items-center flex justify-center text-white">
              <Package size={42} />
            </div>
            <div className="-space-y-1">
              <h1 className="font-bold text-2xl">Produtos</h1>
              <span className="text-sm w-max">
                Exibindo {mockProdutos.length} de {mockProdutos.length} Produtos
              </span>
            </div>
          </div>
            <div className="flex items-center gap-3 flex-wrap sm:mr-16 md:mr-24 lg:mr-32 sm:flex-row-reverse md:flex-row-reverse">
              <div className="relative">
              <input
                type="search"
                placeholder="Pesquisar produto"
                className="w-64 pl-10 pr-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
              />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ display: "none" }} />
                <svg className="hidden" />
                <Search size={20} className="text-gray-400" />
                </span>
              </div>
                <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600  transition-all shadow-md hover:shadow-lg hover:scale-105">
                <Plus size={20} />
                Adicionar Produto
                </button>
            </div>
        </div>
      </section>
    </div>
  );
}
