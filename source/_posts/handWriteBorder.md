title: 手写Border
comments: true
date: 2016-04-17 00:18:23
categories: 前端
---
看了一个题，叫使用纯CSS+HTML方式实现圆角框。  
[想看题的点这里](//yjbys.com/bishi/timu/613776.html)。  
题下面有答案，答案说直接margin就可以实现了，我研究了一下代码并没有看懂。  
题目说是五条线设置不同外边距为5、3、2、1、1即可，但是下面给的答案却有八个不同的div，我并不知道是上下分开设置了还是一个角落就有八个div。    
然后按照他的逻辑写了一下，但是没有搞成功，先挖个坑在这里，下面贴我成功的代码。  
***
# HTML
简单逻辑就是`b1`外边距负得多，里面的外边距负的少。  
几个div嵌套起来，分别设置左右边距。  
```
    <div class="b1">
        <div class="b2">
            <div class="b3">
                <div class="b4">
                    <div class="b5">
                        <div class="b6">
                            <div class="content">
                                hello world!
                                <br> gaoryrt
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
```
这个用emmet写出来特别简单：`.b1>.b2>.b3>.b4>.b5>.b6>.content`, 好像子元素不能用`$`来迭代吧。  

# CSS
```
.b1, .b2, .b3, .b4, .b5, .b6 {
        font-size: 8px;
        background: #F0F8FF;
        color: #F0F8FF;
    }
    .b1:after, .b2:after, .b3:after, .b4:after, .b5:after, .b6:after, .b1:before, .b2:before, .b3:before, .b4:before, .b5:before {
        content: ".";
        color: #F0F8FF;
    }
    .b1, .b1:after, .b1:before {
        color: #98C2F0;
    }
    .b1 {
        margin: 0 -50px;
        background: #98C2F0;
    }
    .b2 {
        margin: 0 -20px;
        border-left: 20px solid #98C2F0;
        border-right: 20px solid #98C2F0;
    }
    .b3 {
        margin: 0 -30px;
        border-left: 10px solid #98C2F0;
        border-right: 10px solid #98C2F0;
    }
    .b4 {
        margin: 0 -20px;
        border-left: 10px solid #98C2F0;
        border-right: 10px solid #98C2F0;
    }
    .b6 {
        margin: 0 -20px;
        border-left: 10px solid #98C2F0;
        border-right: 10px solid #98C2F0;
        display: flex;
        justify-content: center;
    }
    .content {
        padding: 0 50px;
        font-size: 5em;
        color: black;
    }
```
这个是纯css，要是用sass肯定更简单。  
个人项目一是量少，二是懒，一般都不怎么用sass这种css generator。  
惨了惨了，不会写了。
# 效果对比
题目要求：  
![题目](//7xs4ih.com1.z0.glb.clouddn.com/3927-14050G10346119.png)
我的效果：
![我的效果](//7xs4ih.com1.z0.glb.clouddn.com/myversion.png)
***
要是有更简单的方法还劳烦提醒一下。  
以上。


