var fs = require("fs");
const Factory = artifacts.require("UniswapV2Factory.sol");
//const Router = artifacts.require("UniswapV2Router02.sol");
const WETH = artifacts.require("WETH.sol");
const ProximaTkn = artifacts.require("ProximaToken.sol");

module.exports = async function (deployer, _network, addresses) {
  const [admin, _] = addresses;

  const weth = await WETH.at("0xd0A1E359811322d97991E03f863a0C30C2cF029C");
  const pToken = await ProximaTkn.at(
    "0x23589e647B0Ca8e0A938Ee815Cc2e415c712FBaA"
  );

  await deployer.deploy(Factory, admin);
  const factory = await Factory.deployed();

  await factory.createPair(weth.address, pToken.address);

  const pairCodeHash = await factory.pairCodeHash();

  //await deployer.deploy(Router, factory.address, weth.address);
  //const router = await Router.deployed();

  console.log("deployer", admin);
  console.log("pToken", pToken.address);
  console.log("pWeth", weth.address);
  console.log("pFactory", factory.address);
  console.log("pairCodeHash", pairCodeHash);

  var dict = {
    deployer: admin,
    pFactory: factory.address,
    pWeth: weth.address,
    pToken: pToken.address,
    initHas: pairCodeHash,
  };

  var dictstring = JSON.stringify(dict);
  fs.writeFile("proximaSwap.json", dictstring, function (err, result) {
    if (err) console.log("error", err);
  });
};
//0xb89b57a93c0966b7a20ab0aa0fdf534c6eead4b3568e2c21e734d0a58530531e
