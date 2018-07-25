<template>
  <div class="app-wrapper" style="width:auto;padding:10px;">
    <div class="filter-container">
      <el-input style="width: 320px;" class="filter-item" placeholder="请输入要查询图片Tag的名称"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" >新增</el-button>
    </div>
    
    <el-row :gutter="5">
      <el-col :xs="24" :sm="12" :md="6">
        <div class="ph-img">
          <img src="" />
          <div class="ph-tit">
            <div class="ph-tit-1">是兴邦啊</div>
            <div class="ph-tit-2">是兴邦啊</div>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
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
</style>
