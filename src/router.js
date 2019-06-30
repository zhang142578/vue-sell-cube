
import Vue from 'vue'
import Router from 'vue-router'

// 组件模块
// import Main from './components/content/main'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import fseller from './components/fseller/fseller'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    // { path: '/admin', name: 'Admin', component: Admin }
    { path: '/', redirect: '/goods' },
    { path: '/goods', component: goods },
    { path: '/ratings', component: ratings },
    { path: '/fseller', component: fseller }
  ]
})
