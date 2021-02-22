import Taro from '@tarojs/taro'
import { ApiGetSilenceLogin } from '../api/modal/login_api'

export const getUserKey = async () => {
  try {
    const { code, errMsg } = await Taro.login()
    console.log('---codecodecodecode-->', code, errMsg)
    if (errMsg.indexOf('ok') === -1) {
      // TODO: 登录错误处理
      return;
  }
   const res = await ApiGetSilenceLogin({ code })
   console.log('---resresres--->', res)
   if (res.code === 0) {
    //  if (res)
   }
  } catch (error) {
    console.log('------>', error)
  }
}