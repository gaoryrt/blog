title: 升级mac的python
date: 2015-09-30 21:17:31
tags: [abc,howto,mac]
categories: [Geek Talks · 奇客怪谈]
---
在前一篇 [开始Python](//gaoryrt.github.io/2015/09/27/StartingPython/) 当中提到了安装新版本Python的方法  
但是在shell当中使用`python`命令的时候还是依旧使用的老版本Python。  
今天下午解决这个问题花了好长时间。
<!--more--> 
***
# 发现问题
1. 找的Python教程都是基于3.X版本的，跟2.X并不兼容  
2. shell当中使用`python`命令显示的Python版本依旧是2.7.10  
3. 准备的编辑器是`Atom`或者`Sublime Text`，编译就交给shell了

看了其他人的Python建议之后还是决定先把Vim当作普通编辑器，不要深入把它变成Python IDE了  
***  
# 尝试解决
直接安装的话尝试了brew安装和[直接下载](https://www.python.org/downloads/)安装 
```
brew install python //brew安装Python
```   
两种都是直接安装在`/Library/Frameworks/Python.framework/Versions/3.5`中  
并没有[帮助](//jingyan.baidu.com/article/27fa7326e4809646f8271fc7.html)我建立link，建立可执行文件
好像直接覆盖的话会有很多遗留问题，Sublime和Xcode都要用到Python2.7脚本
在Stack Overflow上面找了很久，试过的都不管用，主要是因为Mac OSX 10.11 El Captain的rootless这个新特性  
初衷是为了用户的安全呗  不把root权限交给用户  搞得我现在sudo出来都报错告诉我   
`Operation not permitted`   
这下我连复制Python版本目录到一起都不行了，更别说更改路径了   
我就尝试着在shell配置中添加alias直接调用IDLE中新版Python  
这个应该是能够成功的，但是需要调用的`python3.5`是一个隐藏文件，我在shell当中也只是`tab`自动补全的时候才添加的  
之后的尝试也以找不到目标文件告终  
***
# 解决方法
然后居然是万能的知乎上找到了答案  
是一个叫做`pythonbrew`的shell插件  
能够下载切换全局局部的特定Python版本，简单操作易切换  
安装配置参照👉[pythonbrew](https://github.com/utahta/pythonbrew)👈
安装配置成功后下载了3.4和2.7两个版本的Python并切换了过去  
太方便了好么！！！
***
# 看图
![image](//ww2.sinaimg.cn/large/a243ad6cjw1ewktr4gy20j20jd0fswfv.jpg)  
**👆没有改的时候，原版Python👆**  
![image](//ww1.sinaimg.cn/large/a243ad6cjw1ewktr2tvj3j20jd0fs41a.jpg)  
**👆使用pythonbrew转换之后👆**  
![image](//ww4.sinaimg.cn/large/a243ad6cjw1ewktr0wym7j20jd0fs411.jpg)  
**👆可用的版本，我只下载了两个👆**  
![image](//ww4.sinaimg.cn/large/a243ad6cjw1ewktqy8cjjj20jd0fs401.jpg)  
**👆换回来之后👆**  
***
以上
