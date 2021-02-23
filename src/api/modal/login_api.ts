import { httpRequest } from '../index'
import { Storage } from 'src/adapter/api'
import System from 'src/utils/system'


interface IAppLoginData {
  code: string // login换取的code
  encryptedData: string
  iv: string
}

interface IManualLogin {
  loginMode: 'PASSWORD' | 'VERIFICATION_CODE' | 'ENCRYPTED_DATA'
  userKey: string
  userName?: string
  verificationCode?: string
  msgId?: string
}

interface IPhoneSMS {
  mobileNo: string // 手机号码
  areaId: string // 区域id
}

interface ILoginFromStore {
  token: string
  storeId: string
  code: string
}

interface IGetSilenceLogin {
  code: string
  storeId?: string
}

/**
 * 获取同盾需要的系统参数
 */
const getSystemToTD = async () => {
  const safe_bb = await Storage.getStorage('safe_bb') || 'eyJvcyI6Ind4YXBwIiwiYiI6eyJwYXJ0bmVyIjoieHN5eHNjIiwiYXBwX25hbWUiOiJ4c3l4c2NfeGN4IiwidCI6Ikx2Vk1qenhFa3h3PSIsImlkIjoiR2tKbHgxaDJSVnc9IiwidiI6IjlEcmEwMjVvVUFlaTg1aW1qUjBSOVc9PSIsImEiOiItIiwiYiI6IkxkZjQxQjNETlN5MjB6MUdmdWoxR0FPc1VBSlBONlBPaUFrUHB2U2hvcmRYeGVwVWlLbGdQWTNoRTFNeldJZmxkdHMzUldvZytSSW9DSXZ3cExsa2htajd6Y3N1OEU3dk5peS9qNDZrakV1WmNUSE9KRm1OVWc9PSIsImMiOiJrL2ExNmpxRlR4cW83L2Z4aVA0Rlk3N0QzYkVmd3kzbVg4U0lBNks4SnpJNTIzanVqd2hCSFE9PSIsImQiOiJHa0pseDFoMlJWdz0iLCJlIjoiTlZUb0pSWFNiUHc9IiwiZiI6Ik5WVG9KUlhTYlB3PSIsImlkZiI6IjE2MTQwMDU2NTg1ODgtMTQ3NjI5MDU3NTAiLCJnIjoiNzIyZTNjZWIwNDFlZjU0ZGU2Y2Q1NzdkMTkyYjM0MjEiLCJoIjoiOGFkNzY4MGQxNzFmNWQzOTg2M2I1NDM1NzIyODZkZDMifSwic3RhdHVzIjoyMDEsInAiOjI2MTF9' // TODO：这是干嘛的？
  return {
    item: 'WECHAT_MINI_MEMBER',
    "terminal.devId": "",
    "terminal.brand": System.brand,
    "terminal.os": System.system,
    "terminal.type": System.model,
    "request.providerName": 'TONGDUN',
    "request.blackBox": safe_bb, 
  }
}

/**
 * 小程序授权登录
 */
export const ApiAppLogin = async (data: IAppLoginData) => {
  const TD = await getSystemToTD()
  const newData = {
    ...data,
    ...TD
  }
  return httpRequest('POST', '/api/auth/auth/codeExchangeSessionKey', newData)
}

interface ISilenceLoginResult {
  silenceLoginResult: boolean
  userKey: string
}

/**
 * 静态登录
 */
export const ApiGetSilenceLogin = async (data: IGetSilenceLogin) => {
  const TD = await getSystemToTD()
  return httpRequest<ISilenceLoginResult>('POST', '/api/auth/auth/silenceLogin', { ...data, ...TD }, { isLogin: false })
}

/**
 * 手动登录 短信验证码
 */
export const ApiManualLogin = async (data: IAppLoginData & IManualLogin) => {
  const TD = await getSystemToTD()
  return httpRequest('POST', '/api/auth/auth/manualLogin', { ...data, ...TD })
}

/**
 * 发送短信验证码
 */
export const ApiSendPhoneSMS = (data: IPhoneSMS) => {
  return httpRequest('POST', '/api/auth/auth/sendVerificationCode', { data, scenes: 'LOGIN'})
}

/**
 * 手动登出
 */
export const ApiAppLoginOut = () => {
  return httpRequest('POST', '/api/auth/auth/logOut')
}

/**
 * 门店端跳过来，验证登陆
 */
export const ApiLoginFromStore = async (data: ILoginFromStore) => {
  const TD = await getSystemToTD()
  return httpRequest('POST', '/api/auth/auth/internalAuthorizeLogin', { ...data, ...TD })
}

/**
 * 检查useKey是否过期
 */
export const ApiCheckTokenExpire = () => {
  return httpRequest('POST', '/api/auth/auth/frontCheckAuthStatus')
}