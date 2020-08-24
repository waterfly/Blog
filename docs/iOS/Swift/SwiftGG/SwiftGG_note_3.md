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


