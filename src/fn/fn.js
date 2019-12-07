const fn = {
  // try to 删除arr数组里的arg数组
  arrDeleteArg: function (arr, arg) {
    if (arg.length) {
      for (let i in arr) {
        if (JSON.stringify(arr[i]) === JSON.stringify(arg[0])) {
          arr.splice(i, 1)
          i--
        }
      }
      arg.shift()
      if (arg.length) {
        return this.arrDeleteArg(arr, arg)
      } else {
        return arr
      }
    } else {
      return arr
    }
  },
  // deepClone 不适应于复制函数
  deepClone: function (o) {
    return JSON.parse(JSON.stringify(o))
  },

  // 将对象或者json转为url请求数据
  urlEncode: function (param, key, encode) {
    if (param === null) return ''
    let paramStr = ''
    let t = typeof (param)
    if (t === 'string' || t === 'number' || t === 'boolean') {
      paramStr += '&' + key + '=' + ((encode === null || encode) ? encodeURIComponent(param) : param)
    } else {
      for (var i in param) {
        let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
        paramStr += this.urlEncode(param[i], k, encode)
      }
    }
    return paramStr
  },
  // 交换数组两个元素的位置
  swapItems: function (arr, index1, index2) {
    if (index2 === -1 || index2 === arr.length) {
      return false
    }
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    return arr
  }
}
export default fn