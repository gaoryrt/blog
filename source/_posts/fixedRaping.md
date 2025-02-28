---
title: Bad HUD Rapes
comments: true
date: 2018-08-25 21:17:44
categories: 随笔与个人文集
---

# HUD

平视显示器 HUD (head-up display) 是一种飞行辅助仪器，安装在驾驶员前方，这样驾驶员不用低头看各种仪表，能在平视时看见各种关键信息。

![HUD](/2018/08-25-fixedRaping/Hud_on_the_cat.jpg)

后来 HUD 出现在汽车驾驶辅助和游戏中，用于驾驶者和玩家悉知各种关键信息。

![HUD](/2018/08-25-fixedRaping/Supertuxkart-0.8.1-screenshot-6.png)

但是和飞机汽车驾驶员拥有全视角不同，游戏对玩家的反馈绝大部分都是通过显示器完成的。除了面前的显示器和游戏声音之外，基本就没什么渠道可以获取游戏信息了，可能这也是 NDS 副屏和可震动游戏手柄让人喜欢的原因之一吧。


![NDS](/2018/08-25-fixedRaping/582px-Nintendo-DSi-Bl-Open.png)

# 减少元素

游戏设计者会谨慎的筛选常驻于 HUD 的信息：对于 FPS 游戏来说，玩家的血量、剩余子弹数量、小地图、游戏进程等；对于 RPG 来说，HUD 一般会展示玩家的血量、魔法值、技能等等。过多的常驻内容会影响玩家的体验，在很多大型游戏中都能看到关闭 HUD 的选项，使玩家拥有沉浸式的体验。

而对于非第一要素的内容，例如游戏敌人的血量，通常会放在敌人形象的上方；菜单栏一般会通过点击 esc 来打开；对于某些游戏，HUD 的使用会更少：例如一辆会撞坏的汽车，它的血量不会显示在 HUD 中，而是通过引擎盖冒烟、着火来显示；例如受伤的角色会有伤口，流血。

为什么不把 NPC 的魔法值或者是他的技能常驻在窗口内呢？

# SNR

展示垃圾 HUD 和智能音箱投放阈下知觉广告这一行为类似，可能在听觉上这一行为更加可耻，毕竟我们可以不看某些内容，但是很难做到不听某些内容。

移动端网页中的 `position: fixed` 的内容是新一代的 HUD。在可视范围越来越小的时候，我们选取放在 HUD 里的内容时也应越发谨慎才对。

为了展示优先级高的内容，我们可以花点时间考虑一下什么内容能够常驻展示，真的。例如当大多数人都知道网页内从左向右滑动是返回上一级页面的话，那就用不着在有了导航栏之后，还专门为前进/返回按钮单独开辟一个 tab 了。是的，我说的就是微信。不知道在 iPhone4 上使用微信自带浏览器还能不能看见网页内容。

![](/2018/08-25-fixedRaping/20180825223327.png)

上面这张图有些不妥，左图的垃圾用户体验是微信和百度合力造成的。双导航栏、双菜单 icon、双返回 icon、两个 tab 栏，真是绝了。

微信自带浏览器和地方电视台拙劣的常驻广告都强奸了使用者的双眼，说不定还强奸了脑子。

# 其他

貌似批评微信已经成为我的日常，但是依然离不开啊，可能只能靠那天转发敏感内容来永久封禁了。
还有最后这张图是真的，绝了。
想到再写，祝好~