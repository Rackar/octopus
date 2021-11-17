import { createStore } from 'vuex';

export default createStore({
  state: {
    address: '0x0',
    login: false,
    balance: 0,
  },
  mutations: {
    setUser(state, address) {
      state.address = address;
      state.login = address === '0x0' ? false : true;
    },
  },
  actions: {},
  modules: {},
});
