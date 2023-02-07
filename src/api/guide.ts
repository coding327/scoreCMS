import request from '../utils/request'

export const getGuideBanner = (params?: any) => request({
  url: '/api/banner',
  method: 'get',
  params
})


