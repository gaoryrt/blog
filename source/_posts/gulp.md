title: 快速上手使用 Gulp
comments: true
date: 2016-06-25 23:34:10
categories: Geek Talks · 奇客怪谈
---
这篇文章的目的是让你使用Gulp。  
**前提**：你要至少了解NPM，Gulp是什么，对前端开发的流程有个大概的概念。  
如果你想知道Gulp是什么，那么请你先看[Gulp的官方文档（英文）](http://gulpjs.com/)。  
我第一次看[中文官方文档](http://www.gulpjs.com.cn/)时并没有怎么看懂。
要感谢[css魔法的博客中对Gulp4入门指南的翻译](https://github.com/cssmagic/blog/issues/62)。  
***
我默认你已经安装了npm。
并全局安装了gulp：
```
npm i -g gulp
```
## 在gulp配置文件之前
项目文件夹结构如下
```
-app
	index.html
	-css
		main.scss
	-img
	-js
		dropdown.js
		scroll.js
-DIST
gulpfile.js
-node_modules
package.json
```
下面是需要在项目文件夹根目录执行的命令
```
npm init
cnpm i -D gulp-sass gulp-uglify gulp-concat gulp-concat-css gulp-clean-css gulp-merge-link gulp-zip gulp-imagemin gulp-sequence gulp-connect gulp-open gulp gulp-uncss
touch gulpfile.js && open gulpfile.js
```
npm的小trick：  
`i`是`install`的缩写  
`-D`是`--save-dev`的缩写


## gulp配置文件
上面的命令执行之后应该就直接打开编辑器了  
填下面的内容
```
var gulp = require('gulp'),
    D = new Date(),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    merge = require('gulp-merge-link'),
    zip = require('gulp-zip'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect'),
    connect = require('gulp-connect'),
    gulpOpen = require('gulp-open'),
    uncss = require('gulp-uncss')

gulp.task('sass', function() {
    return gulp.src('app/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
})

gulp.task('sass:watch', function() {
    gulp.watch('app/css/*.scss', ['sass'])
})

gulp.task('mergejs', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('merged.js'))
        .pipe(gulp.dest('app'))
})

gulp.task('mergecss', ['sass'], function() {
    return gulp.src('app/css/*.css')
        .pipe(concatCss("merged.css"))
        .pipe(gulp.dest('app'));
});

gulp.task('minicss', ['mergecss'], function() {
    return gulp.src('app/merged.css')
#         .pipe(uncss({
            html: ['app/*.html']
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('DIST'));
});

gulp.task('minijs', ['mergejs'], function() {
    return gulp.src('app/merged.js')
        .pipe(uglify())
        .pipe(gulp.dest('DIST'))
});

gulp.task('merge', ['minicss', 'minijs'], function() {
    return gulp.src('app/index.html')
        .pipe(merge({
            'merged.css': ['css/*.css'],
            'merged.js': ['js/*.js']
        }))
        .pipe(gulp.dest('DIST'));
});

gulp.task('zip', ['merge', 'miniimg'], function() {
    return gulp.src(['DIST/**'])
        .pipe(zip(D.toLocaleString() + '.zip'))
        .pipe(gulp.dest('./'))
})

gulp.task('miniimg', function() {
    return gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('DIST/img'))
});

gulp.task('reload', function() {
    return gulp.src(['app/*.html', 'app/js/*.js', 'app/css/*.scss', 'app/img/*'])
        .pipe(connect.reload());
});

gulp.task('build', ['sass', 'mergejs', 'mergecss', 'minijs', 'minicss', 'merge', 'miniimg', 'zip'], function() {
    console.log('building files')
})

gulp.task('web', function() {
    connect.server({
        port: 8878,
        livereload: true
    });
    gulp.src(['app/index.html'])
        .pipe(gulpOpen({
            uri: 'http://localhost:8878/app'
        }));
});

gulp.task('watch', ['web', 'sass'], function() {
    gulp.watch('app/css/*.scss', ['sass', 'reload'])
    gulp.watch('app/js/*.js', ['reload'])
    gulp.watch('app/img/*', ['reload'])
    gulp.watch('app/*.html', ['reload'])
})

gulp.task('default', ['web']);
```
在这里我不解释命令有什么作用，
这篇文章里，你只用知道使用方法和后果。
## 使用方法
```
gulp build
gulp watch
```
`gulp watch`会打开本地服务器预览`app/index.html`文件，然后监听`scss`，`js`，`img(文件夹内容)`，`html`的改变实时更新浏览器。  

`gulp build`则会合并`js`和`css`，然后在html中替换原有的对资源的多个请求，然后压缩img文件夹中的图片，复制到DIST文件夹中，最后压缩该文件夹，压缩文件名为执行时间。

***
以上
