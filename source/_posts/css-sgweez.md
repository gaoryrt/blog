title: 压缩css的一个想法
comments: true
date: 2016-06-10 19:12:19
categories: Discovery
---
本篇写于这个压缩css自动化工具完成之前，暂时记录一下想法，不保证完成，想看的看，不想看的就别看。

***

## css的原理

css的声明是由`选择器`和`声明语句`一同构成的，下面写了两个声明的语句：

```
body {
	font-weight: 300;
	box-sizing: border-box
}

.sec2 .wrapper .pt1 .title {
	font-weight: 300;
	height: 56px;
	font-size: 36px;
}
```

css可以将相同的`声明语句`提出来写在一起，上下这两段的功能相同： 

```
body, .sec2 .wrapper .pt1 .title {
	font-weight: 300;
}

body {
	box-sizing: border-box
}

.sec2 .wrapper .pt1 .title {
	height: 56px;
	font-size: 36px;
}
```

***
## 压缩的基本原理

从上面能知道css提出相同`声明语句`后的功能相同，以此在特定的条件下可以减少css的总大小。  

但是在什么时候可以减少呢?考虑到选择器的个数，非共同语句的个数，以及个别一个选择器对应一个语句的情况，还是交给程序，先统统缩写，减少了就确定写入，没减少就不写。

另，配合js可以做到替换html和css中的所有class选择器，以做到最少化。

然而这一过程是不可逆的。显然只有在发布版本上适用这一功能。

***

## 流程

1. 将css文件变为`一个声明`对应`数个选择器`的字典
2. 按声明语句排序，手动改相似的语句，这样可以有效进一步减少css总大小
3. 遍历字典中每一条，判断简写是否有效，并写入
4. 在css和html中改动所有class选择器

***
以上
