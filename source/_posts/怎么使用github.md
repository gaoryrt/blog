---
title: 开始使用 GitHub
date: 2015-09-14 20:19:46
categories: 扫盲教育
tags: [howto,GitHub]
---
我自己也是刚开始使用 GitHub 没几天，写得不好  
我就写自己常用的吧  

> 2015年9月20日下午3:19更新  

知乎上这个答案写得好👉[天猪(刘勇)的答案](//www.zhihu.com/question/20070065)  

<!--more-->  
***

# 什么是 GitHub／Git ？

## 什么是Git

一个分布式的，文件**版本控制**系统  
分布式，指没有物理上的「主」储存位置
文件，指的是某一个文件或者是一系列文件组成的文件树  
版本控制，指的是对修改信息的记录和管理  
修改，指的是多个编辑者在多个机器，或者多个时间对同一文件进行的修改  
综上 Git 可以让编辑者方便的管理所有修改

## 什么是 GitHub ？

是一个 Git 的**托管平台**  
***

# 安装Git

在我的这一篇文章👉[这个博客建立的流程](//gaoryrt.github.io/2015/09/09/howto/)提到过了  

> 在 [Git 官网](//git-scm.com)可以下载到安装包  

**或者**使用 [Homebrew](//mxcl.github.com/homebrew/)，[MacPorts](//www.macports.org/) 进行安装  

通过查看版本信息检查是否安装成功：
```
$ git --version
```

如果你使用 Mac，Xcode 就自带 Git  
找找 Xcode -> Preference -> Download 里面的 `Command Line Tools`  
更新好了就可以在 shell 里使用 git 命令了  


为一个文件夹使用 git 管理，只用定位到文件夹下使用：
```bash
$ git init
```

然后这个文件夹就变成了一个 Git 仓库  
该文件夹下的所有文件都受这个 Git 仓库管理

***  

# 使用Git  
*这里指的git使用仅限于本地*  
添加文件使用`add`命令，提交则是`commit`命令  
比如我要把一个`HelloWorld.c`提交到git 仓库
先把这个文件放在git的主文件夹中，然后定位到这个文件所在的文件夹使用

```
$ git add HelloWorld.c
$ git commit
```

就行了  
Git的使用和GitHub使用有重复的，请继续往下看GitHub的使用
常用命令看这里👉[知乎问题 git？](//www.zhihu.com/question/31246445)  

***  

# 使用GitHub  

>就是一网站哎呀自己看说明我要玩MC去了  
>坑挖在这里等着填 2015年9月14日 下午9:14  

2015年9月20日下午3:30 填坑  


看了一些网页发现github起步实在是太困难了  
在这里只能给大家，（主要是给自己）指一些方向  
等看完了才能总结，总结完了才能写  
不知不觉坑就挖好了

***  

##  在[GitHub](https://github.com)上注册和登录    

*下面部分来自[官网help文档](https://help.github.com/articles/set-up-git/)的翻译*  

1. [下载并安装git](//git-scm.com/downloads)  
2. 打开 ``Terminal.app``  
3. 告诉git你的名字，Type everything after the `$` here:

```
  $ git config --global user.name "YOUR NAME"
```

4. 告诉git你的email地址，这里输入的地址必须和你在注册GitHub时使用的相同， 如果你想隐藏你的email地址，请参考["Keeping your email address private"](https://help.github.com/articles/keeping-your-email-address-private)。  

```
$ git config --global user.email "YOUR EMAIL ADDRESS"  
```

***

## 下一步：在Git上关联GitHub  
当你在Git上连接了一个GitHub知识库，你需要使用HTTPS或者SSH与GitHub关联  
### 使用HTTPS关联(推荐)  

> 克隆HTTPS链接对每一个知识库都有效，你可以得到一个只读或者读写的地址，取决于它公开与否，以及你的允许。

> 链接在哪里都有效，即使你在墙后或者使用了代理，在某些情况下，如果你选择SSH，你只能[使用SSH的部分](https://help.github.com/articles/using-ssh-over-the-https-port)。

> 当你通过HTTPS在git上使用`git fetch`、`git pull`、`git push`、`git remote`命令时，你会被要求输入GitHub的用户名以及密码。

> 如果你使用了[两个身份的验证](https://help.github.com/articles/about-two-factor-authentication)，你必须[创建一个身份地址令牌](https://help.github.com/articles/creating-an-access-token-for-command-line-use)来使用GitHub，而非你的GitHub密码。
你可以使用[验证助手](https://help.github.com/articles/caching-your-github-password-in-git)，这样你就不用每次登陆都输入密码了。

### 在git上缓存你的GitHub密码  
你需要确定你的Git是1.7.10版本及以上  
如果你是通过[homebrew](//brew.sh/)安装的git，那么你已经装好了OSXkeychain helper  
下面是安装方法  

> 1. 确定你的计算机上是否已经安装了OSXkeychain helper，尝试以下命令：
> 
```
$ git credential-osxkeychain  
# 如果已经安装的话返回如下  
# Usage: git credential-osxkeychain <get|store|erase>  
```

2. 如果OSXkeychain helper尚未安装，使用以下命令通过curl安装：

```
$ git credential-osxkeychain
# 如果没有安装的话返回如下
# git: 'credential-osxkeychain' is not a git command. See 'git --help'.  
```

继续  

```
$ curl -s -O \
https://github-media-downloads.s3.amazonaws.com/osx/git-credential-osxkeychain
# 这就开始下载了  
```

然后

```
$ chmod u+x git-credential-osxkeychain
# Fix the permissions on the file so it can be run
```

3. 将OSXkeychain helper和git安装到同一个文件夹：  

```
$ sudo mv git-credential-osxkeychain \
"$(dirname $(which git))/git-credential-osxkeychain"
# Move the helper to the path where git is installed
# Password: [enter your password]
```

4. 告诉git使用`credential.helper`来进行全局配置：  

```
$ git config --global credential.helper osxkeychain
# Set git to use the osxkeychain credential helper
```

下一次你使用HTTPS url进行克隆的时候就会开启OSXkeychain helper缓存了，然后你再使用的时候就不会再要求你输入用户名及密码了。

***  

*以下来自于网站 [git简明指南](//rogerdudler.github.io/git-guide/index.zh.html)*

# 获得一个知识库(repository)  

使用以下命令以获得一个远端服务器上的知识库版本：  

```
$ git clone username@host:/path/to/repository  
```

# 工作流  

你的本地仓库由 git 维护的三棵“树”组成。第一个是你的 **工作目录**，它持有实际文件；第二个是 **暂存区（Index）**，它像个缓存区域，临时保存你的改动；最后是 **HEAD**，它指向你最后一次提交的结果。  

## 添加和提交  
你可以提出更改（把它们添加到**暂存区(index)**），使用如下命令：  

```
git add <filename>
git add *  
```

这是 git 基本工作流程的第一步；  
使用如下命令以实际提交改动：

```
git commit -m "代码提交信息"  
```

现在，你的改动已经提交到了 **HEAD**，但是还没到你的远端仓库。  

## 推送  

你的改动现在已经在本地仓库的 HEAD 中了。执行如下命令以将这些改动提交到远端仓库：

```
git push origin master  
```

可以把 master 换成你想要推送的任何分支。   

如果你还没有克隆现有仓库，并欲将你的仓库连接到某个远程服务器，你可以使用如下命令添加：

```
git remote add origin <server>  
```

如此你就能够将你的改动推送到所添加的服务器上去了。  

#  分支  
分支是用来将特性开发绝缘开来的。  
在你创建仓库的时候，master 是“默认的”分支。  
在其他分支上进行开发，完成后再将它们合并到主分支上。  
创建一个叫做“feature_x”的分支，并切换过去：  

```
git checkout -b feature_x  
```

切换回主分支：  

```
git checkout master  
```

再把新建的分支删掉：   

```
git branch -d feature_x  
```

除非你将分支推送到远端仓库，不然该分支就是 不为他人所见的：  

```
git push origin <branch>  
```

# 更新与合并  

要更新你的本地仓库至最新改动，执行：  

```
git pull  
```

以在你的工作目录中 获取（fetch） 并 合并（merge） 远端的改动。
要合并其他分支到你的当前分支（例如 master），执行：

```
git merge <branch>
```

在这两种情况下，git 都会尝试去自动合并改动。遗憾的是，这可能并非每次都成功，并可能出现冲突（conflicts）。   
这时候就需要你修改这些文件来手动合并这些冲突（conflicts）。改完之后，你需要执行如下命令以将它们标记为合并成功：

```
git add <filename>
```

在合并改动之前，你可以使用如下命令预览差异：

```
git diff <source_branch> <target_branch>
```

# 替换本地改动  
假如你操作失误（当然，这最好永远不要发生），你可以使用如下命令替换掉本地改动：

```
git checkout -- <filename>
```

此命令会使用 HEAD 中的最新内容替换掉你的工作目录中的文件。已添加到暂存区的改动以及新文件都不会受到影响。  

假如你想丢弃你在本地的所有改动与提交，可以到服务器上获取最新的版本历史，并将你本地主分支指向它：

```
git fetch origin
git reset --hard origin/master
```

***  

以上
