title: Ubuntu Email Server
comments: false
date: 2015-10-30 19:43:38
categories: Geek Talks · 奇客怪谈 
---
配置sendmail+dovecot 的服务器并用 email 客户端进行邮件收发  
1. sendmail 只为192.168.x.0/24 提供转发
2. 允许用户teacher 有多个邮件地址（teacher@linuxstudy.com qz@linuxstudy.com）
3. 设置 sendmail 可以转发来自126.com 的邮件  
<!--more-->
**下面的语句使用时出错的话，请大胆尝试` sudo`，`touch`等操作**
***
# 安装 sendmail，mailutils 和 dovecot
## sendmail
```
sudo apt-get install sendmail
```

## dovecot
```
sudo apt-get install dovecot-pop3d
```
## 查看状态、开启服务，关闭服务，重启服务：
```
sudo service sendmail/dovecot status/start/stop/restart
```
## mailutils
```
sudo apt-get install mailutils
```
## 测试发送
```
echo “邮件正文” | mail -s 邮件主题 对方 email
```
***
# sendmail 控制邮件中转
## 备份配置文件，这是个好习惯：
```
cp /etc/mail/sendmail.cf /etc/mail/sendmail.cf.old
```
## 编辑配置文件（`/etc/mail/sendmail.mc`)
**AKA激活`access.db`**
```
找到这个：
FEATURE(`access_db', , `skip')dnl
改成下面这个
FEATURE(`access_db')dnl
```
## 编译`.mc`文件成为`.cf`文件：
**注意我这里的`m4`没有权限往这个文件夹里面写文件，所以我先生成到了`/home`里面然后再`mv`进去**
```
sudo m4 /etc/mail/sendmail.mc > /home/sendmail.cf
sudo mv /home/sendmail.cf /etc/mail/sendmail.cf
```
## 编辑` access`文件：
```
192.168.1.0/24 RELAY
126.com RELAY
```
## 编译`access`到`access.db`文件
**不知道为什么使用 `sudo` 也没有用，我使用了`sudo su`**
```
sudo su
makemap hash access.db < access
exit
```
然后使用 `sudo` 编辑器查看 access.db 文件就可以看到编译成功了。
## 重启服务
```
sudo service sendmail restart
```
***
# 单个用户多个邮件地址
## 编辑配置文件（`/etc/mail/sendmail.mc`)：
```
添加下面这一行
define('ALIAS_FILE'，'/etc/aliases')dnl
```
## 编辑`/etc/aliases`:
```
admin:":include:/etc/manage.user"
```
## 新建文件`/etc/manage.user`:
```
root,teacher,teacher@linuxstudy.com,qz@linuxstudy.com
```
## 编译`.mc`文件成为`.cf`文件：
**注意我这里的`m4`没有权限往这个文件夹里面写文件，这次使用` sudo su`**
```
sudo su
m4 /etc/mail/sendmail.mc > /etc/mail/sendmail.cf
exit
```
## 使别名生效：
```
sudo su
/usr/bin/newaliases
exit
```
## 重启服务
```
sudo service sendmail restart
```
*** 
以上

