<template>
  <div>
    <div class="shopcart">
      <div class="content" @click='toggleList'>
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="cubeic-mall" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">
              {{totalCount}}
            </div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="description">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payDsc}}
          </div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="(ball,index) in balls" :key="index">
          <transition
            @before-enter="beforeDrop"
            @enter="dropping"
            @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name='toggle'>
        <div class="shopcart-list" v-if='listShow'>
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class='empty' @click='empty'>清空</span>
          </div>
          <div ref='listContent' class="list-content">
            <ul class='foods'>
              <li v-for='(food,index) in selectFoods' :key='index' class='food'>
                <span class='name'>{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class='cartcontrol-wrapper'>
                  <cartcontrol :food='food'></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name='fade'>
      <div class="list-mask" v-show='listShow'></div>
    </transition>
  </div>
</template>

<script>
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import Bscroll from 'better-scroll'
const BALL_LEN = 10
const INNERHOOK = 'inner-hook'
function createballs () {
  let balls = []
  for (let i = 0; i < BALL_LEN; i++) {
    balls.push({ show: false })
  }
  return balls
}
export default {
  name: 'shopcarts',
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    cartcontrol
  },
  data () {
    return {
      balls: createballs(),
      fold: true
    }
  },
  created () {
    this.dropBalls = []
  },

  methods: {
    toggleList: function () {
      if (!this.totalCount) {
      } else {
        this.fold = !this.fold
      }
    },
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        const ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop (el) {
      const ball = this.dropBalls[this.dropBalls.length - 1]
      const rect = ball.el.getBoundingClientRect()
      const x = rect.left - 32
      const y = -(window.innerHeight - rect.top - 22)
      el.style.display = ''
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
      const inner = el.getElementsByClassName(INNERHOOK)[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
    },
    dropping (el, done) {
      this._reflow = document.body.offsetHeight
      el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
      const inner = el.getElementsByClassName(INNERHOOK)[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
      el.addEventListener('transitionend', done)
    },
    afterDrop (el) {
      const ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    empty () {
      this.selectFoods.forEach((item) => {
        item.count = 0
      })
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDsc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      }
      return '去结算'
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow () {
      if (!this.totalCount) {
        // this.fold = true
        return false
      } else {
        let show = !this.fold
        return show
      }
    }
  },
  watch: {
    selectFoods (newFoods, oldFoods) {
      if (newFoods.length === 0) {
        this.fold = true
      }
    },
    listShow (newShow, oldShow) {
      if (newShow) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Bscroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    }
  }
}
</script>

<style scoped lang='stylus'>
@import "~common/stylus/mixin"
@import "~common/stylus/variable"
.list-mask
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 90
  background #fff
  background rgba(7,17,27,0.6)
  &.fade-enter
    opacity 0
    transition all .3s linear
  &.fade-leave-to
    opacity 0
  &.fade-enter-active,&.fade-leave-active
    transition all .3s linear
.shopcart
  position fixed
  bottom 0
  left 0
  z-index 100
  width 100%
  height 48px
  .content
    background $color-background
    font-size 0
    display flex
    .content-left
      flex 1
      .logo-wrapper
        display inline-block
        position relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        border-radius 50%
        vertical-align top
        background $color-background
        .logo
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background: $color-dark-grey
          &.highlight
            background rgb(0,160,220)
          .cubeic-mall
            font-size 24px
            color $color-light-grey
            line-height 44px
            &.highlight
              color #fff
        .num
          font-size $fontsize-small-s
          color white
          text-align center
          position absolute
          width 24px
          line-height 16px
          height 16px
          top 0
          right 0
          box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
          background rgb(240,20,20)
          border-radius 16px
      .price
        font-size $fontsize-medium
        display inline-block
        margin-top 12px
        line-height 24px
        padding-right 12px
        border-right 1px solid rgba(255,255,255,0.1)
        font-weight 700
        color rgba(255,255,255,0.4);
        vertical-align top
        &.highlight
          color #fff
      .description
        display inline-block
        color rgba(255,255,255,0.4)
        font-size $fontsize-medium
        line-height 24px
        margin 12px 0 0 12px
        vertical-align top
    .content-right
      flex 0 0 105px
      width 105px
      background #2b333b
      .pay
        font-size 12px
        height 48px
        line-height 48px
        text-align center
        color rgba(255,255,255,0.4)
        &.not-neough
          background #2b333b
        &.enough
          background #00b43c
          color #fff
.ball-container
  .ball
    position: fixed
    left: 32px
    bottom: 22px
    z-index: 200
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
    .inner
      width: 16px
      height: 16px
      border-radius: 50%
      background: $color-blue
      transition: all 0.4s linear
.shopcart-list
  position absolute
  bottom 48px
  left 0
  width 100%
  z-index -1
  &.toggle-enter,&.toggle-enter-to
    transition all .3s ease-in-out
  &.toggle-enter, &.toggle-leave-to
    transform: translate3d(0, 100%, 0)
    opacity 0
  &.toggle-enter-active, &.toggle-leave-active
    transition all .3s ease-in-out
  .list-header
    height 40px
    line-height 40px
    padding 0 18px
    background #f3f5f7
    border-bottom 1px solid rgba(7,17,27,0.1)
    .title
      float left
      font-size $fontsize-medium
      color rgb(7,17,27)
    .empty
      float right
      font-size $fontsize-small
      color rgb(0,160,220)
  .list-content
    padding 0 18px
    max-height 217px
    overflow hidden
    background #fff
    overflow-y scroll
    .food
      position relative
      padding 12px 0
      border-1px(rgba(7,17,27,0.1))
      .name
        line-height 24px
        font-size $fontsize-medium
        color rgb(7,17,27)
      .price
        position absolute
        right 90px
        bottom 12px
        line-height 24px
        font-size $fontsize-medium
        font-weight 700
        color rgb(240,20,20)
      .cartcontrol-wrapper
        position absolute
        right 0
        bottom 6px
</style>
