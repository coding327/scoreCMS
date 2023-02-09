
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
    // 传递token，前端发送到后端
    const token = sessionStorage.getItem('token')
    config.headers.token = token

    ShowLoading()
    return config
  }, function (error) {
    // 请求失败
    ShowFail('请求失败')
    return Promise.reject(error)
  });

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // 响应成功[响应成功范围很广]
    console.log(response);
    if (response.data.code === 200) {
      ShowSuccess(response.data.msg)
    } else {
      ShowFail(response.data.msg)
      if (response.data.code === 3001) {
        // 为了方便开发这里先关闭，后面打开
        // router.replace('/login') // replace不能前进和后退
      }
    }
    return response
  }, function (error) {
    // 响应失败 503
    ShowFail('响应失败-服务器异常')
    router.push('/404')
    return Promise.reject(error)
  })

export default request
