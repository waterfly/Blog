---
title: 数组字典的常见操作
date: 2021-04-21 20:36:23
sidebarDepth: 4
categories: 
 - iOS
tags: 
 - Swift
---

[[toc]]
[toc]

|      | 数组                                                         | 字典 |
| ---- | ------------------------------------------------------------ | ---- |
| 增   | shoppingList.append("Flour")<br/>shoppingList += ["Baking Powder"]<br/>shoppingList += ["Chocolate Spread", "Cheese", "Butter"] |      |
| 删   | let mapleSyrup = shoppingList.remove(at: 0)<br/>let apples = shoppingList.removeLast() |      |
| 改   | var firstItem = shoppingList[0]<br/>shoppingList[0] = "Six eggs"<br/>shoppingList[4...6] = ["Bananas", "Apples"]<br/>shoppingList.insert("Maple Syrup", at: 0) |      |
| 查   | sixDoubles.count<br/>shoppingList.isEmpty <br/><br/>//遍历<br/>//for-in, enumerated()<br/>for item in shoppingList {<br/>    print(item)<br/>}<br/><br/>//需要索引，用 enumerated()<br/>for (index, value) in shoppingList.enumerated() {<br/>    print("Item \(String(index + 1)): \(value)")<br/>} |      |



