import Vue from 'vue'
import Vuelazyload from 'vue-lazyload'
import './cube-ui'
import App from './App.vue'
import router from './router'
import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(Vuelazyload, {
  preload: 1.3, // 预加载的宽高
  loading: 'img的加载中的显示的图片的路径',
  error: 'img加载失败时现实的图片的路径',
  attempt: 3, // 尝试加载的次数
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'] // 你想让vue监听的事件
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
