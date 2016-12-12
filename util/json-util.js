module.exports.containskey=function(){

}
/*
	objKey:根据key查找对象值
	obj:在obj中查找该key
	返回值为该objKey的value值。
	使用示例如下：
	var $JSON = require("./util/json-util.js");

	console.log($JSON.get("200",errorCode));
*/
module.exports.get=function(objKey,obj){
	if(objKey==null){
		console.log("需要查找的Key值不能为空")
		return;
	}
	if(obj==null||obj.length<=0){
		console.log('查找主对象不能为空');
		return;
	}
	objKey=objKey.toString();
	for(key in obj){
		if(key==objKey){
			return obj[key];
		}
	}
}