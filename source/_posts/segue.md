---
title: 「转」segue与delegate在ViewController返回的时候进行反向回传参数
date: 2016-01-11 18:27:15
categories: 扫盲教育
---
刚开始使用swift 的时候有很多问题  
这篇文章帮了我很多  
经过同意之后转过来记录一下  
原帖地址[[iOS]segue与delegate在ViewController返回的时候进行反向回传参数](//www.zoejblog.com/iossegueyu-delegatezai-viewcontrollerfan-hui-de-shi-hou-jin-xing-fan-xiang-hui-chuan-can-shu/#comments)  
作者[zoej](//www.zoejblog.com/author/zoej/)   
<!--more-->
***
我们经常会使用navigationViewController，使用segue拉拉线，就可以实现页面跳转，使用`prepareForSegue`方便进行参数的正向传递，但我们也许也有的业务会是反向的传递参数，这个时候需要使用delegate。 
假设有两个vc，事先做好了segue拉线，设置了按钮啥的，然后可以直接正向跳转，以及因为在一个navigation里面所以，第二个vc有个默认的back按钮可以反向的跳转，第一个是avc，第二个是bvc， 在bvc中我们写一个协议protocol，当然这个协议是写在类外面的，只是和类在同一个swift文件中：  

```
protocol RidingDelegate   {
    var isRefreshDataFlag:Bool{get set}//我这里就只设置一个参数用来传递好了。
}
```

然后我们在avc中要参照这个协议：  

```
class ViewController: UIViewController,RidingDelegate {
var isRefreshDataFlag=Bool()//并且直接实现这个协议参数，用来接收反向传输来的数据
//其他的方法这里都省略了，主要
 override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {  //发生了segue的方法
    if(segue.identifier == "StartRiding"){//指定某一个segue的目标vc的委托指向自身
        let ridingVC = segue.destinationViewController as RidingViewController
        ridingVC.delegate=self  //设置代理，让第一个页面作为ridingView的代理来接受参数
    }
    println("Segue: \(segue.identifier)")
}
}
```
另外在bvc中的类中，需要实例化这个delegate：  
```
var delegate:RidingDelegate?
```

并且在需要的地方进行这个委托中的参数变化：  
```
delegate?.isRefreshDataFlag=false
```

最后就可以实现这个反向传递参数了，委托协议里面可以写方法.  
参照[Swift语言实现代理传值-推酷](//www.tuicool.com/articles/6zEne2)  
[THE SWIFT SWIFT TUTORIAL: USING SEGUES AND DELEGATES IN NAVIGATION CONTROLLERS (PART 1 — THE TEMPLATE)](//makeapppie.com/2014/07/01/swift-swift-using-segues-and-delegates-in-navigation-controllers-part-1-the-template/)
