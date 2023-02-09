import request from '../utils/request'
import { FormState } from '../utils/types'

export const todoRegister = (data: FormState) => request({
  url: '/api/register',
  method: 'post',
  data
})

export const todoLogin = (data: FormState) => request({
  url: '/api/login',
  method: 'post',
  data
})

export const sendCaptcha = (params: FormState) => request({
  url: 'http://121.196.235.163:3000/captcha/sent',
  method: 'get',
  params
})

export const verifyCaptcha = (params: FormState) => request({
  url: 'http://121.196.235.163:3000/captcha/verify',
  method: 'get',
  params
})

export const findPwd = (data: FormState) => request({
  url: '/api/findpwd',
  method: 'post',
  data
})