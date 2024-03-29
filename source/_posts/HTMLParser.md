---
title: HTMLRarser 的使用
comments: false
date: 2015-11-30 17:13:36
categories: 扫盲教育
---
记录一下如何使用 HTMLParser   
这一个跑在 python2.7.10 上，跟以前的那一篇不一样  
这个我都看得懂，应该很简单了
<!--more-->
***
# 需要处理的信息
```html
<div class="titlt">
	<a href="/search/singles/SORRY">SORRY</a>
</div>
```
就是把 official ukcharts榜单的关键信息解析出来保存好。
***
# 使用这个 Parser
```python
# -*- coding: utf-8 -*-
import urllib2
import HTMLParser


url = "http://www.officialcharts.com/charts/singles-chart/"
headers = {"User-Agent": "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1"}


request = urllib2.Request(url)
response = urllib2.urlopen(request)
rawhtml = response.read()


class LinksParser(HTMLParser.HTMLParser):

    def __init__(self):
        HTMLParser.HTMLParser.__init__(self)
        self.recording = 0
        self.data = []

    def handle_starttag(self, tag, attributes):
        if tag != 'div':
            return
        if self.recording:
            self.recording += 1
            return
        for name, value in attributes:
            if name == 'class' and value == 'title':
                break
        else:
            return
        self.recording = 1

    def handle_endtag(self, tag):
        if tag == 'div' and self.recording:
            self.recording -= 1

    def handle_data(self, data):
        if self.recording:
            # self.data.append(data)
            if ord(data[0]) != 13:
                self.data.append(data)


linksparser = LinksParser()
linksparser.feed(rawhtml)

for i in linksparser.data:
    if ord(i[0]) == 13:
        pass
    else:
        print i

```
使用结果自己尝试，有一个问题就是字符带有`'`的话就惨了，会被分开储存。
我暂时没有想到好的解决办法，就暂时挖个这个坑。
***
以上
