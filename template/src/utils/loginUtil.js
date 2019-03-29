import localStorageUtil from './localStorageUtil'
import sessionStorageUtil from './sessionStorageUtil'
export default {

    setLoginInfo(data) {
        console.log("userinfo", data)
        sessionStorageUtil.setItem(sessionStorageUtil.WX_USER_LOGIN, true);
        localStorageUtil.setItem(localStorageUtil.WX_USER_ID, data.userId);
        localStorageUtil.setItem(localStorageUtil.WX_USER_UID, data.uid);
        localStorageUtil.setItem(localStorageUtil.WX_USER_TOKEN, data.token);
        localStorageUtil.setItem(localStorageUtil.WX_USER_ENCODE, data.encode);
        localStorageUtil.setItem(localStorageUtil.WX_USER_PHONE, data.phone);
        localStorageUtil.setItem(localStorageUtil.WX_USER_APPID, data.appId);
        localStorageUtil.setItem(localStorageUtil.WX_USER_NAME,data.userName);
        localStorageUtil.setItem(localStorageUtil.WX_USER_EMAIL,data.email);
        localStorageUtil.setItem(localStorageUtil.WX_USER_CUSTSTORELIST, data.cusList ==
            undefined ? "" : JSON.stringify(data.cusList));
        localStorageUtil.setItem(localStorageUtil.WX_SERVICE_USER_INFO, JSON.stringify(data.wxServerUserInfo));

        var custId = localStorageUtil.getItem(localStorageUtil.WX_USER_CUST_ID) || '';

        console.info("data.cusList=", data.cusList);


        if (data.cusList != null && data.cusList.length > 0) {
            localStorageUtil.setItem(localStorageUtil.WX_USER_CUST_ID, data.cusList[0].custId); //默认选中第一个企业
            localStorageUtil.setItem(localStorageUtil.WX_USER_CUST_NAME, data.cusList[0].custName); //默认选中第一个企业
            localStorageUtil.setItem(localStorageUtil.WX_USER_CUST_NSRSBH, data.cusList[0].nsrsbh); //默认选中第一个企业
        }

    },
    logout() {
        localStorageUtil.removeItem(localStorageUtil.WX_USER_ID);
        localStorageUtil.removeItem(localStorageUtil.WX_USER_UID);
        localStorageUtil.removeItem(localStorageUtil.WX_USER_NAME);
        localStorageUtil.removeItem(localStorageUtil.WX_USER_EMAIL);
        localStorageUtil.removeItem(localStorageUtil.WX_USER_TOKEN);
        localStorageUtil.removeItem(localStorageUtil.WX_USER_ENCODE);
        localStorageUtil.removeItem(localStorageUtil.WX_USER_PHONE);
        localStorageUtil.removeItem(localStorageUtil.WX_USER_APPID);
        localStorageUtil.removeItem(localStorageUtil.WX_USER_CUSTSTORELIST);
        localStorageUtil.removeItem(localStorageUtil.WX_SERVICE_USER_INFO);
        localStorageUtil.removeItem(localStorageUtil.WX_USER_CUST_ID);
        localStorageUtil.removeItem(localStorageUtil.WX_USER_CUST_NAME);
        localStorageUtil.removeItem(localStorageUtil.WX_USER_CUST_NSRSBH);
        sessionStorageUtil.removeItem(sessionStorageUtil.WX_USER_LOGIN);
    },
    ssoLogin(ssoClientUrl){
        let ssoClientUrlFinal = decodeURI(ssoClientUrl)
        console.info("登录成功跳转地址="+ssoClientUrlFinal);
        let token = localStorageUtil.getItem(localStorageUtil.WX_USER_TOKEN);
        if(ssoClientUrlFinal.indexOf("?")>-1){
            ssoClientUrlFinal = ssoClientUrlFinal+"&token="+token
        }
        else{
            ssoClientUrlFinal = ssoClientUrlFinal+"?token="+token
        }
        sessionStorageUtil.removeItem(sessionStorageUtil.WX_SSO_CLIENT_URL)
        window.location.href = ssoClientUrlFinal;
    }


}