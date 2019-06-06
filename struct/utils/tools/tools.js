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