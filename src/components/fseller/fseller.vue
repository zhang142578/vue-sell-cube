<template>
    <div class='fuckingseller'>
        <cube-scroll ref='scroll'>
          <div class="content">
            <div class="head">
                <div class='title'>
                    <p class='t_name'>{{seller.name}}</p>
                    <star :size='36' :score='seller.score'></star>
                    <span class='t_text t_num'>({{seller.ratingCount}})</span>
                    <span class='t_text t_count'>月售{{seller.sellCount}}单</span>
                    <div class="collect">
                        <span class='icon-favorite'></span>
                        <p class='c_text'>已收藏</p>
                    </div>
                </div>
                <div class="description">
                  <div class="d_desc">
                    <p class='d_title'>起送价</p>
                    <p class='d_text'><span class='d_num'>{{seller.minPrice}}</span><span class='d_danwei'>元</span></p>
                  </div>
                  <div class="d_desc">
                    <p class='d_title'>商家配送</p>
                    <p class='d_text'><span class='d_num'>{{seller.deliveryPrice}}</span><span class='d_danwei'>元</span></p>
                  </div>
                  <div class="d_desc last">
                    <p class='d_title'>平均配送时间</p>
                    <p class='d_text'><span class='d_num'>{{seller.deliveryTime}}</span><span class='d_danwei'>分钟</span></p>
                  </div>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
              <div class='b_head'>
                <p class='b_title'>公告与活动</p>
                <p class='b_desc'>{{seller.bulletin}}</p>
              </div>
              <div class='b_wrapper'>
                <ul v-if='seller.supports' class='supports'>
                  <li class='support-item' v-for='(item,index) in seller.supports' :key='index'>
                    <support-ico class='ico' :size=2 :type='seller.supports[index].type'></support-ico>
                    <span class='text'>{{seller.supports[index].description}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <split></split>
            <div class='pics'>
                <h1 class='title'>商家实景</h1>
                  <div class='pic-wrapper'>
                    <cube-scroll ref='scroll' class='horizontal' direction="horizontal">
                      <ul class='pic-list'>
                        <li class='pic-item' v-for='(item,index) in seller.pics' :key='index'>
                         <img width='120' height='90' :src="item" alt="">
                        </li>
                      </ul>
                    </cube-scroll>
                  </div>
            </div>
            <split></split>
            <div class='inf'>
              <p class='title'>
                商家信息
              </p>
              <ul>
                <li class='inf-item' v-for="(item,index) in seller.infos" :key='index'>{{item}}</li>
              </ul>
            </div>
          </div>
        </cube-scroll>
    </div>
</template>
<script>
import { getSeller } from 'api'
import star from 'components/star/star'
import split from 'components/split/split'
import supportIco from 'components/support-ico/support-ico'
export default {
  data () {
    return {
      seller: []
    }
  },
  components: {
    star,
    split,
    supportIco
  },
  watch: {
    'seller' () {
      console.log(this.$refs.scroll)
      this.$refs.scroll.refresh()
    }
  },
  methods: {
    test () {
      let fuckingseller = document.getElementsByClassName('fuckingseller')
      console.log(fuckingseller)
    }
  },
  created () {
    getSeller().then((seller) => {
      this.seller = seller
    })
  }
}
</script>
<style lang='stylus'>
@import '../../common/stylus/mixin'
@import '../../common/stylus/variable'
@import '../../common/stylus/base'
.fuckingseller
  position absolute
  top 174px
  bottom 0
  left 0
  width 100%
  overflow hidden
  .head
    padding 18px
    border-bottom 1px solid rgba(7,17,27,0.1)
    .title
      color black
      font-size $fontsize-medium
      position relative
      padding-bottom 18px
      border-1px(rgba(7,17,27,0.1))
      .t_name
        margin-bottom 8px
      .star
        display inline-block
        vertical-align top
        margin-right 8px
      .t_text
        font-size $fontsize-small-s
        display inline-block
        vertical-align top
        color rgb(77,85,93)
        line-height 18px
      .t_num
        margin-right 12px
      .collect
        position absolute
        right 0
        top 0
        font-size 18px
        text-align center
        .icon-favorite
          display inline-block
          line-height 14px
          color rgb(240,20,20)
          margin-bottom 8px
        .c_text
          font-size $fontsize-small-s
          line-height 10px
          color rgb(77,85,93)
    .description
      display flex
      padding 18px 0 0 0
      .d_desc
        text-align center
        flex 1
        border-right 1px solid rgba(7,17,27,0.1)
        .d_title
          font-size $fontsize-small-s
          color rgb(137,153,159)
          line-height 10px
          margin-bottom 4px
        .d_text
          color rgb(7,17,27)
          .d_num
            font-size 24px
            font-weight 200
          .d_danwei
            font-size $fontsize-small
      .last
        border none
  .pics
    padding 18px
    .title
      font-size $fontsize-medium
      color rgb(7,17,27)
      line-height 14px
      margin-bottom 12px
    .pic-wrapper
      width 100%
      .horizontal
        .cube-scroll-content
          display inline-block
        .pic-list
          white-space nowrap
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin 0
  .bulletin
    padding 18px
    .b_head
      margin-bottom 16px
      .b_title
        font-size $fontsize-medium
        color rgb(7,17,27)
        line-height 14px
        margin-bottom 8px
      .b_desc
        font-size $fontsize-small
        color rgb(240,20,20)
        padding 0 12px
        line-height 24px
        font-weight 200
    .b_wrapper
      .supports
        .support-item
          padding 16px 12px
          margin-bottom 12px
          font-weight 200
          font-size 0
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            margin-bottom 0
        .ico
          display inline-block
          vertical-align top
          margin-right 6px
          background-repeat no-repeat
        .text
          line-height 16px
          font-size 12px
  .inf
    padding 18px
    .title
      font-size $fontsize-medium
      color rgb(7,17,27)
      line-height 14px
      padding-bottom 12px
      border-1px(rgba(7,17,27,0.1))
    .inf-item
      padding 16px 0
      font-size $fontsize-small
      color rgb(7,17,27)
      line-height 32px
      font-weight 200
      border-1px(rgba(7,17,27,0.1))
      &:last-child:after
        border none
</style>
