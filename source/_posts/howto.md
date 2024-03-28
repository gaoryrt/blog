---
title: 这个博客建立的流程
categories: 扫盲教育
date: 2015-09-09 12:12:12
tags: [abc,howto,hexo,markdown]
---

关于本篇博文
简述了安装Hexo的简单流程，遇见问题的话，善用Google可以帮助你  
命令行出错的话请尝试在命令之前加上sudo  
  
<!--more-->
***
# 安装Hexo之前
> ** Mac用户 **   
> 在编译的时候可能会遇到问题，请先安装Xcode  
> 然后进入Preferences->Download->Command Line Tools->Install 安装命令行工具  

## 安装Node.js
在[Node.js官网](//nodejs.org)可以下载到安装包  
**或者**使用[nvm](https://github.com/creationix/nvm)进行安装
cURL:  
```  
$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh  
```  
或者 Wget:  
```  
$ wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
```  
以上任一方式安装，重启终端后执行以下命令即可安装Node.js  
```  
$ nvm install 0.10  
```   
安装成功后即可使用npm命令  
``` bash
 $ npm -v
 ```  
如果安装成功返回的是npm的版本信息  
## 安装Git
在[Git官网](//git-scm.com)可以下载到安装包  
**或者**使用[Homebrew](//mxcl.github.com/homebrew/)，[MacPorts](//www.macports.org/)进行安装  
安装成功后可使用git命令  
``` bash
$ git --version
```  
如果安装成功返回的是git的版本信息  

***
# 开始安装Hexo
在**确保**自己安装了Node.js以及Git之后  
使用以下命令   
``` bash 
$ npm install -g hexo-cli
```  
安装成功后可使用hexo命令  
```  
$ hexo -v   
```  
如果安装成功返回的是Hexo的版本信息  
***  
# 开始使用Hexo 
请**在你想安装的位置**使用以下命令
```  
$ hexo init 
$ npm install  
```  
安装成功后可在指定文件夹下看到文件目录  
```  
.  
├── _config.yml  
├── package.json  
├── scaffolds  
├── scripts  
├── source  
|   ├── _drafts  
|   └── _posts  
└── themes  
```  
如果跟上面一样就说明建站成功了  
各个文件的说明请参照 [建站｜Hexo](https://hexo.io/zh-cn/docs/setup.html)  
***
# 添加一篇文章  
使用以下命令(用你想要的名字代替`yourblogname`字段)  
```  
$ hexo new "yourblogname"  
```  
*比如你想创建一篇叫做“abc”的新文章，那么使用以下命令*    
```  
$ hexo new "abc"  
```  
然后你可以在`你的hexo位置`/source/_posts 文件夹中找到你的新文章  
*以刚才的`abc`文章为例，在这个文件夹中新文章为`abc.md`*    
用支持的软件编辑该文件开始编辑（至少我是这么做的，好像有点麻烦）  
> 以`.md`结尾的是markdown文件  
> 如果你想了解更多关于markdown的信息请看这篇文章  [关于markdown](/2015/09/10/关于markdown/)  
   
在你更新、删除之后都不用再使用`hexo g`或者`hexo s`命令来重新启动服务  
你要做的所用工作只是简单的**在浏览器中刷新 <http://0.0.0.0:4000>**   
简单的刷新就可以让你看到你对博客的更改
***
# 在Hexo中加载NexT主题  
参见右边链接  [NexT - an elegant theme for Hexo](//theme-next.iissnan.com)  
***  
# 将网站部署到Github
参见右边链接  [hexo你的博客|不如](//ibruce.info/2013/11/22/hexo-your-blog/)  
不说了都是泪  




