<template>
<div class='shopcarts'>
  <div class='content'>
    <div class='content-left'>
      <div class='logo-wrapper'>
       <div class="logo">
        <i class='cubeic-mall'></i>
      </div>
    </div>
    <div class='price'>
      ￥0元
    </div>
    <div class="description">
      另需配送费￥{{deliveryPrice}}元
    </div>
  </div>
  <div class="content-right">
    <div class="pay">
      ￥{{minPrice}}起送
    </div>
  </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'shopcarts',
  components: {
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  methods: {
    tomenu: function () {
      console.log(Array)
    }
  }
}
</script>

<style scoped lang='stylus'>
@import "~common/stylus/mixin"
@import "~common/stylus/variable"
.shopcarts
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
          .cubeic-mall
            font-size 24px
            color $color-light-grey
            line-height 44px
      .price
        font-size $fontsize-large
        display inline-block
        margin-top 12px
        line-height 24px
        padding-right 12px
        border-right 1px solid rgba(255,255,255,0.1)
        font-weight 700
        color rgba(255,255,255,0.4);
        vertical-align top
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
</style>
