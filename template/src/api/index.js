import axios from 'axios'
import config from './config'

const devName = ''
const appId = config.appId
const cmsAppId = '000111'

import localStorageUtil from '@/utils/localStorageUtil'

if (process.env.CUR_ENV === 'development') {

}

var guidGenerator = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
export const getUUID = function() {
    return (
        guidGenerator() +
        guidGenerator() +
        guidGenerator() +
        guidGenerator() +
        guidGenerator() +
        guidGenerator() +
        guidGenerator() +
        guidGenerator()
    )
}

// api工厂
const apiFactory = uri => payload => axios.post('/mgateway' + uri, JSON.stringify(payload), config)
const cmsApiFactory = uri => payload => axios.post('/gateway' + uri, JSON.stringify(payload), config)

// 函数调用映射
const factoryMapper = {
    apiFactory,
    cmsApiFactory
}

// 读取api列表
const apiList = require('./apiList.json5')

export default {
    getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2])
        return null
    },
    methodFunction(method, paramObj) {
        const urlParam = {
            normal: '?requestId=' + getUUID() + '&appId=' + appId,
            hsy: '?requestId=' + getUUID() + '&appId=' + appId + '&develop=-hsy',
            lzw: '?requestId=' + getUUID() + '&appId=' + appId + '&develop=-lzw',
            cms: '?requestId=' + getUUID() + '&appId=' + cmsAppId,
            wyz: '?requestId=' + getUUID() + '&appId=' + appId + '&develop=-wyz',
            lxy: '?requestId=' + getUUID() + '&appId=' + appId + '&develop=-lxy',
        }
        if (process.env.NODE_ENV !== 'development') {
            for (let key in urlParam) {
                urlParam[key] = '?requestId=' + getUUID() + '&appId=' + appId
                if (key == 'cms') {
                    urlParam[key] = '?requestId=' + getUUID() + '&appId=' + cmsAppId
                }
            }
        }
        let item = apiList[method]
        if (!item) {
            throw (`method:'${method}'没有找到,请检查是否未定义或method名拼写错误`)
        }
        let funcName = item[0]
        let _func = factoryMapper[funcName](item[1] + urlParam[item[2]])
        let _paramObj = paramObj
        if (item[3]) {
            //如果有默认参数且传入参数不含默认参数，则往传入参数添加默认参数
            for (let key in item[3]) {　　
                if (item[3].hasOwnProperty(key) && (!_paramObj.hasOwnProperty(key))) {　　　　
                    _paramObj[key] = item[3][key]　　　
                }　
            }
        }
        return _func(_paramObj)
    }
}