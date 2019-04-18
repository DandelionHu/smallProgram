// components/carousel/index.js
var config = require("../../utils/config.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {//传入数据
    banner:Array
  },

  /**
   * 组件的初始数据
   */
  data: {//内部数据
    baseUrl:config.image_blink_url,
    bannerHeight:[], //图片高度
    bannerCurrent:0, //图片当前页数
    circular:true,//是否采用衔接滑动
    duration:'500',//滑动动画时长
    interval:'5000',//自动切换时间间隔
    autoplay:true,//是否自动切换
    indicatorActiveColor:'#00b38a', //当前选中的指示点颜色
    indicatorColor:'#ffffff', //指示点颜色
    indicatorDots:true //是否显示面板指示点
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //计算图片高度
    imageLoad: function (e) {
      //获取图片真实宽度
      var imgwidth = e.detail.width,
        imgheight = e.detail.height,
        //宽高比
        ratio = imgwidth / imgheight;
      console.log(imgwidth, imgheight)
      //计算的高度值
      var viewHeight = 720 / ratio;
      var imgheight = viewHeight
      var bannerHeight = this.data.bannerHeight
      //把每一张图片的高度记录到数组里
      bannerHeight.push(imgheight)
      this.setData({
        bannerHeight: bannerHeight,
      })
    },
    //记录第几张图片
    bindchange: function (e) {
      this.setData({
        bannerCurrent: e.detail.current 
      })
    },
  }
})
