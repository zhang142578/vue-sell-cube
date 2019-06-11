<template>
    <div class='goods'>
        <div class='menu-wrapper' ref='menuwrapper'>
            <ul>
                <li v-for='(item,index) in goods' :key='index' class='menu-item menu-item-hook' :class="{'current':currentindex===index}" @click='_tofoodList(index)'>
                    <span class='text'>
                        <support-ico class='ico' v-show='item.type>0' :size=1 :type="item.type"></support-ico>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class='foods-wrapper' ref='foodswrapper'>
            <ul>
                <li v-for='(item,index) in goods' :key='index' class='goods_list food-list-hook'>
                    <h1 class='title'>{{item.name}}</h1>
                    <ul>
                        <li v-for='(food,index) in item.foods' class='food-item' :key='index' >
                            <div class='icon'>
                                <img width='57' height='57' :src='food.icon' alt="">
                            </div>
                            <div class="content">
                                <h2 class='name'>{{food.name}}</h2>
                                <p class='desc'>{{food.description}}</p>
                                <div class='extra'>
                                    <span class='sell'>月售{{food.sellCount}}份</span><span class='rating'>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class='price-item'>
                                        <span class='ico'>￥</span>
                                        <span class='p'>{{food.price}}</span>
                                    </span>
                                    <span class='oldprice' v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
                                </div>
                                <div class='cartcontrol-wrapper'>
                                  <cartcontrol @add='onAdd' :food='food'></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcarts ref='shopcart' :select-foods='selectFoods' :delivery-price='seller.deliveryPrice' :min-price='seller.minPrice'></shopcarts>
    </div>
</template>
<script>
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import Bscroll from 'better-scroll'
import { getGoods } from 'api'
import SupportIco from '../support-ico/support-ico'
import shopcarts from '../../components/shopcarts/shopcarts'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  components: {
    SupportIco,
    shopcarts,
    cartcontrol
  },
  computed: {
    currentindex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // console.log(i)
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    getGoods().then((goods) => {
      this.goods = goods
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
    })
  },
  methods: {
    _tofoodList (index) {
      let foodslist = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
      let el = foodslist[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    _toMenu (index) {
      let menuList = this.$refs.menuwrapper.getElementsByClassName('menu-item-hook')
      if (index === menuList.length - 1 || index === 0) {
        let el = menuList[index]
        this.menuScroll.scrollToElement(el, 100)
      }
    },
    _initScroll () {
      this.menuScroll = new Bscroll(this.$refs.menuwrapper, {
        click: true
      })
      this.foodsScroll = new Bscroll(this.$refs.foodswrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
        this._toMenu(this.currentindex)
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    onAdd (target) {
      this.$refs.shopcart.drop(target)
    }
  }
}
</script>
<style lang='stylus'>
@import '../../common/stylus/mixin'
@import '../../common/stylus/variable'
@import '../../common/stylus/base'
.goods
    width 100%
    display flex
    position absolute
    overflow hidden
    top 175px
    bottom 46px
    border-top 1px solid rgba(7,17,27,0.1)
    .menu-wrapper
        flex 0 0 80px
        background #f3f5f7
        .menu-item
            display table
            height 54px
            width 56px
            line-height 14px
            padding 0 12px
            &.current
                font-weight 700
                position relative
                top -1px
                z-index 10
                background #fff
                .text
                    border-none()
            .text
                display table-cell
                font-size $fontsize-small
                width 56px
                vertical-align middle
                border-1px(rgba(7,17,27,0.1))
                .ico
                    vertical-align top
    .foods-wrapper
        width 100%
        flex 1
        float left
        .title
            padding-left 14px
            height 26px
            border-left 2px solid #d9dde1
            background #f3f5f7
            line-height 26px
            font-size $fontsize-small
            color rgb(147,153,159)
        .food-item
            display flex
            border-1px(rgba(7,17,27,0.1))
            margin 18px
            padding-bottom 18px
            &:last-child
                border-none()
                margin-bottom 0
            .icon
                margin-right 10px
                flex 0 0 57px
            .content
                vertical-align top
                flex 1
                .name
                    font-size $fontsize-medium
                    line-height 28px
                    color rgb(7,17,27)
                    margin 2px 0px 8px 0
                    height 14px
                    line-height 14px
                .desc,.extra
                    font-size $fontsize-small-s
                    color rgb(147 153 159)
                    line-height 12px
                .desc
                    margin-bottom 8px
                .extra
                    .sell
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
                        text-decoration:line-through
                .cartcontrol-wrapper
                  position absolute
                  right 0
                  bottom 12px
</style>
