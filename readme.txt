Written in 2016-12-09
Author by ying.li
===========================  sublime Text 3 nodejs环境集成 start  ===========================  

1、首选项--浏览插件目录--进入C:\Users\rundo\AppData\Roaming\Sublime Text 3\Packages
2、下载SublimeText-Nodejs插件：https://github.com/tanepiper/SublimeText-Nodejs
3、将SublimeText-Nodejs插件解压到packages目录下
4、修改文件Nodejs.sublime-setting:主要修改node_command属性
{
  // save before running commands
  "save_first": true,
  // if present, use this command instead of plain "node"
  // e.g. "/usr/bin/node" or "C:\bin\node.exe"
  "node_command": "C:\\Program Files\\nodejs\\node.exe",
  // Same for NPM command
  "npm_command": "C:\\Program Files\\nodejs\\npm.cmd",
  // as 'NODE_PATH' environment variable for node runtime
  "node_path": false,

  "expert_mode": false,

  "ouput_to_new_tab": false
}

5、修改文件Nodejs.sublime-build：windows下的cmd不能使用[]；
{
  "cmd": ["C:\\Program Files\\nodejs\\node.exe", "$file"],
  "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
  "selector": "source.js",
  "shell":true,
  "encoding": "utf8",
  "windows":
    {
        "cmd": "taskkill /F /IM node.exe & node $file"
    }
}
6、工具--编译系统--Nodejs
7、首选项--快捷键设置--将ctrl+break 修改为 ctrl+d用于关闭nodejs服务
/*{ "keys": ["ctrl+d"], "command": "find_under_expand" },*/
{ "keys": ["ctrl+d"], "command": "cancel_build" },
	ctrl+b为启动服务；ctrl+d为关闭服务

===========================  sublime Text 3 nodejs环境集成 end  ===========================  
Written in 2016-12-09
Author by ying.li
===========================  Nodejs热部署 start  ===========================  
1、npm install -g supervisor
2、修改Nodejs.sublime-build:
 "cmd": "taskkill /F /IM node.exe & supervisor $file"
3、确保没有相关服务被开启，重启sublime text 3 ，运行ctrl+b

===========================  Nodejs热部署 end  ===========================  