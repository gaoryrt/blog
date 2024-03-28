---
title: JS去重
comments: true
date: 2016-04-17 18:50:25
categories: CMD:CV
---
看了一个题，要求用JS给数组去重。  
标答的实现时间复杂度比我自己想的版本要多一些，下面记录一下自己的版本。  
<!-- more -->
***
# 标答的实现
``` javascript
function getDist(a) {　　
    var res = [];　　
    res[0] = a[0];　　
    key = 1;　　
    for (i = 1; i < a.length; i++) {　　
        flag = false;　　
        for (j = 0; j < key; j++) {　　
            if (a[i] == res[j]) {　　
                flag = true;　　
                break;　　
            }　　
        }
        if (flag === false) {
            res[key] = a[i];　　
            key++;　　
        }　　
    }　　
    return res;　　
}
```
简单来说就是两个遍历，第一个遍历是把原数组中的值拿出来，第二个遍历是把值和返回值中的比较，若不相同就放进去。  
理解上来还是挺简单的，后来我发现其实不用两次遍历的，里面的遍历其实可以不用for。  
话说上面这个的时间复杂度我还真不会算了，貌似是O(n^2)，但是中间明显不是n次。  
应该是大于O(n)，小于O(n^2)，难道是O(nlgn)？  
# 我的实现
``` javascript
function getDist2(a) {
	var res = [];
	res[0] = a[0];
	for (i = 1; i < a.length; i++) {
		if (res.toString().indexOf(a[i]) === -1) {
			res.push(a[i]);
		}
	}
	return res;
}
```
一开始就想找index的，结果发现JS里面数组没有这个函数，字符串才有，于是就有了这个版本。  
先转换为字符串，再indexOf。  
好像也没有append函数，只有push。  
***
以上
