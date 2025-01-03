---
title: 「转」PEP8中文翻译
comments: false
date: 2015-10-21 22:57:43
categories: 扫盲教育
---
自己翻译了一些发现了一个更好的版本  
转过来[PEP8中文翻译](//wiki.hiaero.net/doku.php?id=python:pep8&do=edit&rev=0)  
侵权删
<!--more-->
***
====== PEP8中文翻译 ======

本文仅代表个人认知、观点、经验，May be Stupid!

===== 什么是PEP =====

PEP是 //Python Enhancement Proposal// 的缩写，翻译过来就是 //Python增强建议书// 。

===== PEP8 =====

译者：本文基于 2013-08-02 最后修改的 PEP8 版本翻译，若要查看英文原文，请参考[[http://www.python.org/dev/peps/pep-0008/|PEP8]]

==== 简介 ====

本文档给出的编码约定，来源于 Python 主发行版标准库中的代码。Python 的 C 语言实现所使用的 C 语言风格指南，请参考[[http://www.python.org/dev/peps/pep-0007/|PEP7]]。

本文档与 PEP 257（文档字符串规范）都来自于 Guido((Python 之父 Guido Van Rossum)) 的 //Python Style Guido// 论文原文，另外有来自 //[[http://barry.warsaw.us/software/STYLEGUIDE.txt|Barry's style guide]]// 的补充。

随着 Python 语言自身的改变，本指南也在持续演进，新的编码约定被认同，而旧的矣被废弃。

许多项目都有一套专有的编码风格指南，当冲突发生时，应以项目编码规范为优先。

==== 愚蠢的一致性就像没有脑子的妖怪 ====

Guido 的一个核心观点认为，相比于被编写，代码更多的是被阅读。这篇指南意在提高代码的可读性并使之在广袤的 Python 编码中保持风格一致。就像 PEP 20 所表述的，"可读性当被重视((Readability counts，参见[[http://www.python.org/dev/peps/pep-0020/|PEP 20]]))".

风格指南即一致性指南。本文档中描述的一致性是重要的，一个项目内代码的一致性则更重要一些，而一个模块或方法中代码的一致性则是最重要的。

但最终要的是：知道什么时候去打破一致性 --- 风格指南并不总是适用。当存在不确定性时，做出你最好的抉择。你可以看看别人的代码是怎么写的，选择一种看起来最好的，并及时发问！

特别注意：不要为了遵守本 PEP 而破坏代码的向后兼容性!

当以下情况发生时，也是忽略某个风格指南的好理由：
  * 当遵守指南会降低代码可读性，甚至对于那些依循 PEP 去阅读代码的人也是这样时。
  * 当遵守指南会与其他部分的代码风格背离时 --- 当然也许这是一个修正某些混乱代码的机会。
  * 当那些并没有遵循指南的旧代码已无法修改时。
  * 当你的代码需要与旧版本的 Python 保持兼容，而旧版本的 Python 不支持指南中提到的特性时。

==== 代码布局 ====

=== 缩进 ===

每次缩进使用 4 个空格。

续行((译者注：将一个逻辑行分为多个物理行时除第一行之外的行))应该与被圆括号、方括号、花括号包裹起来的其他元素对齐，或者使用悬挂式缩进。当使用悬挂式缩进时，应该遵循这些注意事项：第一行不能有参数，应该使用进一步的缩进来将续行与其他行区分开。

符合本约定的代码：
<code python>
# Aligned with opening delimiter
foo = long_function_name(var_one, var_two,
                         var_three, var_four)

# More indentation included to distinguish this from the rest.
def long_function_name(
        var_one, var_two, var_three,
        var_four):
    print(var_one)
</code>

不符合本约定的代码：
<code python>
# Arguments on first line forbidden when not using vertical alignment
foo = long_function_name(var_one, var_two,
    var_three, var_four)

# Further indentation required as indentation is not distinguishable
def long_function_name(
    var_one, var_two, var_three,
    var_four):
    print(var_one)
</code>

可选的符合约定的代码：
<code python>
# Extra indentation is not necessary.
foo = long_function_name(
  var_one, var_two,
  var_three, var_four)
</code>

结尾的方括号/圆括号/花括号应该被放置在多行内容的最后一行的第一个非空字符的正下方((译者注：例如下例中']'被放到'4'的正下方))，如下所示：

<code python>
my_list = [
    1, 2, 3,
    4, 5, 6,
    ]
result = some_function_that_takes_arguments(
    'a', 'b', 'c',
    'd', 'e', 'f',
    )
</code>

或者被放置在多行内容的起始行的第一个字符的正下方((译者注：例如下例中')'被放到'r'的正下方))，如下所示：

<code python>
my_list = [
    1, 2, 3,
    4, 5, 6,
]
result = some_function_that_takes_arguments(
    'a', 'b', 'c',
    'd', 'e', 'f',
)
</code>

=== 制表符还是空格 ===

空格是首选的缩进方式。

为了保持一致性，在使用了制表符作为缩进的代码中，应该保持使用制表符。

Python 3 不支持空格缩进与制表符缩进混用。

Python 2 中的混用缩进代码也应该被转换为统一使用空格。

当使用 -t 选项来调用 Python 2 命令行工具时，运行混用缩进的代码会报出警告，当使用 -tt 选项时，运行混用缩进的代码会报出错误。强力建议使用这两个选项。

=== 单行最大长度 ===

将所有的行限制在79个字符以内。

对于那些具有很少的结构约束（例如文档字符串、注释）的代码段来说，最大行长度应该在在72个字符以内。

限制代码编辑窗口的宽度使并排编辑多个文件成为可能，并且在使用代码审核工具时，可以很好的在两个相邻列中显示不同的代码版本。

很多工具中的默认换行设置破坏了代码的可视结构，使其更难被理解。某些编辑器在换行时会在行尾放置标记字符，若限制代码的最大的长度，可以在这些最大宽度只有80个字符的编辑器中避免换行。而一些基于Web的工具也许根本不会提供动态自动换行功能。

一些团队更喜欢较长的单行代码。如果某个团队对单行代码长度的问题达成了共识，并且由该团队专门维护其代码的话，在将文档字符串与注释保持在72个字符以内的前提下，将名义上的单行代码的最大长度从80个字符提升到100个也是可以的（有效的将实际字符最大长度提高到了99个）。

Python 标准库是保守的，选择了将单行代码长度限制在79个字符以内（文档字符串/注释72个字符以内）。

最为推荐的长行换行方式是在圆括号、方括号、花括号内的 Python 隐式行续((译者注：即无需转义，在括号内直接换行))。相比于使用反斜杠来转义续行，应该优先使用将长行放置于圆括号内来隐式续行的方式。

而某些时候反斜杠也是适于使用的。例如，较长的with语句不能使用隐式行续，就需要使用反斜杠了:

<code python>
with open('/path/to/some/file/you/want/to/read') as file_1, \
        open('/path/to/some/file/being/written', 'w') as file_2:
    file_2.write(file_1.read())
</code>

另一个案例是，assert语句中也需要反斜杠。

确保使用适当的行续缩进。在二元操作符两端，换行的推荐位置是在操作符之后，而不是操作符之前。以下是一些例子：

<code python>
class Rectangle(Blob):

    def __init__(self, width, height,
                 color='black', emphasis=None, highlight=0):
        if (width == 0 and height == 0 and
                color == 'red' and emphasis == 'strong' or
                highlight > 100):
            raise ValueError("sorry, you lose")
        if width == 0 and height == 0 and (color == 'red' or
                                           emphasis is None):
            raise ValueError("I don't think so -- values are %s, %s" %
                             (width, height))
        Blob.__init__(self, width, height,
                      color, emphasis, highlight)
</code>

=== 空白行 ===

使用两个空白行来分隔顶级函数定义、类定义。

使用单个空白行来分隔类内的方法定义。

额外的空白行可以被（尽量少的）用来分隔几组相关的函数。在一堆相关的单行代码之间，空白行应该被省略。

在函数中（尽量少的）使用空白行来区分逻辑代码块。

Python 将 control-L (也就是, ^L) 换行符认作空白符。在许多工具中都将 control-L 识别做分页符，可以使用其来分页。但是注意，在某些编辑器或基于Web的代码浏览器中，control-L 是不会识别作换行符的，会被做为其他字符显示。

=== 源文件编码 ===

在 Python 的核心发布版中，应该主要使用 UTF-8 编码（或者在 Python 2 中使用 ASCII）。

在 Python 2 中使用 ASCII ，在 Python 3 中使用 UTF-8 时不应该在文件中进行编码声明。

在标准库中，往往只有以测试为目的的代码或包含非 ASCII 编码字符的作者名的注释中，才会使用非默认编码。否则，则推荐使用 \x, \u, \U, \N 等转义字符来在字符串文本中表示非 ASCII 字符。

在 Python 3.0 与更高级的 Python 版本中，对 Python 标准库的源文件编码作出了如下规定((参见 [[http://www.python.org/dev/peps/pep-3131/|PEP 3131]]))：Python 标准库中的所有标示符必须仅使用 ACSII 编码的字符，在任何可能的时候都使用英文书写（在许多情况下，缩写名词和技术术语使用的是非英文）。另外，字符串文本与注释也必须使用 ASCII 编码。唯一的例外，是测试非 ASCII 编码特性的测试案例，与作者名的书写。对于非拉丁字符的作者名，应该将其翻译为拉丁字母书写。

推荐那些面向全球范围内开发者、用户的开源项目也遵循上述规定。

=== 导入 ===

  *import语句通常应该独立成行，例如：\\ \\ <code python>
#符合约定的代码：     
import os
import sys

#不符合本约定的代码：  
import os,sys
</code> 但这样的import也是的合理的：<code python>
from subprocess import Popen, PIPE
</code>

  *Import 语句总应该被放到放到源码文件的最前端，即在模块注释与文档字符串之后，全局变量与常量定义之前。\\ \\ 多条 Import 语句总应该遵循这样的顺序书写：\\ \\ 1.  标准库的导入 \\ 2.  相关第三方库导入 \\ 3.  本地应用/库的相关导入 \\ \\ 在每组 import 语句应该使用空白行分隔。\\ \\ Put any relevant <nowiki>__all__</nowiki> specification after the imports.((译者注：这句没有翻出来))

  *建议使用绝对导入形式的 import 语句，它不仅更易读，并且在配置错误（例如某个包中的目录以 sys.path 结尾时)时有更良好的导入行为（至少有更好的报错）：\\ \\ <code python>
import mypkg.sibling
from mypkg import sibling
from mypkg.sibling import example
</code> 相比于绝对导入，清晰的相对导入其实也是可以接受的，特别是当使用绝对导入需要处理不必要的复杂包布局时。<code python>
from . import sibling
from .sibling import example
</code> Python 标准库代码应该避免复杂的包布局，并且总是使用绝对导入。\\ Python 3 中不应该使用相对导入，并且 Python 3 中该功能已被移除。

  *当在某个包含类的模块中导入类时，这样的书写方式是合理的：\\ \\ <code python>
from myclass import MyClass
from foo.bar.yourclass import YourClass
</code> 但如果这样的书写方式引起类名冲突，则请这样书写：\\ <code python>
import myclass
import foo.bar.yourclass
</code> 并使用 "myclass.MyClass" 和 "foo.bar.yourclass.YourClass" 来对其进行引用。

  *通配符导入（from <module> import *）应该被禁止，因为这样做会导致在被导入的命名空间中存在哪些命名对象变得不清晰，迷惑读者与其他自动化工具。不过要使用通配符导入，也有站得住脚的理由：需要将内部 API 重新发布为公共 API（例如，使用纯 Python 重写一个可选加速模块的借口，而事先你并不知道这个接口将被重写）。 \\  \\ 当以这样的方式重发布命名时，下述的编码指南依然适用。

==== 表达式与语句中的空白符 ====

=== 小问题 ===

在以下情况中避免使用额外的空格：

  *在圆括号、方括号、花括号内 \\ \\ <code python>
#符合约定的代码
spam(ham[1], {eggs: 2})
#不符合约定的代码
spam( ham[ 1 ], { eggs: 2 } )
</code>

  *在逗号、分号、冒号之前： \\ \\ <code python>
#符合约定的代码
if x == 4: print x, y; x, y = y, x
#不符合约定的代码
if x == 4 : print x , y ; x , y = y , x
</code>

  *在函数调用的参数列表的左括号前 \\ \\ <code python>
#符合约定代码
spam(1)
#不符合约定的代码
spam (1)
</code>

  *在切片或索引的左方括号前 \\ \\ <code python>
#符合约定的代码
dict['key'] = list[index]
#不符合约定的代码
dict ['key'] = list [index]
</code>

  *在赋值（或其他）操作符两侧的多余一个的空格 \\ \\ <code python>
#符合约定的代码
x = 1
y = 2
long_variable = 3
#不符合约定的代码
x             = 1
y             = 2
long_variable = 3
</code>

=== 其他建议 ===

  *总是在下列二元操作符的两端使用单个空格：赋值操作符<nowiki>(=)</nowiki>，参数赋值(+=, -= 等)，比较操作符(==, <, >, !=, <>, <=, >=, in, not in, is, is not)，布尔操作符(and, or, not)。

  *加入使用了多个具有不同优先级的操作符，考虑在低优先级的操作符两侧使用空格。请自行判断，无论怎样，不要使用多余一个空格，并且保持二元操作符两端的空格数量一致。\\ \\ <code python>
#符合约定的代码
i = i + 1
submitted += 1
x = x*2 - 1
hypot2 = x*x + y*y
c = (a+b) * (a-b)
#不符合约定的代码
i=i+1
submitted +=1
x = x * 2 - 1
hypot2 = x * x + y * y
c = (a + b) * (a - b)
</code>

  *不要在指示关键字参数或参数默认值的 = 符号两端使用空格。 \\ \\ <code python>
#符合约定的代码
def complex(real, imag=0.0):
    return magic(r=real, i=imag)
#不符合约定的代码
def complex(real, imag = 0.0):
    return magic(r = real, i = imag)
</code>

  *不建议使用符合语句（在一个物理行中存在多条语句）。 \\ \\ <code python>
#符合建议的代码
if foo == 'blah':
    do_blah_thing()
do_one()
do_two()
do_three()
#不符合建议的代码
if foo == 'blah': do_blah_thing()
do_one(); do_two(); do_three()
</code>

  *虽然有时把较短小的 if/for/while 语句放在同一物理行内也是可以的，但千万不要对多子句的语句也这样做，同时也是为了避免折叠长行。 \\ \\ <code python>
#不符合约定的代码
if foo == 'blah': do_blah_thing()
for x in lst: total += x
while t < 10: t = delay()
#绝对不要这样写
if foo == 'blah': do_blah_thing()
else: do_non_blah_thing()

try: something()
finally: cleanup()

do_one(); do_two(); do_three(long, argument,
                             list, like, this)

if foo == 'blah': one(); two(); three()
</code>

==== 注释 ====

与代码相矛盾的注释不如没有，请时刻保持注释随代码更新。

注释应该是完整的句子。短语注释或整句注释都应当以大写字母开头，除非该注释以首字母小写的标示符开头。

段小注释后的句号可以省略，而在注释块中，每个完整的句子都应该以句号结尾。

在句尾句号之后，应该跟上两个空白符。

当撰写英文注释时，参考《英文写作指南((译者注：作者是小威廉·斯特伦克（William Strunk, Jr.）和E.B.怀特（Elwyn Brooks White），因此此书也被称 //Strunk & White// ))》

非英语程序员也请使用英文书写注释，除非你120%的保证，不会有不使用你的语言的人阅读你的代码。

=== 块注释 ===

通常快注释用来阐述跟在其后的代码，并且与代码一样重要。块注释中的每一行都应该以一个 # 符号加一个空白符开头（除非是注释块内的缩进行）。

块注释内的自然段以 # 开头的空行分割。

=== 行内注释 ===

尽量少的使用行内注释。

行内注释应该与语句在同一行内，与语句之间以至少两个空白符分割，并且以一个 # 符号加一个空白符开头

行内注释不是非常必要，并且当注释语义显而易见时会分散阅读者的注意力。例如，不要撰写这样的注释：
<code python>
x = x + 1                 # Increment x
</code>

但某些时候，行内注释也是很有用的
<code python>
x = x + 1                 # Compensate for border
</code>

=== 文档字符串 ===

关于编写好文档字符串的约定，请参考 [[http://www.python.org/dev/peps/pep-0257/|PEP 257]] 。

请为所有的公开模块、类和方法编写文档字符串。对于非公开的方法，文档字符串不是必须的，但是仍应该为其撰写注释，表明其用途。方法注释应写在方法定义行之下。

PEP 257 描述了良好文档字符串的编写规范。注意，以 """ 结尾的文档字符串应该以该符号单独成行，最好前面还有一行空白行。 例如：
<code python>
"""Return a foobang

Optional plotz says to frobnicate the bizbaz first.

"""
</code>

对于单行的文档字符串来说，将 """ 放在该行的末尾也是可以的。

==== 版本注记 ====

如果你的代码中需要有版本变更标记，请像这样书写。
<code python>
__version__ = "$Revision: 70b79ccd671a $"
# $Source$
</code>

以上内容请

These lines should be included after the module's docstring, before any other code, separated by a blank line above and below.


