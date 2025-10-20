# 🎨 Interface Preview

## Design System

### Cores (DaisyUI Custom Theme)

```
Primary:   #6366f1 (Indigo)   - Botões principais, links
Secondary: #8b5cf6 (Purple)   - Destaques secundários
Accent:    #ec4899 (Pink)     - Call-to-actions
Success:   #10b981 (Green)    - Status aprovados
Warning:   #f59e0b (Amber)    - Status pendentes
Error:     #ef4444 (Red)      - Erros e rejeições
```

---

## Páginas

### 🏠 Home (Landing Page)

```
┌─────────────────────────────────────────────────┐
│ [RWA Tokenization]    Home  Dashboard  Login   │
├─────────────────────────────────────────────────┤
│                                                  │
│          Tokenização de Imóveis                 │
│             na Blockchain                       │
│                                                  │
│   Transforme seus imóveis em NFTs na Ethereum   │
│                                                  │
│   [Começar Agora]  [Fazer Login]                │
│                                                  │
├─────────────────────────────────────────────────┤
│                Como Funciona                     │
│                                                  │
│   🛡️           💼           🏢           ⚡      │
│ KYC Seguro   Wallet MPC  Tokenização Fracionam. │
│                                                  │
├─────────────────────────────────────────────────┤
│              Estatísticas                        │
│                                                  │
│  0 Imóveis    R$ 0 Valor    0 Usuários          │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Features:**
- Hero section com gradiente animado
- Cards de features com ícones Lucide
- Estatísticas em tempo real
- CTA colorido no final
- 100% responsivo

---

### 📊 Dashboard

```
┌─────────────────────────────────────────────────┐
│ [Logo] Home Dashboard KYC Properties  [👤 User]│
├─────────────────────────────────────────────────┤
│ Bem-vindo, João! 👋                             │
│                                                  │
│ ⚠️ KYC Pendente - Complete para tokenizar       │
│    [Completar KYC]                               │
│                                                  │
├─────────────────────────────────────────────────┤
│ Stats Cards:                                     │
│                                                  │
│  🏢 Total      📈 Tokenizados  💼 Fracionados   │
│    5 Imóveis      2 NFTs         1 Token        │
│                                                  │
│  ✅ Status KYC: [APROVADO]                      │
│                                                  │
├─────────────────────────────────────────────────┤
│ Quick Actions:                                   │
│ [+ Cadastrar Imóvel] [💼 Tokenizar Imóvel]      │
│                                                  │
├─────────────────────────────────────────────────┤
│ Meus Imóveis                                     │
│                                                  │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│ │   🏠     │ │   🏠     │ │   🏠     │         │
│ │Residencial│Comercial │Apartamento │         │
│ │[TOKENIZED]│[APPROVED]│ [PENDING] │          │
│ │Token #0  │ Ready    │ Validating│          │
│ └──────────┘ └──────────┘ └──────────┘         │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Features:**
- Alert contextual de KYC
- 4 stats cards coloridos
- Quick actions buttons
- Grid responsivo de property cards
- Info da wallet MPC

---

### 🔐 KYC Page

```
┌─────────────────────────────────────────────────┐
│ KYC - Verificação de Identidade                 │
│ Complete sua verificação para tokenizar         │
├─────────────────────────────────────────────────┤
│                                                  │
│ Status da Verificação                           │
│                                   [EM REVISÃO]  │
│                                                  │
│ ℹ️ Em Análise                                   │
│    Seu documento está sendo revisado            │
│    Aguarde até 48h úteis                        │
│                                                  │
├─────────────────────────────────────────────────┤
│ Documentos Enviados                             │
│                                                  │
│ Tipo    | Status      | Enviado    | Revisado  │
│ ──────────────────────────────────────────────  │
│ RG      | [APROVADO]  | 15/01/2025 | 16/01/25  │
│ CNH     | [PENDENTE]  | 16/01/2025 | -         │
│                                                  │
├─────────────────────────────────────────────────┤
│ 📤 Enviar Documento                             │
│                                                  │
│ Tipo: [RG ▼]                                    │
│                                                  │
│ Arquivo: [Escolher arquivo...]                  │
│          JPG, PNG, PDF (máx. 5MB)               │
│                                                  │
│ ✓ Arquivo: documento.pdf (245 KB)              │
│                                                  │
│                      [Enviar Documento]         │
│                                                  │
├─────────────────────────────────────────────────┤
│ ℹ️ Seus documentos são armazenados em IPFS     │
│    Apenas hash on-chain para privacidade       │
└─────────────────────────────────────────────────┘
```

**Features:**
- Badge de status colorido
- Alert contextual (pendente/aprovado/rejeitado)
- Tabela de documentos com histórico
- Form de upload com preview
- Info de privacidade

---

### 🏢 Property Card (Component)

```
┌────────────────────────────┐
│      🏠 (Gradient BG)      │
│                            │
├────────────────────────────┤
│ Residencial  [TOKENIZADO] │
│                            │
│ 📍 Av. Paulista, 1000      │
│    São Paulo - SP          │
│                            │
│ Área: 150m²                │
│ Matrícula: MAT-12345       │
│                            │
│ ┌────────────────────────┐ │
│ │ Token ID: #0           │ │
│ │ Contrato: 0xDEF456...  │ │
│ └────────────────────────┘ │
│                            │
│ [Etherscan] [Ver Detalhes]│
└────────────────────────────┘
```

**Features:**
- Ícone grande de casa no topo
- Badge de status dinâmico
- Informações essenciais
- Box destaque para dados blockchain
- Botões de ação

---
### 🔑 Login Page
```
┌─────────────────────────────────────────────────┐
│           (Gradient Background)                 │
│                                                  │
│         ┌─────────────────────┐                 │
│         │    🔐 (Icon)        │                 │
│         │                     │                 │
│         │      Login          │                 │
│         │ Entre na sua conta  │                 │
│         │                     │                 │
│         │ Email:              │                 │
│         │ [📧 seu@email.com]  │                 │
│         │                     │                 │
│         │ Senha:              │                 │
│         │ [🔒 ••••••••]      │                 │
│         │ Esqueceu a senha?   │                 │
│         │                     │                 │
│         │   [Entrar]          │                 │
│         │                     │                 │
│         │ ───── OU ─────      │                 │
│         │                     │                 │
│         │ Não tem conta?      │                 │
│         │ [Criar conta]       │                 │
│         └─────────────────────┘                 │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Features:**
- Card centralizado com shadow
- Ícones nos inputs
- Link "Esqueceu a senha"
- Divider estilizado
- Link para registro

---

## 📱 Responsividade

### Mobile (< 768px)
- Menu hamburguer
- Cards em coluna única
- Stats verticais
- Touch-friendly buttons

### Tablet (768px - 1024px)
- Grid 2 colunas
- Menu colapsável
- Stats horizontais

### Desktop (> 1024px)
- Grid 3-4 colunas
- Menu completo
- Hover effects
- Transitions suaves

---

## 🎭 Componentes DaisyUI Usados

- ✅ `navbar` - Navegação sticky
- ✅ `card` - Cards de propriedades
- ✅ `badge` - Status indicators
- ✅ `btn` - Botões estilizados
- ✅ `input` - Formulários
- ✅ `alert` - Notificações
- ✅ `stats` - Estatísticas
- ✅ `table` - Tabelas
- ✅ `dropdown` - Menus
- ✅ `loading` - Spinners
- ✅ `divider` - Separadores
- ✅ `hero` - Hero section

---

## 🎨 Customizações CSS

```css
/* Gradiente background */
.gradient-bg {
  @apply bg-gradient-to-br from-primary via-secondary to-accent;
}

/* Hover em cards */
.card-hover {
  @apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
}

/* Scrollbar customizada */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  @apply bg-primary rounded-full;
}
```

---

## 🌈 Paleta Visual

```
Sucesso (KYC Aprovado):
███████ #10b981

Pendente (Em Análise):
███████ #f59e0b

Erro (Rejeitado):
███████ #ef4444

Primary (Botões):
███████ #6366f1

Secondary (Destaques):
███████ #8b5cf6

Accent (CTAs):
███████ #ec4899
```

---

**Design moderno, limpo e profissional! 🎨✨**
