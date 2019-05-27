<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class='tab'>
      <div class='tab-item'>
        <router-link to="/goods">商品</router-link>
      </div>
      <div class='tab-item'>
        <router-link to="/ratings">评论</router-link>
        </div>
      <div class='tab-item'>
        <router-link to="/seller">商家</router-link>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header'
import { getSeller } from 'api'
export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    getSeller().then((seller) => {
      this.seller = seller
    })
  },
  components: {
    'v-header': header
  }
}
</script>
<style lang="stylus">
@import "./common/stylus/mixin.styl"
#app
  .tab
    display:flex
    width:100%
    line-height:40px
    height :40px
    font-size:14px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex:1
      text-align:center
      & > a
        display block
        &.active
          color:rgb(240,20,20)
</style>
