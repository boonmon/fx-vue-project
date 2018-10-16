/**
 * 跳转至http地址或vue-router配置的地址
 *
 * @export
 * @param {any} url
 */
export default function(url) {
    if (url && url.length > 0) {
        if (url.indexOf('http') > -1) {
            location.href = url
        } else {
            this.$router.push({ path: url })
        }
    }
}
