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
		superagent.get('http://flight.qunar.com/site/oneway_list.htm?searchDepartureAirport=%E5%8C%97%E4%BA%AC&searchArrivalAirport=%E6%88%90%E9%83%BD&searchDepartureTime=2016-04-27&searchArrivalTime=2016-05-01&nextNDays=0&startSearch=true&fromCode=BJS&toCode=CTU&from=qunarindex&lowestPrice=null')
		.set({'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',
			  })
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
			// var $ = cheerio.load(sres.text);
			console.log(sres)
			// res.json(data);
		})
	});
module.exports = router;
}())

