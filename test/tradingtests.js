const EnergyTrading = artifacts.require("EnergyTrading");
const { expect } = require('chai');

contract("EnergyTrading", (accounts) => {
  let energyTradingInstance;

  // Before each test, deploy a new EnergyTrading contract and save the instance
  beforeEach(async () => {
    energyTradingInstance = await EnergyTrading.new(accounts[0], 10, 100);
  });

  it("should allow the seller to approve a buyer", async () => {
    // Act
    await energyTradingInstance.approveBuyer(accounts[1]);

    // Assert
    const isApproved = await energyTradingInstance.approvedBuyers.call(accounts[1]);
    assert.isTrue(isApproved);
  });

  it("should not allow a non-seller to approve a buyer", async () => {
    // Act and Assert
    await assert.reverts(energyTradingInstance.approveBuyer(accounts[1], { from: accounts[1] }), "Only seller can perform this action");
  });

  it("should allow the seller to certify energy as renewable", async () => {
    // Act
    await energyTradingInstance.certifyRenewable();

    // Assert
    const isRenewable = await energyTradingInstance.renewableCertified.call();
    assert.isTrue(isRenewable);
  });

  it("should not allow a non-seller to certify energy as renewable", async () => {
    // Act and Assert
    await assert.reverts(energyTradingInstance.certifyRenewable({ from: accounts[1] }), "Only seller can perform this action");
  });

  it("should allow the seller to certify energy as high quality", async () => {
    // Act
    await energyTradingInstance.certifyQuality();

    // Assert
    const isQuality = await energyTradingInstance.qualityCertified.call();
    assert.isTrue(isQuality);
  });

  it("should not allow a non-seller to certify energy as high quality", async () => {
    // Act and Assert
    await assert.reverts(energyTradingInstance.certifyQuality({ from: accounts[1] }), "Only seller can perform this action");
  });

  it("should allow the seller to store excess energy", async () => {
    // Act
    await energyTradingInstance.storeEnergy(50);

    // Assert
    const excessEnergy = await energyTradingInstance.excessEnergy.call();
    assert.equal(excessEnergy.toNumber(), 50);
  });

  it("should not allow a non-seller to store excess energy", async () => {
    // Act and Assert
    await assert.reverts(energyTradingInstance.storeEnergy(50, { from: accounts[1] }), "Only seller can perform this action");
  });

  it("should allow the seller to sell excess energy to a buyer", async () => {
    // Arrange
    await energyTradingInstance.storeEnergy(50);
    await energyTradingInstance.approveBuyer(accounts[1]);

    // Act
    await energyTradingInstance.sellExcessEnergy(20, accounts[1]);

    // Assert
    const excessEnergy = await energyTradingInstance.excessEnergy.call();
    const isSold = await energyTradingInstance.energySold.call();
    assert.equal(excessEnergy.toNumber(), 30);
    assert.isTrue(isSold);
  });

  it("should not allow the seller to sell more energy than they have stored", async () => {
    // Arrange
    await energyTradingInstance.storeEnergy(10);
    await energyTradingInstance.approveBuyer(accounts[1]);

    // Act and Assert
    await assert.reverts(energyTradingInstance.sellExcessEnergy(20, accounts[1]), "Insufficient excess energy available");
  });
});
