/**
 * undefined,null,NaN,'',[],{} 都判定为empty
 *
 * @param {*} val
 */
export default val => {
    let type = Object.prototype.toString.call(val)
    if (typeof val === 'undefined' || val === null || Number.isNaN(val)) {
        return true
    }
    if (type === '[object Array]' || type === '[object String]') {
        return val.length === 0
    }
    if (
        type === '[object Number]' ||
        type === '[object Boolean]' ||
        type === '[object RegExp]' ||
        type === '[object Function]' ||
        type === '[object Date]' ||
        type === '[object Error]'
    ) {
        return false
    }
    return Object.keys(val).length === 0
}
