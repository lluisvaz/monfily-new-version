# Monfily - Deploy & Configuração

Este projeto está preparado para deploy 100% funcional na **Vercel**.

## 🚀 Como fazer o Deploy na Vercel

1. **Conectar o Repositório**: No painel da Vercel, importe o repositório.
2. **Configurações de Build**:
   - **Framework Preset**: Vite (ou Other)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Root Directory**: `./` (Raiz do projeto)
3. **Variáveis de Ambiente**:
   Adicione as seguintes variáveis no painel da Vercel (`Settings -> Environment Variables`):
   - `EMAIL_HOST`: Servidor SMTP (ex: smtp.gmail.com)
   - `EMAIL_PORT`: Porta SMTP (ex: 587)
   - `EMAIL_USER`: Seu usuário de e-mail
   - `EMAIL_PASS`: Sua senha de app (app password)
   - `RECEIVER_EMAIL`: E-mail que receberá os leads
   - `DATABASE_URL`: URL de conexão do banco de dados (Neon/Postgres)

## 🛠️ Desenvolvimento Local

1. Instale as dependências na raiz:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env` baseado no `.env.example`.
3. Rode o projeto:
   ```bash
   npm run dev
   ```
   O frontend rodará na porta 5173 e o backend na 5000.

## 🔒 Segurança (Headers)

O projeto inclui um arquivo `vercel.json` que configura headers de segurança recomendados para obter **Nota A** no [SecurityHeaders](https://securityheaders.com/):

- **HSTS**: Força conexões HTTPS por 2 anos.
- **CSP (Content Security Policy)**: Restringe a origem de scripts, estilos e recursos para prevenir XSS.
  - Permite imagens do Cloudinary, Framer, FlagCDN.
  - Permite APIs de Geo-location (ipapi.co, api.country.is).
- **X-Content-Type-Options**: Previne MIME sniffing.
- **X-Frame-Options**: Previne Clickjacking (DENY).
- **Referrer-Policy**: Protege a privacidade do usuário.
- **Permissions-Policy**: Restringe o uso de recursos do navegador (camera, mic).

## 📁 Estrutura de Arquivos para Deploy

- `vercel.json`: Configurações de redirecionamento, rewrites de API e Headers.
- `api/index.ts`: Ponto de entrada para as Serverless Functions da Vercel, integrando o app Express.
- `tsconfig.json` (raiz): Facilita a compilação do TypeScript pela Vercel e resolve aliases.
- `dist`: Local onde o build do frontend é gerado e servido estaticamente.

## 🧪 Checklist de Validação

- [ ] `npm run build` gera a pasta `dist` na raiz com sucesso.
- [ ] Rotas SPA (ex: `/about`, `/services`) funcionam com refresh de página.
- [ ] API em `/api/contact` é acessível e integrada.
- [ ] Headers de segurança presentes em todas as respostas.
- [ ] Assets (imagens e fontes) carregando sem erros de CORS ou caminhos quebrados.
