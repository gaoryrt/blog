---
title: CSS3笔记
comments: true
date: 2016-04-22 18:57:56
categories: CMD:CV
---
当时看w3school的CSS3时记下来的一些（私以为）容易忽略的要点，写下来再加深印象。
# 边框
border-radius: 1-4 length|% / 1-4 length|%;  
```
border-radius:2em;
border-radius: 2em 1em 4em / 0.5em 3em;
```
- 1个值：(top, right, bottom, left)；
- 2个值：(top, bottom), (left, right)；
- 3个值：top, (left, right), bottom；
- 4个值：(top), (right), (bottom), (left)；
  
box-shadow: h-shadow v-shadow blur spread color inset;  
```
box-shadow: 10px 10px 5px #888888;
box-shadow: 2px 2px 3px #aaaaaa;
```
`border-image: <'border-image-source'> || <'border-image-slice'> [/ <'border-image-width'> |/ <'border-image-width'>? /<'border-image-outset'> ]? || <'border-image-repeat'>`
```
border: 10px solid gray;
border-image: url(test.png) 10/10px;
```
***
# 背景
background-size: length|percentage|cover|contain;
```
background-size:35% 100%;
background-size:80px 60px;
```
background-origin: padding-box|border-box|content-box;
padding-box根据padding定位  
border-box根据margin定位  
content-box根据content定位  
background-clip: padding-box|border-box|content-box;
padding-box在padding内绘制  
border-box在margin内绘制  
content-box在content内绘制  
关于上面这两个的区别运用，[看这一篇文章](//www.planabc.net/2008/04/14/background-clip_background-origin/)，写的真好。  
***
# 文本
text-shadow: h-shadow v-shadow blur color;
```
text-shadow: 5px 5px 5px #FF0000;
text-shadow: 0 0 3px #FF0000;
```
word-wrap: normal|break-word;
word-break: normal|break-all|keep-all;
关于上面这两个的区别运用，[看这一篇文章](//blog.csdn.net/u011043843/article/details/39375677?utm_source=tuicool&utm_medium=referral)。  
主要区别是，`word-wrap`是另起一行后分割，`word-break`是直接分割。
***
# 字体
```
@font-face {
  font-family: <YourWebFontName>;
  src: <source> [<format>][,<source> [<format>]]*;
  [font-weight: <weight>];
  [font-style: <style>];
}
```
这里是一个多浏览器支持的例子：
```
   @font-face {
	font-family: 'YourWebFontName';
	src: url('YourWebFontName.eot'); /* IE9 Compat Modes */
	src: url('YourWebFontName.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
             url('YourWebFontName.woff') format('woff'), /* Modern Browsers */
             url('YourWebFontName.ttf')  format('truetype'), /* Safari, Android, iOS */
             url('YourWebFontName.svg#YourWebFontName') format('svg'); /* Legacy iOS */
   }
```
先引入，后同系统已有字体使用。
