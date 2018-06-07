import request from '@/utils/request'

// get
export function getPicName (data) {
  return request({
    url: 'http://localhost:3000/photo/queryByNameMo',
    method: 'post',
    data
  })
}

// add
export function addPic (data) {
  return request({
    url: 'http://localhost:3000/photo/add',
    method: 'post',
    data
  })
}

// update
export function updatePic (data) {
  return request({
    url: 'http://localhost:3000/photo/update',
    method: 'post',
    data
  })
}

// delete
export function deletePic (data) {
  return request({
    url: 'http://localhost:3000/photo/delete',
    method: 'post',
    data
  })
}
