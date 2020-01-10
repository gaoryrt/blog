title: JS笔记
comments: true
date: 2016-04-21 18:06:39
categories: 前端
---
这几天主要是在看JS，小本本上记录了一些（私以为）具有代表性的要点，这里写一遍再加深一下印象。  
<!-- more -->
# 原型链 
code 1/2:  
```
var base = {
	name: 'base',
	getInfo: function() {
		return this.name;
	}
}

var ext1 = {
	id: 1,
	__proto__: base
}

var ext2 = {
	id: 2,
	__proto__: base
}
```
![](http://7xs4ih.com1.z0.glb.clouddn.com/JSnote_base.png)
code 2/2:
```
function Task(id) {
	this.id;
}

Task.prototype.status = "stopped";

Task.prototype.execute = function() {
	return this.id + this.status;
}

var task1 = Task(1)
var task2 = Task(2)
task1.status = "active";
```
![](http://7xs4ih.com1.z0.glb.clouddn.com/JSnote_task.png)
***
# 事件
html如下：  
```
<div id="baba">
	<div id="gege">
		<div id="wo">
		</div>
	</div>
</div>
```
js：  
```
wo.addEventListener("click", function(e){
	alert("wo");
}, false);
```
这里false是指注册冒泡事件，若为true就是捕获。  
![](http://7xs4ih.com1.z0.glb.clouddn.com/JSnote_TF.png)
先捕获后冒泡，先注册先执行。  
![](http://7xs4ih.com1.z0.glb.clouddn.com/JSnote_propagation.png)
`e.stopPropagation()`停止冒泡和捕获。  
![](http://7xs4ih.com1.z0.glb.clouddn.com/JSnote_stop.png)
`removeEventListener`取消注册需要三个参数均相同。  
***
# 闭包
```
function a() {      嵌套的func
	var i = 0;      内部变量
	function b() {  
		alert(++i); 内部func向外传递变量值
	}
	return b;       返回内部的func
}
var c = a();        实例化外部func
c();
```
变量以函数分界，注意不包括`for`  
没有用var的变量默认为全局变量  
# 顺序
css和image加载时不会终止页面加载，js会等加载完再继续。  
加载完之后js预编译，优先函数的定义，然后创建`var foo = undefined`，之后执行，变量才开始在原型链中找值，找不到再到作用域中找。  
```
f();
function f() {
	alert(0);
}
```
上面由于函数是由构造函数`function`定义的，所以会先预编译，待执行时`f()`已经有相应的组成了。  
```
f();
f = function() {
	alert(0);
}
```
这里f变量的值由匿名函数来，变量在原型链/作用域中找值要晚于顺序执行，所以这段代码运行时会报错，说f并未定义。
***
以上
