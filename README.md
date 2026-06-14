# AngularCoin 💱

**App de Conversão de Moedas em Tempo Real com Angular**

> Projeto desenvolvido para a disciplina de Desenvolvimento de Aplicativos Web com Angular e Consumo de APIs REST.

---

## 📸 Telas do Projeto

> _Adicione aqui screenshots do app rodando (mínimo 3 imagens conforme requisito)_
>
> Sugestão:
> - Print da tela de Conversor com resultado
> - Print da tela de Cotações
> - Print da tela de Histórico

---

## 🚀 Funcionalidades

| # | Funcionalidade | Status |
|---|---------------|--------|
| 1 | Integração com API REST de câmbio (ExchangeRate-API) | ✅ |
| 2 | Interface responsiva com Angular | ✅ |
| 3 | Histórico de conversões (localStorage) | ✅ |
| 4 | Suporte a múltiplas moedas com busca | ✅ |
| 5 | Atualização automática das taxas | ✅ |
| 6 | Conversão inversa (botão ⇄) | ✅ |
| 7 | Modo offline com taxas em cache | ✅ |
| 8 | Grade visual de cotações populares | ✅ |

---

## 🛠️ Tecnologias

- **Framework:** Angular 17 (Standalone Components)
- **Linguagem:** TypeScript
- **Estilização:** SCSS
- **API:** [ExchangeRate-API](https://www.exchangerate-api.com/) (gratuita, sem necessidade de chave)
- **Armazenamento:** LocalStorage (histórico + cache offline)
- **Roteamento:** Angular Router (lazy loading)
- **HTTP:** HttpClient com interceptor de erros

---

## 📁 Estrutura do Projeto

```
AngularCoin/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── interceptors/
│   │   │   │   └── error.interceptor.ts     # Tratamento global de erros HTTP
│   │   │   ├── models/
│   │   │   │   └── currency.model.ts        # Interfaces TypeScript
│   │   │   └── services/
│   │   │       ├── currency-list.service.ts # Lista de moedas suportadas
│   │   │       ├── exchange-rate.service.ts # Requisições à API + cache
│   │   │       ├── history.service.ts       # Gerenciamento do histórico
│   │   │       └── storage.service.ts       # Wrapper do localStorage
│   │   ├── features/
│   │   │   ├── converter/                   # Tela principal de conversão
│   │   │   ├── rates/                       # Tela de cotações
│   │   │   └── history/                     # Tela de histórico
│   │   ├── app.component.ts                 # Shell com header e navegação
│   │   ├── app.config.ts                    # Providers (HttpClient, Router)
│   │   └── app.routes.ts                    # Rotas com lazy loading
│   ├── environments/
│   │   ├── environment.ts                   # Config desenvolvimento
│   │   └── environment.prod.ts              # Config produção
│   ├── index.html
│   ├── main.ts
│   └── styles.scss                          # Estilos globais + variáveis CSS
├── .gitignore
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## ▶️ Como Rodar

### Pré-requisitos
- Node.js >= 18
- npm >= 9
- Angular CLI (`npm install -g @angular/cli`)

### Instalação e execução

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/AngularCoin.git
cd AngularCoin

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
ng serve

# 4. Acesse no navegador
# http://localhost:4200
```

### Build de produção

```bash
ng build
# Arquivos gerados em /dist/angular-coin
```

---

## 🌐 API Utilizada

**ExchangeRate-API** — `https://api.exchangerate-api.com/v4/latest/USD`

- ✅ Gratuita (sem cadastro para uso básico)
- ✅ Sem necessidade de chave de API
- ✅ Retorna taxas para mais de 160 moedas
- 📄 Documentação: https://www.exchangerate-api.com/docs/free

---

## 📱 Moedas Suportadas

USD, EUR, BRL, GBP, JPY, ARS, CAD, CHF, CNY, MXN, AUD, INR, CLP, COP, PEN, UYU, PYG, BOB, VES

---

## 📋 Critérios de Avaliação — Atendidos

1. **Funcionalidade** — Consome a API e realiza conversões com taxas em tempo real ✅  
2. **Interface** — Layout limpo, responsivo e intuitivo ✅  
3. **Usabilidade** — Navegação entre telas, busca de moedas, conversão rápida ✅  
4. **Integração de API** — HttpClient com interceptor de erro e tratamento de respostas ✅  
5. **Armazenamento Local e Offline** — Cache de taxas e histórico em localStorage ✅

---

## 📜 Licença

MIT — veja o arquivo [LICENSE](./LICENSE) para detalhes.
