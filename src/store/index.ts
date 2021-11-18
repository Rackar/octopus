import { createStore } from 'vuex';
export default createStore({
  state: {
    address: '0x0000000000000000000000000000000000000000',
    login: false,
    chainId: 0,
    balance: 0,
    myInviter: '0x0000000000000000000000000000000000000000',
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
  },
  actions: {},
  modules: {},
});
