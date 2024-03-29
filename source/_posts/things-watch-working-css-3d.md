---
title: 「译」CSS 3D 注意事项
comments: true
date: 2016-10-01 22:39:28
categories: 扫盲教育
---
这一篇已经有人翻译过了：[CSS 3D 应该注意的事项](//www.w3cplus.com/css3/things-watch-working-css-3d.html)


原文链接：[Things to Watch Out for When Working with CSS 3D](https://css-tricks.com/things-watch-working-css-3d/) · 作者 [ANA TUDOR](https://css-tricks.com/author/thebabydino/)

***

我一直挺喜欢 3D 几何。在注意到 CSS 支持得越来越全面的同时，我也开始使用 CSS 3D 变换（transform）。但刚开始就有些东西难住了我：在创建多面体时，我自然地在 3D 中使用 transform 去创建 2D 图形并移动、旋转它们。我想我该记录下我遇见的奇特的部分，希望你能绕过这些障碍。

## 3D 渲染上下文

还记得那晚好奇心驱使我写了一个小小的演示，想看看浏览器如何处理平面的交叉。这个演示包括了两个平面元素：

``` HTML
<div class='plane'></div>
<div class='plane'></div>
```

它们大小相同，用绝对定位放在屏幕的中间，为了看到它们又加了个背景：

``` SCSS
$dim: 40vmin;

.plane {
  position: absolute;
  top: 50%; left: 50%;
  margin: -.5*$dim;
  width: $dim; height: $dim;
  background: #ee8c25;
}
```

这个场景就是整个`body`元素，让其覆盖整个视窗（viewport），然后给了一个`perspective（透视）`使得远一点的看起来小一点，近一点的显示的更大：

``` CSS
body {
  margin: 0;
  height: 100vh;
  perspective: 40em;
}
```

为了测试平面相交的效果，第二个平面元素有一个`rotateY()`变换（transform），和一个不同的背景：

``` CSS
.plane:last-child {
  transform: rotateY(60deg);
  background: #d14730;
}
```


结果是令人失望的。似乎没有浏览器可以正确的处理平面相交：

<p data-height="265" data-theme-id="light" data-slug-hash="ozzWWp" data-default-tab="css,result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/thebabydino/pen/ozzWWp/">test plane intersection (WRONG!)</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

但是我错了。这些代码就应该显示成这个样子。我本应该将这两个平面放在同一个[3D 渲染上下文](https://drafts.csswg.org/css-transforms/#3d-rendering-contexts)中。鉴于有人不熟悉 3D 渲染上下文，简单来说它和[堆叠上下文](https://philipwalton.com/articles/what-no-one-told-you-about-z-index/)差不多。在不同的堆叠上下文中我们不能通过`z-index`来对元素进行排序，同样的，在不同的 3D 渲染上下文中，3D 变换后的元素不能进行 3D 排序或交叉。

将元素放在同一个 3D 渲染上下文中的方法也很简单，即放在另一个元素内：


``` HTML
<div class='assembly'>
    <div class='plane'></div>
    <div class='plane'></div>   
</div>
```


然后把包裹元素用绝对定位放在场景中间，并为其设置`transform-style: preserve-3d`：

```
div { position: absolute; }

.assembly {
    top: 50%; left: 50%;
    transform-style: preserve-3d;
}
```

这样就解决了问题：

<p data-height="265" data-theme-id="light" data-slug-hash="ZppyYX" data-default-tab="css,result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/thebabydino/pen/ZppyYX/">test plane intersection (CORRECT)</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

由于浏览器的原因，你仍不能在 Firefox 中看到本应正常的平面相交效果。但是你应该能在 Webkit 和 Edge 浏览器中看到。

你有可能问了，为什么要还加一个包裹元素呢，在上一级元素（上面的例子中的`body`）里添加`transform-style: preserve-3d`不是更简单么？好吧，在上面的特例中你确实可以这么做（除了 Firefox，因为 Firefox 在处理 3D 顺序和交叉上有问题）：

<p data-height="265" data-theme-id="light" data-slug-hash="BLLkkK" data-default-tab="css,result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/thebabydino/pen/BLLkkK/">test plane intersection (working, BUT...)</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

但是在实际的工作环境中，场景不一定是`body`，我们也会为场景添加其他属性。这些其他属性则可能会干扰到展示效果。

## 破坏 3D （或造成扁平化）的情况

例子场景是页面中的另一个`div`，有其他元素环绕着它：

<p data-height="265" data-theme-id="light" data-slug-hash="NRRgrp" data-default-tab="html,result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/thebabydino/pen/NRRgrp/">two planes in smaller scene #0</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

我为第二个平面添加了一些变换使其更加明显，但在这里它超出了场景。这并不是我想看到的。我希望我既能阅读文字，也能操作控件。

### 1）overflow

我最先想到的就是在场景中使用`overflow: hidden`。然而在使用之后，它失去了漂亮的 3D 交叉效果：

<p data-height="265" data-theme-id="light" data-slug-hash="Zppyqj" data-default-tab="result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/thebabydino/pen/Zppyqj/">two planes in smaller scene #2</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

这是因为给任意元素一个非`visible`的`overflow`属性都会强行将这个元素的`transform-style`设置为`flat`，即使它们已经被设置为了`preserve-3d`。所以我要使用元素来包裹他们，虽然多一点代码，却能少一点头疼。

<p data-height="265" data-theme-id="light" data-slug-hash="KggqLo" data-default-tab="result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="https://codepen.io/thebabydino/pen/KggqLo/">two planes in smaller scene #3</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

这就是为什么即使场景没有进行 3D 变换，我也总是将场景放在一个包裹的元素当中。比如下面的例子：

<p data-height="265" data-theme-id="light" data-slug-hash="LRkGkR" data-default-tab="result" data-user="thebabydino" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/thebabydino/pen/LRkGkR/">blue hex helix candy (pure CSS 3D)</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

每一列旋转的六边形都被放在`.helix`元素当中：

``` HTML
<div class='helix'>
    <div class='col'>
        <!-- all the hexagons inside a column -->
    </div>
    <!-- the other columns -->
</div>
```

`.helix`设置的属性只有两个作用：
1. 保证整个部件被绝对定位于视窗中心 
2. 所有列都被放在同一个 3D 渲染上下文中 

``` CSS
div {
    position: absolute;
    transform-style: preserve-3d;
}

.helix { top: 50%; left: 50%; }
```

这是因为我为场景（例子中的`body`）设置了`overflow: hidden`，同时六边形的大小也不由视窗决定，所以我不知道他们会不会向外延伸（产生我不想要的滚动条）。

我承认我被这个坑了很多次。在这里使用`overflow: hidden`让溢出的显示不那么明显。

要是一个元素设置了`transform-style: preserve-3d`，该属性就会[告诉浏览器](https://davidwalsh.name/3d-transforms)不应该把它（这个设置了`transform-style: preserve-3d`的元素）的子元素拍扁。所以在相同元素上设置`overflow: hidden`不会让 3D 元素在场景内被拍扁，也能防止子元素超出父元素平面，这在直觉上看也是合理的。

但有时一个 3D 变换的子元素还是会变成父元素中的平面。看看下面这个双面卡片的例子：

``` HTML
<div class='card'>
    <div class='face'>front</div>
    <div class='face'>back</div>
</div>
```

这里将其绝对居中于场景（例子中的`body`）里，给卡片和它的面设置相同的外观，为外部卡片设置`transform-style: preserve-3d`，为两面都设置`backface-visibility: hidden`，再将后面沿着纵轴转半圈：

``` SCSS
$dim: 40vmin;

div {
    position: absolute;
    width: $dim; height: $dim;
}

.card {
    top: 50%; left: 50%;
    margin: -.5*$dim;
    transform-style: preserve-3d;
}

.face {
    backface-visibility: hidden;
    background: #ee8c25;

    &:last-child {
        transform: rotateY(.5turn);
        background: #d14730;
    }
}
```

下面是demo：

<p data-height="265" data-theme-id="light" data-slug-hash="BLLdZO" data-default-tab="css,result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/thebabydino/pen/BLLdZO/">card #0</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

这两面都在父元素的平面内，而后面沿着纵轴旋转了半圈。背面虽然方向和正面相反，但是仍在同一个平面中。现在看来都挺好的。

假如我不想让面展现为长方形。最简单的方法就是为面设置`border-radius: 50%`。但是[貌似完全没用](https://codepen.io/thebabydino/pen/ZppXbb/)。

所以在卡片上设置`overflow: hidden`：

<p data-height="265" data-theme-id="light" data-slug-hash="kkkGPW" data-default-tab="css,result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/thebabydino/pen/kkkGPW/">card #2</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

但是这样破坏了我们的 3D 卡片。既然不能这样做，我们就在面上设置：

``` CSS
.face { border-radius: 50%; }
```

<p data-height="265" data-theme-id="light" data-slug-hash="YGpPXX" data-default-tab="css,result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/thebabydino/pen/YGpPXX/">card #3</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

在这个例子里，解决问题的方法比造成问题的还要简单。但是如果有另外一个形状，比如正八边形？一个正八边形通常用两个元素（或一个元素及其伪元素）来实现：

``` HTML
<div class='octagon'>
    <div class='inner'></div>
</div>
```

给它们设置相同的外观，将`.inner`元素旋转`45deg`，为了能看得见，给他设置一个背景，然后为`.octagon`设置`overflow: hidden`：

``` SCSS
$dim: 65vmin;

div { width: $dim; height: $dim; }

.octagon { overflow: hidden; }

.inner {
    transform: rotate(45deg);
    background: #ee8c25;
}
```

结果在下面：

<p data-height="265" data-theme-id="light" data-slug-hash="KgNwWZ" data-default-tab="css,result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/thebabydino/pen/KgNwWZ/">how to: basic regular octagon (pure CSS)</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

如果我们添点文字的话……

``` HTML
<div class='octagon'>
  <div class='inner'>octagon</div>
</div>
```

[就显示不出来了。](https://codepen.io/thebabydino/pen/KgNwqB/)

这是因为文字在边缘之外，所以我们将文字变大，用`text-align: center`让他水平居中，再将它的行高设置为`.octagon`（或`.inner`）元素的高度以垂直居中：

``` SCSS
.inner {
    font: 10vmin/ #{$dim} sans-serif;
    text-align: center;
}
```

现在看上去就好多了，但是文字随着我们对`.inner`元素的旋转而旋转了：

<p data-height="265" data-theme-id="light" data-slug-hash="ozYgob" data-default-tab="css,result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/thebabydino/pen/ozYgob/">octagon with text #1</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

我们为`.octagon`元素也设置一个旋转（相同度数，相反方向，即负）来解决这个问题：

``` CSS
.octagon { transform: rotate(-45deg); }
```

这样就是有文字的八边形了！

<p data-height="265" data-theme-id="light" data-slug-hash="VKmYQj" data-default-tab="css,result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/thebabydino/pen/VKmYQj/">octagon with text - final!</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

现在来研究一下八边形的卡片。我们不能为卡片本身（卡片是`.octagon`元素，`.inner`元素就是面）设置`overflow: hidden`，这样会破坏 3D 卡片的两个不同面：

<p data-height="265" data-theme-id="light" data-slug-hash="qaqdpX" data-default-tab="css,result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/thebabydino/pen/qaqdpX/">card #4</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

所以要让`.octagon`作为面，然后用伪元素实现`.inner`元素：

``` SCSS
.face {
    overflow: hidden;
    transform: rotate(45deg);
    backface-visibility: hidden;

    &:before {
        left: 0;
        transform: rotate(-45deg);
        background: #ee8c25;
        content: 'front';
    }

    &:last-child {
        transform: rotateY(.5turn) rotate(45deg);

        &:before {
            background: #d14730;
            content: 'back'
        }
    }
}
```

于是就有了下面的结果：

<p data-height="265" data-theme-id="light" data-slug-hash="ALpvgp" data-default-tab="css,result" data-user="thebabydino" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/thebabydino/pen/ALpvgp/">card #5</a> by Ana Tudor (<a href="http://codepen.io/thebabydino">@thebabydino</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

### 2）clip-path

另一个会造成相同问题的属性是`clip-path`

# 未完待续，话说有人已经翻译过了我的动力不强劲啊~~~~~~
