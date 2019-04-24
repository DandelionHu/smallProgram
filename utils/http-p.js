// 封装 request请求
var util = require("./util.js");
var config = require("./config.js");

var requestList = {} //api请求记录

class HTTP{  //定义了一个名字为HTTP的类
    constructor (){ //constructor是一个构造方法，用来接收参数,当实例化对象时该行代码会执行。
        //内部
        this.baseRestUrl = config.baseRestUrl; //this代表的是实例对象
        this.appkey = config.appkey;
    }
    //使用promise返回,写出具体参数,isToken不传默认true,message不传默认'',method传默认是GET，data不传默认{}
    request({url,isToken=true,message='',data={},method='GET'}){
        return new Promise((resolve,reject)=>{
            this._request(url,resolve,reject,isToken,message,data,method)
        })
    }
    _request(url,resolve,reject,isToken=true,message='',data={},method='GET',){ //这是一个类的方法，注意千万不要加上function  params为参数  方法之间不要用逗号分隔statusCode
        var URL= this.baseRestUrl+url;
        //检测重复请求
        if(hitRequestKey(URL)){
            console.log("重复提交请求");
            return;
        }
        wx.showNavigationBarLoading();  //显示头部请求动画
        //显示请求提示语
        if (message != "") {
            wx.showLoading({
                title: message,
            })
        }       
        addRequestKey(URL); //添加请求
        var token = util.getStorageSync('sessionKey');//获取token
        wx.request({
            url:URL,
            data:data,
            method:method,
            header:{
                'content-type':'application/json',
                'token':isToken?token:''
            },
            success:(res)=>{ 
                // 判断以2（2xx)开头的状态码为正确
                var code = res.statusCode.toString();//转换成字符串
                var startChar = code.charAt(0);//返回在指定位置的字符
                if (startChar == '2' || code === '304') {
                    //执行正常
                    if(res.data.isSuccess){
                        //获取业务成功
                        resolve(res.data)
                    }else{
                        reject(res.data)
                        this._show_error(res)
                        if(res.data.code==10002){
                            util.removeStorageSync('sessionKey');//清除缓存
                            setTimeout(function(){
                                wx.reLaunch({//关闭所有页面，打开某个页面
                                    url: '/pages/login/login'
                                })
                            },2000)
                        }
                    }
                } else {
                    //调用 4-- 5-- 回调
                    reject(res.data);
                    this._show_error(1)
                }
            },
            fail: (err)=>{  
                //调用失败回调
                reject(err);
                this._show_error(1)
            },
            complete:()=> {
                wx.hideNavigationBarLoading();//隐藏头部请求动画
                if (message != "") {
                    wx.hideLoading() //隐藏请求提示语
                }
                //请求完成释放
                removeRequestKey(URL)
            },
        })
    }
    _show_error(res){//400 500 失败
        if(res && res==1){
            wx.showToast({
                title: '网络连接失败',
                icon: 'none',
                duration: 2000,
                image:'../images/nonetwork.png'
            })
        }else{
            wx.showToast({
                title: res.data.message?res.data.message:'接口错误'+res.statusCode,
                icon: 'none',
                duration: 2000
            })
        }
        
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


//导出
export { HTTP };