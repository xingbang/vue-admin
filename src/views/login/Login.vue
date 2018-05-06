<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-positon="left">
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <el-form-item prop="username">
        <el-input name="username" type="text" v-model="loginForm.username" placeholder="username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" type="password" v-model="loginForm.password" placeholder="password"></el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%;height:40px;" :loading="loading" @click.native.prevent="login">登录</el-button>
    </el-form>
  </div>
</template>
<script>
import {Message} from 'element-ui'

export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入正确的用户名！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于六位！'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false
    }
  },
  methods: {
    // 登入two
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({path: '/'})
          }).catch(error => {
            this.loading = false
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scope>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form{
    position: absolute;
    left: 0;
    right: 0;
    width:100%;
    max-width: 500px;
    padding: 35px 24px 30px;
    margin: 120px auto;
  }
  .title-container{
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
