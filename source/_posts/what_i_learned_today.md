---
title: what i learned today
comments: true
date: 2016-09-23 23:44:25
categories: 扫盲教育
---
## 怎样<del>正确</del>使用 vue-resource + vuex
vue-resource 是一个用于XMLHttpRequest以及JSON操作的插件，其实如果不是对`inteceptor`有需求，有jQuery就够了。
```
// actions.js
// 父组件调用这个action
export const getData = ({ dispatch }) => {
    Vue.http.get(url, { req: 'req body' }).then((res) => {
        // 正常返回, 别忘了处理错误
        dispatch(REFRESH_DATA, res.data)
    }, (err) => {
        alert(err.message)
    })
}
// ........
// store.js
const state = {
    data: null
}

const mutations = {
    [REFRESH_DATA] (state, data) {
        state.data = data
    }
}
// ......

// 各个需要更新数据的子控件.vue
// ....
export default {
    // ....
    vuex: {
        getters: {
            data: ({ data }) => data
        }
    },
    // .....
}
// ....
```

[详情看这里](//www.doc00.com/doc/1001004eg)

## 记得把 externals 写在 webpack.config.js 里面啊
傻乎乎的在`index.html`中单独引入了cdn的jquery，忘了往webpack里面配置。结果打包出来一百多kb，是说那么慢。
```
externals: {
	'jquery': 'jQuery'
}
```
再打包就只有三十多kb了，而且这里面还包括`vue-touch`的`hammer.js`，这个不知道怎么单独写出来了，等下去问问。

## 在android/ios中使用vue
aka 暴露全局变量给webview回调
改了几个版本，还有个[shim挂载至全局的办法](https://github.com/webpack/docs/wiki/shimming-modules)，我还没有看。

下面是直接暴露的方法
在exposed.vue中：
```
<script>
var ex
...
export default {
	methods: {
		setSth(tag, score) {
			this.list[tag] = score
		}
	},
	ready() {
		ex = this
	}
...
}
exoport { ex }
</script>
```

然后在顶层 main.js 中：// 注意这里并不是window，我在这里卡了一会儿还。
```
import exposed from 'path_to/exposed.vue' // 暴露ex
import default from 'path_to/exposed.vue' // 暴露setSth()
...
exposed = ex // 绑定至事先定义好的全局变量
```

全局下面，index.html:
```
<script>
    var exposed = {} // 在build.js之前定义一个全局变量
</script>
<script src="build.js"></script>
// 使用
<script>
    exposed.methods.setSth(0, 1)
</script>

```

## 使用vuex
没有vuex的时候使用`$dispatch()`和`$broadcast()`。
有vuex的时候dispatch：
action.vue
```
import store from 'store.js'
exports default {
	methods: {
		act(info) {
			store.dispatch('action', info)
		}
	}
}
```
store.js:
```
import Vuex from 'vuex'
const state = {
	a: 1
}
const mutations = {
	action(state, info) {
		state.a = 0
		console.log(info)
	}
}
export default new Vuex.Store({
	state,
	mutations
})
```

有vuex的时候broadcast：
action.vue
```
import store from 'store.js'
exports default {
	methods: {
		do() {console.log('done')}
	},
	watch: {
		'store.state.a': 'do'
	}
}
```
store.js:
```
import Vuex from 'vuex'
const state = {
	a: 1
}
const mutations = {}
export default new Vuex.Store({
	state,
	mutations
})
```

## 箭头函数
```
setTimeout(function() {
  animation.translate(30).step()
  this.setData({
    animationData:animation.export()
  })
}.bind(this), 1000)
```
在es5中就可以使用`.bind(this)`了
## 再也不用css:filter了
在安卓上就跟屎一样

## proxychains-ng

proxychains 是给命令行使用代理的工具，支持 socks5.

`$ brew install proxychains-ng`

## 微信小程序
打开的时候不要开代理，不然有`net::ERR_NAME_NOT_RESOLVED`问题
wxml 要用 `<image></image>`标签而不是`<img></img>`
wxss 不支持`transform`，不支持`animation`的`@keyframes`，反而使用[wx.createAnimation(OBJECT)](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-animation.html)，自己的api，这个好处在哪里？
（待确定）wxss `background-size` 的渲染有问题？


## git push 每次都要输入密码？
`git remote -v`
看到`fetch`和`push`的开头都是`https`
没有走`ssh`，要先加上`ssh-key`，再换成`ssh`的方式
记得先在github的sshkey设置里面加上本机的sshkey
```
git remote rm origin
git remote add origin git@github.com:mugbya/arch_config.git
git push origin
```

## 伪元素和伪类
```
p:first-letter {
    color: red;
}
p > span {
    color: blue!important;
}
```

```
<p><span>第一个</span>字符看看会不会变红？</p>
```

第一个字符是红色，因为`::first-letter`伪元素是作为子元素存在的。

## 放假是用新东西的时候
新鞋子，新衣服

## mac
`command` + `option` + `esc`

## js小数点保留2位
num.toFixed(2)

## 数据异步更新的问题
```
$('html').css('font-size', '1.29em')
setTimeout(() => {
    $('html').css('font-size', '1.3em')
}, 0)
```

## css性能
will-change: transform;
使用3d变换
