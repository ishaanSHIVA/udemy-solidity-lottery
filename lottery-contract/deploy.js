const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const fs = require("fs");

const provider = new HDWalletProvider(
  "tennis cross exact piece dentist later fit salmon tree bar rib merit",
  "https://rinkeby.infura.io/v3/d10c1d8208ba4806877b7723f8016977"
);
const web3 = new Web3(provider);

function write(contract) {
  fs.writeFileSync(
    "../lottery-react/src/data/lotteryData.js",
    `export const abi = ${interface}\nexport const lotteryContractAddress = "${contract}"`
  );
  console.log("written");
}

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });
  console.log(interface);
  console.log("Contract deployed to", result.options.address);
  write(result.options.address);
  provider.engine.stop();
};
deploy();
