<template>
    <div>
      <transition name='move'>
        <div ref='food' class='food' v-show='showFlag'>
          <div class='img-header'>
              <img class='img' v-lazy='food.image' :key='food.image' alt="">
              <div class="back"  @click='shutdown'>
                 <i class='icon-arrow_lift'></i>
              </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class='price-item'>
                  <span class='ico'>￥</span>
                  <span class='p'>{{food.price}}</span>
              </span>
              <span class='oldprice' v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol ref='ctc' :food='food'></cartcontrol>
            </div>
            <transition name='tog'>
              <div @click='add' class="buy" v-show='!food.count||food.count===0'>
               加入购物车
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </div>
</template>
<script>
import Bscroll from 'better-scroll'
import cartcontrol from '../../components/cartcontrol/cartcontrol'
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  components: {
    cartcontrol
  },
  methods: {
    show () {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    add () {
      this.$refs.ctc.addCart()
    },
    shutdown () {
      this.showFlag = false
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixin'
@import '../../common/stylus/variable'
@import '../../common/stylus/base'
.food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background #fff
    transition all .3s linear
    &.move-enter,&.move-leave-to
      transition all .3s linear
      transform translate3d(100%,0,0)
    &.move-enter-active,&.move-leave-active
      transition all .3s ease-in-out
  .img-header
    position relative
    width 100%
    height 0
    padding-top 100%
    .img
      position absolute
      width 100%
      height 100%
      top 0
      left 0
    .back
      position absolute
      top 10px
      left 0
      .icon-arrow_lift
        display block
        padding 10px
        font-size $fontsize-large-xx
        color #fff
  .content
    padding 18px
    position relative
    .title
      font-size $fontsize-medium
      font-weight 700
      margin-bottom 8px
      color rgb(7,17,27)
    .detail
      margin-bottom 18px
      line-height 10px
      font-size 0
      height 10px
      .sell-count,.rating
        font-size $fontsize-small-s
        color rgb(147,153,159)
      .sell-count
        margin-right 12px
    .price
     .price-item
         color red
         font-weight 700
         line-height 24px
         margin-right 8px
         .ico
           font-size $fontsize-small-s
         .p
           font-size $fontsize-medium
     .oldprice
         color rgb(147,153,159)
         font-size $fontsize-small-s
         font-weight 700
         line-height 24px
         text-decoration line-through
    .cartcontrol-wrapper
      position absolute
      right 12px
      bottom 12px
    .buy
      position absolute
      height 24px
      line-height 24px
      border-radius 12px
      background $color-blue
      color #fff
      z-index 10
      padding 0 12px
      right 18px
      bottom 18px
      &.tog-enter-active,&.tog-leave-active
        transition all .3s
      &.tog-enter, &.tog-leave-active
        opacity: 0
        z-index: -1
</style>
