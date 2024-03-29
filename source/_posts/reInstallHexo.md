---
title: 花了好长时间重装了hexo
comments: true
date: 2016-03-23 23:53:57
categories: 扫盲教育
---
今天使用hexo的时候，发现找不到这个命令了  
打开finder，我的hexo文件夹还在那里  
当时并不知道是哪个地方出问题了  
就只是简单的在zshrc文件中添加了`hexo bin`文件的alias  
但是今天在deploy新文章的时候，发现hexo彻底不能用了    
# 问题哪里来的
我昨天添加hexo sitemap插件的时候  
顺手更改了nvm，并且没有配置好  
导致系统使用的node版本中没有hexo  
我在找到这个问题的途中尝试了重装npm  
不幸的是npm问题更多，err红了一大片  
在中间等待和`ctrl c`的多次循环中我选择了放弃  
# 重装
先备份，就是把hexo文件夹改个名字，比如说`hexo1`  
卸载nvm： 
``` bash
rm -rf ~/.nvm
rm -rf ~/.npm
rm -rf ~/.bower
```
然后重新装：  
``` bash
sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | zsh
```
然后重新装hexo：  
``` bash
sudo npm install hexo-cli -g
hexo init
```
还有之前的各种hexo插件：  
``` bash
npm install hexo-generator-feed --save
npm install hexo-generator-sitemap --save
```
然后把之前备份的source文件夹，配置文件`_config.yml`，theme文件  
都拷贝进去 
# 这个故事告诉我们
好好等，不要胡乱`ctrl c`  
然后时常备份，要会看报错信息  
***

