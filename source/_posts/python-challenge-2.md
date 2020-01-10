title: python challenge 11-19
comments: false
date: 2015-10-16 23:00:57
categories: 硬悟学蛇
---
我感觉我是做入迷了  
因为确实好玩啊。。。
学到的知识比看书多多了  
我这种就适合考前突击
<!--more-->
***
# [第十一关](//www.pythonchallenge.com/pc/return/evil.html) 图片处理
这一关还是考验图片处理的能力  
但是对我来说却是考验安装第三方库、正确使用` Stack Overflow` 的能力  
没有想到这一篇还要更新: [安装 Python 库文件](//gaoryrt.github.io/2015/10/16/install-python-package/)  
开始的时候`.jpg`文件还不能解析，换成了`.png`，结果一样不能用。。。  
重装了与`Image`相关的库，重新装了  
然后就简单了  
题目是奇数偶数，然后图片叫做` cave`，意思就是空了里面有东西  
下载下来放大看是这样的:  
![](//ww1.sinaimg.cn/large/a243ad6cjw1ex3eauvv3oj20lr0ca7c1.jpg)
想了一会儿还以为有另外一个图片拿给我放一起拼起来。。。  
放大看其实里面不全是黑色的，话说 mac 的数码测色计真是好用啊  
就是把有颜色的都去掉:
```
from PIL import Image
im = Image.open('cave.jpg')

print im.size
for i in range(640):
    for j in range(480):
        if (i+j)%2==1:
            im.putpixel((i,j),(0,0,0))
im.show()
```
![](//ww1.sinaimg.cn/large/a243ad6cjw1ex3easqgtcj20hy0awwg5.jpg)
看不清的话请调亮一点，算了还是我来:
![](//ww1.sinaimg.cn/large/a243ad6cjw1ex3eaodiqvj20hy0brtg6.jpg)
***
# [第十二关](//www.pythonchallenge.com/pc/return/evil.html) gfx 拆分
题目是`dealing evil`  
只有一个图，`evil1.jpg`:
![evil1](//ww2.sinaimg.cn/large/a243ad6cjw1ex4dcijs2dj20hs0dcgno.jpg)  
然后就什么提示都没有了  
想了半天想出来是应该有` evilx.jpg`的  
当我看到`evil0.jpg`是404的时候确实挺失望的  
幸好还有` evil2.jpg`。。。  
`not jpg - - .gfx`  
还有 `evil3.jpg`   
`no more evils...`  
还有` evil4.jip`虽然不是 `jpg`格式的，但是下载下来打开还是有信息  
`burt is evil!go back!`  
查了一下这个`.gfx`格式  however跟后面解题完全无关了  
**这里开始不是自己做的**  
第一幅图里面是有个人在发牌，发了五张  
正确的解题是下载` evil2.gfx`然后步进分成五个图片
![](//ww1.sinaimg.cn/large/a243ad6cjw1ex4dghq992j20k404ojrw.jpg)  
***
# [第十三关](//www.pythonchallenge.com/pc/return/disproportional.html) rpc 协议
是一个电话的图片  
![](//ww4.sinaimg.cn/large/a243ad6cjw1ex5r5ontkhj20hs0dcgm7.jpg)  
查看源文件，跟前面哪个连线一样的，点击某个区域，跳转到[这个连接](//www.pythonchallenge.com/pc/phonebook.php)   
**完全不会做**  
下面是找到的方法:  
> xmlrpc是使用http协议做为传输协议的rpc机制，使用xml文本的方式传输命令和数据blablabla…  
反正就是要用到python的xmlrpclib模块来连接这个php页面，然后查看其方法，其中有个名为phone方法就是答案。  
```
def disproportional():
    import xmlrpclib
    xml_rpc = xmlrpclib.ServerProxy("http://www.pythonchallenge.com/pc/phonebook.php")
    print xml_rpc.system.listMethods()
    print xml_rpc.system.methodHelp('phone')
    print xml_rpc.phone('Bert')
 >>> ['phone', 'system.listMethods', 'system.methodHelp', 'system.methodSignature', 'system.multicall', 'system.getCapabilities']
    Returns the phone of a person
    555-ITALY
```
  
`rpc`协议以后来补，~~however~~ ，答案就是 `italy`  
***
# [第十四关](//www.pythonchallenge.com/pc/return/italy.html) 编程
有个螺旋形的面包，源代码提示`walk around`,`<!-- remember: 100*100 = (100+99+99+98) + (...  -->`  
下面一张图，格式相当奇葩`10000*1`的一个`png`  
猜到了就是读图然后按照螺旋写成一个`100*100`的图  
```python
from PIL import Image
im = Image.open('wire.png')
mi = Image.open('wire0.png')
L = []
for n in range(10000):
    L.append(im.getpixel((n,0)))
def round(n):
    for i in range(100-2*n):
        mi.putpixel((n+i,n),L.pop())
    for j in range(99-2*n):
        mi.putpixel((99-n,j+1+n),L.pop())
    for i in range(99-2*n):
        mi.putpixel((98-i-n,99-n),L.pop())
    for j in range(98-2*n):
        mi.putpixel((n,98-j-n),L.pop())  

for i in range(50):
    round(50-i)
mi.show()
```
出来是一只小猫。。。  
![](//ww3.sinaimg.cn/large/a243ad6cjw1ex6gli5dslj208808874t.jpg)
我就进入`cat.html`，但是貌似这个不是第十五关，毕竟左上角没有`15`  
![](//ww4.sinaimg.cn/large/a243ad6cjw1ex6glgh7fcj20k70eyq5h.jpg)  
`cat.html`网页源码如下:  
  
```
<html>
<title>uzi</title>
  <link rel="stylesheet" type="text/css" href="../style.css">
<body>
<center>
<br>
<font color="gold" size="+1">
	and its name is <b>uzi</b>. you'll hear from him later.
<br><br><img src="uzi.jpg" width="640" height="480"/>
</body>
</html>
```
应该是另外一种旋转方法才对。。。  
红色的应该就是信息，只绕了一又四分之一圈。。。  
结果这样就出来了:  
```
from PIL import Image
im = Image.open('wire.png')
mi = Image.open('wire0.png')
L = []
for n in range(10000):
    L.append(im.getpixel((n,0)))
for i in range(100):
    for j in range(100):
        mi.putpixel((i,j),L.pop())
mi.show()
```
![](//ww1.sinaimg.cn/large/a243ad6cjw1ex6gw76pfsj205l05l0t2.jpg)  
是` bit`？  
**不！可！能！这！么！简！单**  
果然，猫的名字是` uzi`，正确的页面应该是 uzi 才对
***
# [第十五关](//www.pythonchallenge.com/pc/return/uzi.html) 编程
还是得看攻略。。。  
这上面这个是1xx6年，右下角说这一年的二月有29天，然后`今天`是一月26号，这一年的1月27号有事情要买花。  
就是查这个`<!-- he ain't the youngest, he is the second -->`  
```
k = 6
day = 26
for i in range (1006,1997):
    if i%4==0 and i%100!=0:
        day += 366
    else:
        day += 365
    if day%7 == k and i%4==0 and i%100!=0 and i%10==6:
        print(str(i)+' is a leap year and 26.Jan is Monday, and is one of a 1xx6')
```
把日历打开看了一下才把这个`k = 6`的值找到，用来校准周信息  
第二年轻的就是`1956 27.Jan`这个是`莫扎特`的生日
***
# [第十六关](//www.pythonchallenge.com/pc/return/mozart.html) list 操作
一张图`let me get this straight`:  
![](//ww1.sinaimg.cn/large/a243ad6cjw1ex6lrv67j9g20hs0dc0zc.gif)  
放大看每一行都有且只有一个`白紫紫紫紫紫白`，每一行都看做循环的，用这个标志对齐  
```
from PIL import Image
im = Image.open('mozart.png')
L = []
front = []
back = []
for n in range(480):
    for m in range(640):
        L.append(im.getpixel((m,n)))
    L.reverse()
    front = L[:L.index(195)]
    back = L[(L.index(195)-640):]
    L = back+front
    for m in range(640):
        im.putpixel((m,n),L.pop())
    L = []
im.show()
```
其中的`195`是我先输出第一行之后找的，本来想找`249`这个白色的，但是从第二行开始就没有`249`的白色了，其实可以` try、except`的，太麻烦了。。。 就找后面的紫色`195`了  
`reverse()`函数把` L`给反过来再`pop()`，输出就不是镜像的  
看图  
![](//ww1.sinaimg.cn/large/a243ad6cjw1ex6u9sowwwj20kw0hztnl.jpg)
***
# [第十七关](//www.pythonchallenge.com/pc/return/romance.html)这道题能自己做出来的都是大神
看到` cookie`现在都果断看不到趣多多了  
![](//ww4.sinaimg.cn/large/a243ad6cjw1ex6ue2hds4j20t3024q3u.jpg)
貌似要改 `cookie`但是不知道从哪里改呢。。。又要开始查答案了，没意思
**左下角是你做过的一道题，我反正记不得了** [木头人推磨](//www.pythonchallenge.com/pc/def/linkedlist.php)  
果然是这样的,就是在[busynothing](//www.pythonchallenge.com/pc/def/linkedlist.php?busynothing=12345)这个` php`页面上进行不断获取` cookie`的事情，然后还要一遍获取` cookie`:  
```
import urllib2
import urllib
import cookielib
nothing = "44827"
cj = cookielib.CookieJar()
j = "B"
for _ in range(500):
    url = 'http://www.pythonchallenge.com/pc/def/linkedlist.php?busynothing='+nothing
    global nothing
    opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
    urllib2.install_opener(opener)
    nothing = urllib2.urlopen(url).read().decode()[27:].strip()
    print nothing
    for index, cookie in enumerate(cj):
        cookie = str(cookie).replace('<Cookie info=','').replace(' for .pythonchallenge.com/>','').strip()
        j+= cookie
    print j
   
```
最后是这样的  
`BZh91AY%26SY%94%3A%E2I%00%00%21%19%80P%81%11%00%AFg%9E%A0+%00hE%3DM%B5%23%D0%D4%D1%E2%8D%06%A9%FA%26S%D4%D3%21%A1%EAi7h%9B%9A%2B%BF%60%22%C5WX%E1%ADL%80%E8V%3C%C6%A8%DBH%2632%18%A8x%01%08%21%8DS%0B%C8%AF%96KO%CA2%B0%F1%BD%1Du%A0%86%05%92s%B0%92%C4Bc%F1w%24S%85%09%09C%AE%24%90`  
是以前做过的一道`bz2`压缩包的解密  
但是他又告诉我这个`IOError: invalid data stream`  
**又要看答案了好伤心**  
>import urllib
>urllib.unquote(j)
然后里面有个加号，这里要把加号去掉:  
```
print bz2.BZ2Decompressor().decompress(urllib.unquote_plus(j))   
```

**你以为有答案了么？图样**  

`is it the 26th already? call his father and inform him that "the flowers are on their way". he'll understand.`

这里要告诉他的爸爸花在路上了。  
谁的爸爸？莫扎特的爸爸。怎么告诉他？打电话。  
百度莫扎特的爸爸:`Leopold`  
这里又要前面打电话的:
```
import xmlrpclib
xml_rpc = xmlrpclib.ServerProxy("http://www.pythonchallenge.com/pc/phonebook.php")
print xml_rpc.system.listMethods()
print xml_rpc.system.methodHelp('phone')
print xml_rpc.phone('Leopold')
```
他爸爸的电话就有了:`555-VIOLIN`  
**你以为答案就出来了么？图样**  
你要先进` violin.html`，然后根据提示来到`/stuff/violin.php`  
**你以为答案就出来了么？图样**  
他爸爸就在这里，你要告诉他花在路上了  
怎么告诉他?在 `cookie`里面,幸好我的 `chrome`还有` edit this cookie`插件  
在[这个页面](//www.pythonchallenge.com/pc/stuff/violin.php)新建一个` cookie`，名字叫` info`，值为`the+flowers+are+on+their+way`,然后刷新  
![](//ww1.sinaimg.cn/large/a243ad6cjw1ex6yq8ivokj209p08kdge.jpg)  
***
# [第十八关](//www.pythonchallenge.com/pc/return/balloons.html)  
`difference` is `brigtness`  
[brightness.html](//www.pythonchallenge.com/pc/return/brightness.html)
> \<!-- maybe consider deltas.gz -->  

download `deltas.pz` and unzip    

```
import difflib

both       = open('deltas').read().split('\n')
left,right,fileleft,fileright,filecommon = [],[],[],[],[]

for    i in both: 
    left.append(i[:53])
    right.append(i[56:])


print "differing..."
diff  = list(difflib.Differ().compare(left,right))


for line in diff:
    line += '\n'
    if line[0]==' ':
        filecommon.append(line[2:])
    if line[0]=='+':
        fileright.append(line[2:])
    if line[0]=='-':
        fileleft.append(line[2:])

for n, data in enumerate((filecommon, fileright, fileleft)):  
    temp = []  
   
    for line in data:  
        temp.extend([chr(int(o, 16)) for o in line.strip().split(" ") if o])  
   
    h = open("%s.png" % (n + 1), "wb")  
    h.writelines(temp)  
    h.close() 
```
![](//ww2.sinaimg.cn/large/a243ad6cjw1ex8qkb44y3j20ro0a3my0.jpg)  
***
# [19 (butter+fly)](//www.pythonchallenge.com/pc/hex/bin.html)
> Content-type: audio/x-wav; name="indian.wav"  
Content-transfer-encoding: base64  
  
download the messy code and store as txt,then `base64` decode as a `wav` file.
```
import base64  
text = open('indian.txt','r').read()  
indian = open('indian.wav','wb')  
wav = base64.b64decode(text)  
indian.write(wav)  
indian.close()  
```
somebody is yelling 'sorry', so jump to `sorry.html`  
>  "what are you apologizing for?"  
  
i can not continue myself, so i googled, sad.  
```
import wave  
wi = wave.open('indian.wav','rb')  
wo = wave.open('indian_out.wav','wb')  
wo.setparams(wi.getparams())  
for i in range(wi.getnframes()):  
    wo.writeframes(wi.readframes(1)[::-1])  
wi.close()  
wo.close()  
```
`you are an idiot,hah hah hah`  
***
以上









