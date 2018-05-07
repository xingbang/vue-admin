import request from '@/utils/request'

export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: 'http://localhost:3000/users/accesstoken',
    method: 'post',
    data
  })
}

export function getUserInfo () {
  return request({
    url: 'http://localhost:3000/users/info',
    method: 'get'
  })
}

export function updateUser (data) {
  return request({
    url: 'http://localhost:3000/users/update',
    method: 'post',
    data
  })
}
