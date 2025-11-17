// lib/produtos.ts

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  valorPontos: number;
  valorEstimadoReal: number;
  ativo: boolean;
  imagem?: string; // URL da imagem (opcional)
  categoria?: string; // Ex: Eletrônicos, Vale-presente, etc
  estoque?: number; // Quantidade disponível (opcional)
}

// Mock de dados
export const produtos: Produto[] = [
  {
    id: "1",
    nome: "Mouse Gamer RGB",
    descricao: "",
    valorPontos: 150,
    valorEstimadoReal: 120.00,
    ativo: true,
    categoria: "Eletrônicos",
  },
  {
    id: "2",
    nome: "Fone Bluetooth Premium",
    descricao: "Fone de ouvido Bluetooth com cancelamento de ruído ativo e bateria de 30 horas",
    valorPontos: 200,
    valorEstimadoReal: 180.00,
    ativo: true,
    categoria: "Eletrônicos",
  },
  {
    id: "3",
    nome: "Teclado Mecânico RGB",
    descricao: "Teclado mecânico RGB com switches blue, layout ABNT2 e estrutura em alumínio",
    valorPontos: 280,
    valorEstimadoReal: 250.00,
    ativo: true,
    categoria: "Eletrônicos",
  },
  {
    id: "4",
    nome: "Cadeira Gamer Ergonômica",
    descricao: "Cadeira gamer com apoio lombar ajustável, reclinável até 180° e suporte até 150kg",
    valorPontos: 350,
    valorEstimadoReal: 450.00,
    ativo: true,
    categoria: "Mobília",
  },
  {
    id: "5",
    nome: "Notebook Core i5",
    descricao: "Notebook Intel Core i5, 8GB RAM, SSD 256GB, tela 15.6 Full HD",
    valorPontos: 500,
    valorEstimadoReal: 2500.00,
    ativo: true,
    categoria: "Eletrônicos",
  },
  {
    id: "6",
    nome: "Vale-presente Amazon R$ 50",
    descricao: "Cartão presente digital da Amazon no valor de R$ 50,00",
    valorPontos: 50,
    valorEstimadoReal: 50.00,
    ativo: true,
    categoria: "Vale-presente",
  },
  {
    id: "7",
    nome: "Vale-presente iFood R$ 100",
    descricao: "Cartão presente digital do iFood no valor de R$ 100,00",
    valorPontos: 100,
    valorEstimadoReal: 100.00,
    ativo: true,
    categoria: "Vale-presente",
  },
  {
    id: "8",
    nome: "Smart Watch Fitness",
    descricao: "Relógio inteligente com monitor cardíaco, GPS e resistente à água",
    valorPontos: 180,
    valorEstimadoReal: 220.00,
    ativo: true,
    categoria: "Eletrônicos",
  },
  {
    id: "9",
    nome: "Mochila Executiva",
    descricao: "Mochila executiva impermeável com compartimento para notebook até 15.6 polegadas",
    valorPontos: 90,
    valorEstimadoReal: 150.00,
    ativo: true,
    categoria: "Acessórios",
  },
  {
    id: "10",
    nome: "Kit Home Office Premium",
    descricao: "Kit completo: suporte para notebook, mousepad grande e organizador de cabos",
    valorPontos: 120,
    valorEstimadoReal: 180.00,
    ativo: true,
    categoria: "Acessórios",
  },
  {
    id: "11",
    nome: "Garrafa Térmica Premium",
    descricao: "Garrafa térmica em aço inoxidável, mantém temperatura por 24h, capacidade 750ml",
    valorPontos: 60,
    valorEstimadoReal: 80.00,
    ativo: true,
    categoria: "Utilitários",
  },
  {
    id: "12",
    nome: "Tablet 10 polegadas",
    descricao: " ",
    valorPontos: 300,
    valorEstimadoReal: 800.00,
    ativo: false,
    categoria: "Ainin",
  },
  {
    id: "13",
    nome: "Webcam Full HD",
    descricao: "Webcam 1080p com microfone embutido e foco automático",
    valorPontos: 140,
    valorEstimadoReal: 200.00,
    ativo: true,
    categoria: "Eletrônicos",
  },
  {
    id: "14",
    nome: "Luminária LED Inteligente",
    descricao: "Luminária de mesa com controle de intensidade e temperatura de cor",
    valorPontos: 80,
    valorEstimadoReal: 120.00,
    ativo: true,
    categoria: "Utilidades",
  },
  {
    id: "15",
    nome: "Power Bank 20.000mAh",
    descricao: "Carregador portátil com 20.000mAh, carregamento rápido e 2 portas USB",
    valorPontos: 100,
    valorEstimadoReal: 150.00,
    ativo: false, // Produto temporariamente inativo
    categoria: "Eletrônicos",
  },
];

// ===== FUNÇÕES AUXILIARES =====

/**
 * Busca produto por ID
 */
export function getProdutoById(id: string): Produto | undefined {
  return produtos.find((prod) => prod.id === id);
}

/**
 * Retorna apenas produtos ativos
 */
export function getProdutosAtivos(): Produto[] {
  return produtos.filter((prod) => prod.ativo);
}

/**
 * Retorna produtos inativos
 */
export function getProdutosInativos(): Produto[] {
  return produtos.filter((prod) => !prod.ativo);
}

/**
 * Busca produtos por categoria
 */
export function getProdutosByCategoria(categoria: string): Produto[] {
  return produtos.filter((prod) => prod.categoria === categoria && prod.ativo);
}

/**
 * Retorna todas as categorias disponíveis
 */
export function getCategorias(): string[] {
  const categorias = produtos
    .filter((prod) => prod.categoria)
    .map((prod) => prod.categoria as string);
  return [...new Set(categorias)].sort();
}

/**
 * Busca produtos por faixa de pontos
 */
export function getProdutosByFaixaPontos(
  minPontos: number,
  maxPontos: number
): Produto[] {
  return produtos.filter(
    (prod) =>
      prod.ativo &&
      prod.valorPontos >= minPontos &&
      prod.valorPontos <= maxPontos
  );
}

/**
 * Retorna produtos ordenados por pontos (menor para maior)
 */
export function getProdutosOrdenadosPorPontos(): Produto[] {
  return [...getProdutosAtivos()].sort((a, b) => a.valorPontos - b.valorPontos);
}

/**
 * Retorna produtos ordenados por valor real (menor para maior)
 */
export function getProdutosOrdenadosPorValor(): Produto[] {
  return [...getProdutosAtivos()].sort(
    (a, b) => a.valorEstimadoReal - b.valorEstimadoReal
  );
}

/**
 * Verifica se usuário tem pontos suficientes para resgatar produto
 */
export function podeResgatar(
  pontosUsuario: number,
  produtoId: string
): boolean {
  const produto = getProdutoById(produtoId);
  if (!produto || !produto.ativo) return false;
  return pontosUsuario >= produto.valorPontos;
}

/**
 * Retorna produtos que o usuário pode resgatar
 */
export function getProdutosDisponiveis(pontosUsuario: number): Produto[] {
  return getProdutosAtivos().filter(
    (prod) => prod.valorPontos <= pontosUsuario
  );
}

/**
 * Retorna estatísticas dos produtos
 */
export function getEstatisticasProdutos() {
  const ativos = getProdutosAtivos();
  const inativos = getProdutosInativos();

  return {
    total: produtos.length,
    ativos: ativos.length,
    inativos: inativos.length,
    totalEstoque: produtos.reduce((acc, p) => acc + (p.estoque || 0), 0),
    menorValorPontos: Math.min(...ativos.map((p) => p.valorPontos)),
    maiorValorPontos: Math.max(...ativos.map((p) => p.valorPontos)),
    valorTotalEstimado: produtos.reduce(
      (acc, p) => acc + p.valorEstimadoReal * (p.estoque || 0),
      0
    ),
  };
}