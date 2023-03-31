const EnergyTrading = artifacts.require("EnergyTrading");

module.exports = function (deployer, network, accounts) {
  const seller = accounts[0];
  const initialExcessEnergy = 10;
  const maxEnergyToSell = 100;

  deployer.deploy(EnergyTrading, seller, initialExcessEnergy, maxEnergyToSell);
};
