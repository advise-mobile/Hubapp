# Plano de Migração - Strangler Fig Pattern

## 📋 Análise do Projeto

Este documento identifica o que pode ser movido para a pasta `legacy/` e o que deve permanecer em `src/` (código novo/moderno).

---

## 🟡 CÓDIGO LEGADO (Mover para `legacy/`)

### **1. Páginas em JavaScript (`.js`)**

Todas as páginas que ainda estão em JavaScript devem ser consideradas legado:

```
legacy/pages/
├── Account/              # ✅ JavaScript - Mover
│   ├── Chat/
│   ├── Help/
│   ├── Infos/
│   ├── Notifications/
│   └── Payments/
├── Blank/                # ✅ JavaScript - Mover
├── Blocked/              # ✅ JavaScript - Mover
├── Client/               # ✅ JavaScript - Mover
├── Deadlines/            # ✅ JavaScript - Mover
├── Folders/              # ✅ JavaScript - Mover
├── Forgot/               # ✅ JavaScript - Mover
├── Initial/              # ✅ JavaScript - Mover
├── Intro/                # ✅ JavaScript - Mover
├── Login/                # ✅ JavaScript - Mover
├── Movements/            # ✅ JavaScript - Mover
├── People/               # ✅ JavaScript - Mover
├── PrivacyPolicy/        # ✅ JavaScript - Mover
└── TermsUse/             # ✅ JavaScript - Mover
```

### **2. Componentes em JavaScript (`.js`)**

Componentes que ainda não foram migrados para TypeScript:

```
legacy/components/
├── CustomIcon/           # ✅ JavaScript - Mover
├── CustomScrollableTabBar/  # ✅ JavaScript - Mover
├── CustomTabs/           # ✅ JavaScript - Mover
├── DatePicker/           # ✅ JavaScript - Mover
├── HasNotPermission/     # ✅ JavaScript - Mover
├── Header/               # ✅ JavaScript - Mover
├── HeaderGlobals/        # ✅ JavaScript - Mover
├── Modal/                # ✅ JavaScript - Mover
├── Share/                # ✅ JavaScript - Mover
├── Spinner/              # ✅ JavaScript - Mover
├── StatusBar/            # ✅ JavaScript - Mover
├── ToastNotify/          # ✅ JavaScript - Mover
└── UserIcon/             # ✅ JavaScript - Mover
```

### **3. Store/Redux (Redux com Sagas - Padrão Antigo)**

Todo o sistema de gerenciamento de estado atual:

```
legacy/store/
├── ducks/                # ✅ Todos os ducks em JS - Mover
│   ├── Auth.js
│   ├── Customer.js
│   ├── DeadlineAdd.js
│   ├── Deadlines.js
│   ├── FolderKeywords.js
│   ├── FolderProcesses.js
│   ├── FolderUnread.js
│   ├── Fonts.js
│   ├── Journal.js
│   ├── Keywords.js
│   ├── Movement.js
│   ├── Movements.js
│   ├── People.js
│   ├── Process.js
│   ├── Select.js
│   ├── ToastNotify.js
│   ├── Tribunal.js
│   └── User.js
├── sagas/                # ✅ Todas as sagas - Mover
│   └── [18 arquivos .js]
├── index.js              # ✅ Store principal - Mover
└── MovementFiltersStore.js       # ✅ Mover
```

### **4. Services em JavaScript**

```
legacy/services/
├── Api.js                # ✅ JavaScript - Mover
├── Endpoints.js           # ✅ JavaScript - Mover
└── env.js                 # ✅ JavaScript - Mover (ou manter se for config)
```

### **5. Helpers em JavaScript**

```
legacy/helpers/
├── ArrayUtils.js          # ✅ JavaScript - Mover
├── DateFunctions.js       # ✅ JavaScript - Mover
├── Mask.js                # ✅ JavaScript - Mover
├── Permissions.js         # ✅ JavaScript - Mover
├── Pushs.js               # ✅ JavaScript - Mover
├── RD.js                  # ✅ JavaScript - Mover
├── StorageKeys.js         # ✅ JavaScript - Mover
└── VersionControl.js      # ✅ JavaScript - Mover
```

**Nota:** `functions.ts` e `MoneyFunctions.ts` são TypeScript e devem permanecer em `src/`.

### **6. Navigation em JavaScript**

```
legacy/navigation/
├── NavigationService.js   # ✅ JavaScript - Mover
└── Routes.js             # ✅ JavaScript - Mover
```

### **7. Config em JavaScript**

```
legacy/config/
├── DebugConfig.js        # ✅ JavaScript - Mover
└── ReactotronConfig.js   # ✅ JavaScript - Mover
```

### **8. Assets/Styles em JavaScript**

```
legacy/assets/
├── data.js               # ✅ JavaScript - Mover
└── styles/               # ✅ JavaScript - Mover
    ├── colors.js
    ├── fonts.js
    ├── general.js
    ├── global.js
    ├── index.js
    └── metrics.js
```

### **9. Mocks**

```
legacy/mocks/
├── NativePushNotificationManagerIOS.js  # ✅ Mover
└── PushNotificationIOS.js               # ✅ Mover
```

---

## 🟢 CÓDIGO NOVO (Manter em `src/`)

### **1. Páginas em TypeScript**

```
src/pages/
├── Finance/              # ✅ TypeScript - MANTER
│   ├── CashFlow/
│   ├── Category/
│   ├── Details/
│   ├── Modal/
│   ├── Releases/
│   └── tab-Filters/
├── MovementsTrash/       # ✅ TypeScript - MANTER
│   └── Filters/
└── Promotion/            # ✅ TypeScript - MANTER
```

### **2. Componentes em TypeScript**

```
src/components/
├── ConfirmModal/         # ✅ TypeScript - MANTER
├── Filters/              # ✅ TypeScript - MANTER
├── Finance/              # ✅ TypeScript - MANTER
│   ├── CashFlow/
│   └── Installments/
├── MultiSelectCheckBox/  # ✅ TypeScript - MANTER
└── ScrollableTabView/    # ✅ TypeScript - MANTER (tem index.tsx)
```

### **3. Hooks Customizados (TypeScript)**

```
src/services/hooks/       # ✅ TypeScript - MANTER
├── Finances/
│   ├── useCategory/
│   ├── useCategories/
│   ├── useCashFlow/
│   ├── useFilterCategory/
│   ├── usePeople/
│   ├── useProcess/
│   └── useReleases/
├── Movements/
│   └── useMovements/
└── MovimentsTrash/
    └── useMovementsTrash/
```

### **4. Helpers em TypeScript**

```
src/helpers/
├── functions.ts          # ✅ TypeScript - MANTER
└── MoneyFunctions.ts     # ✅ TypeScript - MANTER
```

### **5. Assets (Imagens, Fontes)**

```
src/assets/
├── fonts/                # ✅ MANTER (recursos)
├── images/               # ✅ MANTER (recursos)
└── styles/               # ⚠️ Avaliar - pode ser legado
```

---

## 📊 Resumo da Estrutura Proposta

```
HubApp/
├── src/                  # Código novo/moderno
│   ├── pages/
│   │   ├── Finance/      ✅ TypeScript
│   │   ├── MovementsTrash/ ✅ TypeScript
│   │   └── Promotion/   ✅ TypeScript
│   ├── components/
│   │   ├── ConfirmModal/ ✅ TypeScript
│   │   ├── Filters/     ✅ TypeScript
│   │   ├── Finance/     ✅ TypeScript
│   │   └── MultiSelectCheckBox/ ✅ TypeScript
│   ├── services/
│   │   └── hooks/       ✅ TypeScript (novos hooks)
│   ├── helpers/
│   │   ├── functions.ts ✅ TypeScript
│   │   └── MoneyFunctions.ts ✅ TypeScript
│   └── assets/          ✅ Recursos (imagens, fontes)
│
└── legacy/               # Código legado (será migrado gradualmente)
    ├── pages/           # Todas as páginas em JS
    ├── components/      # Componentes em JS
    ├── store/           # Redux + Sagas
    ├── services/         # Services em JS
    ├── helpers/         # Helpers em JS
    ├── navigation/      # Navigation em JS
    ├── config/          # Config em JS
    ├── assets/          # Styles em JS
    └── mocks/           # Mocks
```

---

## 🎯 Critérios de Classificação

### **Legado (Mover para `legacy/`):**
- ✅ Arquivos `.js` (JavaScript)
- ✅ Uso de Redux com Sagas (padrão antigo)
- ✅ Componentes funcionais sem TypeScript
- ✅ Helpers sem tipagem
- ✅ Services sem TypeScript

### **Novo (Manter em `src/`):**
- ✅ Arquivos `.ts` e `.tsx` (TypeScript)
- ✅ Hooks customizados modernos
- ✅ Componentes com tipagem
- ✅ Padrões modernos de React (hooks, context, etc.)

---

## ⚠️ Considerações Importantes

1. **Dependências Cruzadas**: Alguns arquivos legados podem importar código novo e vice-versa. Será necessário criar aliases ou adaptadores.

2. **Assets Compartilhados**: Imagens e fontes devem permanecer em `src/assets/` pois são compartilhados.

3. **Migração Gradual**: A ideia é migrar gradualmente os arquivos de `legacy/` para `src/` conforme forem sendo refatorados.

4. **Configuração de Paths**: Atualizar `tsconfig.json` e `babel.config.js` para suportar imports de ambas as pastas.

5. **Testes**: Garantir que os testes continuem funcionando após a reorganização.

---

## 🚀 Próximos Passos

1. Criar a estrutura de pastas `legacy/`
2. Mover arquivos identificados como legado
3. Atualizar imports e aliases
4. Testar a aplicação
5. Criar plano de migração gradual por módulo

