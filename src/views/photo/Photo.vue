<template>
  <div class="app-wrapper" style="width:auto;padding:10px;">
    <div class="filter-container">
      <el-input style="width: 320px;" class="filter-item" placeholder="请输入要查询的图片名称"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" >查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate" icon="el-icon-edit" >新增</el-button>
    </div>
    <el-row :gutter="5">
      <el-col :xs="24" :sm="12" :md="6" v-for="item in list" :key="item.pic_id">
        <div class="ph-img" @click="handleUpdate(item)" :style="{background: 'url('+ item.pic_url +')',backgroundSize:'cover'}">
          <!--<img :src="item.pic_url" />-->
          <div class="ph-tit">
            <div class="ph-tit-1">{{item.pic_name}}</div>
            <div class="ph-tit-2">{{item.pic_con}}</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" label-position="right" label-width="90px" :model="temp"  :rules="rules">
        <div style="display:none">
        <el-input name="pic_id" type="hidden" v-model="temp.pic_id"></el-input>
        <el-input name="pic_url" type="hidden" v-model="temp.pic_url"></el-input>
        </div>
        <el-form-item label="标题:" prop="pic_name">
          <el-input name="pic_name" type="text" placeholder="标题" v-model="temp.pic_name"></el-input>
        </el-form-item>
        <el-form-item label="简介:" prop="pic_con">
          <el-input name="pic_con" type="text" placeholder="简介" v-model="temp.pic_con"></el-input>
        </el-form-item>
        <el-form-item label="图片上传:">
          <el-upload
            class="avatar-uploader"
            :action= domain
            :show-file-list="false"
            :http-request = upqiniu
            :before-upload="beforeUpload">
            <img v-if="temp.pic_url" :src="temp.pic_url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="点赞数目:" prop="pic_fav">
          <el-input-number name="pic_fav" v-model="temp.pic_fav" controls-position="right" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="查看数目:" prop="pic_view">
          <el-input-number name="pic_view" v-model="temp.pic_view" controls-position="right" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="首页图片:" prop="pic_top">
          <el-switch name="pic_top" v-model="temp.pic_top" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="上传时间:" prop="pic_time">
          <el-date-picker type="date" name="pic_time" placeholder="选择时间" v-model="temp.pic_time" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="所属栏目:" prop="tag_name">
          <el-select v-model="temp.tag_name"  name="tag_name" placeholder="选择栏目" style="width:100%">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button @click="deleteData">删除</el-button>
        <el-button v-if="dialogStatus=='新增'" type="primary" @click="createData">新增</el-button>
        <el-button v-else type="primary" @click="updateData">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import { getPicName, addPic, updatePic, deletePic } from '@/api/pic'

export default {
  data () {
    return {
      list: null,
      dialogFormVisible: false,
      dialogStatus: '',
      pic_url: '',
      token: {},
      // 七牛云的上传地址
      domain: 'http://upload.qiniu.com/',
      qiniuaddr: 'p9siq5sgq.bkt.clouddn.com',
      listQuery: {
        page: 1,
        limit: 20,
        pic_name: undefined
      },
      temp: {
        pic_id: '',
        pic_name: '',
        pic_con: '',
        pic_url: '',
        pic_fav: '',
        pic_view: '',
        pic_top: '',
        pic_time: '',
        tag_name: ''
      },
      rules: {
        pic_name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        pic_con: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        pic_time: [{ required: true, message: '请选择时间', trigger: 'change' }],
        tag_name: [{ required: true, message: '标签不能为空', trigger: 'change' }]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // xx
    getList () {
      getPicName(this.listQuery).then(response => {
        this.list = response.data.result
        this.total = response.data.count
      })
    },
    // 重置弹窗内容
    resetTemp () {
      this.temp = {
        pic_id: '',
        pic_name: '',
        pic_con: '',
        pic_url: '',
        pic_fav: '',
        pic_view: '',
        pic_top: '',
        pic_time: '',
        tag_name: ''
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
          addPic(tempData).then((res) => {
            this.pubGetList(res)
          })
        }
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
          updatePic(tempData).then((res) => {
            this.pubGetList(res)
          })
        }
      })
    },
    // delete
    deleteData () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          deletePic(tempData).then((res) => {
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
    },
    // 上传文件到七牛云
    upqiniu (req) {
      let filetype = ''
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      if (req.file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件
      const keyname = 'xingimg' + ((new Date()).valueOf()) + Math.floor(Math.random() * 100) + '.' + filetype
      // 从后端获取上传凭证token
      axios.get('http://localhost:3000/photo/photoUp').then((res) => {
        const formdata = new FormData()
        formdata.append('file', req.file)
        formdata.append('token', res.data)
        formdata.append('key', keyname)
        // 获取到凭证之后再将文件上传到七牛云空间
        axios.post(this.domain, formdata, config).then((resUrl) => {
          this.temp.pic_url = 'https://' + this.qiniuaddr + '/' + resUrl.data.key
          this.$message.success('图片上传成功！')
          // console.log(this.imageUrl)
        })
      })
    },
    // 上传前校验
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.ph-img {
  position:relative;
  width:100%;
  height:150px;
  margin-bottom:5px;
  cursor:pointer;
  overflow:hidden;
  img{
    width:100%;
  }
  &:hover{
    opacity: .8;
  }
  .ph-tit{
    position: absolute;
    left: 0px;
    bottom: 20px;
    background: rgba(0,0,0,.4);
    width: 80%;
    height: 50px;
    color:#fff;
    padding:10px 0;
    overflow:hidden;
    .ph-tit-1{
      padding:0 0 0 10px;
      font-size:18px;
      line-height:30px;
    }
    .ph-tit-2{
      color:#bbb;
      padding:0 0 0 10px;
      font-size:12px;
      line-height:20px;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.filter-container{
  padding:0;
}
</style>
