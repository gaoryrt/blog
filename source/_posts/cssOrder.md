---
title: CssOrder
comments: true
date: 2016-04-23 03:29:34
categories: Geek Talks
---
阅读了[CSS的十八般技巧](//www.w3cn.org/article/translate/2005/104.html)和[推荐大家使用的CSS书写规范、顺序](//www.shejidaren.com/css-written-specifications.html)两篇文章之后，对css 压缩和美化有了另一番认识。  
`2016-04-27 更新`：发现CSSComb已经实现并且很优雅。[csscomb](//csscomb.com/)
***
# 美化/ Beautify/ EasytoRead
## 书写顺序
这个并没有统一的标准，以便于阅读理解为首要目的排序。  
显示属性  
- display
- float
- position
  
自身属性  
- width
- height
- margin
- outline
- border
- padding
- background
  
文本属性
- color 
- font
- vertical-align
- white-space
- content

## CSS顺序
css中节点排序，暂时没有想到一个好办法。大概思路就是按照Dom节点的顺序排序，但是js如何获得css选择器一样的节点集呢？  
问题暂时放这里。  
***
# 压缩/ Uglify/ Compress
## CSS缩写
- background: background-image ~-repeat ~-position
- font: font-style | font-variant | font-weight | font-size | line-height | font-family
- 去掉最后一个分号
- 去掉小数点前的 0
- 去掉 0 之后的单位
- rgb/rgba 颜色值简写为16进制值
- 在确定能减少总大小的前提下，用合并条目
- （不确定）去掉选择器前的 ul，div 等无效名
- （不确定）其他简写方式，例如 border-top-style: none -> border-top: 0
***
在写出自己的自动化工具之前还是用用其他工具，然后书写时也注意一些吧。  
以上
