title: 「翻译」使用 ES2017 Async 函数
comments: true
date: 2017-08-17 23:13:43
categories: 疑似机器人
---
翻译自[Using ES2017 Async Functions](https://css-tricks.com/using-es2017-async-functions/)

[ES2017 在六月最终敲定了](https://github.com/tc39/proposals/blob/master/finished-proposals.md)，随之而来的是对我最喜欢的 `async` 函数的广泛支持。如果你也曾为异步 Javascript 而头疼，那么这就是解药。如果你没有的话，额，你有可能是个天才。

使用 `async` 让你或多或少以顺序的方式编写 JS 代码，而不用把逻辑放在回调、生成器、promises 里。

考虑有如下代码：

``` JS
function logger() {
    let data = fetch('http://sampleapi.com/posts')
    console.log(data)
}

logger()
```

如果你写过 JS 的话，你应该知道上面的代码为啥不会如愿运行。

但是下面的代码会如愿运行：

``` JS
async function logger() {
    let data = await fetch('http:sampleapi.com/posts')
    console.log(data)
}

logger()
```

只用添加两个关键词，代码简洁直观，也能正常运行。

# 在 ES6 之前的异步 JS

在讲 `asybc` 和 `await` 之前，有必要先了解一下 promises。要弄懂 promises，还要再往前讲讲老式的回调。

ES6 里添加了 Promises，这让我们编写异步的 JS 有了飞跃。不再有所谓的 “回调地狱”。

我们可以为一个主函数传入一个可以在任意时候作为返回值调用的回调函数。这也是 JS 的基础。

``` JS
function readFile('file.txt', (data) => {
  // 在回调内
  console.log(data)
}
```

上面的函数会从一个文件记录数据，这也只能在文件完全被读完之后进行。看起来很简单，但是如果你想按顺序读取并记录五个不同的文件怎么办呢？

在 Promises 出现之前，为了执行顺序你需要嵌套回调，如下：

``` JS
// 以下为标准的回调地狱
function combineFiles(file1, file2, file3, printFileCallBack) {
    let newFileText = ''
    readFile(string1, (text) => {
        newFileText += text
        readFile(string2, (text) => {
            newFileText += text
            readFile(string3, (text) => {
                newFileText += text
                printFileCallBack(newFileText)
            }
        }
    } 
}
```

上面的代码难以理解，这还是没有包括错误处理（比如其中一个文件不存在）的代码。

# 我保证这会变好（你懂了？！）
*译者注：这里作者用了 Promise 的双关，既是‘保证’意，又是 Promise 关键字意。

这时 `Promise` 就派上用场了。Promise 是一种提前知晓暂未出现数据的方式。[You Don't Know JS 系列](https://github.com/getify/You-Dont-Know-JS)的作者 Kyle Simpson 是知名的异步 JS 布道者。[他对 Promise 的解释是](https://www.youtube.com/watch?v=Qg1SvpIau6U)：就像在快餐店点餐。

1. 点餐。
2. 付钱并取得餐号小票。
3. 等餐。
4. 当餐准备好了，他们会叫你的号。
5. 取餐。

正如他指出的，当你在等餐的时候不可能吃你的菜，但是你可以盼它，你可以为你的餐做好准备。当你等餐的时候你可以继续你的人生，即使现在没有拿到菜，因为食物已经被“允诺”给你了。这就是 Promise。一个用于表示终将出现数据的对象。

``` JS
readFile(file1)
  .then((file1-data) => { /* do something */ })
  .then((previous-promise-data) => { /* do the next thing */ })
  .catch( /* handle errors */ )
```

这是 `Promise` 的语法。就主要好在可以用直观的方式链接顺序事件。上面的例子看上去还不错，但是我们还是在使用回调函数。Promise 只是把回调简单包装了一下，让它更直观了。

# 最好（且最新）的方式： Async ／ Await
几年前，async 函数被纳入了 JavaScript 生态系统。截止上个月已作为一种官方语法得到了广泛的支持。

`async` 和 `await` 关键字基于 pormise 和 generator 做了简单的封装。本质上，它允许我们在所需的任意位置使用 `await` 关键字“暂停”一个函数。

``` JS
async function logger() {
  // 获取到值之前都会暂停
  let data = await fetch('http://sampleapi.com/posts')
  console.log(data)
}
```

这段代码能按照你想象的运行。它记录来自 API 调用的数据。如果这都看不懂我也不知道咋办了。

这样做的好处就是直观。 你以大脑思考的方式编写代码，然后告诉代码在所需的位置暂停。

另一个好处就是可以使用 promise 不能使用的 `try` 和 `catch`：

``` JS
async function logger ()  {
    try {
        let user_id = await fetch('/api/users/username')
        let posts = await fetch('/api/`${user_id}`')
        let object = JSON.parse(user.posts.toString())
        console.log(posts)
    } catch (error) {
        console.error('Error:', error) 
    }
}
```

这是个故意构造的例子，但至少证明了一点： `catch` 可以捕获在该过程中发生的任意错误。至少有三个位置 `try` 可能出错，这也是迄今为止处理一部代码最简洁的方式。

我们也可以使用 async 函数让循环和判断不再令人头疼：

```
async function count() {
    let counter = 1
    for (let i = 0; i < 100; i++) {
        counter += 1
        console.log(counter)
        await sleep(1000)
    }
}
```

这是一个愚蠢的例子，但至少会按照预期运行并且容易阅读。 如果您在控制台中运行此操作，你会看到代码在调用 sleep 的时候暂停，下一个循环也不会等一秒钟再启动。

# 细节
现在你领略了 `async` 和 `await` 的美，让我们深入了解它的细节：

- `async` 和 `await` 基于 `promise`。 使用 `async` 的函数将始终返回一个 promise 对象。 这一点很重要，你有可能会陷入一种“我懂了”的假象。
- 在使用 `await` 的时候我们暂停了函数，而非整段代码。
- `async` 和 `await` 是非阻塞的。
- 你仍然可以使用 `Promise` 例如 `Promise.all()`，这是我们之前的代码：
``` JS
async function logPosts ()  {
    try {
        let user_id = await fetch('/api/users/username')
        let post_ids = await fetch('/api/posts/<code>${user_id}')
        let promises = post_ids.map(post_id => {
            return  fetch('/api/posts/${post_id}')
        }
        let posts = await Promise.all(promises)
        console.log(posts)
    } catch (error) {
        console.error('Error:', error) 
    }
}
```
- `await` 只能在已被声明为 `async` 的函数内使用。
- 所以不能在全局使用 `await`。
``` JS
// 抛出异常
function logger (callBack) {
    console.log(await callBack)
}

// 对了!
async function logger () {
    console.log(await callBack)
}
```

# 现在就可以用啦
截至2017年6月，几乎所有浏览器都可以使用 `async` 和 `await` 关键字。更好的是，为了确保您的代码在任何地方都可以工作，请使用 Babel 将 JS 预处理为旧版本支持的语法。

如果您对 ES2017 的更多内容感兴趣，可以[在这里查看完整的 ES2017 功能列表](http://2ality.com/2016/02/ecmascript-2017.html)。
