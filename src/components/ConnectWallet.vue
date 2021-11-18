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

<script setup lang="ts">
import { useStore } from 'vuex';
// import { useState } from '@/js/utils/state';
/*****************************************/
/* Detect the MetaMask Ethereum provider */
/*****************************************/

import { requestLoginMetamask } from '../js/web3/index';
const store = useStore();

async function connect() {
  await requestLoginMetamask();
}
</script>
