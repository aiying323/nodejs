module.exports.user={
	username:'',
	getRepos:function(username,callback){
		http.get(store.url+store.path.getRepos,function(response){
			let body='';
			response.on("data",function(chunk){
				body+=chunk.toString("utf8")
			});
			response.on("end",function(){
				let data=JSON.parse(body);
				callback(data);
			});

		});

	},
	getUserName:function(){
		return this.username;
	},
	setUserName:function(username){
		this.username=username;
	}
}