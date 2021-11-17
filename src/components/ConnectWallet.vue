<template>
  <span class="absolute right-4 top-2 text-md">
    <span
      v-if="!store.state.login"
      class="
        border-success-200 border-solid
        rounded-md
        border-2
        cursor-pointer
        select-none
        text-sm
        p-1
      "
      @click="connect"
      >connect wallet</span
    >
    <span v-else class="text-sm">{{
      store.state.address.substr(0, 5) +
      '...' +
      store.state.address.substr(-3, 5)
    }}</span>
  </span>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ConnectWallet',
});
</script>
<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
// import { useState } from '@/js/utils/state';
/*****************************************/
/* Detect the MetaMask Ethereum provider */
/*****************************************/

import detectEthereumProvider from '@metamask/detect-provider';
import { requestLoginMetamask } from '../js/web3/index';
import Web3 from 'web3';
const provider = null;
let currentAccount = '';
const store = useStore();
// const $bus = useState('bus', () => {
//   return { login: false, address: '0x0' };
// });
// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    // Do any other work!
    console.log('Account changed:', currentAccount);
    // $bus.value.login = true;
    // $bus.value.address = currentAccount;
    store.commit('setAddress', currentAccount);
  }
}

async function changeChainId(chainId = 0x2a) {
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

async function handleChainChanged(_chainId) {
  const ALLOWED_CHAIN_IDS = [1, 3, 4, 5, 42, 0x2a, 0x38];
  console.log('chain changed to', _chainId);
  if (!ALLOWED_CHAIN_IDS.includes(_chainId)) {
    console.log('chain wrong');
  }
  // We recommend reloading the page, unless you must do otherwise
  // window.location.reload();
}

onMounted(async () => {
  // const { provider, chainId, account, login } = await initWeb3();
  // $bus.value.login = login;
  // $bus.value.address = account;
  // // this returns the provider, or null if it wasn't detected
  // provider = await detectEthereumProvider();
  // if (provider) {
  //   startApp(provider); // Initialize your app
  // } else {
  //   console.log("Please install MetaMask!");
  // }
  // function startApp(provider) {
  //   // If the provider returned by detectEthereumProvider is not the same as
  //   // window.ethereum, something is overwriting it, perhaps another wallet.
  //   // if (provider !== window.ethereum) {
  //   //   console.error("Do you have multiple wallets installed?");
  //   // }
  //   // Access the decentralized web!
  // }
  // /**********************************************************/
  // /* Handle chain (network) and chainChanged (per EIP-1193) */
  // /**********************************************************/
  // const chainId = await provider.request({ method: "eth_chainId" });
  // handleChainChanged(chainId);
  // provider.on("chainChanged", handleChainChanged);
  // /***********************************************************/
  // /* Handle user accounts and accountsChanged (per EIP-1193) */
  // /***********************************************************/
  // provider
  //   .request({ method: "eth_accounts" })
  //   .then(handleAccountsChanged)
  //   .catch((err) => {
  //     // Some unexpected error.
  //     // For backwards compatibility reasons, if no accounts are available,
  //     // eth_accounts will return an empty array.
  //     console.error(err);
  //   });
  // // Note that this event is emitted on page load.
  // // If the array of accounts is non-empty, you're already
  // // connected.
  // provider.on("accountsChanged", handleAccountsChanged);
});

/*********************************************/
/* Access the user's accounts (per EIP-1102) */
/*********************************************/

// You should only attempt to request the user's accounts in response to user
// interaction, such as a button click.
// Otherwise, you popup-spam the user like it's 1999.
// If you fail to retrieve the user's account(s), you should encourage the user
// to initiate the attempt.
// document.getElementById("connectButton", connect);

// While you are awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can click to initiate the request.
// MetaMask will reject any additional requests while the first is still
// pending.
async function connect() {
  await requestLoginMetamask();
}
</script>
