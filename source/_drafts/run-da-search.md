title: 在 PLN 主题中使用搜索功能
comments: true
date: 2016-08-25 22:02:13
categories: Geek Talks · 奇客怪谈
---
这篇文章简单描述了一下怎样在 hexo-theme-pln 中用上搜索功能。
简单描述的意思就是很简单。
## tl;dr
在你的 hexo 根目录下执行 shell 语句：  
```
$ npm install --save hexo-generator-search
```

在 `_config.yml` 文件中添加配置信息：  
```
search:
  path: search.xml
  field: all
```

然后 `hexo d` 就行了
---
## 心路历程
参见 [这篇文章](//hahack.com/codes/local-search-engine-for-hexo/)，都是人家写好的。

感恩的心，感谢有你。

