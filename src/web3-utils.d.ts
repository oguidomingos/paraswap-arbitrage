declare module './web3-utils' {
  export function connectWallet(): Promise<any>;
  export function simulateFlashLoanTransaction(): Promise<any>;
  export function testSepoliaTransaction(): Promise<any>;
}