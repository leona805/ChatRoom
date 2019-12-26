<!--登陆成功页面-->
<template>
  <div
    class="main"
    @click="this.delete"
  >
    message

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Message',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    delete: function () {
      axios.post('/api/UserDelete', {
        params: {
          account: '123456'
        }
      })
        .then((res) => {
          if (res.status === 200) {
            console.log(res)
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
