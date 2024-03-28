---
title: 开始python3抓取数据
date: 2015-10-04 11:39:01
tags: [python,abc]
categories: CMD:CV
---
暂时没有看[廖雪峰的python3教程](//www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001431658427513eef3d9dd9f7c48599116735806328e81000)，而是直接看了这个👉[笨办法学Python](//www.2cto.com/shouce/Pythonbbf/index.html)   
笨办法学python - Learn Python The Hard Way 里面写的基本上是初级语法  
看了一会儿发现这是针对无基础人士写的**python2**教程  
看完之后就一个感觉：  
>python语法还是蛮简单的，但是swift还要简单一些  
  
<!--more-->
***
# 需求
终极目标是写一个python脚本，用于抓取热点微博，并定时转发  
看了一下[新浪微博api](//open.weibo.com/wiki/微博API)，为了完成该目标就需要  
1. [转发一条微博信息](//open.weibo.com/wiki/微博API)
2. [发布一条微博信息](//open.weibo.com/wiki/2/statuses/update)
3. [获取最新的公共微博](//open.weibo.com/wiki/2/statuses/public_timeline)
  
在深入的话还需要微博登录

*** 
# step by step
api看不懂就看看demo
demo看不懂至少我看懂了post包里面需要什么数据
那么就直接开始尝试建立post或者get
还是不行，那么开始python抓取网页数据吧————这也是抓取热点微博的一个方法  
***
## 简单抓取网页数据 
注意使用的是python3版本  
不要用错了人家老版本的了 必须的urllib库变了：  
> python 3.x中urllib库和urilib2库合并成了urllib库
其中urllib2.urlopen()变成了urllib.request.urlopen()
urllib2.Request()变成了urllib.request.Request() 
  
参考了这两个网页[Python3 urllib GET方式获取数据](//blog.csdn.net/mr_tank_/article/details/14104103)和[python3.3 抓取网页数据](//wenku.baidu.com/link?url=d9Sxcd98Io4X8IYxx12J_YLBk7DPS2CFAlq-oUwzh8SByj90HMv3fTDCi4wgYpXjTR_luZDu7VzwbdHQ6k7aDHvl9bv2UyVmmqn9t2TX8R_)  

代码如下  
![image](//ww1.sinaimg.cn/large/a243ad6cjw1ewn711zq9lj20cg0crgo5.jpg)
我直接查询了一下我的微博的主页  
本来写的是百度的，东西太多了看不过来。。。。。
网页的html数据就被储存在z_data当中，re库能够通过html的语法进行查询  
第一个查询标题，第二个循环了查询链接  
回显如下  
![image](//ww3.sinaimg.cn/large/a243ad6cjw1ewn7109tpqj20qj06qdik.jpg)
***  
# 更新2015-10-04 23:06:34
## 目的
是把网页中sidebar目录里的所有网页连接给装到一个 dic 字典当中  
或者装到txt 文件当中，这样以后可以用脚本使用该 txt 文档  
然后把文档里的所有东西都给拖下来  
相当于是通过给出来的目录，下载整个网站
通过脚本可以吧`.html`文档简单的变成 markdown 文档
## 操作
此次操作当中最重要的弄懂 python3 的正则表达式和目录操作  
相关网页：  
>[re模块 正则表达式](//python3.h.baike.com/article-362233.html)  
[Python 3语法小记（四）字典 dictionary](//blog.csdn.net/jcjc918/article/details/9366011)  
  
## 代码  
```
import urllib.request
import re

dic = {'name':'urls'}

url = "the url u want"

data = urllib.request.urlopen(url).read().decode("UTF-8")

urllib.request.urlopen(url).close()

links = re.compile('000">(.+?)</')

for urls in links.findall(data):
    if "<a" in urls:
        pass
    else:
        urls.replace('/','_')
        dic['%s'%urls] = '-'

for names in dic.keys():

    temp = 'href="(.+?)">'+names
    urlses = re.compile(temp)
    try:
        urlname = urlses.findall(data)[0]
    except:
        continue
    dic[names] = urlname
    
print(dic)
```
关键在于两个正则表达式：  
`temp = 'href="(.+?)">'+names`  
`links = re.compile('000">(.+?)</')`  
这两个的构造是通过网页源代码来的，我想找的代码段是`(.+?)`里的内容  
本来只用一个正则就行了的，但是整个网页当中有两段目录  
于是 dic 显示一个名字`names`对应了两个`url`  
所以有了第二段 url 用于约束，也就是定位到 sidebar 当中  
## 结果  
看图  
![image](//ww1.sinaimg.cn/large/a243ad6cjw1ewpily64i4j20zk0m8b29.jpg)
👆成功了哟👆  
接下来的就是把`/wiki/`开头的相对路径添加成为含有网址的绝对路径  
~~然后存为 txt  拿给其他的脚本使用了~~  
更新：用` pickle`储存，见下方更新
***  
# 更新2015-10-06 20:00:10
## 添加成绝对路径
还是以[廖雪峰的 python3 教程](//www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000)为例  
我们在上面已经得到了这样的url 字符串：
```python
/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000
```
这也是我们两行正则表达式的查找标准之一  
在这里把url 改成绝对路径：
```
urlname = "http://www.liaoxuefeng.com"+urlses.findall(data)[0]
```
## 存档以便以后使用
这里使用` pickle`  
参考网页：[Python3 pickle序列化](//blog.csdn.net/mr_tank_/article/details/14224141)
使用方法如下：
**👇写入👇**
```
with open("the_name_you_want.pickle","wb") as f:
    pickle.dump(dic,f)
```
**👇读出👇**
```
with open('the_name_you_want.pickle','rb') as f:  
    dic=pickle.load(f)
```
**这里的`dic`是一个字典**
## 用一个函数来生成 html 文档    
输入一个`{names:url}`储存的字典，效果是把储存的所有网页都下载下来  
一下就写好了，代码如下：

```
import urllib.request

def store_the_page(dic):
    for names in dic:
        url = dic[names]
        data=urllib.request.urlopen(url).read()
        urllib.request.urlopen(url).close()
        try:
            fp = open("%s.html"%names,"wb")
        except:
            continue
        fp.write(data)
        fp.close()
        print("%s.html\t写入完成"%names)

```
两个`.py`怎么互相调用呢？  
>假如我有一个 `b.py`  
```
def method():
    print("hello world")
```
>在`a.py`里就该这样调用：  
```
import b
 blah
 blah
 blah
method()
```
也就是说，只用 import 就行了，因为在同一文件夹里，直接写`import b`  
  
## 效果
看图：  
![image](//ww2.sinaimg.cn/large/a243ad6cjw1ewrpfh0mbsj20ff0lnjy0.jpg)
看着文件一个一个生成还是蛮开心的  
最后的错误是因为文件名中带有`/`这个特殊的符号  
我们可以通过替换`names`字符串中的`/`来解决  
或者是用`try` `except`来忽略它  
看看 finder：  
![image](//ww1.sinaimg.cn/large/a243ad6cjw1ewrpk4u85lj211i0opdp5.jpg) 
***
至此就完成了查找目录-下载目录-下载网站的过程


以上
