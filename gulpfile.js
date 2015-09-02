var gulp       = require('gulp'),
    connect    = require('gulp-connect'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    notify     = require('gulp-notify'),
    browserify = require('browserify'),
    minifyCss  = require('gulp-minify-css'),
    source     = require('vinyl-source-stream'),
    plumber    = require('gulp-plumber'),
    buffer     = require('gulp-buffer'),
    sass 	   = require('gulp-ruby-sass'),
    babelify   = require('babelify');

var path = {
      Js        : ['app.js'],
      Css       : ['css/main.css'],
      library   : ['js/skel.min.js','js/skel-panels.min.js','js/init.js',],
      Html      : ['*.html'],
      Watch     : ['build/app.min.js','build/main.min.css','*.html'],
      DEST_BUILD: 'build'
};

/*建立網站*/
gulp.task('startServer',function(){
    connect.server({
        port:6952,
        livereload:true
    });
});

gulp.task('closeServer',function(){
    connect.serverClose();
});



//js
gulp.task('jsTool',function(){
 	browserify(path.Js)
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(plumber())
       	// .pipe(uglify())
        .pipe(gulp.dest(path.DEST_BUILD))
        .pipe(notify({
            message:'js 完成'
        }));
});

gulp.task('libraryTool',function(){
 	gulp.src(path.library)
        .pipe(plumber())
        .pipe(concat('library.min.js'))
        .pipe(gulp.dest(path.DEST_BUILD))
        .pipe(notify({
            message:'library 完成'
        }));
});

//css
gulp.task('cssTool',function(){
	gulp.src(path.Css)
	 	.pipe(plumber())
		.pipe(concat('main.min.css'))
		//.pipe(minifyCss())
		.pipe(gulp.dest(path.DEST_BUILD))
		.pipe(notify({
		    message:'css 完成'
		}));
});


gulp.task('watch',function(){
    gulp.watch(path.Js,['srcTool']);
    gulp.watch(path.Css,['cssTool']);
    gulp.watch(path.Watch, function(event){
        gulp.src(event.path)
            .pipe(connect.reload())
    });
});


gulp.task('dev',['startServer','jsTool','cssTool','libraryTool','watch']);




