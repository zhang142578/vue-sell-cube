<template>
    <div class='cartcontrol'>
        <transition name='move'>
        <div class="cart-decrease" v-show='food.count>0' @click='desCart'>
            <span class='inner icon-remove_circle_outline'></span>
        </div>
        </transition>
        <div class="cart-count" v-show='food.count>0'>
            {{food.count}}
        </div>
        <div class="cart-add" @click='addCart'>
            <span class="cubeic-add"></span>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    addCart () {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      event.stopPropagation()
      this.$emit('add', event.target)
    },
    desCart () {
      if (this.food.count === 0) {

      } else {
        this.food.count--
      }
      event.stopPropagation()
    }
  }
}
</script>
<style lang='stylus'>
@import "~common/stylus/mixin"
@import "~common/stylus/variable"
.cartcontrol
    display flex
    align-items center
    .cart-decrease
        display: inline-block
        padding: 6px
        transition all 0.4s linear
        &.move-transition
            opacity 1
        .inner
            display inline-block
            line-height: 24px
            font-size: $fontsize-large-xxx
            color: $color-blue
            transition all 0.4s linear
        &.move-enter, &.move-leave-active
            opacity: 0
            transform: translateX(24px)
            .inner
                transform rotate(180deg)
    .cart-count
        font-size $fontsize-small
        color rgb(147,153,159)
        width 12px
        line-height 24px
        text-align center
    .cart-add
        display: inline-block
        padding: 6px
        line-height: 24px
        font-size: $fontsize-large-xxx
        color: $color-blue
</style>
