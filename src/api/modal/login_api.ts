import { httpRequest } from '../index'
import { getStorage } from '@/adapter/api/storage'

/**
 * 静态登录
 */
export const getSilenceLogin = async (code) => {
  const safe_bb = await getStorage('safe_bb')
  const params = {
    code,
    item: 'WECHAT_MINI_MEMBER',
    "terminal.devId": "",
    // "terminal.brand": sysInfo.brand,
    // "terminal.os": sysInfo.system,
    // "terminal.type": sysInfo.model,
    "request.providerName": 'TONGDUN',
    "request.blackBox": safe_bb || '',
}
  return httpRequest('GET', '/API/api/auth/auth/silenceLogin')
}