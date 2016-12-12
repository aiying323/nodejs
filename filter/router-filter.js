
module.exports.router = {
    init_filter: function() {
    	// 异常拦截
        app.use(function(req,res,next){
          
            next();
        });
        // 登陆拦截
        app.use(function(req,res,next){
            console.log('拦截2号');
            next();
        });
    },
    init_router:function(){
    	app.get("*", function(req, res, next) {
    		console.log('开始转发到相应请求页面');
            let url = '';
            let params = {};
            if (req.url.indexOf("?") != -1 && req.url.indexOf("?") != (req.url.length - 1)) {
                url = req.url.substring(req.url.indexOf("/"), req.url.indexOf("?"));
                params = params_parse.params.getParams(req.url);
            } else {
                url = req.url.substring(req.url.indexOf("/"));
            }

            for (var item in router) {
                if (url == item) {
                    res.render(router[item], params);
                }
            }
        });
    }
}
