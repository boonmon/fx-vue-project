import { Toast } from 'mint-ui';
module.exports.validate = {

    //非空校验
    ifNull: (val, warning) => {
        if (!val) {
            Toast(warning);
            return;
        }
    },


    defaultValidate: (val, type, _toast) => {
        var patternStr = '';
        switch (type) {
            case 'mobilePhone':
                patternStr = '/^1[34578]d{9}$/';
                if (!(patternStr.test(val))) {
                    return false;
                }
                break;
            case 'email':
                patternStr = '/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ';
                if (!(patternStr.test(val))) {
                    return false;
                }
                break;
            case 'phone':
                patternStr = '/^(d{3}|d{4})(-)?(d{7}|d{8})/';
                if (!(patternStr.test(val))) {
                    return false;
                }
        }
        return true;
    },

    validation: function (arr, _toast) {
        //arr传入校验类数组,检验对象类 type(检验类型，提交内置检验函数的检验类型有mobilePhone\phone\email)
        //、msg(错误提示语)、callback(自定义检验函数)、required(是否必填)、value(该检验对象的值);
        //_toast传入的弹出窗对象，根据所选UI框架传入对应toast对象，若无则由默认方式弹出msg 
        var t;
        if (_toast) {
            t = _toast;
        } else {
            t = alert;
        }
        for (let item of arr) {
            if (item.required) {
                if (!item.value) {
                    t(item.msg || '请把表单填写完整');
                    return false;
                }
            }
            if (item.callback) {
                var c = item.callback();
                if (!c) {
                    t(item.msg || "请按正确格式填写");
                    return false;
                }
            }
            if (item.type == 'mobilePhone' || item.type == 'phone' || item.type == 'email') {
                var dv = defaultValidate(item.value, item.type);
                if (!dv) {
                    if (item.msg) {
                        t(item.msg);
                    } else {
                        switch (item.type) {
                            case 'mobilePhone':
                                t("请填写正确的手机号格式");
                                break;
                            case 'phone':
                                t("请填写正确的电话格式");
                                break;
                            case 'email':
                                t("请填写正确的邮箱格式");
                        }
                    }
                    return false
                }
            }
            return true;
        }
    }



}




