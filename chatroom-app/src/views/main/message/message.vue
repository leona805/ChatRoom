<!--登陆成功页面-->
<template>
  <div
    class="message"
    @click="skipall"
  >
    <!--每个聊天列表的显示-->
    <div
      class="message_container .transtion"
      v-for="(item) in data.chatList"
      :key="item.account"
      v-cloak
    >
      <!--滑动-->
      <div
        class="list_box"
        @touchstart="touchStart"
        @touchend="touchEnd"
        @touchmove="touchmove"
        @click="skip(item)"
      >
        <!--头像显示-->
        <div class="headPortrait">
          <div class="headPortrait_container">
            <img :src="getImgUrl(item.img)">
          </div>
        </div>
        <div class="showNickname">
          <!--昵称显示-->
          <p>{{item.Nickname}}</p>
          <!--最后一条聊天记录显示-->
          <span>{{item.ExistingInformation[item.ExistingInformation.length-1].message}}</span>
        </div>
        <!--时间显示-->
        <div class="time">
          <span>
            {{getTime(item.ExistingInformation[item.ExistingInformation.length-1].time)}}
          </span>
          <!--未读显示           优化可做免提醒灰色显示-->
          <div
            class="Unread"
            v-if="item.state > 0"
          >
            <span>{{item.state}}</span>
          </div>
        </div>

        <!--左滑删除\置顶功能-->
        <div
          class="delete"
          @click.stop="deleteItem(item)"
        >
          <span>删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Message',
  data () {
    return {
      data: {},
      startX: 0,
      endX: 0,
    }
  },
  created () {
    this.$store.title = '微聊天室'; //标题
    sessionStorage.setItem(`title`, '微聊天室')
    this.data = this.$store.currentCountData ? this.$store.currentCountData : JSON.parse(sessionStorage.currentCountData);
  },
  methods: {
    //返回img的url地址
    getImgUrl (img) {
      return require(`../../../assets/${img}`);
    },
    //得到时间
    getTime (time) {
      let _time = ''
      if (time.split(' ')[1].split(':')[0] >= 6 && time.split(' ')[1].split(':')[0] < 12) {
        _time = '上午'
      }
      else if (time.split(' ')[1].split(':')[0] >= 12 && time.split(' ')[1].split(':')[0] < 13) {
        _time = '中午'
      }
      else if (time.split(' ')[1].split(':')[0] >= 13 && time.split(' ')[1].split(':')[0] < 18) {
        _time = '下午'
      }
      else if (time.split(' ')[1].split(':')[0] >= 18 && time.split(' ')[1].split(':')[0] < 24) {
        _time = '晚上'
      }
      else if (time.split(' ')[1].split(':')[0] >= 24 && time.split(' ')[1].split(':')[0] < 6) {
        _time = '凌晨'
      }
      return _time + time.split(' ')[1].split(':')[0] + ':' + time.split(' ')[1].split(':')[1]
    },
    skipall () {
      if (this.checkSlide()) {
        this.restSlide();
      }
    },
    //跳转
    skip (item) {
      if (this.checkSlide()) {
        this.restSlide();
      } else {
        this.$store.currentChat = item; //保存当前点击的聊天信息
        sessionStorage.setItem(`currentChat`, JSON.stringify(item))
        this.$router.push('/chatroom') //路由跳转
      }
    },
    //滑动开始
    touchStart (e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX;
    },
    //滑动中
    touchmove (e) {
      let parentElement = e.currentTarget.parentElement;
      let width = document.getElementsByClassName('delete')[0].offsetWidth;
      if (this.checkSlide()) {//有滑动状态
        this.restSlide();
        console.log('true')
      } else {
        let right = this.startX - e.changedTouches[0].clientX;
        if (right > width) right = width;
        if (right < 0) right = 0;
        parentElement.style.right = right + 'px';
      }
    },
    //滑动结束
    touchEnd (e) {
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement;
      let width = document.getElementsByClassName('delete')[0].offsetWidth;
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;
      // 左滑,_show为标记是否已经左滑
      if (!parentElement._show && this.startX - this.endX > 1) {
        parentElement._show = true;
        parentElement.style.right = width + 'px';
      }
      // 右滑
      if (parentElement._show && this.startX - this.endX < -1) {
        parentElement._show = false;
      }
      this.startX = 0;
      this.endX = 0;
    },
    //判断当前是否有滑块处于滑动状态
    checkSlide () {
      let listItems = document.querySelectorAll('.message_container');
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i]._show) {
          return true;
        }
      }
      return false;
    },
    //复位滑动状态
    restSlide (e) {
      let listItems = document.querySelectorAll('.message_container');
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i]._show) {
          listItems[i].style.right = 0 + 'px';
          listItems[i]._show = false;
        }
      }
    },
    //删除
    deleteItem (e) {
      axios.post('/api/MessageListDelete', {
        params: {
          account: localStorage.account,
          data: e.account
        }
      })
        .then((res) => {
          if (res.status === 200) {
            this.data = res.data.Data[0].allData;
            this.$store.currentCountData = res.data.Data[0].allData; //保存当前账号的所有内部信息
            sessionStorage.setItem(`currentCountData`, JSON.stringify(res.data.Data[0].allData))
          }
        }).catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang='less'>
.message {
  height: 100%;
  background-color: #f2f2f2;
  .transtion {
    transition: all 5s;
    -moz-transition: all 5s;
    -webkit-transition: all 5s;
    -o-transition: all 5s;
  }
  .message_container {
    position: relative;
    height: 5rem;
    background-color: white;
    border-bottom: 0.05rem solid rgb(221, 221, 221);
    .list_box {
      height: 5rem;
      width: 100%;
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
        width: calc(100% - 10rem);
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
      .time {
        font-size: 0.8rem;
        width: 4rem;
        height: 4rem;
        float: left;
        text-align: right;
        > span {
          color: #ccc;
        }
        .Unread {
          width: 1rem;
          height: 1rem;
          background-color: red;
          float: right;
          margin-top: 1.5rem;
          border-radius: 50px;
          text-align: center;
          line-height: 1rem;
          > span {
            font-size: 0.7rem;
            color: white;
          }
        }
      }

      .delete {
        width: 5rem;
        height: 5rem;
        background: #ff4949;
        font-size: 17px;
        color: #fff;
        text-align: center;
        line-height: 5rem;
        position: absolute;
        top: 0;
        right: -5rem;
      }
    }
  }
}
</style>
