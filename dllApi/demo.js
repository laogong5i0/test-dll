var ffi = require('ffi')
//console.log('lllllllllddd', ffi)

// export function user(){
	console.log('======')
try{
	var dl = ffi.Library('dll/termb.dll', {'CVR_InitComm': ['int', ['int']]})
	var result = dl.CVR_InitComm(1)
	console.log('result: ', result)
}catch(erro){
	console.log('====>', erro);
}