---
title: Kernel Panic Button
comments: true
date: 2016-05-01 12:45:57
categories: CMD:CV
---
**这一篇主要讲的是跨域。**  
前提：[今天恐慌吗？](//gaoryrt.com/2016/04-30-KernelPanicButton/)  
在那篇文章的最后提到了，由于跨域问题我并没有在线上完成`the kernel panic button`的功能。  
然而现在可以了，下面写一写过程。**想看的看，不想看就别看**。  
***
## 跨域
跨域是浏览器为了防止XSS的结果，我的网络攻防没有过，没有权威科普[什么是XSS](https://en.wikipedia.org/wiki/Cross-site_scripting)，就请看官[自己SOF](//stackoverflow.com/search?q=xss)。  
*协议、域名、端口三者必须相同，否则就属于跨域。*  

## 解决跨域问题
来自于[hawx1993](https://github.com/hawx1993)的[Front-end-Interview-questions](https://github.com/hawx1993/Front-end-Interview-questions)。  
>JSONP：

原理是：动态插入`script`标签，通过`script`标签引入一个`js`文件，这个js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的`json`数据作为参数传入。



由于同源策略的限制，`XmlHttpRequest`只允许请求当前源（域名、协议、端口）的资源，为了实现跨域请求，可以通过`script`标签实现跨域请求，然后在服务端输出JSON数据并执行回调函数，从而解决了跨域的数据请求。



优点是兼容性好，简单易用，支持浏览器与服务器双向通信。缺点是只支持GET请求。

`JSONP`：`json+padding`（内填充），顾名思义，就是把JSON填充到一个盒子里

```js
<script>
    function createJs(sUrl){

        var oScript = document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.src = sUrl;
        document.getElementsByTagName('head')[0].appendChild(oScript);
    }

    createJs('jsonp.js');

    box({
       'name': 'test'
    });

    function box(json){
        alert(json.name);
    }
</script>
```


>CORS

服务器端对于`CORS`的支持，主要就是通过设置`Access-Control-Allow-Origin`来进行的。如果浏览器检测到相应的设置，就可以允许`Ajax`进行跨域的访问。



>通过修改document.domain来跨子域

将子域和主域的`document.domain`设为同一个主域.前提条件：这两个域名必须属于同一个基础域名!而且所用的协议，端口都要一致，否则无法利用`document.domain`进行跨域



主域相同的使用`document.domain`

>使用window.name来进行跨域



`window`对象有个`name`属性，该属性有个特征：即在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个`window.name`的，每个页面对`window.name`都有读写的权限，`window.name`是持久存在一个窗口载入过的所有页面中的




>使用HTML5中新引进的`window.postMessage`方法来跨域传送数据



还有flash、在服务器上设置代理页面等跨域方式。个人认为`window.name`的方法既不复杂，也能兼容到几乎所有浏览器，这真是极好的一种跨域方法。

## 获取html？
主要有五个问题：  
1. 我需要获取html原文，不是json
2. 他人站点不是我想改就改的
3. 我是浏览器用js，不是node
4. 我不识数
  

所有上面提到的所有解决方法均不可用，在[SOF上找到这么一篇](//stackoverflow.com/questions/15005500/loading-cross-domain-html-page-with-ajax)，科普了很多个proxy跨域的解决方案，我也不怕个人信息泄露，就大胆使用了`whateverorigin.org`来做proxy为我提供中间服务。  
相当于他有个node可以获得html文件，然后转发给我，速度还行。
  
***
以上

