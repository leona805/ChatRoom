<!--登陆成功页面-->
<template>
  <div class="main">
    <div class="title">
      <span>{{this.data}}</span>
      <div></div>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <router-link to="/main/message">消息</router-link>
      <router-link to="/main/addressBook">通讯录</router-link>
      <router-link to="/main/myself">我</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      data:''
    }
  },
  created () {
    this.data = this.$store.title ? this.$store.title: sessionStorage.getItem('title')
  },
  updated() {
    this.data = this.$store.title ? this.$store.title: sessionStorage.getItem('title')
  },
  methods: {

  }
}
</script>

<style scoped lang='less'>
.main {
  height: 100%;
  .title {
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    background-color: rgb(8, 182, 235);
    > span {
      color: white;
    }
  }
  .content {
    height: calc(100% - 5rem);
    overflow: hidden;
  }
  .footer {
    width: 100%;
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    background-color: rgb(8, 182, 235);
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    > a {
      color: white;
      text-decoration: none;
    }
    > button {
      height: 2.5rem;
      width: 80%;
      border: 0;
      border-radius: 5px;
      background-color: rgb(8, 182, 235);
      color: white;
      font-size: 1rem;
      line-height: 2.5rem;
    }
  }
}
</style>
