# 🎮 Sistema de Gamificação - Coin Sys

Sistema de gamificação corporativa onde funcionários acumulam coins e pontos ao bater metas, podendo resgatar produtos em um catálogo de recompensas.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Instalação](#-instalação)
- [Estrutura do Banco](#-estrutura-do-banco)
- [Como Funciona](#-como-funciona)
- [Fluxos do Sistema](#-fluxos-do-sistema)
- [API Reference](#-api-reference)
- [Permissões](#-permissões)

---

## 🎯 Visão Geral

O **Coin Sys** é um sistema de recompensas gamificado integrado a um ERP Django, onde:

- **Funcionários** batem metas e ganham coins através de uma roleta
- **Coins** são convertidos em pontos (multiplicador configurável)
- **Pontos** são trocados por produtos do catálogo
- **Gestores** visualizam dados do seu departamento
- **Administradores** gerenciam metas, produtos e configurações

### Fluxo Principal

```
META BATIDA → RESGATE DISPONÍVEL → GIRA ROLETA → GANHA COINS → 
CONVERTE PONTOS → RESGATA PRODUTO → ADMIN ENTREGA
```

---

## 🛠 Tecnologias

- **Frontend**: Next.js 14+ (App Router)
- **Backend**: Next.js API Routes
- **Banco de Dados**: PostgreSQL / MySQL
- **ORM**: Prisma 5.x
- **Autenticação**: Django (integração externa)
- **UI**: Tailwind CSS + Lucide Icons

---

## 🏗 Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                   DJANGO ERP                        │
│  (Autenticação + Gestão de Funcionários)           │
└──────────────────┬──────────────────────────────────┘
                   │ API/Webhook
                   ▼
┌─────────────────────────────────────────────────────┐
│              COIN SYS (Next.js)                     │
├─────────────────────────────────────────────────────┤
│  Frontend        │  API Routes    │  Prisma ORM    │
│  - Dashboard     │  - Metas       │  - Models      │
│  - Roleta        │  - Produtos    │  - Migrations  │
│  - Catálogo      │  - Pedidos     │  - Seeds       │
└──────────────────┴────────────────┴─────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│           PostgreSQL / MySQL                        │
└─────────────────────────────────────────────────────┘
```

---

## 📦 Instalação

### 1. Pré-requisitos

```bash
Node.js >= 20.19
PostgreSQL >= 14 (ou MySQL >= 8)
npm / yarn / pnpm
```

### 2. Clone e instale dependências

```bash
git clone <seu-repo>
cd coin-sys
npm install
```

### 3. Configure o banco de dados

```bash
# Copie o .env.example
cp .env.example .env

# Edite o .env com suas credenciais
DATABASE_URL="postgresql://user:password@localhost:5432/coin_sys"
```

### 4. Execute as migrations

```bash
# Criar tabelas
npx prisma migrate dev --name init

# Gerar Prisma Client
npx prisma generate

# (Opcional) Popular banco com dados de exemplo
npm run db:seed
```

### 5. Inicie o servidor

```bash
npm run dev
# Acesse: http://localhost:3000
```

---

## 🗄 Estrutura do Banco

### Principais Entidades

| Tabela | Descrição |
|--------|-----------|
| `Funcionario` | Dados e acumuladores (metas, coins, pontos) |
| `Departamento` | Setores da empresa |
| `Gestor` | Gestores de departamento (1:1) |
| `Resgate` | Metas pendentes (expiram no dia) |
| `ConfiguracaoDia` | Configuração diária do sistema |
| `PoolDia` | Pool embaralhado de prêmios |
| `CoinEspecial` | Prêmios especiais (5c, 3c, 2c) |
| `Produto` | Catálogo de produtos |
| `Pedido` | Solicitações de resgate |
| `Historico` | Auditoria completa |

### Relacionamentos Chave

```
Departamento 1───N Funcionario
Departamento 1───1 Gestor
Funcionario  1───N Resgate (temporário)
Funcionario  1───N Pedido
Funcionario  1───N Historico
ConfiguracaoDia 1───N CoinEspecial
ConfiguracaoDia 1───1 PoolDia
Produto 1───N Pedido
```

---

## ⚙️ Como Funciona

### 1️⃣ Configuração Diária (Admin)

O admin configura o dia definindo:

```typescript
{
  funcionariosAtivos: 117,
  metaMaximaPorFuncionario: 3,
  multiplicadorPontos: 3, // 1 coin = 3 pontos
  margemSeguranca: 10, // 10% extra
  coinsEspeciais: [
    { valor: 5, quantidade: 5 },
    { valor: 3, quantidade: 10 },
    { valor: 2, quantidade: 15 }
  ]
}
```

**Sistema calcula automaticamente:**
```
Sorteios máximos = 117 × 3 = 351
Especiais = 5 + 10 + 15 = 30
Base necessária = 351 - 30 = 321
Com margem (10%) = 321 × 1.1 = 353 coins de 1

Pool total = [5,5,5,5,5, 3,3,3..., 2,2,2..., 1,1,1...] (383 prêmios)
Pool embaralhado = [1,3,1,1,5,2,1,1,3,1...] ✅
```

### 2️⃣ Adição de Metas (Admin)

Admin adiciona metas para funcionários:

```typescript
// Cria registros de Resgate (expiram 23:59)
{
  funcionarioId: "...",
  quantidade: 3, // 3 tentativas na roleta
  dataExpiracao: new Date("2024-11-16T23:59:59")
}
```

### 3️⃣ Funcionário Gira a Roleta

Cada meta = 1 giro na roleta:

```typescript
// Consumo sequencial do PoolDia
Giro 1: poolEmbaralhado[indiceAtual++] → 1 coin
Giro 2: poolEmbaralhado[indiceAtual++] → 5 coins ⭐
Giro 3: poolEmbaralhado[indiceAtual++] → 1 coin

Total: 7 coins × 3 (multiplicador) = 21 pontos
```

**Atualiza:**
- `funcionario.totalMetas += 3`
- `funcionario.totalCoins += 7`
- `funcionario.totalPontos += 21`
- `resgate.resgatado = true`
- Cria registro em `Historico`

### 4️⃣ Troca por Produtos

Funcionário escolhe produto (se janela ativa):

```typescript
// Cria Pedido com status "solicitado"
{
  funcionarioId: "...",
  produtoId: "...",
  valorPontos: 50,
  status: "solicitado"
}

// Pontos são BLOQUEADOS mas ainda não debitados
```

### 5️⃣ Admin Marca como Entregue

```typescript
// Atualiza Pedido
pedido.status = "entregue"
pedido.dataEntrega = new Date()

// AGORA debita os pontos
funcionario.totalPontos -= 50

// Cria Historico da transação
```

---

## 🔄 Fluxos do Sistema

### 📊 Dashboard Admin

```
┌─────────────────────────────────────────┐
│  Configuração do Dia                    │
├─────────────────────────────────────────┤
│  • Funcionários ativos: 117             │
│  • Meta máxima: 3                       │
│  • Multiplicador: 3x                    │
│  • Coins especiais: 5c(5) 3c(10) 2c(15)│
│  • Pool calculado: 383 prêmios          │
│  • Janela de troca: [Ativar/Desativar]  │
│                                         │
│  [Salvar Configuração do Dia]          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Estatísticas do Dia Anterior           │
├─────────────────────────────────────────┤
│  • Sorteios realizados: 203             │
│  • Coins distribuídos: 203              │
│  • Não resgataram: 89                   │
└─────────────────────────────────────────┘
```

### 🎯 Adicionar Metas (Admin)

```
1. Buscar funcionário por CPF/Nome
2. Selecionar quantidade de metas (1-3)
3. Sistema cria Resgate com expiração 23:59
4. Funcionário recebe notificação
```

### 🎰 Roleta (Funcionário)

```
[VOCÊ TEM 3 METAS DISPONÍVEIS]

┌─────────────────────┐
│   🎰 GIRAR ROLETA   │
└─────────────────────┘

Resultado:
• Giro 1: 🪙 1 coin
• Giro 2: 💰 5 coins! ⭐
• Giro 3: 🪙 1 coin

Total: 7 coins × 3 = 21 pontos

[Seus Totais]
Metas: 15 | Coins: 42 | Pontos: 126
```

### 🛒 Catálogo (Funcionário)

```
┌──────────────────────────────────────┐
│  🎁 Fone Bluetooth JBL               │
│  Valor: 150 pontos                   │
│  Seus pontos: 126 ❌                 │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  🎁 Vale-compras R$ 50               │
│  Valor: 100 pontos                   │
│  Seus pontos: 126 ✅                 │
│  [RESGATAR]                          │
└──────────────────────────────────────┘
```

### 📦 Pedidos (Admin)

```
┌────────────────────────────────────────────┐
│  Pedido #1234                              │
├────────────────────────────────────────────┤
│  Funcionário: João Silva (CPF: 123...)    │
│  Produto: Vale-compras R$ 50              │
│  Departamento: Vendas                      │
│  Status: Solicitado                        │
│  Data: 16/11/2024 14:30                   │
│                                            │
│  [MARCAR COMO ENTREGUE]                   │
└────────────────────────────────────────────┘
```

---

## 🔐 Permissões

### Admin
- ✅ Configurar dia
- ✅ Adicionar metas
- ✅ Gerenciar produtos
- ✅ Ver todos os departamentos
- ✅ Marcar pedidos como entregues
- ✅ Ativar/desativar janela de troca
- ✅ Ver histórico completo

### Gestor
- ✅ Ver dados do seu departamento
- ✅ Ver funcionários do seu departamento
- ✅ Ver estatísticas
- ❌ Não pode adicionar metas
- ❌ Não pode marcar entregas

### Funcionário
- ✅ Girar roleta (se tiver resgates)
- ✅ Ver catálogo
- ✅ Solicitar produtos (se janela ativa)
- ✅ Ver seus totais
- ✅ Ver seu histórico
- ❌ Não vê dados de outros

---

## 📡 API Reference

### Principais Endpoints

```typescript
// Configuração
POST   /api/admin/config-dia          // Salvar config do dia
GET    /api/admin/config-dia/hoje     // Buscar config de hoje

// Metas
POST   /api/admin/metas               // Adicionar metas
GET    /api/funcionario/resgates      // Buscar resgates pendentes

// Roleta
POST   /api/funcionario/girar-roleta  // Girar roleta
GET    /api/admin/pool-dia            // Ver pool atual

// Produtos
GET    /api/produtos                  // Listar produtos
POST   /api/admin/produtos            // Criar produto
PATCH  /api/admin/produtos/:id        // Atualizar produto

// Pedidos
POST   /api/funcionario/pedidos       // Solicitar produto
GET    /api/funcionario/pedidos       // Meus pedidos
PATCH  /api/admin/pedidos/:id/entregar // Marcar entregue

// Estatísticas
GET    /api/admin/stats               // Stats gerais
GET    /api/gestor/stats/:deptoId     // Stats do departamento
GET    /api/funcionario/stats         // Meus stats
```

---

## 📊 Queries Prisma Comuns

### Buscar funcionário com totais

```typescript
const funcionario = await prisma.funcionario.findUnique({
  where: { cpf: "12345678900" },
  include: {
    departamento: true,
    resgates: {
      where: { 
        resgatado: false,
        dataExpiracao: { gte: new Date() }
      }
    }
  }
})
```

### Adicionar metas

```typescript
await prisma.$transaction(async (tx) => {
  // Criar resgates
  await tx.resgate.create({
    data: {
      funcionarioId: "...",
      quantidade: 3,
      dataExpiracao: endOfDay(new Date())
    }
  })
  
  // Registrar no histórico
  await tx.historico.create({
    data: {
      funcionarioId: "...",
      tipo: "meta_adicionada",
      descricao: "3 metas adicionadas",
      // ... outros campos
    }
  })
})
```

### Girar roleta

```typescript
await prisma.$transaction(async (tx) => {
  // 1. Buscar pool do dia
  const pool = await tx.poolDia.findFirst({
    where: { configuracaoDia: { data: hoje } }
  })
  
  const premios = pool.poolEmbaralhado as number[]
  const coinsGanhos = []
  
  // 2. Sortear N vezes
  for (let i = 0; i < quantidade; i++) {
    coinsGanhos.push(premios[pool.indiceAtual + i])
  }
  
  // 3. Atualizar pool
  await tx.poolDia.update({
    where: { id: pool.id },
    data: { 
      indiceAtual: pool.indiceAtual + quantidade,
      premiosUsados: pool.premiosUsados + quantidade
    }
  })
  
  // 4. Atualizar funcionário
  const totalCoins = coinsGanhos.reduce((a, b) => a + b, 0)
  const totalPontos = totalCoins * multiplicador
  
  await tx.funcionario.update({
    where: { id: funcionarioId },
    data: {
      totalMetas: { increment: quantidade },
      totalCoins: { increment: totalCoins },
      totalPontos: { increment: totalPontos }
    }
  })
  
  // 5. Marcar resgates como usados
  await tx.resgate.updateMany({
    where: { funcionarioId, resgatado: false },
    data: { resgatado: true }
  })
  
  // 6. Histórico
  await tx.historico.create({ /* ... */ })
  
  return { coinsGanhos, totalCoins, totalPontos }
})
```

---

## 🚀 Deploy

### Variáveis de Ambiente

```env
# Database
DATABASE_URL="postgresql://..."

# Django Integration
DJANGO_API_URL="https://seu-erp.com/api"
DJANGO_API_KEY="..."

# App
NEXT_PUBLIC_APP_URL="https://coins.empresa.com"
```

### Comandos de Build

```bash
# Build
npm run build

# Start produção
npm start

# Migrations em produção
npx prisma migrate deploy
```

---

## 📝 Scripts Úteis

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:generate": "prisma generate",
    "db:seed": "tsx prisma/seed.ts",
    "db:reset": "prisma migrate reset"
  }
}

