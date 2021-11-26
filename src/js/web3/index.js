import Web3 from 'web3';
// const Web3 = require("web3");
import detectEthereumProvider from '@metamask/detect-provider';
import {
  address_COIN,
  ABI_COIN,
  address_NFT,
  ABI_NFT,
  address_GAME,
  ABI_GAME,
} from '../contract';
// For now, 'eth_accounts' will continue to always return an array

// import { useStore } from 'vuex';
import store from '../../store';

import { getCoins } from './gameMethods';
const instanceResult = {
  init: false,
  login: false,
  account: null,
  chainId: null,
  provider: null,
  coinContract: null,
  nftContract: null,
  gameContract: null,
};

async function switchChain(chainId = '0x2a', provider) {
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });

    reInit();
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xf00',
              chainName: 'Kovan Test net',
              rpcUrls: [''],
            },
          ],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
}

async function getInstaceResult() {
  if (instanceResult.init) {
    return instanceResult;
  } else {
    return await initWeb3();
  }
}

const initWeb3 = async () => {
  // this returns the provider, or null if it wasn't detected
  let provider = await detectEthereumProvider();
  if (provider) {
    startApp(provider); // Initialize your app
  } else {
    console.log('Please install MetaMask!');
    provider = new Web3.providers.WebsocketProvider(
      'wss://kovan.infura.io/ws/v3/bd6e30f7beaf4dc9ad34adf9792bd509',
      {
        clientConfig: {
          keepalive: true,
          keepaliveInterval: 60000, // milliseconds
        },
      }
    );
  }

  const currentAccount = '';

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
      instanceResult.account = '0x0000000000000000000000000000000000000000';
      store.commit('setUser', instanceResult.account);
    } else if (accounts[0] !== currentAccount) {
      instanceResult.account = Web3.utils.toChecksumAddress(accounts[0]);
      store.commit('setUser', instanceResult.account);
      console.log('Account changed:', instanceResult.account);

      reInit();
    }
  }

  async function handleChainChanged(_chainId) {
    // const ALLOWED_CHAIN_IDS = [1, 3, 4, 5, 42, '0x2a', '0x38'];
    const ALLOWED_CHAIN_IDS = ['0x2a'];
    console.log('chain changed to', _chainId);
    if (!ALLOWED_CHAIN_IDS.includes(_chainId)) {
      console.log('chain wrong');
      switchChain('0x2a', provider);
      return;
    }

    instanceResult.chainId = _chainId;

    store.commit('setChain', _chainId);
    reInit();
    // We recommend reloading the page, unless you must do otherwise
    // window.location.reload();
  }

  function startApp(provider) {
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    // if (provider !== window.ethereum) {
    //   console.error("Do you have multiple wallets installed?");
    // }
    // Access the decentralized web!
  }

  /**********************************************************/
  /* Handle chain (network) and chainChanged (per EIP-1193) */
  /**********************************************************/

  const chainId = await provider.request({ method: 'eth_chainId' });
  handleChainChanged(chainId);

  provider.on('chainChanged', handleChainChanged);

  /***********************************************************/
  /* Handle user accounts and accountsChanged (per EIP-1193) */
  /***********************************************************/

  provider
    .request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch(err => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err);
    });

  // Note that this event is emitted on page load.
  // If the array of accounts is non-empty, you're already
  // connected.
  provider.on('accountsChanged', handleAccountsChanged);

  const web3 = new Web3(provider);
  web3.eth.defaultAccount = provider.selectedAddress;
  console.log(`new user address ${provider.selectedAddress}`);

  instanceResult.coinContract = new web3.eth.Contract(ABI_COIN, address_COIN); //dnft
  instanceResult.nftContract = new web3.eth.Contract(ABI_NFT, address_NFT); //dnft
  instanceResult.gameContract = new web3.eth.Contract(ABI_GAME, address_GAME); //dnft

  instanceResult.provider = provider;
  instanceResult.init = true;

  listenEvents(instanceResult);

  return instanceResult;
};

async function reInit() {
  const instance = await getInstaceResult();
  getMyPastInvites(instance);
  getMyLastMint(instance);
  getMyUnclaimCoins();
}

function listenEvents({ coinContract, nftContract, gameContract, account }) {
  // const mintEvent = gameContract.events
  //   .MintCoin({
  //     filter: {},

  //     fromBlock: 0,
  //   })
  //   .on('data', event => {
  //     console.log(event); // same results as the optional callback above
  //   })
  //   .on('changed', event => {
  //     // remove event from local database
  //   })
  //   .on('error', console.error);

  const inviteEvent = gameContract.events.InviteSuccess(
    {
      filter: { invitingAddress: account },

      fromBlock: 0,
    },
    (error, event) => {
      console.log(account);
      if (error) {
        console.log(error);
      }

      console.log(event);
      if (
        event?.returnValues?.invitingAddress ===
        Web3.utils.toChecksumAddress(account)
      ) {
        const count =
          (event?.returnValues?.invitedCount &&
            parseInt(event.returnValues.invitedCount)) ||
          0;
        store.commit('setInvite', count);
      }
    }
  );
  // .on('data', event => {
  //   console.log(event); // same results as the optional callback above
  // })
  // .on('changed', event => {
  //   // remove event from local database
  // })
  // .on('error', console.error);
}

const getMyLastMint = async ({ gameContract, account }) => {
  gameContract.getPastEvents(
    'MintCoin',
    {
      filter: {
        user: Web3.utils.toChecksumAddress(account),
      },
      fromBlock: 0,
      toBlock: 'latest', //必须要有from 和 to， 否则报错
    },
    (error, events) => {
      if (error) {
        console.log(error);
      } else {
        // debugger;
        console.log(events);
        const last = events[events.length - 1];
        let lastStartTime = last?.returnValues?.startTime;
        if (lastStartTime) {
          lastStartTime = parseInt(lastStartTime);
        }

        const toNow = Date.now() - lastStartTime * 1000;
        if (toNow > 0 && toNow < 24 * 60 * 60 * 1000) {
          store.commit('setMyLastMint', {
            lastMintTime: lastStartTime,
            power: parseInt(last.returnValues.power),
          });
        } else {
          store.commit('setMyLastMint', {
            lastMintTime: 0,
            power: 0,
          });
        }
      }
    }
  );
};

const getMyPastInvites = async ({ gameContract, account }) => {
  gameContract.getPastEvents(
    'InviteSuccess',
    {
      filter: {
        invitingAddress: Web3.utils.toChecksumAddress(account),
      },
      fromBlock: 0,
      toBlock: 'latest', //必须要有from 和 to， 否则报错
    },
    (error, events) => {
      console.log('past invite:', events.length);
      if (error) {
        console.log(error);
      } else {
        console.log(events);
        store.commit('setInvite', events.length);
      }
    }
  );
};

async function getMyUnclaimCoins() {
  let coins = await getCoins();
  coins = coins && parseInt(coins);
  store.commit('setMyUnclaimCoins', coins);
}

const requestLoginMetamask = async () => {
  const instance = await getInstaceResult();
  await instance.provider
    .request({ method: 'eth_requestAccounts' })
    .then(data => {
      console.log(data);
      getMyPastInvites(instance);
      getMyLastMint(instance);
      getMyUnclaimCoins();
    })
    .catch(err => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
};

export { initWeb3, getInstaceResult, switchChain, requestLoginMetamask };
