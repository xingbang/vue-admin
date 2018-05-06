import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import '@/styles/sidebar.scss' // sidebar css
import App from './App'
import router from './router'
import { getToken } from '@/utils/auth'

import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' })

// 没有session,路由重定向
router.beforeEach((to, from, next) => {
  if (getToken('token')) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
