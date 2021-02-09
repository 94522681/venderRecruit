import { ITouchEvent } from "@tarojs/components"

type IFun = Function | (() => void) | any
type IFunReturn = Function | ((event: ITouchEvent<any>) => void) | undefined | any

/**
 * 保证在一次fn异步的过程中，函数被多次调用时只会执行一次fn
 * @param fn
 */
export function oneceRunFunction<T> (fn) {
  let oneceStatus: Promise<T> | null = null
  return function (...rest) {
    if (!oneceStatus) {
      oneceStatus = new Promise(async(resolve, reject) => {
        try {
          const res = await fn.apply(this, rest)
          resolve(res)
          oneceStatus = null
        } catch (error) {
          reject(error)
          oneceStatus = null
        }
      })
    }
    return oneceStatus
  }
}

/**
 * 防抖函数 重复触发时，间隔时间内重新触发不会执行
 * @param fn 要执行的函数
 * @param time 间隔的时间（毫秒）
 * @param isFrist 是否先执行
 */
export function debounce (fn: IFun, time: number, isFrist = false): IFunReturn {
  let debounceTimer
  if (isFrist) {
    return function (...rest) {
      if (debounceTimer) clearTimeout(debounceTimer)
      let callNow = !debounceTimer
      debounceTimer = setTimeout(() => {
          debounceTimer = null
      }, time)
      if (callNow) fn.apply(this, rest)
    }
  }
  return function (...rest) {
   clearTimeout(debounceTimer) 
   debounceTimer = setTimeout(() => {
    fn.apply(this, rest)
   }, time)
  }
}

/**
 * 节流函数 重复触发时，固定间隔时间执行一次
 * @param fn 要执行的函数
 * @param time 间隔的时间（毫秒）
 * @param isFrist 是否先执行
 */
export function throttle (fn: IFun, time: number, isFrist = true): IFunReturn {
  let isDebounce = true
  if (isFrist) {
    return function (...rest) {
      if (isDebounce) {
        isDebounce = false
        setTimeout(() => {
          isDebounce = true
        }, time)
        fn.apply(this, rest)
      }
    }
  }
  return function (...rest) {
    if (isDebounce) {
      isDebounce = false
      setTimeout(() => {
        fn.apply(this, rest)
        isDebounce = true
      }, time)
    }
  }
}
