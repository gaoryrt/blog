title: 终于还是自己买了vps搭ss
comments: true
date: 2016-03-17 17:19:43
categories: Geek Talks · 奇客怪谈
---
# 先买一个vps  
主要是人家一般都要paypal，但是我没有，为了方便就直接上了淘宝，贵了11元/年  
我是在tb上买的`alpharacks`，就是最便宜的那个套餐  
年付35rmb，64MB内存，硬盘3G，月流量150G  
# ssh登陆
买完人家会给你账号密码和链接  
然后进去找到`hostname`，复制  
在自己的终端里`ssh root@刚刚复制的终端`  
输入刚刚的账号密码  
这样就登陆到这个vps里了  
# 安装SS  
我用的是python版本的，另外还有什么go，R，libev版本的  
紧接着刚刚的  
``` bash
wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh
chmod +x shadowsocks.sh
./shadowsocks.sh 2>&1 | tee shadowsocks.log
```
安装用不了多久  
完了之后会提示你  
``` plaintext
Congratulations, shadowsocks install completed!
Your Server IP:your_server_ip
Your Server Port:your_server_port
Your Password:your_password
Your Local IP:127.0.0.1
Your Local Port:1080
Your Encryption Method:aes-256-cfb

Welcome to visit:https://teddysun.com/342.html
Enjoy it!
```
这样就在vps上安装好了SS了  
# 本地登陆
先要自己下载ss客户端  
原来的开源放在github上面的被迫下架了  
我是在ishadowsocks上面找到的  
大家可以尝试在什么佛跳墙啊，红杏之类的销售SS账号的网站中找到  
地址是刚刚的`hostname`，端口号你没有该国的话是`8989`  
记住要把本地的代理接口改为`1080`  
***
以上