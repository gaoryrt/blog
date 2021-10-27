---
title: 下载Dive into python3
date: 2015-10-06 21:16:33
tags: [python,abc]
categories: 硬悟学蛇
---
还是没有看廖雪峰的教程，就算我把它爬下来了。。。  
在[上一篇](/2015/10/04/开始python3抓取数据/)中，本来的目标是通过构造`get`和`post`来自动获取热门微博然后刷微博，但是写到最后变成了通过网站目录下载网站  
然后刚好有一个网站想下载下来，就来试试看
<!--more-->  
# dive into python3  
感觉这个才写的好嘛，精炼，适合有一点编程基础的人看。  
他一共就十几个程序，每个程序里面都包含了很多要点  
编者肯定很花了点心思来写  
本来他的主页上有下载 pdf 和 html 的链接，只可惜都是404  
那么就用昨天的脚本来试试看  
![](//ww4.sinaimg.cn/large/a243ad6cjw1ewsmq37cnzj20h80jwq62.jpg)
***  
# 修改源程序
利用的 `python`脚本文件就是上一篇的
改了不少地方：  
```python
import urllib.request
import re
import pickle
import storethepage

dic = {}
#初始化储存名称-url 对的字典

url = "http://woodpecker.org.cn/diveintopython3/index.html"
#抓取的链接

data = urllib.request.urlopen(url).read().decode("UTF-8")
#格式化后的整个文本

urllib.request.urlopen(url).close()

links = re.compile('html>(.+?)</a>')
#定位1

for names in links.findall(data):
    try:
        nPos = names.index('/')
        names = names[0:1]
        nPos = -1
    except:
        nPos = -1

    if nPos == -1:
        dic['%s'%names] = '-'
        print(names)

for names in dic.keys():
    temp = 'href=(.+?)>'+names
    #定位2
    urlses = re.compile(temp)
    urlname = 'http://woodpecker.org.cn/diveintopython3/'+urlses.findall(data)[0]
    dic[names] = urlname

#储存
with open("diveintopython3.pickle","wb") as f:
    pickle.dump(dic,f)

del dic['随时欢迎反馈意见']
del dic['展开']

storethepage.store_the_page(dic)
```
***
# 遇到的麻烦 
1. names 一下就找到了，url 死活找不到
2. url 会读取到不想要的内容
3. names 中包含`/`的都写入不了
  
解决方法：  
1. 浏览器的检查器看到的 url 格式和程序当中看的不一样，检查器中的 url 带引号略坑爹  ![](//ww2.sinaimg.cn/large/a243ad6cjw1ewsmq10s47j20uw0l60ym.jpg)
2. 在最后把这两条不想要的直接删除了
3. 一共四条内容包含`/`，直接截取第一个字，恰好还可以供后面的用
  
***
# 效果
看图  
![](//ww1.sinaimg.cn/large/a243ad6cjw1ewskgw65knj209u0ahtay.jpg)  
![](//ww1.sinaimg.cn/large/a243ad6cjw1ewskgyhjf9j207p0bpgn4.jpg)

***
以上
