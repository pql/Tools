/**
 * @description 防抖
 * @param {Function} func 回调函数，接收防抖函数执行完成后的结果
 * @param {Number} wait(ms) 防抖时间间隔（单位：ms）
 * @param {Boolean} immediate 防抖函数是否立即执行 true: 是  false: 否
 * @method cancel 取消防抖（解除防抖时间间隔限制），再次触发立刻执行
 * @returns {Object} 返回debounce对象
 *      example
 *          var debounce = debounce(function () {console.log (1) }, 10000, true);
 *          debounce.cancel();
 */
export function debounce (func, wait, immediate) {
    var timeout, result;
    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout (timeout) 

        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout
            timeout = setTimeout (function () {
                timeout = null;
            }, wait)
            if (callNow) result = func.apply (context, args);
        }
        else {
            timeout = setTimeout (function () {
                func.apply (context, args);
            }, wait);
        }
        return result;
    };

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}


/**
 * @description 节流
 * @param {Function} func 回调函数，接收节流函数执行完成后的结果
 * @param {Number} wait 节流时间间隔（单位：ms）
 * @param {Object} options 配置参数对象 （leading和trailing只能存在一个）
 *                  leading: false 表示禁用 第一次执行
 *                  trailing: false 表示禁用 停止触发的回调    
 * @method cancel 取消节流（解除节流时间间隔限制），再次触发立刻执行  
 * @returns {Object} 返回节流对象
 *      example
 *          var throttle = throttle(function () {}, 1000) 
 *          var throttle = throttle(function () {}, 1000, {leading: false}) 
 *          var throttle = throttle(function () {}, 1000, {trailing: false}) 
 *          throttle.cancel()
 */             
export function throttle (func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function () {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply (context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function () {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        // 下次触发 func 剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 如果没有剩余的时间了或者你修改了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args)
            if (!timeout) context = args = null;
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    };

    return throttled;
}


/**
 * @description 数组去重（重复的对象也可以去除）
 * @param {Array} array 包含有重复元素的数组
 * @returns {Array} 返回去重后的数组
 *      example
 *          var array = [{name: 'lisi', age: 21}, {name: 'lisi', age: 21}]
 *          var array = [1,2,3,1,4]
 */
export function unique (array) {
    var obj = {};
    return array.filter(function(item, index, array){
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ?
            false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}

/**
 * @description 除法-解决精准度丢失
 * @param {String | Number} arg1
 * @param {String | Number} arg2
 * @returns {Number}
 *      example
 *          var a = accDiv(1.23, 2.13)
 */
export function accDiv(arg1, arg2) {
  var t1 = 0
  var t2 = 0
  var r1
  var r2
  try { t1 = arg1.toString().split('.')[1].length } catch (e) {}
  try { t2 = arg2.toString().split('.')[1].length } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return accMul((r1 / r2), Math.pow(10, t2 - t1))
}

/**
 * @description 乘法 -解决精准度丢失
 * @param {String | Number} arg1
 * @param {String | Number} arg2
 * @returns {Number}
 *      example
 *          var a = accMul(1.23, 2.13)
 */
export function accMul(arg1, arg2) {
  var m = 0
  var s1 = arg1.toString()
  var s2 = arg2.toString()
  try { m += s1.split('.')[1].length } catch (e) {}
  try { m += s2.split('.')[1].length } catch (e) {}
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

/**
 * @description 加法-解决精准度丢失
 * @param {String | Number} arg1
 * @param {String | Number} arg2
 * @returns {String}
 *      example
 *          var a = accAdd(1.23, 2.13)
 */
export function accAdd(arg1, arg2) {
  var r1, r2, m
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

/**
 * @description 减法-解决精准度丢失
 * @param {String | Number} arg1
 * @param {String | Number} arg2
 * @returns {String}
 *      example
 *          var a = Subtr(1.23, 2.13)
 */
export function Subtr(arg1, arg2) {
  var r1, r2, m, n
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

/**
 * @description 隐藏手机号中间4位数
 * @param {String} mobile
 * @returns {String}
 */
export const hideMobileInfo = mobile => {
  let newMobile = '';
　　if (mobile.length > 7) {
      newMobile=mobile.substr(0, 3) + '****' + mobile.substr(7);
      return newMobile;
  } else {
      return mobile;
  }
}

/**
 * @description 隐藏邮箱号
 * @param {String} email
 * @returns {String} 返回已经脱敏的邮箱字符串
 */
export const hideEmailInfo= email => {
  if (String (email).indexOf ('@') > 0) {
      let newEmail, str = email.split('@'), _s = '';

      if (str[0].length > 4) {
          _s = str[0].substr (0, 4);
          for (let i = 0; i < str[0].length - 4; i++) {
              _s += '*';
          }
      } else {
          _s = str[0].substr (0, 1);
          for (let i = 0; i < str[0].length - 1; i++) {
              _s += '*';
          }
      }
      newEmail = _s + '@' + str[1];
      return newEmail;
  } else {
      return email;
  }
}

/**
 * @description 根据规则格式化时间为自定义格式
 * @param {Object | Number} time 需要被格式化的时间（值可以是Date对象或者是自1970年1月1日 00:00:00 UTC到当前时间的毫秒数）
 * @param {String} cFormat 格式化规则 '{y}-{m}-{d} {h}:{i}:{s} {a}' (y 年 m 月 d 日 h 时 i 分 s 秒 a 星期数)
 * example
 *        parseTime(new Date(), '{y}:{m}:{d}:{h}:{i} {a}')
 *        // "2019:07:09:09:02 二"
 *
 *        parseTime(Date.now(), '{y}:{m}:{d}')
 *        // "2019:07:09:09:02 二"
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * @description 格式化时间
 * @param {Number} time Unix时间戳(Unix timestamp)
 * @param {String} option  格式化规则 '{y}-{m}-{d} {h}:{i}:{s} {a}' (y 年 m 月 d 日 h 时 i 分 s 秒 a 星期数)
 * @returns string
 * example
 *        formatTime(1562635372)
 *        // "2分钟前"
 *
 *        formatTime(1552635372, '{y}:{m}')
 *        // "2019:03"
 */
export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * 获取字节流长度
 * @param {Sting} val input value
 * @returns {Number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else { len += 0.5 }
  }
  return Math.floor(len)
}

/**
 * @description 将json对象转换成地址栏 search 参数所需格式字符串
 * @param {Object} json
 * @returns {String}
 * example
 *        param({ a:1,b:2 })
 *        // "a=1&b=2"
 */
export function param (json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key])
  })).join('&')
}

/**
 * @description 获取地址栏的 search 解析后的对象
 * @param {String} url
 * @returns {Object} search解析后的对象
 * example
 *        param2Obj('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu')
 *        // {ie: "utf-8", f: "8", rsv_bp: "1", rsv_idx: "1", tn: "baidu"}
 */
export function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/**
 * @description 获取地址栏的 search 解析后的对象
 * @param {String} url
 * @returns {Object} search解析后的对象
 * example
 *        getQueryObject('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu')
 *        // {ie: "utf-8", f: "8", rsv_bp: "1", rsv_idx: "1", tn: "baidu"}
 */
export function getQueryObject (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @description 清除数组中没有值的项
 * @param {Array} actual
 * @returns {Array} 清除后的新数组
 * example
 *        cleanArray(["1", "", "2", undefined, "e"])
 *        // ["1", "2", "e"]
 */
export function cleanArray (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @description 合并对象
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @returns {Object | Array} 和源对象合并后的目标对象
 *      example
 *          var a = objectMerge({c:1},{b:2,a:3}) // {c: 1, b: 2, a: 3}
 *                  objectMerge({a:1}, [2,3]) // [2, 3]
 */
export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @description 深复制
 * @param {Object} source 源对象
 * @returns {Object} 和源对象合并后的目标对象
 *      example
 *          var a = {a:1}
 *          var b = deepClone(a) // b === a false
 *          var c = a  // c === a true
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @description 从当前DOM滚动到另一个DOM元素
 * @param {HTMLElement} element 当前元素
 * @param {HTMLElement} to 目标元素
 * @param {Number} duration 时间间隔
 * @returns void
 */
export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

/**
 * @description 给DOM元素添加className
 * @param {HTMLElement} element 操作的DOM元素
 * @param {String} className 类名
 * @returns void
 */
export function addClass(element, className) {
  if (hasClass(element, className)) {
    return
  }
  const newClass = element.className.split(' ')
  newClass.push(className)
  element.className = newClass.join(' ')
}

/**
 * @description 判断DOM是否包含className
 * @param {HTMLElement} element 操作的DOM元素
 * @param {String} className 类名
 * @returns {Boolean}
 */
export function hasClass(element, className) {
  const reg = new RegExp('(^|\\s+)' + className + '(\\s+|$)')
  return reg.test(element.className)
}

/**
 * @description 从当前DOM元素中移除className
 * @param {HTMLElement} element DOM元素
 * @param {String} className 类名
 * @returns void
 */
export function removeClass (element, className) {
  if (!hasClass(element, className)) {
    return
  }

  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  element.className = element.className.replace(reg, ' ')
}

/**
 * @description 从当前DOM元素中切换className
 * @param {HTMLElement} element DOM元素
 * @param {String} className 类名
 * @returns void
 * example
 *        toggleClass(document.getElementById('app'), 'wrapper')
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @description 检测对象是否是空对象(不包含任何可读属性)
 * @description 方法只既检测对象本身的属性，不检测从原型继承的属性
 * @param {Object} obj
 * @returns {Boolean}
 */
export function isOwnEmpty (obj) {
  for (var name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false
    }
  }
  return true
}