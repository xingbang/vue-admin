import axios from 'axios'
import {Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

// 创建一个自定义实例
const service = axios.create({
  baseUrl: process.env.BASE_API,
  timeout: 6000
})

// request拦截器 为每个响应头添加token
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = getToken('token')
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
