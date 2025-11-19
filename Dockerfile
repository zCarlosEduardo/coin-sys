# Etapa 1: Dependências
FROM node:20-alpine AS deps
WORKDIR /app

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat openssl

COPY package*.json ./
RUN npm ci

# Etapa 2: Build
FROM node:20.15.0-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run lint || true
RUN npm run build

# Etapa 3: Runner
FROM node:20.15.0-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 2500

ENV PORT=2500
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]