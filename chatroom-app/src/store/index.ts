import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentCountData: sessionStorage.getItem('currentCountData')||{}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
