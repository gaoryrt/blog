title: flex css3
comments: true
date: 2016-04-10 19:50:24
categories: 前端
---

这一篇是从css-trics抄到本人小本本上面的，现在又从小本本上腾到博客上来。  
刚刚找原文，发现[阮一峰](//www.ruanyifeng.com/blog/2015/07/flex-grammar.html)也搬运过[这一篇文章](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background)。  

***

# .container

flex的容器  

```
{	display: flex;
	flex-direction: row | row-re | column | column-re;
	flex-wrap: nowrap | wrap | wrap-reverse;
	flex-flow: <flex-direction> || <flex-wrap>；
}
```

## `<flex-direction>`

row 行
row-re 逆序行
column 列
column-re 逆序列

## `<flex-wrap>`

nowrap 禁止自动换行 
wrap 自动换行
wrap-reverse 自动换行，但是第一行会在下方

## `<flex-flow>`

为上面两个属性的复合/速记属性。  
规则：`{flex-flow: <flex-direction> || <flex-wrap>；}`
例：`.container{flex-flow:row nowrap;}`  

## **水平**`<justify-content>`

flex-start 聚拢靠左
flex-end 聚拢靠右
center 聚拢居中
space-between （行内）内容间距相同
sapce-around （行内）内容左右边距相同

## **纵向**`<align-items>`

flex-start 向上对齐
flex-end 向下对齐
center 居中对齐
stretch 上下展开最大化
baseline 文字基线对齐

## `<align-content>`

flex-start 聚拢靠上
flex-end 聚拢靠下
center 聚拢居中
stretch 展开最大化
space-between （块内）内容间距相同
space-around （块内）内容左右边距相同

***

# .item

flex的内容  

```
{	order: <integer>;
	flex-grow: <number>;
	flex-shrink: <number>;
	flex-basis: <length> || auto;
	flex: none || [ <flex-grow> <flex-shrink> || <flex-basis> ];
}
```

## `<order>`

整数型，flex的内容会由order由小到大排列。  
例：  

```
.itemZ{ order: -1;}
.item0{ order: 0;}
.item1{ order: 1;} 
.item2{ order: 2;}
```

这样就是 `Z-0-1-2` 的熟悉排列。

## `<flex-grow>`

数字，内容根据该数字的大小为比例放大。  

## `<flex-shrink>`

数字，内容根据该数字的大小为比例缩小。  

## `<flex-basis>`

长度或`auto`，内容按该长度伸缩剩余空间。  
可以看[这一篇文章](https://css-tricks.com/almanac/properties/f/flex-basis/)详细了解`<flex-fasis>`属性。  

## `<flex>`

为上面三个属性`<flex-grow>`、`<flex-shrink>`、`<flex-basis>`的复合/速记属性。  
规则： `{flex: none || [ <flex-grow> <flex-shrink> || <flex-basis> ];}`
例：`.item{flex:1 1 auto;}`    

## **纵向**`<align-self>`

auto 与容器相同
flex-start 向上对齐
flex-end 向下对齐
center 居中对齐
stretch 上下展开最大化
baseline 文字基线对齐

***

# 源文件在这里

![css3flex](//7xs4ih.com1.z0.glb.clouddn.com/css3flex.jpg)

***

按照自己的理解进行的整理，如有错误还请提醒。  
以上。

