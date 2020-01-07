<!--登陆页面-->
<template>
  <div class="login">
    <div class="hello">
      <span>登录</span>
    </div>
    <p>微聊号/手机号码登陆</p>
    <div class="account">
      <span>账号</span>
      <input
        type="text"
        placeholder="请填写微聊号/手机号"
        v-model="item.account"
      >
    </div>
    <div class="password">
      <span>密码</span>
      <input
        type="password"
        placeholder="请填写密码"
        v-model="item.password"
        @keyup.enter="login"
      >
    </div>
    <div class="login">
      <button @click="this.login">登录</button>
    </div>
    <div class="corpright">
      <span>微聊天室weChatRoom v1.0</span>
    </div>
  </div>
</template>

<script>
// import login from '@store/store';
import axios from 'axios'
import store from '../store/index'
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userData: [],
      item: {
        account: '',
        password: ''
      }
    }
  },
  created () {
    if (localStorage.account) this.item.account = localStorage.account;
  },
  methods: {
    login: function () {
      axios.post('/api/login', {
        params: {
          account: this.item.account,
          password: this.item.password
        }
      })
        .then((res) => {
          if (res.data.status.status === 200) {
            localStorage.setItem('account', res.data.User[0].account)// 保存当前登陆的账号信息
            this.$router.push('/main') //路由跳转
            this.userData = res.data.User;
            store.title = '微聊天室'; //标题
            sessionStorage.setItem(`title`, '微聊天室')
            if (res.data.User[0].allData) {
              store.currentCountData = res.data.User[0].allData; //保存当前账号的所有内部信息
              sessionStorage.setItem(`currentCountData`, JSON.stringify(res.data.User[0].allData))
            } else {
              store.currentCountData = []; //保存当前账号的所有内部信息
              sessionStorage.setItem(`currentCountData`, JSON.stringify([]))
            }
          } else {
            this.item.password = '';
            alert(res.data.status.message)
          }
        }).catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped='scoped' lang='less'>
.login {
  .hello {
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    background-color: rgb(8, 182, 235);
    > span {
      color: white;
    }
  }
  > p {
    font-size: 1.5rem;
    margin-left: 0.5rem;
  }
  .account {
    height: 2rem;
    margin-top: 1rem;
    margin-left: 0.5rem;
    border-bottom: 0.05rem solid #ccc;
    > span {
      font-size: 0.8rem;
    }
    > input {
      height: calc(2rem - 0.2rem);
      outline: none;
      margin-left: 0.8rem;
      border: 0;
    }
    > input[placeholder] {
      font-size: 0.9rem;
    }
  }
  .password {
    height: 2rem;
    margin-top: 1rem;
    margin-left: 0.5rem;
    border-bottom: 0.05rem solid #ccc;
    > span {
      font-size: 0.8rem;
    }
    > input {
      height: calc(2rem - 0.2rem);
      outline: none;
      margin-left: 0.8rem;
      border: 0;
    }
    > input[placeholder] {
      font-size: 0.9rem;
    }
  }
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    > button {
      height: 2.5rem;
      width: 80%;
      margin-top: 5rem;
      border: 0;
      border-radius: 5px;
      background-color: rgb(8, 182, 235);
      color: white;
      font-size: 1.2rem;
    }
  }
  .corpright {
    display: flex;
    justify-content: center;
    span {
      font-size: 0.5rem;
      color: #ccc;
      height: 1rem;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
