---
title: iOS IPC 线程通信
date: 2018-02-05 19:23:13
sidebarDepth: 4
categories: 
 - iOS
tags: 
 - 多线程
---

[[toc]]

[TOC]

# iOS IPC 线程通信

在iOS中 线程通信有两种方式：

* performSelector:onThread
* NSMachPort
* GCD



### **performSelector:onThread**

```objective-c

//在指定线程调用
[self performSelector:@selector(sendMessage) onThread:thread_1 withObject:nil waitUntilDone:YES];

//在主线程调用
[self performSelectorOnMainThread:@selector(sendMessage) withObject:nil waitUntilDone:YES];

```

`performSelector` 系列是比较常用的线程通信的方法，不过注意该系列方法依赖于 `Runloop`，主线程的`Runloop`是自动创建的，但是子线程需要手动运行`Runloop`。



### **NSMachPort**

```objective-c
@interface IPCTest ()
<NSMachPortDelegate>
{
    NSThread *thread_1;
    NSMachPort *machPort_1;
    
    NSThread *thread_2;
    NSMachPort *machPort_2;
}

@end

@implementation IPCTest

- (instancetype)init{
    self = [super init];
    if (self) {
        [self loadDefaultData];
    }
    return self;
}

- (void)loadDefaultData{
    thread_1 = [[NSThread alloc] initWithTarget:self selector:@selector(startRunloop_1) object:nil];
    [thread_1 setName:@"thread_1"];
    
    thread_2 = [[NSThread alloc] initWithTarget:self selector:@selector(startRunloop_2) object:nil];
    [thread_2 setName:@"thread_2"];
    
    
    machPort_1 = (NSMachPort *)[NSMachPort port];
    machPort_2 = (NSMachPort *)[NSMachPort port];
    
    //注册delegate
    machPort_2.delegate = self;
    
    [thread_1 start];
    [thread_2 start];
}

- (void)startRunloop_1{
    [[NSRunLoop currentRunLoop] addPort:machPort_1 forMode:NSDefaultRunLoopMode];
    [[NSRunLoop currentRunLoop] run];
}

- (void)startRunloop_2{
    //port 加入runloop
    [[NSRunLoop currentRunLoop] addPort:machPort_2 forMode:NSDefaultRunLoopMode];
    [[NSRunLoop currentRunLoop] run];
}

- (void)sendMessage{
    NSMutableArray *array = [NSMutableArray arrayWithObjects:@"12",@"23",@"34", nil];
    NSData *data = [NSKeyedArchiver archivedDataWithRootObject:array];
    NSMutableArray *dataArray = [NSMutableArray arrayWithObject:data];
    
    //线程1 里用 machPort_2 往 线程2发消息,注意这里 components 里的参数必须是一系列data数据（或 NSPort）,所以要用 NSKeyedArchiver 生成 data
    [machPort_2 sendBeforeDate:[NSDate date] msgid:123456 components:dataArray from:machPort_1 reserved:0];
}


#pragma mark - Public
- (void)invokeIPC{
    [self performSelector:@selector(sendMessage) onThread:thread_1 withObject:nil waitUntilDone:YES];
}


#pragma mark - NSPortDelegate
/*
 这里注意实现的是 NSPortDelegate （- (void)handlePortMessage:(NSPortMessage *)message;） 的方法，而不是 NSMachPortDelegate （- (void)handleMachMessage:(void *)msg;）
 NSMachPortDelegate 的方法参数是不透明结构 void *，所以调用了 NSPortDelegate 的方法，但是由于 NSPortMessage * 也是不透明的，看不到类内部定义，且无法使用 valueForKey方法，因此机制的我把 NSPortMessage * 改成了 id
 */
- (void)handlePortMessage:(id)message{
    NSLog(@"%@",message);
    NSMutableArray *dataArray = [message valueForKey:@"components"];
    NSMutableArray *array = [NSKeyedUnarchiver unarchiveObjectWithData:[dataArray lastObject]];
    NSLog(@"%@",array);
}

@end
```

NSPort有3个子类，NSSocketPort、NSMessagePort、NSMachPort，但在iOS下只有NSMachPort可用。使用的方式为接收线程中注册NSMachPort，在另外的线程中使用此port发送消息，则被注册线程会收到相应消息，然后最终在主线程里调用某个回调函数。

基本上能用 NSPort 的地方都可以用 performSelector 来代替，所以用 NSPort 的地方比较少。

上面Demo中有几个注意点：

* Port必须加入对应线程的Runloop
* sendBeforeDate 中的 components 参数必须由 NSData 或 NSPort类型，不能由其他类型，否则参数会传递不过去
*  NSMachPortDelegate 的方法参数是不透明结构 `void *`，所以调用了 NSPortDelegate 的方法，但是由于 `NSPortMessage *` 也是不透明的，看不到类内部定义，且无法使用 valueForKey方法，因此可以把 `NSPortMessage *`改为 `id` 类型



### **GCD**

```objective-c
    dispatch_async(dispatch_get_main_queue(), ^{
        [self sendMessage];
    });
```

