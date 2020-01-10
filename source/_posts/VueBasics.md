title: 快速上手Vue
comments: true
date: 2016-04-29 16:41:25
categories: 前端
---
这篇文章的目的是让你快速上手Vue。  
如果你想知道Vue是什么，请看[Vue的官方文档](http://vuejs.org)。  
[官方文档中的入门](http://vuejs.org/guide/)已经写得足够好了，这里只是其他几个例子而已。  
本篇中用到的例子来自于 [Vue.js - Getting Started](http://vuejs.org/guide/)，[coligo - VueJs: The Basics](https://coligo.io/vuejs-the-basics/)，[tutorialzine - 5 Practical Examples For Learning Vue.js](http://tutorialzine.com/2016/03/5-practical-examples-for-learning-vue-js/)和我自己。  
顺便提一句，中文的「Vue入门」类型的文章真是少，上面几个写的很可以了。  
***
## 一个html，一个例子
如果你是照着官方文档，从`npm install -g vue-cli`一步一步来，相信你的第一个例子会通过`npm run dev`开始。  
这样做的话你的调试会变得异常方便：有webpack，JSlint，同步刷新等等。  
但是这篇文章中的所有例子都只需要创建一个新的html，没有`src`，`package.js`，不用npm，直接拖到浏览器中就可以运行。  
毕竟Vue.js是js，快速上手Vue要快速上手。  
首先准备一个html文件

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML</title>
  <style>body{text-align:center}</style>
</head>
<body>
  hello world!
</body>
</html>
```
对于下面的例子你要做的就是**复制-粘贴-拖到浏览器里**。  

## 从`new Vue()`和`el`开始

```
<body>

  <div id="example1">
    {{ message }}
  </div>
  
  <script src="http://cdn.bootcss.com/vue/1.0.17/vue.min.js"></script>
  <!-- vue.js 的加载视情况而定，可以用NPM，Bower，这里使用了国内的CDN -->
  <script type="text/javascript">
  
    new Vue({
      el: '#example1',
      data: {
        message: 'Hello Vue.js!'
      }
    })
    
  </script>
</body>
```

## `v-model`双向绑定

```
<body>

  <div id="example2">
    <input type="text" v-model="greeting">
    <p>{{ greeting }}</p>
  </div>

  <script src="http://cdn.bootcss.com/vue/1.0.17/vue.min.js"></script>
  <script>

  new Vue({
    el: '#example2',
    data: {
      greeting: 'Hello VueJs!'
    }
  });

</script>
</body>
```
请尝试将 div > p 中的`{% raw %}{{ greeting }}{% endraw %}`改为`{% raw %}{{ $data }}{% endraw %}`，`{% raw %}{{ $data | json }}{% endraw %}`，`{% raw %}{{ $data.greeting }}{% endraw %}`试试看。


## `v-on`响应事件
```
<body>

  <div id="example3">
    <p>{{ message }}</p>
    <button v-on:click="reverseMessage">Reverse Message</button>
  </div>

  <script src="http://cdn.bootcss.com/vue/1.0.17/vue.min.js"></script>
  <script>
  
    new Vue({
      el: '#example3',
      data: {
        message: 'Hello Vue.js!'
      },
      methods: {
        reverseMessage: function () {
          this.message = this.message.split('').reverse().join('');
        }
      }
    });
    
  </script>
</body>
```
请尝试将 button 中的`v-on:click`改为`@click`看看效果。

## `v-for`和列表
```
<body>

  <div id="example4">
    <ul>
      <li v-for="todo in todos">
        {{ todo.text }}
      </li>
    </ul>
  </div>

  <script src="http://cdn.bootcss.com/vue/1.0.17/vue.min.js"></script>
  <script>

    new Vue({
      el: '#example4',
      data: {
        todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue.js' },
        { text: 'Build Something Awesome' }
        ]
      }
    });

  </script>

</body>
```
请尝试在 li 中添加`{% raw %}{{ $index }}{% endraw %}`看看效果。

## 计算属性
```
<body>

  <div id="example5">
    <input type="number" v-model="x">
    <p>result: {{ doubleX }}</p>
  </div>

  <script src="http://cdn.bootcss.com/vue/1.0.17/vue.min.js"></script>
  <script>
    new Vue({
      el: '#example5',
      data: {
        x: 1
      },
      computed: {
        doubleX: function(){
          return this.x*2;
        }
      }
    });
  </script>

</body>
```
请尝试将`computed`关键字改为`methods`，然后将`{% raw %}{{ doubleX }}{% endraw %}`改为`{% raw %}{{ doubleX() }}{% endraw %}`方法。
***
差不多就这几个简单点。   
以上


