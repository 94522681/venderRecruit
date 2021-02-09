import counterStore from './counterStore'
// import page_warp from './page_warp'

class MobxStore {
  static mobxInstance: MobxStore
  private store: any

  constructor() {
    this.store = {
      counterStore: counterStore,
      // pageWarp: page_warp
    }
  }

  static instance() {
    if (process.env.TARO_ENV === 'alipay') {
      if (!my.mobxInstance) {
        my.mobxInstance = new MobxStore()
      }
      return my.mobxInstance
    }
    if (!MobxStore.mobxInstance) {
      MobxStore.mobxInstance = new MobxStore()
    }
    return MobxStore.mobxInstance
  }

  getStore() {
    return this.store
  }
}
export default MobxStore.instance().getStore()