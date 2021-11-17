import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import {
  address_COIN,
  ABI_COIN,
  address_NFT,
  ABI_NFT,
  address_GAME,
  ABI_GAME,
} from '../contract';

let web3instance = {
  web3: null,
  account: null,
  chainId: null,
  dnftContract: null,
  nftContract: null,
  dloliContract: null,
};

const init = provider => {
  if (!provider) {
    if (window.ethereum) {
      // 已登录
      provider = window.ethereum;
    } else {
      // 未登录
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
  }

  provider.on('accountsChanged', setIns);

  provider.on('chainChanged', setIns);
  function setIns() {
    const web3 = new Web3(provider);
    web3.eth.defaultAccount = provider.selectedAddress;
    console.log(`new user ad ${provider.selectedAddress}`);
    const account = provider.selectedAddress;
    const { chainId } = provider;

    const coinContract = new web3.eth.Contract(ABI_COIN, address_COIN); //dnft
    const nftContract = new web3.eth.Contract(ABI_NFT, address_NFT); //dnft
    const gameContract = new web3.eth.Contract(ABI_GAME, address_GAME); //dnft

    web3instance = {
      web3,
      account,
      chainId,
      coinContract,
      nftContract,
      gameContract,
    };
    return web3instance.account;
  }

  return setIns();
};

const requestLoginMetaMask = async cb => {
  const provider = await detectEthereumProvider();
  if (provider) {
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    }); //根据官方文档新的激活方式

    function handleChainChanged(_chainId) {
      // debugger;
      // We recommend reloading the page, unless you must do otherwise
      web3instance.chainId = _chainId;
      // window.location.reload();
    }

    function handleAccountsChanged(accounts) {
      // debugger;
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== web3instance.account) {
        web3instance.account = accounts[0];
        cb(accounts[0]);
        // Do any other work!
      } else {
        cb(accounts[0]);
      }
    }

    const chainId = await provider.request({ method: 'eth_chainId' });
    handleChainChanged(chainId);

    provider
      .request({ method: 'eth_accounts' })
      .then(handleAccountsChanged)
      .catch(err => {
        console.error(err);
      });
    provider.removeListener('accountsChanged', () => {});
    provider.removeListener('chainChanged', () => {});
    provider.on('accountsChanged', handleAccountsChanged);

    provider.on('chainChanged', handleChainChanged);
    init(provider);

    //添加代币显示到钱包
    //  addCoinToWalletInFirstTime(provider);

    return true;
  } else {
    return false;
  }
};

async function addCoinToWalletInFirstTime(provider) {
  const LOLIoption = {
    address: address_LOLI, // The address that the token is at.
    symbol: 'LOLI', // A ticker symbol or shorthand, up to 5 chars.
    decimals: 18, // The number of decimals in the token
    image: 'https://s3.jpg.cm/2021/06/05/ILIDjT.png', // A string url of the token logo
  };
  const savedOption = localStorage.getItem('LOLIoption');
  const optionStr = `${LOLIoption.address}${LOLIoption.symbol}${LOLIoption.decimals}${LOLIoption.image}`;
  if (optionStr !== savedOption) {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: LOLIoption,
        },
      });
      if (wasAdded) {
        console.log('Thanks for your interest!');
        localStorage.setItem('LOLIoption', optionStr);
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const loginGetAddress = async () => {
  if (window.ethereum && window.ethereum.selectedAddress) {
    return ethereum.selectedAddress;
  } else {
  }
};

export { requestLoginMetaMask, init, web3instance };
