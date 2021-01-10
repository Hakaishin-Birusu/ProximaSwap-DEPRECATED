var fs = require("fs");

const Factory = artifacts.require("uniswapv2/UniswapV2Factory.sol");
const Router = artifacts.require("uniswapv2/UniswapV2Router02.sol");
const WETH = artifacts.require("WETH.sol");
const ProximaTkn = artifacts.require("ProximaToken.sol");

module.exports = async function (deployer, _network, addresses) {
  const [admin, _] = addresses;

  const weth = await WETH.at("0xd0A1E359811322d97991E03f863a0C30C2cF029C");
  const pToken = await ProximaTkn.at(
    "0x23589e647B0Ca8e0A938Ee815Cc2e415c712FBaA"
  );
  const factory = await Factory.at(
    "0x032b7B269A61C5Ec120AEFA2C9BA5e5a8f9Aede1"
  );
  const router = await Router.at("0xE0C5393F8Ff4D6e59E8D9F243587B6E3b48a28E7");

  // await deployer.deploy(Factory, admin);
  // const factory = await Factory.deployed();

  // await factory.createPair(weth.address, pToken.address);

  const pairCodeHash = await factory.pairCodeHash();

  //await deployer.deploy(Router, factory.address, weth.address);
  //const router = await Router.deployed();

  console.log("deployer", admin);
  console.log("pToken", pToken.address);
  console.log("pWeth", weth.address);
  console.log("pFactory", factory.address);
  console.log("pairCodeHash", pairCodeHash);
  console.log("pRouter", router.address);

  var dict = {
    deployer: admin,
    pFactory: factory.factory,
    pRouter: router.address,
    pWeth: weth.address,
    pToken: pToken.address,
  };

  var dictstring = JSON.stringify(dict);
  fs.writeFile("proximaSwap.json", dictstring, function (err, result) {
    if (err) console.log("error", err);
  });
};

//0xa49b8832087aea021f5a6d7a985b009f6e8dd5a4403e5b1f571b45c4fce0aea4
//0xa49b8832087aea021f5a6d7a985b009f6e8dd5a4403e5b1f571b45c4fce0aea4
