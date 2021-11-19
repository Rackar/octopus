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

async function manuallyChangeChainId(chainId = 0x2a, provider) {
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [{ chainId: '0xf00', rpcUrl: 'https://...' /* ... */ }],
        });
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
}

const initWeb3 = async () => {
  const result = {
    login: false,
    account: null,
    chainId: null,
    provider: null,
    coinContract: null,
    nftContract: null,
    gameContract: null,
  };

  debugger;
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
      result.account = '0x0000000000000000000000000000000000000000';
      store.commit('setUser', result.account);
    } else if (accounts[0] !== currentAccount) {
      result.account = accounts[0];
      store.commit('setUser', result.account);
      console.log('Account changed:', result.account);
    }
  }

  async function handleChainChanged(_chainId) {
    const ALLOWED_CHAIN_IDS = [1, 3, 4, 5, 42, 0x2a, 0x38];
    console.log('chain changed to', _chainId);
    if (!ALLOWED_CHAIN_IDS.includes(_chainId)) {
      console.log('chain wrong');
    }

    result.chainId = _chainId;

    store.commit('setChain', _chainId);
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

  result.coinContract = new web3.eth.Contract(ABI_COIN, address_COIN); //dnft
  result.nftContract = new web3.eth.Contract(ABI_NFT, address_NFT); //dnft
  result.gameContract = new web3.eth.Contract(ABI_GAME, address_GAME); //dnft

  result.provider = provider;

  listenEvents(result);

  return result;
};

function listenEvents({ coinContract, nftContract, gameContract, account }) {
  const mintEvent = gameContract.events
    .MintCoin(
      {
        filter: {},

        fromBlock: 0,
      },
      (error, event) => {
        console.log(error, event);
      }
    )
    .on('data', event => {
      console.log(event); // same results as the optional callback above
    })
    .on('changed', event => {
      // remove event from local database
    })
    .on('error', console.error);

  const inviteEvent = gameContract.events
    .InviteSuccess(
      {
        filter: { invitingAddress: account },

        fromBlock: 0,
      },
      (error, event) => {
        console.log(error, event);
      }
    )
    .on('data', event => {
      console.log(event); // same results as the optional callback above
    })
    .on('changed', event => {
      // remove event from local database
    })
    .on('error', console.error);
}

const getMyPastInvites = async ({ gameContract, account }) => {
  gameContract.getPastEvents(
    'InviteSuccess',
    {
      filter: {},
    },
    (error, events) => {
      debugger;
      console.log('past invite:', events);
    }
  );
};

const requestLoginMetamask = async () => {
  const { provider, gameContract, account } = await initWeb3();
  await provider
    .request({ method: 'eth_requestAccounts' })
    .then(data => {
      console.log(data);
      getMyPastInvites({ gameContract, account });
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

export { initWeb3, manuallyChangeChainId, requestLoginMetamask };
