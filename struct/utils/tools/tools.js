/**
 * 防抖
 * @param {*} func 回调函数，接收防抖函数执行完成后的结果
 * @param {*} wait(ms) 防抖时间间隔（单位：ms）
 * @param {*} immediate 防抖函数是否立即执行 true: 是  false: 否
 * @method {*} cancel 取消防抖（解除防抖时间间隔限制），再次触发立刻执行
 * @returns debounce 返回debounce对象
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
 * 节流
 * @param {*} func 回调函数，接收节流函数执行完成后的结果
 * @param {*} wait 节流时间间隔（单位：ms）
 * @param {*} options 配置参数对象 （leading和trailing只能存在一个）
 *                  leading: false 表示禁用 第一次执行
 *                  trailing: false 表示禁用 停止触发的回调    
 * @method {*} cancel 取消节流（解除节流时间间隔限制），再次触发立刻执行  
 * @returns throttle 返回节流对象
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
 * 数组去重
 * @param {*} array 包含有重复元素的数组（重复的对象也可以去除）
 * @returns arr 返回去重后的数组
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
 * 除法-解决精准度丢失
 * @param {*} arg1 参数A
 * @param {*} arg2 参数B
 * @returns arg1 / arg2 解决精度丢失后的数字
 *      example
 *          var a = accDiv(1.23, 2.13)
 */
export function accDiv(arg1, arg2) {
  var t1=0,t2=0,r1,r2;
  try { t1 = arg1.toString().split('.')[1].length } catch (e) {}
  try { t2 = arg2.toString().split('.')[1].length } catch (e) {}
  with(Math){
    r1=Number(arg1.toString().replace(".",""))
    r2=Number(arg2.toString().replace(".",""))
    return accMul((r1/r2),pow(10,t2-t1));
  }
}

/**
 * 乘法 -解决精准度丢失
 * @param {*} arg1 参数A
 * @param {*} arg2 参数B
 * @returns arg1 * arg2 解决精度丢失后的数字
 *      example
 *          var a = accMul(1.23, 2.13)
 */
export function accMul(arg1, arg2) {
  // eslint-disable-next-line
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString()
  try { m += s1.split('.')[1].length } catch (e) {}
  try { m += s2.split('.')[1].length } catch (e) {}
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

/**
 * 加法-解决精准度丢失
 * @param {*} arg1 参数A
 * @param {*} arg2 参数B
 * @returns arg1 + arg2 解决精度丢失后的数字
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
 * 减法-解决精准度丢失
 * @param {*} arg1 参数A
 * @param {*} arg2 参数B
 * @returns arg1 - arg2 解决精度丢失后的数字
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
 * @param {*} mobile 
 * @returns mobile 
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
 * @param {*} email
 * @returns email 返回已经隐藏的邮箱
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
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
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
 * @description 合并对象
 * @param {*} target 目标对象
 * @param {*} source 源对象
 * @returns 和源对象合并后的目标对象
 *      example
 *          var a = objectMerge({c:1},{b:2,a:3}) // {c: 1, b: 2, a: 3}
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
 * @description 深复制
 * @param {*} source 源对象
 * @returns 和源对象合并后的目标对象
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
 * @param {*} element 操作的DOM元素
 * @param {*} to 目标DOM元素
 * @param {*} duration 时间
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
 * @param {*} element 操作的DOM元素
 * @param {*} className 类名
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
 * @param {*} element 操作的DOM元素
 * @param {*} className 类名
 * @returns boolean
 */
export function hasClass(element, className) {
  const reg = new RegExp('(^|\\s+)' + className + '(\\s+|$)')
  return reg.test(element.className)
}

/**
 * @description 从当前DOM元素中移除className
 * @param {*} el DOM元素
 * @param {*} className 类名
 * @returns void
 */
export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }

  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}

/**
 * @description 从当前DOM元素中切换className
 * @param {*} element DOM元素
 * @param {*} className 类名
 * @returns void
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
