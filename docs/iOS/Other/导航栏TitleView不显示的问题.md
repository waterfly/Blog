---
title: 导航栏TitleView在iOS11上不显示
date: 2019-12-09 18:13:00
sidebarDepth: 4
categories: 
 - iOS
tags: 
 - iOS11 issue
---

[[toc]]

[TOC]

# 导航栏TitleView在iOS11上不显示

今天遇到一个奇怪的问题，xib上有一个view，然后在.m内指定其为titleView，发现没出来，经过检测，发现其宽度为1

代码为：

```objective-c
// self.vNavigationTitle 为 xib上的一个顶级view，其属性设置为strong

//在.m文件内将其赋值给 titleView
self.navigationItem.titleView = self.vNavigationTitle;
```



经过查查资料，发现

> 在iOS 11 中苹果改变了UINavigationBar的视图层级，titleView不是加到NavigationBar上，而是加到了UINavigationBarContentView上，这就是原因所在。

也就是说需要布局都是通过constraint来控制，所以需要自建一个view，然后指定其 intrinsicContentSize，然后就能愉快的正常显示了。



```objective-c
//实现view的 intrinsicContentSize
@interface BarView : UIView
@end
@implementation BarView
-(CGSize)intrinsicContentSize{
    return UILayoutFittingExpandedSize;
}
@end


```

