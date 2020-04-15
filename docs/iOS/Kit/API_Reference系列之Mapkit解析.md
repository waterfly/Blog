---
title: API Reference 系列 之Mapkit解析
date: 2016-07-24 16:43:56
sidebarDepth: 4
categories: 
 - iOS
tags: 
 - MapKit
---

[[toc]]

[TOC]

# 前言
最近要开发一个地图相关的工具，于是去苹果开发者官网查阅了资料。发现网站更新了API Reference 的文档结构，聚合了Framework的Guide和所有类，变得很清晰阅读。

虽然官网的Guide解释的已经比较清楚，但是不够直观。于是结合官网资料，对Mapkit做了一些思维导图，并做了一些注解。

本文章适合有OC基础，但对Mapkit不了解的同学。另外，本文章只大概说明Mapkit的作用和相关类，不做具体API说明。


# 概要
马斯克在一次访谈中，谈到他眼中的第一原理，简单来说就是从本质一层层往上走。

所以我们认识和学习一个事物，我觉得要从四个角度去考虑：

* 这个事务是什么
* 这个事务解决了什么问题
* 具体是怎么解决的
* 解决的详细步骤是什么

本文章中主要针对Mapkit讨论了前三个问题，第四个问题则需要使用Mapkit的同学结合官网和其他网站上的Demo，去自己实践。即本文将要讨论的三个问题：

* Mapkit是什么
* Mapkit解决了什么问题
* Mapkit是怎么解决这些问题的



# 详解
## Mapkit是什么
我们先看下官网的简要解释：

> Location-based information consists of two pieces: location services and maps. Location services are provided by the Core Location framework, which defines Objective-C interfaces for obtaining information about the user’s location and heading (the direction in which a device is pointing). Maps are provided by the Map Kit framework, which supports both the display and annotation of maps similar to those found in the Maps app. (To use the features of the Map Kit framework, you must turn on the Maps capability in your Xcode project.) Location services and maps are available on both iOS and OS X.

简单来说就是 Location framework 提供了定位和设备方向服务，MapKit提供了地图的标注和地图展示服务。

## Mapkit解决了什么问题
通过Mapkit，我们可以获取**当前定位、地图展示、标注、覆盖物、地理编码和反地理编码、位置检测、设备方向判断、获取路线信息、地理位置查询**等地图相关的操作。

## Mapkit是怎么解决这些问题的
Mapkit有很多类，针对以上的功能，画了一个思维导图，方便梳理。
![地图相关概念](http://upload-images.jianshu.io/upload_images/209493-23bd3be77d08d583.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 定位
iOS中获取用户当前坐标的方式有两种：
* 通过`Core Loation Framework`的`CLLocationManager`
* 通过Mapkit的`MKMapView`中`userLocation`获取(需要设置`showsUserLocation`)

从iOS8 开始，以上两种方式获取当前坐标时，都需要手动调用请求授权API：

* 配置plist中的授权提示文案，key为 `NSLocationWhenInUseUsageDescription` （前台） 或 `NSLocationAlwaysUsageDescription`（前台，后台）
* 手动调用`CLLocationManager`的`requestWhenInUseAuthorization`或`requestAlwaysAuthorization`，进行定位授权


通过`CLLocationManager`进行定位的基本步骤：

- 配置 `CLLocationManager`
- 调用 `requestWhenInUseAuthorization` 或 `requestAlwaysAuthorization`
- 实现`CLLocationManagerDelegate`

通过Mapkit中获取展示当前定位点的基本步骤：

- 创建`MKMapView`
- 设定`showsUserLocation=YES`
- 实现 `MKMapViewDelegate`的`mapView:didUpdateUserLocation:`



注：
1. `CLLocationManager`获得的坐标类型是**WGS84**坐标（即真实的地理坐标），MKMapView获得的坐标类型为**GCJ02**（即国测局经纬度坐标,高德用该坐标系）
2. 从iOS8以后，`MKMapView`只有展示后上才会启动定位，单独alloc一个`MKMapView`，并不会启动定位。
3. 相关的类：`CLLocationManager`，`MKMapView`


### 地图展示
展示地图是通过`MKMapView`类，初始化`MKMapView`，即可展示普通地图或卫星地图。这里不细说`MKMapView`类，相关的资料很多，主要提几个点。


这里有三种坐标系

* 地球的经纬度坐标。通过结构`CLLocationCoordinate2D`表示
* 墨卡托坐标。即地图上的点，通过`MKMapPoint`表示
* view上的坐标。即iOS的view坐标系，通过`CGPoint`表示

三种坐标系的相关类见下面的思维导图：
![三种坐标系](http://upload-images.jianshu.io/upload_images/209493-e572c35a3acc5767.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


有些情况，不需要展示一个完整的`MKMapView`，只需要展示**a map image**即可。则可以通过`MKMapSnapshotter`异步生成一个 **static map image**。

- 配置`MKMapSnapshotOptions`
- 初始化`MKMapSnapshotter`
- 调用`startWithCompletionHandler:`异步获得地图图片


### 标注 Annotation
**Annotation**，就是地图上的常见的大头针等标注。**Annotation**的设计遵循数据与View分离的原则，数据为符合`MKAnnotation`协议的类，View为`MKAnnotationView`的子类，添加的基本步骤如下：

- 定义一个 `MKPointAnnotation` 对象，添加数据
- 使用 `MKMapView` 的 `addAnnotation:` 方法添加到地图
- 实现 `mapView:viewForAnnotation:` 代理方法
- 在代理内定义 `MKPinAnnotationView` 对象

通过上面几个步骤，即可显示标准的大头针。如果要显示自定义标注，把`MKPointAnnotation`对象替换为自定义`MKAnnotation`，把`MKPinAnnotationView`替换为自定义的`MKAnnotationView`即可。

另外，在这块还有一个点是**Callout**，即自定义气泡，如下图是一个标准的**Callout**展示。通过`MKAnnotationView`的`canShowCallout`、`rightCalloutAccessoryView`、`leftCalloutAccessoryView`三个属性控制。
![Callout](http://upload-images.jianshu.io/upload_images/209493-cc3b25bbe789e2f4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 覆盖物 Overlay
简单来说，覆盖物就是在地图上画的线，圆，矩形等等。覆盖物的设计也遵循数据与View分离的原则。一个Overlay对象对应一个OverlayRenderer对象。

- Overlay 对象，通过实现 `MKOverlay` 协议，定义数据。现有的Overlay对象有：`MKPolyline` 、 `MKPolygon`、 `MKCircle`以及 `MATileOverlay`。
- Overlay 渲染器，通过继承 `MKOverlayRenderer`，用于在地图显示 Overlay。以上Overlay对应的渲染器对象有：`MKPolylineRenderer`、`MKPolygonRenderer`、`MKCircleRenderer`以及 `MKTileOverlayRenderer`。

更加复杂的自定义可以详见[Location and Maps Programming Guide](https://developer.apple.com/library/prerelease/content/documentation/UserExperience/Conceptual/LocationAwarenessPG/Introduction/Introduction.html#//apple_ref/doc/uid/TP40009497)中的解释。

### Geocoding and reverse-geocoding
geocoding，地理编码，即通过地理位置信息转化为坐标点。reverse-geocoding,反地理编码，即通过坐标点转化为地理位置信息。主要通过`CLGeocoder`实现。

### Region Monitoring And iBeacon
区域检测用于监测固定区域内的定位变化，在iOS上有两种方式，第一种是通过`CLLocationManager`监控指定区域（**circular Region**），另一种是通过蓝牙区域检测（**Beacon Region**）。其中蓝牙参见`Core Bluetooth framework`

### Heading
通过`CLLocationManager`可以获取当前设备的方向。

### Direction
Mapkit可以通过`MKDirections`获取指定的路线信息

### 地理信息查询
Mapkit支持用户查询地理位置信息，主要步骤为：

- 初始化`MKLocalSearchRequest`，配置查询参数
- 初始化`MKLocalSearch`
- 调用`startWithCompletionHandler:`获取查询结果


# 后记
本篇文章主要梳理了地图功能，并未详细分析API的使用，只作为地图框架参考，具体使用请查询相关API资料，并结合Demo进行练习。



# 附录
## 第一原理
马斯克在访谈中表述他眼中的第一原理：
> **我们运用「第一原理思维」而不是「比较思维」去思考问题是非常重要的。**我们在生活中总是倾向于比较——别人已经做过了或者正在做这件事情，我们就也去做。这样的结果是只能产生细小的迭代发展。「第一原理」的思考方式是用物理学的角度看待世界的方法，**也就是说一层层剥开事物的表象，看到里面的本质，然后再从本质一层层往上走。**这要消耗大量的脑力。

更多解释参见[马斯克的「第一原理」到底是什么？](http://www.geekpark.net/topics/212316)

## 火星坐标
简单来说就是对GPS坐标进行偏移后得到的坐标，就是所谓的火星坐标。国测局要求国内地图上的坐标都要经过偏移，即国内地图上的坐标都是火星坐标。下面是几种国内的经纬度。

- **wgs84**，GPS经纬度
- **gcj02**，国测局经纬度偏移坐标，高德用该坐标系
- **bd09**，百度经纬度坐标，百度在**gcj02**的基础上再次进行了偏移

这里需要注意的是`CLLocationManager`进行定位获得坐标是GPS坐标。


# 参考资料
* [MapKit API Reference](https://developer.apple.com/reference/mapkit)
* [Location and Maps Programming Guide](https://developer.apple.com/library/prerelease/content/documentation/UserExperience/Conceptual/LocationAwarenessPG/Introduction/Introduction.html#//apple_ref/doc/uid/TP40009497)
* [高度地图](http://lbs.amap.com/api/ios-sdk/guide/mapkit/#t1)
* [百度地图](http://lbsyun.baidu.com/index.php?title=iossdk/guide/basicmap#.E7.93.A6.E7.89.87.E5.9B.BE.E5.B1.82)
* [Core Location Manager Changes in iOS 8](http://nevan.net/2014/09/core-location-manager-changes-in-ios-8/)
* [Core Location 最佳实践 (WWDC 2016 - session716)](http://www.jianshu.com/p/990e0d86125e)