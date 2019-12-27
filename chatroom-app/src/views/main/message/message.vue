<!--登陆成功页面-->
<template>
  <div class="message">
    <!--每个聊天列表的显示-->
    <div
      class="message_container"
      v-for="item in $store.currentCountData.chatList"
      :key="item.name"
    >
      <!--头像显示-->
      <div class="headPortrait">
        <div class="headPortrait_container">
          <img :src="getImgUrl(item.img)">
        </div>
      </div>
      <div class="showNickname">
        <!--昵称显示-->
        <p>{{item.name}}</p>
        <!--最后一条聊天记录显示-->
        <span>{{item.ExistingInformation[item.ExistingInformation.length-1].message}}</span>
      </div>

      <!--未读显示-->
      <div class="Unread">
        {{item.state}}
      </div>
    </div>

    <!--左滑删除\置顶功能-->
    <div class="delete">

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '../../../store/index'
export default {
  name: 'Message',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    console.log(store.currentCountData)
  },
  methods: {
    getImgUrl (img) {
      return require(`../../../assets/${img}`);
    },
  }
}
</script>

<style scoped lang='less'>
.message {
  height: 100%;
  background-color: #f2f2f2;
  .message_container {
    height: 5rem;
    background-color: white;
    border-bottom: 0.05rem solid rgb(221, 221, 221);
    display: flex;
    align-items: center;
    .headPortrait {
      width: 5rem;
      height: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      .headPortrait_container {
        width: 3rem;
        height: 3rem;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        background-color: #ccc;
        overflow: hidden;
        img {
          width: 3rem;
          height: 3rem;
        }
      }
    }
    .showNickname {
      width: calc(100% - 5.5rem);
      height: 4rem;
      float: left;
      p {
        width: 100%;
        height: 1.5rem;
        margin: 0;
      }
      span {
        display: inline-block;
        width: 100%;
        height: 2.5rem;
        font-size: 0.8rem;
        color: #ccc;
      }
    }
    .Unread { 
      color: red;
    }
  }
}
</style>
