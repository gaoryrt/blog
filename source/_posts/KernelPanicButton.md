---
title: 今天恐慌吗？
comments: true
date: 2016-04-30 20:41:56
categories: Geek Talks · 奇客怪谈
---
今天回家，路上听了第38期的内核恐慌，这一期的题目就叫做[Hit the Kernel Panic Button（点击查看/收听）](https://ipn.li/kernelpanic/38/)，提到了一个内核恐慌按钮，和微博用户[今天是周五么](//weibo.com/frifrifriday)、话题[#索尼今天倒闭了吗#](//weibo.com/p/1008083db00081c6bc19771bf8f16b1c7dbc15)的目的类似。大概是因为内核恐慌改为不定期播出了，rio说需要在官网上做一个按钮，『今天恐慌吗』？  
*你永远不知道你按下之后会发现什么*  
***
## 大概的思路
1. 使用js，从url得到html，我只用得到内核恐慌的html文件就行了。
2. 解析html文件获得最新一起的时间，然后对比新建的时间，然后进行相应输出。  
  
大概就这两个步骤。毕竟 the Kernel Panic Button 的用途很单一。想起来哪里听到过『我手机上的每一个app都有它单独的用处』，真是蠢啊。  
**另，我这个是中二。 ** 
## js得到html文件
三个办法，其中两种用到了jquery：
```
(function readHTML(){
    $.ajax({
        async:false,
        url : "https://ipn.li/kernelpanic/",
        success : function(data){
            alert(data);
        }
    });
})();
```
上面这个版本不知道为什么在点击确定之前网页都属于加载中。
```
$.get("https://ipn.li/kernelpanic/", function(data){
    alert(data);
});
```
还有一个纯的js，详见[stackoverflow的讨论](//stackoverflow.com/questions/8197709/javascript-read-html-from-url-into-string)。  

## 从html得到最新时间
**上一次这么做我还是一个不会正则的孩子，天真的我使用`.index`一层一层解析html字符串。**  
**直到我遇见了正则。**  
关于正则的学习，推荐一个网站：[rubular](//www.rubular.com)，还有`practice makes perfect`。  
```
function htmlToDateArray(data) {
    var re = /\d{1,4}-\d{1,2}-\d{1,2}/;
    var arr = re.exec(data);
    return arr[0];
};
```

## 获取当前时间和比较
`Date().format()`功能居然没有写到jquery的Date里面。  
也是，javascript作为前端使用时也不应该有这么大的体积，这一期的播客中也说到了的，left-pad有它存在的理由。。。
```
Date.prototype.Format = function(fmt)
{ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
```
上面代码来自[csdn 的 Meizz](//blog.csdn.net/meizz/article/details/405708?Pending=true)。  
最后上作品：[the Kernel Panic Button](//gaoryrt.com/CV/the-Kernel-Panic-Button/)  
## 跨域
页面中的Javascript只能读取，访问同域的网页。  
协议、域名、端口三者必须相同，否则就属于跨域。  
[查看segmentfault的相关讨论](https://segmentfault.com/q/1010000000149454)  
~~由于跨域问题，你并不能在网页上获得alert~~  
现在你可以[在线尝试](//gaoryrt.com/CV/the-Kernel-Panic-Button/)、[查看源码](https://github.com/gaoryrt/Kernel-Panic-Button)、也可以尝试另存为html网页，然后手动拖进浏览器。经过测试均可以使用。  
***
以上


