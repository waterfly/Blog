# SwiftGG 文档翻译笔记2

## 枚举

Swift中枚举非常强大，基于OC枚举的基础上增加了很多的功能，Swift中的枚举是枚举和联合体的联合，同时还能定义实例方法和构造函数，还可以遵循协议，非常灵活。

在Swift中，枚举类型是 first-clase，采用了很多类中才有的特性：

* 计算属性，用于提供枚举值的附加信息
* 实例方法，于提供和枚举值相关联的功能
* 遵循协议
* 定义构造函数，提供一个初始值
* 内部定义函数



### 枚举语法

关键字：`enum`、`rawValue`

```swift

//基本形式
enum CompassPoint {
    case north
    case south
    case east
    case west
}

//关联值形式，可以给枚举值赋值，当做变量使用，同一时间只能存储一个值
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}

//原始值，rawValue，通过 rawValue 获取到对应的枚举值
//声明为Int的，默认值从0开始，并递增1；声明为String的，默认值为case名称
enum Planet: Int {
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
}

// possiblePlanet 类型为 Planet? 值为 Planet.uranus
let possiblePlanet = Planet(rawValue: 7)

```



### CaseIterable

枚举可遵循 `CaseIterable` 协议，该协议会自动生成一个`allCases`属性，类型为数组，内部包含所有枚举的集合。

```swift
enum Beverage: CaseIterable {
    case coffee, tea, juice
}
let numberOfChoices = Beverage.allCases.count
print("\(numberOfChoices) beverages available")
// 打印“3 beverages available”
```

注，该协议不需要实现，会自动生成`allCases`



### 递归枚举

关键字：`indirect`，可修饰枚举成员或整个枚举

为实现枚举成员的递归，可以使用关键字`indirect`声明，声明后即可支持递归调用。

```swift
indirect enum ArithmeticExpression {
    case number(Int)
    case addition(ArithmeticExpression, ArithmeticExpression)
    case multiplication(ArithmeticExpression, ArithmeticExpression)
}

let five = ArithmeticExpression.number(5)
let four = ArithmeticExpression.number(4)
let sum = ArithmeticExpression.addition(five, four)
//递归调用
let product = ArithmeticExpression.multiplication(sum, ArithmeticExpression.number(2)
```





## 类和结构体

Swift中类和结构体非常的像，具有很多传统类的特性，都可以定义变量、属性、构造函数、实例方法、遵循协议等。但是结构体更偏向于数据结构，在Swift中一般优先用结构体，结构体能满足我们大多数需求。可以把结构体理解为特殊的类。



### 相同点

* 定义属性用于存储值
* 定义方法用于提供功能
* 定义下标操作用于通过下标语法访问它们的值
* 定义构造器用于设置初始值
* 通过扩展以增加默认实现之外的功能
* 遵循协议以提供某种标准功能



### 不同点

| Struct         | Class           |      |
| -------------- | --------------- | ---- |
| 成员逐一构造器 |                 |      |
| 值类型         | 引用类型        |      |
|                | 继承            |      |
|                | 恒等判断（===） |      |
|                | 析构器          |      |



### 关于值类型与引用类型：

* 目前只有类、函数、闭包是引用类型，其他数组、集合、字典、枚举、结构体等都是值类型。从一个变量赋值到另一个变量，就会发生复制。另外，集合类型里面如果包含的是值类型，在数组赋值时会值拷贝（数组和内容）；如果包含的是引用类型，比如类、函数、闭包，在赋值时数组会复制，内容只是引用不会发生复制。
* 标准库定义的集合，例如数组，字典和字符串，都对复制进行了优化以降低性能成本。新集合不会立即复制，而是跟原集合共享同一份内存，共享同样的元素。在集合的某个副本要被修改前，才会复制它的元素。而你在代码中看起来就像是立即发生了复制。



### 在结构和类之间进行选择

* 优先使用结构体
* 需要与OC混编时，使用Class
* 需要 Control Identity 时，一般用Class。Class是引用类型，可以用恒等符===判断，如果需要类似全局实例，或多处引用，需要用Class

参考：[Choosing Between Structures and Classes](https://developer.apple.com/documentation/swift/choosing_between_structures_and_classes)



### 基本定义

```swift
struct SomeStructure {
    // 在这里定义结构体
}

class SomeClass {
    // 在这里定义类
}
```



### 指针

Swift里面的引用类型并不是用指针实现，不直接指向内存地址。如果需要用与指针进行交互，参考 手动管理内存。

参考：[Manual Memory Management](https://developer.apple.com/documentation/swift/swift_standard_library/manual_memory_management)

