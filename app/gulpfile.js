var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	nodeInspector = require('gulp-node-inspector');

gulp.task('server',function(){
	nodemon({
		script:"app.js",
		ignore: ['node_modules/*']
	}).on('restart',function(){
		console.log("restarted!")
	})
})
gulp.task('dev', function () {
  gulp.run('debug');
  nodemon({
    script: 'app.js', 
    debug:true,
    exec: 'node --debug',
    ignore: ['node_modules/*'],
    env: { 'NODE_ENV': 'development' }
  }).on('restart',function(){
		console.log("dev restarted!");
	});
})
gulp.task('debug',function () {
	gulp.src([])
	.pipe(nodeInspector({
	    debugPort: 5858,
	    webHost: '0.0.0.0',
	    webPort: 8080,
	    saveLiveEdit: false,
	    preload: true,
	    inject: true,
	    hidden: [],
	    stackTraceLimit: 50,
	    sslKey: '',
	    sslCert: ''
	  }));
})