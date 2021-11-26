<template>
  <div>
    <div class="container gird text-green-500 text-lg">
      <h1
        class="
          font-bold
          text-5xl
          py-4
          text-green-400
          select-none
          flex flex-row flex-nowrap
          justify-between
        "
      >
        <span> Octopus Game #1 <span class="text-lg">testnet demo</span></span>
        <span> <ConnectWallet /></span>
      </h1>
      <div class="py-8 text-3xl font-bold flex flex-wrap">
        <router-link
          class="mr-12 nav-btn"
          :class="$route.path === '/' ? 'under-line' : ''"
          to="/"
          >New Game</router-link
        >
        <router-link
          class="mr-12 nav-btn"
          :class="$route.path === '/logs' ? 'under-line' : ''"
          to="/logs"
          >Logs</router-link
        >
        <router-link
          class="mr-12 nav-btn"
          :class="$route.path === '/market' ? 'under-line' : ''"
          to="/market"
          >Market</router-link
        >
        <router-link
          class="mr-12 nav-btn"
          :class="$route.path === '/mint' ? 'under-line' : ''"
          to="/mint"
          >Mint</router-link
        >
        <router-link
          class="mr-12 nav-btn"
          :class="$route.path === '/about' ? 'under-line' : ''"
          to="/about"
          >About</router-link
        >
        <!-- <ConnectWallet /> -->
      </div>
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import ConnectWallet from './components/ConnectWallet.vue';
export default defineComponent({
  components: {
    ConnectWallet,
  },
});
</script>
<style>
.container {
  padding-inline: 2em;
  margin-inline: auto;
  min-height: 100vh;
  font-family: monospace;
}
ul li {
  display: inline-block;
}
.nav-btn {
  user-select: none;
}
.under-line {
  padding-bottom: 6px;
  border-bottom: 2px #589f85b3 solid;
}
</style>
