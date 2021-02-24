import Taro from '@tarojs/taro'


interface IOpt {
  expires?: number // 失效时间，值为相对时间，多少毫秒后失效 
}

interface IData<T> {
  _storageExpores: number
  data: T
}

const Storage = {
  /**
   * 设置locastorage
   * @param {string} key 
   * @param {any} data 
   * @param {object} opt 存入缓存设置 { expires: 失效时间，值为相对时间，多少毫秒后失效 }
   */
  setStorage: <T>(key: string, data: T, opt?: IOpt): Promise<boolean> => {
    return new Promise((resolve) => {
      let newData: T | IData<T> = data
      if (opt) {
        // 设置了失效时间
        if (opt.expires) {
          newData = {
            _storageExpores: opt.expires + Date.now(),
            data
          }
        }
      }
      Taro.setStorage({ key, data: newData }).then(() => resolve(true), () => resolve(false))
    })
  },

  /**
   * 获取locastorage
   * @param {string} key 
   */
  getStorage: <T>(key: string): Promise<T | undefined> => {
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
              console.warn(`缓存【${key}】已经失效`)
              Storage.removeStorage(key)
              resolve(undefined)
              return
            }
            resolve(currentData.data)
          }
          resolve(currentData)
        },
        () => {
          console.log(`storage中没有【${key}】`)
          resolve(undefined)
        }
      )
    })
  },
  /**
   * 删除对应key值的缓存
   * @param {string} key 
   */
  removeStorage: (key: string): Promise<boolean> => {
    return new Promise(resolve => {
      Taro.removeStorage({ key }).then(() => resolve(true), () => resolve(false))
    })
  },

  /**
   * 清除全部缓存
   */
  clearStorage: (): Promise<boolean> => {
    return new Promise(resolve => {
      Taro.clearStorage().then(() => resolve(true), () => resolve(false))
    })
  },

  /**
   * 获取缓存-同步
   */
  getStorageSync: <T>(key: string): T | undefined => {
    try {
      const res = Taro.getStorageSync<T | IData<T>>(key)
      if (!res) return undefined

      // 如果有缓存
      if (typeof res === 'object' && (res as IData<T>)._storageExpores) {
        // 缓存失效
        if (Date.now() > (res as IData<T>)._storageExpores) {
          console.warn(`缓存【${key}】已经失效`)
          Storage.removeStorage(key)
          return undefined
        }
        return (res as IData<T>).data
      }
      return res as T
    } catch (error) {
      return undefined
    }
  }
}

export default Storage