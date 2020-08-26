---
title: SwiftGG 文档翻译笔记3-泛型
date: 2020-08-24 19:57:13
sidebarDepth: 4
categories: 
 - iOS
tags: 
 - Swift
---

[[toc]]
[toc]



## 泛型

泛型是Swift非常强大的特性之一。

关键字：`< >` , `associatedtype`

```swift
/*
	基本格式：<T>声明一个泛型类型T，内部即可使用该类型
	命名规则：大写字母开头，驼峰式；有表示意义时，Dictionary<Key, Value>，Array<Element>，无表示意义时，通常用单个字符，例如 T、U、V
*/

//函数泛型
func swapTwoValues<T>(_ a: inout T, _ b: inout T) {
    let temporaryA = a
    a = b
    b = temporaryA
}


//类型泛型
struct Stack<Element> {
    var items = [Element]()
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        return items.removeLast()
    }
}
//类型约束，可声明泛型为某类或遵守指定协议
func someFunction<T: SomeClass, U: SomeProtocol>(someT: T, someU: U) {
    // 这里是泛型函数的函数体部分
}
//泛型扩展，可在扩展中直接使用已定义的泛型，不需要重新声明
extension Stack {
    var topItem: Element? {
        return items.isEmpty ? nil : items[items.count - 1]
    }
}




/*
	关联类型：关联类型是泛型的一种，用于协议中使用。协议中不能定义泛型，必须用关联类型
	关键字：associatedtype
*/
protocol Container {
    associatedtype Item		//声明一个关联类型
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}


//关联类型也可增加约束，指定遵守协议或某类，跟泛型相同
//扩展内，也可直接用已定义的关联类型
protocol Container {
    associatedtype Item: Equatable		//声明关联类型遵守 Equatable 协议
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}




/*
	where语句
	where后可跟多个约束语句，泛型、关联类型支持where语句，可用于函数、类型、扩展、下标等
*/
//基本格式
where a == b 		//限制类型相同
where where Element: Equatable		//限制遵守协议

//限制 C1.Item 与 C2.Item 类型相同，限制 C1.Item 遵守 Equatable 协议，注意where语句位置
func allItemsMatch<C1: Container, C2: Container>
    (_ someContainer: C1, _ anotherContainer: C2) -> Bool
    where C1.Item == C2.Item, C1.Item: Equatable {
}

//扩展，where语句
extension Container where Item: Equatable {
    func startsWith(_ item: Item) -> Bool {
        return count >= 1 && self[0] == item
    }
}

```



## 可选链

关键字：`?` , `!`

```swift
//代码示例
//定义，如果 john.residence 为 nil，则整个表达式为nil;如果不为nil，则调用  numberOfRooms
john.residence?.numberOfRooms

//强制解析写法对比，如果使用强制解析，为nil则直接产生运行时错误
john.residence!.numberOfRooms

//通过可选连可调用函数，如果 调用 printNumberOfRooms() 失败，则为nil
if john.residence?.printNumberOfRooms() != nil {
    print("It was possible to print the number of rooms.")
} else {
    print("It was not possible to print the number of rooms.")
}
```



## 错误处理



## 类型转换

关键字：`is` , `as` , `as?` , `as!` , `Any` , `AnyObject`

只用于Class



```swift
//is, 用于检查类型，与OC isKindOf相同
item is Movie		//表达式为 true 或 false

//as, 类型转换，有三种使用场景
//1. 从派生类转换为基类，向上转型（upcasts）
class Animal {}
class Cat: Animal {}
let cat = Cat()
let animal = cat as Animal		// animal 类型为  Animal


//2. 消除二义性，数值类型转换
let num1 = 42 as CGFloat
let num2 = 42 as Int
let num3 = 42.5 as Int
let num4 = (42 / 2) as Double


//3. switch 语句中进行模式匹配
switch animal {
case let cat as Cat:
    print("如果是Cat类型对象，则做相应处理")
case let dog as Dog:
    print("如果是Dog类型对象，则做相应处理")
default: break
}



//向下转换（Downcasting），转换到子类型，as!, as?
//as!，向下转换，如果失败则触发运行时错误
class Animal {}
class Cat: Animal {}
let animal :Animal  = Cat()
let cat = animal as! Cat

//as?, 向下转换，但是转换失败则返回nil，不会触发错误
let animal:Animal = Cat()
if let cat = animal as? Cat{
    print("cat is not nil")
} else {
    print("cat is nil")
}

//Any,AnyObject
//Any,可以表示任何类型，包括函数类型
//AnyObject,可以表示任何类类型的实例
var things = [Any]()
var things = [AnyObject]()

```

