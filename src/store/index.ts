import { createStore } from 'vuex';
export default createStore({
  state: {
    address: '0x0000000000000000000000000000000000000000',
    login: false,
    chainId: 0,
    balance: 0,
    myInviter: '0x0000000000000000000000000000000000000000',
    inviteCount: 0,

    lastMintTime: 0,
    currentMintingCountDown: '',

    unFinishedPower: 0,
  },
  mutations: {
    setUser(state, address: string) {
      state.address = address;
      state.login =
        address === '0x0000000000000000000000000000000000000000' ? false : true;
    },
    setChain(state, chainId: number) {
      state.chainId = chainId;
    },
    setMyInviter(state, myInviter: string) {
      if (!myInviter) {
      } else {
        state.myInviter = myInviter;
      }
    },
    setInvite(state, inviteCount: number) {
      state.inviteCount = inviteCount;
    },
    setMyLastMintTime(state, lastMintTime: number) {
      state.lastMintTime = lastMintTime;
      setCountDownTime(lastMintTime * 1000 + 24 * 60 * 60 * 1000);
      function setCountDownTime(endDateMilliSeconds: number) {
        // debugger;

        clearInterval(countdownInterval);
        if (endDateMilliSeconds > Date.now()) {
          countdownInterval = setInterval(() => {
            Countdown(endDateMilliSeconds);
          }, 1000);
        } else {
          state.currentMintingCountDown = '';
        }
      }

      function Countdown(endDateMilliSeconds: number) {
        const now = Date.now();
        const diffSec = Math.floor((endDateMilliSeconds - now) / 1000);
        state.currentMintingCountDown = formatTimegap(diffSec);
      }
    },
    setMyLastMint(
      state,
      { lastMintTime, power }: { lastMintTime: number; power: number }
    ) {
      state.lastMintTime = lastMintTime;
      state.unFinishedPower = power;
      setCountDownTime(lastMintTime * 1000 + 24 * 60 * 60 * 1000);
      function setCountDownTime(endDateMilliSeconds: number) {
        // debugger;

        clearInterval(countdownInterval);
        if (endDateMilliSeconds > Date.now()) {
          countdownInterval = setInterval(() => {
            Countdown(endDateMilliSeconds);
          }, 1000);
        } else {
          state.currentMintingCountDown = '';
        }
      }

      function Countdown(endDateMilliSeconds: number) {
        const now = Date.now();
        const diffSec = Math.floor((endDateMilliSeconds - now) / 1000);
        state.currentMintingCountDown = formatTimegap(diffSec);
      }
    },
  },
  actions: {},
  modules: {},
});

let countdownInterval: NodeJS.Timer;

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
