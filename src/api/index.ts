import Taro, { request } from '@tarojs/taro'
import config from '../config/index'
import hostApi from '../api/config/index'
import { getUserKey } from '../utils/login'

const { version } = config

type IMethod = "GET" | "POST" | "PUT" | "OPTIONS" | "HEAD" | "DELETE" | "TRACE" | "CONNECT"

interface IHeader {
  [x: string]: any
}

type IHttpRequestData = object | string

interface IHttpRequestOpt {
  header?: IHeader // 请求header
  repeat?: number // 重复请求次数
  loading?: string // loading 文案
  isLogin?: boolean // 是否需要登录
  timeout?: number // 超时时间
}

export interface IResult<T> {
  code: number;
  msg: string;
  data: T;
  error?: number;
  status?: number;
  header?: object;
}

interface IDefaultParams {
  method: IMethod
  url: string
  data: IHttpRequestData
  header?: IHeader
}

/**
 * 磨平response，兼容后端不规范接口
 * @param {object} response 接口返回的response
 * @param {number} statusCode 接口status
 */
const formatResult = (response, statusCode)  => {
  let requestResult = { code: 0, data: '', msg: '' }
  if (typeof response === 'string') {
    requestResult = { code: 0, data: response, msg: '' }
  } else if (typeof response === 'object') {
    requestResult.code = response.rspCode && response.rspCode === 'success' ? 0 : response.rspCode || -1
    // 如果有data
    if ('data' in response) {
      requestResult.data = response.data
    }

    if ('msg' in response || 'message' in response) {
      requestResult.msg = response.msg || response.message || ''
    } else {
      requestResult.msg = 'success'
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
  const { header, loading = '', isLogin = true } = opt || {}
  // 获取请求url
  const currentUrl = url.replace(/^\/([\w\d]+)\//, (a1, a2) => a2 && hostApi[a2] ? `${hostApi[a2]}/` : a1)
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
  // 设置用户token
  if (isLogin) {
    params.header['userKey'] = getUserKey()
    params.data['userKey'] = getUserKey()
  }
 
  return new Promise((resolve) => {
    loading && Taro.showLoading({ title: loading || '加载中...' })

    /**
     * 接口请求成功后的通用处理逻辑函数
     * @param result 
     */
    const requestComplete = (result: IResult<T>) => {
      loading && Taro.hideLoading()

      if (result.code !== 0) {
        // TODO: 请求接口错误处理，需要将code白名单中的剔除
      }
      resolve(result)
    }
    const requestTask = Taro.request({...params, complete: (res: request.SuccessCallbackResult) => {
        // 格式化返回参数
        const requestResult = {
          ...formatResult(res.data, res.statusCode),
          header: res.header || {},
          statusCode: res.statusCode
        }
        // 登录token过期或者未登录
        if (requestResult.code === 1002 || requestResult.code === 401) {
          // 重新获取token并发起请求逻辑
          // @ts-ignore
          params.header['userKey'] = getUserKey()
          Taro.request({...params, complete: (againRes: request.SuccessCallbackResult<any>) => {
            const requestResult = {
              ...formatResult(againRes.data, againRes.statusCode),
              header: againRes.header || {},
              statusCode: againRes.statusCode
            }
            // @ts-ignore
            requestComplete(requestResult)
          }})
        } else {
          // @ts-ignore
          requestComplete(requestResult)
        }
    }})
    // 如果设置了超时时间
    if (opt.timeout) {
      setTimeout(requestTask.abort, opt.timeout);
    }
  })
}
