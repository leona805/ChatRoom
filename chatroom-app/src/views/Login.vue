<!--登陆页面-->
<template>
  <div class="main_container">
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
  </div>
</template>

<script>
// import login from '@store/store';
import axios from 'axios'
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
  // created:vue生命周期中的钩子函数，在这个时间点，data中的数据已经注入到响应式系统中
  created () {
    axios.post('/api/login')
      .then((res) => {
        if (res.status === 200) {
          this.userData = res.data
        }
      }).catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    login: function () {
      let flag = false;//flag判断账号密码是否输入正确
      this.userData.length > 0 && this.userData.map(p => {
        if (p.account === this.item.account && p.password === this.item.password) {
          this.$router.push('/main')
          flag = true;
        }
      })
      if (!flag)
        alert('账号或密码输入错误')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped='scoped' lang='less'>
.main_container {
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
}
</style>
