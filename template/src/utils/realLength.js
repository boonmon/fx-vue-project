/**
 * 获取字符串实际长度（一个汉字等于两个字符长度）
 *
 * import util from "@/utils/realLength"
 *
 *
 * let str = "我是test"
 * let length = realLength(str)
 * console.log(length) // 8
 *
 *
 * @param {String} str
 */
export default str => {
    if (str) {
        return str.replace(/[^\x00-\xff]/g, "xx").length;
    } else {
        return 0;
    }
}