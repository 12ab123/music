import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'

let instance = axios.create({
    timeout: 20000,
    baseURL: '/api'
})


instance.interceptors.request.use(
    config => {
        config.data = qs.stringify(config.data)
        return config
    }
)

instance.interceptors.response.use(
    response => {
        return response.data
    },
    err => {
        if (err && err.response) {
            switch (err.response.status) {
              case 400:
                Toast.fail('错误请求')
                break
              case 401:
                Toast.fail('未授权，请重新登录')
                break
              case 403:
                Toast.fail('拒绝访问')
                break
              case 404:
                Toast.fail('请求错误,未找到该资源')
                break
              case 405:
                Toast.fail('请求方法未允许')
                break
              case 408:
                Toast.fail('请求超时')
                break
              case 500:
                Toast.fail('服务器端出错')
                break
              case 501:
                Toast.fail('账号不存在')
                break
              case 502:
                Toast.fail('密码错误')
                break
              case 503:
                Toast.fail('服务不可用')
                break
              case 504:
                Toast.fail('网络超时')
                break
              case 505:
                Toast.fail('http版本不支持该请求') 
                break
              case 509:
                Toast.fail('密码错误超过限制') 
                break
              default:
                Toast.fail(`连接错误${err.response.status}`)
            }
        }
        return new Promise(()=>{})
    }
)

export default instance