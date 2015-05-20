var gulp 					= require('gulp'),
		autoprefixer 	= require('gulp-autoprefixer'),
		bower					= require('gulp-bower'),
		concat 				= require('gulp-concat'),
		gcmq 					= require('gulp-group-css-media-queries'),
		imagemin			= require('gulp-imagemin'),
		jade 					= require('gulp-jade'),
		jshint				= require('gulp-jshint'),
		less	 				= require('gulp-less'),
		minifyCSS 		= require('gulp-minify-css'),
		notify				= require('gulp-notify'),
		order					= require('gulp-order'),
		rename 				= require('gulp-rename'),
		uglify 				= require('gulp-uglify'),
		util					= require('gulp-util'),
		plumber				= require('gulp-plumber'),
		size					=	require('gulp-size'),
		browserSync 	= require('browser-sync');

var onError = function (err) {
  console.log('An error occurred:', err.message);
	this.emit('end');
};

var config = {
	lessPath: './source/less',
	bowerDir: 'source/bower_components' ,
	jsFiles: [
		'source/bower_components/jquery/dist/jquery.js',
		'source/bower_components/modernizr/modernizr.js',
		'source/js/*.js'
	]
}

gulp.task('css', function () {
	gulp.src('source/less/*.less')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(less({
			paths: [
				config.bowerDir + '/bootstrap/less/',
				config.bowerDir + '/fontawesome/less/'
			]
		}))
		.pipe(autoprefixer())
		.pipe(gcmq())
		.pipe(minifyCSS())
		.pipe(rename('style.css'))
		.pipe(gulp.dest('build'))
		.pipe(size())
		//.pipe(notify("CSS ompilation complete."))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function() {
  gulp.src([
		'source/bower_components/jquery/dist/jquery.js',
		'source/bower_components/modernizr/modernizr.js',
		'source/js/*.js'
	])
		.pipe(plumber({ errorHandler: onError }))
		.pipe(jshint())
		.pipe(jshint.reporter(require('jshint-stylish')))
		.pipe(order([
			'source/bower_components/jquery/dist/jquery.js',
			'source/bower_components/modernizr/modernizr.js',
			'source/js/*.js'
		]))
    .pipe( concat('output.min.js') )
    //.pipe(uglify())
    .pipe(gulp.dest('build'))
		.pipe(size())
		//.pipe(notify("JS compilation complete."))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function() {
  gulp.src('source/jade/*.jade')
		.pipe(plumber({ errorHandler: onError }))
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('build'))
		.pipe(size())
		//.pipe(notify("HTML compilation complete."))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('images', function () {
	return gulp.src('app/images/**/*')
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('build/images'))
		.pipe(browserSync.reload({ stream: true }))
		.pipe(size());
});

gulp.task('watch', function () {
  gulp.watch('source/less/*.less', ['css']);
  gulp.watch('source/jade/*.jade', ['html']);
	gulp.watch('source/jade/inc/*.jade', ['html']);
	gulp.watch('source/js/*.js', ['js']);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
		tunnel: 'urlshortener',
		browser: ['firefox', 'google chrome']
  });
});

/*gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});*/

gulp.task('default', ['html', 'js', 'css']);
gulp.task('start', ['browser-sync', 'watch']);
