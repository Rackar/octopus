<template>
  <div>
    <h3 class="">TOKEN:</h3>
    <div>
      <span
        @click="btnBuyCoin"
        class="
          border-success-200
          p-1
          border-solid
          rounded-md
          border-2
          px-3
          mx-5
          my-2
          cursor-pointer
          select-none
        "
      >
        Buy OCGT
      </span>
    </div>
    <div class="mt-2">
      <a
        class="
          border-success-200
          p-1
          border-solid
          rounded-md
          border-2
          px-3
          mx-5
          my-2
          cursor-pointer
          select-none
        "
        href="https://github.com/kovan-testnet/faucet"
        >Kovan faucet to get test-net ETH</a
      >
    </div>

    <Popup v-model="info.showClaimPopup">
      <div>
        <div>
          How much OCGT would you buy? Exchange rate (1000000 OCGT: 1 ETH)
        </div>
        <div>
          <input type="number" v-model="info.userClaimInput" />
          <button
            class="
              border-success-200
              p-1
              border-solid
              rounded-md
              border-2
              px-3
              mx-5
              my-2
              cursor-pointer
              select-none
            "
            @click="btnConfirmBuyCoin"
          >
            Submit
          </button>
        </div>
      </div>
    </Popup>
    <h3 class="mt-6">NFT:</h3>
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <figure
        class="mt-8 md:flex rounded-xl p-8 md:p-0"
        v-for="i in 4"
        :key="i"
      >
        <img
          class="md:rounded-none rounded-full"
          :src="'/img/panda' + i + '.png'"
          alt=""
          width="400"
          height="300"
        />
        <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p class="text-lg font-semibold">name: 2021.11.11 08:00:00</p>
          </blockquote>
          <figcaption class="font-medium">
            <div>Owner: 0xsdfio...sdfso</div>
            <div>Price: 1E</div>
            <div>BUY</div>
          </figcaption>
        </div>
      </figure>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from '@vue/reactivity';
import Popup from '../plugins/Popup.vue';
import { buyCoin } from '../js/web3/gameMethods';

const info = reactive({
  showClaimPopup: false,
  userClaimInput: 1000,
});

function btnBuyCoin() {
  console.log('');
  info.showClaimPopup = true;
}

function btnConfirmBuyCoin() {
  const RATE = 1000000;
  buyCoin({ amount: (info.userClaimInput / RATE) * 1000 });
}
</script>
