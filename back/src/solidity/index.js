const Web3 = require("web3");
const web3 = new Web3(process.env.INFURA_URL);

module.exports = async function(tokenSymbol) {
  try {
    let json;
    if (tokenSymbol === "HNR") json = require("./build/contracts/Henry.json");
    if (tokenSymbol === "BTC") json = require("./build/contracts/Bitcoin.json");
    if (tokenSymbol === "USDT") json = require("./build/contracts/Tether.json");
    if (tokenSymbol === "BNB") json = require("./build/contracts/Binance.json");;
    if (tokenSymbol === "ADA") json = require("./build/contracts/Cardano.json");
    if (tokenSymbol === "SOL") json = require("./build/contracts/Solana.json");

    const networkId = await web3.eth.net.getId();
    const contract = new web3.eth.Contract(
      json.abi,
      json.networks[networkId].address
    );

    return contract;
  } catch(error) { console.error(error) }
};


