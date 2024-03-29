---
title: 安装 python 库文件
comments: false
date: 2015-10-16 13:28:04
categories: 扫盲教育
---
我用的` pythonbrew`来管理我的两个 `python`版本  
但是在使用第三方` package`的时候，`pip`总是不好用  
`pip install`的全部都在原来的地方，而非` pythonbrew`的文件夹下面  
搞了好久才找到正确使用的姿势  
<!--more-->
***
# 取消` rootless`
`OSX`有个` rootless`机制，不要你碰` usr/bin`里面的东西  
就算你加上了`sudo`都不行，用这个来关闭:  
```
sudo nvram boot-args="rootless=0"
```
完了要重启  
至于怎么重新` enable`。。。  我也不知道  
***
# 关闭 `pythonbrew`
本来在[Stack Overflow](//stackoverflow.com/)上面查到了的  
也有人是这样的，在 `pythonbrew`下面不能使用` pip`  
>I found a solution. I uninstalled my Python 3.3.0 by issuing `pythonbrew uninstall 3.3.0`. Then I installed it again with `pythonbrew install --configure="--with-zlib" 3.3.0`. This allowed pip to install and thus now I can use it to install to this Python version.
  
就是先卸载，然后用`--configure="--with-zlib"`这个选项重新安装  
我尝试的时候是出错跳过了` option`又安装了一次，跟原来的一样
所以我还是把它关了，既然` pip install`在我自带的 python 下  
我就好好用这个自带的版本:`pythonbrew off`
***
# 安装 
```
sudo easy_install pip
pip install XXX
```
我的还是有问题的  
于是使用这个来安装:  
```
sudo easy_install XXX
```
然后就可以使用刚刚安装的` package`了
***
# 更新问题

`python package`具体的路径为`/Library/Python/2.7/site-packages`  
然后这里面的文件夹名字要和你` import`后面的名字一样才行  
`SOF`上面有个人文件夹叫做` pil`，改成` PIL`就能用了  
对了，我遇见的问题是这个:  
```
ImportError: No module named PIL
IOError: decoder jpeg not available
```
注意我这里用的是` python2`，使用 `python3`的话，最后库名字是带有引号的
# 解决
手动把`/Library/Python/2.7/site-packages`里面的` PIL`、`pillow`、`Image`都给删除了，这里需要输入密码  
然后使用这一个就全部OK了:  
```
sudo pip install image
```
就连之前` jpeg`文件无法解析的问题都一并解决了哟
***
以上
