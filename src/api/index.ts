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

// export const sendCaptcha = (params: FormState) => request({
//   url: 'http://121.196.235.163:3000/captcha/sent',
//   method: 'get',
//   params
// })

// 后端发请求，验证验证码准确性
export const verifyCaptcha = (params: FormState) => request({
  url: 'http://121.196.235.163:3000/captcha/verify',
  method: 'get',
  params
})

// 后端发请求，来发验证码
export const sendCaptcha = (data: FormState) => request({
  url: '/api/sendcaptcha',
  method: 'post',
  data
})

// 检查验证码
export const checkCaptcha = (data: FormState) => request({
  url: '/api/checkcaptcha',
  method: 'post',
  data
})

// 找回密码
export const findPwd = (data: FormState) => request({
  url: '/api/findpwd',
  method: 'post',
  data
})

// 正式进入主页面，请求头携带token,这里get请求就行,同时还需要用vuex或者pinia来保存用户信息[因为layout是个大组件，里面还有很多小组件需要用到用户数据]
export const getUserInfo = () => request({
  url: '/api/getUserInfo',
  method: 'get'
})

// 上传图片
export const uploadFile = (data: any) => request({
  url: '/api/uploadfile',
  method: 'post',
  data
})

// 修改用户信息
export const changeuserinfo = (data: any) => request({
  url: '/api/changeuserinfo',
  method: 'post',
  data
})




