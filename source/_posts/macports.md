title: 安装 MacPorts
comments: false
date: 2015-10-23 00:28:48
categories: Geek Talks · 奇客怪谈
---
Mac下安装软件一般都是下载`dmg`、`pkg`包来安装。
在命令行中常使用`brew`、`wget`、`pip`来安装命令行软件包。  
突然发现` MacPorts`终于更新了支持` el capitan`的新版本，不下不是中国人。  
<!--more-->
***
# 下载
[MacPorts 的下载页面](http://www.macports.org/install.php)
# 安装  
双击`MacPorts-2.3.4-10.11-ElCapitan.pkg` 一直点击继续来安装，需要输入密码。  

安装之前最好是断网，不然安装过程中要联网检查更新，我这里打开了 `lantern`和` shadowsock`都卡了二十分钟。  

然后在你的` bashrc `文件（我用的 `zsh`，也就是`~/.zshrc`文件）中添加:  
```
export PATH=$PATH:/opt/local/bin
export MANPATH=$MANPATH:/opt/local/share/man
export INFOPATH=$INFOPATH:/opt/local/share/info 
```


更新ports tree和MacPorts版本，强烈推荐第一次运行的时候使用-v参数，显示详细的更新过程。  
`sudo port -v selfupdate`  

搜索索引中的软件  
`port search name`

安装新软件  
`sudo port install name`

卸载软件  
`sudo port uninstall name`

查看有更新的软件以及版本  
`port outdated`

升级可以更新的软件  
`sudo port upgrade outdated`

Eclipse的插件需要subclipse需要JavaHL，下面通过MacPorts来安装  
`sudo port install subversion-javahlbindings`