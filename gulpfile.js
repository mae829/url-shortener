var gulp 					= require('gulp'),
		autoprefixer 	= require('gulp-autoprefixer'),
		bower					= require('gulp-bower'),
		concat 				= require('gulp-concat'),
		cmq						= require('gulp-combine-media-queries'),
		//gcmq 					= require('gulp-group-css-media-queries'),
		//imagemin			= require('gulp-imagemin'),
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
		size					= require('gulp-size'),
		browserSync 	= require('browser-sync');

var onError = function (err) {
  console.log('An error occurred:', err.message);
	this.emit('end');
};

var config = {
	bowerDir: 'source/bower_components' ,
	jsFiles: [
		'source/bower_components/jquery/dist/jquery.js',
		'source/bower_components/modernizr/modernizr.js',
		'source/js/*.js'
	]
}

gulp.task('icons', function() { 
	return gulp.src([
			config.bowerDir + '/fontawesome/fonts/**.*',
			config.bowerDir + '/bootstrap/fonts/**.*'
		])
		.pipe(gulp.dest('./build/fonts')); 
});

gulp.task('css', function () {
	return gulp.src('source/less/*.less')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(less({
			paths: [
				config.bowerDir + '/bootstrap/less/',
				config.bowerDir + '/fontawesome/less/'
			]
		}))
		.pipe(autoprefixer())
		//.pipe(gcmq())
		.pipe(cmq())
		.pipe(minifyCSS())
		.pipe(rename('style.css'))
		.pipe(gulp.dest('build'))
		.pipe(size( { showFiles: true } ))
		//.pipe(notify("CSS ompilation complete."))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function() {
  return gulp.src([
		config.bowerDir + '/jquery/dist/jquery.js',
		config.bowerDir + '/modernizr/modernizr.js',
		'source/js/*.js'
	])
		.pipe(plumber({ errorHandler: onError }))
		.pipe(jshint())
		.pipe(jshint.reporter(require('jshint-stylish')))
    .pipe(concat('output.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build'))
		.pipe(size( { showFiles: true } ))
		//.pipe(notify("JS compilation complete."))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function() {
  return gulp.src('source/jade/*.jade')
		.pipe(plumber({ errorHandler: onError }))
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('build'))
		.pipe(size( { showFiles: true } ))
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
		.pipe(size( { showFiles: true } ));
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
		//tunnel: 'urlshortener',
		browser: ['google chrome']
  });
});

gulp.task('default', ['html', 'js', 'css', 'icons']);
gulp.task('start', ['browser-sync', 'watch']);
