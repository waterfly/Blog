---
title: 关联对象实现week
date: 2019-12-19 18:19:13
sidebarDepth: 4
categories: 
 - iOS
tags: 
 - Runtime
---

[[toc]]

[TOC]

# 关联对象实现week

## 关联对象week

很多场景下，关联对象需要使用weak，但是目前关联对象的属性设计只有 assgin copy strong 等，这些不能满足weak的需求。比如使用关联对象引用一个vc，就需要使用weak，用assgin容易挂。

这个时候需要引入一个中间件来解决，如下面示例代码，加入一个block，block内返回 外部一个weak的vc，这个时候对block能使用copy，就完美的解决了这个问题

```objective-c
- (void)setContext:(CDDContext*)object {
    id __weak weakObject = object;
    id (^block)() = ^{ return weakObject; };
    objc_setAssociatedObject(self, @selector(context), block, OBJC_ASSOCIATION_COPY);
}

- (CDDContext*)context {
    id (^block)() = objc_getAssociatedObject(self, @selector(context));
    id curContext = (block ? block() : nil);
    return curContext;
}

```

## 使用week实现可释放的单例

一般的单例创建后就无法销毁，但是如果用__weak方式声明出来的，当所有引用代理的地方销毁后，该单例就会自动销毁。也就是说创建了一个可以自动销毁的单例对象。这种单例可以节省内存，但是对于需要保存状态的单例是不能使用的。

```objective-c
+ (id)sharedInstance
{
    static __weak ASingletonClass *instance;
    ASingletonClass *strongInstance = instance;
    @synchronized(self) {
        if (strongInstance == nil) {
            strongInstance = [[[self class] alloc] init];
            instance = strongInstance;
        }
    }
    return strongInstance;
}
```



具体可以参考 [ iOS weak 关键字漫谈](http://mrpeak.cn/blog/ios-weak/)，说的很清晰。