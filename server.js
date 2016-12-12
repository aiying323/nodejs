console.log("================================== this is nodejs starting ===========================================");

/*全局文件读写对象*/
global.fs = require("fs");
/*全局http请求对象*/
global.http = require("http");
/*全局的配置文件数据*/
global.store = JSON.parse(fs.readFileSync('./config/interface-config.json'));
/*服务配置文件*/
global.config = JSON.parse(fs.readFileSync('./config/server-config.json'));
/*路由配置文件*/
global.router = JSON.parse(fs.readFileSync('./config/router-config.json'));
/*errorCode文件*/
global.errorCode = JSON.parse(fs.readFileSync('./config/error-code-config.json'));
/*用于解析参数*/
global.params_parse = require("./util/params-parse.js");
/*用于异常拦截*/
global.domain = require("domain");
/*封装的http请求：*/
global.$http = require("./util/http-util.js");
/*封装的json获取对象值方法*/
global.$JSON = require("./util/json-util.js");

let express = require("express");
let ejs = require('ejs');
global.app = express();


app.use(express.static(__dirname + '/views')); //指定静态HTML文件的位置
app.engine('.html', ejs.__express); //使用ejs引擎渲染html；直接发送：res.sendfile(__dirname+"/static/index.html");
app.set('view engine', 'html');

/*请求路由拦截与转发,放在请求的最前面，登陆拦截*/
let router_filter = require("./filter/router-filter.js");
router_filter.router.init_filter();



console.log($JSON.get(200,errorCode));
$http.get("http://fbabyapi.bblink.cn"+"/content/list/tab2"+"/fdaf",function(data){
		console.log("测试错误码："+JSON.stringify(data));
	});
app.use("/a", function(req, res) {
	console.log('i am comming');
    res.send("hello");
})
/*不需要请求资源的路由配置*/
router_filter.router.init_router();

/*异常测试*/
process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});
app.listen(config.port, config.host);
console.log("================================== this is nodejs ending   ===========================================");
