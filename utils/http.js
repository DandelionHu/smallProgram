// 封装 request请求
var util = require("./util.js");
var config = require("./config.js");

var requestList = {} //api请求记录

class HTTP{  //定义了一个名字为HTTP的类
    constructor (){ //constructor是一个构造方法，用来接收参数,当实例化对象时该行代码会执行。
        //内部
        this.baseRestUrl = config.api_blink_url; //this代表的是实例对象
        this.appkey = config.appkey;
    }

    request(params){ //这是一个类的方法，注意千万不要加上function  params为参数  方法之间不要用逗号分隔statusCode
        var url=this.baseRestUrl+params.url;
        if(!params.method){
            //不传method 默认GET
            params.method="GET"
        }
        if(!params.isToken){
            //不传isToken 默认true
            params.isToken=true
        }
        //检测重复请求
        if(hitRequestKey(url)){
            console.log("重复提交请求");
            return false;
        }

        wx.showNavigationBarLoading();  //显示头部请求动画
        //显示请求提示语
        if (params.message != "") {
            wx.showLoading({
                title: message,
            })
        }       
        addRequestKey(url); //添加请求

        // var token = util.getStorageSync('sessionKey');//获取token

        wx.request({
            url:url,
            data:params.data,
            method:params.method,
            header:{
                'content-type':'application/json',
                'appkey':config.appkey,
                // 'token':params.isToken?token:''
            },
            success:function(res){
                // 判断以2（2xx)开头的状态码为正确
                var code = res.statusCode.toString();//转换成字符串
                var startChar = code.charAt(0);//返回在指定位置的字符
                if (startChar == '2' || code === '304') {
                    //执行正常
                    if(res.data.isSuccess){
                        //获取业务成功
                        params.success && params.success(res.data);
                    }else{
                        wx.showToast({
                            title: res.data.message,
                            icon: 'none',
                            duration: 2000
                        })
                        if(res.data.code==10002){
                            util.removeStorageSync('sessionKey');
                            setTimeout(function(){
                                wx.navigateTo({
                                    url: '/pages/login/login'
                                })
                            },2000)
                        }
                    }
                } else {
                    //调用 4-- 5-- 回调
                    paramsError && paramsError(res);
                }
            },
            fail: function (err) {  
                //调用失败回调
                paramsFail && paramsFail(err)
            },
            complete: function (res) {
                wx.hideNavigationBarLoading();//隐藏头部请求动画
                if (params.message != "") {
                    wx.hideLoading() //隐藏请求提示语
                }
                //请求完成释放
                removeRequestKey(url)
            },
        })
    }
}


// 将当前请求的api记录起来
const addRequestKey = (key) =>{
    requestList[key] = true
}
//将请求完成的api从记录中移除
const removeRequestKey = (key) =>{
    delete requestList[key]
}
//当前请求的api是否已有记录
const hitRequestKey = (key) =>{
    return requestList[key]
}
//404 500回调
const paramsError =(res)=>{
    wx.showToast({
        title: '接口错误'+res.statusCode,
        icon: 'none',
        duration: 2000
    })
}
//失败回调
const paramsFail =(err)=>{
    wx.showToast({
        title: '网络连接错误',
        icon: 'none',
        duration: 2000
    })
}


//导出
export { HTTP };