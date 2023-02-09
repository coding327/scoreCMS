import request from '../utils/request'

export const getTest = (params?: any) => request({
  url: '/api/test',
  method: 'get',
  params
})
