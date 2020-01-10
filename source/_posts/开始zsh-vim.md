title: 开始zsh+vim+iTerm
date: 2015-09-28 20:40:52
tags: [abc,howto,mac]
categories: [Geek Talks · 奇客怪谈]
---
bash是mac中terminal自带的shell<br>把它换成zsh，这个的功能要多得多<br>恩 vim是神的编辑器，emacs是编辑器之神<br>mac自带vim，但是需要升级加插件等过程来调教<br>
iTerm2则是另外一款替代原有terminal的软件，可以设置的选项很多，至少颜色显示比自带的terminal多
<!--more-->  

# 安装zsh
使用这个命令可以看到你的系统有几个shell
```
cat /etc/shells
```
回显是这个
```
/bin/bash
/bin/csh
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
```
有zsh就不用安装了，直接用下面的命令设置默认shell就行
```
chsh -s /bin/zsh
```
github上面有个[oh my zsh](https://github.com/robbyrussell/oh-my-zsh)写的很清楚了，跟着一步一步来。  

然后直接打开新的terminal就行了  

zsh的配置文件在这里：`~/.zshrc`  
直接打开没啥东西的，需要用这个oh my zsh来调教：
```
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
之后你的`~/.zshrc`文件里面就有东西了  
比如[主题](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)自选  
>我使用的是一款叫做`bullet-train`的主题，效果如图  
![image](//ww1.sinaimg.cn/large/a243ad6cjw1ewjavx0wzfg20mi0gk4bw.gif)  
有个蓝色的箭头很是花哨啊。。。然后可以显示这个目录下的git状态  
  
  
## 更改主题
修改文件`~/.zshrc`中的`ZSH_THEME`一行，改成这个
```
ZSH_THEME="bullet-train"
```
重新打开一个terminal就行了  
如果没有箭头，只有方框+问号的话，还需要安装powerline  
这是一个字体增强的软件，就是往字体库里面新加了一个字体  
在github可以直接下载然后执行`install.sh`来安装👉[Powerline-patched font](https://github.com/powerline/fonts)  
一步一步的安装方法参见👉[powerline的文档](https://powerline.readthedocs.org/en/latest/installation/linux.html#font-installation)  
然后在你的终端gui设置里面，把字体改成后缀为`powerline`的字体就行了  
## 配置
就是更改`.zshrc`的内容  
我就新增了几个  
```
plugins=(git autojump osx sudo)
//新增了几个插件：autojump、osx、sudo，分别是快速跳转，osx增强，和双击esc添加sudo
[[ -s ~/.autojump/etc/profile.d/autojump.sh ]] && . ~/.autojump/etc/profile.d/autojump.sh
source /usr/local/lib/z.sh
//可能autojump需要重新安装吧，git上有详细过程
alias vim='mvim '
//懒得输入mvim了
alias cls='clear'
//清屏
alias -s py=vi
//py结尾的用vi打开
alias hdg='hexo d -g'
//hexo deploy的快捷键
```

以后更新博客就方便多了，不用在finder里找hexo文件夹然后`Go2shell`然后`hexo d -g`了  
直接`j hexo` 然后 `hdg`就好了
***
# 安装iTerm2 
看图
![terminal](//ww1.sinaimg.cn/large/a243ad6cjw1ewjbfumlbyj20iy0elq3p.jpg)  
**👆terminal  **
  

  
![iTerm2](//ww1.sinaimg.cn/large/a243ad6cjw1ewjbfm6iupj20iy0fn750.jpg)
**👆iterm2  **注意看颜色  
下载地址看这里👉[iTerm官网](http://www.iterm2.com)
然后看这篇文章👉[你应该知道的 iTerm2 使用方法--MAC终端工具](http://wulfric.me/2015/08/iterm2/)👈这个博客写的很好的说  
***  
# vim的安装
mac自带的vim是7.3版本的  
尝试升级失败，开了ss都一直是`Error: Failed to download resource "vim"`  
问了SOF都没有办法，按照一个建议直接上macvim了  
macvim就遍地都是了，支持常用的Mac快捷键，还有个GUI  
下载👉[MacVim](http://www.macupdate.com/app/mac/25988/macvim)  
直接下载`.tbz`的包，解压之后把`MacVim.app`拷贝到程序里面  
如果你想直接在shell中使用 `mvim` 命令的话  
1. `cd /usr/local`
2. `sudo mkdir bin`
3. `sudo cp -f /你的mvim的路径/mvim /usr/local/bin/`
  
在zsh的配置文件里添加这个把原来的老版本vim给替换掉，**macvim里面也是vim**  
```
alias vim='mvim '
```
***  
以上


