# Relatório de Código Morto no Projeto

## 🚨 Código Morto Confirmado

### 1. **Jurisprudência** (✅ TOTALMENTE REMOVIDO)
**Status:** ✅ **Tudo relacionado a jurisprudência foi removido com sucesso!**

#### Arquivos removidos:
- ✅ `legacy/store/JurisprudenceFiltersStore.js` - **REMOVIDO**
- ✅ `legacy/store/ducks/Jurisprudence.js` - **JÁ FOI REMOVIDO** (não existia)
- ✅ `legacy/store/sagas/Jurisprudence.js` - **JÁ FOI REMOVIDO** (não existia)
- ✅ `legacy/pages/Jurisprudence/` - **JÁ FOI REMOVIDO** (pasta não existia)

#### Imagens removidas:
- ✅ `src/assets/images/jurisprudence.png` - **REMOVIDO** (~13KB)
- ✅ `src/assets/images/jurisprudence_white.png` - **REMOVIDO** (~13KB)
- ✅ `src/assets/images/permissions/jurisprudence.png` - **REMOVIDO** (~9KB)
- ✅ `src/assets/images/permissions/jurisprudence_white.png` - **REMOVIDO** (~9.5KB)
- ✅ Imagens do Android também removidas

#### Código comentado removido:
- ✅ `legacy/navigation/Routes.js` - Imports e stack comentados **REMOVIDOS**
- ✅ `legacy/store/ducks/index.js` - Reducer comentado **REMOVIDO**
- ✅ `legacy/store/sagas/index.js` - Sagas comentadas **REMOVIDAS**

#### Permissões removidas:
- ✅ `legacy/helpers/Permissions.js` - Permissões de jurisprudência **REMOVIDAS**
- ✅ `JURISPRUDENCE` removido de `PermissionsGroups`

**📊 Espaço liberado:** ~46.5KB (44.5KB de imagens + ~2KB de código)

---

### 2. **Página People** (Não está nas rotas)
**Status:** Página existe mas não está registrada nas rotas de navegação

#### Arquivos:
- ⚠️ `legacy/pages/People/index.js` - Página existe mas não é acessível via navegação

**Nota:** A página People não está nas rotas, mas os hooks e componentes relacionados a "People" (pessoas/contatos) são usados nos modais de Finance (ReleaseAdd, ReleaseEdit, etc.). A página em si parece não ser usada.

---

### 3. **Página Help** (✅ EM USO)
**Status:** Página existe e é usada em `Account/index.js`

#### Arquivos:
- ✅ `legacy/pages/Account/Help/index.js` - **NÃO É CÓDIGO MORTO** - Usada em `Account/index.js` (linha 56)

**Nota:** A página Help é usada como uma das abas dentro da tela de Account, então não é código morto.

---

### 4. **Página Notifications** (✅ EM USO)
**Status:** Import comentado nas rotas, mas a página é usada

#### Arquivos:
- ⚠️ `legacy/navigation/Routes.js` (linha 26) - Import comentado: `// import Notifications from '@lpages/Account/Notifications';`
- ✅ `legacy/pages/Account/Notifications/index.js` - **NÃO É CÓDIGO MORTO** - Usada em `Account/index.js` (linha 44)

**Nota:** O import está comentado nas rotas porque a página `Notifications` é usada diretamente em `Account/index.js` como uma das abas, não como uma rota separada. O import comentado pode ser removido para limpeza.

---

## ✅ Código que NÃO é morto (mas pode parecer)

### 1. **Blank**
- ✅ `legacy/pages/Blank/index.js` - É usado como componente de estilo, não é página morta
- Usado em: `legacy/components/Header/index.js` e `legacy/components/HeaderGlobals/index.js`

### 2. **Payments**
- ✅ `legacy/pages/Account/Payments/index.js` - É usado em `Account/index.js` (linha 50)

### 3. **People (hooks e componentes)**
- ✅ Hooks e componentes relacionados a "People" são usados nos modais de Finance
- ⚠️ Apenas a página `legacy/pages/People/index.js` parece não ser usada

---

## 📋 Resumo de Ações Recomendadas

### Prioridade ALTA (Remover completamente):
1. **Jurisprudência:**
   - Remover `legacy/store/JurisprudenceFiltersStore.js`
   - Remover `legacy/store/ducks/Jurisprudence.js` (se existir)
   - Remover `legacy/store/sagas/Jurisprudence.js` (se existir)
   - Remover pasta `legacy/pages/Jurisprudence/` (se existir)
   - Remover imagens de jurisprudência
   - Remover código comentado das rotas, ducks e sagas
   - Remover permissões de jurisprudência de `Permissions.js`

### Prioridade MÉDIA (Verificar antes de remover):
2. **Página People:**
   - Verificar se `legacy/pages/People/index.js` é realmente necessário
   - Se não for usada, pode ser removida

### Prioridade BAIXA (Limpeza):
3. **Limpar imports comentados:**
   - Remover import comentado de `Notifications` em `Routes.js` (linha 26) - não é necessário pois a página é usada diretamente em Account

---

## 🔍 Como verificar se é seguro remover:

1. **Jurisprudência:**
   ```bash
   # Verificar se há referências não comentadas
   grep -r "Jurisprudence" --exclude-dir=node_modules --exclude-dir=android --exclude-dir=ios .
   ```

2. **People (página):**
   ```bash
   # Verificar se a página é navegada
   grep -r "navigate.*People\|People.*navigate" --exclude-dir=node_modules .
   ```

3. **Help:**
   - ✅ Confirmado: Help é usado em `Account/index.js` (linha 56) - **NÃO É CÓDIGO MORTO**

