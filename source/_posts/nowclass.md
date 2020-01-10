title: 简单的vue场景转换
comments: true
date: 2016-07-25 21:53:22
categories: 前端
---
从实习以来就在使用vue做web app的开发，经常会用到**场景的转换**。

这一篇我讲讲我现在使用的我认为比较简单的一个方法。

特别要指出，这里**场景的转换**指的是web app中（资源加载完成后），从引导页面进入主页面或从主页面转到其他页面这个过程。
***
## 实例
这里放一个例子，下面写的都是围绕着这个例子的转换来的。  
```
<div class="intro">
    <p>intro text</p>
    <button>continue</button>
</div>

<div class="main">
    <button>continue</button>
</div>

<div class="outro">
    <p>outro text</p>
</div>
```
首先是`intro`页，一个文本一个按钮，点击按钮转换至`main`页面。  
`main`页面一个按钮，点击按钮转换至`outro`页面。  
`outro`页面就只有一个文本。
## 一
刚开始的时候，我给每一个页面的css属性绑定了一个vue的变量，通过对这些变量的值的修改达到目。  
就像这样：  
```
<div class="{{introClass}}">
    <p>intro text</p>
    <button @click="introButtonClick">continue</button>
</div>
<div class="{{mainClass}}">
    <button @click="mainButtonClick">continue</button>
</div>
<div class="{{outroClass}}">
    <p>outro text</p>
</div>
```
然后在data中为其设置初始值，首先是`intro`页面，除了它，其他的都会被隐藏：  
```
new Vue({
	data: {
		"introClass": "intro",
		"mainClass": "hide",
		"outroClass": "hide",
		...
	}
	...
})
```
然后在转场的事件触发时，对这三个变量的值进行修改：  
```
	methods: {
		introButtonClick: function(){
			this.introClass = "hide"
			this.mainClass = "main"
			...
		},
		mainButtonClick: function(){
			this.mainClass = "hide"
			this.outroClass = "outro"
			...
		},
		...
	}
```
这个缺点就太明显：场景一多，就惨了。
***
## 二
现在用的是这种：  
```
<div class="{{nowClass('intro')}}">
    <p>intro text</p>
    <button @click="introButtonClick">continue</button>
</div>
<div class="{{nowClass('main')}}">
    <button @click="mainButtonClick">continue</button>
</div>
<div class="{{nowClass('outro')}}">
    <p>outro text</p>
</div>
```
vue里面就只用记录当前page是哪个就可以了：  
```
new Vue({
	data: {
		"currentPage": "intro",
		...
	}
	...
	methods: {
		nowClass: function(page){
			return (page = this.currentPage) ? page : (page + " hide")
		}
		introButtonClick: function(){
			this.currentPage = "main"
			...
		},
		mainButtonClick: function(){
			this.currentPage = "outro"
			...
		},
		...
	}
})
```
其实挺简单的。
***
想看的看，不想看的就别看。  
以上。
