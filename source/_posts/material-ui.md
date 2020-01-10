title: 「翻译」开始使用 material-ui
comments: false
date: 2016-01-21 14:16:06
categories: 疑似机器人	
---
翻译自[这一篇文章](http://www.material-ui.com/#/get-started/prerequisites)，这个是 material-ui 的官方文档。  
# 开始的前提
我们建议你在开始使用 Material UI 之前先了解一下 [React](http://facebook.github.io/react/)。Material-UI 基于 React，所以了解 React 是怎样工作的尤其重要。  
如果你已经熟知单页面程序（SPAs）和 Node，觉得可以跳过这个前提段落的话，请到直接到[安装](http://www.material-ui.com/#/get-started/installation)部分。  
那么，下面简单讲一下 SPAs 和 Node。这个对你这种前端新手（或者只了解过『传统的』使用 HTML 和 CSS 以及 JavaScript 的人）来说特别有帮助。  
# SPAs 单页面程序
很久之前，静态网页都是由 HTML 搭建的，我们使用 CSS 来做样式，用 JavaScript 来做互动和动画。大多数，尤其是相应数据的客户端都包含了一整套往返流程：客户端的数据发送到服务器，结果又返回到客户端。加之大多数回话都被『屏蔽』了。那么在这些往返的流程当中，客户端都在忙着做一些无用功。  
在异步服务器（AJAX）诞生之后，客户端可以在发送和等待数据的同时做一些其他事情。然而大多数的客户端还是在等待服务器的往返流程结束，这时的网页的流畅程度还是无法和普通的桌面应用相比。这就是 SPAs 产生的原因。  
一个 SPA 本质上就是一个单页面的站点。这就是说，服务器只需要一次性将网页（一般来说是一个 JavaScript 文件）发送给客户端。所有客户端相应所需的逻辑都储存于这个文件当中。因此，保证流畅性可靠性和高速网络体验的所有必备条件都提前发送到了浏览器的储存空间当中。这种 web 编程体系在过去十年内促使了众多流行的面向 SPAs 的 JavaScript 框架的诞生：  
- [Angular](https://angularjs.org/)
- [Ember](http://emberjs.com/)
- [Backbone](http://backbonejs.org/)
- [React](http://facebook.github.io/react/)
  
把所有重要的代码放在一个文件当中的确是一个重大的挑战。谢天谢地，还有众多工具供我们将我们的代码分装为小型的模块（类似于面向对象程序中不同的类和接口）以供以后重新组装。这就是 Node 诞生的原因。  
# Node
[Node](https://nodejs.org/) 的核心是一个由 C 语言编写的程序，它使用了 chrome 的 v8 JavaScript 引擎以让我们在 shell （是的，就是你的终端而非浏览器）当中运行 JavaScript。因此，Node 本质上是一个运行环境。  
Node 刚被发明出来的时候主要是针对 JavaScript 开发 Web 服务器的。这对 JavaScript 限制于客户端这一传统来说有点激进。然而时间发展，web 开发者发现了使用 Node 开发依赖关系管理的优点，进而创造了这些项目：  
- [Grunt](http://gruntjs.com/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org/)
- [Webpack](http://webpack.github.io/)
  
在 Node 流行起来的同时，独立开发者和团队将几乎将所有（使用 Node 的）代码都 web 程序化了。当然，整个社区都会受益于这些“自定义 Node 脚本”，这就要求任何人都可以上传他们的 Node 脚本，其他开发人员可以在自己的项目中使用这些脚本。  
[Node Package Manager](https://www.npmjs.com/)，也就是大家熟知的『npm』就是用来干这个事情的。npm是一个命令行工具，主要用来将外部JavaScript引入自己的项目。例如 Material UI 就可以作为 npm 的一个包。也就是说，你可以使用`npm install material-ui`将 Material UI 引入你的项目，然后在你想要用的地方使用 Material UI。  

以上。