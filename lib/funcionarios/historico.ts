// lib/historico/historico.ts

export type TipoTransacao = 
  | "meta_adicionada" 
  | "resgate_produto" 
  | "ajuste_manual" 
  | "bonus_adicionado"
  | "penalidade";

export interface Historico {
  id: string;
  funcionarioId: string;
  funcionarioNome: string;
  tipo: TipoTransacao;
  descricao: string;
  coinsAntes: number;
  coinsDepois: number;
  pontosAntes: number;
  pontosDepois: number;
  metasAntes?: number;
  metasDepois?: number;
  resgatesAntes?: number;
  resgatesDepois?: number;
  produtoId?: string;
  produtoNome?: string;
  valorTransacao: number;
  observacao?: string;
  criadoPor?: string;
  criadoEm: Date;
}

// Mock de dados de histórico
export const historicos: Historico[] = [
  {
    id: "h1",
    funcionarioId: "1",
    funcionarioNome: "João Silva",
    tipo: "meta_adicionada",
    descricao: "Adicionadas 5 metas",
    coinsAntes: 300,
    coinsDepois: 300,
    pontosAntes: 1000,
    pontosDepois: 1500,
    metasAntes: 7,
    metasDepois: 12,
    resgatesAntes: 0,
    resgatesDepois: 5,
    valorTransacao: 5,
    criadoPor: "Admin Master",
    criadoEm: new Date("2025-01-15T10:30:00"),
  },
  {
    id: "h2",
    funcionarioId: "1",
    funcionarioNome: "João Silva",
    tipo: "resgate_produto",
    descricao: "Resgate de produto",
    coinsAntes: 400,
    coinsDepois: 300,
    pontosAntes: 1500,
    pontosDepois: 1500,
    resgatesAntes: 5,
    resgatesDepois: 4,
    produtoId: "p1",
    produtoNome: "Vale-Combustível R$ 100",
    valorTransacao: -100,
    criadoPor: "João Silva",
    criadoEm: new Date("2025-01-16T14:20:00"),
  },
  {
    id: "h3",
    funcionarioId: "2",
    funcionarioNome: "Maria Oliveira",
    tipo: "meta_adicionada",
    descricao: "Adicionadas 10 metas",
    coinsAntes: 150,
    coinsDepois: 250,
    pontosAntes: 115500,
    pontosDepois: 125500,
    metasAntes: 35,
    metasDepois: 45,
    resgatesAntes: 2,
    resgatesDepois: 12,
    valorTransacao: 10,
    criadoPor: "Admin Master",
    criadoEm: new Date("2025-01-17T09:15:00"),
  },
  {
    id: "h4",
    funcionarioId: "2",
    funcionarioNome: "Maria Oliveira",
    tipo: "ajuste_manual",
    descricao: "Ajuste manual de coins",
    coinsAntes: 200,
    coinsDepois: 250,
    pontosAntes: 125500,
    pontosDepois: 125500,
    valorTransacao: 50,
    observacao: "Correção de lançamento anterior",
    criadoPor: "Admin Master",
    criadoEm: new Date("2025-01-18T11:45:00"),
  },
  {
    id: "h5",
    funcionarioId: "3",
    funcionarioNome: "Carlos Souza",
    tipo: "bonus_adicionado",
    descricao: "Bônus por desempenho excepcional",
    coinsAntes: 150,
    coinsDepois: 200,
    pontosAntes: 1300,
    pontosDepois: 1800,
    valorTransacao: 50,
    observacao: "Melhor vendedor do mês",
    criadoPor: "Admin Master",
    criadoEm: new Date("2025-01-19T16:00:00"),
  },
  {
    id: "h6",
    funcionarioId: "4",
    funcionarioNome: "Ana Costa",
    tipo: "resgate_produto",
    descricao: "Resgate de produto",
    coinsAntes: 250,
    coinsDepois: 200,
    pontosAntes: 1100,
    pontosDepois: 1100,
    resgatesAntes: 3,
    resgatesDepois: 2,
    produtoId: "p2",
    produtoNome: "Kit Mercearia Básica",
    valorTransacao: -50,
    criadoPor: "Ana Costa",
    criadoEm: new Date("2025-01-20T13:30:00"),
  },
  {
    id: "h7",
    funcionarioId: "5",
    funcionarioNome: "Pedro Lima",
    tipo: "penalidade",
    descricao: "Penalidade aplicada",
    coinsAntes: 180,
    coinsDepois: 150,
    pontosAntes: 1000,
    pontosDepois: 900,
    valorTransacao: -30,
    observacao: "Atraso na entrega de relatório",
    criadoPor: "Gestor Departamento",
    criadoEm: new Date("2025-01-21T08:00:00"),
  },
];

// ===== FUNÇÕES AUXILIARES =====

/**
 * Busca histórico por ID
 */
export function getHistoricoById(id: string): Historico | undefined {
  return historicos.find((hist) => hist.id === id);
}

/**
 * Busca histórico de um funcionário específico
 */
export function getHistoricoByFuncionario(funcionarioId: string): Historico[] {
  return historicos
    .filter((hist) => hist.funcionarioId === funcionarioId)
    .sort((a, b) => b.criadoEm.getTime() - a.criadoEm.getTime());
}

/**
 * Busca histórico por tipo de transação
 */
export function getHistoricoByTipo(tipo: TipoTransacao): Historico[] {
  return historicos
    .filter((hist) => hist.tipo === tipo)
    .sort((a, b) => b.criadoEm.getTime() - a.criadoEm.getTime());
}

/**
 * Busca histórico por período
 */
export function getHistoricoByPeriodo(
  dataInicio: Date,
  dataFim: Date
): Historico[] {
  return historicos
    .filter(
      (hist) =>
        hist.criadoEm >= dataInicio && hist.criadoEm <= dataFim
    )
    .sort((a, b) => b.criadoEm.getTime() - a.criadoEm.getTime());
}

/**
 * Busca histórico recente (últimos N registros)
 */
export function getHistoricoRecente(limit: number = 10): Historico[] {
  return [...historicos]
    .sort((a, b) => b.criadoEm.getTime() - a.criadoEm.getTime())
    .slice(0, limit);
}

/**
 * Adiciona novo registro de histórico
 */
export function adicionarHistorico(historico: Omit<Historico, "id">): Historico {
  const novoHistorico: Historico = {
    ...historico,
    id: `h${historicos.length + 1}`,
  };
  historicos.push(novoHistorico);
  return novoHistorico;
}

/**
 * Retorna estatísticas de transações de um funcionário
 */
export function getEstatisticasFuncionario(funcionarioId: string) {
  const historicoFunc = getHistoricoByFuncionario(funcionarioId);
  
  return {
    totalTransacoes: historicoFunc.length,
    totalMetasAdicionadas: historicoFunc.filter(h => h.tipo === "meta_adicionada").length,
    totalResgates: historicoFunc.filter(h => h.tipo === "resgate_produto").length,
    totalAjustes: historicoFunc.filter(h => h.tipo === "ajuste_manual").length,
    totalBonus: historicoFunc.filter(h => h.tipo === "bonus_adicionado").length,
    totalPenalidades: historicoFunc.filter(h => h.tipo === "penalidade").length,
    coinsGanhos: historicoFunc
      .filter(h => h.valorTransacao > 0)
      .reduce((acc, h) => acc + h.valorTransacao, 0),
    coinsGastos: historicoFunc
      .filter(h => h.valorTransacao < 0)
      .reduce((acc, h) => acc + Math.abs(h.valorTransacao), 0),
  };
}

/**
 * Formata tipo de transação para exibição
 */
export function formatarTipoTransacao(tipo: TipoTransacao): string {
  const tipos: Record<TipoTransacao, string> = {
    meta_adicionada: "Meta Adicionada",
    resgate_produto: "Resgate de Produto",
    ajuste_manual: "Ajuste Manual",
    bonus_adicionado: "Bônus Adicionado",
    penalidade: "Penalidade",
  };
  return tipos[tipo];
}

/**
 * Retorna cor do badge de acordo com o tipo
 */
export function getCorTipo(tipo: TipoTransacao): string {
  const cores: Record<TipoTransacao, string> = {
    meta_adicionada: "bg-blue-100 text-blue-700 border-blue-200",
    resgate_produto: "bg-amber-100 text-amber-700 border-amber-200",
    ajuste_manual: "bg-purple-100 text-purple-700 border-purple-200",
    bonus_adicionado: "bg-green-100 text-green-700 border-green-200",
    penalidade: "bg-red-100 text-red-700 border-red-200",
  };
  return cores[tipo];
}