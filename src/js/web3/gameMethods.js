import Web3 from 'web3';
// import { web3instance } from './getWeb3';
import { getInstaceResult } from './index';
import { weiToCount, countToWei } from './Utils';
import { address_GAME } from '../contract';
const config = {
  defaultSellLastingSecends: 86400,
  defaultUnitPrice: Web3.utils.toWei((0.001).toString()),
};

function mintCoin({ power, whoInviteMe, myAccount }) {
  return new Promise((resolve, reject) => {
    getInstaceResult().then(({ gameContract }) => {
      whoInviteMe = whoInviteMe || '0x0000000000000000000000000000000000000000';
      // debugger;
      gameContract.methods
        .mintCoin(power, whoInviteMe)
        .send({ from: myAccount, value: countToWei(1) })
        .then(result => {
          // debugger;
          console.log(JSON.stringify(result));
          resolve(result);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  });
}

function claimCoin({ amount, myAccount }) {
  return new Promise((resolve, reject) => {
    getInstaceResult().then(({ gameContract }) => {
      gameContract.methods
        .claimMintCoin(amount)
        .send({ from: myAccount })
        .then(result => {
          // debugger;
          console.log(JSON.stringify(result));
          resolve(result);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  });
}

function getCoins() {
  return new Promise((resolve, reject) => {
    getInstaceResult().then(({ gameContract }) => {
      gameContract.methods
        .coinCanClaim()
        .call()
        .then(result => {
          // debugger;
          console.log(JSON.stringify(result));
          resolve(result);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  });
}

// function checkIsOwner() {
//   return new Promise((resolve, reject) => {
//     web3instance.dnftContract.methods
//       .owner()
//       .call()
//       .then(result => {
//         console.log(`owner is: ${JSON.stringify(result)}`);
//         const isOwner =
//           result === Web3.utils.toChecksumAddress(web3instance.account);
//         // debugger;
//         resolve(isOwner);
//       })
//       .catch(e => {
//         console.log(e);
//         reject(e);
//       });
//   });
// }

// //检查艺术家ad是否在白名单中
// function artistWhiteList(artistAddress) {
//   return new Promise((resolve, reject) => {
//     web3instance.dnftContract.methods
//       .artistWhiteList(artistAddress)
//       .call()
//       .then(result => {
//         console.log(`is in whitelist? ${JSON.stringify(result)}`);
//         resolve(result);
//       })
//       .catch(e => {
//         console.log(e);
//         reject(e);
//       });
//   });
// }

// //设置地址为艺术家白名单
// function setArtist(artistAddress) {
//   return new Promise((resolve, reject) => {
//     web3instance.dnftContract.methods
//       .setArtist(artistAddress, true)
//       .send({ from: web3instance.account })
//       // .send() //FIXME 测试去掉from
//       .then(result => {
//         console.log(`set artist: ${JSON.stringify(result)}`);
//         resolve(result);
//       })
//       .catch(e => {
//         console.log(e);
//         reject(e);
//       });
//   });
// }

// //改完未测
// function wrapNFT(contractAd, NFTid) {
//   return new Promise((resolve, reject) => {
//     web3instance.dnftContract.methods
//       .wrap(
//         contractAd,
//         parseInt(NFTid),
//         config.defaultSellLastingSecends,
//         config.defaultUnitPrice
//       )
//       .send({ from: web3instance.account })
//       .then(result => {
//         console.log(`dNFT: ${JSON.stringify(result)}`);
//         // $q.loading.hide();
//         // $q.notify('dnft wrapped.');
//         // $store.commit('example/setNftIdApproved', '');
//         // let dnftUrl = `/nft/${contractAd}/${NFTid}/${result.events.TransferSingle.returnValues.id}`;
//         // current.sellShow = false;
//         // current.sellNFTid = '';
//         // router.push(dnftUrl);

//         resolve(result);
//       })
//       .catch(e => {
//         console.log(e);
//         reject(e);
//       });
//   });
// }

// function idTodNFT(dNFTid) {
//   return new Promise((resolve, reject) => {
//     web3instance.dnftContract.methods
//       .idTodNFT(dNFTid)
//       .call()
//       .then(result => {
//         console.log(`dNFT status: ${JSON.stringify(result)}`);
//         resolve(result);
//       })
//       .catch(e => {
//         console.log(e);
//         reject(e);
//       });
//   });
// }

// function unClaimOf(dNFTid, ownerAddress) {
//   return new Promise((resolve, reject) => {
//     web3instance.dnftContract.methods
//       .unClaimOf(dNFTid, ownerAddress)
//       .call({ from: web3instance.account })
//       .then(result => {
//         console.log(`dNFT claim : ${JSON.stringify(result)}`);
//         resolve(result);
//       })
//       .catch(e => {
//         console.log(e);
//         reject(e);
//       });
//   });
// }

// function claimByOwner(dNFTid) {
//   return new Promise((resolve, reject) => {
//     web3instance.dnftContract.methods
//       .claimPrincipalFunds(dNFTid)
//       .send({ from: web3instance.account })
//       .then(async result => {
//         console.log(`dNFT claim : ${JSON.stringify(result)}`);
//         // await api.post('ownclaim', { dnftid: dNFTid });
//         // current.myOwnList = current.myOwnList.filter(
//         //   (element) => element.dNFTid !== dNFTid
//         // );
//         // current.loadingMyOwnList = false;
//         resolve(result);
//       })
//       .catch(e => {
//         console.log(e);
//         reject(e);
//       });
//   });
// }

// function claim(dNFTid) {
//   return new Promise((resolve, reject) => {
//     web3instance.dnftContract.methods
//       .claim(dNFTid)
//       .send({ from: web3instance.account })
//       .then(result => {
//         console.log(`dNFT claim status: ${JSON.stringify(result)}`);
//         resolve(result);
//       })
//       .catch(e => {
//         console.log(e);
//         reject(e);
//       });
//   });
// }

// ///分配出售NFT的钱给各股东
// function fundNFT(dNFTid, number) {
//   return new Promise((resolve, reject) => {
//     web3instance.dnftContract.methods
//       .fundNFT(dNFTid)
//       .send({
//         from: web3instance.account,
//         value: Web3.utils.toWei(number.toString()),
//       })

//       .then(result => {
//         console.log(`fundNFT status: ${JSON.stringify(result)}`);
//         resolve(result);
//       })
//       .catch(e => {
//         console.log(e);
//         reject(e);
//       });
//   });
// }

// function dNFTbuyer(dNFTid, number = 1) {
//   return new Promise((resolve, reject) => {
//     web3instance.dnftContract.methods
//       .dNFTbuyer(dNFTid)
//       .send({
//         from: web3instance.account,
//         value: countToWei(number),
//       })
//       .then(result => {
//         console.log(`dNFT buy status: ${JSON.stringify(result)}`);
//         resolve(result);
//       })
//       .catch(e => {
//         console.log(e);
//         reject(e);
//       });
//   });
// }

// function takeNFT(dNFTid) {
//   return new Promise((resolve, reject) => {
//     web3instance.dnftContract.methods
//       .takeNFT(dNFTid)
//       .send({ from: web3instance.account })
//       .then(result => {
//         console.log(`take out dNFT: ${JSON.stringify(result)}`);
//         resolve(result);
//       })
//       .catch(e => {
//         console.log(e);
//         reject(e);
//       });
//   });
// }

export { mintCoin, getCoins, claimCoin };
