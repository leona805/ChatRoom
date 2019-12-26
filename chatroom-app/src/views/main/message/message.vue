<!--登陆成功页面-->
<template>
  <div
    class="message"
  >
    message

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
    // console.log(store.currentCountData)
  },
  methods: {
    
  }
}
</script>

<style scoped lang='less'>
</style>
