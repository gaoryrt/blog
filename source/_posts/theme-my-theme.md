---
title: 修改next主题
date: 2015-10-04 01:42:57
tags: [hexo,abc,try,sublime]
categories: Discovery
---
  
  开始尝试修改 hexo/themes/next 中的.styl文件，来更改主题甚至开发新主题。  
  看到好多个一摸一样的主题了，好惨  
  加加注释看看 .styl文件里面都是那些的定义，改改颜色，大小之类的，应该不难  
  <!--more-->
  可以参考以下四个链接  
  1. [hexo 主题优化](//www.zipperary.com/2013/06/26/hexo-theme-alteration/)  
  2. [hexo博客主题更换](//www.jianshu.com/p/ed8e8cf1632c)  
  3. [基于Pacman主题的Hexo修改](//www.tuicool.com/articles/eY3i2u3)  
  4. [Hexo模板系统和pacman的修改](//www.huangyunkun.com/2014/03/18/hexo_ejs_template/)   
    
>突然发现sublime text这个工具相当好用，堪比notepad++  
>可以参考这一篇文章[开始使用sublime text 3](/2015/09/10/开始使用sublime-text-3/)     

***  

暂时就写这样，等18号下午考完计算机网络继续补，看会不会**烂尾**  
***  
2015年9月18日下午11:21更新  
发现hexo/themes/next/languages/zh-Hans.yml 可以改一点东西  
2015年10月04日上午01:14更新  
1. [ARAO'S BLOG](//www.arao.me)  
2. [Hexo 主题 Light 修改教程](//www.jianshu.com/p/70343b7c2fd3)
3. [Concise，一款为hexo设计的简约而漂亮的主题](//blog.csdn.net/v123411739/article/details/45227249)
***  
# 更新2015年10月05日19:59:37  
next 默认的主题名为 `MIST` 这个的设置在这个地方：  
```
/hexo/themes/next/source/css/_schemes/Mist/index.styl
```
这里面包含了很多可见的属性  
在学习 js 之前就先改改这个吧，我把我的注释写在下面  
```
//
// Mist scheme 
// gaoryrt changed
// =================================================

.test { border: 10px; }

// Tags
// --------------------------------------------------
h1, h2, h3, h4, h5, h6 { margin: 20px 0 10px; }

// 正文的偏移
// --------------------------------------------------
p { margin: 0 0 20px 0px; }

// 链接下划线的颜色
// --------------------------------------------------
a { border-bottom-color: $grey-light; }

// 这个是分割线的设置
// --------------------------------------------------
hr {
  margin: 20px 0px;
  height: 2px;
}

// 列表的样式(尚未尝试有可能不是这个)
// --------------------------------------------------
ul li { list-style: circle; }


// Components
// --------------------------------------------------
.btn {
  padding: 0 10px;
  border-width: 2px;
  border-radius: 0;
}

.headband { display: none; }


// Header 头·顶栏
// --------------------------------------------------
.header { background: $white; }
.header-inner {
  margin-bottom: 40px;      //与下方距离
  padding: 30px 0;
  clearfix();               //清晰修正

  +mobile() {
    margin-bottom: 30px;
    padding: 10px;
  }
}

// 博客名
// --------------------------------------------------
.site-meta {
  float: left;
  margin-left: -10px;

  +mobile() {
    margin-left: 10px;
  }

  .brand {
    padding: 2px 1px;
    color: $black-deep;
    background: none;

    +mobile() { display: block; }
  }

  .logo { display: none; }

  .site-title {
    font-size: 22px;
    font-weight: bolder;

    +mobile() { 
    line-height: 34px; 
    font-size: 18px;
    }
  }
}

// 博客名字上下的两条线
// ------------------------------------------
.logo-line-before,
.logo-line-after {
  display: block;
  overflow: hidden;
  margin: 0 auto;
  width: 100%;

  +mobile() { display: none; }

  i {
    position: relative;
    display: block;
    height: 0px;                        //这个改成0就没有上下两行了
    background: $black-deep;
    +mobile() { height: 3px; }
  }
}

.use-motion {
  .logo-line-before i { left: -100%; }
  .logo-line-after i { right: -100%; }
}



// Menu  顶栏右边的导航
// --------------------------------------------------
.site-nav-toggle {
  position: static;
  float: right;
}


.menu {
  float: right;
  margin: 8px 0 0 0px;
  padding: 0 20px;

  +mobile() {
    margin: 0;
    padding: 0;
  }

  br { display: none; }

  .menu-item {
    margin-left: 0;
    +mobile() { display: block; }
  }

  .menu-item a {
    padding: 5px 10px;
    background: none;
    //border: none;
    transition-property: background;

    +mobile() {
      text-align: left;
    }

    &:hover { background: #e1e1e1; }       //指针指到的时候背景色
  }

  a::before {
      display: none;

      +mobile() { display: block; }
    }

  +mobile() { float: none; }
}

.menu-left {
  float: left;
  +mobile() { float: none; }
}

.menu-item-icon { display: none; }



// Search 搜索栏
// --------------------------------------------------
.site-search {
  float: right;
  margin-top: 8px;

  +mobile() {
    float: none;
    padding: 0 10px;
  }

  input {
    padding: 3px;
    border: none;
    padding-left: 18px;
    border-radius: 0;
    width: 140px;
    background: url($search-icon) no-repeat 0 50%;
    background-size: 12px 12px;
    outline: none;
    border-bottom: 1px solid $grey-dark;
    opacity: 0.5;
    &:focus { opacity: 1; }
  }
}


// Post Expanded  文章
// --------------------------------------------------
.posts-expand {
  padding-top: 0;

  .post-title,
  .post-meta {
    text-align: $site-meta-text-align;
    +mobile() { text-align: $site-meta-text-align; }
  }
  .post-eof { display: none; }

  .post { margin-top: 80px; }
  .post:first-child { margin-top: 0; }

  .post-meta {                       //预览部分偏移量
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .post-title {                      //文章标题 
    font-size: 26px;
    font-weight: 300;
  }

  .post-body img { margin: 0; }

  .post-tags {
    text-align: left;
    a {
      padding: 1px 5px;
      background: $whitesmoke;        //tags
      //border-bottom: none;        
    }
    a:hover { background: $grey-light; }
  }
  .post-nav { margin-top: 10px; }     //tag 与下方分隔栏的距离
}

//阅读更多 按钮
//----------------------------------------------------
.post-more-link {
  margin-top: 0px;
  text-align: left;

  a {
    padding: 0px 0px 0px 0px;
    font-size: 14px;
    color: $grey-dim;
    background: none;
    border: none;
    border-bottom: 1px solid $grey-dim;
    transition-property: border;

    &:hover { border-bottom-color: black; }
  }
}


// Page - Post details    单独文章页 标题
// --------------------------------------------------
.page-post-detail {
  .post-title,
  .post-meta { text-align: center; }

  .post-meta { margin-bottom: 60px; }
}


// Pagination       主页 页数栏
// --------------------------------------------------
.pagination {
  margin: 40px 0px 0px -20px;
  text-align: left;
  //background: $white;

  +mobile() {
    margin: 20px 0px 0px 10px;
    text-align: left;
  }
}

// Footer           页脚
// --------------------------------------------------
.footer {
  margin-top: 80px;
  padding: 20px 0;
  background: $white;
  color: $grey-dim;
}
.footer-inner {
  margin: 0 auto;
  text-align: centerr;

  +mobile() { text-align: center; }
}

// Helpers
// --------------------------------------------------
.full-image.full-image.full-image {
  max-width: 100%;
  width: auto;
  margin: 0;
}

```
***
# 文字的设置
`hexo/themes/next/languages/zh-Hans.yml `  
改成这样咯：  
```
footer:
  powered: "博客框架参见 - %s"
  theme: 主题使用参见
```
这样的话，页脚还是挺不错的。
***  
至此告一段落，以后再加点击拷贝代码，header 悬浮等功能。  
以上
