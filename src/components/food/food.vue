<template>
    <div>
      <transition name='move'>
        <div ref='food' class='food' v-show='showFlag'>
          <cube-scroll ref='scroll'>
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
              <cartcontrol @add='addl' ref='ctc' :food='food'></cartcontrol>
            </div>
            <transition name='tog'>
              <div @click='add' class="buy" v-show='!food.count||food.count===0'>
               加入购物车
              </div>
            </transition>
          </div>
          <split v-show='food.info'></split>
          <div class="info" v-show='food.info'>
            <h1 class="title">
              商品信息
            </h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class='rating'>
            <h1 class="title">商品评价</h1>
            <ratingselect @toggle='togglecontent' @select='select' :select-type='selectType' :only-content='onlyContent' :desc='desc' :ratings='food.ratings'></ratingselect>
            <div class="rating-wrapper">
              <ul v-show='food.ratings && food.ratings.length'>
                <li v-show="needShow(rating.rateType,rating.text)" v-for='(rating,index) in food.ratings' class='rating-item' :key='index'>
                  <div class='user'>
                    <span class='name'>{{rating.username}}</span>
                    <img class='avatar' width='12' height='12' :src='rating.avatar'>
                  </div>
                  <div class='time'>
                    {{rating.rateTime | formateDate}}
                  </div>
                  <p class='text'>
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class='no-rating' v-show='!food.ratings || !food.ratings.length'>
                暂无评价
              </div>
            </div>
          </div>
          </cube-scroll>
        </div>
      </transition>
    </div>
</template>
<script>
import ratingselect from '../../components/ratingselect/ratingselect'
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import split from '../../components/split/split'
import { formateDate } from 'common/js/date'
const ALL = 2
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  created () {
    this.$on('show', () => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    })
  },
  filters: {
    formateDate (time) {
      let date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    addl (el) {
      this.$emit('add', event.target)
    },
    show () {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = false
    },
    add () {
      this.$refs.ctc.addCart()
      this.$emit('add', event.target)
    },
    shutdown () {
      this.showFlag = false
    },
    select (type) {
      this.selectType = type
    },
    togglecontent (toggle) {
      this.onlyContent = toggle
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
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
      font-size $fontsize-small
      &.tog-enter-active,&.tog-leave-active
        transition all .3s
      &.tog-enter, &.tog-leave-active
        opacity: 0
        z-index: -1
  .info
    padding 18px
    .title
      line-height 14px
      margin-bottom 6px
      font-size $fontsize-medium
      color rgb(77,85,93)
    .text
      padding 0 8px
      font-size $fontsize-small
      color rgb(77,85,93)
      line-height 24px
  .rating
    padding-top:18px
    .title
      line-height 14px
      margin-left 18px
      font-size $fontsize-medium
      color rgb(7,17,27)
    .rating-wrapper
      padding 0 18px
      .rating-item
       position relative
       padding 16px 0
       border-1px(rgba(7,17,27,0.1))
      .user
        position absolute
        right 0
        line-height 12px
        top 16px
        .name
          display inline-block
          vertical-align top
          font-size $fontsize-small-s
          color rgb(143,153,159)
          margin-right 6px
        .avatar
          display inline-block
          border-radius 50%
      .time
        margin-bottom 6px
        line-height 12px
        font-size $fontsize-small-s
        color rgb(143,153,159)
      .text
        line-height 16px
        font-size $fontsize-small
        color rgb(7,17,27)
        .icon-thumb_up,.icon-thumb_down
          margin-right 4px
          line-height 16px
          font-size $fontsize-small
        .icon-thumb_up
          color rgb(0,160,220)
        .icon-thumb_down
          color rgb(143,153,159)
      .no-rating
        padding 16px 0
        font-size $fontsize-small
        color rgb(143,153,159)
</style>
