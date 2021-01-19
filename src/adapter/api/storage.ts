import Taro from '@tarojs/taro'


interface IOpt {
  expires?: number // 失效时间，值为相对时间，多少毫秒后失效 
}

/**
 * 设置locastorage
 * @param {string} key 
 * @param {any} data 
 * @param {object} opt 存入缓存设置 { expires: 失效时间，值为相对时间，多少毫秒后失效 }
 */
export function setStorage(key: string, data: any, opt?: IOpt): Promise<boolean>{
  return new Promise((resolve) => {
    if (opt) {
      // 设置了失效时间
      if (opt.expires) {
        data._storageExpores = opt.expires + Date.now()
      }
    }
    Taro.setStorage({ key, data }).then(() => resolve(true), () => resolve(false))
  })
}

/**
 * 获取locastorage
 * @param {string} key 
 */
export function getStorage<T>(key: string): Promise<T | undefined> {
  return new Promise((resolve) => {
    Taro.getStorage({key}).then(
      (res) => {
        const currentData = res.data
        if (!currentData) {
          resolve(undefined)
          return
        }
        // 如果有设置失效时间
        if (currentData._storageExpores) {
          if (Date.now() > currentData._storageExpores) { // 失效
            console.log(`缓存【${key}】已经失效`)
            removeStorage(key)
            resolve(undefined)
            return
          }
        }
        resolve(currentData)
      },
      () => {
        console.log(`storage中没有【${key}】`)
        resolve(undefined)
      }
    )
  })
}

/**
 * 删除对应key值的缓存
 * @param {string} key 
 */
export function removeStorage(key: string): Promise<boolean> {
  return new Promise(resolve => {
    Taro.removeStorage({ key }).then(() => resolve(true), () => resolve(false))
  })
}

/**
 * 清除全部缓存
 */
export function clearStorage (): Promise<boolean> {
  return new Promise(resolve => {
    Taro.clearStorage().then(() => resolve(true), () => resolve(false))
  })
}