import Taro from '@tarojs/taro'
import { ApiGetSilenceLogin } from 'src/api/modal/login_api'
import { Storage } from 'src/adapter/api';
import { Lodash, Global } from 'src/utils'
import Config from 'src/config'

/**
 * 获取用户userKey
 */
export const getUserKey = Lodash.oneceRunFunction(async () => {
  let userKey = Global.get('userKey')
  if (!userKey) {
    userKey = await Storage.getStorage(Config.localStorageKeys.userKey)
  }
  if (!userKey) {
    userKey = await silenceLogin()
  }
  Global.set('userKey', userKey)
  return userKey
})

/**
 * 静默登录
 */
export const silenceLogin = Lodash.oneceRunFunction<string | undefined>(async () => {
  try {
    const wxLogin = await Taro.login()
    if (wxLogin.errMsg.indexOf('ok') === -1) {
      // TODO: 调微信登录错误处理
      return;
  }
   const res = await ApiGetSilenceLogin({ code: wxLogin.code })
   const { code, data, msg } = res
   if (code === 0 && data && data.silenceLoginResult) {
     Storage.setStorage(Config.localStorageKeys.userKey, data.userKey)
     return data.userKey
   } else {
     Taro.showToast({ title: msg, icon: 'none' })
     return undefined
   }
  } catch (error) {
    return undefined
  }
})