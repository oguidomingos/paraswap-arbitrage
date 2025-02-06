const { expect } = require('chai'); 
const { ethers } = require('hardhat');

describe('ArbitrageSimulator', function () {
  let contract;
  let owner;

  before(async function () {
    [owner] = await ethers.getSigners();
    
    const ContractFactory = await ethers.getContractFactory('ArbitrageSimulator');
    contract = await ContractFactory.deploy();
    await contract.waitForDeployment();
  });

  it('Deve retornar sucesso quando o lucro é positivo', async function () {
    const tx = await contract.simulateArbitrageOperation(
      ethers.parseUnits("1000", 6),  // 1000 USDC
      ethers.parseUnits("1", 18),     // Preço de entrada 1.0
      ethers.parseUnits("1.1", 18),   // Preço de saída 1.1
      90                              // 0.9% de taxa
    );

    await expect(tx)
      .to.emit(contract, 'SimulationResult')
      .withArgs(
        owner.address,
        true,
        ethers.parseUnits("99.1", 6), // Lucro esperado
        ethers.parseUnits("0.001", 18), // Custo de gás estimado
        async (timestamp) => timestamp > 0
      );
  });

  it('Deve retornar falha quando o preço de saída é menor', async function () {
    const tx = await contract.simulateArbitrageOperation(
      ethers.parseUnits("1000", 6),
      ethers.parseUnits("1", 18),
      ethers.parseUnits("0.95", 18), // Preço de saída menor
      90
    );

    await expect(tx)
      .to.emit(contract, 'SimulationResult')
      .withArgs(
        owner.address,
        false,
        0,
        ethers.parseUnits("0.001", 18),
        async (timestamp) => timestamp > 0
      );
  });

  it('Deve falhar com preços inválidos', async function () {
    await expect(
      contract.simulateArbitrageOperation(
        ethers.parseUnits("1000", 6),
        0, // Preço de entrada inválido
        ethers.parseUnits("1.1", 18),
        90
      )
    ).to.be.revertedWith("Invalid prices");
  });
});