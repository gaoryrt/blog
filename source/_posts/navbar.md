title: 对主题的修改
tags: [next, hexo]
comments: false
date: 2015-10-11 15:04:40
categories: Discovery
---
我说过了我要改悬浮header还有字体的，今天都改好了。  
现在完成了，但是移动端还有一点点小小的遗憾没有解决。  
<!--more-->
***
# 改文件
还是改这个文件：  
`/hexo/themes/next/source/css/_schemes/Mist/index.styl`  
先把悬浮功能做出来，然后居中，加颜色，位置微调了很多  
然后发信啊手机端看上去很恶心。。。改了半天  
可惜原来点击`site-nav-toggle`之后的动画没有了  
找了一下并不是我设置`z-index`的缘由  
实在没有办法改成了有颜色遮蔽的，还好能看  
不知道现在看起来和原作者的是不是有很多不一样了  
```
//
// Mist scheme 
// gaoryrt changed
// =================================================

.test { border: 10px; }

// Tags
// --------------------------------------------------
h1, h2, h3, h4, h5, h6 { margin: 20px 0 10px 0px; }

// 正文的偏移
// --------------------------------------------------
p { margin: 0 0 20px 0px; 
  letter-spacing: .6px
    word-spacing: 0px;
}

// 链接下划线的颜色
// --------------------------------------------------
a { border-bottom-color: $grey-light; 
  //background-color: gray
}

// 这个是分割线的设置
// --------------------------------------------------
hr {
  margin: 10px -20px 40px -20px;
  height: 2px;

}

// 列表的样式(尚未尝试有可能不是这个)
// --------------------------------------------------
ul li { list-style: circle; }


// Components  阅读全文
// --------------------------------------------------
.btn {
  padding: 0 10px;
  border-width: 2px;
  border-radius: 0;

}

.headband { //display: none; 
    background-color: white;
    padding: 0px 0px 40px 0px;
    
    +mobile() {
    display: none; 
  }
}


// Header 头·顶栏
// --------------------------------------------------
.header { 
    z-index:8;
    position: fixed;
    height: 40px;
    width:100%;
    margin-top: -43px;
    
    background: rgb(245,245,245)
    border-bottom: 2px solid rgb(234,234,234);
    
+mobile() {
    height: 40px;
    position: relative;
    margin-top: 30px;
    
  }

}
.header-inner {
    
    margin-top: -30px;
    
    height: 40px;
    padding: 30px 0;
    
    clearfix();               //清晰修正

  +mobile() {
    padding-top: 0px;
    margin-bottom: 0px;
    
  }
}

.site-nav{
  background-color: rgb(234,234,234);
}


// 博客名
// --------------------------------------------------
.site-meta {
    
  float: left;
  margin-left: -17px;
  
  +mobile() {
    margin-left: 8px;
    padding-top: 1px;
  }

  .brand {
    padding: 2px 1px;
    color: $black-deep;
    background: none;

    +mobile() { display: block; }
  }

  .logo { display: none; }

  .site-title {
    font-size: 26px;
    font-family: "PingFang", Verdana, sans-serif;
    font-weight: bold;
    letter-spacing: -2px
    word-spacing: -4px;
    
    +mobile() { 

    line-height: 34px; 
    font-size: 24px;
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
  padding-top: 2px;
  position: static;
  float: right;

}


.menu {
  float: right;
  margin: 0px -24px 0 0px;
  padding: 0 0px 0px 0px;
  font-size: 21px;

    font-weight: bold;
    font-family: "PingFang", Verdana, sans-serif;
  +mobile() {
    
    margin: 0;
    padding-bottom: 10px;
    font-weight: 400;
  }

  br { display: none; }

  .menu-item {
    margin-left: 0;
    +mobile() { display: block; }
  }

  .menu-item a {
    padding: 5px 10px;
    background: none;
    border: none;
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

    font-weight: bolder;
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
以上是我的`index.styl`文件，直接拖到你自己的位置就能用，相当于是另一个主题了。。。  
其实可以联系 next 作者的。。。  
但是我的代码确实写得很渣  
# 字体
这个原作者说过了，就是改  
`/hexo/themes/next/source/css/_variables/custom.styl`  
添加几行就行了，我的是这样的：  
```
$content-desktop = 740px
$font-family-base = "PingFang", Verdana, sans-serif // 修改成你期望的字体族
.highlight {
  -webkit-overflow-scrolling: touch;
}
```
对了，我还在上面的`index.styl`文件中调整了文字的间距  
***
以上