import { createStore } from 'vuex';

export default createStore({
  state: {
    address: '0x0',
    login: false,
    chainId: 0,
    balance: 0,
    myInviter: '0x0',
  },
  mutations: {
    setUser(state, address: string) {
      state.address = address;
      state.login = address === '0x0' ? false : true;
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
