---
title: SwiftGG 文档翻译笔记1-基础部分函数闭包
date: 2020-08-07 19:57:13
sidebarDepth: 4
categories: 
 - iOS
tags: 
 - Swift
---

[[toc]]
[toc]


# SwiftGG 文档翻译笔记1-基础部分函数闭包
基础部分函数闭包


## Swift基础部分

### 基础类型

#### 常量和变量

Swift中变量分为常量（let）和变量（var），必须声明时就要确定类型，常量赋值后不可改变

```swift
//常量
let π = 3.14159
let 你好 = "你好世界"
let 🐶🐮 = "dogcow"

//变量
var maximumNumberOfLoginAttempts = 10
var currentLoginAttempt = 0
```



#### 输出

`print`

```swift
var currentLoginAttempt = 0
print("The shopping list contains \(currentLoginAttempt) items.")
```



#### 基础数据类型

* Int, Float, Double
* Bool
* String



代码示例

```swift
var x = 0.0, y = 0.0, z = 0.0

var welcomeMessage: String
welcomeMessage = "Hello"

var red, green, blue: Double

let π = 3.14159
let 你好 = "你好世界"
let 🐶🐮 = "dogcow"
```



#### 基本集合类型

* Array
* Set
* Dictionary



##### 数组

```swift
//数组的创建
var someInts = [Int]()
var threeDoubles = Array(repeating: 0.0, count: 3)
var shoppingList: [String] = ["Eggs", "Milk"]		//数组字面量构造数组，也可写成 var shoppingList = ["Eggs", "Milk"]

//数组的合并 +、+=
var anotherThreeDoubles = Array(repeating: 2.5, count: 3)
var sixDoubles = threeDoubles + anotherThreeDoubles

//数组的访问和修改
//数组的个数 count
sixDoubles.count

//判断是否为空
if shoppingList.isEmpty {
    print("The shopping list is empty.")
} else {
    print("The shopping list is not empty.")
}

//数组的添加 append(_:)、+=
shoppingList.append("Flour")

shoppingList += ["Baking Powder"]		// shoppingList 现在有四项了
shoppingList += ["Chocolate Spread", "Cheese", "Butter"]		// shoppingList 现在有七项了

//数组读取、修改
var firstItem = shoppingList[0]
shoppingList[0] = "Six eggs"
shoppingList[4...6] = ["Bananas", "Apples"]		//使用区间运算符

//插入 insert(_:at:)
shoppingList.insert("Maple Syrup", at: 0)

//移除 remove(at:)、removeLast()
let mapleSyrup = shoppingList.remove(at: 0)
let apples = shoppingList.removeLast()		//移除数组最后一项


//遍历
//for-in, enumerated()
for item in shoppingList {
    print(item)
}

//需要索引，用 enumerated()
for (index, value) in shoppingList.enumerated() {
    print("Item \(String(index + 1)): \(value)")
}

```



##### 字典

```swift
//创建,所有的Key必须是同一类型;所有的Value必须是同一类型
var namesOfIntegers = [Int: String]()
namesOfIntegers = [:]			//空字典字面量来创建一个空字典

var airports: [String: String] = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]

//修改，updateValue(_:forKey:)；下标
airports.updateValue("Dublin Airport", forKey: "DUB")
airports["LHR"] = "London"

//删除，removeValue(forKey:)；下标
airports.removeValue(forKey: "DUB")
airports["APL"] = nil

//查询，
airports["DUB"]
airports.keys
airports.values

//遍历，for-in
for (airportCode, airportName) in airports {
    print("\(airportCode): \(airportName)")
}
for airportCode in airports.keys {
    print("Airport code: \(airportCode)")
}
for airportName in airports.values {
    print("Airport name: \(airportName)")
}

//判断，isEmpty；个数，count
```



#### 元组 Tuple

示例：

```swift
let http404Error = (404, "Not Found")
```

**Notice：元组适合封装简单数据，复杂的数据类型应该考虑使用类或结构体**



#### 可选类型 Optional

可选类型是一种独立的类型，用`?`修饰的变量，与普通变量是不一样的，要获取可选变量的值，必须对其进行解析或强制解析



代码示例

```swift
var serverResponseCode: Int? = 404
```



**Notice！在Swift中，nil 只是表示无值的一种状态，不是指针或一种数据类型，nil 只能赋值给 可选类型。**

**这里一定要注意与OC的区别，OC的nil是指针，表示为空，数据类型表示为空的有 NSNotFound。所以抽象出来，语言里需要一种表示无值的一种状态。在Swift里，直接抽象为 可选类型 Optional，这里要调整下思维。用无值 或 有值 这两种状态，来表示以前OC里的是否为空的概念。**



##### nil

nil只能用于可选类型变量，不能直接赋给常量或变量

```swift
var serverResponseCode: Int? = 404
serverResponseCode = nil
```



##### 可选类型与数组

**集合类型的元素可以是可选类型**

```swift
//数组内元素可以是可选类型，即可以为nil
var stack: [TreeNode?] = [root]
if let node = stack.removeFirst() {
  stack.insert(node.left, at: 0)
}
```



##### 强制解析

确定可选变量一定有值，则可以对其进行强制解析，获取对应值，否则报错

基本格式

```swift
var serverResponseCode: Int? = 404
serverResponseCode!		//对serverResponseCode进行强制解析，前提是必须有值，如果serverResponseCode为nil，对其进行强制解析，则会报错
```



##### 可选绑定

可选绑定用于 if, while语句中，如果someOptional有值则解析后赋给变量，无值则为nil

```swift
if let constantName = someOptional {
    statements
}
```



##### 隐式解析可选类型

如果确定一个可选类型是有值的，则可以把 `?` 修改 成`!`，使用时不用再对其进行解析。

```swift
let assumedString: String! = "An implicitly unwrapped optional string."
let implicitString: String = assumedString  // 不需要感叹号
```

注：一个隐式解析可选类型其实就是一个普通的可选类型，默认值为 nil，但是可以被当做非可选类型来使用，并不需要每次都使用解析来获取可选值。



#### 类型别名

关键字：typealias

```swift
typealias AudioSample = UInt16
```



#### 错误处理

```swift
func makeASandwich() throws {
    // 这个函数有可能抛出错误
}

do {
    try makeASandwich()
    eatASandwich()
} catch SandwichError.outOfCleanDishes {
    washDishes()
} catch SandwichError.missingIngredients(let ingredients) {
    buyGroceries(ingredients)
}
```



##### 断言

```swift
let age = -3
assert(age >= 0, "A person's age cannot be less than zero")	// 因为 age < 0，所以断言会触发

//直接触发断言
assertionFailure("A person's age can't be less than zero.")
```



##### 先决条件

```swift
// 在一个下标的实现里...
precondition(index > 0, "Index must be greater than zero.")
```



注，断言在Debug状态有效，生产环境无效；先决条件在生产环境也有效。但在Xcode设置里，会有点不一样

> - In -O builds (the default for Xcode's Release configuration): if `condition` evaluates to false, stop program execution.
> - In -Ounchecked builds, `condition` is not evaluated, but the optimizer may assume that it *would* evaluate to `true`. Failure to satisfy that assumption in -Ounchecked builds is a serious programming error.





## 运算符

### 空合运算符

示例：

```swift
//空合运算符
a ?? b				//可选类型a进行空判断，非空则解包，为空则取默认值b

//等价于以下三目运算符
a != nil ? a! : b
```



### 区间运算符（Range Operators）

* 闭区间运算符，`a...b`
* 半开区间运算符，`a..<b`
* 单侧区间，`[2...]`、`[...2]`



### 恒等运算符与相等运算符

恒等运算符

* 恒等，`===`
* 不恒等，`!==`

相等运算符

* 相等，`==`
* 不相等，`!=`

#### 关于恒等与相等

恒等，只对类的实例对象，用恒等判断两个实例对象是否是同一个，类似OC里指针判断（但Swift变量并不是指针，另外，结构和枚举都是值类型，不存在恒等概念，变量赋值就会发生值拷贝）。

相等，Swift结构都可判断两个变量是否相等，前提是必须遵守 `Equatable`协议。实现该协议后，即可用相等运算符（==）进行判断。大部分Swfit基本结构都已实现该协议。

关于`Equatable`、`Hashable`、`Comparable` 三个协议后面详写



## 字符串与字符

* 字符串，String
* 字符，Character



## 集合类型

* 数组，`Array<Element>`
* 集合，`Set<Element>`
* 字典，`Dictionary<Key, Value>`



## 控制流

* for语句
* while语句
* if...else语句
* switch...case语句

### for语句

关键字：`for`, `stride`

```swift
//swift中已废弃 c风格的for语句
for(int i = 0 ; i < 10; i++){  
		//c风格的for语句，已废弃
} 

//swift for语句
//数组遍历
for value in array{
  
}
//区间遍历
for i in 0..<10 {  
      
}  
//不关心值也可省略
for _ in 1...power {
}


//带步长的for循环
let minuteInterval = 5
for tickMark in stride(from: 0, to: minutes, by: minuteInterval) {
    // 每5分钟渲染一个刻度线（0, 5, 10, 15 ... 45, 50, 55）
}

//从大到小遍历
for i in stride(from: 10, to: 0 ,by: -1) {
    //从10遍历到0
    print(i)
}
```



### while

关键字：`repeat`

```swift
while condition {
    statements
}

//类似do...while
repeat {
    statements
} while condition
```



### switch...case

关键字：`fallthrough`

* 不需要break语句，单条执行完结束（需要类似C语言的Case贯穿效果，可以使用  fallthrough）

* case 语言，可以包含多参数、区间、元祖匹配；每条case语句必须有实现体，否则报错；

  ```swift
  case "a", "A":			//集合过多时，也可以直接换行
  case 1..<5:
  
  //元组
  case (0, 0):
  case (_, 0):				//使用下划线（_）来匹配所有可能的值
  case (let x, 0):		//这种情况下，相当于  (_, 0)
  
  //新增 where
  case let (x, y) where x == y:
  
  ```










### guard-else

```swift
//Demo
func greet(person: [String: String]) {
    guard let name = person["name"] else {
        return
    }

    print("I hope the weather is nice in \(location).")
}

//退出的三种情形
//1.执行被终止，推荐做法：直接返回
return

//2.计算的结果为空值，推荐做法：
return nil
return [], return "" 					//返回标准库容器的空值
return Account.guestAccount()	//返回相应对象中，表示为默认或者为空的状态的值

//3. 执行出现错误，推荐做法：
throw FileError.NotFound
return Result.Failure(.NotFound)					//如果你要使用指定类型的返回值
onFailure(.NotFound); return							//适用于异步调用
return Promise(error: FileError.NotFound)	//在异步调用中使用 Promises 的情况


```

语法要求

* guard必须带else
* else语句内必须使用return、break、continue 或者 throw 做这件事，或者调用一个不返回的方法或函数，例如 fatalError()。



作用：与 if-else效果相同，但是可以更突出代码含义

参考： [使用 guard 的正确姿势](https://swift.gg/2016/02/14/swift-guard-radix/)



### 检测 API 可用性

```swift
//定义
#available(iOS 10, macOS 10.12, *)

//Demo
if #available(iOS 10, macOS 10.12, *) {
    // 在 iOS 使用 iOS 10 的 API, 在 macOS 使用 macOS 10.12 的 API
} else {
    // 使用先前版本的 iOS 和 macOS 的 API
}
```



## 函数

Swift的函数非常强大，非常灵活。写法样式是参考 JS函数的定义形式。通过函数类型，其实函数可以作为一种与String相同的数据类型使用，可以作为参数、入参等等。

Swift的函数是可嵌套的，即函数内还可定义函数。

**函数是引用类型**，即类似OC中指针概念，将一个函数变量赋值给另一个变量，不会发生拷贝，两个变量指向同一个函数。



### 函数定义

```swift
/*
关键字 函数名(参数名称: 参数类型, 参数名称: 参数类型) -> 返回值类型{    
}
*/

func greet(person: String) -> String {
    let greeting = "Hello, " + person + "!"
    return greeting
}


//无参数函数，省略参数名称
func sayHelloWorld() -> String {
    return "hello, world"
}

//无返回值函数，省略箭头
func greet(person: String) {
    print("Hello, \(person)!")
}

//返回值类型是函数
//返回值类型 (Int) -> (Int) 的函数
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
  
  func stepForward(_ input: Int) -> Int {
    return input + 1
  }
  
  func stepBackward(_ input: Int) -> Int {
    return input - 1
	}
  
    return backward ? stepBackward : stepForward
}



```



### 可变参数

通过...来定义可变参数，一个函数内只能有一个可变参数，可变参数即为对应参数的数组形式

```swift
//numbers 为一个可变参数，类型为 包含Double 的数组
func arithmeticMean(_ numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}
```



### 输入输出参数

关键字：`inout`，`&`

概念与OC里的输入输出差不多，函数内对inout参数进行引用

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}

var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
```



## 闭包

闭包可以用OC里的Block来理解。

注意一点，闭包是值引用，与函数一样，赋值不会造成拷贝。

文档有以下几点说明：

> 在 [函数]() 章节中介绍的全局和嵌套函数实际上也是特殊的闭包，闭包采用如下三种形式之一：
>
> - 全局函数是一个有名字但不会捕获任何值的闭包
> - 嵌套函数是一个有名字并可以捕获其封闭函数域内值的闭包
> - 闭包表达式是一个利用轻量级语法所写的可以捕获其上下文中变量或常量值的匿名闭包
>
> Swift 的闭包表达式拥有简洁的风格，并鼓励在常见场景中进行语法优化，主要优化如下：
>
> - 利用上下文推断参数和返回值类型
> - 隐式返回单表达式闭包，即单表达式闭包可以省略 `return` 关键字
> - 参数名称缩写
> - 尾随闭包语法



### 表达式

```swift
//基本表达式
{ (parameters) -> type in
    return  statements
}

//Demo
{ (s1: String, s2: String) -> Bool in 
		return s1 > s2
}

//注意，闭包表达式语法可以有各种优化
//1. 单表达式，省略return
//2. 利用上下文推断参数和返回值类型
//3. 参数名称缩写
//4. 尾随闭包语法
```





### 闭包的循环强引用

关键词：`weak`、`unowned`

* `weak`，弱引用，类型必须是Optional，释放后会被置为nil
* `unowned`，无主引用，用于不会变成 nil的变量

循环强引用，在Swift中的解决方案是：捕获列表。

```swift
//基本格式，用中括号提前修饰变量，这里需要注意，unowned self 即对self修饰过了，内部可以放心用self
{
    [unowned self, weak delegate = self.delegate]
    //...
}


lazy var someClosure = {
    [unowned self, weak delegate = self.delegate] in
    // 这里是闭包的函数体
}
```





### 尾随闭包

函数参数最后一个为闭包时，可用尾随闭包的形式，写起来更简单明了

```swift
//简单示例
test() {
  //函数调用，尾随闭包写法
}


//Demo展示
func someFunctionThatTakesAClosure(closure: () -> Void) {
    // 函数体部分
}

// 以下是不使用尾随闭包进行函数调用
someFunctionThatTakesAClosure(closure: {
    // 闭包主体部分
})

// 以下是使用尾随闭包进行函数调用
someFunctionThatTakesAClosure() {
    // 闭包主体部分
}
```



### 逃逸闭包

关键字：`@escaping`

当闭包作为参数传递到函数内，如果函数内没有明确调用该闭包，比如不调用，则该闭包必须声明为逃逸闭包，否则编译会报错。**调用标记为 @escaping的闭包时，如果有用到self内容时，必须显式使用 self**

```swift
//逃逸闭包
var completionHandlers: [() -> Void] = []
func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
    completionHandlers.append(completionHandler)
}

//非逃逸闭包
func someFunctionWithNonescapingClosure(closure: () -> Void) {
    closure()
}

//必须显式使用self
class SomeClass {
    var x = 10
    func doSomething() {
        someFunctionWithEscapingClosure { self.x = 100 }		//显示使用self，不然会报错
        someFunctionWithNonescapingClosure { x = 200 }			//非逃逸闭包，可以隐式使用self
    }
}
```



### 自动闭包

关键字：`@autoclosure`

使用 @autoclosure 关键字声明后，会自动把语句转化为闭包，省去花括号。**自动闭包核心就是为省去花括号。**



```swift
// customersInLine is ["Ewa", "Barry", "Daniella"]
func serve(customer customerProvider: @autoclosure () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: customersInLine.remove(at: 0))		//这里省去了大括号
// 打印“Now serving Ewa!”
```


