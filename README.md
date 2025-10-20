# RWA Tokenization Frontend

Frontend moderno e responsivo para plataforma de tokenização de imóveis (RWA) construído com:

- ⚡️ **Vite** - Build tool ultra-rápida
- ⚛️ **React 18** - Framework UI
- 🎨 **DaisyUI** - Componentes lindos baseados em Tailwind CSS
- 🔗 **React Router** - Navegação
- 🔐 **Zustand** - State management
- 🌐 **ethers.js** - Integração Web3
- 🎭 **TypeScript** - Type safety

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Iniciar dev server
npm run dev
```

Acesse: `http://localhost:5173`

## 📁 Estrutura

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.tsx
│   ├── PropertyCard.tsx
│   └── KYCStatusBadge.tsx
├── pages/              # Páginas/Rotas
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── KYC.tsx
│   └── Login.tsx
├── stores/             # Zustand stores
│   ├── useAuthStore.ts
│   └── useWalletStore.ts
├── services/           # API services
│   ├── kycService.ts
│   ├── propertyService.ts
│   └── tokenizationService.ts
├── lib/                # Utilities
│   └── api.ts
├── App.tsx             # App principal
└── main.tsx            # Entry point
```

## 🎨 Temas

O frontend usa DaisyUI com tema customizado:

- **Primary**: Indigo (`#6366f1`)
- **Secondary**: Purple (`#8b5cf6`)
- **Accent**: Pink (`#ec4899`)

Para mudar o tema, edite `tailwind.config.js`.

## 🔌 Integração Backend

O frontend se conecta automaticamente com a API backend em `http://localhost:3000/api/v1`.

Configure em `.env`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 🌐 Features

### Autenticação
- ✅ Login/Registro
- ✅ JWT tokens
- ✅ Protected routes
- ✅ Auto refresh

### Wallet
- ✅ Conexão MetaMask
- ✅ Multi-chain support
- ✅ Account switching
- ✅ MPC wallet display

### KYC
- ✅ Upload de documentos
- ✅ Status tracking
- ✅ Histórico de submissões

### Propriedades
- ✅ Lista de imóveis
- ✅ Cards visuais
- ✅ Status badges
- ✅ Links Etherscan

## 🛠️ Build

```bash
# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📱 Responsividade

100% responsivo com breakpoints:
- 📱 Mobile: < 768px
- 📊 Tablet: 768px - 1024px
- 💻 Desktop: > 1024px

## 🎯 Próximos Passos

- [ ] Página de cadastro de propriedades
- [ ] Fluxo de tokenização completo
- [ ] Fracionamento de NFTs
- [ ] Marketplace de frações
- [ ] Gráficos e analytics
- [ ] Dark mode toggle
- [ ] Multi-idioma (i18n)

## 📄 Licença

MIT
