import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title:sessionStorage.getItem('title')||{},          //主页面的三个子组件title
    currentCountData: sessionStorage.getItem('currentCountData')||{},  //保存登录账号的所有数据
    currentChat: sessionStorage.getItem('currentChat')||{}    //保存当前聊天的账号数据
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
