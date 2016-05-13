;(function(){
	'use strict';
	var express = require('express');
	var router = express.Router();
	var superagent = require("superagent");
	var cheerio = require('cheerio');
	/* GET users listing. */
	router.get('/', function(req, res, next) {
		var data = {
			status:null,
			data:[],
			total:0,
			message:null
		}
		superagent.get('http://blog.csdn.net/cczhumin')
		.set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36')
		.end(function(err,sres){
			if(err)
			{
				console.log('fail');
				data = {
					status:'200',
					message:"抓取错误！"
				}
				res.json(data);
				return;
			}
			var $ = cheerio.load(sres.text);
			var items = [],
				article_items = $("#article_list .article_item"),
				length = article_items.length;
				for(var i = 0 ; i < length ; i++){
					var item = {};
					item.artic = article_items.eq(i).find('.link_title a').text().replace(/[\r\n\s]+/g,'');
					item.view  = Number(article_items.eq(i).find('.link_view').text().match(/\d+/)[0])
					console.log(item);
					items.push(item);
				}
			items.sort(function(a,b){ return a.view < b.view})
			data = {
				status:"200",
				message:"抓取成功!",
				data:items,
				total:$("#blog_rank li:nth-child(1)").text().match(/\d+/)[0]
			};
			res.json(data);

			function a (a1,a2){

			}
		})
	});
module.exports = router;
}())

