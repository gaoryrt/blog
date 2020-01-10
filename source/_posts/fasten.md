title: 关于速度优化
comments: true
date: 2016-05-08 15:04:12
categories: Geek Talks · 奇客怪谈
---
最近一段时间干过的最差劲的事情就是每天起床守着[百度统计](http://tongji.baidu.com)找存在感了。干脆删除掉，改用[不蒜子](http://busuanzi.ibruce.info)。还有几处js的trick，这里也一起记录一下。  
***
## 删除百度统计
本博客放在[github上](https://github.com/gaoryrt/gaoryrt.github.io)，所以百度的[爬虫并不能爬到](https://www.zhihu.com/question/30898326)，有需要的可以看[这一篇](http://www.dozer.cc/2015/06/github-pages-and-cdn.html)，也可以使用[百度的方法](http://zhanzhang.baidu.com/linksubmit/index)：在浏览网页时提交给百度（我尝试了有半个月这个方法，结果还是不能再百度上通过`Blog Name Goes Here`或者`gaoryrt`找到自己，这也是我决心不用百度的原因之一）。  
百度统计的js文件要求放在`</head>`标签之前，这个也是反人类，凭什么在这个js加载完成之前就不能继续加载我的网页？  
如果你是用的是`2016-05-08`之前版本的`hexo-theme-pln`，那么还请你手动在`/pln/layout/_partial/head.ejs`中删除第39到47行的内容。  
在下一个版本的`hexo-theme-pln`中保证不用百度。应该是启用[不蒜子](http://busuanzi.ibruce.info)，在出大问题之前暂时不换回来，我不想让自己浪费时间再去从一些数字上找存在感了。  
***
## 使用不蒜子
对于这行文字的展示，我暂时没有想到一个美妙的方式，于是将这个结果的展示放在了源文件中，并没有展示出来，如果你想看，可以在网页源代码的最后几行找到这个结果。  
```
<script async src="https://dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js">
</script>
<span style='display:none'>
总<span id="busuanzi_value_site_pv"></span>
客<span id="busuanzi_value_site_uv"></span>
读<span id="busuanzi_value_page_pv"></span>
</span>
```
展示的结果包括访问总量，访客数，页面阅读数。  
***
## 将简单的if-else语句换为三元运算符 
前提是简单，下面举一个包括else的例子：
```
if ($(current).children(".dropdown-content").hasClass("open")) {
	$(current).children(".dropdown-content").removeClass("open");
} else {
	$(current).children(".dropdown-content").addClass("open");
}
```
等价于：
```
	$(current).children(".dropdown-content")[($(current).children(".dropdown-content").hasClass("open"))?'removeClass':'addClass']("open")
```
三元运算符是运算符，要是你想把所有if-else全部变成三元，需要注意，直接使用`A ? B : C` JSLint会报警告的，书上的示例代码是这样的：
```
greeting = "hello" + (username ? username : "there");
```
等价于：
```
greeting = "hello";
if (username)
	greeting += username;
else
	greeting += "there";
```
***
## 加载的顺序
难道我文字的展示需要等到不蒜子的js文件加载完成才能加载么？
那么为什么这里是`$(window).load(revealOnScroll)`而不是`$(document).ready(revealOnScroll)`。  
我尝试了一下，加载的顺序是这样的：
1. $(document).ready(function(){console.log("docuready")})
2. $("body").ready(function(){console.log("bodyready")})
3. $(window).ready(function(){console.log("winready")})
4. $(window).load(function(){console.log("winload")})

其中window.load居然是等到了disqus的js加载完毕之后才出现的。  
所以还是果断使用前三个把。
***
## 近期目标
1. 不蒜子的展示
2. 网页内搜索
3. 文章列表需要一个导航，而非只有上一页下一页
4. 加载时需要一个loading animation
***
以上
