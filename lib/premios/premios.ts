const configuracaoPremios = [
  { nome: "Coin 5", valor: 5, quantidade: 1 },
  { nome: "Coin 3", valor: 3, quantidade: 1 },
  { nome: "Coin 2", valor: 2, quantidade: 1 },
  { nome: "Coin 1", valor: 1, quantidade: 1 },
];

// Função para criar o pool de prêmios
const criarPoolPremios = () => {
  const pool = [];
  
  for (const config of configuracaoPremios) {
    for (let i = 0; i < config.quantidade; i++) {
      pool.push({ 
        id: `${config.valor}c-${i}`, 
        nome: config.nome, 
        valor: config.valor 
      });
    }
  }
  
  return pool;
};

// Pool global (mock - depois virá do banco de dados)
let poolGlobal = criarPoolPremios();

const sortearDoPool = () => {
  if (poolGlobal.length === 0) {
    // Se acabou o pool, recria (em produção isso não deve acontecer)
    poolGlobal = criarPoolPremios();
  }
  
  // Sorteia um índice aleatório
  const indiceAleatorio = Math.floor(Math.random() * poolGlobal.length);
  
  // Remove e retorna o prêmio do pool
  const premioSorteado = poolGlobal.splice(indiceAleatorio, 1)[0];
  
  return premioSorteado;
};

export { sortearDoPool };