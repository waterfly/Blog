---
title: VSCode
date: 2019-07-04 15:26:06
sidebarDepth: 4
categories: 
 - DevTools
tags: 
 - VSCode
---
[TOC]
[[toc]]

# VSCode

[VSCode官方站点](https://code.visualstudio.com/)

[VSCode中文文档](https://jeasonstudio.gitbooks.io/vscode-cn-doc/content/)



## 插件同步

* 下载安装 Settings Sync

* 配置 Github token ,Settings -- `Developer settings  --  Personal access token`

* 使用Settings Sync

  ```
  1. Upload Key : Shift + Alt + U
  2. Download Key : Shift + Alt + D
  ```

* 注意，该功能使用了Github 的glist功能，glist被墙了，上传同步需要开全局VPN

参考 [三分钟教你同步 Visual Studio Code 设置](https://juejin.im/post/5b9b5a6f6fb9a05d22728e36)



## 断点调试

VSCode断点调试需要先安装插件：`Debugger for Chrome`

### 调试模式 launch 和 attach

VSCode有两种调试模式，launch 和 attach，简单来说就是 launch重新打开应用，attach用来调试已经打开的应用，区别可以参考这篇文章：[Visual Studio Code 前端调试不完全指南](https://jerryzou.com/posts/vscode-debug-guide/) 

- launch模式：由 vscode 来启动一个独立的具有 debug 模式的程序，使用 launch 模式调试前端代码存在一个问题，就是 vscode 会以新访客的身份打开一个新的 Chrome 进程，也就是说你之前在 Chrome 上装的插件都没法在这个页面上生效
- attach模式：附加于（也可以说“监听”）一个已经启动的程序（必须已经开启 Debug 模式），在这种情况下 attach 模式就有它存在的意义了：对一个已经启动的 Chrome 进行监听调试。 

### launch.json文件

要配置断点调试必须配置launch.json文件，该文件必须在工程根目录的 `.vscode`文件夹内

#### 调试页面

* 用VSCode装载项目
* 按F5后会出现选择框，选择**Crome**，会自动生成launch.json文件
* 然后就可以正常断点调试了

#### 纯js调试

* 用VSCode装载项目
* 按F5后会出现选择框，选择**Node.js**，会自动生成launch.json文件
* 然后就可以正常断点调试了

#### launch.json说明

##### Launch模式下

```json
{
    "version": "0.1.0",
    "configurations": [
      //本地有服务，URL模式
        {
            "name": "Launch localhost",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost/mypage.html",
            "webRoot": "${workspaceFolder}/wwwroot"
        },
      //本地文件，local file
        {
            "name": "Launch index.html",
            "type": "chrome",
            "request": "launch",
            "file": "${workspaceFolder}/index.html"
        },
    ]
}
```

##### Attach模式

```json
{
    "version": "0.1.0",
    "configurations": [
        {
            "name": "Attach to url with files served from ./out",
            "type": "chrome",
            "request": "attach",
            "port": 9222,
            "url": "<url of the open browser tab to connect to>",
            "webRoot": "${workspaceFolder}/out"
        }
    ]
}
```



## 附录

详细配置参见官方文档 [vscode-chrome-debug](https://github.com/Microsoft/vscode-chrome-debug/blob/master/README.md)

