---
title: 前端动画之替换
comments: true
date: 2020-02-13 13:20:10
categories: 前端
---
这个技巧是在 egoist 的 [zoom-image](https://github.com/egoist/zoom-image) 看的，这个库来自于 [zoom.js](https://github.com/fat/zoom.js)，实现了 medium 文章图片的展开/收起效果。

这个效果用[上一篇文章讲到的 FLIP](http://gaoryrt.com/2020/02-12-js-animation/#1%EF%BC%9AFLIP-%E5%8A%A8%E7%94%BB) 来实现还是蛮简单的。开始动画时的大小、位置用 js 获取；结束时的大小是图片原始大小，位置在屏幕中央。

用 FLIP 的话还是蛮简单的：
```js
const first = img.getBoundingClientRect()
img.classList.add('expanded')
const last = img.getBoundingClientRect()
const invert = {
    scale: first.width / img.width
}
img.style.transformOrigin = 'top left'

const anim = img.animate([
    {
        transform: `scale(${invert.scale})`
    },
    {
        transform: 'scale(1)'
    }
], {
    duration: 1000,
    direction: 'normal'
})
```

但是用 FLIP 的问题是图片在展开时，原有的文章不会改变。图片应该是在点击的瞬间变成了 `fixed` 或者 `absolute`，而图片原位置空白仍然被保留。

这里就要替换了。

需要在点击瞬间把原位置替换成另外一个空白元素占位：
```js
this.wrap = document.createElement('div')
this.img.parentNode.insertBefore(this.wrap, this.img)
```

同时把图片变成 `fixed` 或者 `absolute`，放到 wrap 里面：

```js
this.img.classList.add('zoom-img')
this.wrap.appendChild(this.img)
```

然后根据现有大小和原图大小计算需要缩放的比例，设置图片 `transform`，通过 `transition` 开始动画。

差不多就这样，有问题的话烦请留言。