import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'
import Layout from '@/views/layout/Layout'
import Index from '@/views/index/Index'
import User from '@/views/user/User'
import Photo from '@/views/photo/Photo'
import PhotoTag from '@/views/phototag/PhotoTag'

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
        },
        {
          path: '/photo',
          name: '图片汇总',
          component: Photo,
          meta: {title: '图片汇总'}
        },
        {
          path: '/photoTag',
          name: '图片TAG',
          component: PhotoTag,
          meta: {title: '图片TAG'}
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
