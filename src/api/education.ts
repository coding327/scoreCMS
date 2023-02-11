import request from '../utils/request'

export const subjectAdd = (data: any) => request({
  url: '/api/subjectadd',
  method: 'post',
  data
})

export const getAllSubject = (data?: any) => request({
  url: '/api/getallsubject',
  method: 'post',
  data
})