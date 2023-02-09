import request from '../utils/request'

export const getGuideBanner = (params?: any) => request({
  url: '/bpi/banner',
  method: 'get',
  params
})


