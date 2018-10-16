import { Toast} from 'mint-ui';
module.exports.validate = {

    //非空校验
    ifNull : (val,warning) =>{
        if(!val){
            Toast(warning);
            return;
        }
    },


    validateData : (val,type) => {
        var patternStr;
        switch (type){
            case 'mobilePhone'   :
                patternStr = /^1[34578]\d{9}$/;
                if(!(patternStr.test(val))){
                    Toast('手机号码格式不正确');
                    return;
                }
                break;
            case 'email' :
                patternStr = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                if(!(patternStr.test(val))){
                    Toast('邮箱格式不正确');
                    return;
                }
                break;


            default: return;
        }
    },




}




