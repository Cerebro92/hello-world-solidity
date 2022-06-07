const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require('./compile');

// const mnemonicPhrase = "toe month powder wage burden moment need speed section vivid drama custom";
require('dotenv').config();
const { API_URL, MNEMONIC_PHRASE } = process.env;


let provider = new HDWalletProvider({
  mnemonic: {
    phrase: MNEMONIC_PHRASE
  },
  providerOrUrl: API_URL
});

const web3 = new Web3(provider);


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(interface)
                    .deploy({ data: bytecode, arguments: ['Hello!']})
                    .send({ gas: '1000000', from: accounts[0] });
    console.log('contract deployed to', result.options.address);
}

deploy();
