// pages/index/index.js
import {IndexModel} from '../../models/indexModel.js'
var util = require("../../utils/util.js");
var indexModel = new IndexModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon:'',
    banner:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHome();
    this.getCoupon();
  },

  /**生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },

  /**生命周期函数--监听页面显示*/
  onShow: function () {

  },

  /**生命周期函数--监听页面隐藏*/
  onHide: function () {

  },

  /**生命周期函数--监听页面卸载*/
  onUnload: function () {

  },

  /**页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {

  },

  /**页面上拉触底事件的处理函数*/
  onReachBottom: function () {

  },

  /**用户点击右上角分享*/
  onShareAppMessage: function () {

  },
  //获取优惠券
  getCoupon:function(){
    var data={};
    var message='';
    indexModel.getCoupon(data,message,(res)=>{
      if(res.returnValue[0]){
        res.returnValue[0].createTime=util.formatDate(new Date(res.returnValue[0].createTime),'yyyy-MM-dd')
        this.setData({
          coupon:res.returnValue
        })
      }
    })
  },
  //获取轮播图
  getHome:function(){
    var data={
      size:5
    };
    var message='';
    indexModel.getHome(data,message,(res)=>{
      if(res.returnValue.length){
        var banner=[];
        for(var i=0;i<res.returnValue.length;i++){
          var obj={
            url:res.returnValue[i].posterImg
          }
          banner.push(obj);
        }
        this.setData({
          banner:banner,
        })
      }
    })
  }
})