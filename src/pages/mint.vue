<template>
  <div>
    <h3 class>Want to:</h3>
    <div>
      <div class="text-red-500" v-if="!store.state.login">
        You need to login to mint tokens.
      </div>
      <div>
        <div class="my-4">
          <span
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
            @click="btnMintCoin"
            >Mint</span
          >
          Power:500 (Mint ends in:
          {{ info.currentMintingCountDown }})
        </div>
        <div class="my-4">
          <span
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
            >Claim</span
          >
          OCGT:0
        </div>
        <div class="my-4">
          <span
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
            @click="btnInvite"
            >Invite</span
          >
          Invited:0
        </div>
        <div v-show="info.copied" class="text-yellow-500">
          Your invite URL is copied to your clip board.
        </div>
      </div>
    </div>

    <div>
      You can mint Octopus Game Token by 0.001 BNB. Each mint will last for 1
      day. The token amount will equal to your power value when you began mint.
    </div>
    <div>
      You will get 500 power when your first connect. After invite a friend
      minting, you will get other 100 power. Power limits up to 2500.
    </div>
    <div>Airdrop will be available for the community in the future.</div>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
const route = useRoute();

import { copy } from '../js/utils/copyText';
const store = useStore();
import { requestLoginMetamask } from '../js/web3/index';

// import { requestLoginMetaMask } from "../js/web3/getWeb3";

import { mintCoin } from '../js/web3/gameMethods';

const info = reactive({
  myInviter: '',
  myAddress: '0x0000000000000000000000000000000000000000', //updata when connect to wallet
  myPower: 500,
  canMintnow: false,
  canClaim: false,

  currentMintingTime: 0,
  currentMintingCountDown: '',

  copied: false,
});

onMounted(async () => {
  const myInviter = route.query.i as string;
  store.commit('setMyInviter', myInviter);
  info.canMintnow = (await checkCanMintNow()) as boolean;
  mintStarted('');
});

function btnInvite() {
  // needConnected
  copy(`${location.host}/mint?i=${store.state.address}`);
  info.copied = true;
  setTimeout(() => {
    info.copied = false;
  }, 2000);
}

function walletLogined() {
  return store.state.login;
}

async function btnMintCoin() {
  if (!walletLogined()) {
    await requestLoginMetamask();
  }

  const power = upgradePower();
  if (await checkCanMintNow()) {
    mintCoin({
      power,
      whoInviteMe: store.state.myInviter,
      myAccount: store.state.address,
    }).then(res => {
      console.log(res);
      const { startTime } = res.events.MintCoin.returnValues;
      mintStarted(startTime);
    });
  } else {
    console.log('can not mint now');
  }
}

async function mintStarted(startTime: string) {
  function getMintingTime() {
    return new Promise((resolve, reject) => {
      resolve(1637599732);
    });
  }

  const mintingTime = startTime || (await getMintingTime());
  info.currentMintingTime = (mintingTime as number) * 1000;
  setCountDownTime(info.currentMintingTime);
}

function checkCanMintNow() {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}

function upgradePower(): number {
  return info.myPower;
}

let countdownInterval: any;
function setCountDownTime(endDateMilliSeconds: number) {
  clearInterval(countdownInterval);
  if (endDateMilliSeconds > Date.now()) {
    countdownInterval = setInterval(() => {
      Countdown(endDateMilliSeconds);
    }, 1000);
  } else {
    info.currentMintingCountDown = '';
  }
}

function Countdown(endDateMilliSeconds: number) {
  const now = Date.now();
  const diffSec = Math.floor((endDateMilliSeconds - now) / 1000);
  info.currentMintingCountDown = formatTimegap(diffSec);
}

function formatTimegap(times: number) {
  if (times < 0) {
    return '';
  }

  const days = Math.floor(times / 3600 / 24);
  const hours = Math.floor(times / 3600) - days * 24;
  const mins = Math.floor(times / 60) - days * 24 * 60 - hours * 60;
  const secs = times - days * 24 * 3600 - hours * 3600 - mins * 60;
  // let string = days ? days + " " : "";
  // string += (hours ? hours : "00") + ":";
  // string += (mins ? (mins > 9 ? mins : "0" + mins) : "00") + ":";
  // string += (secs > 9 ? "" : "0") + secs;
  const string = `${days}D ${hours}H ${mins}M ${secs}S`;
  return string;
}
</script>
