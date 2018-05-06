<template>
  <div class="user-container">
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点点时间" border fit style="width:100%;">
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.user_id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.user_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="密码" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.user_password}}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.user_email}}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" min-width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.user_address}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="200px">
        <template slot-scope="scope">
          <el-button type="success" size="mini">编辑</el-button>
          <el-button type="primary" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: null
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      this.$store.dispatch('GetUserInfo').then(response => {
        this.listLoading = false
        this.list = response.data.result
      })
    }
  }
}
</script>
