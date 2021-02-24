/**
 * 全局数据缓存，不要直接取值，通过get set设置
 */
interface IGlobal {
  userKey: string | undefined
}

class Global {
  static isInstance: Global
  private userKey: string | undefined = undefined
  
  /**
   * 设置值
   * @param key 
   * @param value 
   */
  set(key: keyof IGlobal, value) {
    this[key] = value
  }

  /**
   * 获取值
   * @param key 
   */
  get(key: keyof IGlobal) {
    return this[key]
  }

  static instance () {
    if (!Global.isInstance) {
      Global.isInstance = new Global()
    }
    return Global.isInstance
  }
}

export default Global.instance()