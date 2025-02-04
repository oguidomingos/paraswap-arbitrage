import { ethers } from 'ethers';

async function connectWallet() {
  try {
    // Em ambiente de testes do Hardhat, usamos o provider interno:
    const provider = ethers.provider;
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    console.log("Rede conectada:", network);
    return { provider, signer };
  } catch (error) {
    console.error("Erro ao conectar à carteira:", error);
    return null;
  }
}

async function simulateFlashLoanTransaction() {
  const wallet = await connectWallet();
  if (!wallet) return;

  const { signer } = wallet;
  const fromAddress = await signer.getAddress();
  const tx = {
    to: fromAddress, // Enviando para si mesmo para fins de simulação
    value: ethers.utils.parseEther("0.001")
  };

  console.log("Parâmetros da transação simulada:", tx);

  try {
    const estimatedGas = await signer.estimateGas(tx);
    console.log("Gás estimado:", estimatedGas.toString());

    const gasPrice = await signer.getGasPrice();
    console.log("Preço do gás:", gasPrice.toString());

    const estimatedCost = estimatedGas.mul(gasPrice);
    console.log("Custo estimado (wei):", estimatedCost.toString());

    const simulationResult = await signer.call(tx);
    console.log("Resultado da simulação (callStatic):", simulationResult);
  } catch (error) {
    console.error("Erro durante a simulação da transação:", error);
  }
}

async function testSepoliaTransaction() {
  const wallet = await connectWallet();
  if (!wallet) return;

  const { signer } = wallet;
  const fromAddress = await signer.getAddress();

  // Configuração da transação de teste
  const tx = {
    to: fromAddress,
    value: ethers.utils.parseEther("0.0001"),
    data: "0x", // Dados opcionais para a transação
  };

  console.log("Iniciando teste de transação na rede Sepolia...");

  try {
    // Verificação estática da transação (callStatic)
    const staticResult = await signer.callStatic(tx);
    console.log("Resultado da simulação (callStatic):", staticResult);

    // Cálculo das estimativas de gás e custo
    const estimatedGas = await signer.estimateGas(tx);
    const gasPrice = await signer.getGasPrice();
    const estimatedCost = estimatedGas.mul(gasPrice);

    console.log("\nEstatísticas da transação:");
    console.log("Gás estimado:", estimatedGas.toString());
    console.log("Preço do gás:", gasPrice.toString());
    console.log("Custo estimado:", ethers.utils.formatEther(estimatedCost), "ETH");

    // Verificação se a transação deve ser executada com sucesso
    if (staticResult) {
      console.log("\nTransação simulada com sucesso!");
    } else {
      console.log("\nTransação simulada falhou. Verifique os parâmetros.");
    }
  } catch (error) {
    console.error("\nErro durante o teste da transação:", error);
  }
}

export { connectWallet, simulateFlashLoanTransaction, testSepoliaTransaction };