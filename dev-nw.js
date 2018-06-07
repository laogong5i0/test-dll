var exec = require('child_process').exec
var path = require('path')
var fs = require('fs')
var nwPath = require('nw').findpath()
var rootPath = path.resolve(__dirname, './')
var pacageJsonPath = path.resolve(rootPath, './package.json')

if(!process.env.NODE_ENV){
	process.env.NODE_ENV = '"development"'
}

module.exports = runNW
function runNW(uri = ''){
	if(uri && (uri+'').trim()){
		tmpJson = require(pacageJsonPath)
		tmpJson.main = 'index.html'
		fs.writeFileSync(pacageJsonPath, JSON.stringify(tmpJson, null, ''), 'utf-8')
	}

	var closed
	var nwDev = exec(nwPath + ' ' + rootPath, {cwd: rootPath}, function(err, stdout, stderr){
		process.exit(0)
		closed = true
	})

	nwDev.stdout.on('data', console.log)
	nwDev.stdout.on('error', console.error)

	process.on('exit', exitHandle)
	function exitHandle(e){
		if(!closed) nwDev.kill()
		console.error(e || '结束调试')
	}
}