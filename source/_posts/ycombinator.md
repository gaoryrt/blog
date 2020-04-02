title: Y 组合子
comments: true
date: 2020-04-02 11:32:22
categories:
---

应该是工作一年多的时候接触的 Y 组合子这个概念，和 PYB 在讨论算法他偶然提到的。当时我刚接触函数式编程，沉迷于用这种新范式造轮子；刚好买了那本橙色的《The Little Schemer》，在启迪对话中学习函数式 scheme 和递归；又在公司读书会里阅读了《思维简史》、《世界观》学习了科学哲学史的内容…… 就是在这种氛围里学习了 Y combinator，现在想来还是蛮巧合的。从那以后递归对我来说有了不同的意义，我觉得我的下一个纹身应该就是 ES6 的 Y 组合子，用来纪念我这一段生活。

# 法1
这个是《the little schemer》里推倒的方法，只是换了语法，该方法最关键是理解 *「在需要的地方把 f 替换成 f(f)」*，下面来介绍一下。

这里用三个简单的辅助函数，得到一个递归求字符串长度的方法：
```js
const cdr = str => str.slice(1) // 去除第一个字符剩下的字符串
const nul = str => str === '' // 字符串是否为空
const add1 = num => 1 + num // 自增1

const len = l =>
  nul(l)
    ? 0
    : add1(len(cdr(l)))
```
方法不难理解：递归去除第一个字符剩下的字符串，计数自增1，直到字符串为空。

假如不能在函数内部使用它本身定义的话，我们在函数定义里把它替换成一个虚无的函数 `eternity`。虽然不知道在非空的时候输出什么，但是替换后的这段代码至少能判断空字符串的长度：

```js
const len0 = l =>
  nul(l)
    ? 0
    : add1(eternity(cdr(l)))
```

那如何能判断长度为1的字符串呢？

```js
const len1 = l =>
  nul(l)
    ? 0
    : add1(
      (l => nul(l)
        ? 0
        : add1(eternity(cdr(l))))
      (cdr(l))
    )
```

上面使用了 `len0` 的定义，即 `l => nul(l) ? 0 : add1(eternity(cdr(l)))` 元子替代了 `len0` 里的 `eternity`，进而将 `len0` 变成了 `len1`，适配了更长的字符串。

在这里可以用参数 `len` 替代 `eternity`，把它提取出来：
```js
const len0 = (len => l =>
  nul(l)
    ? 0
    : add1(len(cdr(l))))
(eternity)

const len1 = (length => l =>
  nul(l)
    ? 0
    : add1(length(cdr(l))))
(
  (length => l =>
  nul(l)
    ? 0
    : add1(length(cdr(l))))
  (eternity)
)

const len2 = (length => l =>
  nul(l)
    ? 0
    : add1(length(cdr(l))))
(
  (length => l =>
  nul(l)
    ? 0
    : add1(length(cdr(l))))
  (
    (length => l =>
      nul(l)
        ? 0
        : add1(length(cdr(l))))
      (eternity)
  )
)
```

最终我们是在一个重复的方法上执行 `eternity`，这个重复的方法接收一个 `length` 函数，然后返回一个适配了更长字符串的 `length` 的函数。
这里把重复的方法命名为 `mklength`，用参数的方法提取出来就可以得到：

```js
const len0 = (mklength => mklength(eternity))(
  length => l =>
    nul(l)
      ? 0
      : add1(length(cdr(l)))
)

const len1 = (mklength => mklength(mklength(eternity)))(
  length => l =>
    nul(l)
      ? 0
      : add1(length(cdr(l)))
)

const len2 = (mklength => mklength(mklength(mklength(eternity))))(
  length => l =>
    nul(l)
      ? 0
      : add1(length(cdr(l)))
)
```

作为编写者我们能预测字符串的长度，我们可以叠加 `mklength` 到一定的数量，让它来求出「不定且有限的字符串长度」的答案，但是作为程序本身很难。难在「估算出足够多的数量」，也就是每次在请求最里层 `mklength` 的时候，把 `eternity` 替换成 `mklength(eternity)`。既然 `length` 和 `eternity` 是形参和实参，我们可以在使用 `length` 函数的地方，替换成使用 `mklength(length)`：

```js
const len = (mklength => mklength(eternity))(
  length => l =>
    nul(l)
      ? 0
      : add1(mklength(length)(cdr(l)))
)
```

当然这时候，最后的 `mklength` is not defined。既然这样，我们可以把 `mklength` 当作 `eternity` 传进去，把 `length` 直接替换成 `mklength` 来满足定义：

```js
const len = (mklength => mklength(mklength))(
  mklength => l =>
    nul(l)
      ? 0
      : add1(mklength(mklength)(cdr(l)))
)
```

下面就要把「求字符串长度」（以下称「功能」）的定义给提取出来，留下匿名递归的定义。首先把功能定义里的 `mklength(mklength)` 用另一个参数替换出来：

```js
const len = (mklength => mklength(mklength))(
  mklength => (len => l =>
    nul(l)
      ? 0
      : add1(len(cdr(l)))
  )(mklength(mklength))
)
```

这时候发现爆栈了，我们不要立即执行即可：
```js
const len = (mklength => mklength(mklength))(
  mklength => (
    len => l =>
      nul(l)
        ? 0
        : add1(len(cdr(l)))
  )(y => mklength(mklength)(y))
)
```
然后把功能用 `f` 参数来替代：

```js

const len = (f =>
    (mklength => mklength(mklength))
      (mklength => f(y => mklength(mklength)(y)))
  )
    (len => l =>
      nul(l)
        ? 0
        : add1(len(cdr(l)))
    )
```

适配一下 js 可以接受多参数，换一下变量名即：

```js
const Y = f =>
  (x => x(x))
    (x => f((...y) => x(x)(...y)))

const len = Y(len => l =>
      nul(l)
        ? 0
        : add1(len(cdr(l))))
```

# 法2
还是刚才那个方法：
```js
const len = l =>
  nul(l)
    ? 0
    : add1(len(cdr(l)))
```
我们用递归参数替代：
```js
const len = (mklength, l) =>
  nul(l)
    ? 0
    : add1(mklength(mklength, cdr(l)))
```
lambda 只能传一个参数，这里改一改：
```js
const len = mklength => l =>
  nul(l)
    ? 0
    : add1(mklength(mklength)(cdr(l)))

const LEN = len(len)
```

这里我们用 `w = f => f(f)` 来表示 `LEN`：

```js
const LEN = w(mklength => l =>
  nul(l)
    ? 0
    : add1(mklength(mklength)(cdr(l))))
```
用参数 `len` 替代 `mklength(mklength)`：
```js
const LEN = w(mklength => (len => l =>
  nul(l)
    ? 0
    : add1(len(cdr(l)))
  )
  (mklength(mklength))
)
```
然后提取功能定义：
```js
const LEN = (f => w(mklength =>
  f(mklength(mklength))
))(
  len => l =>
    nul(l)
      ? 0
      : add1(len(cdr(l))))
```
把 `wklength` 换成 `x`：
```js
const Y = f => w(x => f(x(x)))
const LEN = Y(
  len => l =>
    nul(l)
      ? 0
      : add1(len(cdr(l)))
)
```
把 `w` 放回去：
```js
const Y = f => (x => f(x(x)))(x => f(x(x)))
```
由于爆栈的原因，后面那个修改一下：
```js
const Y = f => (x => f(x(x)))(x => f((...y) => x(x)(...y)))
```
这个方法比较好理解。
