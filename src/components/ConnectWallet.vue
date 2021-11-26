<template>
  <span class="right-4 top-2 text-md min-w-max whitespace-nowrap">
    <span
      v-if="
        store.state.login &&
        store.state.address === '0x65D17D3dC59b5ce3d4CE010eB1719882b3f10490'
      "
      class="
        border-success-200 border-solid
        rounded-md
        border-2
        cursor-pointer
        select-none
        text-sm
        p-1
      "
      @click="transToGame"
      >new game contract</span
    >
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
      store.state.address.substr(-4, 5)
    }}</span>
  </span>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
// import { useState } from '@/js/utils/state';
/*****************************************/
/* Detect the MetaMask Ethereum provider */
/*****************************************/

import { requestLoginMetamask } from '../js/web3/index';
import { transferToGame } from '../js/web3/coinMethods';
import { manageCreateNewMatch } from '../js/web3/gameMethods';
const store = useStore();

async function connect() {
  await requestLoginMetamask();
}

async function transToGame() {
  // await transferToGame();
  await manageCreateNewMatch();
}
</script>
