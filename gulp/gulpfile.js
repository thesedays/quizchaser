


/*
 *
 *
 *
 * Define requirements */
var gulp = require('gulp');
var config = require('./config.js');
var libraries = {
	compass: 		require('gulp-compass'),
	concat: 		require('gulp-concat'),
	consolidate: 	require('gulp-consolidate'),
	iconfont: 		require('gulp-iconfont'),
	imagemin: 		require('gulp-imagemin'),
	runSequence: 	require('run-sequence'),
	uglify: 		require('gulp-uglify'),
	plumber: 		require('gulp-plumber'),
	notify:         require('gulp-notify'),
};










/*
 *
 *
 *
 * Define bundled tasks */
gulp.task('default', ['watch']);
gulp.task('watch', function() {

	gulp.watch(config.paths.css.files, ['compass']);
	gulp.watch(config.paths.js.files, ['scripts']);

});

gulp.task('go-live', function() {

	libraries.runSequence('images');

});










/*
 *
 *
 *
 * Define single tasks */
gulp.task('compass', function() {

	gulp.src(config.paths.css.files)
		.pipe(libraries.plumber({errorHandler: libraries.notify.onError("Error: <%= error.message %>")}))
		.pipe(libraries.compass({
			comments: false,
			sourcemap: false,
			require: ['sass-globbing'],
			style: 'compressed',
			sass: config.paths.css.source,
			css: config.paths.css.target
		}))
		.pipe(gulp.dest(config.paths.css.target));

});

gulp.task('scripts', function() {

	gulp.src([config.paths.js.essentials.files, config.paths.js.main.files])
		.pipe(libraries.plumber({errorHandler: libraries.notify.onError("Error: <%= error.message %>")}))
		.pipe(libraries.uglify())
		.pipe(libraries.concat('main.js'))
		.pipe(gulp.dest(config.paths.js.target));
});

gulp.task('images', function() {

	gulp.src('assets/images/*')
	.pipe(libraries.imagemin({
		progressive: true
	}))
	.pipe(gulp.dest('../resources/images'));

});

gulp.task('iconfont', function() {

	return gulp.src([config.paths.fonts.files])
	.pipe(libraries.iconfont({
		centerHorizontally: false,
		appendUnicode: false,
		fontName: 'icons',
		fontPath: '../fonts/',
		formats: ['ttf', 'eot', 'woff'],
		className: 'icon',
		normalize: true,
		timestamp: Math.round(Date.now() / 1000),
		log: () => {}
	}))
	.on('glyphs', function(glyphs, options) {

		gulp.src('assets/templates/_icons.scss')
		.pipe(libraries.consolidate('lodash', {
			glyphs: glyphs,
			fontName: 'icons',
			fontPath: '../fonts/',
			className: 'icon'
		}))
		.pipe(gulp.dest('assets/sass/helpers'));

	})
	.pipe(gulp.dest(config.paths.fonts.target));

});


