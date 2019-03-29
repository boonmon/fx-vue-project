import localStorageUtil from '@/utils/localStorageUtil';

export default {
    WX_USER_ID: 'wx.user.id',
    WX_USER_UID: 'wx.user.uid',
    WX_USER_NAME: 'wx.user.userName', //用户名
    WX_USER_EMAIL: 'wx.user.email', //邮箱
    WX_USER_CUST_ID: 'wx.user.cust.id', //当前custid
    WX_USER_CUST_NAME: 'wx.user.cust.name', //当前custname
    WX_USER_ENCODE: 'wx.user.encode', //易code
    WX_USER_TOKEN: 'wx.user.token', //token
    WX_USER_PHONE: 'wx.user.userPhone', //手机号码
    WX_USER_CUSTSTORELIST: 'wx.user.custStoreList', //企业信息
    WX_USER_APPID: 'wx.user.appid', //微信appId
    WX_SERVICE_USER_INFO: 'wx.service.user.info', //微信用户信息
    WX_SELECTED_NEAR_USER: 'wx.selected.near.user', //最近选择人员
    BAOXIAO_PARAMS: 'BAOXIAO_PARAMS', //报销参数
    BAOXIAO_INVOICE: 'BAOXIAO_INVOICE', //票据
    BAOXIAO_INVOICE_TYPE: 'BAOXIAO_INVOICE_TYPE', //票据类型
    BAOXIAO_NOTPAY: 'BAOXIAO_NOTPAY', //未报销
    BAOXIAO_PRE_PROJECT: 'BAOXIAO_PRE_PROJECT', //上次选择的项目
    WX_SELECTED_NEAR_USER_INFO: 'wx.selected.near.user.info', //报销参数
    WX_PROJECT_SEARCH_RESULT: 'wx.project.search.result', //前三次选择的项目搜索结果
    WX_FLOW_FLOWDEFIND: 'wx.flow.flowDefind', //1-通用，2-定制(走方欣)
    WX_FLOW_DEFINDID: 'wx.flow.defindId', //流程id
    WX_FLOW_ISATTACHMENT: 'wx.flow.isAttachment', //是否上传附件0-不需要 1-需要
    WX_FLOW_ISWRITE: 'wx.flow.iswrite', //是否写入
    WX_PROJECT_HISTORY_PREFIX: 'wx.project.hsytory.', //项目搜索历史前缀
    WX_USER_CUST_NSRSBH:'wx.user.cust.nsrsbh',
    setItem(name, content) {
        if (!name) return
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        window.localStorage.setItem(name, content)
    },
    getItem(name) {
        if (!name) return
        return window.localStorage.getItem(name)
    },
    removeItem(name) {
        if (!name) return
        window.localStorage.removeItem(name)
    },
    checkIsAdmin() {
        let curentUserJson = this.getItem(this.WX_SERVICE_USER_INFO)
        if (!curentUserJson) {
            return false
        }
        let curentUser = JSON.parse(curentUserJson)
        let ret = false
        if (curentUser && curentUser.postList) {
            curentUser.postList.forEach(function(item, index) {
                console.log(item.postId)
                if (item.postId === 'expense_manager') {
                    ret = true
                }
            })
        }
        return ret
    },
    checkIsQctAdmin() {
        let curentUserJson = this.getItem(this.WX_SERVICE_USER_INFO)
        if (!curentUserJson) {
            return false
        }
        let curentUser = JSON.parse(curentUserJson)
        let ret = false
        if (curentUser && curentUser.postList) {
            curentUser.postList.forEach(function(item, index) {
                console.log(item.postId)
                if (item.postId === 'expense_owners') {
                    ret = true
                }
                if (item.postId === 'expense_final_trial') {
                    ret = true
                }
                if (item.postId === 'expense_manager') {
                    ret = true
                }
            })
        }
        return ret
    },

    //取当前的上一个月
    getLastDate(format) {
        let currDate = new Date()
        let year = currDate.getFullYear()
        let month = currDate.getMonth()
        if (month == '0') {
            year -= 1
            month = 12
        }

        if (month < 10) {
            month = '0' + String(month)
        }

        if (format == 'yyyy-MM') {
            return String(year) + '-' + String(month)
        } else {
            return String(year) + String(month)
        }
    },

    //获取上一年的月份
    getPastYear(format) {
        let currDate = new Date()
        let currSeconds = currDate.getTime()
        let yearSeconds = 365 * 24 * 60 * 60 * 1000
        let result = currSeconds - yearSeconds

        let pastDate = new Date(result)
        let pastYear = pastDate.getFullYear()
        let pastMonth = pastDate.getMonth()
        pastMonth = pastMonth < 10 ? '0' + String(pastMonth) : String(pastMonth)
        pastYear = String(pastYear)
        return format == 'yyyy-MM' ? pastYear + '-' + pastMonth : pastYear + pastMonth
    },

    /**
     * 获取登录token
     */
    getToken: () => {
        return localStorageUtil.getItem(localStorageUtil.WX_USER_TOKEN, "token");
    },
    getUserId: () => {
        let value = localStorageUtil.getItem(localStorageUtil.WX_USER_ID, "userId");
        return value;
    },
}