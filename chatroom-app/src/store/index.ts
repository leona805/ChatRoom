import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title:sessionStorage.getItem('title')||{},
    currentCountData: sessionStorage.getItem('currentCountData')||{},
    currentChat: sessionStorage.getItem('currentChat')||{}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
