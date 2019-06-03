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
        <transition name='fade'>
        <div v-show="detailShow" class="detail">
            <div class="detail-wrapper">
                <div class='detail-main clear-fix'>
                   <h1 class='name'>{{seller.name}}</h1>
                   <div class="star-wrapper">
                       <star :size='48' :score='seller.score'></star>
                   </div>
                   <div class='title'>
                       <div class="line"></div>
                       <div class="text">优惠信息</div>
                       <div class="line"></div>
                   </div>
                   <ul v-if='seller.supports' class='supports'>
                       <li class='support-item' v-for='(item,index) in seller.supports' :key='index'>
                          <support-ico class='ico' :size=2 :type='seller.supports[index].type'></support-ico>
                          <span class='text'>{{seller.supports[index].description}}</span>
                       </li>
                   </ul>
                    <div class='title'>
                       <div class="line"></div>
                       <div class="text">商家公告</div>
                       <div class="line"></div>
                   </div>
                   <div class="bulletin">
                       <p class="content">{{seller.bulletin}}</p>
                   </div>
                </div>
            </div>
            <div class='detail-close'>
                <i class='icon-close' @click='detailClose'></i>
            </div>
        </div>
        </transition>
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

.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity: 0
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
        overflow auto
        background rgba(7,17,27,0.8)
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
                .star-wrapper
                    margin-top 16px
                    padding 2px 0
                    text-align center
                    line-height 24px
                .title
                    display flex
                    width 80%
                    margin 28px auto 24px auto
                    .line
                        flex 1
                        position relative
                        top -6px
                        border-bottom 1px solid rgba(255,255,255,0.2)
                    .text
                        padding 0 12px
                        font-size 14px
                .supports
                    width 80%
                    margin 0 auto
                    .support-item
                        padding 0 12px
                        margin-bottom 12px
                        font-weight 200
                        font-size 0
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
                .bulletin
                    width 80%
                    margin 0 auto
                    .content
                        margin 0 12px
                        font-size $fontsize-small
                        line-height 24px
        .detail-close
            position: relative
            width: 30px
            height: 30px
            margin: -64px auto 0 auto
            clear: both
            font-size: $fontsize-large-xxxx
</style>
