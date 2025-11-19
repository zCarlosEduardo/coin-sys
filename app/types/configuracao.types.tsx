// ==================== TIPAGENS ====================

/**
 * Configuração de um prêmio especial
 */
export type PremioConfig = {
  id: string;
  nome: string;
  valor: number;
  quantidade: number;
};

/**
 * Resumo das atividades do dia anterior
 */
export type ResumoAnterior = {
  data: string;
  sorteiosRealizados: number;
  premiosDistribuidos: number;
  especialesDistribuidos: number;
  funcionariosParticipantes: number;
};

/**
 * Configuração completa do sistema para um dia específico
 */
export type ConfiguracaoSistema = {
  metaMaxima: number;
  multiplicadorPontos: number;
  premiosEspeciais: PremioConfig[];
  premios1Coin: number;
  poolTotal: number;
  sorteiosMaximos: number;
  data: string;
};

/**
 * Status da janela de troca
 */
export type StatusJanelaTroca = {
  ativo: boolean;
  dataUltimaAlteracao: string;
  alteradoPor?: string;
};

/**
 * Histórico de configurações salvas
 */
export type HistoricoConfiguracao = {
  id: string;
  data: string;
  configuracao: ConfiguracaoSistema;
  usuarioId?: string;
  observacoes?: string;
};

/**
 * Estatísticas calculadas do dia
 */
export type EstatisticasDia = {
  funcionariosAtivos: number;
  sorteiosMaximos: number;
  totalEspeciais: number;
  premios1Coin: number;
  poolTotal: number;
  margemSeguranca: number;
  margemSobra: number;
};

/**
 * Parâmetros para cálculo de coins
 */
export type ParametrosCalculo = {
  funcionariosAtivos: number;
  metaMaxima: number;
  margemSeguranca: number; // Percentual (ex: 10 para 10%)
  premiosEspeciais: PremioConfig[];
};

/**
 * Resultado do cálculo de coins
 */
export type ResultadoCalculo = {
  sorteiosMaximos: number;
  totalEspeciais: number;
  premios1Coin: number;
  poolTotal: number;
  margemAplicada: number;
  margemSobra: number;
};

/**
 * Validação da configuração
 */
export type ValidacaoConfiguracao = {
  valida: boolean;
  erros: string[];
  avisos?: string[];
};

// ==================== CONSTANTES ====================

/**
 * Valores padrão para nova configuração
 */
export const CONFIGURACAO_PADRAO: Omit<ConfiguracaoSistema, "data"> = {
  metaMaxima: 3,
  multiplicadorPontos: 3,
  premiosEspeciais: [],
  premios1Coin: 0,
  poolTotal: 0,
  sorteiosMaximos: 0,
};

/**
 * Margem de segurança padrão (percentual)
 */
export const MARGEM_SEGURANCA_PADRAO = 10;

/**
 * Limites do sistema
 */
export const LIMITES = {
  META_MAXIMA_MIN: 1,
  META_MAXIMA_MAX: 10,
  MULTIPLICADOR_MIN: 1,
  MULTIPLICADOR_MAX: 10,
  VALOR_PREMIO_MIN: 1,
  VALOR_PREMIO_MAX: 100,
  QUANTIDADE_PREMIO_MIN: 1,
  QUANTIDADE_PREMIO_MAX: 1000,
} as const;

// ==================== FUNÇÕES AUXILIARES ====================

/**
 * Validar configuração do prêmio
 */
export function validarPremioConfig(premio: Partial<PremioConfig>): ValidacaoConfiguracao {
  const erros: string[] = [];

  if (!premio.nome || premio.nome.trim().length < 3) {
    erros.push("Nome do prêmio deve ter no mínimo 3 caracteres");
  }

  if (!premio.valor || premio.valor < LIMITES.VALOR_PREMIO_MIN) {
    erros.push(`Valor do prêmio deve ser no mínimo ${LIMITES.VALOR_PREMIO_MIN}`);
  }

  if (premio.valor && premio.valor > LIMITES.VALOR_PREMIO_MAX) {
    erros.push(`Valor do prêmio deve ser no máximo ${LIMITES.VALOR_PREMIO_MAX}`);
  }

  if (!premio.quantidade || premio.quantidade < LIMITES.QUANTIDADE_PREMIO_MIN) {
    erros.push(`Quantidade deve ser no mínimo ${LIMITES.QUANTIDADE_PREMIO_MIN}`);
  }

  if (premio.quantidade && premio.quantidade > LIMITES.QUANTIDADE_PREMIO_MAX) {
    erros.push(`Quantidade deve ser no máximo ${LIMITES.QUANTIDADE_PREMIO_MAX}`);
  }

  return {
    valida: erros.length === 0,
    erros,
  };
}

/**
 * Validar configuração do sistema
 */
export function validarConfiguracaoSistema(
  config: Partial<ConfiguracaoSistema>
): ValidacaoConfiguracao {
  const erros: string[] = [];
  const avisos: string[] = [];

  if (!config.metaMaxima || config.metaMaxima < LIMITES.META_MAXIMA_MIN) {
    erros.push(`Meta máxima deve ser no mínimo ${LIMITES.META_MAXIMA_MIN}`);
  }

  if (config.metaMaxima && config.metaMaxima > LIMITES.META_MAXIMA_MAX) {
    avisos.push(`Meta máxima muito alta (${config.metaMaxima}). Considere reduzir.`);
  }

  if (!config.multiplicadorPontos || config.multiplicadorPontos < LIMITES.MULTIPLICADOR_MIN) {
    erros.push(`Multiplicador deve ser no mínimo ${LIMITES.MULTIPLICADOR_MIN}`);
  }

  if (config.multiplicadorPontos && config.multiplicadorPontos > LIMITES.MULTIPLICADOR_MAX) {
    avisos.push(
      `Multiplicador muito alto (${config.multiplicadorPontos}). Isso pode gerar muitos pontos.`
    );
  }

  if (config.premiosEspeciais) {
    const totalEspeciais = config.premiosEspeciais.reduce(
      (sum, p) => sum + p.quantidade,
      0
    );

    if (config.sorteiosMaximos && totalEspeciais > config.sorteiosMaximos) {
      erros.push(
        "Total de prêmios especiais excede o número máximo de sorteios possíveis"
      );
    }
  }

  return {
    valida: erros.length === 0,
    erros,
    avisos: avisos.length > 0 ? avisos : undefined,
  };
}

/**
 * Calcular estatísticas do dia
 */
export function calcularEstatisticas(
  params: ParametrosCalculo
): ResultadoCalculo {
  const { funcionariosAtivos, metaMaxima, margemSeguranca, premiosEspeciais } = params;

  const sorteiosMaximos = funcionariosAtivos * metaMaxima;
  const totalEspeciais = premiosEspeciais.reduce((sum, p) => sum + p.quantidade, 0);
  const base = sorteiosMaximos - totalEspeciais;
  const margemAplicada = Math.ceil(base * (margemSeguranca / 100));
  const premios1Coin = base + margemAplicada;
  const poolTotal = totalEspeciais + premios1Coin;
  const margemSobra = poolTotal - sorteiosMaximos;

  return {
    sorteiosMaximos,
    totalEspeciais,
    premios1Coin,
    poolTotal,
    margemAplicada,
    margemSobra,
  };
}

/**
 * Criar prêmio com valores padrão
 */
export function criarPremioVazio(): Omit<PremioConfig, "id"> {
  return {
    nome: "",
    valor: 1,
    quantidade: 1,
  };
}

/**
 * Criar nova configuração com valores padrão
 */
export function criarConfiguracaoVazia(): ConfiguracaoSistema {
  return {
    ...CONFIGURACAO_PADRAO,
    data: new Date().toISOString(),
  };
}

/**
 * Formatar data para exibição
 */
export function formatarDataConfiguracao(data: string): string {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Verificar se configuração está completa
 */
export function isConfiguracaoCompleta(config: Partial<ConfiguracaoSistema>): boolean {
  return !!(
    config.metaMaxima &&
    config.multiplicadorPontos &&
    config.premiosEspeciais &&
    config.premios1Coin !== undefined &&
    config.poolTotal &&
    config.sorteiosMaximos
  );
}

/**
 * Calcular percentual de prêmios especiais
 */
export function calcularPercentualEspeciais(
  totalEspeciais: number,
  poolTotal: number
): string {
  if (poolTotal === 0) return "0.00";
  return ((totalEspeciais / poolTotal) * 100).toFixed(2);
}

/**
 * Calcular margem de segurança aplicada
 */
export function calcularMargemAplicada(
  premios1Coin: number,
  base: number
): number {
  return premios1Coin - base;
}

// ==================== EXPORT DEFAULT ====================

export default {
  // Types
  CONFIGURACAO_PADRAO,
  MARGEM_SEGURANCA_PADRAO,
  LIMITES,

  // Funções
  validarPremioConfig,
  validarConfiguracaoSistema,
  calcularEstatisticas,
  criarPremioVazio,
  criarConfiguracaoVazia,
  formatarDataConfiguracao,
  isConfiguracaoCompleta,
  calcularPercentualEspeciais,
  calcularMargemAplicada,
};