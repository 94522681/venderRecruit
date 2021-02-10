let _boundaryCheckingState = true
/**
 * 是否进行边界检查，默认开启
 * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
 */
function enableBoundaryChecking(flag = true) {
  _boundaryCheckingState = flag
}

/**
 * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */
function toNumber(num: number | string) {
  const result = typeof (num) === 'number' ? num : Number(num)
  // eslint-disable-next-line no-restricted-globals
  return isNaN(result) ? 0 : result
}

/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 * @param {number} num num
 * @param {number} precision precision
 * @returns {number} number
 */
function strip(num: number, precision = 12): number {
  num = toNumber(num)
  return +parseFloat(num.toPrecision(precision))
}

/**
 * Return digits length of a number
 * @param {*number} num Input number
 */
function digitLength(num: number): number {
  num = toNumber(num)
  // Get digit length of e
  const eSplit = Number(num).toString().split(/[eE]/)
  const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0)
  return len > 0 ? len : 0
}

/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {*number} num 输入数
 */
function float2Fixed(num: number): number {
  num = toNumber(num)
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''))
  }
  const dLen = digitLength(num)
  return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @param {*number} num 输入数
 */
function checkBoundary(num: number) {
  num = toNumber(num)
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn(
        `${num} is beyond boundary when transfer to integer, the results may not be accurate`
      )
    }
  }
}

/**
 * 精确乘法
 */
function times(num1: number, num2: number, ...others: number[]): number {
  num1 = toNumber(num1)
  num2 = toNumber(num2)
  if (others.length > 0) {
    return times(times(num1, num2), others[0], ...others.slice(1))
  }
  const num1Changed = float2Fixed(num1)
  const num2Changed = float2Fixed(num2)
  const baseNum = digitLength(num1) + digitLength(num2)
  const leftValue = num1Changed * num2Changed

  checkBoundary(leftValue)

  return leftValue / Math.pow(10, baseNum)
}

/**
 * 精确加法
 */
function plus(num1: number | string, num2: number | string, ...others: number[]): number {
  num1 = toNumber(num1)
  num2 = toNumber(num2)
  if (others.length > 0) {
    return plus(plus(num1, num2), others[0], ...others.slice(1))
  }
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)))
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum
}

/**
 * 精确减法
 */
function minus(num1: number, num2: number, ...others: number[]): number {
  num1 = toNumber(num1)
  num2 = toNumber(num2)
  if (others.length > 0) {
    return minus(minus(num1, num2), others[0], ...others.slice(1))
  }
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)))
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum
}

/**
 * 精确除法
 */
function divide(num1: number, num2: number, ...others: number[]): number {
  num1 = toNumber(num1)
  num2 = toNumber(num2)
  if (others.length > 0) {
    return divide(divide(num1, num2), others[0], ...others.slice(1))
  }
  const num1Changed = float2Fixed(num1)
  const num2Changed = float2Fixed(num2)
  checkBoundary(num1Changed)
  checkBoundary(num2Changed)
  return times(
    num1Changed / num2Changed,
    Math.pow(10, digitLength(num2) - digitLength(num1))
  )
}

/**
 * 四舍五入
 */
function round(num: number, ratio: number): number {
  num = toNumber(num)
  ratio = toNumber(ratio)
  const base = Math.pow(10, ratio)
  return divide(Math.round(times(num, base)), base)
}

/**
 * 保留几位小数点
 * @param value 值
 * @param num 保留的小数点后位数
 */
function keepDecimal (value: number, num: number) {
  value = toNumber(value)
  const dotIndex = String(value).indexOf('.')
  // 没有小数点
  if (dotIndex === -1) {
    return String(value) + '.00'
  }
  const val = String(value).split('').concat(Array(num).fill('0'))
  return val.slice(0, dotIndex + num + 1).join('')
}

const numberPrecision = {
  strip,
  plus,
  minus,
  times,
  divide,
  round,
  digitLength,
  float2Fixed,
  keepDecimal,
  enableBoundaryChecking
}

export default numberPrecision

