var gulp = require('gulp'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    uglifycss = require('gulp-uglifycss'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify'),
    event = require('event-stream'),
    streamqueue = require('streamqueue'),
    htmlreplace = require('gulp-html-replace');

var config = {
    adminDir: "./frontend/app/admin",
    bowerDir: "./frontend/bower_components",
    sourceDir: "./frontend/app",
    outputDir: "./frontend/dist"
};

// --- WATCH SERVER --- //
gulp.task('connect', function(){
    connect.server({
        port: 8800,
        livereload: true,
        root: './frontend/dist/app'
    });
});

gulp.task('clean', function() {
    return gulp.src('frontend/dist', {read: false})
        .pipe(clean());
});

gulp.task('copyPlugins', function() {
    return gulp.src(config.sourceDir + "/plugins/**/*")
        .pipe(gulp.dest(config.outputDir + "/app/plugins"))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    return streamqueue({ objectMode: true },
            gulp.src([
                config.sourceDir + "/js/*.js",
                config.sourceDir + "/js/models/*.js",
                config.sourceDir + "/js/services/*.js",
                config.sourceDir + "/js/directives/**/*.js",
                config.sourceDir + "/js/components/**/*.js"
            ])
        )
        .pipe(concat("scripts.min.js"))
        // .pipe(uglify())
        .pipe(gulp.dest(config.outputDir + "/app/js"))
        .pipe(connect.reload());
});

gulp.task('jsWatch', function() {
    return streamqueue({ objectMode: true },
        gulp.src([
            config.sourceDir + "/js/*.js",
            config.sourceDir + "/js/models/*.js",
            config.sourceDir + "/js/services/*.js",
            config.sourceDir + "/js/directives/**/*.js",
            config.sourceDir + "/js/components/**/*.js"
        ])
    )
        .pipe(concat("scripts.min.js"))
        .pipe(gulp.dest(config.outputDir + "/app/js"))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    let index = gulp.src(config.sourceDir + "/index.html")
        .pipe(htmlreplace({
            'css': 'dist/app/css/styles.min.css',
            'js': 'dist/app/js/scripts.min.js'
        }))
        .pipe(gulp.dest(config.outputDir + "/app"));

    let components = gulp.src(config.sourceDir + "/js/components/**/*.html")
        .pipe(gulp.dest(config.outputDir + "/app/js/components"));

    let directives = gulp.src(config.sourceDir + "/js/directives/**/*.html")
        .pipe(gulp.dest(config.outputDir + "/app/js/directives"));

    let views = gulp.src(config.sourceDir + "/views/**/*.html")
        .pipe(gulp.dest(config.outputDir + "/app/views"));

    return event.concat(index, components, directives, views).pipe(connect.reload());
});

gulp.task('css', function() {
    return gulp.src(config.sourceDir + "/css/**/*.css")
        .pipe(concatCss("styles.min.css"))
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest(config.outputDir + "/app/css"))
        .pipe(connect.reload());
});

gulp.task('cssWatch', function() {
    return gulp.src(config.sourceDir + "/css/**/*.css")
        .pipe(concatCss("styles.min.css"))
        .pipe(gulp.dest(config.outputDir + "/app/css"))
        .pipe(connect.reload());
});

gulp.task('fonts', function() {
    var fonts = gulp.src(config.sourceDir + "/fonts/**/*")
        .pipe(gulp.dest(config.outputDir + "/app/fonts"));

    var fontAwesome = gulp.src(config.sourceDir + "/font-awesome/**/*")
        .pipe(gulp.dest(config.outputDir + "/app/font-awesome"));


    return event.concat(fonts, fontAwesome).pipe(connect.reload());
});

gulp.task('bower', function() {
    return gulp.src(config.bowerDir + "/**/*")
        .pipe(gulp.dest(config.outputDir + "/bower_components"));
});


gulp.task('images', function() {
    var images = gulp.src("./frontend/images/**/*")
        .pipe(gulp.dest(config.outputDir + "/images"));

    var cssImg = gulp.src(config.sourceDir + "/css/patterns/**/*")
        .pipe(gulp.dest(config.outputDir + "/app/css/patterns"));

    return event.concat(images, cssImg).pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(config.sourceDir + "/js/**/*.js", ['jsWatch']);
    gulp.watch(config.sourceDir + "/css/**/*.css", ['cssWatch']);
    gulp.watch(config.sourceDir + "/**/*.html", ['html']);
});

gulp.task('default', ['css', 'js', 'fonts', 'html', 'bower', 'images', 'copyPlugins', 'watch', 'connect']);
gulp.task('build', ['css', 'js', 'fonts', 'html', 'bower', 'images', 'copyPlugins']);