import Taro, { getSystemInfoSync } from '@tarojs/taro'

class System {
  static isInstance: System
  private _systemInfo: getSystemInfoSync.Result | undefined // Tip: 不要在外面取这里的值

  static instance () {
    if (!System.isInstance) {
      System.isInstance = new System()
    }
    return System.isInstance
  }

  /**
   *  Tip:【注意】因为界面的 windowHeight 等少部分信息会随着界面实时的状态会有更改，所以每次获取的时候建议实时获取
   */
  getSystemInfo (): getSystemInfoSync.Result {
    if (!this._systemInfo) {
      this._systemInfo = Taro.getSystemInfoSync()
    }
    return this._systemInfo
  }
  
  /**
   * 实时获取当前信息
   */
  getRealTimeSystemInfo () {
    return Taro.getSystemInfoSync()
  }

  /**
   * @description: 判断是否当前页面
   * @return: booblean
   */
  public isCurrentPagePath(path: string): boolean {
    const pages = Taro.getCurrentPages();
    let isCurrent = false;
    if (process.env.TARO_ENV === 'weapp') {
      // @ts-ignore
      const pageRoute = `/${pages.pop().route}`
      isCurrent = pageRoute === path;
    } else if (process.env.TARO_ENV === 'alipay') {
      // @ts-ignore
      const pageRoute = `${pages.pop().$component.$router.path}`
      isCurrent = pageRoute === path;
    }
    return isCurrent;
  }

   /**
   *  rpx单位转px
   */
  public rpx2px = (rpx: number): number => {
    return (this.windowWidth * rpx) / 750
  };

  /**
   * px单位转rpx
   */
  public px2rpx = (px: number): number => {
    return (750 * px) / this.windowWidth
  }

  /**
   * 判断机型是否是ios
   */
  public isIOS(): boolean {
    const system = this.platform && this.platform.toUpperCase()
    return system.indexOf('IOS') !== -1
  }

  /**
   * 判断是否是iphoneX类型（底部有黑色横线）
   */
  public isIPhoneX (): boolean {
    return this.model.search('iPhone X') !== -1
  }

  // 设备品牌
  get brand (): string {
    return this.getSystemInfo().brand
  }
  // 设备型号。新机型刚推出一段时间会显示unknown，微信会尽快进行适配。
  get model (): string {
    return this.getSystemInfo().model
  }
  // 设备像素比
  get pixelRatio (): number {
    return this.getSystemInfo().pixelRatio
  }
  // 屏幕宽度，单位px
  get screenWidth (): number {
    return this.getSystemInfo().screenWidth
  }
  // 屏幕高度，单位px
  get screenHeight (): number {
    return this.getRealTimeSystemInfo().screenHeight
  }
  // 可使用窗口宽度，单位px
  get windowWidth (): number {
    return this.getSystemInfo().windowWidth
  }
  // 可使用窗口高度，单位px
  get windowHeight (): number {
    return this.getRealTimeSystemInfo().windowHeight
  }
  // 状态栏的高度，单位px
  get statusBarHeight (): number {
    return this.getSystemInfo().statusBarHeight
  }
  // 微信设置的语言
  get language (): string {
    return this.getSystemInfo().language
  }
  // 微信版本号
  get version (): string {
    return this.getSystemInfo().version
  }
  // 操作系统及版本
  get system (): string {
    return this.getSystemInfo().system
  }
  // 客户端平台
  get platform (): string {
    return this.getSystemInfo().platform
  }
  // 用户字体大小（单位px）。以微信客户端「我-设置-通用-字体大小」中的设置为准
  get fontSizeSetting (): number {
    return this.getSystemInfo().fontSizeSetting
  }
  // 客户端基础库版本
  get SDKVersion (): string {
    return this.getSystemInfo().SDKVersion
  }
  // 设备性能等级（仅 Android）。取值为：-2 或 0（该设备无法运行小游戏），-1（性能未知），>=1（设备性能值，该值越高，设备性能越好，目前最高不到50）
  get benchmarkLevel (): number {
    return this.getSystemInfo().benchmarkLevel
  }
  // 允许微信使用相册的开关（仅 iOS 有效）	
  get albumAuthorized (): boolean {
    return this.getSystemInfo().albumAuthorized
  }
}


export default System.instance()
