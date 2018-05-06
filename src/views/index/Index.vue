<template>
  <div class="app-wrapper">
    <el-row :gutter="30">
      <el-col :xs="24" :sm="12" :md="6">
        <div class="index-panel">
          <i class="el-icon-picture" style="color: rgb(143, 201, 251);"></i>
          <div class="index-panel-list">
            <div class="index-panel-tit">Online Review</div>
            <div class="index-panel-num">2222</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <div class="index-panel">
          <i class="el-icon-picture" style="color: rgb(143, 201, 251);"></i>
          <div class="index-panel-list">
            <div class="index-panel-tit">Online Review</div>
            <div class="index-panel-num">2222</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <div class="index-panel">
          <i class="el-icon-picture" style="color: rgb(143, 201, 251);"></i>
          <div class="index-panel-list">
            <div class="index-panel-tit">Online Review</div>
            <div class="index-panel-num">2222</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <div class="index-panel">
          <i class="el-icon-picture" style="color: rgb(143, 201, 251);"></i>
          <div class="index-panel-list">
            <div class="index-panel-tit">Online Review</div>
            <div class="index-panel-num">2222</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div ref="charts" style="height:400px;margin-top:30px;background:#fff;padding:30px;"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
    window.addEventListener('resize', this.__resizeHanlder)

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    __resizeHanlder () {
      setTimeout(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
    },
    initChart () {
      this.chart = echarts.init(this.$refs.charts)
      this.chart.setOption({
        title: {
          text: '报表'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {normal: {}},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.index-panel{
  padding:30px;
  background:#fff;
  margin:0 0 10px 0;
  i{
    font-size:54px;
    float:left;
  }
  .index-panel-list{
    width:auto;
    margin-left:78px;
  }
  .index-panel-tit{
    line-height: 16px;
    font-size: 16px;
    margin-bottom: 8px;
    height: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .index-panel-num{
    line-height: 32px;
    font-size: 24px;
    height: 32px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 0;
  }
}
.chart{
  margin-top:40px;
}
</style>
