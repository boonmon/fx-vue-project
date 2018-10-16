/**
 * 金钱格式化
 *
 * 使用示例：
 * import util from "@/utils/"
 *
 * methods: {
 *     toMoney: util.toMoney,
 * }
 *
 * <div>{{toMoney(12345678)}}</div>
 *
 * 显示字符串 "123,456.78"
 *
 * @param {Number|String} val
 */
export default val => {
	if(!val){
        return '';
    }
    return Number.parseFloat(val).toLocaleString('zh-CN', {
        // style: 'currency',
        // currency: 'CNY',
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}
