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
          <el-button type="success" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input name="username" type="text" v-model="temp.user_name" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input name="password" type="text" v-model="temp.user_password" placeholder="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input name="email" type="text" v-model="temp.user_email" placeholder="email"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input name="address" type="text" v-model="temp.user_address" placeholder="address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='新增'" type="primary">新增</el-button>
        <el-button v-else type="primary" @click="updateData">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: null,
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        user_name: '',
        user_password: '',
        user_email: '',
        user_address: ''
      },
      rules: {
        user_name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        user_password: [{ required: true, message: '用户密码不能为空', trigger: 'blur' }],
        user_email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        user_address: [{ required: true, message: '地址不能为空', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 得到table列表数据
    getList () {
      this.listLoading = true
      this.$store.dispatch('GetUserInfo').then(response => {
        this.listLoading = false
        this.list = response.data.result
      })
    },
    // update 弹窗
    handleUpdate (list) {
      this.temp = Object.assign({}, list) // copy obj
      this.dialogStatus = '更新'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // update 确认
    updateData () {

    }
  }
}
</script>
