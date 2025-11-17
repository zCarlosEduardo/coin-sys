// lib/funcionarios.ts

export type GrupoUsuario = "Analista" | "gestor" | "admin";

export interface Funcionario {
  id: string;
  nome: string;
  cpf: string;
  departamentoId: string;
  departamentoNome: string;
  grupo: GrupoUsuario;
  totalCoins: number;
  totalPontos: number;
  totalMetas: number;
  resgatesDisponiveis: number;
  ativo: boolean;
}

// Mock de dados
export const funcionarios: Funcionario[] = [
  {
    id: "1",
    nome: "João Silva",
    cpf: "123.456.789-00",
    departamentoId: "7",
    departamentoNome: "Financeiro",
    grupo: "Analista",
    totalCoins: 300,
    totalPontos: 1500,
    totalMetas: 12,
    resgatesDisponiveis: 3,
    ativo: true,
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    cpf: "234.567.890-11",
    departamentoId: "11",
    departamentoNome: "Recursos Humanos",
    grupo: "gestor",
    totalCoins: 250,
    totalPontos: 125500,
    totalMetas: 45,
    resgatesDisponiveis: 12,
    ativo: true,
  },
  {
    id: "3",
    nome: "Carlos Souza",
    cpf: "345.678.901-22",
    departamentoId: "8",
    departamentoNome: "Jurídico",
    grupo: "Analista",
    totalCoins: 200,
    totalPontos: 1800,
    totalMetas: 18,
    resgatesDisponiveis: 5,
    ativo: true,
  },
  {
    id: "4",
    nome: "Ana Costa",
    cpf: "456.789.012-33",
    departamentoId: "4",
    departamentoNome: "Cadastro",
    grupo: "Analista",
    totalCoins: 200,
    totalPontos: 1100,
    totalMetas: 8,
    resgatesDisponiveis: 2,
    ativo: true,
  },
  {
    id: "5",
    nome: "Pedro Lima",
    cpf: "567.890.123-44",
    departamentoId: "3",
    departamentoNome: "Assistência 24h",
    grupo: "Analista",
    totalCoins: 150,
    totalPontos: 900,
    totalMetas: 5,
    resgatesDisponiveis: 1,
    ativo: true,
  },
  {
    id: "6",
    nome: "Luiza Fernandes almeida borges lima faria asdasdLuiza Fernandes almeida borges lima faria asdasdLuiza Fernandes almeida borges lima faria asdasdLuiza Fernandes almeida borges lima faria asdasd",
    cpf: "678.901.234-55",
    departamentoId: "12",
    departamentoNome: "Sistemas",
    grupo: "gestor",
    totalCoins: 100,
    totalPontos: 23800,
    totalMetas: 67,
    resgatesDisponiveis: 8,
    ativo: true,
  },
  {
    id: "63",
    nome: "Luiza Fernandes",
    cpf: "678.901.234-55",
    departamentoId: "12",
    departamentoNome: "Sistemas",
    grupo: "gestor",
    totalCoins: 100,
    totalPontos: 23800,
    totalMetas: 67,
    resgatesDisponiveis: 8,
    ativo: true,
  },
  {
    id: "62",
    nome: "Luiza Fernandes",
    cpf: "678.901.234-55",
    departamentoId: "12",
    departamentoNome: "Sistemas",
    grupo: "gestor",
    totalCoins: 100,
    totalPontos: 23800,
    totalMetas: 67,
    resgatesDisponiveis: 8,
    ativo: true,
  },
  {
    id: "7",
    nome: "Rafael Gomes",
    cpf: "789.012.345-66",
    departamentoId: "10",
    departamentoNome: "Marketing",
    grupo: "Analista",
    totalCoins: 120,
    totalPontos: 800,
    totalMetas: 6,
    resgatesDisponiveis: 2,
    ativo: true,
  },
  {
    id: "8",
    nome: "Beatriz Ramos",
    cpf: "890.123.456-77",
    departamentoId: "5",
    departamentoNome: "Vendas",
    grupo: "Analista",
    totalCoins: 130,
    totalPontos: 950,
    totalMetas: 9,
    resgatesDisponiveis: 3,
    ativo: false, // Funcionário inativo (férias/afastado)
  },
  {
    id: "9",
    nome: "Felipe Alves",
    cpf: "901.234.567-88",
    departamentoId: "9",
    departamentoNome: "Sistemas",
    grupo: "Analista",
    totalCoins: 110,
    totalPontos: 700,
    totalMetas: 4,
    resgatesDisponiveis: 1,
    ativo: false,
  },
  {
    id: "10",
    nome: "Camila Pinto",
    cpf: "012.345.678-99",
    departamentoId: "6",
    departamentoNome: "Logística",
    grupo: "Analista",
    totalCoins: 220,
    totalPontos: 1050,
    totalMetas: 11,
    resgatesDisponiveis: 4,
    ativo: true,
  },
  {
    id: "11",
    nome: "Admin Master",
    cpf: "111.111.111-11",
    departamentoId: "1",
    departamentoNome: "Geral",
    grupo: "admin",
    totalCoins: 999,
    totalPontos: 50000,
    totalMetas: 100,
    resgatesDisponiveis: 50,
    ativo: true,
  },
];

// ===== FUNÇÕES AUXILIARES =====

/**
 * Busca funcionário por ID
 */
export function getFuncionarioById(id: string): Funcionario | undefined {
  return funcionarios.find((func) => func.id === id);
}

/**
 * Busca funcionário por CPF
 */
export function getFuncionarioByCpf(cpf: string): Funcionario | undefined {
  const cpfLimpo = cpf.replace(/\D/g, "");
  return funcionarios.find((func) => func.cpf.replace(/\D/g, "") === cpfLimpo);
}

/**
 * Retorna apenas funcionários ativos
 */
export function getFuncionariosAtivos(): Funcionario[] {
  return funcionarios.filter((func) => func.ativo);
}

/**
 * Retorna funcionários inativos
 */
export function getFuncionariosInativos(): Funcionario[] {
  return funcionarios.filter((func) => !func.ativo);
}

/**
 * Busca funcionários por departamento
 */
export function getFuncionariosByDepartamento(
  departamentoId: string
): Funcionario[] {
  return funcionarios.filter(
    (func) => func.departamentoId === departamentoId && func.ativo
  );
}

/**
 * Busca funcionários por grupo
 */
export function getFuncionariosByGrupo(grupo: GrupoUsuario): Funcionario[] {
  return funcionarios.filter((func) => func.grupo === grupo);
}

/**
 * Retorna top funcionários por pontuação
 */
export function getTopFuncionarios(limit: number = 10): Funcionario[] {
  return [...funcionarios]
    .filter((func) => func.ativo)
    .sort((a, b) => b.totalPontos - a.totalPontos)
    .slice(0, limit);
}

/**
 * Retorna top funcionários de um departamento específico
 */
export function getTopFuncionariosByDepartamento(
  departamentoId: string,
  limit: number = 5
): Funcionario[] {
  return getFuncionariosByDepartamento(departamentoId)
    .sort((a, b) => b.totalPontos - a.totalPontos)
    .slice(0, limit);
}

/**
 * Verifica se funcionário é admin
 */
export function isAdmin(funcionarioId: string): boolean {
  const func = getFuncionarioById(funcionarioId);
  return func?.grupo === "admin";
}

/**
 * Verifica se funcionário é gestor
 */
export function isGestor(funcionarioId: string): boolean {
  const func = getFuncionarioById(funcionarioId);
  return func?.grupo === "gestor";
}

/**
 * Retorna total de funcionários
 */
export function getTotalFuncionarios(): number {
  return funcionarios.length;
}

/**
 * Retorna estatísticas gerais
 */
export function getEstatisticasGerais() {
  const ativos = getFuncionariosAtivos();
  const inativos = getFuncionariosInativos();

  return {
    totalFuncionarios: funcionarios.length,
    funcionariosAtivos: ativos.length,
    funcionariosInativos: inativos.length,
    totalCoins: ativos.reduce((acc, f) => acc + f.totalCoins, 0),
    totalPontos: ativos.reduce((acc, f) => acc + f.totalPontos, 0),
    totalMetas: ativos.reduce((acc, f) => acc + f.totalMetas, 0),
    totalResgates: ativos.reduce((acc, f) => acc + f.resgatesDisponiveis, 0),
    totalAdmins: getFuncionariosByGrupo("admin").length,
    totalGestores: getFuncionariosByGrupo("gestor").length,
    totalFuncionariosComuns: getFuncionariosByGrupo("Analista").length,
  };
}
