const Day = {
   /**
   * 日期格式化函数
   * @param {string | number} date 日期
   * @param {string} format 需要返回的格式 例如：YYYY-MM-DD hh-mm-ss
   * @returns {string} 日期
   */
  timeFormat: (date: string | number, format: string): string => {
    let d: Date
    if (date && typeof date === 'string' && date.indexOf && date.indexOf('Z') === -1) {
      d = new Date(date.replace('-', '/').replace('-', '/'))
    } else {
      d = new Date(date)
    }
    if (d.toString() === 'Invalid date') {
      return ''
    }
    const year = d.getFullYear().toString()
    const month = ('0' + (d.getMonth() + 1)).substr(-2).toString()
    const day = ('0' + d.getDate()).substr(-2).toString()
    const hour = ('0' + d.getHours()).substr(-2).toString()
    const minute = ('0' + d.getMinutes()).substr(-2).toString()
    const second = ('0' + d.getSeconds()).substr(-2).toString()
    return format
      .replace('yyyy', year)
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('dd', day)
      .replace('hh', hour)
      .replace('HH', hour)
      .replace('mm', minute)
      .replace('ss', second)
  }
}

export default Day
