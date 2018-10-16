/**
 * 获取平台类型(01android，02ios，03微信)
 */
export default ()=>{
    let deviceIsWx = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger";
    let deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
    let deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
    let deviceIsIOS = /iPhone/.test(navigator.userAgent) && !deviceIsWindowsPhone;
    if(deviceIsWx){
        return "03"
    }else if(deviceIsAndroid){
        return "01"
    }else if(deviceIsIOS){
        return "02"
    }else{
        return "03"
    }
}
