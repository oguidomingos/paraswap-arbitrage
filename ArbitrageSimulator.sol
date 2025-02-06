// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArbitrageSimulator {

    event SimulationResult(
        address indexed sender,
        bool success,
        uint256 profit,
        uint256 gasCost,
        uint256 timestamp
    );

    function simulateArbitrageOperation(
        uint256 flashLoanAmount,
        uint256 priceIn,
        uint256 priceOut,
        uint256 feeBps
    ) external {
        uint256 startGas = gasleft();
        
        (bool arbitrageSuccess, uint256 profit, uint256 gasCost) = _calculateArbitrage(
            flashLoanAmount,
            priceIn,
            priceOut,
            feeBps
        );

        emit SimulationResult(
            msg.sender,
            arbitrageSuccess,
            profit,
            gasCost,
            block.timestamp
        );
    }

    function _calculateArbitrage(
        uint256 flashLoanAmount,
        uint256 priceIn,
        uint256 priceOut,
        uint256 feeBps
    ) internal returns (bool, uint256, uint256) {
        try this.internalSimulateArbitrage(flashLoanAmount, priceIn, priceOut, feeBps) 
            returns (bool success, uint256 profit, uint256 gasCost) 
        {
            return (success, profit, gasCost);
        } catch {
            return (false, 0, 0);
        }
    }

    function internalSimulateArbitrage( 
        uint256 flashLoanAmount,
        uint256 priceIn,
        uint256 priceOut,
        uint256 feeBps
    ) external returns (bool, uint256, uint256) {
        require(priceIn > 0 && priceOut > 0, "Invalid prices");
        
        uint256 repayment = flashLoanAmount + ((flashLoanAmount * feeBps) / 10000);
        uint256 revenue = (flashLoanAmount * priceOut) / priceIn;
        
        if (revenue <= repayment) {
            return (false, 0, 0);
        }

        uint256 gasUsed = 21000 + (msg.data.length * 16); // Estimativa básica
        uint256 gasCost = gasUsed * tx.gasprice;
        uint256 profit = revenue - repayment - gasCost;

        return (profit > 0, profit, gasCost);
    }
}