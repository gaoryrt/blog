---
title: Fontend Test
date: 2016-04-02 09:48:59
categories: CMD:CV
---
随便找了一份前端的测试题来做  
想看原版的可以[点这里](http://www.tuicool.com/articles/YbQB3q)  
***
# No.1
这里用到了css3中的`display: box`和`box-flex`  
题目里面html结构已经规定了，对于元素的选择只能使用`first-child`,`nth-child()`了  
``` css
.box {
            background-color: darkcyan;
            display: box;
            display: -moz-box;
            display: -webkit-box;
            height: 50px;
            line-height: 30px;
            text-indent: 10px;
            width: 100%;
        }

.item {
            -webkit-box-flex: 1;
            -moz-box-flex: 1;
            -ms-box-flex: 1;
            box-flex: 1;
            margin: 10px;
        }

.item:first-child {
            -webkit-box-flex: 0;
            -moz-box-flex: 0;
            -ms-box-flex: 0;
            box-flex: 0;
            width: 200px;
        }

.item:nth-child(2) {
            margin: 10px 0;
        }
```
注意`box-flex: 1`的情况下，所有盒子的缩放比例都是一样的  
所以后面还要把第一个盒子的该属性改回到0  
***
# No.2
实现水平和垂直方向的居中  
参考这[一篇文章](https://www.smashingmagazine.com/2013/08/absolute-horizontal-vertical-centering-css/)以及后续一共四篇，都是关于居中的。  
## 绝对居中
用于父元素为`position: relative`，子元素为`position: absolute`：  
``` css
.boxA {
            position: relative;
            width: 500px;
            height: 500px;
            background-color: green;
        }

.boxB {
            position: absolute;
            max-width: 300px;
            max-height: 300px;
            background-color: blue;
            margin: auto;
            top: 0; left: 0; bottom: 0; right: 0;
        }
```
## 利用transform达到负边距
**感觉这个最常用**  
设置`left: 50%;top: 50%`之后  
再`margin`一个负值，以达到居中的目的  
这里由于**子元素是可变**的，所以可以利用transform  
可变大小的元素也能居中：  
```
.boxA {
            position: relative;
            width: 500px;
            height: 500px;
            background-color: green;
        }

.boxB {
            position: absolute;
            max-width: 300px;
            max-height: 300px;
            background-color: blue;
            margin: auto;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%,-50%);
            -ms-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
        }
```
## 假如不是 absolute
这里用到了`inline-block`和`vertical-align`来居中  
伪元素`:after`相当于给这个`inline-block`一个高度  
这个算是**css hack**的一部分了
``` css
.boxA {
            position: relative;
            width: 500px;
            height: 500px;
            background-color: green;
            
            text-align: center;
        }

.boxA:after, .boxB {
            display: inline-block;
            vertical-align: middle;
        }

.boxA:after {
            content: '';
            height: 100%;
        }

.boxB {
            /*position: absolute;*/
            max-width: 300px;
            max-height: 300px;
            background-color: blue;
        }
```
***
#  No.3
## html
要求语义化，结构良好  
``` html
<div class="shareContentPublisher">
    <form method="post" action="">
        <div class="titleArea">
            <div class="contentTypeChooser">
                <input type="radio" id="shareRadio" class="radio" checked="checked" />
                <label class="label" for="shareRadio">分享</label>
                <input type="radio" id="meetingRadio" class="radio" />
                <label class="label" for="meetingRadio">开会</label>
            </div>
            <div class="contentSum"><span>0</span>/1500</div>
        </div>
        <div class="inputArea">
            <textarea id="shareContentArea" placeholder="请输入你的分享, 1500字以内"></textarea>
        </div>
        <div class="funcArea">
            <input type="submit" value="发布" class="submit button">
        </div>
    </form>
</div>
```
至于怎么取消`radio`的标签，[点这里](//www.zhangxinxu.com/study/201201/css-radio-tab-switch.html)。  
三角形的框，我想最好还是用背景图最好，`checked {background-image}` 这样。
## js
这个真不会，不忙查属性了  
先把别人的答案放这里。  
```
jQuery(document).ready(function (a) {
    a("#message").bind("focus keyup input paste", function () {
        this.value.length > 1500 ? (this.value = a(this).attr("value").text(a(this).attr("value").length))
    })
})
```
***
# No.4
直接执行一遍 按时间输出 0， 2， 3  
> 定时器会异步的，不会阻塞，所以会先执行下一个赋值命令  
  

按时间顺序是这样的：  
1. alert(0)  
2. 第一个开始计时  
3. a = 2  
4. 第二个开始计时  
5. 第一个时间到了  
6. alert(a)  
7. a = 3  
8. 第二个时间到了  
9. alert(a)  
10. a = 4  
***
# No.5
这个也是查的，感觉js什么都不会呢。。。  
``` javascript
! function($) {
    /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
     * ======================================================= */
    $(function() {
        $.support.transition = (function() {
            var transitionEnd = (function() {
                var el = document.createElement('bootstrap'),
                    transEndEventNames = {
                        'WebkitTransition': 'webkitTransitionEnd',
                        'MozTransition': 'transitionend',
                        'OTransition': 'oTransitionEnd otransitionend',
                        'transition': 'transitionend'
                    },
                    name;
                for (name in transEndEventNames) {
                    if (el.style[name] !== undefined) {
                        return transEndEventNames[name];
                    }
                }
            }());
            return transitionEnd && {
                end: transitionEnd
            };
        })();
    });
}(window.jQuery);
```
检查`box-shadow`同理，也是生成一个元素时，同时生成一个`transition`属性，然后检查这个属性是否是`undefined`。从而达到检查浏览器是否支持的目的。  
***
# No.6
当时阿里电话面就问了这个问题，我当时还什么都不懂。  
这一题算是最简单了的吧？
``` javascript
var $textareaPlaceholderText = $('#textarea').attr('placeholder');
$('#textarea').focus(function() {
    /* Act on the event */
    $(this).attr('placeholder','');
});
$('#textarea').blur(function() {
    $(this).attr('placeholder',$textareaPlaceholderText);
});
```
原版的javascript居然想了半天才写出来：  
``` javascript
<textarea id="textarea" placeholder="123123123" onfocus="onf()" onblur="onb()"></textarea>
</body>
<script>
var ta = document.getElementById('textarea'),
te = ta.getAttribute('placeholder');
function onf(){
    ta.setAttribute('placeholder','');
}
function onb(){
    ta.setAttribute('placeholder',te);
}
</script>
```
***
# No.7
> alert(Function instanceof Object); // true
> alert(Object instanceof Function); // ture
  
show you the codes:  
``` javascript
alert(typeof(1)); //number
alert(typeof("abc")); //string
alert(typeof(true)); //boolean
alert(typeof(2009 - 2 - 4)); //number，equals 2004 
alert(typeof("2009-2-4")); //string
alert(typeof(m)); //undefined
/*--------d is a Date--------*/
var d = new Date();
alert(typeof(d)); //object
/*--------Person is a function--------*/
function Person() {}
alert(typeof(Person)); //function
/*--------a is an array--------*/
a = new Array([]);
alert(typeof(a)); //object
/*--------x instanceof y--------*/
alert(a instanceof Array);
var h = new Person();
var o = {};
alert(Person instanceof Function); //true
alert(h instanceof Object); //true
alert(o instanceof Object); //true
alert(typeof(h)); //object
```
注意，构造时的大写`Object`和`Function`都是`函数`类型。  
**但是**，实例化的函数都是`object`类型，实例化之前是`undefined`。  
***
# No.8
首先看答案：  
```
var m1 = main();
foo: undefined
this.foo: 1

var m1 = new main();
foo: undefined
this.foo: undefined
```
不知道怎么解释呢。。。
**私以为**第一个值是`undefined`的原因是`main`内重新申明了相同名的变量，从而覆盖了外部的变量，所以是`undefined`。  
第二个值在指向全局变量，所以第一个值是`1`，但是第二个是`new`的，不再是全局的，所以也是没有定义`undefined`。
***
# No.9
还是css简单。。。  
shut up and give you the code:  
```
<style type="text/css" media="screen">
.header, .sidebar, .content {
    height: 50px;
    margin: 1px 0;
}
.header {
    width: 100%;
    background-color: red;
    display: block;
}
.sidebar {
    width: 200px;
    background-color: green;
    display: inline-block;
}
.content {
    width: calc(100% - 204px);
    background-color: blue;
    display: inline-block;
}
@media screen and (max-width:600px) {
    .sidebar, .content, .header {
        width: 100%;
        display: inline-block;
    }
}
</style>
<body>
    <div class="header">
        <h1>header</h1>
    </div>
    <div class="sidebar">
        <h1>sidebar</h1>
    </div>
    <div class="content">
        <h1>content</h1>
    </div>
</body>
```
只有一个问题，Safari里面貌似`inline-block`自带了有`margin: 1px;`，然后上面就要减去204。  
然而在Chrome里面就变成了206，Firefox又是205。  
这里规定了html格式的，不然就可以用flex。  
父元素设置`display: flex; flex-flow: row;`，子元素设置就可以flex/space-between/flex-grow解决了。  
可能这道题的考点是`@media screen and (max-width: 600px)`？  
***
# No.10
本来还说先遍历网页上的所有链接放数组里，然后每一个点击的时候都`indexOf`找一下。  
看了标答我就震惊了，居然js自带了这个数组了：  
```
window.onload = function() {
	var l = document.links.length;
	for (var i = 0; i < l; i++) {
		document.links[i].onclick = function(x) {
			return function () {
				alert(x + 1);
			};
		} (i);
	}
};
```
这里注意一下最里面**用了一个闭包传x的值**，for循环里面经常出这样的错误，你以为会每一次都会不一样，naive，直接输出，结果都一样。  
还有就是不要忘了function定义之后加`(参数)`相当于执行。  
***
未完待续  
