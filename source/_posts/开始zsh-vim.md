title: 开始 zsh + vim + iTerm
date: 2015-09-28 20:40:52
tags: [abc,howto,mac]
categories: Geek Talks · 奇客怪谈
keywords: zsh, oh my zsh, iTerm
---
mac 中 terminal 默认使用的是 bash  
把它换成 zsh，which 提供了很多方便的选项与功能

常言道 vim 是神之编辑器，emacs 是编辑器之神  mac 自带 vim，但是需要升级加插件等过程来调教

iTerm 则是一款替代原生 terminal 的软件，可以设置更多选项，至少颜色显示是这样
<!--more-->  

# 安装 zsh 和 oh my zsh
使用这个命令可以看到系统内置了哪些 shell
```
cat /etc/shells
```
显示这个
```
/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```
所以我有 bash、csh、ksh、sh、tcsh 和 zsh  
既然有 zsh 就不用安装了，直接用下面的命令设置默认使用的 shell 就行
```
chsh -s /bin/zsh
```
Github 上有个很火的 [oh my zsh](https://github.com/robbyrussell/oh-my-zsh)，这是一个开源项目，让大家更方便地使用 zsh。下面介绍的和链接里的安装一样：

zsh 默认的配置文件在这里： `~/.zshrc`  
直接打开没啥东西的，我们借助 oh my zsh 来调教：
```
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
之后你的 `~/.zshrc` 文件里面就有了 oh my zsh 的配置  
比如[主题](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)  
>我使用的是一款叫做 `bullet-train` 的主题，效果如图

![image](1.gif)

还可以显示这个目录下的 git 状态，当然需要你先安装 git。
## 更改主题
修改文件 `~/.zshrc` 中的 `ZSH_THEME` 一行，改成这个
```
ZSH_THEME="bullet-train"
```
重新打开一个会话就可以看到新的配置生效了。

如果没有箭头，只有方框+问号的话，还需要安装 powerline：
箭头使用了特殊的字体文件，把特定的「黑底蓝右箭头」替换成箭头。
在 github 可以直接下载然后执行`install.sh`来安装👉[Powerline-patched font](https://github.com/powerline/fonts)

一步一步的安装方法参见👉[powerline的文档](https://powerline.readthedocs.org/en/latest/installation/linux.html#font-installation)，这里就不赘述了。
然后在你的终端gui设置里面，把字体改成后缀为`powerline`的字体就行了

## 配置
就是更改`.zshrc`的内容，下面的几个插件是我现在常用的，可以根据关键字在 github 上搜到
```
plugins=(zsh-256color you-should-use git z sudo zsh-autosuggestions)
//几个插件：256色终端，简写命令自动题型，git命令增强，全局跳转，快速添加 sudo，自动补全命令

// 下面是各种快捷键
alias zshrc="open ~/.zshrc"
alias gac='git add .&& gitmoji -c'
alias vsc='open . -a "visual studio code"'
alias sub='open . -a "sublime text"'
alias rm='trash'
```

- zshrc 可以让我方便的打开 zsh 配置文件
- gac 是一次性添加修改并使用 gitmoji commit
- vsc 在 vs code 里打开工程
- sub 在 sublime text 里打开工程
- rm shell 里删了就不好找回来了，trash 还可以在垃圾桶里找回来


# 安装 iTerm2
看图
![terminal](2.jpg)  
**👆terminal  **

  
![iTerm2](3.jpg)
**👆iterm2  ** 的颜色要更多些
下载地址看这里👉[iTerm官网](//www.iterm2.com)

***  
# 安装 mvim
mac 自带的 vim 是7.3版本的  
尝试升级失败，开了 ss 都一直是`Error: Failed to download resource "vim"`  
问了 SOF 都没有办法，按照一个建议直接上 macvim 了  
macvim 就遍地都是了，支持常用的 Mac 快捷键，还有个 GUI  
下载👉[MacVim](//www.macupdate.com/app/mac/25988/macvim)  
直接下载 `.tbz` 的包，解压之后把 `MacVim.app` 拷贝到程序里面  
如果你想直接在shell中使用 `mvim` 命令的话  
1. `cd /usr/local`
2. `sudo mkdir bin`
3. `sudo cp -f /你的mvim的路径/mvim /usr/local/bin/`
  
在 zsh 的配置文件里添加这个把原来的老版本 vim 给替换掉，**macvim里面也是vim**  
```
alias vim='mvim '
```
***  
以上


