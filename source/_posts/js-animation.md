---
title: 两种常用的 js 动画
comments: true
date: 2020-02-12 15:59:56
categories: Geek Talks
---
CSS3 动画已经很好了，感觉不够用的话再接着看吧。
写了两种 `requestAnimationFrame` 的应用：FLIP 动画、跟随动画。
并没有写 `webAnimation`。

<!-- more -->
# CSS3 动画的不足
- 缓动函数太少
- 单次动画时间线是单向不可逆的
- 不能应付复杂动画
- 不是 js

# 基础：requestAnimationFrame
看文档：[MDN: requestAnimationFrame](//developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)。

简单来说就是浏览器提供动画帧回调钩子，开发者能在每一帧中改变 DOM 样式，连续的帧形成动画。
在 CSS3 动画不够用的时候，常会使用 `requestAnimationFrame` 帧动画来完成。
浏览器会在重绘之前调用帧动画回调，和 `setTimeout`/`setInterval` 采用开发者设置的时长不同，`requestAnimationFrame` 连续回调的时机由浏览器（性能）决定。对于大多数基于时间的帧动画回调来说，`requestAnimationFrame` 就不需要考虑单线程阻塞带来的问题，浏览器尽力调用回调，开发者只用在乎当前时间的渲染样式。

比如说一个渐出动画需要准确地在1秒里完成，如果使用 `setTimeout`/`setInterval`，这样写是有问题的：
```js
const el = $('.fadeout')
// 点击时开始动画
el.onclick = () => {
    let opacity = 1
    let animInterval
    const callBackFn = () => {
        if (opacity < 0) clearInterval(animInterval)
        el.style.opacity = opacity
        opacity -= 1 / 60 // 每次回调都透明六十分之一
    }
    animInterval = setInterval(callBackFn, 16.67) // 假定每秒60帧，帧间距 1000 / 60 ≈ 16.67
}
```
问题是 `setInterval` [并不是准确的时间](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout#%E5%AE%9E%E9%99%85%E5%BB%B6%E6%97%B6%E6%AF%94%E8%AE%BE%E5%AE%9A%E5%80%BC%E6%9B%B4%E4%B9%85%E7%9A%84%E5%8E%9F%E5%9B%A0%EF%BC%9A%E6%9C%80%E5%B0%8F%E5%BB%B6%E8%BF%9F%E6%97%B6%E9%97%B4)，如果浏览器卡，每次回调大于 16.67 秒，整个动画就会被拉长。
这里我们可以在 `callBackFn` 里去查询当前时间，通过时间匹配确定的不透明度：
```js
const el = $('.fadeout')
el.onclick = () => {
    const startTime = +new Date()
    let animInterval
    const callBackFn = () => {
        const now = new Date() - startTime
        const opacity = 1 - now / 1000
        if (opacity < 0) clearInterval(animInterval)
        el.style.opacity = opacity
    }
    animInterval = setInterval(callBackFn, 16.67)
}
```
这里已经是一个基于时间的帧动画了，我们下面改成 `requestAnimationFrame`，还可以节省帧动画内计算时长的开销。

# 0：基于时间的帧动画

CSS3 [支持的缓动函数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)太少了，就算有三阶贝塞尔曲线也太少了。
比如说以 [`swingFromTo`](//github.com/danro/easing-js/blob/4f5e7edbde7f7200a1baf08e357377896c0d207e/easing.js#L142-L146) 为缓动函数的动画：
```js
const el = $('.swingFromTo')
el.onclick = () => {
    let startTime
    const frameFn = timestamp => {
        if (!startTime) startTime = timestamp
        const timespend = timestamp - startTime
        const progress = swingFromTo(timespend / 1000) // 已知总时间为 1000ms
        el.style.top = progress * 200 + 'px' // 已知总高度为 200px
        if (progress < 1) requestAnimationFrame(frameFn)
    }
    requestAnimationFrame(frameFn)
}
```
当我们不使用 `timespend`, 而是使用外部传入（比如说滚动高度）作为 `progress` 的时候，我们就得到了一个可以随时暂停、甚至逆向播放的动画。
这个也就是下面 FLIP 动画里 P 的原理了。

# 1：FLIP 动画
FLIP 是指 First, Last, Invert, Play。设定开始样式、结束样式、倒转，然后 Play。
看文章：[FLIP Your Animations](//aerotwist.com/blog/flip-your-animations/)。
贴一下上面链接里的例子：

```js
// 获取开始位置 style
var first = el.getBoundingClientRect();
// 获取结束位置 style
el.classList.add('totes-at-the-end');
var last = el.getBoundingClientRect();

// 倒转
var invert = first.top - last.top;

// 从开始到结束
var player = el.animate([
  { transform: `translateY(${invert}px)` },
  { transform: 'translateY(0)' }
], {
  duration: 300,
  easing: 'cubic-bezier(0,0,0.32,1)',
  direction: 'normal'
});

// 结束回调
player.addEventListener('finish',
    tidyUpAnimations);
```
通常是开始位置/结束需要 js 立即获取，CSS3 不能简单实现时使用。

# 2：跟随动画
假如动画结束时间是未知的，像是[用户光标移动](https://github.com/gaoryrt/cursor-dot)，滚动页面等。

![](smoothcursorfollowing.gif)

同样是帧动画，在上面这个元素跟随光标的例子中，我们不用时间来计算位置，而是：

1. 当光标移动，更新 alt 值
2. 在帧动画里计算光标 alt 和元素 cur 的位置差 d
3. 设置元素位置到 d / 5 处并更新 cur

```js
let inited = false
const el = $('.cursor')
const cur = {x: 0, y: 0}
const alt = {x: 0, y: 0}
const frameFn = () => {
    const dX = alt.x - cur.x
    const dY = alt.y - cur.y
    cur.x += dX / 5
    cur.y += dY / 5
    el.style.transform = `translate(${cur.x}px, ${cur.y}px)`
    requestAnimationFrame(frameFn)
}

document.addEventListener('mousemove', e => {
    alt.x = e.clientX
    alt.y = e.clientY
    if (!inited) {
      cur.x = alt.x
      cur.y = alt.y
      inited = true
      frameFn()
    }
  })
```

马丁加德纳的[《啊哈，灵机一动》](https://book.douban.com/subject/2249354/)里讲到过四龟问题，在正方形的四个角上各有一只乌龟，四只乌龟都朝着顺时针的下一只乌龟前进。乌龟在移动的同时，会影响下一只乌龟行进的方向。把乌龟行进的路线画出来时会发现是曲线。上面代码里的 `cur += (alt - cur) / 5` 就有着类似的作用——当前位置不会立刻移动到参照位置（并不是 `cur = alt`），而是往参照位置移动一小段距离。

差不多就这样，有问题的话烦请留言。
