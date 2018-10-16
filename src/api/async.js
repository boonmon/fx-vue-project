import api from '@/api/'

/**
 * 根据响应规范封装的异步处理流程
 *
 *
 * @param {Object} that        Vue组件的this
 * @param {String} method      src/api/index.js里定义的方法名
 * @param {Object} paramObj    参数对象
 * @param {Function} callback  回调函数，其参数为服务器返回的json
 * @param {String} loadingMsg  （可选参数）Indicator内容
 * @param {String} errorMsg    （可选参数）自定义错误提示信息，loadingMsg必须传入。当errorMsg===''时不会提示
 * @param {Function} errorCallback（可选参数）错误回调函数
 * @param {Boolean} doCallbackWhenNetworkError（可选参数）当网络错误时也执行errorCallback
 */
export const standardAsync = (
    that,
    method,
    paramObj,
    callback,
    loadingMsg = null,
    errorMsg = null,
    errorCallback = noop,
    doCallbackWhenNetworkError = true
) => {
    abstractStep(that, method, paramObj, callback, loadingMsg, errorMsg, errorCallback, doCallbackWhenNetworkError)
}

/**
 * 更灵活的封装，参数自由选择且顺序无关
 * @param {Object} option
 */
export const customAsync = option => {
    if (option.that && option.method && option.paramObj) {
        abstractStep(
            option.that,
            option.method,
            option.paramObj,
            option.callback ? option.callback : noop,
            option.loadingMsg ? option.loadingMsg : null,
            // 传入 errorMsg:"" 可以不提示服务端返回的错误
            option.errorMsg ? option.errorMsg : null,
            option.errorCallback ? option.errorCallback : noop,
            option.doCallbackWhenNetworkError ? option.doCallbackWhenNetworkError : true
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
    callback,
    loadingMsg,
    errorMsg,
    errorCallback,
    doCallbackWhenNetworkError
) {
    if (paramObj && paramObj.notShowLoading) {} else {
        //此处可开启 加载中 显示 可通过定义loadingMsg加载提示文字
        //code...
    }
    api['methodFunction'](method, paramObj)
        .then(response => {
            processReponse(that, method, paramObj, callback, response, errorMsg, errorCallback)
        })
        .catch(error => {
            // 在http失败时，提示axios封装的错误，自定义的errorMsg将被忽略
            processError(that, error, method, paramObj, errorCallback, doCallbackWhenNetworkError)
        })
}

// 处理服务端返回
function processReponse(that, method, paramObj, callback, response, errorMsg, errorCallback) {
    if (paramObj && paramObj.notShowLoading) {} else {
        //此处关闭 加载中 显示
        //code...
    }
    // HTTP OK
    if (response.status === 200) {
        // head存在判断
        if (response.data.head) {
            // 服务响应成功
            if (response.data.head.errorCode === '0') {
                // 回调
                callback.bind(that)(response.data)
            } else {
                // 此处可自定义服务端返回错误代码时的处理
                if (errorMsg) {
                    // 显示自定义错误
                    alert(errorMsg)
                } else if (errorMsg === '') {
                    // 不显示错误
                } else {
                    // 显示服务端返回的错误
                    response.data.head.errorMsg ?
                        alert(response.data.head.errorMsg) :
                        alert(`${method}返回errorCode不为0，且缺少head.errorMsg`)
                }

                errorCallback.bind(that)()
            }
        } else {
            alert('服务端返回的数据格式错误：缺少head')
        }
    } else {
        // status===2xx && status!==200
        alert(response.status + ' ' + response.statusText)
    }
}

//  处理网络错误、请求配置错误等
function processError(that, error, method, paramObj, errorCallback, doCallbackWhenNetworkError) {
    if (paramObj && paramObj.notShowLoading) {} else {
        //此处关闭 加载中 显示
        //code...
    }
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert('Error: ' + error.response.status + ' ' + error.response.statusText)
    } else {
        // Something happened in setting up the request that triggered an Error
        alert(error.message)
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
        errorCallback.bind(that)()
    }
}