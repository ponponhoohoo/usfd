/*-------------------- インストールコマンド --------------------- */
//グローバル
    // npm i -g gulp
//以下はプロジェクトフォルダで入力
    // npm i -D gulp
    // npm i -D gulp-autoprefixer
    // npm i -D gulp-minify-css
    // npm i -D gulp-uglify
    // npm i -D gulp gulp-sass gulp-postcss postcss-cssnext
    // npm i -D browser-sync
    // npm i -D gulp-debug
    // npm i -D gulp-plumber
    // npm i -D gulp-notify
    // npm i -D gulp-imagemin --save-dev
    // npm install --save imagemin-jpeg-recompress
    // npm install --save imagemin-pngquant
    // npm install --save imagemin-gifsicle
    // npm i -D gulp-ejs
    // npm i -D gulp-minify-ejs
    // npm i -D gulp-rename
    // npm i -D gulp-pug
    // npm i -D gulp-data
    // npm i -D gulp-clean-css
    // npm install gulp-sass --save-dev
    // npm install --save-dev gulp-webserver
    // npm install --save-dev gulp-autoprefixer
/*-------------------- /インストールコマンド -------------------- */

/*必要なモジュールの読み込み*/
var gulp = require('gulp');
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css');
var ejs = require("gulp-ejs");
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var imageminJpg = require('imagemin-jpeg-recompress');
var imageminPng = require('imagemin-pngquant');
var imageminGif = require('imagemin-gifsicle');
var notify = require('gulp-notify');

// 圧縮前と圧縮後のディレクトリを定義
var paths = {
  srcDir : 'src',
  dstDir : 'html/img'
}

//EJSの出力先
var EjsPath = "html";

//WPのテンプレートフォルダ
var ThemePath = "tpl";

// jpg,png,gif画像の圧縮タスク
gulp.task('imagemin', function(done){
    var srcGlob = paths.dstDir + '/**/*.+(jpg|jpeg|png|gif)';
    var dstGlob = paths.srcDir;
    gulp.src( srcGlob )
    .pipe(imagemin([
        imageminPng(),
        imageminJpg(),
        imageminGif({
            interlaced: false,
            optimizationLevel: 3,
            colors:180
        })
    ]
    ))
    .pipe(gulp.dest( dstGlob ));
    done();
});

gulp.task('webserver', function (done) {
    gulp.src(EjsPath) // 公開したい静的ファイルを配置したディレクトリを指定する
        .pipe(webserver({
            host: 'localhost',
            port: 8000,
            livereload: true
        }));
    done();
});

//EJS(テンプレートエンジン)
gulp.task("ejs", function(done) {
    return gulp.src(
       ["ejs/**/*.ejs", '!ejs/**/_*.ejs'] //参照するディレクトリ、出力を除外するファイル
    )
    .pipe(ejs())
    .pipe(rename({extname: ".html"})) //拡張子をhtmlに
    .pipe(gulp.dest(EjsPath + "/")) //出力先
});

gulp.task('browser-sync', function(done) {
    browserSync.init({
        server: {
            baseDir: EjsPath,
            reloadDelay: 1000
        }
    });
    done();
});

gulp.task('bs-reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('minify-css', function() {
    return gulp.src("dist/*.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css/'));
        //.pipe(gulp.dest('css')); 上書きする場合
});

gulp.task("autoprefix", function () {
    return gulp.src(EjsPath + "/css/*.css")
        .pipe(autoprefixer({
            // ☆IEは9以上、Androidは4以上、iOS Safariは8以上
            // その他は最新2バージョンで必要なベンダープレフィックスを付与する設定
            browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
            cascade: false
        }))
        .pipe(gulp.dest(EjsPath + '/css'));
});

// SassとCssの保存先を指定
gulp.task('scss', function(){
  return gulp.src('./scss/**/*.scss')
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(EjsPath + '/css/'))
    .pipe(gulp.dest(ThemePath + '/css/'));
});

 
gulp.task('watch', function() {/*scssを監視*/
    gulp.watch(EjsPath + "/*.ejs", gulp.task('bs-reload'));
    gulp.watch(EjsPath + "ejs/*.ejs", gulp.task('bs-reload'));
	gulp.watch('scss/*.scss', gulp.task('scss'));
    //gulp.watch('dist/*.css', ['minify-css']);
    gulp.watch('ejs/**/*.ejs', gulp.task('ejs'));
    gulp.watch(['*.html', 'css/*.css','js/*.js'], gulp.task('bs-reload'));
    /*拡張子がscssのファイルに変更があれば、gulp.task('sass')を実行*/
});

gulp.task('default', gulp.series( gulp.parallel( 'watch','webserver','imagemin'), function() {
}));