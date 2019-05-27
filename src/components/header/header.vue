<template>
    <div class='header'>
        <div class='content-wrapper'>
            <div class='avatar'>
                <img width="64" height="64" :src="seller.avatar" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class='support'>
                    <support-ico :size=1 :type='seller.supports[0].type'></support-ico>
                    <span class='text'>{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if='seller.supports' class='support-count' @click='showdetail'>
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click='showdetail'>
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width='100%' height='100%' alt="">
        </div>
        <div v-show="detailShow" class="detail">
            <div class="detail-wrapper">
                <div class='detail-main clear-fix'>
                   <h1 class='name'>{{seller.name}}</h1>
                </div>
            </div>
            <div class='detail-close'>
                <i class='icon-close' @click='detailClose'></i>
            </div>
        </div>
    </div>
</template>
<script>
import star from 'components/star/star'
import SupportIco from 'components/support-ico/support-ico'
export default {
  data () {
    return {
      detailShow: false
    }
  },
  name: 'v-header',
  props: {
    seller: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    showdetail () {
      this.detailShow = true
    },
    detailClose () {
      this.detailShow = false
    }
  },
  components: {
    SupportIco,
    star
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin'
@import '../../common/stylus/variable'
@import '../../common/stylus/base'
.header
    color:#fff
    position relative
    background-color rgba(7,17,27,0.5)
    overflow hidden
    .content-wrapper
        position relative
        padding 24px 12px 20px 24px
        font-size 0
        .avatar
            display inline-block
            vertical-align top
            img
                border-radius 2px
        .content
            padding-top 2px
            display inline-block
            margin-left 16px
            .title
                margin 2px 0 8px 0
                .brand
                    width 30px
                    height 18px
                    display inline-block
                    vertical-align top
                    bg-image('brand')
                    background-size: 30px 18px
                    background-repeat: no-repeat
                .name
                    margin-left:6px
                    font-size:$fontsize-large
                    font-weight:bold
                    line-height:18px
            .description
                margin-bottom 8px
                line-height 12px
                font-weight 100
                font-size $fontsize-small
            .support
                .support-ico
                    vertical-align top
                    display inline-block
                    background-repeat no-repeat
                .text
                    display inline-block
                    font-size $fontsize-small-s
                    font-weight:100
                    margin-left:4px
                    line-height 12px
                .icon-keyboard_arrow_right
                    display inline-block
                    margin-left 4px
                    line-height 28px
        .support-count
            position: absolute
            right: 12px
            bottom: 14px
            align-items: center
            padding: 0 8px
            height: 24px
            line-height: 24px
            text-align: center
            border-radius: 14px
            background: $color-background-sss
            .count
                font-size $fontsize-small-s
                vertical-align top
            .icon-keyboard_arrow_right
                line-height 25px
                marigin-left 2px
                font-size $fontsize-small-s
    .bulletin-wrapper
        position: relative
        display: flex
        align-items: center
        height: 28px
        line-height: 28px
        padding: 0 8px
        background: $color-background-sss
        .bulletin-title
            flex 0 0 22px
            bg-image('bulletin')
            width 22px
            height 12px
            background-size 22px 12px
            background-repeat no-repeat
            margin-right 4px
        .bulletin-text
            flex: 1
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            font-size: $fontsize-small-s
        .icon-keyboard_arrow_right
            flex 0 0 10px
            width: 10px
            font-size: $fontsize-small-s
    .background
        position absolute
        top 0
        left 0
        width:100%
        height:100%
        z-index -1
    .detail
        position fixed
        z-index 100
        top 0
        left 0
        width 100%
        height 100%
        background-color rgba(7,17,27,0.8)
        overflow auto
        .detail-wrapper
            display: inline-block
            width: 100%
            min-height: 100%
            .detail-main
                padding-bottom 64px
                margin-top 64px
                .name
                    line-height 16px
                    font-size 16px
                    font-weight 700
                    text-align center
        .detail-close
            position: relative
            width: 30px
            height: 30px
            margin: -64px auto 0 auto
            clear: both
            font-size: $fontsize-large-xxxx
</style>
