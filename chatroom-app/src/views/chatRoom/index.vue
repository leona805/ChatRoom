<!--登陆成功页面-->
<template>
  <div class="chatRoom">
    <div class="title">
      <img
        src="../../assets/back.png"
        @click="back"
      >
      <span>{{this.data.Nickname}}</span>
      <div class="function">

      </div>
    </div>
    <div class="content">

    </div>
    <div class="footer">

    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatRoom',
  data () {
    return {
      data: {},
    }
  },
  created () {
    console.log(this.$store.currentChat,sessionStorage)
    this.data = this.$store.currentChat ? this.$store.currentChat : JSON.parse(sessionStorage.getItem('currentChat'))
    // let data = this.$store.currentCountData ? this.$store.currentCountData : JSON.parse(sessionStorage.getItem('currentCountData'));

  },
  methods: {
    back () {
      this.$router.push('/main/message')
    }
  }
}
</script>

<style scoped lang='less'>
.chatRoom {
  height: 100%;
  .title {
    height: 2.5rem;
    line-height: 2.5rem;
    background-color: rgb(8, 182, 235);
    position: relative;
    text-align: center;
    > img {
      width: 2rem;
      height: 2rem;
      position: absolute;
      left: 0;
      top: 0.25rem;
    }
    > span {
      color: white;
    }
    .function {
      width: 5rem;
      height: 2rem;
      border-radius: 25px;
      background-color: rgba(47, 97, 173, 0.356);
      position: absolute;
      right: 0.5rem;
      top: 0.25rem;
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
