import {HTTP} from '../utils/http.js'  //es6 导入
//IndexModel 类  继承 HTTP类
class IndexModel extends HTTP{
    constructor(){
        super(); // 用在构造函数中，必须在使用this之前调用
    }
    //获取平台优惠券
    getCoupon(data,message,success){
        var params = {
            url: '/coupon/findPt',
            method:'GET', //请求方式
            data:data,
            isToken:false,//是否需要token
            message:message,
            success: success  //成功回调
        }
        this.request(params)
    }

    //领取优惠券
    getReceive(data,message,success){
        var params = {
            url: '/customer/user/coupon/receive',
            method:'GET', //请求方式
            data:data,
            isToken:true,//是否需要token
            message:message,
            success: success  //成功回调
        }
        this.request(params)
    }

    //获取轮播图
    getHome(data,message,success){
        var params = {
            url: '/poster/home',
            method:'GET', //请求方式
            data:data,
            isToken:false,//是否需要token
            message:message,
            success: success  //成功回调
        }
        this.request(params)
    }
    //获取轮播图 http-p
    getHomeP(data,message){
        return this.request({
            url: '/poster/home',
            isToken:false,//是否需要token
            message:message?message:'',
            data:data,
            method:'GET', //请求方式
        })
    }
}

export { IndexModel }