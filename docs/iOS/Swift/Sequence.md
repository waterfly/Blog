# Sequence

### IteratorProtocol

迭代器，Sequence的迭代器for-in就是用该协议实现。

```swift
//自定义需要实现的方法，Required
associatedtype Element
mutating func next() -> Self.Element?
```



### Sequence

`Sequence`是一个集合协议，提供了基本的集合抽象，提供对元素的顺序、迭代访问。内部集成了迭代器（遵守`IteratorProtocol`协议）。



#### 必要方法实现

```swift
//实现Sequence协议必须实现的方法：

func makeIterator() -> Self.Iterator
Required. Default implementations provided.

associatedtype Iterator
Required.

associatedtype Element
Required.

```



#### 常用方法

```swift
//Finding Elements
func contains(Self.Element) -> Bool		//Available when Element conforms to Equatable.
func contains(where: (Self.Element) -> Bool) -> Bool

//找出符号条件的第一个元素
func first(where predicate: (Self.Element) throws -> Bool) rethrows -> Self.Element?

func min() -> Self.Element?			//Available when Element conforms to Comparable.
func min(by areInIncreasingOrder: (Self.Element, Self.Element) throws -> Bool) rethrows -> Self.Element?

func max() -> Self.Element?			//Available when Element conforms to Comparable.
func max(by areInIncreasingOrder: (Self.Element, Self.Element) throws -> Bool) rethrows -> Self.Element?

//

```



#### Repeated Access

Sequence 协议对多个 for-in 行为是未定义的。如下面例子中所示，第一个for-in未结束就跳出了循环，那么第二个for-in 行为未定义，这里不能认定 for-in会继续迭代或从头开始。因为迭代器是通过 `IteratorProtocol` 实现，Sequence并没有在for-in提前跳出后 ，对`IteratorProtocol`做重置。

**注，Collection 不存在这个问题。**

```swift
for element in sequence {
    if ... some condition { break }
}

//这里不能认定 for-in会继续迭代或从头开始
for element in sequence {
    // No defined behavior
}
```



#### for-in

`Sequence`的 for-in 是通过 `IteratorProtocol` 实现，

自定义结构实现`Sequence`协议后，即可实现for-in循环，这里有两种方法。



第一种方法：

* 自定义结构声明实现`Sequence`和`IteratorProtocol`协议
* 只需要实现 `IteratorProtocol` 的方法 `next()` 即可（系统会自动生成 `makeIterator()`方法）

```swift
struct Countdown: Sequence, IteratorProtocol {
    var count: Int

    mutating func next() -> Int? {
        if count == 0 {
            return nil
        } else {
            defer { count -= 1 }
            return count
        }
    }
}

let threeToGo = Countdown(count: 3)
for i in threeToGo {
    print(i)
}
```



第二种方法：

* 自定义结构只声明实现 `Sequence`协议
* 提供自定义实现`IteratorProtocol`迭代器
* 实现 `makeIterator()` 方法

```swift
struct CustomIterator: IteratorProtocol{
    var count : Int
    mutating func next() -> Int? {
        if  count == 0 {
            return nil
        }else{
            defer {
                count -= 1
            }
            return count
        }
    }
}

struct TestSequence: Sequence {
    
    var count: Int
    
    func makeIterator() -> CustomIterator {
        return CustomIterator(count: count);
    }
}


```



