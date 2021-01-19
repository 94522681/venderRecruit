import env from './env'
import routes from './routes'
import eventKeys from './eventKeys'
import localStorageKeys from './localStorageKeys'

const WX_VERSION = '0.0.1' // 微信小程序版本号
const ALIPAY_VERSION = '0.0.1' // 微信小程序版本号
const H5_VERSION = '0.0.1' // 微信小程序版本号

// 获取系统版本号
function getVerSion () {
  switch (process.env.TARO_ENV) {
  case 'weapp':
    return WX_VERSION
  case 'alipay':
    return ALIPAY_VERSION
  case 'h5':
    return H5_VERSION
  }
}

const config = {
  env,
  routes,
  eventKeys,
  localStorageKeys,
  version: getVerSion()
}

export default config
