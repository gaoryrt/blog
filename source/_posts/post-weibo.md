title: python 刷微博
date: 2015-10-10 14:13:55
tags: [python]
categories: 硬悟学蛇
---
[上一篇](//gaoryrt.github.io/2015/10/09/whatsup/)里面说过了，要改冲神的`jincin.py`   
改成功了，能够刷微博，但是好像并不完美。。。  
<!--more-->
# 代码
```
#coding=utf-8
import urllib
import urllib2
for i in range(1,11):
    url = "http://m.weibo.cn/mblogDeal/addAMblog"

    data = "content=发十次之"+str(i)+"&st=ceb309"

    headers = {'Host': 'm.weibo.cn',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-cn',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://m.weibo.cn',
            'Content-Length': '26',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11) AppleWebKit/601.1.56 (KHTML, like Gecko) Version/9.0 Safari/601.1.56',
            'Referer': 'http://m.weibo.cn/mblog',
            'Cookie': '不准看'}

    req = urllib2.Request(url, data, headers)


    try:
        response = urllib2.urlopen(req)
        print(i)
    except:
        print('error!')
        exit()

print(response.read())

```
***
# 效果
![](//ww1.sinaimg.cn/large/a243ad6cjw1eww0ouwkvrj207k0dm3zb.jpg)

可惜不会吧所有的都发出来  
但是已经晓得通过`m.weibo.com`可以通过发送`post`包的方式发微博  
理论上现在只用改数据就可以做到发一百次一千次  
不知道微博有没有限制，我还没有尝试  
有的话就用 `delay` 吧，也是两三行的操作  
希望新浪不要把这个给封了
***
以上
