import api from '@/api/'
import sessionStorageUtil from '@/utils/sessionStorageUtil'
{{#mintUI}}
import { Toast, Indicator } from 'mint-ui'
{{/mintUI}}
import isEmpty from '@/utils/isEmpty'

/**
 * 根据响应规范封装的异步处理流程
 *
 * 使用示例见 src/pages/demo/mint.vue
 *
 * @param {Object} that        Vue组件的this
 * @param {String} method      src/api/index.js里定义的方法名
 * @param {Object} paramObj    参数对象
 * @param {Function} callback  回调函数，其参数为服务器返回的json
 * @param {String} loadingMsg  （可选参数）Indicator内容
 * @param {String} errorMsg    （可选参数）自定义错误提示信息，loadingMsg必须传入。当errorMsg===''时不会提示
 * @param {Function} errorCallback（可选参数）错误回调函数
 * @param {Boolean} doCallbackWhenNetworkError（可选参数）当网络错误时也执行errorCallback
 * 灵活的封装，参数自由选择且顺序无关
 * @param {Object} option
 */
export const customAsync = option => {
    if (option.that && option.method && option.paramObj) {
        abstractStep(
            option.that,
            option.method,
            option.paramObj,
            option.notShowLoading,
            option.callback ? option.callback : noop,
            option.cache, //如果接口在某页面需要接受大量数据需做缓存，其他页面不需要，则可在请求函数单独配置
            option.cacheName,//此处定义的cacheName享有优先级
            option.filterFlag,
            option.loadingMsg ? option.loadingMsg : null,
            // 传入 errorMsg:"" 可以不提示服务端返回的错误
            option.errorMsg ? option.errorMsg : null,
            option.errorCallback ? option.errorCallback : noop,
            option.doCallbackWhenNetworkError ? option.doCallbackWhenNetworkError : true,
            option.notShowNetworkError
        )
    } else {
        throw Error('customAsync参数必须包含that,method,paramObj')
    }
}

// =============================================================================

function noop() {}

// 抽象步骤
function abstractStep(
    that,
    method,
    paramObj,
    _notShowLoading,
    callback,
    cache,
    _cacheName,
    filterFlag,
    loadingMsg,
    errorMsg,
    errorCallback,
    doCallbackWhenNetworkError,
    notShowNetworkError
) {
        let apiMethodConfig
        if (api[method]) {
            apiMethodConfig = api[method](paramObj);
        } else {
            apiMethodConfig = api['commonApiFactory'](paramObj, method);
            // throw Error(`api列表中未定义[${method}]`)
        }
        let notShowLoading;
        let cacheName;
        if(paramObj.__NOTSHOWLOADING__) {
            notShowLoading = true;
        } else {
            notShowLoading = _notShowLoading;
        }
        if (notShowLoading) {} else {
            {{#mintUI}}
            Indicator.open({
                text: loadingMsg ? loadingMsg : '加载中...',
                spinnerType: 'triple-bounce',
            })
            {{else}}
            {{#weUI}}
            var loading = weui.loading('loading', {
                className: 'custom-classname'
            });
            {{/weUI}}
            {{/mintUI}}
        }
        if(cache) {
            cacheName = _cacheName || paramObj.__CACHENAME__;
            if(cacheName) {
                throw Error('没有定义cacheName(缓存名称)');
            }
        } else {
            if(paramObj.__CACHE__) {
                cacheName = paramObj.__CACHENAME__;
                delete paramObj.__CACHE__;
                delete paramObj.__CACHENAME__;
            }
        }
        if (apiMethodConfig.body) {
            callback.bind(that)(apiMethodConfig)
            return;
        }
        apiMethodConfig
            .then(response => {
                let notShowLoading
                if(paramObj.__NOTSHOWLOADING__) {
                    notShowLoading = true;
                    delete paramObj.__NOTSHOWLOADING__;
                } else {
                    notShowLoading = option.notShowLoading;
                }
                processReponse(that, method, paramObj,notShowLoading, callback, cacheName, response,filterFlag, errorMsg, errorCallback, methodObj)
            })
            .catch(error => {
                // 在http失败时，提示axios封装的错误，自定义的errorMsg将被忽略
                processError(that, error, method, paramObj,notShowLoading, doCallbackWhenNetworkError,notShowNetworkError)
            })
    
}

// 处理服务端返回
function processReponse(that, method, paramObj, notShowLoading, callback, cacheName, response,filterFlag, errorMsg, errorCallback, methodObj,) {
    if (notShowLoading) {} else {
        if (!methodObj || !methodObj.notShowLoading) {
            {{#mintUI}}
            Indicator.close()
            {{else}}
            {{#weUI}}
            loading.hide(function() {});
            {{/weUI}}
            {{/mintUI}}
        }
    }

    // HTTP OK
    if (response.status === 200) {
        // head存在判断
        if(filterFlag) {
           //拦截，自定义成功获取数据后的操作
           callback.bind(that)(response.data)
        }
        if (response.data.head) {
            // 服务响应成功
            if (response.data.head.errorCode === '0') {
                // 回调
                callback.bind(that)(response.data)
                if(cacheName) {
                    setCache(cacheName, response.data)
                }
            } else {
                if (errorMsg) {
                    // 显示自定义错误
                    {{#mintUI}}
                    Toast(errorMsg)
                    {{else}}
                    {{#weUI}}
                    Toast(errorMsg)
                    {{/weUI}}
                    {{/mintUI}}
                } else if (errorMsg === '') {
                    // 不显示错误
                } else {
                    // 显示服务端返回的错误
                    {{#mintUI}}
                    response.data.head.errorMsg ?
                        Toast(response.data.head.errorMsg) :
                        Toast(`${method}返回errorCode不为0，且缺少head.errorMsg`);
                    {{else}}
                    {{#weUI}}
                    response.data.head.errorMsg ?
                    weui.toast(response.data.head.errorMsg) :
                    weui.toast(`${method}返回errorCode不为0，且缺少head.errorMsg`);
                    {{/weUI}}
                    {{/mintUI}}
                    if ('010121' === response.data.head.errorCode) {
                        //如果是发布环境，则跳转到登录
                        sessionStorageUtil.removeItem(sessionStorageUtil.WX_USER_LOGIN) //清除登陆状态
                        setTimeout(function() {
                            window.location.reload() //重新刷新登录
                        }, 1000)
                    }
                }
                errorCallback.bind(that)()
            }
        } else {
            {{#mintUI}}
            Toast('服务端返回的数据格式错误：缺少head')
            {{else}}
            {{#weUI}}
            weui.toast('服务端返回的数据格式错误：缺少head')
            {{/weUI}}
            {{/mintUI}}
        }
    } else {
        // status===2xx && status!==200
        {{#mintUI}}
        Toast(response.status + ' ' + response.statusText)
        {{else}}
        {{#weUI}}
        weui.toast(response.status + ' ' + response.statusText)
        {{/weUI}}
        {{/mintUI}}
    }
}

//  处理网络错误、请求配置错误等
function processError(that, error, method, paramObj, notShowLoading, errorCallback, doCallbackWhenNetworkError,notShowNetworkError) {
    if (notShowLoading) {} else {
        {{#mintUI}}
        Indicator.close()
        {{else}}
        {{#weUI}}
        loading.hide(function() {});
        {{/weUI}}
        {{/mintUI}}
    }
    // log
    console.log('')
    console.log('=============== Error ===============')
    console.log('method: ', method)
    console.log('message: ', error.message)
    console.log('response: ', error.response)
    console.log('config: ', error.config)
    console.log('============ End of Error ============')
    console.log('')
    
    if (doCallbackWhenNetworkError) {
        //自定义网络错误后的操作，配合notShowNetworkError可以定义自己的错误提示
        errorCallback.bind(that)(error)
    }
    if(notShowNetworkError) {
        return;
    }
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        {{#mintUI}}
        Toast('Error: ' + error.response.status + ' ' + error.response.statusText);
        {{else}}
        {{#weUI}}
        weui.toast('Error: ' + error.response.status + ' ' + error.response.statusText);
        {{/weUI}}
        {{/mintUI}}
    } else {
        // Something happened in setting up the request that triggered an Error
        {{#mintUI}}
        Toast('Error: ' + error.message);
        {{else}}
        {{#weUI}}
        weui.toast('Error: ' + error.message);
        {{/weUI}}
        {{/mintUI}}
    }
    
}

function setCache(cacheName, value) {
    if (!isEmpty(value)) {
        sessionStorage.setItem(cacheName, JSON.stringify(value))
    }
}