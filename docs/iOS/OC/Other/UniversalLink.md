---
title: Universal Link接入方案
date: 2021-03-25 11:07:09
sidebarDepth: 4
categories: 
 - iOS
tags: 
 - Other
---

[[toc]]

# Universal Link接入方案

基本步骤：

* 苹果后台AppleId对Association Domains 配置Enable
* Xcode配置Assocication，例如：**applinks:www.baidu.com**

* 创建 `apple-app-site-association` 文件
* 需要**https**域名站点，association文件放到https://xxx.xxx.com 主域名`根目录`下或者`.well-known`目录



## 苹果配置

* AppleId对Association Domains 配置Enable

* Xcode配置Assocication，基本格式：

  ```objc
  //注意，这里一定需要前缀，或者*.baidu.com
  applinks:www.baidu.com
  ```
```
  
  

## HTTPS站点

* 创建 `apple-app-site-association` 文件，格式如下

  ```json
  {
      "applinks": {
          "apps": [],
          "details": [{
              "appID": "2J35792XXL.com.tongcheng.iphone",
              "paths": ["*"]
              }]
      }
  }
```

* association文件放到https站点主域名`根目录`下或者`.well-known`目录，https://x.x.cn/apple-app-site-association 要能下载到

