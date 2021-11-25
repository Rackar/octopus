import Web3 from 'web3';
// import { web3instance } from './getWeb3';
import { address_GAME } from '../contract/GAME_ABI';
import { getInstaceResult } from './index';
import { weiToCount, countToWei } from './Utils';

//给新版本的合约发币
function transferToGame() {
  return new Promise((resolve, reject) => {
    getInstaceResult().then(ins => {
      ins.coinContract.methods
        .transfer(address_GAME, 1000000000)
        .send({ from: ins.account })
        .then(result => {
          console.log(`new contract: ${JSON.stringify(result)}`);
          resolve(result);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  });
}

//判断是否领取过
function dNFTidToAccountToFetched(dnftid, address_User) {
  return new Promise((resolve, reject) => {
    web3instance.dloliContract.methods
      .dNFTidToAccountToFetched(dnftid, address_User)
      .call()
      .then(result => {
        console.log(`you had fetch LOLI: ${JSON.stringify(result)}`);
        resolve(result);
      })
      .catch(e => {
        console.log(e);
        reject(e);
      });
  });
}

//领取
function fetchLOLI(dnftid) {
  return new Promise((resolve, reject) => {
    web3instance.dloliContract.methods
      .fetchLOLI(dnftid)
      .send({ from: web3instance.account })
      .then(result => {
        console.log(`you got LOLI: ${JSON.stringify(result)}`);
        resolve(result);
      })
      .catch(e => {
        console.log(e);
        reject(e);
      });
  });
}

export { transferToGame };
