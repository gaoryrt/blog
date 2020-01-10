title: 几个纯CSS的按钮轮子
comments: true
date: 2016-05-11 17:24:42
categories: 前端
---
本篇是从 [codrops 的一篇文章](//tympanus.net/codrops/2015/02/26/inspiration-button-styles-effects/)获得的灵感，文章使用css伪元素实现了很多按钮效果，看的我心动，动手自己也写一写。  
效果可以[看这里](/CV/the-Kernel-Panic-Button/)。  
**想看的看，不想看就别看。**
***
## Antiman 配合一个伪元素
指针悬浮时黑色边框从无到有、在周围慢慢缩小到达按钮指定边框位置，伴有按钮的背景颜色改变。  
Ujarak，Pipaluk 效果与这个类似，只是`::after`的原始效果不同。  
```
#antiman {
    display: inline-block;
    background-color: #eee;
    height: 64px;
    width: 144px;
    border-radius: 12px;
    border: 0;
    font-size: 1em;
    -webkit-transition: background-color 0.3s, color 0.3s;
    transition: background-color 0.3s, color 0.3s;
}
#antiman:hover {
    background-color: #fff;
    color: #333;
}
#antiman::before {
    content: '';
    position: absolute;
    margin: -21px -28px;
    height: 60px;
    width: 140px;
    border-radius: 12px;
    -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
    transition: transform 0.3s, opacity 0.3s;
    opacity: 0;
    border: 2px solid #333;
    -webkit-transform: scale3d(1.2, 1.35, 1);
    transform: scale3d(1.2, 1.35, 1);
}
#antiman:hover::before {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
}
#antiman:focus {
    outline: 0;
}
```
主要是靠伪元素，这里要注意`#antiman {display: inline-block}`和`#antiman {position: absolute}`之间的关系，不要搞到其他地方去了。  
***
## Winona 配合内部span
[连接](/CV/the-Kernel-Panic-Button/)里的`winona`按钮效果。  
Rayen 的效果与这个类似，方向不同，加入了`overflow: hidden`。Rayen 的镂空效果请继续往下看 Wayra 按钮的实现。  
这个按钮的文字用`span`包裹了，html结构如下：
```
<button id="winona">
	<span>winona</span>
</button>
```
```
#winona {
    display: inline-block;
    background-color: transparent;
    height: 64px;
    width: 144px;
    border-radius: 32px;
    border: 3px solid #000;
    font-size: 1.2em;
    font-weight: 600;
    color: #000;
    -webkit-transition: border-color .3s;
    -o-transition: border-color .3s;
    transition: border-color .3s;
}
#winona:hover {
    border-color: #3f51b5;
}
#winona::after {
    content: 'winona';
    position: absolute;
    margin-left: -32px;
    color: #3f51b5;
    opacity: 0;
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-transition: transform .3s, opacity .3s;
    -o-transition: transform .3s, opacity .3s;
    transition: transform .3s, opacity .3s;
}
#winona:hover::after {
    opacity: 1;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
}
#winona > span {
    display: block;
    -webkit-transition: transform .3s, opacity .3s;
    -o-transition: transform .3s, opacity .3s;
    transition: transform .3s, opacity .3s;
}
#winona:hover > span {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
}
```
***
## Wayra 镂空效果
这个东西搞了半天，关键是`button`需要`overflow: hidden;`来遮挡关键字，**前提是自身也要`position: relative`**，然后把位元素通过设置`z-index`的方式放在按钮下方。达到一个镂空的效果，很是好看。
```
#wayra {
    position: relative;
    display: inline-block;
    overflow: hidden;
    background: transparent;
    height: 50px;
    width: 245px;
    border: 3px solid #3f51b5;
    color: #3f51b5;
    font-size: 1.2em;
    z-index: 1;
    font-weight: 600;
    -webkit-transition: border-color .3s, color .3s;
    -o-transition: border-color .3s, color .3s;
    transition: border-color .3s, color .3s;
}
#wayra:hover {
    border-color: #37474F;
    color: #fff;
}
#wayra::before {
    margin: -14px 0 0 -100px;
    content: '';
    position: absolute;
    height: 50px;
    width: 400px;
    z-index: -1;
    background-color: #3f51b5;
    -webkit-transform-origin: 50px 245px;
    transform-origin: 50px 245px;
    transform: rotate3d(0, 0, 1, -45deg) translate3d(0, -8em, 0);
    -webkit-transform: rotate3d(0, 0, 1, -45deg) translate3d(0, -8em, 0);
    -webkit-transition: transform .3s, opacity .3s, background-color .3s;
    -o-transition: transform .3s, opacity .3s, background-color .3s;
    transition: transform .3s, opacity .3s, background-color .3s;
}
#wayra:hover::before {
    opacity: 1;
    z-index: -1;
    background-color: #37474F;
    transform: rotate3d(0, 0, 0, 0deg) translate3d(0, 0, 0);
    -webkit-transform: rotate3d(0, 0, 0, 0deg) translate3d(0, 0, 0);
}
```
***
## Tamaya 配合两个伪元素
效果请看[这里](/CV/the-Kernel-Panic-Button/)的同名按钮。  
感觉这个就是前几个效果的综合，有镂空也有`span`的效果。很好奇为什么设置的是伪元素的`hover`，到我光标悬浮的时候，明明已经不算是在伪元素之上了，应该回来才对啊。。。  
html:
```
<button id="tamaya">
	<span>tamaya</span>
</button>
```
```
#tamaya {
    position: relative;
    overflow: hidden;
    height: 60px;
    width: 140px;
    background-color: transparent;
    border: 3px solid #37474F;
    font-size: 1.2em;
    z-index: 1;
}
#tamaya::before, #tamaya::after {
    display: block;
    position: absolute;
    overflow: hidden;
    content: 'tamaya';
    background-color: #7986cb;
    color: #fff;
    width: 140px;
    z-index: -1;
    -webkit-transition: transform .3s;
    -o-transition: transform .3s;
    transition: transform .3s;
}
#tamaya::before {
    margin: -19px -9px;
    padding-top: 1em;
    height: 13px;
}
#tamaya::after {
    height: 30px;
    line-height: 0;
    margin: -11px -9px;
}
#tamaya span {
    display: block;
    z-index: -2;
    opacity: 0;
    -webkit-transform: scale3d(.8, .8, .8);
    transform: scale3d(.8, .8, .8);
    -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
    transition: transform 0.3s, opacity 0.3s;
}
#tamaya:hover::before {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
}
#tamaya:hover::after {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
}
#tamaya:hover span {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
}
```
***
其他几个原理类似，就没有写了。  
以上
