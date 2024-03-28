---
title: Mac 下搭建汇编环境
comments: false
date: 2015-11-18 17:39:26
categories: 扫盲教育
---
注意我搞的是32位的  
汇编有很多不同的编译器，每个编译器的语法都不一样  
尝试了 gcc，但是下载了半个小时卡在了 make 上面  
也就是说我不能用 gcc 连接了，还好有 ld  
然后查了好久才终于搞出来一个在 OSX 上面能够编译连接运行的汇编环境  
sublime text 3 + x86 and x86_64 Assembly + nasm + zsh  
<!--more-->
***  
# 装nasm
看看有没有安装 nasm  
```
nasm -v
```
没有就装一个，貌似 brew 上有，自己装一个  
```
brew install nasm
```
安装好了的后查询版本应该是这样的  
```
NASM version 2.11.08 compiled on MM DD YYYY
```
***
# 高亮/补全插件 for sublime
装 sublime 和 package control的过程就不仔细讲了  
找个补全和高亮的插件，我用的`x86 and x86_64 Assembly`  
***
# 写一个汇编的 hello world
```
global start

section .text
start:
    push    dword msg.len
    push    dword msg
    push    dword 1
    mov     eax, 4
    sub     esp, 4
    int     0x80
    add     esp, 16

    push    dword 0
    mov     eax, 1
    sub     esp, 12
    int     0x80

section .data

msg:    db      "hello world", 10
.len:   equ     $ - msg
```
我这里存为`32.asm`  
***
# ld 命令
这个命令就是用来链接用的，没有的话请下载一个 Xcode
我相信你有  
***
# 编译/链接/运行
注意，mac上面的gcc编译`.o`文件的时候默认的入口是`_main`，而使用`ld`命令时，默认的是`start`。
```
nasm -f macho 32.asm
ld -macosx_version_min 10.7.0 -o 32 32.o
./32
```
***
# zsh alias
上面的太长了，每次编译连接都要写一大串。。。  
我懒，我这样搞的别名  
```
alias comp="nasm -f macho "
alias lk="ld -macosx_version_min 10.7.0 -o"
```
这样的话，三行就简单多了  
```
comp 32.asm
lk 32 32.o
./32
```
***

以上
