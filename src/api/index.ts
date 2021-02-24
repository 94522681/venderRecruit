import Taro, { request } from '@tarojs/taro'
import config from '../config/index'
import hostApi from '../api/config/index'
import { getUserKey } from './login'
import { Storage } from 'src/adapter/api';

const { version, localStorageKeys } = config

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
  cachedtime?: number // 缓存时间
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
  header: IHeader
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
 * 设置请求header
 * @param requestParams 
 * @param opt 
 */
function setDetaultHeader (requestParams, opt): IDefaultParams {
  const { method } = requestParams
  requestParams.header['Accept'] = 'application/json, text/plain, */*'
  requestParams.header['source'] = 'applet'
  requestParams.header['version'] = version
  requestParams.header['Content-type'] = (method.toLowerCase() === 'post' || method.toLowerCase() === 'get')
  ? 'application/x-www-form-urlencoded'
  : 'application/json'

  // 设置用户token
  if (opt.isLogin) {
    requestParams.header['userKey'] = getUserKey()
  }
  return requestParams
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
  const { header, loading = '', cachedtime = 0 } = opt || {}
  // 获取请求url
  const currentUrl = url.replace(/^\/([\w\d]+)\//, (a, b) => b && hostApi[b] ? `${hostApi[b]}/` : a)

  // 请求参数
  let requestParams: IDefaultParams = { method, data, url: currentUrl, header: header ? header : {} }

  // 设置头部header
  requestParams = setDetaultHeader(requestParams, opt)
 
  return new Promise((resolve) => {
    // 如果设置了缓存时间，直接返回缓存数据
    if (cachedtime) {
      const cachedData = Storage.getStorageSync<IResult<T>>(currentUrl)
      if (cachedData) {
        resolve(cachedData)
        return
      }
    }
    
    loading && Taro.showLoading({ title: loading || '加载中...' })

    // 接口请求成功后的通用处理逻辑函数
    const requestComplete = (result: IResult<T>) => {
      loading && Taro.hideLoading()
      // 设置接口数据缓存
      cachedtime && Storage.setStorage(currentUrl, result, { expires: cachedtime })

      if (result.code !== 0) {
        // TODO: 请求接口错误处理，需要将code白名单中的剔除
      }
      resolve(result)
    }

    // 发起接口请求
    const requestTask = Taro.request({...requestParams, complete: (res: request.SuccessCallbackResult) => {
        // 格式化返回参数
        const requestResult = {
          ...formatResult(res.data, res.statusCode),
          header: res.header || {},
          statusCode: res.statusCode
        }
        // 登录token过期或者未登录
        if (requestResult.code === 1002 || requestResult.code === 401) {
          // @ts-ignore 重新获取token并发起请求逻辑
          requestParams.header['userKey'] = getUserKey()
          Taro.request({...requestParams, complete: (againRes: request.SuccessCallbackResult<any>) => {
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
