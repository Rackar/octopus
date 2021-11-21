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
    },
  },
  actions: {},
  modules: {},
});
