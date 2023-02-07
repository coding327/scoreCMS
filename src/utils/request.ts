
import axios from "axios";
import {ShowLoading, ShowSuccess, ShowFail} from '@/utils/message.ts'
import router from '@/router'

const request = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {

  }
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // 请求发送之前
    ShowLoading()
    return config
  }, function (error) {
    // 请求失败
    ShowFail('请求失败')
    return Promise.reject(error)
  });

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // 响应成功
    ShowSuccess()
    return response
  }, function (error) {
    // 响应失败 503
    ShowFail('响应失败-服务器异常')
    router.push('/404')
    return Promise.reject(error)
  })

export const GET = () => {

}

export default request
