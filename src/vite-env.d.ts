declare module '*.js' {
  // Adicione aqui as interfaces para as funções exportadas
  // Exemplo:
  // export function simulateFlashLoanTransaction(): Promise<void>;
}

declare module './web3-utils' {
  interface SimulationResult {
    sucesso: boolean;
    lucro?: number;
    tempoExecucao: number;
    erro?: string;
  }

  export { 
    simulateFlashLoanTransaction, 
    testSepoliaTransaction,
    SimulationResult 
  };
}
