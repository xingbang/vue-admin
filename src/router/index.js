import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'
import Layout from '@/views/layout/Layout'
import Index from '@/views/index/Index'
import User from '@/views/user/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'index',
      component: Layout,
      children: [
        {
          path: 'index',
          component: Index,
          name: '首页',
          meta: {title: '首页'}
        },
        {
          path: '/user',
          name: '用户',
          component: User,
          meta: {title: '用户'}
        }
      ]
    },
    {
      path: '/login',
      name: '登入',
      component: Login,
      meta: {title: '登入'}
    }
  ]
})
