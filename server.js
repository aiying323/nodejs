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


let express = require("express");
let ejs = require('ejs');
global.app = express();
/*异常测试*/

http.get("http://fbabyapi.bblink.cn", function(res) {
    res.on("error", function() {
        console.log(res.statusCode);
    });
    res.on("data", function(data) {
        console.log(data.toString("utf8"));
    });
    res.on("end", function() {

    });
});


app.use('/', express.static(__dirname + '/static')); //指定静态HTML文件的位置
app.engine('.html', ejs.__express); //使用ejs引擎渲染html；直接发送：res.sendfile(__dirname+"/static/index.html");
app.set('view engine', 'html');

/*请求路由拦截与转发,放在请求的最前面，包括异常拦截和登陆拦截*/
let router_filter = require("./filter/router-filter.js");
router_filter.router.init_filter();


var $http = require("./util/http-util.js");
var $JSON = require("./util/json-util.js");

console.log($JSON.get("200",errorCode));

app.use("/", function(req, res) {
	$http.get(store.url+store.path.getRepos+"/fdaf",function(data){
		console.log(data);
	});
	/*$http.get(store.url+store.path.getRepos,function(data){
		console.log("测试错误码："+JSON.stringify(data));
	});*/
    res.send("hello")
})
    /*路由配置*/
router_filter.router.init_router();


app.listen(config.port, config.host);
console.log("================================== this is nodejs ending   ===========================================");
