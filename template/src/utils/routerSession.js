import sessionStorageUtil from './sessionStorageUtil'
const routerStorePrefixed = 'router_';
/**
 * 路由params缓存，用于刷新
 * @param  {[type]} router [description]
 * @return {[type]}        [description]
 */
export const routerParamsStore = (router)=>{
     if(isEmptyObject(router.params)){
         let ob = sessionStorageUtil.getItem(routerStorePrefixed+router.name);
         if(ob){
           Object.assign(router.params,ob);
         }
     }else{
        console.log(router.params)
        sessionStorageUtil.setItem(routerStorePrefixed+router.name,router.params);
     }
}
/**判断对象是否为空
 * [isEmptyObject description]
 * @param  {[type]}  ob [description]
 * @return {Boolean}   [description]
 */
function isEmptyObject(ob) {  
        var t;  
        for (t in ob)  
            return false;  
        return true 
 }  