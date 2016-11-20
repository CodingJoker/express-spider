/*
* @Author: CodingJoker
* @Date:   2016-11-20 14:22:11
* @Last Modified by:   CodingJoker
* @Last Modified time: 2016-11-20 14:39:07
*/
;(function(){
	'use strict';
	var
		express = require('express'),
		router = express.Router();
	router.get('/',function(req,res){
		res.render('friends-star');
	});
	module.exports = router;

}())