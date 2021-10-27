---
title: 开始使用sublime text 3
date: 2015-09-10 17:34:12
categories: Geek Talks · 奇客怪谈
tags: [howto,sublime]
---
windows上面基本上是个文件都可以用notepad++打开  
在我遇见sublime text之前我都是使用`文本编辑.app` 来打开的  
但是好像并不能打开Hexo的配置文件`_config.yml`  
然后就开始使用sublime text了
<!--more-->  
***  
# 下载  
很容易就可以在网络上找到sublime text 2/sublime text 3的安装包  
好像还有破解版，但是看人家说的貌似这个可以无限免费试用  
也就是说正式版就只是向作者donate而已  
那就用着试用版吧  
下载链接👉 [sublime text](//www.sublimetext.com)  
***  
# 设置  
## Package Control  
同众多的编辑器一样，sublime text一样有一大批插件可供使用  
安装插件最方便的方法就是使用Package Control了  
右边链接介绍了安装方法-->[Installation - Package Control](https://packagecontrol.io/installation#Simple)   
>简单来说就是  
点开`View > Show Console`或者快捷键```ctrl+` ```进入console  
sublime text 3 输入以下命令然后回车  
```  
import urllib.request,os,hashlib; h = 'eb2297e1a458f27d836c04bb0cbaf282' + 'd0e7a3098092775ccb37ca9d6b2e4b7d'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)  
```  
sublime text 2 输入以下命令然后回车  
```  
import urllib2,os,hashlib; h = 'eb2297e1a458f27d836c04bb0cbaf282' + 'd0e7a3098092775ccb37ca9d6b2e4b7d'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')  
```  

安装成功后点击Preference就可以看到Package Setting和Package Control
***  
## 安装各种插件  
例如Theme - Spacegray  
这是一个好看的主题 Github主页👉[Theme - Spacegray](https://github.com/kkga/spacegray)
安装好了Package Control之后可以在Command Palette中找到Theme - Spacegray  
1. 打开Command Palette:`Tools -> Command Palette`或者使用快捷键`shift+cmd+P`  
2. 输入`PCIP`就可以定位到`Package Control: Install Package`然后回车  
3. 搜索`Theme - Spacegray`然后回车  
4. 在`Sublime Text -> Preferences -> Setting - User`(快捷键`cmd + ,`)中输入
```  
{
  "theme": "Spacegray Eighties.sublime-theme",
  "color_scheme": "Packages/Theme - Spacegray/base16-eighties.dark.tmTheme"
}  
```  
5. 重启sublime就可以看到效果了  
***  
# sublime text 也是个大坑  
何止是文档打开工具呢？简直就是生产力工具  
就把网页链接放这里吧，懒得`cmd + d`了  
>[ Sublime Text 3 调教你的私人利器（上）](//www.sheyilin.cn/2015/05/sublime_text_3_tiao_jiao_ni_de_si_ren_li_qi_1/)👈插件介绍，推荐设置，快捷键修改，默认html补全，插件调教  
[ Sublime Text 3 调教你的私人利器（下）](//www.sheyilin.cn/2015/05/sublime_text_3_tiao_jiao_ni_de_si_ren_li_qi_2/)👈（接上条）插件调教，推荐设置  
[jikeytang/sublime-text](https://github.com/jikeytang/sublime-text)插件介绍,推荐设置,快捷键,**网页推荐**  
[Package Control](https://packagecontrol.io)Package Control官网，插件介绍    
[Sublime Text 全程指南](//zh.lucida.me/blog/sublime-text-complete-guide/)什么都有  
[Mac下Sublime Text 2使用心得](//www.jianshu.com/p/25cdc7d608bb)写的比我好多了就是了

另知乎提问  
>[Sublime Text 有哪些使用技巧？](//www.zhihu.com/question/24896283)  
[sublime text 3 插件推荐？](//www.zhihu.com/question/24736400)  

***  
# 这总不算烂尾了吧？  
终于把打开的那么多页面关差不多了好舒心。










