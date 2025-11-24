# Monfily

Projeto full-stack moderno construído com React, Node.js, TypeScript e Tailwind CSS.

## 📁 Estrutura do Projeto

O projeto está organizado em uma estrutura de monorepo usando npm workspaces:

```
monfily/
├── frontend/          # Aplicação React (Vite)
│   ├── src/          # Código fonte do frontend
│   ├── public/       # Arquivos estáticos
│   └── package.json  # Dependências do frontend
├── backend/          # Servidor Express
│   ├── src/          # Código fonte do backend
│   └── package.json  # Dependências do backend
├── shared/           # Código compartilhado
│   ├── schemas/      # Schemas do banco de dados (Drizzle)
│   └── package.json  # Dependências compartilhadas
├── docs/             # Documentação do projeto
├── scripts/          # Scripts auxiliares
└── package.json      # Workspace root
```

## 🚀 Início Rápido

### Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd monfily-new-version
```

2. Instale todas as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto
# Exemplo:
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
PORT=5000
NODE_ENV=development
```

### Desenvolvimento

Para executar frontend e backend simultaneamente:

```bash
npm run dev
```

Para executar apenas o frontend:
```bash
npm run dev:frontend
```

Para executar apenas o backend:
```bash
npm run dev:backend
```

### Build

Para construir ambos os projetos:

```bash
npm run build
```

Para construir apenas o frontend:
```bash
npm run build:frontend
```

Para construir apenas o backend:
```bash
npm run build:backend
```

### Produção

Após o build, execute o servidor de produção:

```bash
npm run start
```

## 📝 Scripts Disponíveis

### Scripts da Raiz

- `npm run dev` - Executa frontend e backend em modo desenvolvimento
- `npm run dev:frontend` - Executa apenas o frontend
- `npm run dev:backend` - Executa apenas o backend
- `npm run build` - Constrói ambos os projetos
- `npm run build:frontend` - Constrói apenas o frontend
- `npm run build:backend` - Constrói apenas o backend
- `npm run start` - Inicia o servidor de produção
- `npm run check` - Verifica tipos TypeScript em todos os projetos
- `npm run db:push` - Aplica migrações do banco de dados
- `npm run clean` - Remove node_modules e arquivos de build

### Scripts do Frontend

- `npm run dev` - Inicia servidor de desenvolvimento Vite
- `npm run build` - Constrói a aplicação para produção
- `npm run preview` - Preview da build de produção
- `npm run check` - Verifica tipos TypeScript

### Scripts do Backend

- `npm run dev` - Inicia servidor em modo desenvolvimento
- `npm run build` - Constrói o backend para produção
- `npm run start` - Inicia servidor de produção
- `npm run check` - Verifica tipos TypeScript
- `npm run db:push` - Aplica migrações do banco de dados

## 🏗️ Arquitetura

### Frontend

- **Framework**: React 19 com TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form + Zod

### Backend

- **Runtime**: Node.js com Express
- **Database**: PostgreSQL com Drizzle ORM
- **Authentication**: Passport.js
- **Session Management**: Express Session

### Shared

- **Schemas**: Drizzle ORM schemas
- **Types**: TypeScript types compartilhados
- **Validation**: Zod schemas

## 📂 Estrutura Detalhada

### Frontend (`frontend/`)

```
frontend/
├── src/
│   ├── components/     # Componentes React
│   │   ├── landing/   # Componentes da landing page
│   │   └── ui/         # Componentes UI reutilizáveis
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilitários e helpers
│   ├── pages/          # Páginas da aplicação
│   ├── App.tsx         # Componente raiz
│   └── main.tsx        # Entry point
├── public/             # Arquivos estáticos
├── index.html          # HTML template
├── vite.config.ts      # Configuração Vite
├── tsconfig.json       # Configuração TypeScript
└── package.json        # Dependências
```

### Backend (`backend/`)

```
backend/
├── src/
│   ├── config/         # Configurações
│   ├── controllers/    # Controllers
│   ├── routes/         # Definição de rotas
│   ├── services/       # Lógica de negócio
│   ├── utils/          # Utilitários
│   ├── types/          # Tipos TypeScript
│   ├── index.ts        # Entry point
│   ├── storage.ts      # Interface de armazenamento
│   └── vite.ts         # Integração Vite (dev)
├── migrations/         # Migrações do banco (geradas)
├── drizzle.config.ts   # Configuração Drizzle
├── tsconfig.json       # Configuração TypeScript
└── package.json        # Dependências
```

### Shared (`shared/`)

```
shared/
├── schemas/
│   └── schema.ts       # Schemas do banco de dados
├── types/              # Tipos compartilhados
├── index.ts            # Exports principais
├── tsconfig.json       # Configuração TypeScript
└── package.json        # Dependências
```

## 🔧 Configuração

### TypeScript

Cada projeto tem seu próprio `tsconfig.json` otimizado:

- **Frontend**: Configurado para React com suporte a JSX e DOM
- **Backend**: Configurado para Node.js
- **Shared**: Configuração base para código compartilhado

### Path Aliases

O projeto usa path aliases para facilitar imports:

- `@/*` - Aponta para `src/*` em cada projeto
- `@shared/*` - Aponta para `shared/*`

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz com:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Server
PORT=5000
NODE_ENV=development

# Adicione outras variáveis conforme necessário
```

## 🗄️ Banco de Dados

O projeto usa Drizzle ORM para gerenciar o banco de dados PostgreSQL.

### Aplicar Migrações

```bash
npm run db:push
```

As migrações são geradas automaticamente em `backend/migrations/`.

## 🧪 Desenvolvimento

### Adicionar Novas Dependências

**Frontend:**
```bash
npm install <package> --workspace=@monfily/frontend
```

**Backend:**
```bash
npm install <package> --workspace=@monfily/backend
```

**Shared:**
```bash
npm install <package> --workspace=@monfily/shared
```

**Dev Dependencies (Root):**
```bash
npm install <package> -D
```

### Estrutura de Código

- **Componentes**: Organize por funcionalidade, não por tipo
- **Imports**: Use path aliases (`@/`, `@shared/`)
- **Types**: Defina tipos compartilhados em `shared/types/`
- **Schemas**: Defina schemas do banco em `shared/schemas/`

## 📚 Recursos Adicionais

- [Documentação React](https://react.dev)
- [Documentação Vite](https://vitejs.dev)
- [Documentação Drizzle ORM](https://orm.drizzle.team)
- [Documentação Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

