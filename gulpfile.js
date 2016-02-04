(function() {
	'use strict';

	var gulp = require('gulp'),
		less = require('gulp-less'),
		rename = require('gulp-rename'),
		minify = require('gulp-minify-css'),
		jshint = require('gulp-jshint'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		ngAnnotate = require('gulp-ng-annotate'),
		nodemon = require('gulp-nodemon');

	// register linting task
	gulp.task('js', function() {
		return gulp.src(['index.js', 'public/app/*.js',
				'public/app/**/*.js'
			])
			.pipe(jshint())
			.pipe(jshint.reporter('default'));
	});

	// register the css task
	gulp.task('css', function() {
		// grab the less file, process the less file and add
		// a css file into the destination
		return gulp.src('public/assets/css/application.less')
			.pipe(less())
			.pipe(minify())
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest('public/assets/css'));
	});

	// lint, concat and minify FE files
	gulp.task('scripts', function() {
		return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(concat('all.js'))
			.pipe(uglify())
			.pipe(gulp.dest('public/dist'));
	});

	// lint, concat and  uglify angular code
	// ngAnnotate help define services in an array befor injecting
	// in function during uglification
	gulp.task('angular', function() {
		return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(ngAnnotate())
			.pipe(concat('app.js'))
			.pipe(uglify())
			.pipe(gulp.dest('public/dist'));
	});

	// gulp watch files for changes
	gulp.task('watch', function() {
		gulp.watch('public/assets/css/application.less', ['css']);
		gulp.watch(['index.js', 'public/app/*.js', 'public/app/**/*.js'], ['js', 'angular']);
	});

	// configuring app to be run by gulp
	gulp.task('nodemon', function() {
		nodemon({
				ext: 'js html less',
				script: 'index.js'
			})
			.on('watch', ['watch'])
			.on('start', ['watch'])
			.on('restart', function() {
				console.log('Restarted..');
			});
	});

	// define the defaut gulp task
	gulp.task('default', ['nodemon']);
})();