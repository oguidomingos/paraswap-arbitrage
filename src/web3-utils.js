import { ethers } from 'ethers';

async function connectWallet() {
  if (!window.ethereum) {
    console.error("MetaMask não está instalada. Instale para continuar.");
    return null;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const network = await provider.getNetwork();
    console.log("Rede conectada:", network);

    // Verifica se está conectado à rede Sepolia (chainId: 11155111)
    if (network.chainId !== 11155111) {
      console.warn("Você não está conectado à rede de testes Sepolia.");
    }

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

export { connectWallet, simulateFlashLoanTransaction };