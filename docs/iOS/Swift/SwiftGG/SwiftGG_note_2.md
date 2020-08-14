---
title: SwiftGG 文档翻译笔记2-FirstClass
date: 2020-08-14 19:57:13
sidebarDepth: 4
categories: 
 - iOS
tags: 
 - Swift
---

[[toc]]
[toc]


# SwiftGG 文档翻译笔记2-FirstClass

枚举、结构体、类、协议、扩展



## 枚举

Swift中枚举非常强大，基于OC枚举的基础上增加了很多的功能，Swift中的枚举是枚举和联合体的联合，同时还能定义实例方法和构造函数，还可以遵循协议，非常灵活。

在Swift中，枚举类型是 **first-class**，采用了很多类中才有的特性：

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

| Struct         | Class           |
| -------------- | --------------- |
| 成员逐一构造器 |                 |
| 值类型         | 引用类型        |
|                | 继承            |
|                | 恒等判断（===） |
|                | 析构器          |



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

Swift里面的引用类型并不是用指针实现，不直接指向内存地址。如果需要用与指针进行交互，参考 手动管理内存。一般与C交互的时候才需要用到Swift指针部分。

参考：

* [官方文档Manual Memory Management](https://developer.apple.com/documentation/swift/swift_standard_library/manual_memory_management)

* [Swift 中的指针使用](https://onevcat.com/2015/01/swift-pointer/)



## 属性

属性从存储角度分为：

* 存储属性，即实例变量或常量，可用于 类、结构体
* 计算属性，提供get、set方法，可用于 类、结构体、枚举，只能用`var`修饰

从类的角度分为：

* 实例属性，类的实例，包含存储属性、计算属性
* 类型属性，类型属性也有 存储类型属性 和 计算类型属性，**first-class（枚举、结构体、类）都可以有类型属性**

**结构体是值类型，当赋值给常量后，不能再修改其任何属性。**



### 延时加载存储属性

* 关键字  lazy
* 第一次调用时才会被创建，必须声明为 var，即只能是变量
* 实例属性的lazy是非线程安全；类属性的 lazy 是线程安全的，只会创建一次

```swift
class DataManager {
    lazy var importer = DataImporter()		//复杂计算放到延迟创建
}
```



### 计算属性

计算属性不直接存储实例变量，只提供set、get 方法

关键词：`set`、`get`、`newValue`



```swift
//计算属性
struct Test {
    var one: Int {
        get{
            return 10
        }
        set(newOne){
            print(newOne)
        }
    }
  
    var Two: Int {
        get{
            return 10
        }
        set{
            print(newValue)		//简化set写法，直接使用默认名称 newValue
        }
    }
}

//只读计算属性，可直接省略get和花括号。注意有set 必须要有get，但可以只有get。
struct Test {
    var one: Int {
        return 10
    }
}

```



### 属性观察器

类似OC的KVC机制，监控和响应属性值的变化。

关键词：`willSet`、`didSet`、`newValue`、`oldValue`

观察器：

* `willSet` 在新的值被设置之前调用，可指定参数名称，或用默认`newValue`
* `didSet` 在新的值被设置之后调用，可指定参数名称，或用默认`oldValue`



```swift
class StepCounter {
    var totalSteps: Int = 0 {
        willSet {
            print(newValue)
        }
        didSet {
            print(oldValue)
        }
    }
}
```



####  in-out 方式参数

如果将带有观察器的属性通过 in-out 方式传入函数，`willSet` 和 `didSet` 也会调用。这是因为 in-out 参数采用了拷入拷出内存模式：即在函数内部使用的是参数的 copy，函数结束后，又对参数重新赋值。关于 in-out 参数详细的介绍，请参考 [输入输出参数]()。



```swift

class StepCounter {
    var totalSteps: Int = 0 {
        willSet {
            print(newValue)
        }
        didSet {
            print(oldValue)
        }
    }
    
    func testInOut( p : inout Int) -> Void {   
        p = 3		//这里是不会触发属性观察器；函数出栈后触发观察器
    }
}

let test = StepCounter();
test.totalSteps = 5;		//触发 willSet、didSet
test.testInOut(p: &test.totalSteps)
print(test.totalSteps);		//如果没有该行代码，是不会触发观察器，内部做了优化。

```



### 属性包装器

属性包装器简单来说就是一套模板，通过这个模板，快速设置属性的set、get方法。确实非常强大。

关键字：`@propertyWrapper`、`wrappedValue`

```swift
@propertyWrapper
struct ConsoleSetLog {
    private var number: Int
    init() { self.number = 0 }
    //通过 wrappedValue 来声明模板
    var wrappedValue: Int {
        get {   return number   }
        set {
            number = newValue
            print("This is a set of porperty wrapper")
            print(newValue)
        }
    }
    
    //Wrapper内也可实现函数等
    func foo() { print("Foo") }
}

class TestPropertyWrapper {
    @ConsoleSetLog var one : Int;		//one通过属性包装器自动获得 对应 get、set方法
}

var test = TestPropertyWrapper()
test.one = 10;

```



#### 初始值

设置被包装属性的初始值有三种方法：

* 在构造函数内赋初值
* 在属性包装器内，实现对应构造函数，声明可直接赋值
* 在属性包装器内，实现对应构造函数，声明可实现自定义特性



**在构造函数内赋初值**

```swift
@propertyWrapper
struct TwelveOrLess {
    var number: Int
    init() { self.number = 1 }
    
    
    var wrappedValue: Int {
        get { return number }
        set { number = min(newValue, 12) }
    }
}

struct SmallRectangle {
    @TwelveOrLess var height : Int
    @TwelveOrLess var width : Int
    
    
    init() {
        self.height = 2		//在构造器内直接对变量赋值
        self.width = 2
    }
}
```



**在属性包装器内，实现对应构造函数，声明可直接赋值，或实现自定义特性**

```swift

@propertyWrapper
struct SmallNumber {
    private var maximum: Int
    private var number: Int

    var wrappedValue: Int {
        get { return number }
        set { number = min(newValue, maximum) }
    }

  	//默认构造器
    init() {
        maximum = 12
        number = 0
    }
  
 		//@SmallNumber var height: Int = 1 时调用
    init(wrappedValue: Int) {
        maximum = 12
        number = min(wrappedValue, maximum)
    }
  
  	//@SmallNumber(wrappedValue: 2, maximum: 5) var height: Int 时调用
    init(wrappedValue: Int, maximum: Int) {
        self.maximum = maximum
        number = min(wrappedValue, maximum)
    }
}


struct UnitRectangle {
    @SmallNumber var height: Int = 1		//调用 init(wrappedValue: Int)  构造器
    @SmallNumber var width: Int = 1			//也会调用 init(wrappedValue: Int)  构造器
}

struct NarrowRectangle {
    @SmallNumber(wrappedValue: 2, maximum: 5) var height: Int	//调用 init(wrappedValue: Int, maximum: Int) 构造器
    @SmallNumber(wrappedValue: 3, maximum: 4) var width: Int	//也会调用 init(wrappedValue: Int, maximum: Int) 构造器
}

```



#### 呈现值

属性包装器可以呈现一个值。

关键词：`$`

```swift
@propertyWrapper
struct SmallNumber {
    private var number: Int
    var projectedValue: Bool
    init() {
        self.number = 0
        self.projectedValue = false
    }
    var wrappedValue: Int {
        get { return number }
        set {
            if newValue > 12 {
                number = 12
                projectedValue = true			//呈现值
            } else {
                number = newValue
                projectedValue = false		//呈现值
            }
        }
    }
}
struct SomeStructure {
    @SmallNumber var someNumber: Int
}
var someStructure = SomeStructure()

someStructure.someNumber = 4
print(someStructure.$someNumber)				//使用$符号，访问呈现值
// 打印 "false"

someStructure.someNumber = 55
print(someStructure.$someNumber)				//使用$符号，访问呈现值
// 打印 "true"
```



### 全局变量和局部变量

全局变量是在函数、方法、闭包或任何类型之外定义的变量。局部变量是在函数、方法或闭包内部定义的变量。

* 全局变量或局部变量可以定义为计算型变量
* 全局变量或局部变量可以为存储型变量定义观察器
* 全局的常量或变量都是延迟计算的，不需要lazy修饰
* 局部范围的常量和变量从不延迟计算



### 类型属性

类型属性也很好理解，就是类属性，独立于实例外，属于类。**first-class都可以有类型属性。**

* 关键字：`static`、`class`
* 类属性必须为存储型类型属性指定默认值。
* 在为类定义计算型类型属性时，可以改用关键字 class 来支持子类对父类的实现进行重写。

```swift
class SomeClass {
    static var storedTypeProperty = "Some value."		//类存储属性
    static var computedTypeProperty: Int {					//类计算属性
        return 27
    }
  
  	//用 class 声明，该 类计算属性 支持被子类重写
    class var overrideableComputedTypeProperty: Int {
        return 107
    }
}
```





## 方法



### 结构体和枚举

结构体和枚举是值类型。默认情况下，值类型的属性不能在它的实例方法中被修改。可使用  mutating 关键字，让方法可以修改实例的方法。原理是会重新生成一个结构体赋值给这个实例的self

* 关键字：`mutating`

```swift
//错误示例
struct Point {
    var x = 0.0, y = 0.0
  
  	//这种写法会报错，因为结构体和枚举内，属性不能被示例方法修改
    muta func moveBy(x deltaX: Double, y deltaY: Double) {
        x += deltaX
        y += deltaY
    }
}

//正确示例
struct Point {
    var x = 0.0, y = 0.0
    mutating moveBy(x deltaX: Double, y deltaY: Double) {
        x += deltaX
        y += deltaY
    }
}

```



### 类方法

关键字：`static`、`class`

在方法的 func 关键字之前加上关键字 static，来指定类型方法。类还可以用关键字 class 来指定，从而允许子类重写父类该方法的实现，与属性的定义相同。

**First-class都可以有类方法。**

```swift
class SomeClass {
    //类变量
    static var highestUnlockedLevel = 1
    //类方法
    static func someClassFunc(){
        
    }
    //可重写父类的类方法
    class func someSubMethod() {
        
    }
}
```



## 下标

关键字：`subscript`

可通过 subscript 对枚举、结构体、类定义下标，使用类似数组下标访问的方式对 枚举、结构体、类 进行快捷访问。

下标的定义方法类似计算属性，使用到了`get`、`set`，这块与计算属性相同

```swift
struct TestSubscript {
    var object : [String] = ["one", "two", "Three", "Four"]
    
  	//定义下标
    subscript(index :Int) -> String? {
        get{
            if index < object.count {
                return object[index]
            }else{
                return nil
            }
        }
        set{
            if index >= 0 && index < object.count {
                object[index] = newValue!
            }
        }
    }
    
}

let test = TestSubscript();
printf(TestSubscript[0]);			//通过下标访问
printf(TestSubscript[1]);			//通过下标访问
```

**注：下标的入参和出参个数不限，类型不限。**



### 类型下标

关键字：`static`、`class`

**First-class都可以有类型下标(`class`关键字为类独有）**

```swift
enum Planet: Int {
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
    static subscript(n: Int) -> Planet {
        return Planet(rawValue: n)!
    }
}
let mars = Planet[4]
print(mars)
```



## 继承

只有类才有继承特性，结构体和枚举没有。

关键字：`override`、`final`、`super`

* 使用`override`，重写父类 方法、属性、观察器属性、下标等
* 使用`final`，防止类、方法、属性、观察器、下标被重写，例如：`final var`、`final func`、f`inal class` 以及 `final subscript`
* 使用`super`，访问父类 方法、属性、下标等。



## 构造过程

### 多态

面对对象的三大特性：继承、封装、多态。

**多态的定义：相同的行为，不同的实现。**

多态的理解，可以从两方面：

* 静态多态，方法重载和方法重写
  * 方法重载，方法名相同，参数不同
  * 方法重写，子类重写父类方法
* 动态多态，代码中使用基类代替多个具体的子类，更加抽象化。



### 构造基本形式

```swift
init() {
    // 在此处执行构造过程，为所有变量初始化值
}
```



**注意点**

* Optional类型可以自动初始化为nil

* let常量只能在构造函数中初始化一次

* 如果所有变量定义时就已赋初值，则会自动创建默认构造函数

* 通过闭包或全局函数设置属性的默认值

  ```swift
  class SomeClass {
      let someProperty: SomeType = {
          // 在这个闭包中给 someProperty 创建一个默认值
          // someValue 必须和 SomeType 类型相同
          return someValue
      }()
  }
  ```

* 结构体逐一成员构造器（memberwise initializer)，当没有显示指定构造器时，结构体会自动获得一个逐一成员构造器。一旦有自定义构造器，则逐一成员构造器失效

  ```swift
  struct Size {
      var width = 0.0, height = 0.0
  }
  
  //memberwise initializer
  let twoByTwo = Size(width: 2.0, height: 2.0)
  ```

  

### 值类型的构造器（枚举或结构体）

* 值类型构造器只能代理到自身其他构造器里，**不存在便利构造器**
* 如果你为某个值类型定义了一个自定义的构造器，你将无法访问到默认构造器（如果是结构体，还将无法访问逐一成员构造器）。但是在extension写自定义构造器，则可以规避这个问题。



### 类的构造器

关键字：`init`、`convenience`

```swift
//指定构造器
init(parameters) {
    statements
}

//便利构造器
convenience init(parameters) {
    statements
}
```



#### 构造器代理

构造器代理调用的三条规则

* 规则 1 指定构造器必须调用其直接父类的的指定构造器。
* 规则 2 便利构造器必须调用同类中定义的其它构造器。
* 规则 3 便利构造器最后必须调用指定构造器。

即，**指定构造器必须总是向上代理，便利构造器必须总是横向代理**

<img src="./img/initRuler.png" style="zoom:50%;" />



```swift
class Food {
    var name: String
  
  	//指定构造器，可以有多个
    init(name: String) {
        self.name = name
    }
  
  	//便利构造器，可以有多个，可以代理到其他遍历构造器，但最有一个便利构造器一定要代理到指定构造器上
    convenience init() {
        self.init(name: "[Unnamed]")		//代理到 指定构造器 init(name: String)
    }
  
    convenience init(other: String) {
        self.init()			//代理到 便利构造器 convenience init() 
    }
}
```



#### 两段式构造过程

```swift
    
//两段式构造过程
init(){
      
       //这里是第一阶段，类中的每个存储型属性赋一个初始值，这个阶段是从子类往父类层层调用
        a1 = "test"
        a2 = 4


        
        super.init(b: "2")

        //这里是第二阶段，它给每个类一次机会，在新实例准备使用之前进一步自定义它们的存储型属性，这个阶段是父类往子类层层调用
        b1 = "3"
        self.testFunc()
    }

//如果子类的构造器没有在阶段 2 过程中做自定义操作，并且父类有一个无参数的指定构造器，你可以在所有子类的存储属性赋值之后省略 super.init() 的调用
init(origin: Point, size: Size) {
    self.origin = origin
    self.size = size
  	
  	//省略 super.init() 的调用
}

```



#### 构造器的继承和重写

* 默认情况下，Swift 中的子类默认情况下不会继承父类的构造器
* 需要重写父类构造器时，必须跟函数一样，显式使用 `override`



**子类自动继承父类构造器的情况**

* 规则 1,**如果子类没有定义任何指定构造器**，**它将自动继承父类所有的指定构造器**。

* 规则 2，**如果子类提供了所有父类指定构造器的实现**——无论是通过规则 1 继承过来的，还是提供了自定义实现——**它将自动继承父类所有的便利构造器**。

  

  <img src="./img/initializersInherit.png" style="zoom:50%;" />

图中，由于子类提供了所有父类指定构造器的实现，所以自动继承了Food类的便利构造器



#### 必要构造器

关键字：`required`

```swift
class SomeClass {
  	//声明子类必须重写该构造器，且子类不需要使用override
    required init() {
    }
}
```



### 可失败构造器

构造器存才返回nil的情况，则可创建**可失败构造器**

基本形式：`init?`、init!

```swift
struct Animal {
    let species: String
  
  	//可失败构造器
    init?(species: String) {
        if species.isEmpty {
            return nil
        }
        self.species = species
    }
}

//init!
init!(){
		//一旦 init! 构造失败，则会触发一个断言
}
```





## 析构过程

关键字：`deinit`

只有类才有析构过程。

```swift
deinit {
    // 执行析构过程
}
```



## 扩展

### 基本定义

关键字：`extension`

```swift
//扩展基本格式，Swift中扩展不需要写名字
extension SomeType {
  // 在这里给 SomeType 添加新的功能
}

//增加协议
extension SomeType: SomeProtocol, AnotherProtocol {
  // 协议所需要的实现写在这里
}
```



Swift中可以对 **枚举、结构体、类、协议 **进行扩展，功能非常强大，可以直接能加实例变量等，几乎无所不能。



**可扩展的点：**

* 添加计算型实例属性和计算型类属性
* 定义实例方法和类方法
* 提供新的构造器
* 定义下标
* 定义和使用新的嵌套类型
* 使已经存在的类型遵循（conform）一个协议



**不能扩展的点：**

* 不能重写已经存在的功能
* 不能添加存储属性
* **不能给类添加新的指定构造器或析构器，这些必须由原始类实现，只能添加新的便利构造器。**但对于值类型（枚举、结构体），可以添加指定构造器（值类型不存在便利构造器）。



## 协议

Swift中协议，可以声明 方法、属性，此外还有一些细节注意点



### 基本格式

```swift
//定义一个协议
protocol FirstProtocol {
  
}

protocol SomeProtocol {
    
  	//声明属性（存储属性或计算属性），必须指定可读可写
    var mustBeSettable: Int { get set }					//可读可写
    var doesNotNeedToBeSettable: Int { get }		//可读，只要满足可读要求即可，非只读
  
  	//声明 类属性，需要用到 static 关键字，
  	static var someTypeProperty: Int { get set }
    static var someTypeProperty_2: Int { get set }
  
  	//声明 类方法
  	static func someTypeFunc()
  
  	//声明 mutating 方法，用于结构体或枚举中该方法修改自身值，必须使用 mutating 关键字，否则对应实现无法修改自身属性
    mutating func toggle()
  
  	//声明 构造器，实现类必须 用required关键字
  	init(someParameter: Int)
}

//实现协议的方法，（先写继承类，后写协议）
class SomeClass: SuperClass, FirstProtocol, SomeProtocol {
  
  	//存储属性实现（也可用计算属性方式实现）
  	var mustBeSettable: Int = 0
  	
  	//计算属性实现（也可用存储属性方式实现）
    var doesNotNeedToBeSettable: Int{
        get{
            return 1
        }
        set{
            print(newValue)
        }
    }
  
  	//类属性实现
    static var someTypeProperty: Int = 2		//存储属性只能用static
  	//类计算属性可以用 static 或 class
    class var someTypeProperty_2: Int{
        get{
            return 1
        }
        set{
            
        }
    }
    
  	//实现 类方法，可用 static 或 class
    static func someTypeFunc() -> Void{
        
    }
  
  	//实现 构造器，必须 用required 关键字
    required init(someParameter: Int) {
        
    }
  
  	//协议合成，关键字 & ，变量 para 需要同时遵守  FirstProtocol 和  SomeProtocol 协议
    func wishHappyBirthday(to para: FirstProtocol & SomeProtocol) {
        
    }
  
  	
		
}

//------------------------------------------------ 
//定义类专属协议，即只能class实现该协议，必须使用关键字 AnyObject
protocol SomeClassOnlyProtocol: AnyObject {
  
}

//实现类专属协议，这里只能class实现
class TestOnlyClass : SomeClassOnlyProtocol {
    
}

//未遵守任何协议
class TestClassNoProtocl {
    
}

/*

判断是否遵守协议，is, as? , as!
is , 表示是否遵守协议，返回 ture or not
as? , 如果遵守协议返回 协议的可选值；否则返回nil
as! , 强制转换为协议类型，如果不遵守该协议，则会触发运行时错误

*/
class TestIsAs {
    
    func test(){
        let array : [AnyObject] = [
            TestOnlyClass(),
            TestClassNoProtocl()
        ]
        
        for object in array {
            
            //is, 表示是否遵守协议，返回 ture or not
            if object is SomeClassOnlyProtocol {
                print("\(object) is SomeClassOnlyProtocol")
            }else{
                print("\(object) is not SomeClassOnlyProtocol")
            }
            
            //as? , 如果遵守协议返回 协议的可选值；否则返回nil
            if let value = (object as? SomeClassOnlyProtocol) {
                //if let 使用了可选绑定对其进行解值，(object as? SomeClassOnlyProtocol) 类型为 Optional<SomeClassOnlyProtocol>
                print("\(value) is SomeClassOnlyProtocol")
            }else{
                print("\(object) is not SomeClassOnlyProtocol")
            }
            
            //as! , 强制转换为协议类型，如果不遵守该协议，则会触发运行时错误
            let value = object as! SomeClassOnlyProtocol
            print(value)
            
        }
        
        
    }
}

```



### 扩展

```swift

protocol OneProtocol {
    func one()
}


//扩展增加协议实现
class OneClass{
}
extension OneClass: OneProtocol{
   func one() {
   }
}

//类 和 扩展 均可放置实现 和 声明，有一点需要注意，即使满足了协议的所有要求，类型也不会自动遵循协议，必须显式地遵循协议。
class TwoClass: OneProtocol{

}
extension TwoClass{
    //实现 放到扩展中
    func one() {
    }
}
class ThreeClass{
    func one() {
    }
}
extension ThreeClass: OneProtocol{
    //声明 放到扩展中
}




//对协议进行扩展，扩展里的方法必须有默认实现
protocol TwoProtocol {
    func two()
}
extension TwoProtocol{
    func two(){
        print("two")
    }
    
    //会直接报错，必须有方法实现
//    func three()
    
    //给协议增加方法，但是必须有默认实现
    func four() -> Void{
        print("four")
    }   
}
class FourClass: TwoProtocol{
    
    //可以不用实现 two(),four() 方法
    
    //也可以重写默认实现
    func four() {
        print("sss")
    }
}


//扩展中的where语句

//有条件地遵循协议，只有当 Array 遵守 TextRepresentable 时，才会有该实现
protocol TextRepresentable {
}
extension Array: TextRepresentable where Element: TextRepresentable {
    func test(){
        print("Array - TextRepresentable")
    }
}
class TestClass: TextRepresentable {
    
}
class AClass {
    
}
        
let array = [
    TestClass(),
]
array.test()		//只有array里元素都遵守 TextRepresentable 时，才能调用此方法


//通过where语句为协议扩展添加限制条件，只有遵循协议的类型满足这些限制条件时，才能获得协议扩展提供的默认实现
extension Collection where Element: Equatable {
    func allEqual() -> Bool {
        for element in self {
            if element != self.first {
                return false
            }
        }
        return true
    }
}
```



### 可选协议

Swift中协议里的属性、方法都必须实现，不存在可选的概念。

但是作为变通，有两种方法可以实现类似可选的概念

```swift
//第一种方法，使用扩展为协议增加默认实现
protocol TwoProtocol {
    func two()
}
extension TwoProtocol{
  	//通过扩展，给协议方法增加默认实现
    func two(){
        print("two")
    }
}
class TestClass: TextRepresentable {
    //实现类可不用再实现 func two()
}


//第二种方法，使用 @objc 和 optional 组合，该方法只针对 继承OC的类或者被 @objc标记的类，用于与OC交互时使用，结构体和枚举则不能实现该协议
import Foundation
@objc protocol CounterDataSource {
    @objc optional func increment(forCount count: Int) -> Int
    @objc optional var fixedIncrement: Int { get }
}

```

