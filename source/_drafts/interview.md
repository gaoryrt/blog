title: 前端面试
comments: true
date: 2020-04-11 11:04:22
categories: 前端
---

记录常见的前端面试题和答案要点，以飨来人。

最近更新时间为：2020年 4月11日。

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

<br/>

<pre>
协商缓存
├── 由服务器: 304 Not Modified
├── 直接刷新不会影响协商缓存命中
├── ETag
│    ├── 服务端 response Etag: [string]
│    └── 浏览器 request If-None-Match: [string]
└── Last-Modified
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


# 什么是浏览器重绘

# html 加载和渲染顺序？


```js

```

# 前端相关安全攻击与防御？


```js

```

# https 建立链接的过程？


```js

```

# 三次握手四次挥手？


```js

```

# 常见的加密算法？


```js

```
