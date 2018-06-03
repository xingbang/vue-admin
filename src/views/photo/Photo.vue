<template>
  <div class="app-wrapper" style="width:auto;padding:10px;">
    <div style="padding:10px 0 20px 0;">
      <el-input style="width: 320px;" class="filter-item" placeholder="请输入要查询的图片名称"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" >查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">新增</el-button>
    </div>
    <el-row :gutter="5">
      <el-col :xs="24" :sm="12" :md="6">
        <div class="ph-img">
          <img src="../../styles/images/photo.jpg" />
          <div class="ph-tit">
            <div class="ph-tit-1">夏日的风</div>
            <div class="ph-tit-2">66喜欢</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <div class="ph-img">
          <img src="../../styles/images/photo.jpg" />
          <div class="ph-tit">
            <div class="ph-tit-1">夏日的yu</div>
            <div class="ph-tit-2">66喜欢</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <div class="ph-img">
          <img src="../../styles/images/photo.jpg" />
          <div class="ph-tit">
            <div class="ph-tit-1">夏日的风</div>
            <div class="ph-tit-2">66喜欢</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <div class="ph-img">
          <img src="../../styles/images/photo.jpg" />
          <div class="ph-tit">
            <div class="ph-tit-1">夏日的风</div>
            <div class="ph-tit-2">66喜欢</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <div class="ph-img">
          <img src="../../styles/images/photo.jpg" />
          <div class="ph-tit">
            <div class="ph-tit-1">夏日的风</div>
            <div class="ph-tit-2">66喜欢</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" label-position="right" label-width="90px" :model="temp" >
        <el-form-item label="标题:" prop="pic_name">
          <el-input name="pic_name" type="text" placeholder="标题" v-model="temp.pic_name"></el-input>
        </el-form-item>
        <el-form-item label="简介:" prop="pic_con">
          <el-input name="pic_con" type="text" placeholder="简介" v-model="temp.pic_con"></el-input>
        </el-form-item>
        <el-form-item label="图片上传:" prop="pic_url">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="点赞数目:" prop="pic_fav">
          <el-input name="pic_fav" type="text" placeholder="点赞数目" v-model="temp.pic_fav"></el-input>
        </el-form-item>
        <el-form-item label="查看数目:" prop="pic_view">
          <el-input name="pic_view" type="text" placeholder="查看数目" v-model="temp.pic_view"></el-input>
        </el-form-item>
        <el-form-item label="首页图片:" prop="pic_top">
          <el-switch v-model="temp.pic_top"></el-switch>
        </el-form-item>
        <el-form-item label="上传时间:" prop="pic_time">
          <el-date-picker type="date" placeholder="选择时间" v-model="temp.pic_time" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="所属栏目:" prop="tag_name">
          <el-select v-model="temp.tag_name" placeholder="选择栏目" style="width:100%">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogFormVisible: true,
      dialogStatus: '',
      imageUrl: '',
      temp: {
        pic_name: '',
        pic_con: '',
        pic_url: '',
        pic_fav: '',
        pic_view: '',
        pic_top: '',
        pic_time: '',
        tag_name: ''
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
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
</style>
