import request from '@/utils/request'

// login
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

// getinfo
export function getUserInfo () {
  return request({
    url: 'http://localhost:3000/users/info',
    method: 'get'
  })
}

// query by name mo
export function getUserName (data) {
  return request({
    url: 'http://localhost:3000/users/queryByNameMo',
    method: 'post',
    data
  })
}

// update
export function updateUser (data) {
  return request({
    url: 'http://localhost:3000/users/update',
    method: 'post',
    data
  })
}

// add
export function addUser (data) {
  return request({
    url: 'http://localhost:3000/users/add',
    method: 'post',
    data
  })
}

// delete
export function deleteUser (data) {
  return request({
    url: 'http://localhost:3000/users/delete',
    method: 'post',
    data
  })
}
