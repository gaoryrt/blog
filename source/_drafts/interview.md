title: 前端面试
comments: true
date: 2020-04-11 11:04:22
categories: 前端
---

记录常见的前端面试题和答案要点，以飨来人。

最近更新时间为：2020年 4月13日。

<!-- more -->

# SEO？

<pre>
通过了解搜索引擎的运作规则来调整网站，提高网站搜索排名的方式。
├── 标签
│    ├── title
│    ├── meta[name=description]
│    ├── meta[name=keywords]
│    ├── h1
│    ├── img[alt]
│    └── a[title]
├── 白帽
│    ├── 语义化
│    └── 高质量内容
├── 黑帽
│    ├── 区分爬虫展示页面
│    ├── 自动生成关键词页面
│    └── 付费
└── PWA 的 SEO：SSR、Helmet
</pre>

# http 缓存以及对应头？

<pre>
强缓存
├── 由浏览器/代理服务器决定：不发请求，直接 200
├── js / media: memory cache
├── css: disk cache
├── cache-control: http1.1
│    ├── [s-maxage]: 代理缓存失效秒数
│    ├── [max-age]: 失效秒数
│    ├── [no-cache]: 协商缓存
│    ├── [no-store]: 不缓存
│    ├── [private]: 只有客户端缓存
│    └── [public]: 客户端和代理服务器都缓存
└── expires: http1.0
     └── 在此 GMT 时间内强缓存
</pre>

<<<<<<< HEAD
border-box
content-box

<br/>

=======
>>>>>>> 442a8aef2d52f42d2e22a0e88d16e94311d424b7
<pre>
协商缓存
├── 由服务器: 304 Not Modified
├── 直接刷新不会影响协商缓存命中
├── ETag
│    ├── 服务端 response Etag: [string]
│    └── 浏览器 request If-None-Match: [string]
└── Last-Modified 1.1
     ├── 服务端 response Last-Modified: [date]
     └── 浏览器 request If-Modified-Since: [date]
</pre>

# 常见状态码及意义？

<pre>
状态码
├── 200 OK
│    └── 204 No Content
├── 300
│    ├── 301 Moved Permanently
│    └── 304 Not Modified
├── 400 Bad Request
│    ├── 401 Unauthorized
│    ├── 403 Forbidden
│    └── 404 Not Found
└── 500 Internal Server Error
     └── 503 Service Unavailable
</pre>

# http2 你都了解什么？
<pre>
https
├── 兼容
│    ├── 请求方法
│    ├── URI
│    └── 状态码
└── 新特性
     ├── 服务器推/客户端拉
     ├── 修复队头阻塞
     ├── 头部压缩
     └── 二进制帧多路TCP复用
</pre>
# 浏览器回流与重绘

<<<<<<< HEAD
HTML DOM tree
CSS CSSOM tree
合成 render tree
计算元素渲染信息 回流
绘制
重绘

回流：
     init
     位置
     尺寸
     窗口大小
=======
<pre>
http2
└── 兼容
│    ├── 请求方法
│    ├── 状态码
│    └── URI
└── 新特性
      ├── 服务端推/浏览器拉
      └── 二进制帧：全双工
      │    ├── 一个 tcp 链接多个双向流
      │    ├── 一个流一个优先级，多个消息
      │    └── 一个消息是一个逻辑 http 消息，内含多个帧
      └── 压缩头部
</pre>
>>>>>>> 442a8aef2d52f42d2e22a0e88d16e94311d424b7

优化方式：先脱离，再批量修改，再放回去

<pre>
加载-解析-渲染
└── 加载总是互相不影响的
│    ├── (Style -> CSSOM) + (HTML -> DOM) -> attach -> paint
│    ├── CSSOM 构建会阻止 attach 渲染
│    └── DOM 构建会阻止 attach 渲染
├── CSSOM 会阻止 查询 style 的 JS 执行
└── 同步脚本会阻止 DOM 构造
</pre>

<<<<<<< HEAD
# html 加载和渲染顺序？

HTML DOM tree
CSS CSSOM tree
合成 render tree
计算元素渲染信息
绘制

资源的加载不影响其他加载
CSS 阻塞渲染直到 cssom 构建完成，因为 js 会访问 cssom
inline js 的加载会阻塞HTML解析和渲染，自然就会阻塞真的 render tree 的解析和加载
async 异步加载完立刻执行，之后才会 load
defer 异步加载完后顺序执行
=======
# 重排和重绘

<pre>
重排 reflow layout
├── 初始化
├── 添加删除 DOM
├── DOM 尺寸位置修改
├── 浏览器窗口变化
├── 内容改变
└── display: none
重绘 paint
├── 修改文字颜色
└── visibility: hidden
opacity 和 transform 只会 composited 不会引起重绘
</pre>
>>>>>>> 442a8aef2d52f42d2e22a0e88d16e94311d424b7

# 前端相关安全攻击与防御？

<pre>
对内容输出输出的检查不够严格：
└── 注入
│    ├── os 注入
│    ├── sql 注入
│    └── http 注入
└── xss 跨站脚本攻击
会话管理疏忽：
├── 会话劫持
└── csrf 跨站请求伪造
      ├── referer
      ├── token
      └── http only cookie
</pre>

<<<<<<< HEAD
```js
输出转义不全 
     xss 跨站脚本 设计陷阱
          csrf 跨站请求伪造
     注入
          截断 sql
          截断 shell script
          截断 http header

会话管理疏忽
     会话劫持
```
=======
# https 建立链接的过程？

c2b: 加密套件
b2c: 算法、证书（公钥）
c: 验证证书
c: 生成随机字符串，用公钥和算法加密。用随机串加密 hash。
c2b: 发送加密后的随机串，加密后的 hash
b: 验证 hash，解密随机串，用作之后的对称加密密钥
>>>>>>> 442a8aef2d52f42d2e22a0e88d16e94311d424b7

# 常见的加密算法？

<pre>
对称
├── AES
└── DES
非对称
├── RSA
└── 迪菲赫尔曼
散列
└── sha
</pre>

<<<<<<< HEAD
```js
客户端申请，服务端发加密组件
服务端发证书公钥
验证证书
公钥+随机数传回
使用随机数生成会话密钥
```

# 三次握手四次挥手？
握手：
SYN
ACK+SYN
ACK

挥手：注意半关闭
FIN
ACK
FIN
ACK

=======
# eventLoop 宏任务微任务
```js
async function a1 () {
    console.log('a1 start')
    await a2()
    console.log('a1 end')
}
async function a2 () {
    console.log('a2')
}

console.log('script start')

setTimeout(() => {
    console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
    console.log('p1')
})

a1()

let promise2 = new Promise((resolve) => {
    resolve('p2.then')
    console.log('p2')
})

promise2.then((res) => {
    console.log(res)
    Promise.resolve().then(() => {
        console.log('p3')
    })
})
console.log('script end')
```
立即执行-微任务-宏任务队列的顺序执行

# bind 函数实现
```js
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);
}

var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');
// 1
// daisy
// 18
```

```js
Function.prototype.bind = function(context, ...args1) {
    const self = this
    const fNOP = function() {}
    const fBound = function(...args2) {
        return self.apply(this instanceof fNOP ? this : context, args1.concat(args2))
    }
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

# js 中的全等
```js
if([] == false) true
if({} == false) false
if([]) true
if([1]==[1]) false
```
# trottle 和 debounce

# parcel 和 webpack 的区别

# hooks 原理和优点
>>>>>>> 442a8aef2d52f42d2e22a0e88d16e94311d424b7

# react如何进行性能优化
- 调用 setState 时，React 会遍历所有节点，计算差异，然后再更新 UI。
- 之前是使用原生调用栈递归，不调完不停止。
- 之后是用 requestIdleCallback 实现链式调用栈，可以暂停让浏览器渲染。
- React早期的优化都是停留于JS层面（vdom的 create/diff），诸如减少组件的复杂度（Stateless），减少向下diff的规模(SCU)，减少diff的成本(immutable.js)
- react fiber

# cdn 原理 获取最近节点资源的算法

<<<<<<< HEAD
对称：DES，AES
非对称：RSA，Diffie-Hellman
散列：sha，MD5
=======
# react fiber

# requestAnimationFrame 和setTimeout 、setInterval的关系

# 性能优化关注点

# 斐波那契尾递归

# leetcode 三数之和

# js 类型
`DR.AFO.BUNSN`
<pre>
└── 类型
      ├── Obj, Arr, Func
      ├── Number, String, Null, Undefined, Boolean
      └── Date, Regex
</pre>
>>>>>>> 442a8aef2d52f42d2e22a0e88d16e94311d424b7
