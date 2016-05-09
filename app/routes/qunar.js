;(function(){
	'use strict';
	//wait me~
	var express = require('express');
	var router = express.Router();
	var superagent = require("superagent");
	var cheerio = require('cheerio');
	/* GET users listing. */
	router.get('/', function(req, res, next) {
		var from = req.query.from , to = req.query.to,dTime =  req.query.dTime, data = {
			status:null,
			data:[],
			total:0,
			message:null
		};
		var url = 'http://flight.qunar.com/twell/longwell?&http%3A%2F%2Fwww.travelco.com%2FsearchArrivalAirport='+encodeURI(to)+'&http%3A%2F%2Fwww.travelco.com%2FsearchDepartureAirport='+encodeURI(from)+'&http%3A%2F%2Fwww.travelco.com%2FsearchDepartureTime='+dTime+'&http%3A%2F%2Fwww.travelco.com%2FsearchReturnTime=2016-04-27&locale=zh&nextNDays=0&searchLangs=zh&searchType=OneWayFlight&tags=1&mergeFlag=0&xd=f1461727134000&wyf=0P8yuQtSJww%2FuQt%2FERPHWlr0fPPFfld%2F%2FwP8lUd8lyeFlUd%2F%7C1441321882698&from=flight_dom_search&_token=77678';
		superagent.get(url)
		.set({'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',
			  'Content-Type':'application/json;charset=UTF-8'
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
			var text = sres.text.replace(/[()]/g,''),
				json = JSON.parse(text),
				resJson = [],
				priceInfo = json.oneway_data.priceInfo,
				flightInfo = json.oneway_data.flightInfo,
				carrierInfo = json.oneway_data.carrierInfo,
				planeInfo = json.oneway_data.planeInfo;
				for(var i in priceInfo){
					var item = {
					zhName:null,
					airPlaneNum:null,
					airPlaneSize:null,
					dePort:null,
					arPort:null,
					price:null,
					dt:null,
					at:null,
					dd:null
					};
					console.log(i)
					item.price = priceInfo[i].lowpr;
					item.zhName = carrierInfo[flightInfo[i].ca].full;
					item.airPlaneNum = i.replace(/\|.*/g,'');
					item.airPlaneSize = planeInfo[flightInfo[i].pt].full + '('+planeInfo[flightInfo[i].pt].type[0]+')'
					item.dt = flightInfo[i].dt,
					item.at = flightInfo[i].at,
					item.dd = flightInfo[i].dd,
					item.dePort = json.airportInfo.out[flightInfo[i].da].full + ' ' + flightInfo[i].t,
					item.arPort = json.airportInfo.ret[flightInfo[i].aa].full + ' ' + flightInfo[i].arrtower;
					resJson.push(item)
				}
			res.json(resJson);
		})
	});
module.exports = router;
}())
