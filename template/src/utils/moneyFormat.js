/*
 *  import {formatMoney} from '@/utils/moneyFormat';
 *
 */
import toMoney from './toMoney'
export const formatMoney = (amount) => {
    var amount = Number(amount);
    var label = '';
    if (amount < 0) {
        amount = -amount;
        label = '-';
    };
    const MILLION = Number(10000.0);
    const MILLIONS = Number(1000000.0);
    const BILLION = Number(100000000.0);
    const MILLION_UNIT = "万";
    const BILLION_UNIT = "亿";

    let moneyObj = {
        amount: 0, //-1000.00
        unit: '', //亿
        result: '', //-10,00.00亿
    }

    //金额大于1百万小于1亿
    if (amount > MILLIONS && amount < BILLION) {
        moneyObj.amount = parseFloat(label + (Math.round(amount * 100 / MILLION)) / 100).toFixed(2);
        moneyObj.unit = MILLION_UNIT;
        moneyObj.result = toMoney(label + (Math.round(amount * 100 / MILLION)) / 100) + MILLION_UNIT;

    } else if (amount >= BILLION) { //金额大于1亿
        moneyObj.amount = parseFloat(label + (Math.round(amount * 100 / BILLION)) / 100).toFixed(2);
        moneyObj.unit = BILLION_UNIT;
        moneyObj.result = toMoney(label + (Math.round(amount * 100 / BILLION)) / 100) + BILLION_UNIT;
    } else {
        moneyObj.amount = parseFloat(label + amount).toFixed(2);
        moneyObj.result = toMoney(label + amount);
    }

    return moneyObj
}



// direct output
export function toBigMoney(price) {
    let moneyObj = formatMoney(price)
    return parseFloat(moneyObj.amount).toFixed(2) + moneyObj.unit;
}


//含有 ¥ 的result  又改了。。mdzz
export const rmbFormat = (amount) => {
    var amount = Number(amount);
    var label = '';
    if (amount < 0) {
        amount = -amount;
        label = '-';
    };
    const MILLION = Number(10000.0);
    const MILLIONS = Number(1000000.0);
    const BILLION = Number(100000000.0);
    const MILLION_UNIT = "万";
    const BILLION_UNIT = "亿";

    let moneyObj = {
        // amount: 0, //1,000.00 绝对值
        // unit: '', //亿 单位
        // label:'', //正负数符号
        result: '', //- ¥10,00.00亿  含有 ¥ 符号
    }

    //金额大于1百万小于1亿
    if (amount > MILLIONS && amount < BILLION) {
        moneyObj.result = '¥' + label + toMoney((Math.round(amount * 100 / MILLION)) / 100) + MILLION_UNIT;

    } else if (amount >= BILLION) { //金额大于1亿

        moneyObj.result = '¥' + label + toMoney((Math.round(amount * 100 / BILLION)) / 100) + BILLION_UNIT;
    } else {
        moneyObj.result = '¥' + label + toMoney(amount);
    }
    return moneyObj.result;
}

export const moneyChineseStr = (money)=>{
    console.log(money);
    //汉字的数字
      var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
      //基本单位
      var cnIntRadice = new Array('', '拾', '佰', '仟');
      //对应整数部分扩展单位
      var cnIntUnits = new Array('', '万', '亿', '兆');
      //对应小数部分单位
      var cnDecUnits = new Array('角', '分', '毫', '厘');
      //整数金额时后面跟的字符
      var cnInteger = '整';
      //整型完以后的单位
      var cnIntLast = '元';
      //最大处理的数字
      var maxNum = 999999999999999.9999;
      //金额整数部分
      var integerNum;
      //金额小数部分
      var decimalNum;
      //输出的中文金额字符串
      var chineseStr = '';
      //分离金额后用的数组，预定义
      var parts;
      if (money == '') { return ''; }
      money = parseFloat(money);
      if (money >= maxNum) {
        //超出最大处理数字
        return '';
      }
      if (money == 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
      }
      //转换为字符串
      money = money.toString();
      if (money.indexOf('.') == -1) {
        integerNum = money;
        decimalNum = '';
      } else {
        parts = money.split('.');
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
      }
      //获取整型部分转换
      if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
          var n = integerNum.substr(i, 1);
          var p = IntLen - i - 1;
          var q = p / 4;
          var m = p % 4;
          if (n == '0') {
            zeroCount++;
          } else {
            if (zeroCount > 0) {
              chineseStr += cnNums[0];
            }
            //归零
            zeroCount = 0;
            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
          }
          if (m == 0 && zeroCount < 4) {
            chineseStr += cnIntUnits[q];
          }
        }
        chineseStr += cnIntLast;
      }
      //小数部分
      if (decimalNum != '') {
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
          var n = decimalNum.substr(i, 1);
          if (n != '0') {
            chineseStr += cnNums[Number(n)] + cnDecUnits[i];
          }
        }
      }
      if (chineseStr == '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
      } else if (decimalNum == '') {
        chineseStr += cnInteger;
      }
      return chineseStr;
}