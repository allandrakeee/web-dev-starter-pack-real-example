/**
 * Tasks for gulpfile
 * 
 * @author Allan Drake
 */

var gulp		= require('gulp'),
	sass		= require('gulp-sass'),
	sassGlob 	= require('gulp-sass-glob'),
	uglify		= require('gulp-uglify'),
	uglifycss 	= require('gulp-uglifycss');
	prefix		= require('gulp-autoprefixer'),
	concat		= require('gulp-concat'),
	del 		= require('del');
	browserSync	= require('browser-sync').create();

function errorLog(error) {
    console.error(error.message);
}﻿

/**
 * Production in styles
 *
 * Command: gulp styles
 * @description Compile the styles in uglifycss compile
 */
gulp.task('styles', function(){
	return gulp.src([
		'node_modules/bootstrap/scss/bootstrap.scss', 
		'assets-dev/sass/*.scss'
	])
	.pipe(sassGlob())
    .pipe(sass())
    .on('error', errorLog)
	.pipe(concat('theme.min.css'))
	.pipe(prefix('last 2 versions'))
	.pipe(uglifycss({
		"maxLineLen": 100,
		"uglyComments": true
	}))
	.pipe(gulp.dest("assets/css"))
});

/**
 * Development in styles
 *
 * Command: gulp styles
 * @description Compile the styles in normal compile
 */
// gulp.task('styles', function(){
// 	return gulp.src([
// 		'node_modules/bootstrap/scss/bootstrap.scss', 
// 		'assets-dev/sass/*.scss'

// 	])
// 	.pipe(sassGlob())
//     .pipe(sass())
//     .on('error', errorLog)
// 	.pipe(concat('theme.css'))
// 	.pipe(prefix('last 2 versions'))
// 	.pipe(gulp.dest("assets/css"))
// });

/**
 * Production in scripts
 *
 * Command: gulp scripts
 * @description Compile the scripts in uglify compile
 */
gulp.task('scripts', function(){
	return gulp.src([
		'node_modules/jquery/dist/jquery.js', 
		'node_modules/popper/dist/umd/popper.js', 
		'node_modules/bootstrap/dist/js/bootstrap.js', 
		'node_modules/tether/dist/js/tether.js', 
		'assets-dev/js/*.js'
	])
	.on('error', errorLog)
	.pipe(concat('theme.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest("assets/js"));
});

/**
 * Development in scripts
 *
 * Command: gulp scripts
 * @description Compile the scripts in normal compile
 */
// gulp.task('scripts', function(){
// 	return gulp.src([
// 		'node_modules/jquery/dist/jquery.js', 
// 		'node_modules/popper/dist/umd/popper.js', 
// 		'node_modules/bootstrap/dist/js/bootstrap.js', 
// 		'node_modules/tether/dist/js/tether.js', 
// 		'assets-dev/js/*.js'
// 	])
// 	.on('error', errorLog)
// 	.pipe(concat('theme.js'))
// 	.pipe(gulp.dest("assets/js"));
// });

/**
 * Command: gulp watch
 * @description Compile first all styles and scripts
 * before starting the watcher.
 */
gulp.task('watch', ['styles', 'scripts'], function(){
	gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'assets-dev/sass/**/*.scss', 'assets/css'], ['styles']);
	gulp.watch(['node_modules/bootstrap/dist/js/bootstrap.js', 'node_modules/jquery/dist/jquery.js', 'node_modules/tether/dist/js/tether.js', 'assets-dev/js/*.js', 'assets/js'], ['scripts']);
});

/**
 * Command: gulp
 * @description Default compiler
 */
gulp.task('default', ['scripts', 'styles', 'watch']);

/**
 * Command: gulp clear-dist
 * @description Clear distribution folder
 */
gulp.task('clear-dist', function () {
    return del(['dist/**/*',]);
});

/**
 * Command: gulp dist
 * @description Generates a clean theme for distribution
 */
gulp.task('dist', ['clear-dist'], function() {
    gulp.src([
        '**/*',
        '!assets-dev/',
        '!assets-dev/**',
        '!bower_components',
        '!bower_components/**',
        '!node_modules',
        '!node_modules/**',
        '!src',
        '!src/**',
        '!dist',
        '!dist/**',
        '!dist-product',
        '!dist-product/**',
        '!sass',
        '!sass/**',
        '!readme.txt',
        '!readme.md',
        '!package.json',
        '!package-lock.json',
        '!gulpfile.js',
        '!CHANGELOG.md',
        '!.travis.yml',
        '!jshintignore',
        '!codesniffer.ruleset.xml',
        '*'
    ])
    .pipe(gulp.dest('dist/'))
});