<template>
  <el-aside wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :router="true"
      :show-timeout="200"
      :collapse="isCollapse"
      :default-active="$route.path"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <el-menu-item index="/index" key="index">
        <i class="el-icon-setting"></i>
        <span slot="title" >首页</span>
      </el-menu-item>
      <el-submenu index="">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>图片</span>
        </template>
        <el-menu-item index="/photo">图片汇总</el-menu-item>
        <el-menu-item index="/picTag">图片标签</el-menu-item>
      </el-submenu>
      <el-menu-item index="/user" key="user">
        <i class="el-icon-setting"></i>
        <span slot="title" >用户</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
