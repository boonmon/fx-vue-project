import localStorageUtil from './localStorageUtil'
import sessionStorageUtil from './sessionStorageUtil'
import cookieUtil from './cookieUtil';
export default {

   changeIns(selectIns){

        let maceSelectIns=localStorageUtil.getItem(localStorageUtil.MACE_SELECED_INS);
        maceSelectIns=JSON.parse(maceSelectIns);

        for(var i=0;i<maceSelectIns.length;i++){

         let userId=maceSelectIns[i].userId

         if(userId==selectIns.userId){
             maceSelectIns[i].insId=selectIns.insId
             maceSelectIns[i].insName=selectIns.insName
             maceSelectIns[i].depId=selectIns.depId

             sessionStorageUtil.setItem(sessionStorageUtil.MACE_SELECED_INS_ID,selectIns.insId)
             sessionStorageUtil.setItem(sessionStorageUtil.MACE_SELECED_INS_NAME,selectIns.insName)
             sessionStorageUtil.setItem(sessionStorageUtil.MACE_SELECED_DEP_ID,selectIns.depId)
             break
         }

       }

       localStorageUtil.setItem(localStorageUtil.MACE_SELECED_INS,maceSelectIns);

    },

	 setLoginInfo(userinfo){

     sessionStorageUtil.setItem(sessionStorageUtil.MCE_USER_ID,userinfo.userId);//用户Id
     sessionStorageUtil.setItem(sessionStorageUtil.MCE_USER_INFO,userinfo);//用户信息
     sessionStorageUtil.setItem(sessionStorageUtil.MCE_INS_INFO,userinfo.departmentList);//机构信息

     localStorageUtil.setItem(localStorageUtil.MACE_LOGIN_REFRETOKEN,userinfo.refreshToken);//设置refreshToken
     let maceSelectIns=localStorageUtil.getItem(localStorageUtil.MACE_SELECED_INS);

     let flag=0;
     if(maceSelectIns!=null){

        maceSelectIns=JSON.parse(maceSelectIns);
        for(var i=0;i<maceSelectIns.length;i++){

         let userId=maceSelectIns[i].userId

         if(userId==userinfo.userId){

             sessionStorageUtil.setItem(sessionStorageUtil.MACE_SELECED_INS_ID,maceSelectIns[i].insId)
             sessionStorageUtil.setItem(sessionStorageUtil.MACE_SELECED_INS_NAME,maceSelectIns[i].insName)
             sessionStorageUtil.setItem(sessionStorageUtil.MACE_SELECED_DEP_ID,maceSelectIns[i].depId)
             flag=1;
             break
         }

       }
     }else{

         maceSelectIns=[]

     }
    
     if(flag==0){

          let item={userId:userinfo.userId, 
            insId:userinfo.departmentList[0].insId,
            insName:userinfo.departmentList[0].insName,
            depId:userinfo.departmentList[0].depId}
          maceSelectIns.push(item);
          sessionStorageUtil.setItem(sessionStorageUtil.MACE_SELECED_INS_ID,userinfo.departmentList[0].insId)//默认选中第一个机构
          sessionStorageUtil.setItem(sessionStorageUtil.MACE_SELECED_INS_NAME,userinfo.departmentList[0].insName)//默认选中第一个机构
          sessionStorageUtil.setItem(sessionStorageUtil.MACE_SELECED_DEP_ID,userinfo.departmentList[0].depId)//默认选中第一个部门id

          localStorageUtil.setItem(localStorageUtil.MACE_SELECED_INS,JSON.stringify(maceSelectIns))
     }
     

	 },
	 logout(){
         //debugger;
          window.sessionStorage.clear();
          window.localStorage.clear();
          cookieUtil.delCookie("autologin");

	 }
	
    
}