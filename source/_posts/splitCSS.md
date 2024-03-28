---
title: 拆分CSS
comments: true
date: 2016-05-14 21:55:22
categories: Geek Talks
---
在我开始着手写[hexo-theme-pln]()的时候我就已经预见到了这一幕：这个 css 文件太过巨大，对于普通的维护来说比较复杂，我需要将它拆分开来。  
这篇文章就在进行的同时记录一下过程。  
**想看的看，不想看就别看。**  
***
## 思路
这个css文件是这个项目中的唯一的一个 css，我需要将它根据作用分成几个部分，再为其加上变量选项，以便维护。  
所以我需要一款可以运行在 node.js 上的，支持变量以及导入的css预处理器。  
那么就要选择是 Less、Sass 还是 Stylus 了，关于这几个之间的比较我找到一些文章：[Sass vs. LESS](https://css-tricks.com/sass-vs-less/)、[再谈 CSS 预处理器](//efe.baidu.com/blog/revisiting-css-preprocessors/)。  
简单看了一下，不用游标卡尺的[SCSS](//sass-lang.com)，就是你了。  
在这之前我还需要将css文件根据DOM排序，分成几个文件。我想这个时候就不需要第三方的工具了，既然这几天在看node.js相关，其实也可以自己写一个爬虫，树状输出该页面下所有节点名。  
那么整个过程就是下面几步：  
1. 本地安装SCSS，以及常用操作
2. 爬到页面的树状节点名
3. 手动拆分原css
4. SCSS优化
***
## 关于SCSS
私以为这个是sass的升级版，就是有了大括号和分号的sass。  
Mac 下的安装：
```
gem install sass
```
如果不行请用`sudo`，安装完了用`sass -v`检查一下是否成功。  
常用操作就不再累述，想看的看[官网的介绍](//sass-lang.com/guide)吧，都差不多。  
使用的话是这个：
```
sass style.scss:style.css
```
压缩的话是这个：
```
sass --style compressed style.scss:style.min.css
```
***
## 爬虫
新建文件夹，cd进去`npm init`，然后修改`package.json`，添加上`"private": true`，再确保自己写了`"description"`这一项之后继续，都是为了方式`NPM WARN`。  
然后是爬虫和jquery相关的库：
```
npm install superagent cheerio --save
```
以下就是编写这个通过html获得节点列表的爬虫了。  
好吧写了大概有三个小时我还是放弃了，这个循环的递归我还不知道怎么写呢。。。
一开始写的第一个版本写到后面发现需要递归。第二个版本递归写好了发现还需要循环进去。  
或许还是我的逻辑问题，不该写`startSelector Return SonNodeArr`这么一个函数的，应该就一层接着一层，返回下一层第一个，然后下一个，直到没有下一个，直到没有下一层。  
第一版的代码可以得到：
```
[ 'body div#main', 'body footer.page-footer' ]
---------------------
[ 'body div#main div.behind', 'body div#main div.container' ]
[ 'body footer.page-footer div.clearfix',
  'body footer.page-footer div.right-foot.container',
  'body footer.page-footer div.clearfix' ]
---------------------
[ 'body div#main div.behind div.back',
  'body div#main div.behind div.description' ]
[ 'body div#main div.container nav.navigator',
  'body div#main div.container ul.posts',
  'body div#main div.container ul.pager' ]
[]
[ 'body footer.page-footer div.right-foot.container a.backtop.wow.fadeIn.animated',
  'body footer.page-footer div.right-foot.container a' ]
[]
```
我加了两个横线之后可以看到，1 -> 2 -> 5 的这个大体结构。  
但是这个并不是我想要的结果，这个遍历的逻辑其实可以写得很简单才对。  
好了写了一会儿，这个逻辑清晰了，但是有一个问题，就是得不到本元素的`attribs`属性，导致整个输出会缺少每一代的第二个子元素，我只想到一个办法把它加上去：  
```
function getChildAndBro(startNode) {
    if ($(startNode).children().length !== 0) {
        console.log($(startNode).children().parent()[0].attribs);
        if (loged.indexOf($(startNode).children()[0].attribs) == -1) {
            console.log($(startNode).children()[0].attribs);
            loged.push($(startNode).children()[0].attribs);
            getChildAndBro($(startNode).children()[0]);
        } else {
            if ($(startNode).next().length !== 0) {
                console.log($(startNode).next().attribs);
                if (loged.indexOf($(startNode).next().attribs) == -1) {
                    loged.push($(startNode).next().attribs);
                    getChildAndBro($(startNode).next());
                }
            }
        }
        getChildAndBro($(startNode).next());
    }
}
```
手动把重复的和无关属性去掉之后是这样的：  
```
{ id: 'main' }
{ class: 'behind' }
{ class: 'back' }
{ class: 'fa fa-times-circle-o' }
{ class: 'container' }
{ class: 'navigator' }
{ class: 'navbar navbar-default navbar-fixed-top' }
{ class: 'nav-container' }
{ class: 'nav navbar-nav navbar-left' }
{ class: 'navbar-header' }
{ class: 'dropdown' }
  class: 'dropdown-toggle',
{ class: 'fa fa-tags fa-lg' }
{ class: 'dropdown-content' }
{ id: 'site_search', class: '' }
  id: 'local-search-input',
  class: 'form-control' }
{ class: 'posts' }
{ class: 'post-item' }
{ class: 'index-title' }
{ class: 'excerpt' }
{ class: 'index-meta' }
{ class: 'fa fa-calendar' }
{ class: 'pager' }
{ class: 'page-number current' }
{ class: 'page-footer' }
{ class: 'clearfix' }
```
看这个架势应该不怎么全啊，算了不搞了。
***
## 拆CSS，SCSS化
经过上面爬虫的失败，我感觉打开chrome按照顺序来排序要快得多。 
两个小时左右吧，差不多拆完了，分成几个部分：
```
animation.scss
code.scss
footer.scss
main.scss
navigator.scss
pager.scss
posts.scss
search.scss
```
在`main.scss`当中添加`@import`，把其他的导入，然后`color`都给提出来做成变量，该`nesting`的`nesting`，该`mixin`的`mixin`。  
特别注意一下，在终端使用sass语句时，`--watch`可以配合`livestyle`热更新，相当好用。
***
以上
