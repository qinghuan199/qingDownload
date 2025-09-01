import request from '@/utils/request'

// 查询每日汇总列表
export function listDaily(query) {
  return request({
    url: '/amount/daily/list',
    method: 'get',
    params: query
  })
}

// 查询每日汇总详细
export function getDaily(id) {
  return request({
    url: '/amount/daily/' + id,
    method: 'get'
  })
}

// 新增每日汇总
export function addDaily(data) {
  return request({
    url: '/amount/daily',
    method: 'post',
    data: data
  })
}

// 修改每日汇总
export function updateDaily(data) {
  return request({
    url: '/amount/daily',
    method: 'put',
    data: data
  })
}

// 删除每日汇总
export function delDaily(id) {
  return request({
    url: '/amount/daily/' + id,
    method: 'delete'
  })
}
