---
title: [笨办法学 Python,习题37]
comments: false
date: 2015-11-20 12:45:36
categories: CMD:CV
---
复习 Python 中的**符号**和**关键字**  
<!--more-->  
***
# Keywords（关键字）
## **and**
逻辑与。从左到右，如果全真返回最后一个真的值，如果有假返回第一个假值
```
print "a" and "b"		# b
print "a" and False		# False
print "a" and "b" and 3		# 3
```

## **or**
逻辑或。从左到右，如果全假返回最后一个假的值，如果有真返回第一个真值
```
print False or False		# Flase
print False or "a"		# a
print False or "b" or 3		# b
```

## **not**
逻辑否。除了 False，其他都是 True。
```
print not False			# True
print not "3"			# False
```

## **del**
删除。
```
print a = [1, [2*4, "3"]]		# [1, [8, '3']]
print del a[1:1]			# [1, [8, '3']]
print del a[1:2]			# [1]
```
## **import**
导入模块。查找模块的顺序：程序所在文件夹->标准库的安装路径->环境变量中 path 包含的路径
```
import sys
print('================Python import mode================')
for i in sys.path:
    print i
```

## **import**+**as**
使用自定义的别名导入模块。
```
import sys as sss
print('================Python import mode================')
for i in sss.path:
    print i
```

## **from**
和 import 一起，用于导入特定模块。
```
from sys import path
print('================python from import================')
for i in path:
    print i
```
也可以直接用`*`导入所有的模块。
```
from sys import *
print('================python from * ================')
for i in path:
    print i
```


## **while**
基本循环。
```
i = 0
while i < 4:
    print i
    i += 1
```
## **with**+**as**
用于对资源访问进行控制的场合，作为 try/finally 编码范式的一种替代。
```
with open("test.py") as file:
    data = file.read()
    print data
```
等于
```
file = open("test.py")
try:
    data = file.read()
    print data
```
实际上是这样,利用 `__exit__` 中的 val，type，trace 来处理异常。
```
class Sample:
    def __enter__(self):
        print "In __enter__()"
        return "Foo"

    def __exit__(self, type, value, trace):
        print "In __exit__()"


def get_sample():
    return Sample()


with get_sample() as sample:
    print "sample ", sample
```


## **if**+**elif**+**else**
没有 switch，但是有 elif。
```
a = [1, 2, 3]
for i in a:
    if i == 1:
        print i + 1
    elif i == 2:
        print i + 2
    else:
        print i + 3
```

## **global**
全局变量。
```
def change():
    global x
    print 'Before', x
    x = 2
    print 'Changed', x
x = 50
change()
print 'After all the changes', x
```
没有这个 global 的话会直接报错说x没有赋值（Python 2.7.10）

## **assert**
断言。可自定义AssertionError错误。
```
# -*- coding: utf -8 -*-
from socket import gethostname, gethostbyname
from exceptions import AssertionError


def get_local_ip():
    '''
       Return local host ip.
    '''
    ip = gethostbyname(gethostname())
    assert ip != '127.0.1.1', '''
    No network connect, please the network connect again!
    '''
    return ip


try:
    print get_local_ip()
except AssertionError,  e:
    print e
```
这里 ip 是 `127.0.1.1` 的时候就会报错`No network connect, please the network connect again!`
## **pass**
空语句。为保证程序结构的完整性，用于占位。

## **yield**
把函数变成生成器。
[Python yield 使用浅析 - 廖雪峰](https://www.ibm.com/developerworks/cn/opensource/os-cn-python-yield/)
```
def fab(max): 
    n, a, b = 0, 0, 1 
    while n < max: 
        yield b 
        a, b = b, a + b 
        n = n + 1 
```
这时，fab(5) 这个『实例』就具有了类似 xrange() 占用内存小的特点，它也变成了一个生成器：
```
for i in fab(50):
	print i
```
也可以手动调用 fab(5) 的 next() 方法（因为 fab(5) 是一个 generator 对象，该对象具有 next() 方法）

## **break**
跳出循环。用于终止 for ，while 的循环语句。如果有多层嵌套，也只会跳出最里层的循环。
## **try**+**except**+**finally**
用于捕获异常。尝试运行这个代码，然后把 `1/0` 改成 `1/1` 再试试。
```
try:
    1/0
except:
    print 'something wrong happened..'
else:
    print 'it seems i cannot be with except'
finally:
    print 'whatever happened, this line will be executed'
```

## **print**
输出到控制台。
## **class**
类定义。
```
class animal(name):
    """docstring for animal"""
    def __init__(self, arg):
        super(animal, self).__init__()
        self.arg = arg

    def bark():
        print "ooo!"

    Name = name
```
## **exec**
执行python语句，which储存在字符串或者文件中。
```
exec 'print "hello world"'
```
## **in**
查找字符串。
```
a = "abcdefg"
input("please input a character") in a
```
返回 True 或 False

## **raise**
抛出自定义异常。
```python
try:
     s = None
     if s is None:
         print "s 是空对象"
         raise NameError     #如果引发NameError异常，后面的代码将不能执行
     print len(s)
except TypeError:
     print "空对象没有长度"
```
## **continue**
跳出本次循环。
```
for x in range(10):
    if x == 5:
        continue
    print x
```
输出没有5，被 continue 跳过了。

## **is**
is检查两个对象是否是同一个对象,而==检查他们是否相等。  
其实python中的is比较的对象很像C语言中的指针,只有地址相同的指针才是同一个指针。  

## **return**
为函数返回值。和其他的语言一样。
## **def**
定义函数。  
[Python中的函数（一）](//www.cnblogs.com/dolphin0520/archive/2013/03/14/2954733.html)  
[Python中的函数（二）](//www.cnblogs.com/dolphin0520/archive/2013/03/18/2966674.html)
```
def display(a='hello',b='wolrd'):
    print a+b

display()
display(b='world')
display(a='hello')
display('world')
```
可以在定义时提供缺省值。
```
def insert(a,L=[]):
    L.append(a)
    print L

insert('hello')		# ['hello']
insert('world')		# ['hello', 'world']
```
在重复调用函数时默认形参会**继承之前一次**调用结束之后该形参的值。
```
def printvalue(a, **d):
    print 'a = %d' % a
    for x in d:
        print x + ' = %d' % d[x]

printvalue(a=1, b=2, c=3)
```
`*` 和 `**` 表示能够接受0到任意多个参数，`*` 表示将没有匹配的值都放在同一个元组中，'**'表示将没有匹配的值都放在一个dictionary中。
```
def function():
    x=2
    y=[3,4]
    return x,y

print function()	# <2, [3, 4]>
```

## **for**
循环。
```
li = ['a', 'b', 'c', 'd', 'e']
for i in range(len(li)):
    print li[i]
```

## **lambda**
匿名定义函数。
```
g = lambda x : x**2
print g(4)
```
等于
```
def f(x):
return x**2
print f(4)
```
***
# 字符串转义序列(Escape Sequences)
`\\` 反斜杠
`\'` 单引号
`\"` 双引号
`\a` 响铃
`\b` 退格
`\f` 换页
`\n` 换行
`\r` 回车
`\t` 横向制表符
`\v` 纵向制表符
***
# 字符串格式化(String Formats)
`%d` 十进制整数
`%i` 十进制整数
`%o` 八进制整数
`%u` 十进制整数
`%x` 十六进制整数 小写
`%X` 十六进制整数 大写
`%e` 指数
`%E` 指数
`%f` 浮点数
`%F` 浮点数
`%g` 根据显示长度为指数或浮点数
`%G` 根据显示长度为指数或浮点数
`%c` 单个字符
`%r` 字符串 repr()
`%s` 字符串 str()
`%%` 字符%
***
# 操作符号
`+` 加
`-` 减
`*` 乘
`**` 次方
`/` 除
`//` 浮点除，四舍五入
`%` 取余数
`<` 小于
`>` 大于
`<=` 小于等于
`>=` 大于等于
`==` 等于
`!=` 不等于
`<>` 不等于
`( )` 元组
`[ ]` 列表
`{ }` 字典
`@` 从第一个函数修饰符开始，自下而上做参数传递，这样实际是使用了约定的函数修饰符达到函数嵌套的目的。
`,` 参数传递时分隔，元组转换，输出无换行
`:` 函数，循环，if条件，类定义等后面有冒号
`.` 调用某个类的方法或成员
`=` 赋值
`;` 语句结束
`a += b` a = a + b
`a -= b` a = a - b
`a *= b` a = a * b
`a /= b` a = a / b
`a //= b` a = a // b
`a %= b` a = a % b
`a **= b` a = a ** b

 