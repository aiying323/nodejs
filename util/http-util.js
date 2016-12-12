/*封装的http请求：
使用示例如下：

var $http = require("./util/http-util.js");

$http.get("http://fbabyapi.bblink.cn/content/list/tab2",function(data){
	console.log(data);
});
*/
module.exports.get=function(url,callback){
	http.get(url, function(res) {
	    if (res.statusCode === 200) {
	        let body = '';
	        res.on("data", function(chunk) {
	            body += chunk.toString("utf8")
	        });
	        res.on("end", function() {
	            try {
	                let data = JSON.parse(body);
	                callback(data);
	            } catch (e) {
	                console.log("我捕获到异常了！！！"+e);
	            }
	        });
	    } else {
	    	console.log("我获得错误码啦："+res.statusCode);
	    }

	}).on("error", function(e) {
	    console.error("我捕获到异常了！！！"+e);
	});	
}

