<template>
  <div class="navbar">
    <hamburger class="hamburger-container" :toggleClick="toggleSidebar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb class="hanburger-container"></breadcrumb>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item divided><span @click="logout">退出</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Hamburger from '@/components/Hamburger/Hamburger'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'

export default {
  components: {
    Hamburger,
    Breadcrumb
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userName'
    ])
  },
  methods: {
    toggleSidebar () {
      this.$store.dispatch('toggleSidebar')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.navbar{
  width:100%;
  height:56px;
  line-height:56px;
  border-bottom:1px #ccc solid;
  .hamburger-container{
    height:56px;
    padding:0 20px 0 10px;
    float:left;
  }
  .breadcrumb-container{
    margin-left:20px;
    float:left;
  }
  .el-dropdown{
    float:right;
    margin-right:10px;
  }
}

</style>
