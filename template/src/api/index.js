import axios from 'axios'
import config from './config'
import Qs from 'qs'

const devName = ''
const wechat = 'wechat'
const wechatAuth = 'wechatAuth'
const wxUrl = config.wxUrl
const wxAppId = config.wxAppId
const appId = config.appId
const cmsAppId = '000111'
const methodParams = require('./methodParams.json')

import localStorageUtil from '@/utils/localStorageUtil'
import apiList from './apiList.js'
/*if (process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'test' ||
    process.env.NODE_ENV === 'preproduction' ||
    process.env.NODE_ENV === 'dev' ||
    process.env.NODE_ENV === 'local') {} else {
localStorageUtil.setItem(localStorageUtil.WX_USER_TOKEN, '3a7c4fc047054e808c6470f38784066010002002da26409acbd09f36')    
}*/
var guidGenerator = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
var getUUID = function () {
    return (guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator() + guidGenerator())
}

const urlCommonParams = () => {
    var s = 'requestId=' + getUUID() + '&appId=' + appId + '&token=' + localStorageUtil.getItem(localStorageUtil.WX_USER_TOKEN)
    return s
}

// api工厂
const apiFactory = uri => payload => axios.post(uri, JSON.stringify(payload), config)
const apiGetFactory = uri => payload => axios.get(uri, {}, config)

const cmsApiFactory = uri => payload => axios.post(uri, JSON.stringify(payload), config)
// url参数模板

// 函数调用映射
const factoryMapper = {
    apiFactory,
    apiGetFactory,
    cmsApiFactory,
}
// 读取api列表
import apiList from './apiList.js'

export default {

    getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2]);
        return null
    },
    getQueryStringEx(name) {
        let key, value;
        let str = window.location.href; //取得整个地址栏
        let num = str.indexOf("?");
        str = str.substr(num + 1); //取得所有参数
        let arr = str.split("&"); //各个参数放到数组里
        for (let i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                key = arr[i].substring(0, num);
                if (key == name) {
                    value = arr[i].substr(num + 1);
                    // break; 如果地址里面有多个一样的参数  取最后一个的值lee
                }
            }
        }
        return value;
    },

    getCache(cacheName) {
        let key = cacheName
        if (sessionStorage.getItem(key)) {
            let res = JSON.parse(sessionStorage.getItem(key))
            return res
        }
        return false
    },

    //生产对应url参数的axios请求函数
    factoryFunction(item) {
        let _appId = item.appId || appId;
        let develop = item.develop ? 'develop' : 'normal';
        let method = item.method ? item.method : 'post';
        let uri;
        let _config = item.config || {};
        if (process.env.NODE_ENV !== 'development') {
            develop = 'normal';
        }
        const urlParam = {
            normal: 'requestId=' + getUUID() + '&token=' + localStorageUtil.getItem(localStorageUtil.WX_USER_TOKEN) + '&appId=' + _appId,
            develop: 'requestId=' + getUUID() + '&token=' + localStorageUtil.getItem(localStorageUtil.WX_USER_TOKEN) + '&appId=' + _appId + '&develop=' + item.develop,
        }
        if (item.uri.indexOf('?') > -1) {
            uri = item.uri + '&' + urlParam[develop];
        } else {
            uri = item.uri + '?' + urlParam[develop];
        }

        if (item.instance) {
            let instance = new axios({
                ...item.instance
            })
            return payload => instance[method](uri, JSON.stringify(payload));
        } else {
            let asConfig = JSON.parse(JSON.stringify(config));
            Object.assign(asConfig, _config);
            return payload => axios[method](uri, JSON.stringify(payload), asConfig);
        }
    },

    commonApiFactory(data, method) {
        let assembledApiList = {};
        let item = apiList[method];
        if (!item) {
            throw Error(`api列表中未定义[${method}]`);
        }
        let cacheName = item.cacheName || process.env.NODE_ENV + '.' + method;
        if (item.defaultData) {
            Object.assign(data, defaultData);
        }
        if (item.cache) {
            data.__CACHE__ = true;
            data.__CACHENAME__ = cacheName;
            let res = this.getCache(cacheName);
            if (res) return res;
        }
        if (item.notShowLoading) {
            data.__NOTSHOWLOADING__ = true;
        }
        assembledApiList[method] = this.factoryFunction(item);
        return assembledApiList[method](data)
    }



}