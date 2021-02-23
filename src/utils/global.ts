interface IGlobal {
  userKey: string | undefined
}

class Global implements IGlobal {
  static isInstance: Global
  userKey = undefined
  
  set(key: keyof IGlobal, value) {
    this[key] = value
  }

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