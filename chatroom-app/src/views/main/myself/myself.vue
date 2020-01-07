<!--登陆成功页面-->
<template>
  <div
    class="myself"
    @click="this.delete"
  >
    myself
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Myself',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.$store.title = '个人中心'; //标题
    sessionStorage.setItem(`title`, '个人中心')
  },
  methods: {
    delete: function () {//删除注销账号操作,
      axios.post('/api/UserDelete', {
        params: {
          account: localStorage.account
        }
      })
        .then((res) => {
          if (res.status === 200) {//删除后记得回到登陆页面
            console.log(res)
            this.$router.push('/')
          }
        }).catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang='less'>
</style>
