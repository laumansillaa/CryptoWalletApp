const Henry = artifacts.require("Henry");
const Bitcoin = artifacts.require("Bitcoin");
const Tether = artifacts.require("Tether");
const Binance = artifacts.require("Binance");
const Cardano = artifacts.require("Cardano");
const Solana = artifacts.require("Solana");

module.exports = function (deployer) {
  deployer.deploy(Henry, 10**13);
  deployer.deploy(Bitcoin, 10**13);
  deployer.deploy(Tether, 10**13);
  deployer.deploy(Binance, 10**13);
  deployer.deploy(Cardano, 10**13);
  deployer.deploy(Solana, 10**13);
};
