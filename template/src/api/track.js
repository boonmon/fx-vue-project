export default {
  // name  =  _track
  // 公司埋点
  _track_setCompany (customerCode, customerName) {
    try {
      _maq.push(['_setCompany', customerCode, customerName])
    } catch (e) {
      console.log('公司埋点报错' + e)
    }
  },
  // 用户埋点
  // 用户id 用户名 帐号类型(001：企业主002：代账公司003：工厂？)  类型:WX PT ZFB QQ
  _track_setUser (userId, userName, type, source) {
    try {
      _maq.push(['_setUser', userId, userName, type, source])
    } catch (e) {
      console.log('用户埋点报错' + e)
    }
  },
  // 行为事件埋点  分名名称  行为名称  额外信息 数值信息
  _trackEvent (eventName, actionName, data, extdata) {
    try {
      _maq.push(['_trackEvent', eventName, actionName, data, extdata])
    } catch (e) {
      console.log('行为事件埋点报错' + e)
    }
  },
  // PV
  _trackPageview (auto, url, actionName) {
    try {
      _maq.push(['_setAutoPageview', auto])
      _maq.push(['_trackPageview', url, actionName])
    } catch (e) {
      console.log('PV埋点报错' + e)
    }
  }
}
