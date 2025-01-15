---
title: 给 fp14 适配 lomograflok 后背
comments: true
date: 2024-12-09 15:44:12
categories: Geek Talks
---

<script src="/js/jquery-1.12.4.min.js" defer></script>
<script src="/js/three.min.js" defer></script>

<link rel="stylesheet" href="/css/stlwebviewer2.css"></link>

<script src="/js/stlwebviewer2.js" defer></script>


[上半年前后脚收了两个](http://m.weibo.cn/status/4998939910865892?) fujifilm fotorama 的肖像撕拉片机器，一个双目的 fp-ul，一个四眼的 [fp-14](http://camera-wiki.org/wiki/Fujifilm_FP-14)（以下称之为四眼机）。这种是当年火车站、领事馆旁边照相馆里立等可取证件照用的机器，拍一下出两/四张，剪裁后就能贴上证件。

双目机的介绍和体验可以看这一篇：[[拍立得相機] Fujifilm FOTORAMA FP-UL．1990](https://jimmyyen.blogspot.com/2013/06/fujifilm-fotorama-fp-ul1990.html)，写得非常详细。玩双目机也不折腾，买来就能用，缺点是由于 lomograflok 后背到相纸平面的距离略大，最终成像的固定对焦距离由原本的 1～1.5米 变成了 0.5～0.7米。对的，镜头后距越大，最近对焦距离越短，这也是常见微距环的原理：增加后距。

这两种机器除了镜头数，还有一个很大的不同点：双目的可以兼容国际标准 4×5 Graflok 后背以及 pa-145 撕拉片后背，但是四眼只兼容 pa-24 撕拉片后背。

但是富士从一七年开始就没有继续生产撕拉片了，撕拉片也被自家的 instax 系列替代。当然撕拉片价格也水涨船高，两三年前还是五六百/十张，现在已经上千了。

托接口的福，使用 4×5 标准的 lomograflok 可以直接兼容双眼机，在一张instax wide 上成左右两张像，但是不能直接装到四眼机上一次性拍四张。

在简单观察，拆下四个螺丝后，发现四眼机的后背卡扣其实只是靠四颗螺丝固定的，理论上其实可以通过3D打印制作一个孔位精准的 Graflok 后背，实现四眼机拍摄 instax wide。

我觉得应该是最近拓竹的广告实在太多，当时决心想3D打印这个 adapter 的时候我是真想下单 a1，但是考虑到我这么个样样通门门温的个性，还是忍住剁手了：先找个本地的打，好用再买，不然就像家里无数的，占地房价比原价贵多了的东西一样，憋憋吃灰。

就这样在黄鱼上联系了个不远的商家，他白天给我打，我晚上回家路上去取，到家对照实物再修改方案，当晚给他发过去打新的。这个过程非常像 debug css：我也不知道为啥结果是这个表现，但是我觉得可以这么改改看。只不过这个 Read–Eval–Print Loop 从「秒」变成了「日」，八万六千四百倍。

我用的是在线的 tinkercad，基础的添加、修剪、分组功能就能满足我现在的所有需求。

先随手找了个大画幅后背打出来定位，可以看到这个还是斜插卡扣的方案：

<div class="stlwv2-model" data-model-url="./1.stl">如果你看到这行文字而非3D文件预览，请刷新一下</div>

自己研究了一下，发现斜插卡扣只需要一边即可。稍微修剪一点，有了这个锁边的第二版：

<div class="stlwv2-model" data-model-url="./2.stl"></div>

打出来比划了一下，觉得另一边甚至也可以不需要厚厚的锁边，直接利用后背的 3/4 螺口就可以在上快拆板的时候进行锁紧，这样一来两边都不会太厚。这一版也有了四个螺丝孔：

<div class="stlwv2-model" data-model-url="./3.stl"></div>

但是打出来发现孔的位置没弄对，老板还问我「你难道没有游标卡尺吗」，我说我有，只是没有笔和纸，然后口算算错了：
<video src='./wrong_version_3.MP4' playsinline webkit-playsinline muted loop autoplay></video>

重新计算返工：
<div class="stlwv2-model" data-model-url="./4.stl"></div>

这里只放了四个版本，不代表只迭代了四次。很多时候一点点细节没注意就会导致前功尽弃，总的下来前后还是花了小两周时间。
最后这个版本就可以完美安装使用了，一张当作四张拍很好玩，等有机会再补图。

---

附上[最终版本链接](./4.stl)。请注意，文件采用 [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.zh-hans) 协议共享，可共享/修改/商用，但必须署名且以同协议共享。
