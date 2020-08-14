---
title:  App 延长后台时间 和 background fetch
date: 2019-12-19 14:38:13
sidebarDepth: 4
categories: 
 - iOS
tags: 
 - 多线程
---

[[toc]]

[TOC]

# App 延长后台时间 和 background fetch 

## App 延长后台时间

退到后台时，如果需要存储数据等需要延长后台执行时间的，需要使用以下方法

```objective-c
@property(nonatomic,readonly) NSTimeInterval backgroundTimeRemaining NS_AVAILABLE_IOS(4_0);
- (UIBackgroundTaskIdentifier)beginBackgroundTaskWithExpirationHandler:(void(^ __nullable)(void))handler  NS_AVAILABLE_IOS(4_0) NS_REQUIRES_SUPER;
- (UIBackgroundTaskIdentifier)beginBackgroundTaskWithName:(nullable NSString *)taskName expirationHandler:(void(^ __nullable)(void))handler NS_AVAILABLE_IOS(7_0) NS_REQUIRES_SUPER;
- (void)endBackgroundTask:(UIBackgroundTaskIdentifier)identifier NS_AVAILABLE_IOS(4_0) NS_REQUIRES_SUPER;

```



官网示例代码

```objective-c
- (void)applicationDidEnterBackground:(UIApplication *)application
{
    bgTask = [application beginBackgroundTaskWithName:@"MyTask" expirationHandler:^{
        // Clean up any unfinished task business by marking where you
        // stopped or ending the task outright.
      	//如果任务还没执行完，到最后4s左右的时候，系统会强制调用 expirationHandler走到这里
      
        [application endBackgroundTask:bgTask];
        bgTask = UIBackgroundTaskInvalid;
    }];
 
    // Start the long-running task and return immediately.
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
 
        // Do the work associated with the task, preferably in chunks.
       //这里开始执行后台任务。如果在系统允许的时间内任务已执行完，则通过这里结束后台任务；如果最后4s左右任务还未执行完，则系统会强制调用 expirationHandler，走到上面的回调里
 
        [application endBackgroundTask:bgTask];
        bgTask = UIBackgroundTaskInvalid;
    });
}

```



两个方法 beginBackgroundTaskWithExpirationHandler: 与 beginBackgroundTaskWithName:expirationHandler: 两个方法一致，当需要debug的时候，最好指定一个名字，方便调试。backgroundTimeRemaining 标示后台还能执行多少时间，具体时间根据系统情况来确定，**经过测试大约有 179.9s的时间，到最后4s左右开始调用 expirationHandler 执行收尾工作**



## Background Fetch 

iOS 7开始苹果引入background fetch，该机制可以让App后台被定期唤醒，执行一些下载更新任务，比如新闻媒体等App,可以定期唤醒App更新数据。当App在后台被挂起或者被系统回收后，依然会被定期唤醒执行任务。

Backgroud fetch 的调用时机取决于系统，方法中设定时间后，系统会根据实际情况唤醒App， 被唤醒后，最多有30s的时间执行任务，如果超过会被系统杀死。如果App执行任务时间过长，系统会减少调用background fetch的时间。

### 开启backgound fetch方法

* 苹果开发者账号证书配置里，对AppleID打开backgound fetch功能
* Xcode里Capablity里打开 Background fetch开关



### 实现 UIApplicationDelegate 方法

```swift
func application(_ application: UIApplication,
                 didFinishLaunchingWithOptions launchOptions:
                 [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
   // Override point for customization after application launch.
        
   // Fetch data once an hour. 设置 Background fetch间隔时间
   UIApplication.shared.setMinimumBackgroundFetchInterval(3600)
   // Other initialization…
   return true
}

//实现Background fetch回调，在该Handle里处理事情
func application(_ application: UIApplication, 
                 performFetchWithCompletionHandler completionHandler:
                 @escaping (UIBackgroundFetchResult) -> Void) {
   // Check for new data. 
   if let newData = fetchUpdates() {
      addDataToFeed(newData: newData)
      completionHandler(.newData)
   }
   completionHandler(.noData)
}

```



## 参考文档

[Extending Your App's Background Execution Time](https://developer.apple.com/documentation/uikit/core_app/managing_your_app_s_life_cycle/preparing_your_app_to_run_in_the_background/extending_your_app_s_background_execution_time?language=objc)

[Updating Your App with Background App Refresh](https://developer.apple.com/documentation/uikit/core_app/managing_your_app_s_life_cycle/preparing_your_app_to_run_in_the_background/updating_your_app_with_background_app_refresh?language=objc)

[App Programming Guide for iOS](https://developer.apple.com/library/archive/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40007072-CH1-SW1)

[Background Execution](https://developer.apple.com/library/archive/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/BackgroundExecution/BackgroundExecution.html#//apple_ref/doc/uid/TP40007072-CH4-SW25)

[About the Background Execution Sequence](https://developer.apple.com/documentation/uikit/core_app/managing_your_app_s_life_cycle/preparing_your_app_to_run_in_the_background/about_the_background_execution_sequence?language=objc)

[Preparing Your App to Run in the Background](https://developer.apple.com/documentation/uikit/core_app/managing_your_app_s_life_cycle/preparing_your_app_to_run_in_the_background?language=objc)

[Managing Your App's Life Cycle](https://developer.apple.com/documentation/uikit/core_app/managing_your_app_s_life_cycle?language=objc#overview)

[UIApplicationDelegate](https://developer.apple.com/documentation/uikit/uiapplicationdelegate?language=objc)

