---
title: 为hexo添加不依赖模板的页面
comments: true
date: 2016-03-09 14:47:35
categories: 编程
---
前几天看到了一个（我觉得）做的很不错的[online CV](//zhangwenli.com/cv/cn.html)  
想到自己的网页全都是通过md文件然后node.js出来的  
那么有没有办法既能通过hexo验收  
又可以然后放在github上面呢？
***
## 答案一
在[segmentfault的一个提问中](https://segmentfault.com/q/1010000002564944/a-1020000002564987)找到了相关的回答：  
> 如果你是不想`hexo g`时被模板改变你的html的话，可在在文件头加`layout: false`
> 例如新建一个404页面
  
``` html
layout: false
title: "404"
date: 2015-02-05 20:03:48
---
<html>
<head>
    <meta charset="UTF-8" />
    <title>公益404</title>
</head>
<body>
<h1>404 Page Not Found</h1>
<br>
<script type="text/javascript" src="http://www.qq.com/404/search_children.js"     charset="utf-8">
</script>
<br>
</body>
</html>
```

但是这个办法有一个弊端，就是我使用`macdown`来编写md，并没有对编写html进行优化  
我不可能左边放一个macdown，右边一个sublime text，左边复制到右边来继续写  
***
## 答案二 👍
在hexo的官方文档中找到了[这样一个](https://hexo.io/zh-cn/docs/configuration.html)介绍  
> `skip_render` 
> 跳过指定文件的渲染，您可使用 [glob 表达式](https://github.com/isaacs/node-glob)来匹配路径。

那么我就只用在`hexo/_config.yml`中修改`skip_render:`项即可  
***
## 例子：在根目录下添加CV路径
比如我的博客是`gaoryrt.github.io`，我想要自定义`gaoryrt.github.io/CV/index.html`  
那么就只用在`hexo/_config.yml`中写成`skip_render: CV/**`  
然后在`hexo/source`下新建CV目录然后再写个index.html
这下就可以直接用html了，而且这个页面也会被上传到github  
至于怎么链接到`gaoryrt.github.io/CV`，就要在themes的config文件中自己添加了  
***
## 例子：添加更多忽略的路径
hexo官方说的是`skip_render`是用[glob表达式](https://www.npmjs.com/package/glob)来解析的，但是找了一圈我都没有找到怎么添加更多路径，还是Github搜索好，关键字一查就出来了：
```
[CV/**, flex/index.html, 404.html]
```
这样就可以添加更多路径了。
***
以上

