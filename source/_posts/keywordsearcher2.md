---
title: 关键词搜索修正之二
comments: false
date: 2016-01-14 20:18:08
categories: Geek Talks
---
以前写的东西就是想到哪里做哪里  
没有从头开始仔细规划好  
到后面连自己写的东西都忘了该怎么接手了  
真是麻烦，决定重新开始  
***
以前的那一篇做成了短语分词了，现在是这个样子的：  
```
word = "信息工程"
信息 : thread created
息工 : thread created
工程 : thread created
息工 : 752000
信息 : 53800000
工程 : 80400000
信息 | 工程
```  
功能就是把短语分成两个单词  
因为现在的评分机制是根据得分最低的两字来划分的  
所以只能做到两个单词组成的短语的两段式分词  
感觉好鸡肋  
***
目标是把一句话分成几个单词的组合  
并且把不关键的单词给屏蔽掉  
“关键词搜索修正之二”就变成了  
“关键词 搜索 修正 二”  
在这里我做了哪些事情呢  
1. 分辨出哪几个字该为一组  
2. 屏蔽掉不重要的字  
我在分辨的过程中是怎样思考的呢？  
我会先看几个字，在这几个字中确定属于上一个单词的和不属于上一个单词的部分  
一句话中会从前到后遍历，遍历的过程不是单字，而是一个小的短语  
分辨出属于一个单词的，将它放到 list 里面  
这时候遍历的短语就可以继续往后移动了  
但是这还是默认句子语法正确的方式  
如果句子没有完整，最后就一个不相关的字  
还要继续加以识别，这个『不相关』的字是不是不相关  
先做句子完整的吧  
在分组完成之后所有单词都会放到 list 里面  
然后我在 list 里面会发现几个完全对我识别没有帮助的词语  
比如 『的』、『是』、还是上面例子中的『之』  
把这些单字或者非单字的词汇删除之后得到的就是我想要的答案  
***
由于我在上面的过程当中有很多东西都是靠经验判断的  
并且我也想使用GA 试试看  
所以要把例如『几个字』『不相关』『没有帮助』的判断机制交给 GA  
我会用不同的变量代替判断的过程，然后将不同变量的组合分配到程序当中  
然后另外用一个程序来运行着所有组合的评分操作  
所有的结果简单明了的存储到文本文件中  
每一次所有组合都跑完了之后我会打开这个文本文件，选择我心仪的组合，让它留下来繁衍  
然后重新编写不同变量的组合，再执行一遍所有组合的评分  
就这样实现 GA 的操作  
***
评分又是怎样实现的呢？  
因为没有合适的字典  
我现在只想到一个，也就是搜索引擎的结果量  
或许搜索量也可以作为评分的关键变量之一  
***
可以用 argv0 这样的方式来把同一个程序和变量组合组合起来  
也可以用一个程序来把同一个程序复制修改为另一个变量组合的程序  
当然选择前者  

