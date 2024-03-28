---
title: 一个思考
comments: true
date: 2016-04-14 22:31:45
categories: 编程
---
原本第一句话是『.DS_store是git的敌人』，我想了一下，还是默默改成了下面这一句。  
> DS.store是hexo generate的敌人。

***
# 起
本来还想举例说git使用中`.DS_store`文件很麻烦，后来想到添加gitignore就可以了。
**但是**  
我不知道如何向hexo generator中添加忽略文件，所以每一次带有`hexo generate`的操作都会得到以下错误：
```
ERROR Process failed: layout/_partial/.DS_Store
TypeError: Cannot read property 'compile' of undefined
```
虽然不会影响网页生成，但是总碍眼。
***
# 承
`.DS_store`本身是为了文章显示而生成的，OSX自带这个东西。  
删除了会因为finder的访问重新出来，每一次都用相同的`rm .DS_store`总是不现实的。  
加之`layout/`下有几个文件夹，就有几个`.DS_store`,挨个删除也麻烦。
那么可以尝试`禁止系统创建`：  
（建议在执行之前看看[知乎上相关的讨论](https://www.zhihu.com/question/20345704)，以及[StackOverflow上相关的讨论](//stackoverflow.com/questions/18015978/how-to-stop-creating-ds-store-on-mac)）
```
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool TRUE
```
下面是恢复：  
```
defaults delete com.apple.desktopservices DSDontWriteNetworkStores
```
也可以使用如下的命令删除一个文件夹下的所有`.DS_Store`文件：  
```
find <your path> -name ".DS_Store" -delete
```
***
# 转
想了想其实可以写一个python脚本来干这个事情。  
往脚本里添加路径，执行时遍历这几个路径删除所有的`.DS_store`。  
然后可以把这个python脚本变成全局命令，这样想删除的时候就只用输入几个字母就行了。  
比如`DDS`，也不知道shell命令区分大小写不呢？
**但是**  
想到每一次`hexo s`之前都要`DDS`跑一遍，总是增加了操作成本的。  
哈哈，可以在`.zshrc`中添加`alias`。  
那么这个`DelDS_store.py`文件应该怎么写呢？  
```  python
# -*- coding:utf-8 -*-
import os

pathList = ['/Volumes/HHD/应用/hexo/themes/pln/layout',
            '/Volumes/HHD/应用/Github/hexo-theme-pln/layout']
for path in pathList:
    command = 'find ' + path + ' -name ".DS_Store" -delete'
    os.system(command)
```
这个是绝对没有问题的版本，可以自定义路径到`pathList`当中，执行时全部都给删除完。  
然后想了一下能不能多线程：  
``` python
# -*- coding:utf-8 -*-
import os
import threading

pathList = ['/Volumes/HHD/应用/hexo/themes/pln/layout',
            '/Volumes/HHD/应用/Github/hexo-theme-pln/layout']
for path in pathList:
    command = 'find ' + path + ' -name ".DS_Store" -delete'
    threading.Thread(target=os.system(command)).start()
```
冲哥和奶神都说说线程会自动回收掉，但是我知道有kill的存在。  
但是看了一下执行完成的flag也是0，这下真不知道如何确认执行完成再正确关闭了。  
SOF上说不要盲目kill，那就这样了？  
[点击这里查看更多Python线程](//zhuanlan.zhihu.com/p/20167077?refer=auxten)
***
# 结
> 这里使用的是多线程版本。  

## 第一步
```
touch /usr/local/bin/DelDS_store.py
```
然后用编辑器打开，无论你是`open .`之后右键选择打开方式，还是直接  
```
vi /usr/local/bin/DelDS_store.py
```
## 第二步
打开之后往这个文件里写入以下内容：
``` python
#!/usr/bin/env python
# -*- coding:utf-8 -*-
import os
import threading

pathList = ['/Volumes/HHD/应用/hexo/themes/pln/layout',
            '/Volumes/HHD/应用/Github/hexo-theme-pln/layout']
for path in pathList:
    command = 'find ' + path + ' -name ".DS_Store" -delete'
    threading.Thread(target=os.system(command)).start()
```
## 第三步
为这个文件添加执行权限：
```
chmod +x /usr/local/bin/DelDS_store.py
```
## 第四步
打开你的`bashrc`/`fishrc`/`zshrc`,这个取决于你使用的shell。
在里面添加一个别名：
```
alias DDS="/usr/local/bin/DelDS_store.py"
```
或者是，直接添加一行：
```
/usr/local/bin/DelDS_store.py
```
这样做的后果就是，每一次新建shell都会执行一遍删除命令。
## 完成！
这样就可以使用shell，在任何地方通过`DDS`这个命令来删除指定文件夹下的`.DS_Store`文件了。
***
以上。
