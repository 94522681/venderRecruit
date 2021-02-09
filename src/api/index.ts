import Taro from '@tarojs/taro'
import config from '../config/index'
import hostApi from '../config/index'

const { env, version } = config

type IMethod = "GET" | "POST" | "PUT" | "OPTIONS" | "HEAD" | "DELETE" | "TRACE" | "CONNECT"

interface IHeader {
  [x: string]: any
}

type IHttpRequestData = object | string

interface IHttpRequestOpt {
  header?: IHeader // 请求header
  repeat?: number // 重复请求次数
  loading?: string // loading 文案
}

export interface IResult<T> {
  code: number;
  msg: string;
  data?: T;
  result?: T;
  error?: number;
  status?: number;
  header?: object;
}

interface IDefaultParams {
  method: IMethod
  url: string
  data?: IHttpRequestData
  header?: IHeader
}

/**
 * 磨平response，兼容后端不规范接口
 * @param {object} response 接口返回的response
 * @param {number} statusCode 接口status
 */
const formatResult = (response, statusCode) => {
  let requestResult
  if (typeof response === 'string') {
    requestResult = { code: -1, data: '', msg: '' }
  } else if (typeof response === 'object') {
    requestResult = {...response}

    if ('msg' in response || 'message' in response) {
      requestResult.msg = response.msg || response.message || ''
    } else {
      requestResult.msg = 'success'
    }

    if ('data' in response) {
      if (response.data !== undefined) {
        requestResult.data = response.data
      } else {
        requestResult.data = response.result
      }
    } else {
      requestResult.data = response
    }
  }
  // TODO: 需要根据实际情况判断哪些状态为正常返回
  if (statusCode === 200) {
    requestResult.code = 0
  } else {
    requestResult.code = response.code || statusCode
  }
  // 设置请求失败的msg
  if (typeof requestResult.msg === 'undefined') {
    if (requestResult.code >= 400) {
      if (requestResult.code < 500) {
        requestResult.msg = '请求出错'
      } else if (requestResult.code < 600) {
        requestResult.msg = '服务出小差啦'
      } else if (requestResult.code === 600) {
        requestResult.msg = '网络开小差了'
      }
    }
  }
  return requestResult
}

/**
 * 请求封装
 * @param {string} method 请求方法
 * @param {string} url 请求url
 * @param {object} data 请求data
 * @param {object} opt 请求设置
 */
export function httpRequest<T>(
  method: IMethod,
  url: string,
  data: IHttpRequestData = {},
  opt: IHttpRequestOpt = {}
): Promise<IResult<T>> {
  const { header, loading = '' } = opt || {}
  // 获取请求url
  const currentUrl = url.replace(/^\/([\w\d]+)\//, (a1, a2) =>
    a2 && hostApi[a2] ? `${hostApi[a2]}/` : a1
  )
  // 请求参数
  let params: IDefaultParams = { method, data, url: currentUrl }

  // 设置头部header
  params.header = header ? header : {}
  params.header['Accept'] = 'application/json, text/plain, */*'
  params.header['source'] = 'applet'
  params.header['version'] = version
  params.header['Content-type'] = (method.toLowerCase() === 'post' || method.toLowerCase() === 'get')
  ? 'application/x-www-form-urlencoded'
  : 'application/json'
  
  // TODO: 设置用户token
  // if (isLogin && !userKey) {
  //   params.header['userKey'] = getUserKey()
  // }
 
  return new Promise((resolve) => {
    const complete = (res) => {
      if (loading) {
        Taro.hideLoading()
      }
      // 格式化返回参数
      const requestResult = {
        ...formatResult(res, res.statusCode),
        header: res.header || {},
        statusCode: res.statusCode
      }
      // 重复请求次数
      if (opt.repeat && opt.repeat > 0) {
        opt.repeat = opt.repeat - 1
        // TODO: ....
      }
      // 登录token过期或者未登录
      if (requestResult.code === 1002 || requestResult.code === 401) {
        // TODO: 重新获取token并发起请求逻辑
      }
      // 请求成功
      if (requestResult.code === 0) {
        resolve(requestResult)
      } else {
        // 请求失败
        // TODO: 请求错误监控，和错误处理逻辑
      }
    }
    if (loading) {
      Taro.showLoading({ title: loading || '加载中...' })
    }
    const requestTask = Taro.request({...params, complete})
    console.log('----requestTask-->', requestTask)
    if (false) {
      requestTask.abort()
    }
  })
}
