<template>
    <div class='ratings'>
        <cube-scroll ref='scroll'>
        <div class='ragins-content'>
            <div class="overview">
                <div class="overview-left">
                    <h1 class='score'>{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size='36' :score='seller.serviceScore'></star>
                        <span class='score'>{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size='36' :score='seller.foodScore'></star>
                        <span class='score'>{{seller.foodScore}}</span>
                    </div>
                    <div class='delivery-wrapper'>
                        <span class='title'>送达时间</span>
                        <span class='delivery'>{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect @toggle='togglecontent' @select="select" :select-type='selectType' :only-content='onlyContent' :ratings='ratings'></ratingselect>
            <div class='rating-wrapper'>
                <ul>
                    <li v-show='needShow(rating.rateType,rating.text)' v-for="(rating,index) in ratings" class='rating-item' :key='index'>
                        <div class='avatar'>
                            <img width='28' height='28' :src="rating.avatar">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size='24' :score='rating.score'></star>
                                <span class="delivery" v-show='rating.deliveryTime'>{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class='text'>{{rating.text}}</p>
                            <div class='recommend' v-show='rating.recommend && rating.recommend.length'>
                                <span class='icon-thumb_up'></span>
                                <span class='item' v-for='(item,index) in rating.recommend' :key='index'>{{item}}</span>
                            </div>
                            <div class='time'>
                                {{rating.rateTime | formateDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </cube-scroll>
    </div>
</template>
<script>
import star from 'components/star/star.vue'
import { getRatings } from 'api'
import ratingselect from '../../components/ratingselect/ratingselect'
import split from '../../components/split/split'
import { formateDate } from 'common/js/date'
const ALL = 2
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: false
    }
  },
  filters: {
    formateDate (time) {
      let date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created () {
    getRatings().then((ratings) => {
      this.ratings = ratings
    })
  },
  components: {
    star,
    ratingselect,
    split
  },
  methods: {
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
.ratings
  position absolute
  top 174px
  bottom 0
  left 0
  width 100%
  overflow hidden
  .overview
    display flex
    padding 18px 0
    .overview-left
      padding 6px 0
      flex 0 0 137px
      width 137px
      border-right 1px solid rgba(7,17,27,0.1)
      text-align center
      @media only screen and (max-width 320px)
        flex 0 0 110px
        width 110px
      .score
        margin-bottom 6px
        line-height 28px
        font-size 24px
        color rgb(255,153,0)
      .title
        margin-bottom 8px
        line-height 12px
        font-size $fontsize-small
        color rgb(7,17,27)
      .rank
        line-height 10px
        font-size $fontsize-small-s
        color rgb(147,153,159)
    .overview-right
      flex 1
      padding-left 24px
      @media only screen and (max-width 320px)
        padding-left 6px
      .score-wrapper
        margin-bottom 8px
        font-size 0
        .title
          font-size $fontsize-small
          color rgb(7,17,27)
          line-height 18px
          vertical-align top
          display inline-block
        .star
          display inline-block
          vertical-align top
          margin 0 12px
        .score
          color rgb(255,153,0)
          line-height 18px
          vertical-align top
          display inline-block
          font-size $fontsize-small
      .delivery-wrapper
        .title
          font-size $fontsize-small
          color rgb(7,17,27)
          line-height 18px
        .delivery
          margin-left 12px
          font-size $fontsize-small
          color rgb(147,153,159)
  .rating-wrapper
    padding 0 18px
    .rating-item
      display flex
      padding 18px 0
      border-1px(rgba(7,17,27,0.1))
      .avatar
        flex 0 0 28px
        width 28px
        margin-right 12px
        img
          border-radius 50%
      .content
        flex 1
        position relative
        .name
          line-height 12px
          font-size $fontsize-small-s
          margin-bottom 4px
        .star-wrapper
          margin-bottom 6px
          font-size 0
          .star
            display inline-block
            vertical-align top
            margin-right 16px
          .delivery
            display inline-block
            vertical-align top
            line-height 12px
            font-size $fontsize-small-s
            color rgb(147,153,159)
        .text
          margin-bottom 8px
          line-height 28px
          color rgb(7,17,27)
          font-size $fontsize-small
        .recommend
          line-height 16px
          .icon-thumb_up,.item
            display inline-block
            margin 0 8px 4px 0
            font-size $fontsize-small-s
          .icon-thumb_up
            color rgb(0,160,220)
          .item
            padding 0 6px
            border 1px solid rgba(7,17,27,0.1)
            border-radius 1px
            color rgb(147,153,159)
            background #fff
        .time
          position absolute
          right 0
          top 0
          font-size $fontsize-small-s
          color rgb(147,153,159)
          line-height 12px
</style>
