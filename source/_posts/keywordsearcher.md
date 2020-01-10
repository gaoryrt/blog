title: 关键词搜索修正
comments: false
date: 2015-12-15 02:12:50
categories: 硬悟学蛇
---
由 python 2.7 编写  
作用是从常用自然疑问句中查询关键字  
从“珠穆朗玛峰有多高？”到["珠穆朗玛峰","高度"]  
<!--more-->
我才知道 utf-8 是三个三个存的中文。
# 常用语句与答案
1. 《Rather Be》的制作者是谁？ 
2. 这周五是几号？
3. 从成都到天津的航班号是多少？
4. 成都市的日本大使馆在哪里？
5. 苹果公司的股票价格？
6. 今天人民币比韩元的汇率是多少？   
  
下面是良好的答案  
  
1. ["Rather Be","制作者"]
2. ["这周五"]
3. ["成都","天津","航班号"]
4. ["成都市","日本大使馆"]
5. ["苹果公司","股票价格"]
6. ["今天","人民币","韩元","汇率"]  
  

# 分析一下问题
第一是分词。  
比如说 “成都市的日本大使馆在哪里？” 这一句，最好是分成“成都市 的 日本大使馆 在哪里？”，或者是其他的分词方式，至少不会是这样：“成 都市 的日本大 使馆在哪里？”  
第二是分词之后对关键词的选择。  
比如说分词完美，已经是这样了：“成都市 的 日本 大使馆 在哪里？”，在此之后，选择出来的关键词是["成都市","日本","大使馆"],而不是把我不想要的信息选择出来：["日本","在哪里"]。
# 分词
比如说这么一段：“甲乙丙丁戊戌变法”  

1. 为“甲乙”评分，然后为“乙丙”评分，然后为“丙丁”评分……
2. 为“甲乙丙”评分，然后是“乙丙丁”……
3. 然后是“甲乙丙丁”，然后“戊戌变法”。
4. 最后通过评分高低确定几个关键字。
其中关键步骤就是评分的规则，以及给出评分后去留的规则。  
以前貌似看到过这个相关的东西，现在找不到了，这两天有点空的时间可以找一找。  

*2015年12月15日02:41:57*
# 关键词选择
这个的话应该和上一段中评分和确定去留的规则类似。  
关键还是这两个：评分规则，选择规则。  
# 优化
既然提到了评分规则了，那么在优化过程中还可以加入遗传算法。  

1. 生成初始群体，相当于自然界中的种群。在这里就是不同的评分公式。
2. 计算适应度，相当于自然选择给的约束。在这里应该需要我人工干预吧，暂时没有想到更好的办法。
3. 进化。先选出适应度高的，作为父母公式。根据父母公式的参数确定下一代公式的参数。然后在子代公式中添加变异，变异的体现我暂时没有想出来，这一步很关键不能省略，甚至决定了进化过程中的适应度优化速度。
***
暂时到这里，先休息了  
*2015年12月15日02:54:44*
# 分词的实现
这个是《数学之美》这本书里面看到的，一句话里所有单字的排列组合的评分和最高者优先。  
尝试一下  
```
# -*- coding: utf-8 -*-
import urllib2


def pinfen(keyword1):
    url = "http://www.baidu.com/s?wd=" + keyword1

    request = urllib2.Request(url)
    response = urllib2.urlopen(request)
    rawhtml = response.read()

    headposition = rawhtml.index('相关结果约')
    tailposition = rawhtml.index(
        '''个</div></div></div><script type="text/javascript">''')
    result = rawhtml[headposition + 15:tailposition].split(',')
    result = int(''.join(result))

    return result


print pinfen("发展") + pinfen("中国家")
print pinfen("发展中") + pinfen("国家")
```
  
发展 中国家  170300000  
比  
发展中 国家  157900000  
得分高  

然后增加了一些，这个作为分词的另一种参考：  
```
# -*- coding: utf-8 -*-
import urllib2


def pinfen(keyword1):
    url = "http://www.baidu.com/s?wd=" + keyword1

    request = urllib2.Request(url)
    response = urllib2.urlopen(request)
    rawhtml = response.read()

    headposition = rawhtml.index('相关结果约')
    tailposition = rawhtml.index(
        '''个</div></div></div><script type="text/javascript">''')
    result = rawhtml[headposition + 15:tailposition].split(',')
    result = int(''.join(result))

    return result


def liangzifenci(keyword0):
    list0 = []
    for i in range(0, len(keyword0) - 3, 3):
        list0.append(keyword0[i] + keyword0[i + 1] + keyword0[i + 2] +
                     keyword0[i + 3] + keyword0[i + 4] + keyword0[i + 5])
    return list0


def liangduanfenci(keyword2):
    list2 = []
    for i in range(3, len(keyword2), 3):
        list2.append(keyword2[:i])
        list2.append(keyword2[i:])
    return list2


for i in liangduanfenci("贾斯丁比伯"):
    print pinfen(i), i


for i in liangzifenci("贾斯丁比伯"):
    print pinfen(i), i

```
结果如下：  
```
20500000 贾
47900 斯丁比伯
706000 贾斯
499 丁比伯
118000 贾斯丁
1250000 比伯
393000 贾斯丁比
100000000 伯

706000 贾斯
2370000 斯丁
74600 丁比
1250000 比伯
```
可以看到评分越少的，越容易存在分段，中间用于确定“是否”的关键性参数我不用自己来设定，这个交给 GA。
***
今天先到这里，明天再来。  
*2015年12月15日23:31:41*  
主要是发现，当使用两段分词方法的时候，一个字的评分结果一般都是最大值，所以把最前和最后的都去掉了，不作考虑。  
看看结果（例句“相关结构对”）：
```
62300000 相关
14800000 结构对
9330000 相关结
8700000 构对
-----------------------
62300000 相关
17200000 关结
52300000 结构
8700000 构对
```
这五个字我感觉最好是分成[["相关","结构"],"对"]  
可以从答案中看到，["相关","结构对"]的得分比["相关结","构对"]要高；然后“构对”之间需要分词。
***
#加入多线程
先看结果  
```
讽刺 : thread created
刺实 : thread created
实现 : thread created
讽刺 : 3770000
刺实 : 403000
实现 : 27200000
讽刺 | 实现
```
这个是输入“讽刺实现”的结果  
下面是源代码  
```
# -*- coding: utf-8 -*-
import urllib2
import thread
import time

word = "讽刺实现"
size = len(word) / 3 - 1
dic = {}

# 输入为需要评分的词，会在 dic 中储存{123:相关,124:关结,122:结果}，评分过程中会输出分数，size 用于等待进程结束


def pinfen(keyword1):
    url = "http://www.baidu.com/s?wd=" + keyword1
    request = urllib2.Request(url)
    response = urllib2.urlopen(request)
    rawhtml = response.read()
    response.close()
    headposition = rawhtml.index('相关结果约')
    tailposition = rawhtml.index(
        '''个</div></div></div><script type="text/javascript">''')
    result = rawhtml[headposition + 15:tailposition].split(',')
    result = int(''.join(result))
    dic[word.index(keyword1) / 3] = result
    print keyword1, ":", result
    global size
    size -= 1


def liangzifenci(keyword0):  # 两个字为一组进行分词
    list0 = []
    for i in range(0, len(keyword0) - 3, 3):
        list0.append(keyword0[i] + keyword0[i + 1] + keyword0[i + 2] +
                     keyword0[i + 3] + keyword0[i + 4] + keyword0[i + 5])
    return list0


def shuchu(dic):
    dic = {value: key for key, value in dic.items()}
    position = dic[sorted(dic.keys())[0]] * 3
    print word[0:position + 3], "|", word[position + 3:]


# 以下都是处理线程用的
for x in liangzifenci(word):
    try:
        thread.start_new_thread(pinfen, (x,))
        print x, ": thread created"
    except:
        print x, ": unable to start new thread "
while size != 0:
    time.sleep(1)
    pass

shuchu(dic)
```
突然发现不知道应该在哪里加入 GA 的东西了。。。略尴尬