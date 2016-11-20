/*
* @Author: CodingJoker
* @Date:   2016-11-20 14:57:41
* @Last Modified by:   Jumor
* @Last Modified time: 2016-11-20 16:06:16
*/

'use strict';
(function(){
	var
		express = require('express')
		,router = express.Router()
		,multiparty = require('connect-multiparty')
		,multipartyMiddleware = multiparty() // 处理form-data数据中间件，使用req.body.parasname获取
		,multerUtil = require('../utils/multerUtil')
		;

	router.post('/',function(req,res){
		var upload = multerUtil.single('img-file');
		upload(req,res,function(err){
			if(err){
				return console.log(err);
			}
			console.log('Image Save Success!');

		})
	});
	module.exports = router;
}())