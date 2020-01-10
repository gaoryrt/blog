title: JQuery实现简单日历组件
comments: true
date: 2016-03-23 02:19:09
categories: 前端
---
[demo点这里](http://gaoryrt.com/CV/calendar/index.html)
# 需要达到的效果
常见的日历组件  
从上到下是左右按键、年月、周标题、日期  
点击左右按键可以跳月份  
第一个版本就不谢其他东西了  
能看到今天几号，某一天是周几这样  
# 大概思路
先获得当前年月，这个月几天      
然后算这个月一号周几  
放好位置后，后面连着放好即可  
主要函数就是一个放日期
# 首先是html
`div.wrapper>title+img.prev+img.next>(ul.week.w$>li.date$*7)*7`
七个week，第一个是用来放周一到周日的标志的  
后面的六行刚好可以放分割最长的一周  
# css
需要注意的是，我用了`inline-block`来放置所有的日期项  
有个关于`inline-blick`的问题就是上下不一定会对齐  
那么这里就要把每一个项目都设置一个`max-height`而非只是`height`  

# js
页面加载时生成本月，`prev`的上一月，`next`的下一月  
都是围绕着一个函数`putMonth(year, month)`  
通过年月改变项目数字  
这个函数也有几个注意的点  
一是判断闰年：  
```
var isleap = false
if ((year % 4 === 0 && year % 100 != 0) || year % 400 == 0) {
        isleap = true
    }
```
二是通过闰年判断该月的天数：  
```
var monthNum = 31
if (month === 4 || month === 6 || month === 9 || month === 11) {
        monthNum = 30
    }

    if (month === 2) {
        if (isleap) {
            monthNum = 29
        } else {
            monthNum = 28
        }
    }
```
三是循环填充的开始点：  
```
do {
        do {
            putDate(dayNum, row, week01)
            dayNum++
            week01++
        } while (week01 < 8 && dayNum <= monthNum)
        row++
        week01 = 1
    } while (row <= 6 && dayNum <= monthNum)
```
这里用do-while而非for  
还有就是两个需要自己调一调的地方：
getMonth()获得的是从零开始的月份  
`var month = now.getMonth() + 1`
getDay()获得的是从零开始的日期  
`var week01 = new Date(year + '/' + month + '/' + '0').getDay() + 1`
另外两个按键就简单了  
***
以上