---
title: RN 开发项目 琐碎积累
date: 2019-12-19 10:45:13
sidebarDepth: 4
categories: 
 - iOS
tags: 
 - RN
---
[[toc]]
[TOC]


# RN 开发项目 琐碎积累

### 回调函数的写法
从cell 触发事件 回调到 FlatList 所在的 class ，然后由class处理时间，比如修该cell高度等

```jsx
//在FlatList calss 内，渲染 Item 的时候 ,传入一个 func ,该函数为本class的函数
<Item data={item} func={this._pressedCell} displayMore={displayMore}></Item>

_pressedCell = (object) => {
    
}
    
//在 cell 内 就可以拿到该 func，然后触发该函数就，同时传参
_pressEvent = () => {
    this.props.func(this.props.data);
}

```



### 把  FlatList 所在的 class 属性传给 cell

```jsx
//写法如下，传入 {...this.props}
<SomeOtherWidget
    {...this.props}
    onPress={this._onPress}
/>
```



### FlatList高度计算

FlatList 不需要计算高度，本身自己会计算高度，所以使用 FlatList 代替 ListView 和 TCList



### FloxBox 布局

FloxBox 布局分为三种：

* FlexBox 布局
* positoin absolute 绝对布局
* position relative 相对布局，该布局下，就是简单的流布局，只能使用 left top ,不能使用 right bottom



### 箭头函数 与 bind 函数的区别

注意 箭头函数 与 bind 函数的区别，简单来说，在 render 函数里渲染组件的时候，尽量用箭头函数，这样在FlatList里会避免多余的渲染，具体参见 [bind和箭头函数，哪个更好呢？](http://bbs.reactnative.cn/topic/2480/bind%E5%92%8C%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0-%E5%93%AA%E4%B8%AA%E6%9B%B4%E5%A5%BD%E5%91%A2)



### 关于 React 中的 ref

关于 React 中的 ref，可以参见 [弄懂 React 的 ref，理解 React 的实例与 vDom 之间的关系](https://www.jianshu.com/p/4e2357ea1ba1)



### JS 中 数组的复制

Js 中 数组的复制 可以使用：

```jsx
var colors = ["red", "green", "blue"];
var colors2 = colors.concat("yellow", ["black", "brown"]);
```



### 修改子组件的 state，经过测试是不会刷新状态的



### 关于动态计算 `Text`

关于动态计算 `Text`，比如有一个这样的需求，当文本的高度超过5行时需要折叠文本，在RN里目前不能预先计算高度，只能通过 `onLayout` 函数拿到展示后的高度，然后去进行逻辑控制，目前性能问题暂时未知



### 富文本问题

富文本问题，比如，一个文本要不同的字显示不同的颜色，在RN里比较简单，直接用 `Text` 嵌套就可以了，`子Text`会继承`父Text`的属性，然后重新设置要改变的style即可



### `Text`组件的 `borderRadius`不起作用，需要外部包裹`View`来实现



### react-devtools

从 `RN 0.43`开始，官方增加了 **react-devtools** 工具，可以审查RN元素

```shell
//安装
npm install -g react-devtools

//运行
react-devtools
```



### `flex:1` 的错误

犯了一个错误，一个`View`内，上下有两个元素，上部元素是根据内容决定高度，下部元素是一个高度固定为10的`View`，但是都设置了 `flex: 1`，开始是想让下部元素的宽度撑到屏幕，但是没考虑到这样设置后，上下的高度会按比例分割成各自占一半，这个问题一直没想明白是为什么，最后通过 **react-devtools** 发下下部元素高度占了一半，才发现问题根源



### 屏蔽页面中出的黄屏警告方法：

```jsx
console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
```



### render 的 return函数不能写多行语句，只能写表达式

在 **render 的 return函数里**，即`JSX`中不能写多行语句，只能写表达式，多行语句的逻辑处理一般放在 **return**函数之前。jxs的表达式写法，参考： [React 条件渲染](https://doc.react-china.org/docs/conditional-rendering.html)  。现在考虑一种需求，需要根据一个数组动态渲染 Image 的情况，这种写法一般由两种写法：

```jsx
// ---------------------------------------------  第一种写法，在return函数之前处理
//在 return 函数之前写，这里可以使用map函数也可以使用其他的循环语句
let picList = picArray.map((item) => {
        return (<Image></Image>);
    }
);

return (
	{picList}
)
```


    // ---------------------------------------------  第一种写法，在return 函数内写，使用map函数
    return (
        {
            picArray.map((item) => {
            	return (<Image></Image>);
        	}
        }
    )
    ```
    
    参考： [在render函数中怎么使用for循环](http://bbs.reactnative.cn/topic/845/%E5%9C%A8render%E5%87%BD%E6%95%B0%E4%B8%AD%E6%80%8E%E4%B9%88%E4%BD%BF%E7%94%A8for%E5%BE%AA%E7%8E%AF)



### 枚举实现、常量实现

```jsx
//枚举
export const RefreshState = {
    Idle: 0,
    HeaderRefreshing: 1,
    FooterRefreshing: 2,
    NoMoreData: 3,
    Failure: 4,
    EmptyData: 5,
}

//常量写法
    static defaultProps = {
        footerRefreshingText: '数据加载中…',
        footerFailureText: '点击重新加载',
        footerNoMoreDataText: '已加载全部数据',
        footerEmptyDataText: '暂时没有相关数据',
    }
```



### 引入其他文件的写法

```jsx
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
```



### 字符串转数字、数字转字符串

```jsx
//字符串转数字	parseInt()、parseFloat()
var num1 = parseInt("1234blue");
var num6 = parseInt("70");

//数字转字符串	 toString()
var num = 10;
num.toString()

```



### ScrollView内部高度计算问题

在 ScrollView 里，如果设置了ScrollView的padding，然后又设置了 flex 或宽高，内部高度计算会出问题，因为内部高度计算是按照 flex 或 设定的宽高来计算，padding值没有计算到内，可能底部有内容会滑动不上来，这种情况，建议内部元素用 margin 来实现。另外，如果需要scrollvew自动计算高度，本身 和 父容器都要确定高度或设定flex



### RN页面PUSH掉帧卡顿问题

在RN页面之间进行push的时候，会发现有掉帧的现象，页面会出现卡顿，这个官网也给了说明，大概意思是说因为进入页面做了很多操作，当出现开销很大的子组件数重绘的时候，JS控制的动画就会卡住，关于这点详见 [性能-JavaScript 帧率](https://reactnative.cn/docs/0.46/performance.html#content)，其中官网给的替代方案是使用 [React Navigation](https://reactnavigation.org/) 库，这点回头可以仔细研究下



### FlatList `initialNumToRender`问题

FlatList 如果初始设置的 `initialNumToRender` 值过小，渲染的数量少于屏幕可显示的数量，那么屏幕会绘制两次，第一次会触发 `onEndReached` 方法，如果设置了上拉更新，就会错误触发该方法。经过测试发现，如果不设置 `initialNumToRender` 该值，则也会触发 `onEndReached` 方法，怀疑是如果不设置，系统可能初次渲染的cell个数比较少。我这里用的是 0.46.4 版本，不知道后面的RN版本有没有优化FlatList



### FlatList滑动多页后会遇到自己乱滚的现象

今天困扰我多天的问题解决了，**FlatList滑动多页后会遇到自己乱滚的现象**，困扰了我很久，很奇怪，网上和群里都没遇到这种情况，困扰了自己很久很久，差点放弃写RN，最后在偶然间发现是自己犯了一个很二的错误....

```js

//这里是原始写法
    _keyExtractor = (item, index) => {
        index;
    }
```

开始自己有个印象，记得在某个地方看过可以不用写return，js的函数会取最后的值，最后发现是不行的，这个地方一定要写return ，不写return的情况是去去掉 花括号的情况，比如：

```js
    //第一种写法，加 return
	_keyExtractor = (item, index) => {
        return index;
    }
    
    //第二种写法，不写return，但是要去掉 花括号
	_keyExtractor = (item, index) => index;
    
```

真的是很二的问题…困扰了很久，淡疼😪



### **函数抖动**与**函数节流**

**函数抖动**与**函数节流**，js里面有这两个概念，很有意思，回头研究下



### `RefreshListView`触发两次请求问题

在使用`RefreshListView`控件作为上拉刷新的空间，发现每次上拉，都会触发两次上拉刷新的函数，从而触发了两次请求，基本确定是当刷新数据同时修改刷新状态的后，又再次触发了某种机制，导致在 onScroll 函数里触发了新的上拉操作，经过断点发现此时的contentsize还是上次的。具体原因查找不到，最终无奈采用了延时500ms修改刷新状态的操作

```jsx
//会导致上拉刷新触发两次的代码
this.setState({
    dataList: array,
    refreshState: nomoredata? RefreshState.NoMoreData:RefreshState.Idle,
})

//进行延时修改上拉刷新状态的代码
this.setState({
    dataList: array,
})

setTimeout(
    () => {
    	this.setState({
        	refreshState: nomoredata? RefreshState.NoMoreData:RefreshState.Idle,
    	})
    },500)

```



### 无状态组件

```jsx
const ReactFormLabel = (props) =>(
    <label htmlFor={props.htmlFor}>{props.title}</label>
);
```



### 打开一个新页面的写法（项目内部）

```jsx

//继承TCPage
//然后调用
this.openNewPage(this.props.navigation, 'CommentDetail',dic);
```



### 多页面共享变量问题

```jsx
//需求，多个Js文件，要共享一些变量

//在Index.js 文件内定义
export let GlobalContext = {
    memberId: null,
    userName: null,
}

//在其他文件内
import {GlobalContext} from  './Index';
然后就可以在该文件内使用 GoablContext 变量了
```



