title: 滚动fixed
comments: true
date: 2016-05-03 20:21:51
categories: 前端
---
这里指的是「由滚动触发，使元素变为fixed」的效果，我指的是[ifanr](//www.ifanr.com)的导航栏（c-global-navbar）和边栏（o-wrapper__asides）效果。  
当时阿里的笔试也有这个题，我笔试时遇见了blink问题，这个以后有时间再说，今天先做一个[类似的demo](//gaoryrt.com/CV/ifanr/)。  
***
## 先看一个类似的效果
就是本博客的主页，滚动时为`index-title`添加`animation`标签的这个js：  
```
function revealOnScroll() {
  var scrolled = $(window).scrollTop();
  $(".excerpt, .index-title, .index-meta, p").each(function() {
    var current = $(this),
      height = $(window).outerHeight(),
      offsetTop = current.offset().top;
    if (scrolled + height + 50 > offsetTop) {
      current.addClass("animation");
    }
  });
}
$(window).on("scroll", revealOnScroll);
$(window).load(revealOnScroll);
```
这里用到了三个高度值：  
1. `scrolled = $(window).scrollTop()` 是网页顶部滚出可视部分的高度。
2. `height = $(window).outerHeight()` 是可视部分总高度。
3. `offsetTop = current.offset().top` 是该元素到网页顶部的高度
  
通过这三个值算是否进入页面，为进入的元素添加标签，用css添加动画效果。  
***
## 滚动固定导航栏fixed nav
类似的，这里需要知道网页顶部滚出可视部分的高度，若这个高度超出了上方元素的总高度，就可以变为fixed了。  
**但是，fixed之后原位置就没东西了，下方的东西会突然往上收。**  
要是导航栏不高还好不怎么看得出来，高一点就扯了。。。  
填充的办法还是很多的，我用了比较笨的一种，把下方元素的`margin-top`变为导航栏高度。  
```
  var scrolled = $(window).scrollTop();
  $(".two").each(function() {
    var current = $(this);
    (scrolled > 60) ? current.addClass("stack"):current.removeClass("stack");
    $(this).hasClass("stack") ? $(".three").addClass("margin"):$(".three").removeClass("margin");
  });
  $(window).on("scroll", stackOnScroll);
```
这里用到了两个三元运算，我用的少，只知道这样写，要是有更简单的我会在[demo](//gaoryrt.com/CV/ifanr/)中更新。  
## 滚动固定 fixed sidebar 
类似，判断`网页顶部滚出可视部分的高度`加上`可视部分总高度`与`该元素底部里网页顶部的距离`，就可以容易的做出相应效果。  
```
  $(".right").each(function() {
    var current = $(this);
    (scrolled > 2273-$(window).height()) ? current.addClass("stop"):current.removeClass("stop");
  });
}
$(window).on("scroll", stackOnScroll);
```
***
## 接下来的问题
这里先挖个坑，等我看看书再来。本来写了一个我认为可以的通用版本，但是不行。怎样做到各个元素的高度都改变之后还可以使用呢？  
还有一个问题，大家可以看看[ifanr主页](//www.ifanr.com)，右边`sidebar`在滚到最后的时候，会跟footer重合在一起，这个是个问题，怎样做到落到footer上方又重新static或relative呢？
以上

  
