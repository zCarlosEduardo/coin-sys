// app/compras/page.tsx ou components/Compras/Compras.tsx
"use client";

import { useState, useMemo } from "react";
import {
  ShoppingCart,
  Package,
  CheckCircle,
  Clock,
  Search,
  Filter,
  MapPin,
  Phone,
  Calendar,
  User,
  Building2,
  Coins,
  FileText,
  TrendingUp,
} from "lucide-react";

export type Pedido = {
  id: string;
  funcionarioNome: string;
  funcionarioCpf: string;
  produtoNome: string;
  produtoCategoria?: string;
  departamentoNome: string;
  status: "solicitado" | "entregue";
  dataSolicitacao: Date;
  dataEntrega?: Date;
};

// Mock de pedidos
export const pedidos: Pedido[] = [
  {
    id: "001",
    funcionarioNome: "João Silva",
    funcionarioCpf: "123.456.789-00",
    produtoNome: "Notebook Dell",
    produtoCategoria: "Eletrônicos",
    departamentoNome: "TI",
    status: "solicitado",
    dataSolicitacao: new Date("2024-06-01T10:30:00"),
  },
  {
    id: "002",
    funcionarioNome: "Maria Souza",
    funcionarioCpf: "987.654.321-00",
    produtoNome: "Cadeira Ergonômica",
    produtoCategoria: "Móveis",
    departamentoNome: "RH",
    status: "entregue",
    dataSolicitacao: new Date("2024-05-28T14:00:00"),
  },
  {
    id: "003",
    funcionarioNome: "Carlos Pereira",
    funcionarioCpf: "111.222.333-44",
    produtoNome: "Monitor LG 24''",
    produtoCategoria: "Eletrônicos",
    departamentoNome: "Design",
    status: "solicitado",
    dataSolicitacao: new Date("2024-06-02T16:45:00"),
  },
  {
    id: "004",
    funcionarioNome: "Ana Lima",
    funcionarioCpf: "555.666.777-88",
    produtoNome: "Mouse Logitech",
    produtoCategoria: "Acessórios",
    departamentoNome: "TI",
    status: "entregue",
    dataSolicitacao: new Date("2024-05-25T11:20:00"),
    dataEntrega: new Date("2024-05-27T15:00:00"),
  },
];

// Funções mock
export function getPedidosSolicitados() {
  return pedidos.filter((p) => p.status === "solicitado");
}

export function getPedidosEntregues() {
  return pedidos.filter((p) => p.status === "entregue");
}

export function getEstatisticasPedidos() {
  const totalPedidos = pedidos.length;
  const totalSolicitados = pedidos.filter(
    (p) => p.status === "solicitado"
  ).length;
  const totalEntregues = pedidos.filter((p) => p.status === "entregue").length;
  return { totalPedidos, totalSolicitados, totalEntregues };
}

export function formatarStatus(status: "solicitado" | "entregue") {
  if (status === "solicitado") return "Solicitado";
  if (status === "entregue") return "Entregue";
  return status;
}

export function getCorStatus(status: "solicitado" | "entregue") {
  if (status === "solicitado")
    return "bg-yellow-100 text-yellow-700 border-yellow-400";
  if (status === "entregue")
    return "bg-green-100 text-green-700 border-green-400";
  return "";
}

export function atualizarStatusPedido(
  pedidoId: string,
  novoStatus: "solicitado" | "entregue",
  dataEntrega?: Date
) {
  const pedido = pedidos.find((p) => p.id === pedidoId);
  if (!pedido) return false;
  pedido.status = novoStatus;
  if (novoStatus === "entregue" && dataEntrega) {
    pedido.dataEntrega = dataEntrega;
  }
  return true;
}

type FiltroStatus = "todos" | "solicitado" | "entregue";

export default function ComprasPage() {
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");
  const [searchTerm, setSearchTerm] = useState("");

  const estatisticas = getEstatisticasPedidos();

  // Filtragem de pedidos
  const pedidosFiltrados = useMemo(() => {
    let resultado = pedidos;

    // Filtro por status
    if (filtroStatus !== "todos") {
      resultado = resultado.filter((p) => p.status === filtroStatus);
    }

    // Filtro por busca
    if (searchTerm) {
      const termo = searchTerm.toLowerCase();
      resultado = resultado.filter(
        (p) =>
          p.funcionarioNome.toLowerCase().includes(termo) ||
          p.produtoNome.toLowerCase().includes(termo) ||
          p.departamentoNome.toLowerCase().includes(termo) ||
          p.funcionarioCpf.includes(termo)
      );
    }

    // Ordenar por data (mais recentes primeiro)
    return resultado.sort(
      (a, b) => b.dataSolicitacao.getTime() - a.dataSolicitacao.getTime()
    );
  }, [filtroStatus, searchTerm]);

  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(data);
  };

  const handleMarcarComoEntregue = (pedidoId: string) => {
    const sucesso = atualizarStatusPedido(pedidoId, "entregue", new Date());
    if (sucesso) {
      // Forçar re-render
      setFiltroStatus((prev) => prev);
      alert("Pedido marcado como entregue!");
    }
  };

  return (
    <div className="container mx-auto mt-6 mb-22">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-lime-400 via-green-500 to-emerald-700 shadow-md flex items-center justify-center text-white">
              <ShoppingCart size={32} className="md:w-10 md:h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Gestão de Compras
              </h1>
              <p className="text-gray-600">
                Acompanhe todos os pedidos dos funcionários
              </p>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Busca */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome, produto, CPF ou departamento..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Filtro de Status */}
          <div className="flex gap-2">
            <button
              onClick={() => setFiltroStatus("todos")}
              className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                filtroStatus === "todos"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Filter className="w-4 h-4" />
              Todos ({pedidos.length})
            </button>
            <button
              onClick={() => setFiltroStatus("solicitado")}
              className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                filtroStatus === "solicitado"
                  ? "bg-yellow-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Clock className="w-4 h-4" />
              Solicitados ({estatisticas.totalSolicitados})
            </button>
            <button
              onClick={() => setFiltroStatus("entregue")}
              className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                filtroStatus === "entregue"
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Entregues ({estatisticas.totalEntregues})
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="space-y-4">
        {pedidosFiltrados.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-semibold">
              Nenhum pedido encontrado
            </p>
            <p className="text-gray-400 text-sm">
              Tente ajustar os filtros ou fazer uma nova busca
            </p>
          </div>
        ) : (
          pedidosFiltrados.map((pedido) => {
            return (
              <div
                key={pedido.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border-2 border-gray-100"
              >
                {/* Header do Card */}
                <div className="p-5 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    {/* Informações principais */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getCorStatus(
                            pedido.status
                          )}`}
                        >
                          {formatarStatus(pedido.status)}
                        </span>
                        <span className="text-sm text-gray-500">
                          #{pedido.id}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-blue-500 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm text-gray-500">Funcionário</p>
                            <p className="font-semibold text-gray-900 truncate">
                              {pedido.funcionarioNome}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatarData(pedido.dataSolicitacao)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          <span>{pedido.departamentoNome}</span>
                        </div>
                      </div>
                    </div>

                    {/* Valor e ações */}
                    <div className="flex flex-col gap-5 justify-center">
                      <div className="text-right shrink-0">
                        {pedido.status === "solicitado" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarcarComoEntregue(pedido.id);
                            }}
                            className="mt-3 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 mx-auto"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Marcar Entregue
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-green-500 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-gray-500">Produto</p>
                          <p className="font-semibold text-gray-900 truncate">
                            {pedido.produtoNome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
