/*
* @Author: CodingJoker
* @Date:   2016-11-20 15:21:16
* @Last Modified by:   Jumor
* @Last Modified time: 2016-11-20 16:05:05
*/

'use strict';
(function(){
	 var  multer=require('multer');
	 var storage = multer.diskStorage({
	     //设置上传后文件路径，uploads文件夹会自动创建。
	        destination: function (req, file, cb) {
	            cb(null, './public/uploads')
	       },
	     //给上传文件重命名，获取添加后缀名
	      filename: function (req, file, cb) {
	          var fileFormat = (file.originalname).split(".");
	          cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	      }
	 });
	     //添加配置文件到muler对象。
	     var upload = multer({
	          storage: storage
	    });

		//如需其他设置，请参考multer的limits,使用方法如下。
	   //var upload = multer({
	  //    storage: storage,
	  //    limits:{}
	  // });

	 //导出对象
	module.exports = upload;
}())