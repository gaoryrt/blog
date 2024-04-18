---
title: Free Blog for Noobs
comments: true
date: 2024-04-17 14:10:20
categories: 扫盲教育
toc: true
published: false
---

如何访问一个你心仪的网址，打开你的博客。

要达成这一目标，有三步要做：

## 1. 将内容储存为本地文件
  对内容形式（样式和格式）的不同要求，决定了编写，修改，组织内容的难度。所以你想在博客里展示些什么？
  绝大多数浏览器都可以正确解析 txt、jpg 和 html 展示出来，所以你可以选择：
  ### 1.1 纯文本（无样式）
  你需要：把内容整理成 txt 文件。
  优点：简单，会打字就行。
  缺点：丑，网页打开是白底黑字左对齐，也只能通过换行、缩进、emoji、ascii art 美化它。仅限纯文本，没有图片，甚至没有能力跳转其他链接。
  ### 1.2 图文混合
  你需要：1.[学习 markdown 语言](https://letmegooglethat.com/?q=markdown) 2.编辑 md 文件 3.再[将 md 文件转换成 html](https://letmegooglethat.com/?q=markdown+to+html)
  优点：md 支持的形式比纯文本多，难度比 html 低。
  缺点：今后你的文章都将使用这种语言进行书写，以获得有限的样式以及多媒体支持。需要转换成 html 发布，难以阅读和修改。
  ### 1.3 纯图片
  你需要：将内容（写到纸上拍照或利用其他计算机编辑工具）生成 jpg 文件。
  优点：可编辑性极强。
  缺点：难修改。不能插入超链接。

## 2. 将本地文件换为链接
  免费 CDN 很多，每个的注册和使用方法大同小异，相信互联网上会有专门的文章做解释，这里就不多介绍，带着关键字搜索就可以。你需要记住，这一步操作之后，你的本地文件（txt/md/jpg）文件都会变成（可能不是你想要的网址的）链接。
  缺点：有限-每家CDN的覆盖率不同，免费的储存额度（决定存放数量）、流量额度（决定了访问额度）、速度上限不同。如果你有上述任一需求，那就给钱。

  这里不推荐 GitHub Pages，因为 Git 很难学。换句话说，如果你有基础的 Git 能力，GitHub Pages 也不失为将文件变为链接的一个好办法。

  至此，绝大多数人（视CDN商不同）都可以通过各式浏览器打开这些链接，访问到你的内容。

## 3. 如何用心仪的网址打开
  无论是使用 CDN 还是 GitHub Pages，你都获得了一堆共同域名的网址（以下称复杂网址）。我们可以通过配置 DNS，使用自购的域名代替这些复杂网址的域名。
  这一步你需要： 1.购买域名 2.配置 DNS。
  推荐使用 Cloudflare 一站解决上述两个问题。
  关键字都在这里了，稍加搜索就可以找到成吨的教材。简单来说，在得到个性化域名后，你需要在 DNS 中添加一项 CNAME 记录，代理复杂网址的域名。

## 名词解释
  内容样式：（在文中指）加粗、下划线、文本颜色，文字大小等

  内容格式：（在文中指）图片、音频、视频、超链接、引用等

  html：[照理来说浏览器只认识这个文件](https://en.wikipedia.org/wiki/HTML)

  ascii art：[鬼画桃符](https://en.wikipedia.org/wiki/ASCII_art)

  超链接：[爱丽丝钻的洞](https://zh.wikipedia.org/zh-hans/%E8%B6%85%E9%80%A3%E7%B5%90)

  CDN：[百度网盘](https://en.wikipedia.org/wiki/Content_delivery_network)

  DNS：[高德地图](https://en.wikipedia.org/wiki/Domain_Name_System)

  CNAME：[艺名](https://zh.wikipedia.org/wiki/CNAME%E8%AE%B0%E5%BD%95)
