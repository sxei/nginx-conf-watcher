const fs = require('fs');
const path = require('path');
const {exec, execFile, spawn} = require('child_process');

var lastModifiedTime = Date.now();
var args = process.argv.splice(2); // 获取命令行后面的参数
// 被监听的文件或者文件夹名字，path.resolve获取其相当于node启动路径的绝对路径
// 允许通过 node nginx-conf-watcher.js folderName 来指定被监听文件夹的名字
var watchFile = path.resolve(args[0] || 'conf');
console.log('\n提示：请务必将本程序放在和nginx.exe同一目录下，否则不会正常工作！\n');
reloadNginx(); // 启动时立即reload一次
try {
	// recursive 表示递归监听子文件夹的变化
	fs.watch(watchFile, {recursive: true}, function(eventType, fileName) {
		var now = Date.now();
		// 连续2次触发间隔小于50毫秒时忽略
		if(now - lastModifiedTime < 50) return;
		// 只监听conf文件的变化
		if(!fileName.endsWith('.conf')) return;
		lastModifiedTime = now;
		console.log(`\n检测到文件 ${fileName} 的变化，开始刷新nginx配置文件...`);
		reloadNginx();
	});
	console.log('nginx配置文件监听服务已启动！');
}
catch(e) {
	console.log(`监听“${watchFile}”文件(夹)失败，可能是文件不存在！`);
}

// 重新加载nginx
function reloadNginx() {
	var reload = spawn('./nginx', ['-s', 'reload']);
	reload.stdout.on('data', data => {});
	reload.stderr.on('data', data => {
		console.log('刷新nginx配置文件失败：');
		console.log(`${data}`);
	});
	reload.on('exit', (code) => {
		// 0 表示进程正常结束
		if(code == 0) console.log('刷新nginx配置文件成功！')
	});
}