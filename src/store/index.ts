import { createStore } from 'vuex';

export default createStore({
  state: {
    address: '0x0',
    login: false,
    chainId: 0,
    balance: 0,
  },
  mutations: {
    setUser(state, address) {
      state.address = address;
      state.login = address === '0x0' ? false : true;
    },
    setChain(state, chainId) {
      state.chainId = chainId;
    },
  },
  actions: {},
  modules: {},
});
