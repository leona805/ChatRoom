import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Main from '../views/main/main.vue';
import Message from '../views/main/message/message.vue';
import AddressBook from '../views/main/address/addressbook.vue';
import Myself from '../views/main/myself/myself.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/main',
    redirect: '/main/message',
    name: 'Main',
    component: Main,
    children: [
      {
        path: 'message',
        name: 'Message',
        component: Message
      },
      {
        path: 'AddressBook',
        name: 'AddressBook',
        component: AddressBook
      },
      {
        path: 'Myself',
        name: 'Myself',
        component: Myself
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
