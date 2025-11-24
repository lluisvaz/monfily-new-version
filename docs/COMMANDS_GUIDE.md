# Guia de Comandos - Monfily

Este guia lista todos os comandos disponíveis no projeto reorganizado.

## 🚀 Comandos Principais

### Desenvolvimento

```bash
# Executar frontend e backend simultaneamente
npm run dev

# Executar apenas o frontend
npm run dev:frontend

# Executar apenas o backend
npm run dev:backend
```

### Build

```bash
# Construir ambos os projetos (frontend primeiro, depois backend)
npm run build

# Construir apenas o frontend
npm run build:frontend

# Construir apenas o backend
npm run build:backend
```

### Produção

```bash
# Iniciar servidor de produção (após build)
npm run start
```

## 🔧 Comandos de Manutenção

### TypeScript

```bash
# Verificar tipos em todos os projetos
npm run check

# Verificar tipos apenas no frontend
npm run check --workspace=@monfily/frontend

# Verificar tipos apenas no backend
npm run check --workspace=@monfily/backend
```

### Banco de Dados

```bash
# Aplicar migrações do banco de dados
npm run db:push
```

### Limpeza

```bash
# Remover node_modules e arquivos de build
npm run clean
```

## 📦 Gerenciamento de Dependências

### Instalação

```bash
# Instalar todas as dependências (raiz e workspaces)
npm install

# Instalar dependência no frontend
npm install <package> --workspace=@monfily/frontend

# Instalar dependência no backend
npm install <package> --workspace=@monfily/backend

# Instalar dependência no shared
npm install <package> --workspace=@monfily/shared

# Instalar dependência de desenvolvimento na raiz
npm install <package> -D
```

### Remoção

```bash
# Remover dependência do frontend
npm uninstall <package> --workspace=@monfily/frontend

# Remover dependência do backend
npm uninstall <package> --workspace=@monfily/backend
```

## 🎯 Comandos por Workspace

### Frontend (`@monfily/frontend`)

```bash
# Desenvolvimento
npm run dev --workspace=@monfily/frontend

# Build
npm run build --workspace=@monfily/frontend

# Preview da build
npm run preview --workspace=@monfily/frontend

# Type check
npm run check --workspace=@monfily/frontend
```

### Backend (`@monfily/backend`)

```bash
# Desenvolvimento
npm run dev --workspace=@monfily/backend

# Build
npm run build --workspace=@monfily/backend

# Produção
npm run start --workspace=@monfily/backend

# Type check
npm run check --workspace=@monfily/backend

# Migrações do banco
npm run db:push --workspace=@monfily/backend
```

## 🔍 Comandos Úteis

### Verificar Estrutura

```bash
# Listar workspaces
npm ls --workspaces

# Ver dependências de um workspace
npm ls --workspace=@monfily/frontend

# Ver scripts disponíveis
npm run --workspace=@monfily/frontend
```

### Debug

```bash
# Executar com logs detalhados
npm run dev -- --verbose

# Verificar versões
node --version
npm --version
```

## 📝 Exemplos de Uso

### Cenário 1: Primeira Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar .env
# Criar arquivo .env na raiz com DATABASE_URL, PORT, etc.

# 3. Aplicar migrações
npm run db:push

# 4. Iniciar desenvolvimento
npm run dev
```

### Cenário 2: Adicionar Nova Dependência

```bash
# Adicionar biblioteca ao frontend
npm install date-fns --workspace=@monfily/frontend

# Adicionar biblioteca ao backend
npm install express-validator --workspace=@monfily/backend
```

### Cenário 3: Build para Produção

```bash
# 1. Construir ambos os projetos
npm run build

# 2. Verificar builds
ls -la dist/public/    # Frontend
ls -la backend/dist/   # Backend

# 3. Iniciar produção
npm run start
```

### Cenário 4: Desenvolvimento Individual

```bash
# Desenvolver apenas frontend (backend já rodando em outro terminal)
npm run dev:frontend

# Desenvolver apenas backend (frontend já rodando em outro terminal)
npm run dev:backend
```

## ⚠️ Comandos Importantes

### Antes de Commitar

```bash
# Verificar tipos
npm run check

# Limpar builds antigos
npm run clean

# Verificar .gitignore
git status
```

### Após Clonar Repositório

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env  # Se existir
# Editar .env com suas configurações

# Aplicar migrações
npm run db:push

# Iniciar desenvolvimento
npm run dev
```

## 🆘 Troubleshooting

### Erro: "Cannot find module"

```bash
# Reinstalar dependências
npm run clean
npm install
```

### Erro: "Port already in use"

```bash
# Verificar processo na porta
# Windows: netstat -ano | findstr :5000
# Linux/Mac: lsof -i :5000

# Matar processo ou mudar porta no .env
```

### Erro: "Type errors"

```bash
# Verificar configuração TypeScript
npm run check

# Limpar cache
npm run clean
rm -rf node_modules
npm install
```

---

**Última atualização:** 2025-11-24

