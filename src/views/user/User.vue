<template>
  <div class="user-container" style="padding:30px;background-color: #fff;">
    <div class="filter-container">
      <el-input style="width: 320px;" class="filter-item" v-model="listQuery.user_name" @keyup.enter.native="handleFilter" placeholder="请输入要查询的用户名"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">新增</el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点点时间" border fit style="width:100%;">
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
          <el-button type="primary" size="mini" @click="deleteData(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[5,10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px">
        <el-input name="userid" type="hidden" v-model="temp.user_id"></el-input>
        <el-form-item label="用户名" prop="user_name">
          <el-input name="user_name" type="text" v-model="temp.user_name" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="user_password">
          <el-input name="user_password" type="text" v-model="temp.user_password" placeholder="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="user_email">
          <el-input name="user_email" type="text" v-model="temp.user_email" placeholder="email"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="user_address">
          <el-input name="user_address" type="text" v-model="temp.user_address" placeholder="address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='新增'" type="primary" @click="createData">新增</el-button>
        <el-button v-else type="primary" @click="updateData">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserName, updateUser, addUser, deleteUser } from '@/api/login'
export default {
  data () {
    return {
      list: null,
      dialogFormVisible: false,
      dialogStatus: '',
      total: null,
      temp: {
        user_id: '',
        user_name: '',
        user_password: '',
        user_email: '',
        user_address: ''
      },
      listQuery: {
        page: 1,
        limit: 20,
        user_name: undefined
      },
      rules: {
        user_name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        user_password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
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
      getUserName(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.result
        this.total = response.data.count
      })
    },
    // 分页
    handleSizeChange (val) {
      console.log(val)
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      console.log(val)
      this.listQuery.page = val
      this.getList()
    },
    // 查询
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    // 重置弹窗内容
    resetTemp () {
      this.temp = {
        user_id: '',
        user_name: '',
        user_password: '',
        user_email: '',
        user_address: ''
      }
    },
    // add 弹窗
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = '新增'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // add 确认
    createData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          addUser(tempData).then((res) => {
            this.pubGetList(res)
          })
        }
      })
    },
    // deleteData
    deleteData (list) {
      deleteUser(list).then((res) => {
        this.pubGetList(res)
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
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateUser(tempData).then((res) => {
            this.pubGetList(res)
          })
        }
      })
    },
    // 公用
    pubGetList (res) {
      if (res.data.code === 200) {
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: res.data.msg,
          type: 'success',
          duration: 2000
        })
      } else {
        this.dialogFormVisible = false
        this.$notify({
          title: '失败',
          message: res.data.msg,
          type: 'error',
          duration: 2000
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.filter-container{
  padding:0 0 20px 0;
  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
}
.pagination-container{
  padding:20px 0;
}
</style>
