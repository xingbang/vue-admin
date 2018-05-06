import { loginByUsername, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  getters: {
    token: state => state.token,
    userName: state => state.userName
  },
  state: {
    userId: '',
    userName: getToken('nameToken'),
    userPassword: '',
    userEmail: '',
    userAddress: '',
    token: getToken('token')
  },
  mutations: {
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_USERNAME: (state, userName) => {
      state.userName = userName
    },
    SET_USERPASSWORD: (state, userPassword) => {
      state.userPassword = userPassword
    },
    SET_USEREMAIL: (state, userEmail) => {
      state.userEmail = userEmail
    },
    SET_USERADDRESS: (state, userAddress) => {
      state.userAddress = userAddress
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    // 登入
    LoginByUsername ({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          if (data.code === 200) {
            commit('SET_TOKEN', data.token)
            commit('SET_USERNAME', data.name)
            setToken('token', data.token)
            setToken('nameToken', data.name)
            resolve()
          } else if (data.code === -1) {
            reject(data.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetUserInfo ({commit}) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data
          if (data.code === -1) {
            reject(data.msg)
          }
          // commit('SET_NAME', data.name)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({commit}) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_USERNAME', '')
        removeToken('token')
        removeToken('nameToken')
        resolve()
      })
    }
  }
}

export default user
