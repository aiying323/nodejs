module.exports.router = {
    init_filter: function() {
    	// 登陆拦截
        app.use("/rule*",function(req,res,next){
           console.log('登陆拦截');
            next();
        });
    },
    init_router:function(){
        //不需要请求接口的页面展示
    	app.get("/static*", function(req, res, next) {
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
