---
title: what's up
date: 2015-10-09 22:49:40
tags: [howto, mac]
categories: Geek Talks · 奇客怪谈
---
买了 ipad 这几天都没有更新  
长话短说，四件事  
1. mac 软件
2. ipad 软件
3. next 更新
4. python 脚本  
  

<!--more-->
***
# Mac 软件
## macdown
不要用`mou`了，用`macdown`吧  
自定义的东西多得多，快捷键基本上可以无缝切换过去  
主要是不喜欢`mou`的开发者  
## go2shell
在 finder 中找到了文件，想在 shell 中打开  
`cd` 还是直接拖动文件都比较麻烦
## unclutter
方便的中转站，包括已复制的文本，图片，或者是文件，网址
## karabiner
改键位用  
我的 mac 是12年的了，右上角有个 `eject` 键用来弹出光盘  
然而我光驱换了 ssd ，就用这个把 `eject` 换成 `delete`了
## Teanmviewer
超超超方便的桌面同屏，免费
*** 
# iPad 软件
## 墨笔
记笔记超好用的
## 播客
ipn 的好几个都特别有意义，坐公交的时候都不听歌了
## Adobe reader & cabinet
看 pdf
***
# NexT 主题更新
简单的预想：  

![](//ww1.sinaimg.cn/large/a243ad6cjw1ewvaglhr5sj20j60chmz7.jpg)

要做的事情还很多  
这个简单看了一下👉[Hexo主题Rebiture](//zodiacg.net/2015/05/hexo-theme-rebiture/)  
他就是从 next 主题改过去的，步骤写的很详细了
***
# python 脚本
主要是还想着无限发微博这一件事  
暂时不晓得到底发一个 post 包到底要放哪些东西  
就抓包看了一下  
![](//ww4.sinaimg.cn/large/a243ad6cjw1ewvauk3ec3j20ja09ujsz.jpg)
👆这个抓包用，好用是好用，但是要付费  
![](//ww2.sinaimg.cn/large/a243ad6cjw1ewvd57mlykj20m908ewfg.jpg)
👆信息很详细了，注意包括了 cookie  
**这个相当恶心，我百度的姿势不对，还没有找到urllib 里面自己构造 cookie 怎么使用**
![](//ww1.sinaimg.cn/large/a243ad6cjw1ewvauio5twj20p70cudhi.jpg)
👆软件自带了构造的功能，把 `test` 改成 `TEST`  
![](//ww2.sinaimg.cn/large/a243ad6cjw1ewvaugoysmj208i0a074u.jpg)
👆效果如图
![](//ww3.sinaimg.cn/large/a243ad6cjw1ewvb0cekgdj20hb0nb40h.jpg)

手动最快就这个效果了  
就是一直改数据，一直点击 `execute`  
然后冲神把他当年刷锦城教育的 python 脚本共享给我了  
看代码
```
#coding=utf-8
import urllib2
import urllib
import hashlib

user_name = ''
get_token_url = '登陆获得令牌'
update_url = 'post 的目标'

user_name = raw_input('input username:')
user_psd = raw_input('input password:')
courseid = raw_input('input course id(多个course id用逗号分隔):'.decode('utf-8').encode('gbk')).split(',')

md5_psd = hashlib.md5(user_psd.encode('utf-8')).hexdigest()

cookies = 'cookie 构造'
values = '登陆信息构造'
data = '$$CDORequest$$' + urllib.urlencode({'' : values})
headers = {
           'Accept' : '*/*',
           'Accept-Language' : 'zh-cn',
           'Referer' : '根据登陆时抓包内容填',
           'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8',
           'Accept-Encoding' : 'gzip, deflate',
           'User-Agent' : 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)',
           'Host' : 'host 地址',
           'Content-Length' : str(len(data)),
           'Proxy-Connection' : 'Keep-Alive',
           'Pragma' : 'no-cache',
           'Cookie' : 'loginname=' + user_name}


req = urllib2.Request(get_token_url, data, headers)

#get token
try:
    response = urllib2.urlopen(req)
    req_head = response.info()
    luserid = req_head['Set-Cookie'][71:82]
    token = req_head['Set-Cookie'][117:245]
except:
    print('username, password error!')
    exit()


#update
for cid in courseid:
    print(cid + ':')
    data = 'lCourseId=' + cid + '&lUserId=' + luserid + '&strStartTime=0&lSchoolId=73&nCountTime=150&strToken=' + token
    headers = {'Accept': '*/*',
            'Accept-Language': 'zh-CN',
            'Referer': '根据 post 包填',
            'x-flash-version': '15,0,0,223',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': str(len(data)),
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)',
            'Proxy-Connection': 'Keep-Alive',
            'Host': 'host 地址',
            'Pragma': 'no-cache',
            'Cookie': 'loginname=' + user_name}
    #print(data)

    req = urllib2.Request(update_url, data, headers)
    try:
        response = urllib2.urlopen(req)
    except:
        print('error!')
        exit()

    print(response.read())

```
隐私内容已经屏蔽了  
里面包含了模拟登陆和发送 post 包两个部分  
然后是可以自己写 cookie 内容的  
根据刚才抓包内容改了试试看  
明儿来，现在太晚了`2015-10-10 00:42:07`
***
以上

