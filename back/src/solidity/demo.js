function transaction1() {
  const Web3 = require("web3");
  const web3 = new Web3("https://rinkeby.infura.io/v3/2e21aa2a3ce240cba5fb414a25b9441c")
  const ADMIN_ETHEREUM_PUBLIC_KEY = "0x2B9053Efa489e3ADae5B973C236Caa517F4eB3ca";
  const ADMIN_ETHEREUM_PRIVATE_KEY = "3938a426e43709d8ed4f98a4ffdd90df9b54286f8b0950d97db54c43c34d35f6";
  const purchaseAmount = 4

  async function generator(tokenSymbol) {
    try {
      let json;
      switch(tokenSymbol) {
        case "USDT":
          json = require("./build/contracts/Tether.json");
        case "BNB":
          json = require("./build/contracts/Binance.json");
        case "HNR":
          json = require("./build/contracts/Henry.json");
      }

      const networkId = await web3.eth.net.getId();
      const contract = new web3.eth.Contract(
        json.abi,
        json.networks[networkId].address
      );

      return contract;
    } catch(error) { console.error(error) }
  };

  async function executer() {
    try{
      const to = "0x372e9BF1EDdC2b0F01015000623B7bCA6dE74A8b";
      const tokenContract = await generator("BNB");
      const amount = Math.floor(purchaseAmount*10**4);
      const tx = await tokenContract.methods.transfer(to, amount);
      const data = await tx.encodeABI();
      const gas = await tx.estimateGas({ from: ADMIN_ETHEREUM_PUBLIC_KEY });
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(ADMIN_ETHEREUM_PUBLIC_KEY);
      console.log(web3.utils.fromWei(gasPrice, "ether"))
      console.log(gas)
      const signedTx = await web3.eth.accounts.signTransaction({
        to: tokenContract.options.address, 
        data,
        gas,
        gasPrice,
        nonce, 
      }, ADMIN_ETHEREUM_PRIVATE_KEY);

      const accounts = await web3.eth.getAccounts();
      console.log('accounts' ,accounts)
    
      console.log(`Old balance value: ${await tokenContract.methods.balanceOf(to).call()}`);
      console.log(`Old admin balance value: ${await tokenContract.methods.balanceOf(ADMIN_ETHEREUM_PUBLIC_KEY).call()}`);
      console.log(signedTx)
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(`Transaction hash: ${receipt.transactionHash}`);
      console.log(`New balance value: ${await tokenContract.methods.balanceOf(to).call()}`);
      console.log(`New admin balance value: ${await tokenContract.methods.balanceOf(ADMIN_ETHEREUM_PUBLIC_KEY).call()}`);
    } catch(error) {console.error(error)}
  }
  executer()
}


function transaction2() {
  const Web3 = require("web3");
  const web3Provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
  const TruffleContract = require("truffle-contract")
  const ADMIN_ETHEREUM_PUBLIC_KEY = "0x0016Feb33e1B87eE99Ef154fFf84eD844BfC6920";
  const ADMIN_ETHEREUM_PRIVATE_KEY = "dae5e262be2e58c2230606e908f062c0340ececad156033c38b24c2a696fdfd7";
  const purchaseAmount = 9

  async function generator(tokenSymbol) {
    try {
      let json;
      switch(tokenSymbol) {
        case "USDT":
          json = require("./build/contracts/Tether.json");
        case "BNB":
          json = require("./build/contracts/Binance.json");
        case "HNR":
          json = require("./build/contracts/Henry.json");
      }

      const contract = TruffleContract(json);
      contract.setProvider(web3Provider);
      const deployed = await contract.deployed();

      return deployed;
    } catch(error) { console.error(error) }
  };

  async function executer() {
    try{
      const tokenContract = await generator("BNB");
      const amount = Math.floor(purchaseAmount*10**4);
      const receipt = await tokenContract.transfer('0x62673f98Fb202E131425C8ec3D447865D0a4cbF1', amount, {from: "0x0f025623701D22aBc243E3F6d9Fc07375B811304" })

      console.log('recipt', receipt)
    
      console.log(`user balance: ${await tokenContract.balanceOf('0x62673f98Fb202E131425C8ec3D447865D0a4cbF1')}`);
      console.log(`admin balance: ${await tokenContract.balanceOf("0x0f025623701D22aBc243E3F6d9Fc07375B811304")}`);
    } catch(error) {console.error(error)}
  }

  executer();
}

transaction1();
