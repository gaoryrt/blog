title: 为站点添加rss和sitemap
comments: true
date: 2016-03-22 17:54:35
categories: Geek Talks · 奇客怪谈
---
# rss是什么
全称是really simple syndication  
简易信息聚合  
以下是个人YY  
在我国，有新浪微博、微信公众号、各路新闻/聚合软件瓜分市场的大前提下  
你要好好使用一个rss还是蛮不容易的  
不说rss阅读器的选择，单单是订阅和迁移订阅源的过程就够繁琐的了  
新浪微博可以推荐相似用户，公众号有钱拿  
rss确实做下去不容易  
***
# 为hexo添加rss
hexo的plugin页面就有相应插件  
配置也相当简单  
[点这里看原文](https://github.com/hexojs/hexo-generator-feed)
安装：  
``` bash
$ npm install hexo-generator-feed --save
```
配置，在`hexo/_config.yml`里添加：
```css
feed:
  type: rss2
  path: rss2.xml
  limit: 20
  hub:
```
然后把rss连接放在`theme/_config.yml`中：
```
rss: /rss2.xml
```
然后`generate`，再`deploy`就行了
***
# 为hexo添加sitemap
hexo的plugin页面就有相应插件  
配置也相当简单  
[点这里看原文](https://github.com/ludoviclefevre/hexo-generator-seo-friendly-sitemap)
安装：  
```bash
npm install hexo-generator-seo-friendly-sitemap --save
```
配置，在`hexo/_config.yml`里添加：
```
sitemap:
    path: sitemap.xml
```
然后就可以拿给搜索引擎了

***
以上