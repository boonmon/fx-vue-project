export default {
    WX_SSO_CLIENT_URL: 'WX_SSO_CLIENT_URL',
    WX_USER_WECHAT_CODE: 'wx.user.wechat.code', //wechatcode
    WX_USER_LOGIN: 'wx.user.login', //登录状态
    WX_USER_CODE: 'wx.user.code', //微信code

    BAOXIAO_PARAMS: 'BAOXIAO_PARAMS', //报销参数
    BAOXIAO_INVOICE: 'BAOXIAO_INVOICE', //票据
    BAOXIAO_INVOICE_TYPE: 'BAOXIAO_INVOICE_TYPE', //票据类型
    BAOXIAO_NOTPAY: 'BAOXIAO_NOTPAY', //未报销
    BAOXIAO_MODIFY_EXIST: 'BAOXIAO_MODIFY_EXIST', //是修改报销单
    BAOXIAO_IMGS: 'BAOXIAO_IMGS', //图片缓存
    BAOXIAO_LAST_IMG_ID: 'BAOXIAO_LAST_IMG_ID', //图片上一个id
    WX_SELECTED_NEAR_USER_INFO: 'wx.selected.near.user.info', //报销选择人员信息
    WX_USER_ID_SAME: 'wx.user.id.same', //通讯录用户维护的时候是否当前用户

    setItem(name, content) {
        if (!name) return
            // content undefined是节点缺失，所以禁止保存
        if (typeof content === 'undefined') throw TypeError('sessionStorage.setItem的值为undefined')
        window.sessionStorage.setItem(name, JSON.stringify(content))
    },
    getItem(name) {
        if (!name) return
        return JSON.parse(window.sessionStorage.getItem(name))
    },
    removeItem(name) {
        if (!name) return
        window.sessionStorage.removeItem(name)
    },
}