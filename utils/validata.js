// 验证类
class Validata{
    constructor(){

    }
    //验证手机号
    isMobile(params){
        //1--以1为开头；  2--第二位可为3,4,5,7,8,中的任意一位； 3--最后以0-9的9个整数结尾。
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        return myreg.test(params);
    }
    //验证邮箱
    isEmail(params){
        //以数字字母开头，中间可是是多个数字字母下划线或-,加@，数字字母，加.,加2-4个字母结尾
        var myreg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        return myreg.test(params);
    }
    //验证身份证
    isCardNo(params){
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return myreg.test(params);
    }
    //验证中文
    isChinese(params){ 
        var myreg = /[^\u4E00-\u9FA5]/g;
        return myreg.test(params);
    }
    //验证是否整数
    isInteger(params){
        var myreg = new RegExp(/^\d+$/);
        return myreg.test(params);
    }
    // 验证是否浮点型
    isDouble(params){
        var myreg = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
        return myreg.test(params);
    };
    //验证是否为数字
    isNumber(params){
        return this.isInteger(params) || this.isDouble(params);
    }
}

export { Validata }