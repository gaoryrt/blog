---
title: python challenge 1-10
comments: false
date: 2015-10-14 23:47:06
categories: 扫盲教育
---
这几天学校极客大挑战，三道编程题  
然后发现这种才有意思嘛。。。  
又找了一个：[python challenge](//www.pythonchallenge.com)  
感觉这种挑战比看书好多了
<!--more-->
***
# [第〇关](//www.pythonchallenge.com/pc/def/0.html)简单计算
求2^38: `2**38` 即可  
***
# [第一关](//www.pythonchallenge.com/pc/def/274877906944.html)字符串操作
将字符串中得字母移2位  
不仅仅是改图上的三个字母，是26个全部改  
用的`ord()`&`chr()`把26个字符都加二，然后发现`y`和`z`加二就出去了，然后又加了几个`if`来限制  
黑哥说 `maketrans`就行了，看上去很方便，还没有研究。。。  
***
# [第二关](//www.pythonchallenge.com/pc/def/ocr.html)字符串操作
找原文件里出现的英文字符  
```python
a = 原文
for i in a:
    if ord(i)>95 and ord(i)<122:
        print(i,end='')
```
***
# [第三关](//www.pythonchallenge.com/pc/def/equality.html)正则表达式
hint 是这个   
`One small letter, surrounded by EXACTLY three big bodyguards on each of its sides.`  
想了半天没有理解他什么意思，特别是那个`its`因为没有`'apostrophe撇号`相当恼火  
其实是说文字里的每一个字母都被有且仅有的三个大写字母围起来了    
这个就是正则的查找:  
```python
r"[a-z][A-Z]{3}[a-z]{1}[A-Z]{3}[a-z]"
```
***
# [第四关](//www.pythonchallenge.com/pc/def/linkedlist.html) urllib
从网页中获取数字添加在`php`末尾然后继续访问  
就是` urllib`的操作:
```python
import urllib.request
nothing = "数字"
for _ in range(500):
    url = 'http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing='+nothing
    global nothing
    nothing = urllib.request.urlopen(url).read().decode()[23:].strip()
    print(nothing)
```
***
# [第五关](//www.pythonchallenge.com/pc/def/peak.html)pickle 、字典
叫你 pronunce 一幅山峰的图片  
![](//www.pythonchallenge.com/pc/def/peakhell.jpg)
`peak hall`->`pickle`  
这个` pickle`文件已经在原文件中给你了`banner.pickle`
使用` pickle`:  
```python
import pickle
with open("banner.pickle","rb") as f:
    dic = pickle.load(f)
```
这样` pickle`里面的文件就储存在 `dic` 这个字典里面了  
字典内容如下：
```
[(' ', 95)]
[(' ', 14), ('#', 5), (' ', 70), ('#', 5), (' ', 1)]
[(' ', 15), ('#', 4), (' ', 71), ('#', 4), (' ', 1)]
[(' ', 15), ('#', 4), (' ', 71), ('#', 4), (' ', 1)]
[(' ', 15), ('#', 4), (' ', 71), ('#', 4), (' ', 1)]
[(' ', 15), ('#', 4), (' ', 71), ('#', 4), (' ', 1)]
[(' ', 15), ('#', 4), (' ', 71), ('#', 4), (' ', 1)]
[(' ', 15), ('#', 4), (' ', 71), ('#', 4), (' ', 1)]
[(' ', 15), ('#', 4), (' ', 71), ('#', 4), (' ', 1)]
[(' ', 6), ('#', 3), (' ', 6), ('#', 4), (' ', 3), ('#', 3), (' ', 9), ('#', 3), (' ', 7), ('#', 5), (' ', 3), ('#', 3), (' ', 4), ('#', 5), (' ', 3), ('#', 3), (' ', 10), ('#', 3), (' ', 7), ('#', 4), (' ', 1)]
[(' ', 3), ('#', 3), (' ', 3), ('#', 2), (' ', 4), ('#', 4), (' ', 1), ('#', 7), (' ', 5), ('#', 2), (' ', 2), ('#', 3), (' ', 6), ('#', 4), (' ', 1), ('#', 7), (' ', 3), ('#', 4), (' ', 1), ('#', 7), (' ', 5), ('#', 3), (' ', 2), ('#', 3), (' ', 5), ('#', 4), (' ', 1)]
[(' ', 2), ('#', 3), (' ', 5), ('#', 3), (' ', 2), ('#', 5), (' ', 4), ('#', 4), (' ', 3), ('#', 3), (' ', 3), ('#', 4), (' ', 4), ('#', 5), (' ', 4), ('#', 4), (' ', 2), ('#', 5), (' ', 4), ('#', 4), (' ', 3), ('#', 3), (' ', 5), ('#', 3), (' ', 3), ('#', 4), (' ', 1)]
[(' ', 1), ('#', 3), (' ', 11), ('#', 4), (' ', 5), ('#', 4), (' ', 3), ('#', 3), (' ', 4), ('#', 3), (' ', 4), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 3), (' ', 6), ('#', 4), (' ', 2), ('#', 4), (' ', 1)]
[(' ', 1), ('#', 3), (' ', 11), ('#', 4), (' ', 5), ('#', 4), (' ', 10), ('#', 3), (' ', 4), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 3), (' ', 7), ('#', 3), (' ', 2), ('#', 4), (' ', 1)]
[('#', 4), (' ', 11), ('#', 4), (' ', 5), ('#', 4), (' ', 5), ('#', 2), (' ', 3), ('#', 3), (' ', 4), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 4), (' ', 5), ('#', 4), (' ', 1), ('#', 4), (' ', 7), ('#', 3), (' ', 2), ('#', 4), (' ', 1)]
[('#', 4), (' ', 11), ('#', 4), (' ', 5), ('#', 4), (' ', 3), ('#', 10), (' ', 4), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 4), (' ', 5), ('#', 4), (' ', 1), ('#', 14), (' ', 2), ('#', 4), (' ', 1)]
[('#', 4), (' ', 11), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 3), (' ', 4), ('#', 4), (' ', 4), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 4), (' ', 5), ('#', 4), (' ', 1), ('#', 4), (' ', 12), ('#', 4), (' ', 1)]
[('#', 4), (' ', 11), ('#', 4), (' ', 5), ('#', 4), (' ', 1), ('#', 4), (' ', 5), ('#', 3), (' ', 4), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 4), (' ', 5), ('#', 4), (' ', 1), ('#', 4), (' ', 12), ('#', 4), (' ', 1)]
[(' ', 1), ('#', 3), (' ', 11), ('#', 4), (' ', 5), ('#', 4), (' ', 1), ('#', 4), (' ', 5), ('#', 3), (' ', 4), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 3), (' ', 12), ('#', 4), (' ', 1)]
[(' ', 2), ('#', 3), (' ', 6), ('#', 2), (' ', 2), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 3), (' ', 4), ('#', 4), (' ', 4), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 4), (' ', 5), ('#', 4), (' ', 3), ('#', 3), (' ', 6), ('#', 2), (' ', 3), ('#', 4), (' ', 1)]
[(' ', 3), ('#', 3), (' ', 4), ('#', 2), (' ', 3), ('#', 4), (' ', 5), ('#', 4), (' ', 3), ('#', 11), (' ', 3), ('#', 4), (' ', 5), ('#', 4), (' ', 2), ('#', 4), (' ', 5), ('#', 4), (' ', 4), ('#', 3), (' ', 4), ('#', 2), (' ', 4), ('#', 4), (' ', 1)]
[(' ', 6), ('#', 3), (' ', 5), ('#', 6), (' ', 4), ('#', 5), (' ', 4), ('#', 2), (' ', 4), ('#', 4), (' ', 1), ('#', 6), (' ', 4), ('#', 11), (' ', 4), ('#', 5), (' ', 6), ('#', 3), (' ', 6), ('#', 6)]
[(' ', 95)]
```
想了半天发现每一个都是字符加数字的组合  
再想了半天发现每一行的数字加起来都一样  
猜到了就是这样的。。。  
![](//ww1.sinaimg.cn/large/a243ad6cjw1ex25vm2dmhj20lh0kyn27.jpg) 
***
# [第六关](//www.pythonchallenge.com/pc/def/channel.html)zipfile
进去那个` paypal`跟题没有关系  
源代码里面有个提示`zip`  就直接下载` channel.zip`  
解压出来跟第四关的规则差不多  
关键就是读文件:  
```python
nothing = '90052'
for i in range(5000):
    text = nothing+'.txt'
    nothing = open("%s"%text,"rb").read().decode()[15:].strip()
    print(nothing)
```
最后一个是`46145.txt`:  
`Collect the comments.`  
然后又想了半天，原来 `zipfile`里面有一个` zipinfo`就叫做`comments`  
怎么用呢？  
```
import datetime
import zipfile
def print_info(archive_name):
    zf = zipfile.ZipFile(archive_name)
    for info in zf.infolist():
        print info.filename
        print '\tComment:\t', info.comment
        print '\tModified:\t', datetime.datetime(*info.date_time)
        print '\tSystem:\t\t', info.create_system, '(0 = Windows, 3 = Unix)'
        print '\tZIP version:\t', info.create_version
        print '\tCompressed:\t', info.compress_size, 'bytes'
        print '\tUncompressed:\t', info.file_size, 'bytes'
        print

if __name__ == '__main__':
    print_info('channel.zip')
```
显示如下:  
```
README.txt
        Comment:
        Modified:       2007-12-16 10:08:52
        System:         3 (0 = Windows, 3 = Unix)
        ZIP version:    23
        Compressed:     63 bytes
        Uncompressed:   75 bytes
```
然后结合最开始的顺序读出来:  
![](//ww1.sinaimg.cn/large/a243ad6cjw1ex281m1f0sj20st06wwj4.jpg)
这一关略麻烦呢。。。
***
# [第七关](//www.pythonchallenge.com/pc/def/oxygen.html)图片操作
**从这一关开始后面都是用`python2`写的**
![](//ww1.sinaimg.cn/large/a243ad6cjw1ex286h3ncnj20hh02n0tj.jpg)   
应该是灰度处理中间的一行灰色  
然后读取出这个灰度值组成的数据  
不出意料应该是包含了信息的。
使用`Image`来处理图片: [加入第三方库文件](//gaoryrt.github.io/2015/10/16/install-python-package/)  
然后对这张图片进行切割，只留下灰色的部分:  
```
import Image
im = Image.open('oxygen.png').crop((0,45,608,47)) 
print im.size
```
用预览打开，发现每一个宽`7 pixel`，就开始读数据了:
```
for i in range(0,87):
        L.append(im.getpixel(((1+7*i),1))[0])
print L
```
![](//ww1.sinaimg.cn/large/a243ad6cjw1ex336js6a2j21h401xdht.jpg)
这个是` aksii`哟~  
```
for i in L:
    k+=chr(i)
print k
```
果然是这样的:  
![](//ww3.sinaimg.cn/large/a243ad6cjw1ex339xjakhj20jo01074m.jpg)
***
# [第八关](//www.pythonchallenge.com/pc/def/integrity.html)bz2
**这一关没办法不是自己做的** 
就是一个解压:  
```
import bz2
un='BZh91AY&SYA\xaf\x82\r\x00\x00\x01\x01\x80\x02\xc0\x02\x00 \x00!\x9ah3M\x07<]\xc9\x14\xe1BA\x06\xbe\x084'
pw= 'BZh91AY&SY\x94$|\x0e\x00\x00\x00\x81\x00\x03$ \x00!\x9ah3M\x13<]\xc9\x14\xe1BBP\x91\xf08'
un=bz2.decompress(un)
pw=bz2.decompress(pw)
print un,pw
```
***
# [第九关](//www.pythonchallenge.com/pc/return/good.html)un:`huge` pw:`file`
**这一关没有使用 `python`** 
源文件跟上一关的 `coords`一样的，就是连线  
于是我把上一关的` html`的值改成这一关的了:
```
<html>
<head>
  <title>working hard?</title>
  <link rel="stylesheet" type="text/css" href="../style.css">
</head>
<body>
    <br><br>
    <center>
    <img src="integrity.jpg" width="640" height="480" border="0" usemap="#notinsect"/>
    <map name="notinsect">
    <area shape="poly" 
        coords="146,399,163,403,170,393,169,391,166,386,170,381,170,371,170,355,169,346,167,335,170,329,170,320,170,310,171,301,173,290,178,289,182,287,188,286,190,286,192,291,194,296,195,305,194,307,191,312,190,316,190,321,192,331,193,338,196,341,197,346,199,352,198,360,197,366,197,373,196,380,197,383,196,387,192,389,191,392,190,396,189,400,194,401,201,402,208,403,213,402,216,401,219,397,219,393,216,390,215,385,215,379,213,373,213,365,212,360,210,353,210,347,212,338,213,329,214,319,215,311,215,306,216,296,218,290,221,283,225,282,233,284,238,287,243,290,250,291,255,294,261,293,265,291,271,291,273,289,278,287,279,285,281,280,284,278,284,276,287,277,289,283,291,286,294,291,296,295,299,300,301,304,304,320,305,327,306,332,307,341,306,349,303,354,301,364,301,371,297,375,292,384,291,386,302,393,324,391,333,387,328,375,329,367,329,353,330,341,331,328,336,319,338,310,341,304,341,285,341,278,343,269,344,262,346,259,346,251,349,259,349,264,349,273,349,280,349,288,349,295,349,298,354,293,356,286,354,279,352,268,352,257,351,249,350,234,351,211,352,197,354,185,353,171,351,154,348,147,342,137,339,132,330,122,327,120,314,116,304,117,293,118,284,118,281,122,275,128,265,129,257,131,244,133,239,134,228,136,221,137,214,138,209,135,201,132,192,130,184,131,175,129,170,131,159,134,157,134,160,130,170,125,176,114,176,102,173,103,172,108,171,111,163,115,156,116,149,117,142,116,136,115,129,115,124,115,120,115,115,117,113,120,109,122,102,122,100,121,95,121,89,115,87,110,82,109,84,118,89,123,93,129,100,130,108,132,110,133,110,136,107,138,105,140,95,138,86,141,79,149,77,155,81,162,90,165,97,167,99,171,109,171,107,161,332,155,348,156,353,153,366,149,379,147,394,146,399," 
        href="" />
    <area shape="poly" 
        coords="156,141,165,135,169,131,176,130,187,134,191,140,191,146,186,150,179,155,175,157,168,157,163,157,159,157,158,164,159,175,159,181,157,191,154,197,153,205,153,210,152,212,147,215,146,218,143,220,132,220,125,217,119,209,116,196,115,185,114,172,114,167,112,161,109,165,107,170,99,171,97,167,89,164,81,162,77,155,81,148,87,140,96,138,105,141,110,136,111,126,113,129,118,117,128,114,137,115,146,114,155,115,158,121,157,128,156,134,157,136,156,136" 
        href="" />
    </map>
    <br><br>
    <font color="#303030" size="+2">Where is the missing link?</font>
</body>
</html>
```
然后应该是个牛，要不就是羊。。。  
我输入一个`http://www.pythonchallenge.com/pc/return/cow.html`他还告诉我`hmm. it's a male.`  
***
# [第十关](//www.pythonchallenge.com/pc/return/bull.html)
1 11 21 1211 111221 ...  
求`len(a[30])`  
1:一个一  
11:两个一   
21:一个二一个一  
1211:一个一一个二两个一  
这个顺序来的  
直接写程序就行了:  
```
def next(arr):
    last = arr[0]
    count = 1
    s =''
    for i in arr[1:]:
        if last == i:
            count += 1
        else:
            s += str(count)+last
            last = i
            count = 1
    s += str(count)+last
    print len(s)
    return s

arr = "1"
for i in range(30):
    arr = next(arr)
```
我代码写的不好，但是正确了的。。。  
把上面的`print s`改成`print len(s)`就可以得出答案了  
***
以上
  