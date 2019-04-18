//获取缓存
const getStorageSync = (key) =>{
    return wx.getStorageSync(key);
}
//设置缓存
const  setStorage = (key,val) =>{
    wx.setStorage({
      key: key,
      data: val,
    });
}
//删除缓存
const  removeStorageSync= (key) =>{
    return wx.removeStorageSync(key);
}
//把日期弄成 yyyy-MM-dd hh:mm:ss yyyy-MM-dd yyyy.MM.dd  yyyy年MM月dd
const formatDate = (date,format) => {
    var obj={
        'y+': date.getFullYear(), //+ 号代表的意思是匹配至少一个y
        'M+':date.getMonth() + 1,
        'd+':date.getDate(),
        'h+':date.getHours(),
        'm+':date.getMinutes(),
        's+':date.getSeconds()
    }
    for ( var i in obj) {
		if (new RegExp("(" + i + ")").test(format)) { //加括号的意义是 为了提取匹配的字符串。表达式中有几个()就有几个相应的匹配字符串yyyy
			var value = obj[i];
			var length = RegExp.$1.length; //RegExp.$1 指的是与正则表达式匹配的第一个
			var formatValue = "";
			if (value.toString().length < length) {
				for (var k = 0; k < length - value.toString().length; k += 1) {
					formatValue += "0";//补0
				}
			}
			formatValue += value.toString();
			format = format.replace(RegExp.$1, formatValue);//替换
		}
	}
    return format;
}
//转换json json字符串中单引号转换成双引号
const convertJson = (param) => {
    console.info(param)
    var str=param.replaceAll('\'','"');
    return JSON.parse(str);
}
// 截取字符串前后空格
const cutTrim = (str)  => { 
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

module.exports = {
    getStorageSync :getStorageSync,
    setStorage :setStorage,
    removeStorageSync :removeStorageSync,
    formatDate:formatDate,
    convertJson:convertJson,
    cutTrim:cutTrim,
}