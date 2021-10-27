---
title: 在 CSSbattle 中学到的 CSS 技巧
comments: true
date: 2020-01-11 11:00:09
categories: 前端
keywords: cssbattle, css battle, css, 前端, 技巧
---
## CSSbattle 是什么
[CSSBattle](https://cssbattle.dev/) 是一个 online judge 站，从 2019 年 4 月开始，每个月都会新增一期针对于某主题的、数量不定的前端 CSS 题目供网友 battle。比如第9期，是两道主题为「margin」的题：

![](1.jpg)

题目要求在线编辑 HTML 和 CSS，实现和目标图片一样的效果，你的代码输出会实时展示出来。就像这样，我的显示和目标的宽度还有点不一样：

![](2.gif)

该站评判的标准有二：一是显示是否 pixel to pixel 一摸一样，二是代码量尽量少。相似度 99% 比 100% 的得分要少很多，所以要在精妙的策略里精简代码。每个人的分数会积累起来，和本期以及本站所有人进行排名，也就是说你可以看到自己是全球第几。

## 技巧
只针对做题有帮助的技巧，可以去看[这篇文章](https://www.sitepoint.com/code-challenge-2-4-tips-for-higher-scores-in-cssbattle-dev/)和[这篇文章](https://www.sarthakbatra.com/blog/getting-started-with-css-battle/)。这里选几个不熟悉的记录一下。
### HTML attr 不加引号
```html
<body><style>body{margin:10px 20px -30px}</style>
```

可以写成

```html
<body style='margin:10px 20px -30px'>
```

还可以写成

```html
<body style=margin:10px+20px-30px>
```
### [长度单位](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
```css
a{margin:96px .9448px}
```

可以写作

```css
a{margin:1in 1q}
```
### 颜色前面的空格
```css
a{box-shadow:0+0+0+2in+#b5e0ba;
border:dashed+53q+#fdc57b}
```

可以写作

```css
a{box-shadow:0+0+0+2in#b5e0ba;
border:dashed+53q#fdc57b}
```
### 百分号后面的空格
```css
a{border-radius:50% 50% 0 50%}
```

可以写作

```css
a{border-radius:50%50%0 50%}
```
### 简写 background
```html
<body style=background:#f0f0f0;margin:0>
```

可以写作

```html
<body bgcolor=f0f0f0 style=margin:0>
```

如果不要求100%相似度，可以写成

```html
<body bgcolor=f0f0f style=margin:0>
```
### 简写透明
简写 hex 颜色值的第 4 位，非简写 hex 颜色值的第 7、8 位其实是 rgba 的 a 通道：
```css
*{color:rgba(0,0,0,0)}
```

可以写作

```css
*{color:#0000}
```
### [CSS 变量](https://developer.mozilla.org/en-US/docs/Web/CSS/var)
除了在外部定义，还可以设置默认值，代替某些长的 property key 比如 `border-top-left-color`、`border-radius`
```css
*{border-radius:40px}
k{border-radius:20px}
```

可以写作

```css
*{border-radius:var(--,40px)}
k{--:20px}
```
减少了三个字符
### [clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path) 是某些策略的关键
这个就是 border 再裁剪：

![](3.jpg)

顺便安利这个 clip-path 生成器以及该站作者的其他作品：https://bennettfeely.com/clippy/


## 更多
由于我开始做的时候已经不可以使用 svg 作答了，所以某些题不可能再做到以前的高分了，所以我 fork 了一份答案并进行了修改，记录了我的非 svg 答案，[放在 GitHub 上](https://github.com/gaoryrt/cssbattle-solutions)，希望能帮到其他人，也希望得到他人帮助。

在 CSSBattle 的 [spectrum 讨论](https://spectrum.chat/css-battle/)里看到有人说，battle 得分是基于代码字符多少的，这样鼓励了我们去写一些奇技淫巧，去写一些难以阅读的代码。甚至有人为了使用某些特性，使用 1% 的浏览器。
> ...we can't use these codes in our projects, right? then what is the need of this? fun only!!! ...I think explorer something that is helpful, you're drawing the skillset to wrong direction, in my opinion it is useless.

这个留到下一次写，大概叫《技术与艺术的模糊边界》。


