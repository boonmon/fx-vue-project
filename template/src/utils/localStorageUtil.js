export default {

    MACE_SELECED_INS:'mace_seleced_ins',
    MACE_LOGIN_REFRETOKEN:'mace_login_refretoken',
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
}
