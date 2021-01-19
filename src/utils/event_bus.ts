/**
 * ** 使用文档 **
 * 
 *【订阅监听】
 * const event = EventBus.on(key, (res) => {
 *    // do something ...
 *    return false // 如果返回true，则阻断在此监听后定义的同一个key的监听回调
 * })
 * 
 *【移出单个监听】
 * event.remove() // 移出此监监听，不会取消其他页面的key下的监听回调
 * 
 *【移出所有监听】
 * event.off(key)
 * 
 *【发布事件】
 * EventBus.emit(key, data)
 */

type CallBack = (event: any) => boolean | Promise<boolean>

interface Bus {
  callBackSet: Set<CallBack>
}

export interface IBusOn {
  remove: () => void
}

if (process.env.TARO_ENV === 'alipay') {
  !my.topicMap && (my.topicMap = new Map<string, Bus>())
} else {
  !global.topicMap && (global.topicMap = new Map<string, Bus>())
}

export default class EventBus {
  private static topicMap = process.env.TARO_ENV === 'alipay' ? my.topicMap : global.topicMap

  /**
   * 订阅事件
   * @param topic 主题
   * @param listener 监听
   * @returns 是否拦截事件传递，返回true，则后续的订阅都接收不到
   */
  public static on<T>(topic: string, listener: (event: T) => boolean | Promise<boolean>): IBusOn | undefined {
    if (!EventBus.topicMap.has(topic)) {
      EventBus.topicMap.set(topic, { callBackSet: new Set<CallBack>() })
    }
    const bus = EventBus.topicMap.get(topic)
    if (bus) {
      bus.callBackSet.add(listener)
      return {
        remove: () => {
          const b = EventBus.topicMap.get(topic)
          b && b.callBackSet.delete(listener)
        }
      }
    }
    return undefined
  }

  /**
   * 发布事件
   * @param topic 主题
   * @param event 事件
   */
  public static async emit(topic: string, event: any) {
    const bus = EventBus.topicMap.get(topic)
    if (bus) {
      for (let callback of bus.callBackSet) {
        const interceptor = await callback(event)
        if (interceptor) {
          return true
        }
      }
      return true
    }
    return false
  }

  /**
   * 移除该主题下的所有监听，会将其topic对应下的所有listener都清掉
   * @param topic 主题
   */
  public static off(topic: string) {
    return EventBus.topicMap.delete(topic)
  }
}
