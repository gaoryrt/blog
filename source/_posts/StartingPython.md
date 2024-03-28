---
title: 开始Python
date: 2015-09-27 15:02:04
tags: [python, howto, abc]
categories: 扫盲教育
---
 开始学习python  
 [廖雪峰的官方网站](//www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/0014316090478912dab2a3a9e8f4ed49d28854b292f85bb000)上面有python3的详细教程  
 按照这个一步一步来吧  
 <!--more-->
***  
# 在MAC上安装Python
> MacOS 10.2 (Jaguar), 10.3 (Panther), 10.4 (Tiger) and 10.5 (Leopard) already include various versions of Python.  
  这几个版本都是自带了的，虽然是2.7版本的  
  2.X和3.X不兼容  
  
  最新版的python是3.5.0的  
  1.如果有`homebrew`的话可以用命令: `brew install python3`  
  但是不晓得是网络问题还是系统版本问题，反正电脑烫了好一会儿没有安装好。  
  2.还可以在[python官网下载地址](https://www.python.org/downloads/mac-osx/)下载安装包，我搬百度云算了。  
  > 链接: http://pan.baidu.com/s/1dD6UojJ 密码: kjjk  
    
  我用的这个.pkg安装的，安装完了之后还送我两个app:   
  IDLE.app  和 PythonLauncher.app  
  IDLE是命令行交互环境，PythonLauncher是Python的解释器  
  
# hello world  
安装好了可能要重启一下  
打开IDLE就可以开始了！！！  
> 交互式环境的提示符是 `>>>`  
  
```
>>> print('hello world') 
hello world  
```

使用这个来退出 -> `quit()`  
***
# 用文件编辑器编辑保存并在终端中运行  
**python文件都是以`.py`结尾的**
## 用文件编辑器编辑  
这几天下载了atom  
比起sublime text，`cmd + z`的时候不会把我拼音算进去。~~方便多了哟~~  
新建文件`python.py`用atom打开  
编辑 
```
python('hello world')
```
保存  
## 在终端中运行  
先要cd到`.py`所在的文件夹然后再使用
```
python python.py
```
输出为`hello world`
### 直接运行`.py`文件
在`.py`文件首行加上这一句
```
#!/usr/bin/env python3 
```
然后使用`chmod a+x`来给文件运行权限  
>简单说一下 
chmod是添加更改权限命令
a是指所有的用户组，包括root用户组，文件拥有者的用户组，还有其他用户组:
u 表示该文件的拥有者[user]，
g 表示与该文件的拥有者属于组(group)，
o 表示其他用户[other]，
a 表示这三者皆是[all]。
+x是指添加执行权限。
+x是执行权限，+r是阅读权限，+w是写入权限
\- 表示取消权限。
= 表示唯一设定权限。  
r 表示有可读取的权限，
w 表示有可写入的权限，
x 表示有可执行的权限  
  
### 在终端中直接使用命令行交互环境 
在终端里面直接`$ python`就行了  
你看到最后是`>>>`而不是常见的`$`，那么你就在python命令行交互环境中了  
注意  在命令行中要用`print()`才有输出，然而在命令行交互环境中只能一行一行，立即执行  
那么，在命令行交互环境中运行`.py`文件的话。。。  
是的，每一行结果都会打印出来。而需要输入才能执行的语句会报错。
***  
### I/O
直接上程序  
`InputNOutput.py`
```
#!/usr/bin/env python3 
name = input('please enter your name: ')
print('hello,', name)
```
# 基础语法  
跟java、c的差不多，我就写写我看到的不同点、新知识  
* `print('空','格')` 出来是 `空 格`，中间的逗号变成了空格 
* 关于中文乱码，尝试在首行加上   
`# -*- coding: utf-8 -*-` 或者  
`# -*- coding: unicode -*-` 
*  可以直接在`print()`里面加函数例如   
```
print('x','*','y','=',int(input('请输入第一个数'))*int(input('请输入第二个数')))
```
执行的话会输入两次再输出  
*  但是
```
print(x,'*',y,'=',int(input('请输入第一个数',x))*int(input('请输入第二个数',y)))
```
并不能编译成功，因为x和y在定义之前就调用了  
*  `x=input()`然后`type(x)`出来会是`<class 'str'>` 也可能是`<class 'int'>`，swift也是这样自动预测的optional。
*  每一行都是一条命令，缩进使用`:`符号，之后的句子用四个空格开头，表示缩进 
*  `if(1>0):`然后`ctrl+↩︎`可以实现在命令行交互环境中换行，后面随便写一句`print('yeah')`可以正常输出
*  python是大小写敏感的
