# Simulador de Arbitragem na Polygon

Projeto full-stack para simulação de operações de arbitragem entre DEXs na rede Polygon, integrando:
- Contrato inteligente em Solidity
- Frontend React com TypeScript
- Backend Node.js
- Testes automatizados

## 🏗️ Estrutura do Projeto

```
front+back/
├── contracts/               # Contratos inteligentes
│   └── ArbitrageSimulator.sol  # Lógica de simulação de arbitragem
├── src/                     # Frontend React
│   ├── App.tsx              # Componente principal do dashboard
│   ├── arbitrage.js         # Lógica de detecção de arbitragem
│   └── web3-utils.js        # Utilitários de conexão Web3
├── test/                    # Testes
│   └── arbitrage.test.cjs   # Testes da lógica de arbitragem
├── server.js                # Backend Node.js
└── hardhat.config.js        # Configuração do ambiente Hardhat
```

## 🤖 Componentes Principais

### Contrato Inteligente (`ArbitrageSimulator.sol`)
- `simulateArbitrageOperation()`: Simula operação completa de arbitragem
- `_calculateArbitrage()`: Calcula lucro líquido considerando taxas
- `internalSimulateArbitrage()`: Lógica interna de simulação com checagem de preços

### Frontend (`src/App.tsx`)
- Dashboard interativo com:
  - Status de conexão da carteira
  - Histórico de simulações
  - Estatísticas de lucro
  - Detalhes de oportunidades detectadas

### Backend (`src/arbitrage.js`)
- `checkArbitrage()`: Algoritmo principal de detecção de oportunidades
- Funções auxiliares:
  - `estimateGas()`: Simulação de custos de transação
  - `calculateProfit()`: Cálculo de lucro líquido
  - `executeArbitrageSimulation()`: Execução simulada via callStatic

### Utilitários Web3 (`web3-utils.js`)
- `connectWallet()`: Conexão com provedor Ethereum
- `simulateFlashLoanTransaction()`: Simulação de flash loan
- `testSepoliaTransaction()`: Teste de transações na rede de testes

## 🧪 Testes (`test/arbitrage.test.cjs`)
- Testes de validação de:
  - Cálculo de lucro
  - Detecção de oportunidades
  - Simulação de transações
  - Integração com contrato inteligente

## ▶️ Execução
```bash
npm install
npm run dev       # Frontend
node server.js    # Backend
