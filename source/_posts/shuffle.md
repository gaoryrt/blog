title: JQuery实现简单的轮播图
comments: true
date: 2016-03-21 17:39:56
categories: 前端
---
[demo点这里](//gaoryrt.com/CV/shuffle/index.html)
# 需要达到的效果
常见的轮播图组件  
自动翻页，左右跳转按钮，下方是index  
index显示了当前图片位置，左右按钮就是更改当前位置  
第一个版本暂时不定义api了，写简单点  
# 大概思路
用banner隐藏超出部分的图片   
imageList是inline  
要显示的话就float到标签位置  	
# 首先是html  
从sublime换了webstorm，自带了emmet插件  
也就是可以这样写  
`div.wrapper>div.banner>ul.imageList>(li>img)*4^img+img>ul.indexList>(li>img)*4`  
`tab`之后就是这个效果了：  
```
<div class="wrapper">
    <div class="banner">
        <ul class="imageList">
            <li><img src="" alt=""></li>
            <li><img src="" alt=""></li>
            <li><img src="" alt=""></li>
            <li><img src="" alt=""></li>
        </ul>
        <img src="" alt=""><img src="" alt="">
        <ul class="indexList">
            <li><img src="" alt=""></li>
            <li><img src="" alt=""></li>
            <li><img src="" alt=""></li>
            <li><img src="" alt=""></li>
        </ul>
    </div>
</div>
```

emmet还是挺方便的  

# css
为了使banner遮挡其他元素，overflow:hidden  
然后 imgList的li 全部都float:left,display:inline  
这样的话就可以在后面左右滑了  
左右按键和indexList需要用position:absolute来定位  
这俩就用绝对值50%再margin一个负值来居中  

# jquery
主要是通过一个changeTo()来完成到指定图片的跳转   
三个直接事件：自动换、点击左右、点击indexList  
都是对changeTo()的不同调用：  
```
function changeTo(num){ 
    var goLeft = num * 800;
    $(".imgList").animate({left: "-" + goLeft + "px"},500);
    $(".indexList").find("li").removeClass("indexOn").eq(num).addClass("indexOn");
  }
```
还有就是通过设置全局变量的方法来添加一个循环：  
```
var autoChange = setInterval(function () {
    if(index<3){
        index++
    }else {
        index=0
    }
    changeTo(index)
},1000);
```
js代码中需要用到重新开始循环（如`wrapper:hover`）  
只需要重新为`autoChange`赋相同的值即可再开始循环  
***
以上
