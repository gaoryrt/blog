title: 解决hexo MODULE NOT FOUND问题
comments: ture
date: 2016-04-11 02:19:32
categories: Discovery
---
看见其他地方是其他的方法，我这里还是记录下来，万一别人也遇见了呢。

***

# 问题 PROBLEM
在使用hexo的时候会遇见以下问题  
every time i run `hexo` command, i encounter following problems   

```
{ [Error: Cannot find module './build/Release/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
{ [Error: Cannot find module './build/default/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
{ [Error: Cannot find module './build/Debug/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
```

***

# 分析 ANALYZATION
Stackoverflow上查了一下，人家说，`npm install hexo --no-optional`就可以解决了。  
after stackoverflowing it, i got the solution `npm install hexo --no-optional`.

但是我并不需要重新安装整个hexo模块，毕竟依赖很多，而且重新下载时若网络环境不好，又会产生同样的错误，所以我需要用更简单的解决方法。  
As the hexo module have numerous dependencies, and rebuild it under an unstable network-environment would give rise to the same problem, there's no need to reinstall the whole module.

在hexo目录下通过关键字`DTraceProviderBindings`找了一下，发现了这个模块。  
i found this module after seaching `DTraceProviderBindings` in hexo's folder.
`dtrace-provider@0.6.0 node_modules/dtrace-provider`这个模块用于调试时提供更高级的信息，可以在[其页面](https://github.com/chrisa/node-dtrace-provider)查看更多信息。  
this extension allows you to create native DTrace providers for your Node.js applications. That is, to create providers and probes which expose information specific to your application, rather than information about the node runtime. read more on [it's github page](https://github.com/chrisa/node-dtrace-provider).

***

# 解决 SOLUTION
由于是`--no-optional`，也不是必要的包，我就大胆删除了  
delete this optional module   

```
npm uninstall dtrace-provider
```

在此之后就不会有烦人的三行报错了。  
no more error info.

鉴于还是有需要调试的场景，还是可以选择重新安装上这个模块  
but if you need to use this module, you can reinstall it   

```
npm install dtrace-provider
```

当然这是可选的。  
of course it's optional.  

***
感觉自己连续学这么多天前端知识还是有用嘛。  
以上。

