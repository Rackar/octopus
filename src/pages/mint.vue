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
          Power: {{ store.getters.power }}
          <span
            v-if="
              store.state.login &&
              store.state.lastMintTime &&
              store.state.currentMintingCountDown
            "
            >(Mint ends in: {{ store.state.currentMintingCountDown }})</span
          >
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
            @click="btnClaim"
            >Claim</span
          >
          OCGT:{{ store.state.unClaimCoin - store.state.unFinishedPower }}
          <span
            v-if="
              store.state.login &&
              store.state.lastMintTime &&
              store.state.currentMintingCountDown
            "
            >(Current Minting: {{ store.state.unClaimFakeRealtime }})</span
          >
        </div>
        <Popup v-model="info.showClaimPopup">
          <div>
            <div>
              <div>
                Claim limit :
                {{ store.state.unClaimCoin - store.state.unFinishedPower }}
              </div>
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
                @click="btnClaimCoin"
              >
                Submit
              </button>
            </div>
          </div>
        </Popup>
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
          Invited:{{ store.state.inviteCount }}
          <span v-show="info.copied" class="text-yellow-500">
            Your invite URL is copied to your clip board.
          </span>
        </div>
      </div>
    </div>

    <div>
      You can mint Octopus Game Token by 0.001 BNB. Each mint will last for 1
      day. The token amount will equal to your power value when you began mint.
    </div>
    <div>
      You will get 500 power when your first connect. After invite a friend
      minting, you will get other 100 power. Power limits up to 1500.
    </div>
    <div>Airdrop will be available for the community in the future.</div>
  </div>
</template>
<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
const route = useRoute();

import { copy } from '../js/utils/copyText';
const store = useStore();
import { requestLoginMetamask } from '../js/web3/index';

// import { requestLoginMetaMask } from "../js/web3/getWeb3";

import { mintCoin, claimCoin } from '../js/web3/gameMethods';

import Popup from '../plugins/Popup.vue';

const POWER_INIT = 500;
const POWER_INVITE = 100;
const POWER_LIMIT = 1500;

const info = reactive({
  myInviter: '',
  myAddress: '0x0000000000000000000000000000000000000000', //updata when connect to wallet
  myPower: computed(() => {
    const power = POWER_INIT + POWER_INVITE * store.state.inviteCount;
    return power > POWER_LIMIT ? POWER_LIMIT : power;
  }),
  myOCGT: 0,
  myInviteCount: 0,
  myMintStarted: false,

  canMintnow: false,
  canClaim: false,

  currentMintingTime: 0,
  currentMintingCountDown: '',

  copied: false,

  showClaimPopup: false,
  userClaimInput: 0,

  showWarning: false,
});

onMounted(async () => {
  const myInviter = route.query.i as string;
  store.commit('setMyInviter', myInviter);
  info.canMintnow = (await checkCanMintNow()) as boolean;
  // mintStarted('');
});

// function TogglePopup() {
//   info.showPopup = !info.showPopup;
// }

async function btnInvite() {
  if (!walletLogined()) {
    await requestLoginMetamask();
  }

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

  const power = info.myPower;
  if (await checkCanMintNow()) {
    mintCoin({
      power,
      whoInviteMe: store.state.myInviter,
      myAccount: store.state.address,
    }).then((res: any) => {
      console.log(res);
      const { startTime, power } = res.events.MintCoin.returnValues;
      mintStarted({ startTime, power });
    });
  } else {
    console.log('can not mint now');
  }
}

async function mintStarted({
  startTime,
  power,
}: {
  startTime: string;
  power: string;
}) {
  // function getMintingTime() {
  //   return new Promise((resolve, reject) => {
  //     resolve(store.state.lastMintTime);
  //   });
  // }

  if (startTime) {
    store.commit('setMyLastMint', {
      lastMintTime: parseInt(startTime),
      power: parseInt(power),
    });
  }

  // debugger;

  // const mintingTime = startTime || store.state.lastMintTime;
  // info.currentMintingTime = (mintingTime as number) * 1000;
  // setCountDownTime(info.currentMintingTime);
}

function checkCanMintNow() {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
}

async function btnClaim() {
  if (!walletLogined()) {
    await requestLoginMetamask();
  }

  info.showClaimPopup = !info.showClaimPopup;
}

async function btnClaimCoin() {
  const { userClaimInput } = info;

  if (userClaimInput > store.state.unClaimCoin - store.state.unFinishedPower) {
    info.showWarning = true;
    return;
  }

  if (await checkCanMintNow()) {
    claimCoin({
      amount: userClaimInput,
      myAccount: store.state.address,
    }).then((res: any) => {
      console.log(res);
    });
  } else {
    console.log('can not mint now');
  }
}
// let countdownInterval: any;
// function setCountDownTime(endDateMilliSeconds: number) {
//   clearInterval(countdownInterval);
//   if (endDateMilliSeconds > Date.now()) {
//     countdownInterval = setInterval(() => {
//       Countdown(endDateMilliSeconds);
//     }, 1000);
//   } else {
//     info.currentMintingCountDown = '';
//   }
// }

// function Countdown(endDateMilliSeconds: number) {
//   const now = Date.now();
//   const diffSec = Math.floor((endDateMilliSeconds - now) / 1000);
//   info.currentMintingCountDown = formatTimegap(diffSec);
// }

// function formatTimegap(times: number) {
//   if (times < 0) {
//     return '';
//   }

//   const days = Math.floor(times / 3600 / 24);
//   const hours = Math.floor(times / 3600) - days * 24;
//   const mins = Math.floor(times / 60) - days * 24 * 60 - hours * 60;
//   const secs = times - days * 24 * 3600 - hours * 3600 - mins * 60;
//   // let string = days ? days + " " : "";
//   // string += (hours ? hours : "00") + ":";
//   // string += (mins ? (mins > 9 ? mins : "0" + mins) : "00") + ":";
//   // string += (secs > 9 ? "" : "0") + secs;
//   const string = `${days}D ${hours}H ${mins}M ${secs}S`;
//   return string;
// }
</script>
