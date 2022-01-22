const Tether = artifacts.require("Tether");
const Binance = artifacts.require("Binance");
const Henry = artifacts.require("Henry");

module.exports = function (deployer) {
  deployer.deploy(Tether, 10**9);
  deployer.deploy(Binance, 10**9);
  deployer.deploy(Henry, 10**9);
};
