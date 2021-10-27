---
title: 关于数据埋点
comments: true
date: 2017-08-29 22:31:13
categories: Geek Talks · 奇客怪谈
---
## 前提
项目中需要埋点的地方越来越多，急需一套通用的埋点解决方案。之前基于后端 + api 的 PV／UV 统计方式不够精细、操作复杂，对于前端会入侵逻辑，后端在接收信息和事后统计时也不好处理逻辑。

结合[GrowingIO的展示信息](https://help.growingio.com/Features/overview.html)大概想了一下，需要采集的信息不过就是：
1. 打开的链接与打开的时间
2. 用户个人信息（这个基本上都需要后端来做）
3. （需要统计的）元素展示时间与时长
4. （需要统计的）元素点击时间
5. 关闭或跳转时间（和目标）

需求自然而然就出来了：
1. 高效埋点
2. 数据格式化，便于处理
3. 精细埋点
4. 兼容各种框架

## 所以选用什么方式呢
[百度外卖前端有篇](https://zhuanlan.zhihu.com/p/27659302)写得犹抱琵琶半遮面的文章就讲了一下他们的方案。写的挺详细的，就是没有开源。

里面讲了当今常用的几种埋点方式：
1. 命令式，大概就是我们这边的原始埋点方式
2. 声明式，就是在 DOM 上声明需要采集的元素数据以及相关操作

然后埋点行为就三个：
1. ready 绑定就算
2. click 点击就算
3. show 统计时长

声明式在现在动态操作 DOM 较多的现代框架中好像还不怎么好做，什么时候绑定呢，什么时候解绑呢，会不会重复绑定呢，展示时长怎么做呢？

首先想到的思路是监听、劫持全局的点击事件和滚动事件，然后如果检测到相关元素就绑定+采集，关闭或跳转前统一上传。然后上面的链接里面提供了一个更优雅的方式，`MutationObserver` + pollyfill，把用在自定义指令上的绑定更新解绑都放在普通元素上来了。所以可以结合两者，只用 `new` 一次就完成了埋点。

上面文章里写的方式直接结合了 vue 的自定义指令，绑定、更新、解绑一个不落，我想要的是在一个 json 里面声明需要采集的元素选择器名、至多到什么 `before`、`after`、`once`、`creatCounter`、`creatTimer` 就完了，使用的时候大概这样：
```
new EventTrack([
    {
        node: '.buyButton',
        before: beforeClick('click'),
        after: afterClick('click')
    },
    {
        node: '#banner7',
        once: OnceShow('show'),
        creatCounter,
        creatTimer
    }
], ({ node, event, param }) => {
    // 每一次事件调用都执行一次本函数
})
```
支持自定义函数（`beforeClick` 和 `afterClick`），以及多次绑定。

> 侵入式的埋点复杂度转移到了针对事件的分析上

于是所有的埋点信息都统一变成了针对 node 的各种 event，后端用一个通用接口加一个通用数据库去存放所有操作日志。

这样的话，**侵入式的埋点复杂度就转移到了针对事件的分析上**，前端不用对照着埋点文档思考在那个组件的哪个回调里埋点了、后端也不用为每个埋点新增单独的 restapi。前端的埋点是非侵入的，在页面加载完成后执行绑定即可。

相较于之前「只记录需要的信息」，这种埋点方式记录了更多基本信息，便于之后的分析。


## 参考
[trackpoint-tools](https://github.com/Qquanwei/trackpoint-tools)，针对组建化的 react 写的函数式埋点方案，我这个弱鸡看得很费劲，但是很有参考价值。

[lodash](https://github.com/lodash/lodash)，什么 `before`、`after`、`once` 都是 lodash 里面来的，lodash 注释写的是真的好啊。

[VisSense](https://github.com/vissense/vissense)，一个可视元素触发事件的库，展示时长就靠它了。

---

以下内容更新于一天后（8-30）

## 遇见的坑
我还是代码的阅读量太少了，基本上是不知道别人怎么进行埋点的，在写这个东西的时候就一直在问自己是不是别人写的时候都会直接在 DOM 上进行声明式埋点。虽然东西是差不多写出来了，但是需求却一直在变化，这在某一个方面上也说明了设计之初的不合理和不宽容。

阅读量不够的另一个体现在于代码不够优雅，比如
```
function emailClients(clients) {
    clients.forEach(client => {
        const clientRecord = database.lookup(client)
        if (clientRecord.isActive()) {
            email(client)
        }
    })
}
```

这种遍历数组的比较，其实可以变成：
```
function emailClients(clients) {
    clients
        .filter(isActiveClient)
        .forEach(email)
}

function isActiveClient(client) {
    const clientRecord = database.lookup(client)
    return clientRecord.isActive()
}
```

比如默认变量的使用：
```
function createMicrobrewery(name) {
    const breweryName = name || 'default name'
}
```

变成：
```
function createMicrobrewery(breweryName = 'default name') {}
```

看着都令人赏心悦目。

具体又一个逻辑的问题没有考虑清楚：解绑的时候如何入侵呢？ MutationObserver 是相当好用的，能够相对异步的提供事件勾子，但是如果一个元素已经在 DOM 树中被删除了，那么监听事件的解绑又如何谈起呢？再进一步问，如果一个元素在 DOM 树中被删除了，如果再一次被添加进去，那之前绑定的监听事件还存在么？是不是要采用提前劫持事件的方式？

设计上还有很多不足的地方，比如自定义函数的传入方式、比如有没有必要将统一上传的功能集成在一起，如果不集成在一起，那么 log 是不是又要换一种方式返回出来，返回的格式又能不能自定义呢？

另外，有没有 document.querySelector() 的逆函数呢？传入一个 DOMObject，返回它的选择器字符串？

## 经验

上面提到的 document.querySelector() 的逆函数：[unique-selector](https://github.com/ericclemmons/unique-selector)。

如果只想监听出现和消失事件，可以用 [huntjs](https://github.com/jeremenichelli/hunt)。
