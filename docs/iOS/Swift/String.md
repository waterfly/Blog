## String

SwIft完全兼容Unicode



### Unicode 标量

> Unicode 标量是对应字符或者修饰符的唯一的 21 位数字，例如 `U+0061` 表示小写的拉丁字母（`LATIN SMALL LETTER A`）（"`a`"），`U+1F425` 表示小鸡表情（`FRONT-FACING BABY CHICK`）（"`🐥`"）。

Unicode 标量即对应一个Unicode字符。



### Character

Character，在可读层面对应的单个可读字符，在实现层面代表的是一个可扩展的*字形群*，由一个或多个Unicode标量组成。



### String

Swift的String与其他语言最大的不同是在索引这块。为了完全兼容Unicode，索引由`String.Index`构成，而不是整数索引，即定义了结构体`struct Index`来表示索引。这是由于Character可能是由多个Unicode标量组成，所以不能用整数索引。



> *另外需要注意的是通过* `count` *属性返回的字符数量并不总是与包含相同字符的* `NSString` *的* `length` *属性相同。*`NSString` *的* `length` 属性是利用 UTF-16 表示的十六位代码单元数字，而不是 Unicode 可扩展的字符群集。



### 常用方法



#### 索引

* `count`，获取Character个数

* `contains`，是否包含某个字符串

* `startIndex`， 获取第一个Character索引

* `endIndex`，获取最后一个Character的后一个位置索引（所以不能直接使用）

* `index(before:)`、`index(after:)`、`index(_:offsetBy:)`，获取偏移量

* `String.indices`，获取一个包含全部索引的范围Range

  ```swift
  for index in greeting.indices {
     print("\(greeting[index]) ", terminator: "")
  }
  // 打印输出“G u t e n   T a g ! ”
  ```



注，Swift的字符串遍历不太容易习惯，可将字符串转为数组，通过数组来遍历

```swift
//将Swift字符串转为Character数组
let string : String = "Hello ?? ??"
let characters: [Character] = Array(string)
```



#### 遍历

* 使用`String.indices`

  ```swift
  for index in greeting.indices {
     print("\(greeting[index]) ", terminator: "")
  }
  // 打印输出“G u t e n   T a g ! ”
  ```

* `forEach`

  ```swift
  let string : String = "Hello ?? ??"
  let characters: [Character] = Array(string)
  string.forEach { (c) in
      print(c)
  }
  ```

* `enumerated`

  ```swift
  for (n, c) in "Swift".enumerated() {
      print("\(n): '\(c)'")
  }
  
  // Prints "0: 'S'"
  // Prints "1: 'w'"
  // Prints "2: 'i'"
  // Prints "3: 'f'"
  // Prints "4: 't'"
  ```

  

#### 插入和删除

* `insert(_:at:)`，在一个字符串的指定索引插入一个字符
* `insert(contentsOf:at:)`，方法可以在一个字符串的指定索引插入一个段字符串
* `remove(at:)`，方法可以在一个字符串的指定索引删除一个字符
* `removeSubrange(_:)`，方法可以在一个字符串的指定索引删除一个子字符串



#### 增加

* `+`、`+=`运算符函数
* `append`，增加字符串





#### 子字符串

* `prefix(_:)`、`suffix(_:)`、`hasPrefix(_:)`、`hasSuffix(_:)`