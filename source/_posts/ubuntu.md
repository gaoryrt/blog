title: 开始使用ubuntu
comments: false
date: 2015-10-27 22:54:10
categories: Geek Talks · 奇客怪谈
---
**网络配置与服务**这门课对我来说已经成为周二晚的噩梦了。  
在下周二之前要做的事情有点多：  
1. dns server 正向反向的解析
2. apache 服务器  
	1. 重设置文档主目录
	2. 只监听80和81端口
	3. 主目录默认打开 php jsp html文档
	4. 设置默认字符集为 GB2312
	5. 建立虚拟目录 OA: /var/www/OA
	6. 访问目录时需要用户认证，只认证 teacher
	7. 建立一个基于 IP 地址的虚拟 Web 站点，IP 地址有192.168.1.6和192.168.1.8，第一个站点主目录为var/www/www1，并且192.168.1.0/24子网可访问；第二个站点主目录为var/www/www2，并且192.168.1.0/24和com.cn域的客户访问
3. ftp
<!--more-->
**下面的语句使用时出错的话，请大胆尝试` sudo`，`touch`等操作**
***
# 开始之前
## 选用虚拟机和 ubuntu
虚拟机方面，Parallels Desktop绝对是不二之选，但是很贵而且每次更新都收费，不给我们这些学生活路。关于版权这东西，最近我发现我正处于版权尴尬的巅峰。virtual box 免费就用它吧。  
然后选用了 ubuntu kylin 14.04 这个个人喜好不同，特别是看到室友更新15瞬间爆炸之后。  
## 各种工具
`gwet` `zsh` `sublime text` 还有各种插件 `autojump` `predawn` `Valign`
***
# dns server
跟着[这个文章](//www.linuxidc.com/Linux/2015-04/116350.htm)来  
唯一卡住的地方就只有
```
sudo service bind9 restart
```
   
这个时候就使用
```
tail /var/log/syslog
```
来查看错误，我这里是因为`/etc/bind/named.conf:12: open: /etc/rndc.key: file not found`  
进去把它删除了就行了  
趁着热先，生成系统快照再说。。。  
发现一个问题，重启之后
```
subl /etc/resolv.conf
```
会自动改回到127.0.0.1，导致反向的解析失效，记得每次开机都要改成本机的 ip 地址。
***
# apache
## 设置文档主目录
**下面用`/var/www/myweb`为例**
安装：
```
sudo apt-get install apache2
```
    
配置文件： `/etc/apache2/apache2.conf`  
找到`<Directory /var/www/>`这一行，改成`<Directory /var/www/myweb>`  
进入这个文件`/etc/apache2/sites-available/000-default.conf`  
找到`DocumentRoot /var/www/`一行，改为`DocumentRoot /var/www/myweb`  
然后在`/var/www/myweb`下面创建你的`index.html`文件  
然后重启 Apache 服务：
```
sudo /etc/init.d/apache2 restart
```
这样就可以在`127.0.0.1`上使用新的文档主目录了
## 设置监听端口
先改这个文件： `/etc/apache2/ports.conf`  
找到这个`Listen 80`改成这个`Listen 你的IP地址:81 Listen 你的IP地址:80`  
然后改这个文件： `/etc/apache2/sites-enabled/000-default.conf`  
整个文件都是基于80端口的，把这些`<VirtualHost *:80>...</VirtualHost>`复制下来粘贴一遍，然后把80改成81  
然后重启 Apache 服务：
```
sudo /etc/init.d/apache2 restart
```
试试看`你的IP地址:80`和`你的IP地址:81`是不是都能看到你刚才设置的 `index.html`内容了  
## 字符集
在`/etc/apache2/apache2.conf`中添加`AddDefaultCharset GB2312`  
## 添加虚拟目录
我的方法跟网上能找到的稍微有点不一样  
具体就是 我没有`httpd.conf`这个文件，配置的信息都添加到了`/etc/apache2/apache2.conf`里面  
```
Alias /OA "/home"
<Directory /home>
	Options FollowSymLinks
	AllowOverride None
	Order deny,allow
	allow from all
</Directory>
```
然后需要把 `/home` 目录的权限给访问者： 
```
sudo chmod -R 777 /home
```
这个也是解决`403 forbidden 错误的方法`  
然后在`/etc/apache2/sites-enabled/000-default.conf`里面添加`OA`这个虚拟目录：`<VirtualHost *:81/OA>...</VirtualHost>`
## 设置权限
我的阿帕奇为啥没有` htpasswd`？  
安装`htpasswd`： 
```
sudo apt-get install apache2-utils
```
  
修改目录的权限，在` apache2.conf`里面：  
```
Alias /OA "/home"
<Directory /home>
	Options FollowSymLinks
	AllowOverride AuthConfig
	Order allow,deny
	Allow from all
</Directory>
```
注意第四行是` AuthConfig`  
在`000-default.conf`中相应目录中添加`AccessFileName .htaccess`  
使用` htpasswd`创建`teacher`这个用户： `/usr/bin/htpasswd -c /home/password teacher`
然后就在该目录下创建`.htaccess`文件：
```
AuthName "!!!password file auth!!!" 
AuthType Basic
AuthUserFile /home/password 
Require user teacher
```
最后还是重启一下  
***
# FTP
## 安装
```
sudo apt-get install vsftpd 
```
检查一下：
```
sudo service vsftpd status
```
可以看到运行状态  
## 允许匿名访问
*在使用之前最好还是先备份一下配置文件*  
备份`vsftpd`的配置文件：
```
sudo cp /etc/vsftpd.conf /etc/vsftpd.conf.old
```
然后打开`vsftpd.conf`，找到这一行：`anonymous_enable=NO`，改成`YES`
## ftp 访问的根目录
新建一个用户和这个用户的目录：
```
mkdir -p /home/test
useradd test -g ftp -d /home/test -s /sbin/nologin
```
设置密码：
```
passwd test
```
设置一个可以访问的共享目录，别人就不会看到这个文件夹以外的东西了。  
还是打开这个`vsftpd.conf`文件，在最后新加一行`anon_root=这里填目录路径`，并把这几行注释取消掉：
1. `local_enable=YES` //允许本地访问
2. `write_enable=YES` //访问用户可以创建文件夹
3. `chroot_list_enable=YES` //设置允许列表中的用户访问
4. `chroot_list_file=/etc/vsftpd.chroot_list`//允许列表的位置  
5. **`max_clients=100`//设置最大连接客户端数**
6. **`max_per_ip=2`//设置每IP最大连接数**


然后新建允许列表，在其中添加` test`这一行
```
echo 'test' > /etc/vsftpd.chroot_list
```
**注意，要单独设置用户和匿名用户同时访问的话请把 anonymous 也添加到这个允许列表中**
  
连接 `ftp`:  
```
ftp 你的 IP 地址
```
  
如果出现了530错误， 就在 `/etc/shells` 最后一行添加`/sbin/nologin`
500错误，用这个： 
```
chmod a-w /home/test
```
记得重启服务以生效



   