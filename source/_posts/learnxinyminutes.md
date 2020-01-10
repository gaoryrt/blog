title: 「转」learn x in y minutes - python
comments: false
date: 2015-10-22 10:59:11
categories: 疑似机器人
---
**搬运自[learnxinyminutes-docs](https://github.com/adambard/learnxinyminutes-docs)  
文档地址[python.html.markdown](https://github.com/adambard/learnxinyminutes-docs/blob/master/python.html.markdown)**
<!--more-->
***  

>language: python
contributors编撰者:
    - ["Louie Dinh", "http://ldinh.ca"]
    - ["Amin Bandali", "http://aminbandali.com"]
    - ["Andre Polykanine", "https://github.com/Oire"]
    - ["evuez", "http://github.com/evuez"]
filename: learnpython.py


*Python was created by Guido Van Rossum in the early 90s. It is now one of the most popular
languages in existence. I fell in love with Python for its syntactic clarity. It's basically
executable pseudocode.* 
Python 是90年代初由 Guido Van Rossum 发明的。这是当今最热门的语言之一。我最爱 Python 的简洁语法。它简直就是可执行的伪代码。  

*Feedback would be highly appreciated! You can reach me at [@louiedinh](http://twitter.com/louiedinh) or louiedinh [at] [google's email service]8*
我们期待你的反馈：[@louiedinh](http://twitter.com/louiedinh) 或 louiedinh@gmail.com  

Note: This article applies to Python 2.7 specifically, but should be applicable
to Python 2.x. Python 2.7 is reachong end of life and will stop beeign maintained in 2020,
it is though recommended to start learnign Python with Python 3.  
注意： 这篇文章特别应用于 Python2.7版本，也可用于 Python2.x。Python 2.7将一直支持到2020年，是时候建议你开始学习 Python 3了。  
  
For Python 3.x, take a look at the [Python 3 tutorial](http://learnxinyminutes.com/docs/python3/).  
对于 Python 3.x 的学习者， 参见[Python 3 tutorial](http://learnxinyminutes.com/docs/python3/)。  

It is also possible to write Python code which is compatible with Python 2.7 and 3.x at the same time,
using Python [`__future__` imports](https://docs.python.org/2/library/__future__.html). `__future__` imports
allow you to write Python 3 code that will run on Python 2, so check out the Python 3 tutorial.  
使用[`__future__` imports](https://docs.python.org/2/library/__future__.html)来写 Python 代码可以让 Python 2.7 和 3.x 版本和谐共处。`__future__` imports 可以让你在 Python 2 环境下运行 Python 3的代码，详见 Python 3 教程。

```python

# Single line comments start with a number symbol.
# 单行注释用井号打头

""" Multiline strings can be written
    using three "s, and are often used
    as comments
"""
""" 多行字符串用
	 三个 "打头，
	 也可用于注释
"""

####################################################
## 1. Primitive Datatypes and Operators
## 1. 基本数据类型和操作符
####################################################

# You have numbers
# 数字
3  # => 3

# Math is what you would expect
# 基本运算也正常
1 + 1  # => 2
8 - 1  # => 7
10 * 2  # => 20
35 / 5  # => 7

# Division is a bit tricky. It is integer division and floors the results
# automatically.
# 除法稍微复杂点。计算结果自动取整。
5 / 2  # => 2

# To fix division we need to learn about floats.
# 为了修正除法的问题，我们需要先学习浮点数。
2.0     # This is a float这是个浮点数
11.0 / 4.0  # => 2.75 ahhh...much better好多了

# Result of integer division truncated down both for positive and negative.
# 无论正负，整数除法的结果都会取整。
5 // 3     # => 1
5.0 // 3.0 # => 1.0 # works on floats too浮点数也一样
-5 // 3  # => -2
-5.0 // 3.0 # => -2.0

# Note that we can also import division module(Section 6 Modules)
# to carry out normal division with just one '/'.
# 我们也可以导入division module（第六章的模块），要进行正常的除法，只需要一个 '/'
from __future__ import division
11/4    # => 2.75  ...normal division
11//4   # => 2 ...floored division  

# Modulo operation
# 取余数
7 % 3 # => 1

# Exponentiation (x to the yth power)
# 幂运算（x 的 y 次幂）
2**4 # => 16

# Enforce precedence with parentheses
# 括号优先
(1 + 3) * 2  # => 8

# Boolean Operators
# Note "and" and "or" are case-sensitive
# 布尔运算符 注意 "and" "or"区分大小写
True and False #=> False
False or True #=> True

# Note using Bool operators with ints
# 注意在整数上使用布尔运算符
0 and 2 #=> 0
-5 or 0 #=> -5
0 == False #=> True
2 == True #=> False
1 == True #=> True

# negate with not
# 用"not"取反
not True  # => False
not False  # => True

# Equality is ==
# ==是等于
1 == 1  # => True
2 == 1  # => False

# Inequality is !=
# != 是不等于
1 != 1  # => False
2 != 1  # => True

# More comparisons
# 更多的比较符
1 < 10  # => True
1 > 10  # => False
2 <= 2  # => True
2 >= 2  # => True

# Comparisons can be chained!
# 比较符可以连在一起
1 < 2 < 3  # => True
2 < 3 < 2  # => False

# Strings are created with " or '
# 用单引号和双引号新建字符串
"This is a string."
'This is also a string.'

# Strings can be added too!
# 字符串可以相加
"Hello " + "world!"  # => "Hello world!"
# Strings can be added without using '+'
# 字符串不用加号也可以相加
"Hello " "world!"  # => "Hello world!"

# ... or multiplied
# 也可以相乘
"Hello" * 3  # => "HelloHelloHello"

# A string can be treated like a list of characters
# 字符串可以当做是字符的表
"This is a string"[0]  # => 'T'

# % can be used to format strings, like this:
# 百分号可以用来格式化字符串
"%s can be %s" % ("strings", "interpolated")

# A newer way to format strings is the format method.
# This method is the preferred way
# 用 format 来格式化字符串，这也是首选的方法
"{0} can be {1}".format("strings", "formatted")
# You can use keywords if you don't want to count.
# 如果你不想数数的话，也可以使用关键字
"{name} wants to eat {food}".format(name="Bob", food="lasagna")

# None is an object
# None 也是一个对象
None  # => None

# Don't use the equality "==" symbol to compare objects to None
# Use "is" instead
# 别用 "==" 来比较 None，用 "is"
"etc" is None  # => False
None is None  # => True

# The 'is' operator tests for object identity. This isn't
# very useful when dealing with primitive values, but is
# very useful when dealing with objects.
# "is"操作符用于对象。但不怎么适用于基本数据类型，最好还是用于处理对象。
# None, 0, and empty strings/lists all evaluate to False.
# All other values are True
# None，0，和空字符串，空表都被视为 False，其他的都是 True。
bool(0)  # => False
bool("")  # => False


####################################################
## 2. Variables and Collections
## 2. 变量与集合
####################################################

# Python has a print statement
# 输出
print "I'm Python. Nice to meet you!" # => I'm Python. Nice to meet you!

# Simple way to get input data from console
# 从控制台获得输入
input_string_var = raw_input("Enter some data: ") # Returns the data as a string
input_var = input("Enter some data: ") # Evaluates the data as python code
# Warning: Caution is recommended for input() method usage
# Note: In python 3, input() is deprecated and raw_input() is renamed to input()
# 使用 input() 的时候最好有警告
# 在 Python 3中，input() 已经不使用了，raw_input()也重命名为input()

# No need to declare variables before assigning to them.
# 在变量赋值之前不用声明
some_var = 5    # Convention is to use lower_case_with_underscores
some_var  # => 5

# Accessing a previously unassigned variable is an exception.
# See Control Flow to learn more about exception handling.
# 访问一个未赋值的变量会产生一个异常。
# 进一步了解异常处理，可参见下一节《控制流》。
some_other_var  # Raises a name error 抛出一个名称错误

# if can be used as an expression
# if 可以作为表达式来使用
# Equivalent of C's '?:' ternary operator
# 和 C 的 "?:" 三元等号一样
"yahoo!" if 3 > 2 else 2  # => "yahoo!"

# Lists store sequences
# 列表储存了顺序
li = []
# You can start with a prefilled list
# 预先填充好的列表
other_li = [4, 5, 6]


# Add stuff to the end of a list with append
# 使用 append 方法把元素添加到列表的尾部
li.append(1)    # li is now [1]
li.append(2)    # li is now [1, 2]
li.append(4)    # li is now [1, 2, 4]
li.append(3)    # li is now [1, 2, 4, 3]
# Remove from the end with pop
# 使用 pop 来移除最后一个元素
li.pop()        # => 3 and li is now [1, 2, 4]
# Let's put it back
# 使用 append 来添加
li.append(3)    # li is now [1, 2, 4, 3] again.

# Access a list like you would any array
# 像访问数组一样访问列表
li[0]  # => 1
# Assign new values to indexes that have already been initialized with =
# 使用 = 来分配新的值
li[0] = 42
li[0]  # => 42
li[0] = 1  # Note: setting it back to the original value
# Look at the last element
# 访问最后一个值
li[-1]  # => 3

# Looking out of bounds is an IndexError
# 超出边界会报错
li[4]  # Raises an IndexError

# You can look at ranges with slice syntax.
# (It's a closed/open range for you mathy types.)
# 你可以使用切片语法来查询列表的一个范围。
# （这个范围相当于数学中的左闭右开区间。）
li[1:3]  # => [2, 4]
# Omit the beginning
# 从某值开始
li[2:]  # => [4, 3]
# Omit the end
# 到某值结束
li[:3]  # => [1, 2, 4]
# Select every second entry
# 每两个遍历
li[::2]   # =>[1, 4]
# Reverse a copy of the list
# 倒序遍历
li[::-1]   # => [3, 4, 2, 1]
# Use any combination of these to make advanced slices
# 使用以下方法高级遍历
# li[start:end:step]
# 列表名[开始:结束:步]

# Remove arbitrary elements from a list with "del"
# 使用 del 来删除列表中的值
del li[2]   # li is now [1, 2, 3]

# You can add lists
# 列表也可以相加
li + other_li   # => [1, 2, 3, 4, 5, 6]
# Note: values for li and for other_li are not modified.
# 注意： 上述两个列表中的值都没有改变

# Concatenate lists with "extend()"
# 使用 extend() 来合并列表
li.extend(other_li)   # Now li is [1, 2, 3, 4, 5, 6]现在 li 长这样

# Remove first occurrence of a value
# 删除第一个出现的值
li.remove(2)  # li is now [1, 3, 4, 5, 6]第一个 2 被删除了
li.remove(2)  # Raises a ValueError as 2 is not in the list报错了，没有 2 了

# Insert an element at a specific index
# 把值插入准确位置
li.insert(1, 2)  # li is now [1, 2, 3, 4, 5, 6] again

# Get the index of the first item found
# 查询第一个值出现的位置
li.index(2)  # => 3
li.index(7)  # Raises a ValueError as 7 is not in the list

# Check for existence in a list with "in"
# 使用 in 来查询列表中是否存在某值
1 in li   # => True

# Examine the length with "len()"
# 使用 len()来查询列表长度
len(li)   # => 6


# Tuples are like lists but are immutable.
# 元组像是不能改变的列表
tup = (1, 2, 3)
tup[0]   # => 1
tup[0] = 3  # Raises a TypeError

# You can do all those list thingies on tuples too
# 列表的操作也可以使用在元组上
len(tup)   # => 3
tup + (4, 5, 6)   # => (1, 2, 3, 4, 5, 6)
tup[:2]   # => (1, 2)
2 in tup   # => True

# You can unpack tuples (or lists) into variables
# 可以把元组或者列表中的值复制给多个变量
a, b, c = (1, 2, 3)     # a is now 1, b is now 2 and c is now 3
# Tuples are created by default if you leave out the parentheses
# 如果没有括号的话会建立元组
d, e, f = 4, 5, 6
# Now look how easy it is to swap two values
# 交换两个值
e, d = d, e     # d is now 5 and e is now 4


# Dictionaries store mappings
# 字典储存映射关系
empty_dict = {}
# Here is a prefilled dictionary
# 创建一个字典
filled_dict = {"one": 1, "two": 2, "three": 3}

# Look up values with []
# 用[]来查询对应值
filled_dict["one"]   # => 1

# Get all keys as a list with "keys()"
# 把所有键名导出为列表
filled_dict.keys()   # => ["three", "two", "one"]
# Note - Dictionary key ordering is not guaranteed.
# 注意：字典没有顺序
# Your results might not match this exactly.
# 得到的结果可能和上面不一样

# Get all values as a list with "values()"
# 把所有键值导出为列表
filled_dict.values()   # => [3, 2, 1]
# Note - Same as above regarding key ordering.
# 注意：没有顺序

# Check for existence of keys in a dictionary with "in"
# 使用 in 来查询是否有某个键名
"one" in filled_dict   # => True
1 in filled_dict   # => False

# Looking up a non-existing key is a KeyError
# 查询不存在的键名会报错
filled_dict["four"]   # KeyError

# Use "get()" method to avoid the KeyError
# 用 get() 来避免查询报错
filled_dict.get("one")   # => 1
filled_dict.get("four")   # => None
# The get method supports a default argument when the value is missing
# get() 方法可以设置一个默认值，在没有这个键名的时候有返回值
filled_dict.get("one", 4)   # => 1
filled_dict.get("four", 4)   # => 4
# note that filled_dict.get("four") is still => None
# 注意这个默认值不会改变，现在还是 None
# (get doesn't set the value in the dictionary)
# get() 不会向字典中插入值

# set the value of a key with a syntax similar to lists
# 向字典中插入键对
filled_dict["four"] = 4  # now, filled_dict["four"] => 4

# "setdefault()" inserts into a dictionary only if the given key isn't present
# Setdefault() 只能在值不存在时添加到字典里
filled_dict.setdefault("five", 5)  # filled_dict["five"] is set to 5 没有值的时候添加
filled_dict.setdefault("five", 6)  # filled_dict["five"] is still 5 有值的时候不变


# Sets store ... well sets (which are like lists but can contain no duplicates)
# 用 set() 来储存集合，像是列表一样，但是不能复制值
empty_set = set()
# Initialize a "set()" with a bunch of values
# 用值来初始化 set()
some_set = set([1, 2, 2, 3, 4])   # some_set is now set([1, 2, 3, 4])

# order is not guaranteed, even though it may sometimes look sorted
# 初始化之后进行的储存都存不进去
another_set = set([4, 3, 2, 2, 1])  # another_set is now set([1, 2, 3, 4])

# Since Python 2.7, {} can be used to declare a set
# 从 Python 2.7 开始，{} 可以用来声明一个集合
filled_set = {1, 2, 2, 3, 4}   # => {1, 2, 3, 4}

# Add more items to a set
# 把更多的元素添加进一个集合
filled_set.add(5)   # filled_set is now {1, 2, 3, 4, 5}

# Do set intersection with &
# 使用 & 来获取交集
other_set = {3, 4, 5, 6}
filled_set & other_set   # => {3, 4, 5}

# Do set union with |
# 使用 | 来获取并集
filled_set | other_set   # => {1, 2, 3, 4, 5, 6}

# Do set difference with -
# 使用 - 来获取补集
{1, 2, 3, 4} - {2, 3, 5}   # => {1, 4}

# Do set symmetric difference with ^
# 用 ^ 来取交集的补集
{1, 2, 3, 4} ^ {2, 3, 5}  # => {1, 4, 5}

# Check if set on the left is a superset of set on the right
# 右边是否是左边的子集
{1, 2} >= {1, 2, 3} # => False

# Check if set on the left is a subset of set on the right
# 左边是否是右边的子集
{1, 2} <= {1, 2, 3} # => True

# Check for existence in a set with in
# 使用 in 来检查是否存在于某个集合中
2 in filled_set   # => True
10 in filled_set   # => False


####################################################
## 3. Control Flow
## 3. 控制流
####################################################

# Let's just make a variable
# 创建一个变量
some_var = 5

# Here is an if statement. Indentation is significant in python!
# 这里有个条件语句，缩进在 Python 当中很重要。
# prints "some_var is smaller than 10"
# 打印"some_var is smaller than 10"
if some_var > 10:
    print "some_var is totally bigger than 10."
elif some_var < 10:    # This elif clause is optional. elif 子句可选。
    print "some_var is smaller than 10."
else:           # This is optional too.这句也是可选的。
    print "some_var is indeed 10."


"""
For loops iterate over lists
prints:
    dog is a mammal
    cat is a mammal
    mouse is a mammal
"""
for animal in ["dog", "cat", "mouse"]:
    # You can use {0} to interpolate formatted strings. (See above.)
    # 使用 {0} 来格式化字符串
    print "{0} is a mammal".format(animal)

"""
"range(number)" returns a list of numbers
from zero to the given number
prints:
    0
    1
    2
    3
"""
for i in range(4):
    print i

"""
"range(lower, upper)" returns a list of numbers
from the lower number to the upper number
prints:
    4
    5
    6
    7
"""
for i in range(4, 8):
    print i

"""
While loops go until a condition is no longer met.
prints:
    0
    1
    2
    3
"""
x = 0
while x < 4:
    print x
    x += 1  # Shorthand for x = x + 1 

# Handle exceptions with a try/except block
# 使用 try/except 代码块来处理异常
# Works on Python 2.6 and up:
# 适用于 Python 2.6 及以上版本：
try:
    # Use "raise" to raise an error
    # 使用 raise 来抛出错误
    raise IndexError("This is an index error")
except IndexError as e:
    pass    # Pass is just a no-op. Usually you would do recovery here. pass 只是一个空操作。通常你应该在这里做一些恢复工作。
except (TypeError, NameError):
    pass    # Multiple exceptions can be handled together, if required. 如果需要的话，好几个异常可以一起处理。
else:   # Optional clause to the try/except block. Must follow all except blocks 可选的分句，用于处理异常，必须写在所有异常语句之后
    print "All good!"   # Runs only if the code in try raises no exceptions 这里的语句只在没异常的时候运行
finally: #  Execute under all circumstances 处理所有情况
    print "We can clean up resources here"

# Instead of try/finally to cleanup resources you can use a with statement 使用 with 来避免出错
with open("myfile.txt") as f:
    for line in f:
        print line

####################################################
## 4. Functions
## 4. 函数
####################################################

# Use "def" to create new functions
# 使用 def 来新建函数
def add(x, y):
    print "x is {0} and y is {1}".format(x, y)
    return x + y    # Return values with a return statement 返回值

# Calling functions with parameters
# 调用函数，传入参数
add(5, 6)   # => prints out "x is 5 and y is 6" and returns 11

# Another way to call functions is with keyword arguments
# 调用函数的另一种方式是传入关键字参数
add(y=6, x=5)   # Keyword arguments can arrive in any order. 关键字参数可以以任意顺序传入


# You can define functions that take a variable number of
# positional args, which will be interpreted as a tuple if you do not use the *
# 你可以定义一个函数，并让它接受可变数量的定位参数，如果你不用 * 的话会被解释为一个元组。
def varargs(*args):
    return args

varargs(1, 2, 3)   # => (1, 2, 3)


# You can define functions that take a variable number of
# keyword args, as well, which will be interpreted as a dict if you do not use **
# 你也可以定义一个函数，并让它接受可变数量的关键字参数，如果不用 ** 的话会被解释为一个字典
def keyword_args(**kwargs):
    return kwargs

# Let's call it to see what happens
# 尝试调用
keyword_args(big="foot", loch="ness")   # => {"big": "foot", "loch": "ness"}


# You can do both at once, if you like
# 你还可以同时使用这两类参数，只要你愿意：
def all_the_args(*args, **kwargs):
    print args
    print kwargs
"""
all_the_args(1, 2, a=3, b=4) prints:
    (1, 2)
    {"a": 3, "b": 4}
"""

# When calling functions, you can do the opposite of args/kwargs!
# Use * to expand positional args and use ** to expand keyword args.
# 在调用函数时，定位参数和关键字参数还可以反过来用。
# 使用 * 来展开元组，使用 ** 来展开关键字参数。
args = (1, 2, 3, 4)
kwargs = {"a": 3, "b": 4}
all_the_args(*args)   # equivalent to foo(1, 2, 3, 4)
all_the_args(**kwargs)   # equivalent to foo(a=3, b=4)
all_the_args(*args, **kwargs)   # equivalent to foo(1, 2, 3, 4, a=3, b=4)

# you can pass args and kwargs along to other functions that take args/kwargs
# by expanding them with * and ** respectively
# 各自使用* 和 ** 可以把元组和关键字参数展开传递到其他的函数中。
def pass_all_the_args(*args, **kwargs):
    all_the_args(*args, **kwargs)
    print varargs(*args)
    print keyword_args(**kwargs)

# Function Scope
# 函数范围
x = 5

def set_x(num):
    # Local var x not the same as global variable x
    # 这里的 x 是私有变量
    x = num # => 43
    print x # => 43

def set_global_x(num):
    global x
    print x # => 5
    x = num # global var x is now set to 6
    print x # => 6

set_x(43)
set_global_x(6)

# Python has first class functions
# 函数在 Python 中优先级很高
def create_adder(x):
    def adder(y):
        return x + y
    return adder

add_10 = create_adder(10)
add_10(3)   # => 13

# There are also anonymous functions
# 匿名函数
(lambda x: x > 2)(3)   # => True
(lambda x, y: x ** 2 + y ** 2)(2, 1) # => 5

# There are built-in higher order functions
# 内建的高阶函数
map(add_10, [1, 2, 3])   # => [11, 12, 13]
map(max, [1, 2, 3], [4, 2, 1])   # => [4, 2, 3]

filter(lambda x: x > 5, [3, 4, 5, 6, 7])   # => [6, 7]

# We can use list comprehensions for nice maps and filters
# 我们可以使用列表推导式来模拟 map 和 filter
[add_10(i) for i in [1, 2, 3]]  # => [11, 12, 13]
[x for x in [3, 4, 5, 6, 7] if x > 5]   # => [6, 7]


####################################################
## 5. Classes
## 5. 类
####################################################

# We subclass from object to get a class.
# 我们可以从对象中继承，来得到一个类。
class Human(object):

    # A class attribute. It is shared by all instances of this class
    # 下面是一个类属性。它将被这个类的所有实例共享。

    species = "H. sapiens"

    # Basic initializer, this is called when this class is instantiated.
    # 在初始化类的时候构造函数。
    # Note that the double leading and trailing underscores denote objects
    # or attributes that are used by python but that live in user-controlled
    # namespaces. You should not invent such names on your own.
    # 注意： __XXX__ 表示一个类，也可能表示 Python 内置的某个变量，不要轻易修改它。
    
    def __init__(self, name):
        # Assign the argument to the instance's name attribute
        # 把参数赋值为实例的 name 属性
        self.name = name

        # Initialize property
        # 初始化参数
        self.age = 0


    # An instance method. All methods take "self" as the first argument
    # 下面是一个实例方法。所有方法都以 self 作为第一个参数。
    def say(self, msg):
        return "{0}: {1}".format(self.name, msg)

    # A class method is shared among all instances
    # They are called with the calling class as the first argument
    # 类方法会被所有实例共享。
    # 类方法在调用时，会将类本身作为第一个函数传入。

    @classmethod
    def get_species(cls):
        return cls.species

    # A static method is called without a class or instance reference
    # 静态方法在调用时，不会传入类或实例的引用。
    @staticmethod
    def grunt():
        return "*grunt*"

    # A property is just like a getter.
    # It turns the method age() into an read-only attribute
    # of the same name.
    # 参数就像是一个函数，返回一个只读的同名方法
    @property
    def age(self):
        return self._age

    # This allows the property to be set
    # 设置参数
    @age.setter
    def age(self, age):
        self._age = age

    # This allows the property to be deleted
    # 删除参数
    @age.deleter
    def age(self):
        del self._age


# Instantiate a class
# 实例化一个类
i = Human(name="Ian")
print i.say("hi")     # prints out "Ian: hi"

j = Human("Joel")
print j.say("hello")  # prints out "Joel: hello"

# Call our class method
# 调用类的方法
i.get_species()   # => "H. sapiens"

# Change the shared attribute
# 修改共享的参数
Human.species = "H. neanderthalensis"
i.get_species()   # => "H. neanderthalensis"
j.get_species()   # => "H. neanderthalensis"

# Call the static method
# 调用静态方法
Human.grunt()   # => "*grunt*"

# Update the property
# 修改参数
i.age = 42

# Get the property
# 获得参数值
i.age # => 42

# Delete the property
# 删除参数
del i.age
i.age  # => raises an AttributeError


####################################################
## 6. Modules
## 6. 模块
####################################################

# You can import modules
# 导入模块
import math
print math.sqrt(16)  # => 4

# You can get specific functions from a module
# 从模块中导入指定函数
from math import ceil, floor
print ceil(3.7)  # => 4.0
print floor(3.7)   # => 3.0

# You can import all functions from a module.
# Warning: this is not recommended
# 可以从模块中导入所有函数，但不建议这么做。
from math import *

# You can shorten module names
# 缩短模块的名字
import math as m
math.sqrt(16) == m.sqrt(16)   # => True
# you can also test that the functions are equivalent
from math import sqrt
# 测试函数是否和调用的函数一样
math.sqrt == m.sqrt == sqrt  # => True

# Python modules are just ordinary python files. You
# can write your own, and import them. The name of the
# module is the same as the name of the file.
# Python 模块就是普通的 Python 文件。
# 你可以编写你自己的模块，然后导入它们。
# 模块的名称与文件名相同。

# You can find out which functions and attributes
# defines a module.
# 查看模块中的所有函数和参数
import math
dir(math)


####################################################
## 7. Advanced
## 7. 进阶
####################################################

# Generators help you make lazy code
# 生成器让写代码更简单
def double_numbers(iterable):
    for i in iterable:
        yield i + i

# A generator creates values on the fly.
# Instead of generating and returning all values at once it creates one in each
# iteration.  This means values bigger than 15 wont be processed in
# double_numbers.
# 生成器在运行的同时产生值，而不是一次性生成所有然后一个一个返回。大于15个两位数的值难以被执行。
# Note xrange is a generator that does the same thing range does.
# Creating a list 1-900000000 would take lot of time and space to be made.
# xrange creates an xrange generator object instead of creating the entire list
# like range does.
# xrange 就是这样一种生成器，他的效果和 range 一样，但是生成 1-900000000 会花费很多时间，xrange 会实时生成而非 range 那样全部生成。
# We use a trailing underscore in variable names when we want to use a name that
# would normally collide with a python keyword
# 如果想简单表明这个变量只是后面的关键字集合的话，我们只是在这个关键字后面加一个下划线来命名这个变量。
xrange_ = xrange(1, 900000000)

# will double all numbers until a result >=30 found
# 把所有数加倍，直到结果大于30
for i in double_numbers(xrange_):
    print i
    if i >= 30:
        break


# Decorators
# in this example beg wraps say
# Beg will call say. If say_please is True then it will change the returned
# message
from functools import wraps


def beg(target_function):
    @wraps(target_function)
    def wrapper(*args, **kwargs):
        msg, say_please = target_function(*args, **kwargs)
        if say_please:
            return "{} {}".format(msg, "Please! I am poor :(")
        return msg

    return wrapper


@beg
def say(say_please=False):
    msg = "Can you buy me a beer?"
    return msg, say_please


print say()  # Can you buy me a beer?
print say(say_please=True)  # Can you buy me a beer? Please! I am poor :(
```

## Ready For More?

### Free Online

* [Automate the Boring Stuff with Python](https://automatetheboringstuff.com)
* [Learn Python The Hard Way](http://learnpythonthehardway.org/book/)
* [Dive Into Python](http://www.diveintopython.net/)
* [The Official Docs](http://docs.python.org/2/)
* [Hitchhiker's Guide to Python](http://docs.python-guide.org/en/latest/)
* [Python Module of the Week](http://pymotw.com/2/)
* [A Crash Course in Python for Scientists](http://nbviewer.ipython.org/5920182)
* [First Steps With Python](https://realpython.com/learn/python-first-steps/)

### Dead Tree

* [Programming Python](http://www.amazon.com/gp/product/0596158106/ref=as_li_qf_sp_asin_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0596158106&linkCode=as2&tag=homebits04-20)
* [Dive Into Python](http://www.amazon.com/gp/product/1441413022/ref=as_li_tf_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1441413022&linkCode=as2&tag=homebits04-20)
* [Python Essential Reference](http://www.amazon.com/gp/product/0672329786/ref=as_li_tf_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0672329786&linkCode=as2&tag=homebits04-20)
