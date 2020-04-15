---
title: 《禅与 Objective-C 编程艺术 》阅读笔记
date: 2016-07-27 21:55:13
sidebarDepth: 4
categories: 
 - iOS
tags: 
 - 阅读笔记
---

[[toc]]

[TOC]

原文：[禅与 Objective-C 编程艺术](https://github.com/oa414/objc-zen-book-cn#%E9%BB%84%E9%87%91%E5%A4%A7%E9%81%93)

# 条件语句
总是要用大括号

## 尤达表达式
不推荐

## nil 和 BOOL
不要直接把对象跟nil或YES,NO比较，用 if(!xx)来即可

## 黄金大道
即不要嵌套`if`语句，可以使用`return`语句避免增加循环的复杂度

即推荐：

	- (void)someMethod {
	  if (![someOther boolValue]) {
	      return;
	  }
	
	  //Do something important
	}

不推荐

	- (void)someMethod {
	  if ([someOther boolValue]) {
	    //Do something important
	  }
	}

其中有句原话是：
> 在使用条件语句编程时，代码的左边距应该是一条“黄金”或者“快乐”的大道。

对黄金大道这个比喻不理解，不明白黄金大道的在这里的比喻。
但是上面的例子是比较清晰的。

## 复杂的表达式
if中的复杂表达式，提取出来赋值给BOOL，使之更清晰 。

	BOOL nameContainsSwift  = [sessionName containsString:@"Swift"];
	BOOL isCurrentYear      = [sessionDateCompontents year] == 2014;
	BOOL isSwiftSession     = nameContainsSwift && isCurrentYear;
	
	if (isSwiftSession) {
	    // Do something very cool
	}

## 三元运算符
三元运算符里的子句，应该也只是求值后的变量，不要直接用复杂的句子。

推荐

	result = a > b ? x : y;

不推荐

	result = a > b ? x = c > d ? c : d : y;

另外，推荐更灵活地表达方式：

	result = object ? : [self createObject];

不推荐

	result = object ? object : [self createObject];


## 错误处理
> 有些方法通过参数返回 error 的引用，使用这样的方法时应当检查方法的返回值，而非 error 的引用。
>
> 推荐:
>
> 		NSError *error = nil;
> 		if (![self trySomethingWithError:&error]) {
> 		    // Handle Error
> 		}
> 此外，一些苹果的 API 在成功的情况下会对 error 参数（如果它非 NULL）写入垃圾值（garbage values），所以如果检查 error 的值可能导致错误 （甚至崩溃）。

# Case语句
switch语句里是枚举变量时，建议不要用`default`,因为当枚举增加时，这些switch语句会收到警告

使用枚举变量时，建议使用新的宏`- NS_ENUM()`

# 命名
## 通用的约定
驼峰法命名

[内存管理规则:](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/MemoryMgmt/Articles/mmRules.html#//apple_ref/doc/uid/20000994-BAJHFBGH)
> You create an object using a method whose name begins with “alloc”, “new”, “copy”, or “mutableCopy” (for example, alloc, newObject, or mutableCopy).


## 常量
驼峰法，类名做前缀，尽量用常量类型少用宏


## 方法
* 方法名与方法类型 (-/+ 符号)之间应该以空格间隔
* 方法段之间也应该以空格间隔（以符合 Apple 风格）
* 参数前应该总是有一个描述性的关键词。尽可能少用 "and" 这个词

## 字面值
不推荐`[@[] mutableCopy]`这种写法。


# 类
## 类名
* 类名应该以三个大写字母作为前缀
* 当你创建一个子类的时候，你应该把说明性的部分放在前缀和父类名的在中间。如有一个 `ZOCNetworkClient` 类，子类的名字会是`ZOCTwitterNetworkClient`

## Initializer 和 dealloc
* `dealloc`函数应该放在文件的最前面，`init`方法跟在后面。
* `alloc`和`init`方法解释。

## Designated 和 Secondary 初始化方法
* 一个类应该有且只有一个 designated 初始化方法
* 子类的**Designated Initializer**应该调用父类的**Designated Initializer**方法。
* 用`NS_DESIGNATED_INITIALIZER`来指定为Designated Initializer（方法后加上该宏）。
* **Secondary Initializer**应该调用**Designated Initializer**
* 初始化方法返回参数用**instancetype**替换**id**
* 类簇 （class cluster)的解释
* 单例用`dispatch_once()`替代`@synchronized`

## 属性
* 命名用小写字母开头的驼峰命名
* 在init方法里要直接用实例变量，不要用set/get方法访问属性变量。因为子类可能重载属性变量。
* 用点语法
* 属性的参数应该按照下面的顺序排列： **原子性，读写 和 内存管理**
* **NSString,NSArray,NSURLRequest**等有可变对象的类，尽量用copy，防止用strong指向可变子类，导致值被修改出现问题
* 用懒加载（Lazy Loading）时，注意副作用，如get方法里修改了一些类的全局变量，导致加载时机不同出现问题

## 方法
* 用断言`NSAssert()`或`NSParameterAssert()`抛参数异常
* 私有变量和私有方法不要用`_`前缀，苹果已保留该前缀

## 相等性
> 当你要实现相等性的时候记住这个约定：你需要同时实现isEqual 和 hash方法。如果两个对象是被isEqual认为相等的，它们的 hash 方法需要返回一样的值。但是如果 hash 返回一样的值，并不能确保他们相等。


# Categories
category里的方法应该用自己的小写前缀加下划线，如`- (id)zoc_myCategoryMethod`

# Protocols
用协议提高代码的复用性


# NSNotification
通知名应该用类名做前缀，用一个 Did/Will 这样的动词以及用 "Notifications" 后缀。如

	// Foo.h
	extern NSString * const ZOCFooDidBecomeBarNotification
	
	// Foo.m
	NSString * const ZOCFooDidBecomeBarNotification = @"ZOCFooDidBecomeBarNotification";

# 美化代码
* 空格，**这里说用四个空格替代TAB，但是一般文章都是推荐用TAB，因为可以根据编译的设定而改变，所以这里存疑**
* 方法的大括号和其他的大括号(if/else/switch/while 等) 总是在同一行开始
* 方法之间要有空行
* 参数换行


# 代码组织
* 善用代码块`{}`
* 方法用`#pragma mark -`组织分离
* 当用`performSelector`调用方法在ARC出现警告时，可用`#pragma clang diagnostic`去除警告，代码示例：

		#pragma clang diagnostic push
		#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
		
		[myObj performSelector:mySelector withObject:name];
		
		#pragma clang diagnostic pop
	
* 忽视未读变量的方法：`#pragma unused (foo)`（如果foo变量未使用，用该方法不提示警告）
* 注释分两种`//`和`/** */`。**非公开、很短、显而易见**的函数一般用`//`,其它和对外暴露的一般用`/** */`


# 对象间的通讯
* Block，这里说下***“在 block 外定义一个 __weak 的 引用到 self，并在 block 内部通过这个弱引用定义一个 __strong 的引用。”***的情况。这种一般是需要持有self，但是又为了避免retain circle的情况。block内的self强引用是Block执行时创建的， 
示例代码如下：

		@property (nonatomic,strong) NSString *testString;
		@property (nonatomic,copy) void(^BlockTest)();


        self.testString = @"testststs";
        __weak typeof(self)weakSelf = self;
        self.BlockTest = ^(){
            __strong typeof(self)strongSelf = weakSelf;
            NSLog(@"%@",strongSelf.testString);
        };
        
        self.BlockTest();
注：weakSelf是为了block不持有self，避免循环引用，而再声明一个strongSelf是因为一旦进入block执行，就不允许self在这个执行过程中释放。block执行完后这个strongSelf会自动释放，没有循环引用问题。

* 多重委托


# 面向切面编程
AOP，面向切面编程，统计与日志就是一个完美的例子。