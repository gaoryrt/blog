title: linux网络编程复习
comments: false
date: 2015-12-13 23:22:17
categories: Discovery
---
甘刚老师教的很不错的，对我们也很负责，真的是很好的一个老师。  
但是江山易改本性难移，我们还是没有好好的听老师讲课，还是等着最后几天来复习。  
这一篇就是在考试之后把复习的资料整理一下。  
<!--more-->  
# 套接字类型
## 流式套接字  sock_stream
 使用了 TCP 协议，保证了数据传输是正确，顺序的  
 提供可靠的，面向连接的通讯流   
 Telnet 就是流式连接，到达顺序和输入顺序一样  
## 数据报套接字  sock-dgram
 使用了 UDP 协议，不保证可靠无差错，是无序的  
 无连接的服务，不需要维护一个打开的连接，只用打包加上 IP 然后发送  
 使用 udp 的程序收到后需要返回 ack （确认）信号  
 tftp，bootp 就是数据报套接字  
## 原始套接字
 原始套接字主要用于一些协议的开发,可以进行比较底层的操作  
 它功能强大,但是没有上面介绍的两种套接字使用方便  
 一般的程序也涉及不到原始套接字  
# socket套接字包含的元素  
  一个完整的 Socket 则用一个相关描述  
 {协议,本地地址,本地端口,远程地址,远程端口}  
  每一个 Socket 有一个本地的唯一 Socket 号,由操作系统分配  
  针对不同的C/S程序提供不同的 Socket 系统调用  
 Socket 利用C/S模式巧妙的解决了进程之间建立通信连接的问题  
  服务器拥有全局公认的 Socket,任何客户都可以向它发出连接请求和信息请求  
  两个完全随机的用户进程之间,因为没有任何一方的 Socket ,要通话是不可能的  
# 监听套接字和连接套接字的作用
  listen()一直监听，accept()用于连接。  
  listen(sockfd套接字描述符,backlog最大连接数)  
  accept(listenfd套接字描述符,client对方地址,addrlen地质结构长度)   
# IP地址复用的作用和设置
  setsockopt()函数 和 SO_REUSEADDR 参数  
# 多进程和多线程对连接和监听套接字处理的区别
## 多进程
1.connect 请求到达服务器时建立 connfd  
2.fork()出一个子进程共享 listenfd，connfd  
3.父进程关闭 connfd，子进程关闭 listenfd  
## 多线程
1.子线程处理 listenfd：connect 请求，把 sockid 保存下来  
2.主线程处理 connfd：遍历保存的 sockid，执行read/write,send/recv  
# TSD的作用和使用方法
 TSD线程特定数据来取代静态变量，类似全局变量，但是是每个线程私有的  
 tsd 是定义线程私有数据的唯一方法。  
 在同进程中的同一数据都用一个唯一的 Key 来标志。  
  创建一个类型为 pthread_key_t 类型的变量。  

调用 pthread_key_create() 来创建该变量。该函数有两个参数，第一个参数就是上面声明的 pthread_key_t 变量，第二个参数是一个清理函数，用来在线程释放该线程存储的时候被调用。该函数指针可以设成 NULL ，这样系统将调用默认的清理函数。  

当线程中需要存储特殊值的时候，可以调用 pthread_setspcific() 。该函数有两个参数，第一个为前面声明的 pthread_key_t 变量，第二个为 void* 变量，这样你可以存储任何类型的值。  

如果需要取出所存储的值，调用 pthread_getspecific() 。该函数的参数为前面提到的 pthread_key_t 变量，该函数返回 void * 类型的值。  
 
# I/O复用5种模型的区别
阻塞，非阻塞，复用，信号驱动，异步   
这个自己看书，书上有图。  
# IGMP协议在原始套接字中的应用
我不知道，但是也没有考。sorry。  
# TCP/UDP套接字编程流程模版
最基础的东西，书上2、3章，自己看图。  
# 创建IPV4原始套接字
1.socket第二个参数设置为sock_raw  
int ipfd  
ipfd = socket(AF_INFT,SOCK_RAW,IPPROTO_ICMP)  
socket函数第三个参数用于指定套接口所使用的协议,如 icmp，igmp，egp  
2.设置 IP_HDRINCL 套接口选项  
const int on = 1  
if(setsockopt (sockfd,IPPROTO_IP,IP_HDRINCL,&on,szeof(on))< 0)  
下面异常处理  
3.调用 bind，connect  
# 父进程ID和子进程ID的关系
没有考到，了解一下。  
在 fork 之后，创建子进程成功  
子进程中，fork 返回 0  
父进程中，fork 返回子进程的 pid  
父进程的 fpid 指向子进程的 pid，子进程没有子进程，于是 fpid 为 0  
# 僵尸进程
子进程结束了，父进程尚未等待（wait/waitpid）的时候是僵尸进程  
所以要 waitpid 函数或者 wait 函数来关闭。  
waitpid 是另一种 wait 函数，多了 pid 和 option 选项。  
其中 pid 为子进程 id，-1时等待任何一个，这时和 wait 一样；大于1时，为等待该 pid 的进程  
option 为 WNOHANG，没有子进程也会立即返回，不会一直等，一般 option 为 0  
# 套接字地址结构类型
```
struct sockaddr_in
{
  unsigned short sin_len;          //ipv4地址长度
  short int      sin_family;       //指代协议簇，在 tcp 中只会是AF_INET
  unsigned short sin_port;         //储存端口号
  struct         in_addr sin_addr; //储存 IP地址
  unsigned char  sin_zero[8];      //保留位，用于保持长度相同
}
struct in_addr
{
  unsigned long s_addr;           //网络字节序？？？？？？？的 IP地址
}
```

这个是 ipv4 的，ipv6 不用记。  
# 线程安全性中once函数的使用
没有考到，了解一下  
在多线程环境中，有些事仅需要执行一次。通常当初始化应用程序时，可以比较容易地将其放在main函数中。  
但当你写一个库时，就不能在main里面初始化了，你可以用静态初始化，但使用一次初始化（pthread_once）会比较容易些。  
int pthread_once(pthread_once_t *once_control, void (*init_routine) (void))；
功能：本函数使用初值为PTHREAD_ONCE_INIT的once_control变量保证init_routine()函数在本进程执行序列中仅执行一次。  
在多线程编程环境下，尽管pthread_once()调用会出现在多个线程中，init_routine()函数仅执行一次，究竟在哪个线程中执行是不定的，是由内核调度来决定。  
Linux Threads使用互斥锁和条件变量保证由pthread_once()指定的函数执行且仅执行一次，而once_control表示是否执行过。  
如果once_control的初值不是PTHREAD_ONCE_INIT（Linux Threads定义为0），pthread_once() 的行为就会不正常。  
在LinuxThreads中，实际"一次性函数"的执行状态有三种：NEVER（0）、IN_PROGRESS（1）、DONE （2）  
如果once初值设为1，则由于所有pthread_once()都必须等待其中一个激发"已执行一次"信号，因此所有pthread_once ()都会陷入永久的等待中；如果设为2，则表示该函数已执行过一次，从而所有pthread_once()都会立即返回0。   
# 域名和IP、协议和协议号、服务和端口的处理函数
太多了这个自己看书。  
```
gethostbyname()
gethostbyaddr()
uname()
gethostname()
getservbyname()
getservbyport()
inet_addr()
inet_aton()
inet_ntoa()
```
# 创建守护进程  
## 1 创建后台进程
```
if((pid = fork())>0)
   exit(0);
else if(pid<0)
{
    perror("fail to fork");
    exit(-1);
}
```
## 2 创建新会话
脱离控制终端，登录会话和进程组  
```
setsid(); 
```
## 3 禁止进程重新打开控制终端 
```
if(pid=fork()) 
      exit(0);//结束第一子进程，第二子进程继续（第二子进程不再是会话组长）
```
## 4 关闭所有文件描述符
```
for(i=0;i<=getdtablesize();i++)
 close(i);
```
## 5 改变当前工作目录
```
 chdir("/tmp") ;
```
## 6 重设权限掩码
```
 umask(0);
```
## 7 处理SIGCHLD信号 
```
 signal(SIGCHLD,SIG_IGN); 
```
***
以上