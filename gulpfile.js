    "use strict";
    // 引入组件
/*    var filepath = "../node_modules/"; //C:\Users\netposa\AppData\Roaming\npm\
    var gulp = require(''+ filepath +'gulp'),
        // webpack = require(''+ filepath +'gulp-webpack'),          //webapck打包
        // config = require('./webpack.config'),
        // util = require(''+ filepath +'gulp-util'),
        // less = require(''+ filepath +'gulp-less'),                //编译less
        minifycss = require(''+ filepath +'gulp-minify-css'),     //压缩css
        // open = require(''+ filepath +'gulp-open'),                //浏览器打开文件
        // replace = require(''+ filepath +'gulp-replace'),          //
        // uglify = require(''+ filepath +'gulp-uglify'),            //压缩js
        // jshint = require(''+ filepath +'gulp-jshint'),            //js语法检查
        // watch = require(''+ filepath +'gulp-watch'),              //文件监控

        // imagemin = require(''+ filepath +'gulp-imagemin'),        //图片压缩
        // pngquant = require(''+ filepath +'imagemin-pngquant'),    //PNG压缩
        // jpegtran = require(''+ filepath +'imagemin-jpegtran'),    //JPG压缩
        // imageisux = require(''+ filepath +'gulp-imageisux'),      //智图压缩
        // tinypng = require('gulp-tinypng-compress'),
        notify = require(''+ filepath +'gulp-notify'),            //消息提醒
        // cache = require(''+ filepath +'gulp-cache'),              //缓存
        concat = require(''+ filepath +'gulp-concat'),            //文件合并
        // livereload = require(''+ filepath +'gulp-livereload'),    //实时刷新
        clone = require(''+ filepath +'gulp-clone'),              //文件克隆
        rename = require(''+ filepath +'gulp-rename'),            //文件重命名
        // clean = require(''+ filepath +'gulp-clean'),              //文件清理
        // zip = require(''+ filepath +'gulp-zip'),                  //文件打包
        // override = require('gulp-rev-css-url'),
        // plumber = require(''+ filepath +'gulp-plumber'),
        // processhtml = require(''+ filepath +'gulp-processhtml'),
        minifyHTML = require(''+ filepath +'gulp-minify-html'), 
        // rev = require(''+ filepath +'gulp-rev'),                     //hash化
        // revCollector = require(''+ filepath +'gulp-rev-collector'), //hash输出json
        // del = require("del"),
        // http = require("http"),
        // path = require("path"),                                 
        fs = require('fs');       */                  //node 本地文件操作

var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');
    // 合并，压缩css文件



    gulp.task("concat-css-dark",function () {
        gulp.src(['template/css_dark/*.css', '!template/css_dark/base.css', '!template/css_dark/bootstrap.css'])
            .pipe(concat('all.css'))
            .pipe(minifycss())
            .pipe(rename({
                suffix:'.min'
            }))
            .pipe(gulp.dest('template/css_dark/'))
            .pipe(notify({
                message:"合并，压缩css完成"
            }));
    });


    gulp.task("concat-css-default",function () {
        gulp.src(['template/css_default/*.css', '!template/css_default/base.css', '!template/css_default/bootstrap.css'])
            .pipe(concat('all.css'))
            .pipe(minifycss())
            .pipe(rename({
                suffix:'.min'
            }))
            .pipe(gulp.dest('template/css_default/'))
            .pipe(notify({
                message:"合并，压缩css完成"
            }));
    });
    gulp.task("live",function () {
        var server = livereload();
        console.log(server);
        gulp.watch('**/*.*',function (file) {
            
            server.changed(file.path);
        });

    });

    // 合并，压缩js文件
    gulp.task("build-js",function(){
        //引入开发环境目录下得js
        gulp.src([
            "src/js/jquery.min.js",
            "src/widget/swiper/swiper.min.js",
            "src/widget/swiper/swiper.animate.min.js"
            ])
            //合并目录下所有js
            .pipe(concat("all.js"))
            //压缩js
            .pipe(uglify())
            //重命名js
            .pipe(rename({
                suffix:".min"
            }))
            //hash化
            //.pipe(rev())
            //输出到文件发布目录
            .pipe(gulp.dest("dist/js/"))
            //hash化配置json
            //.pipe(rev.manifest())
            //输出到
            //.pipe(gulp.dest("dist/js/manifest"))
            .pipe(notify({ message:"恭喜您！合并，压缩js文件完成了！" }));
    });

    // 压缩图片文件
    gulp.task("build-img",function(){
        gulp.src("src/img/*.png")
            .pipe(imagemin({
                quality: '65-80', 
                speed: 4,
                progressive: true,
                interlaced: true,
                multipass: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(gulp.dest("dist/img"));
            gulp.src('src/img/*.jpg')
               .pipe(imagemin({
                    progressive: true,
                    quality: '0-10', 
                    use:[jpegtran()]
               }))
                .pipe(gulp.dest('dist/img'));
         // return gulp.src(["src/img/*"])
         //   .pipe(imageisux("dist/img",true));
    });

    // 清空dist目录里面各个文件夹里面的文件
    gulp.task("clean",function(){
        return gulp.src(["dist/css/","dist/js/","dist/img/","dist/*.html"],{read:false})
            .pipe(clean())
            .pipe(notify({ message:"文件清理完成了！" }));
    });

    //复制html到发布目录并且修改链接
    gulp.task("build-html",function(){
        var cloneSink = clone.sink();
        gulp.src("src/*.html")
            .pipe(cloneSink) 
            .pipe(cloneSink.tap())
            .pipe(processhtml())
            .pipe(gulp.dest("dist/"));
    });

    // // 静态资源文件生成版本号
    gulp.task("rev",function(){
        gulp.src(["dist/**/manifest/rev-manifest.json","dist/*.html"])
            .pipe(revCollector({
                replaceReved : true
            }))
            .pipe(gulp.dest("dist/"))
            .pipe(notify({ message:"项目发布完成!" }));

    });

    var browserSync = require('browser-sync').create();
    // Static server
    gulp.task('browser-sync', function() {
      var files = [
      '**/*.html',
      '**/*.css',
      '**/*.js'
      ];
      browserSync.init(files,{
        server: {
          baseDir: "./"
        }
      });
    });

    // 监控文件变化，实时刷新浏览器
    // gulp.task("watch",function(){
    //     gulp.start("live");
    // });
    // 注册默认任务
    // gulp.task("default",["clean"],function(){
    //     gulp.start("build-js","build-img","build-css","build-html");
    // });
    gulp.task('default',['browser-sync']);
    //发布到线上
    gulp.task("publish",function(){
        gulp.start("rev");
    });

    // // 注册默认任务    
    // gulp.task("default",["build"],function(){
    //     gulp.start("rev");
    //     console.log("恭喜您！项目已经发布，去dist目录看看吧！");

    // })
    gulp.task('concat-css',function () {
       gulp.start('concat-css-default','concat-css-dark');
    });

