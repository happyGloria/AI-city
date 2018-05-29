
## 智能安防社区系统

### 一、一标六实（二维地图）

#### 1.1 页面功能

| 功能模块                 | UI展示                                                | 相关信息                                                     |
| ------------------------ | ----------------------------------------------------- | ------------------------------------------------------------ |
| 搜索                     | ![search](img/ybls-search.png)                        | `modules/controllers/community/2dMapCtrl.js`<br />`$scope.communityMap`<br />`modules/config/configFile.js` |
| 一标六实                 | ![实有警情事件](img/ybls-total.png)                   | `template/html/modules/community/communityAllNew.html`，43~72<br />`#/index/communityAllNewChart/` |
| 实有力量在线统计         | ![实有力量在线统计](img/ybls-power-total.png)         |                                                              |
| 今日实有警情事件情况统计 | ![今日实有警司事件情况统计](img/ybls-event-total.png) |                                                              |
| 感知数据统计             | ![感知数据统计](img/ybls-ganzhi-total.png)            |                                                              |
| 今日感知增量             | ![今日感知数据](img/ybls-today-total.png)             | `modules/controllers/community/communityAllNewCtrl.js`<br />648<br />`echarts.init(document.getElementById('perceptionAllCharts'))` |

#### 1.2 NPGIS地图

* 地图配置：`lib/map/mapConfig.json`

  

* [NPMap](http://map.netposa.com:9500/document/NPMapLib.Map.html)

* 功能：`框选`、`图层`

* 点位：[聚合信息](http://map.netposa.com:9500/newroot/gis-manager/gis_demo.html#demos/Symbols/ClusterPoints.html)、[信息窗口](http://map.netposa.com:9500/newroot/gis-manager/gis_demo.html#demos/Symbols/InfoWindow.html)、[多边形](http://map.netposa.com:9500/newroot/gis-manager/gis_demo.html#demos/Geometry/Polygon.html)、[坐标转换](http://map.netposa.com:9500/newroot/gis-manager/gis_demo.html#demos/Tools/proj.html)、[轨迹分析](http://map.netposa.com:9500/newroot/gis-manager/gis_demo.html#demos/Characteristic/trajectoryAnalysis.html)、[缩放时鼠标动画](http://map.netposa.com:9500/newroot/gis-manager/gis_demo.html#demos/Characteristic/zoomAnimation.html)、[地图信息](http://map.netposa.com:9500/newroot/gis-manager/gis_demo.html#demos/Services/GetZoom.html)、[鼠标位置控件](http://map.netposa.com:9500/newroot/gis-manager/gis_demo.html#demos/Controls/MousePositionControl.html)、[ARCGIS本地地图](http://map.netposa.com:9500/newroot/gis-manager/gis_demo.html#demos/Layers/ArcgisLocalTileLayer.html)

* 常见问题:http://map.netposa.com:9500/newroot/gis-manager/problem.html

* 高德地图 http://lbs.amap.com/console/show/picker

* NPGIS SERVER部署手册 - 导出地图配置信息

##### 1.3.1 NPGIS配置
* 地图配置：`lib/map/mapConfig.json`
* [几何绘制工具](http://map.netposa.com:9500/newroot/gis-manager/demos/Tools/DrawingTool.html)
* [坐标转换服务](http://map.netposa.com:9500/newroot/gis-manager/demos/Tools/proj.html)
* [在线坐标转换工具](http://mapclub.cn/archives/2168)
* [地图配置文件获取](http://map.netposa.com:9500/npgis_server/gis_manager/interface.html)


##### 1.3.2 NPGIS工具

* 应用程序：

  [NPGIS地图下载工具V1.2.1.6(rar) ](http://map.netposa.com:9500/doc/tags/%E7%A6%BB%E7%BA%BF%E5%9C%B0%E5%9B%BE%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B7/NPGIS%E5%9C%B0%E5%9B%BE%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B7V1.2.1.6) ，用于下载离线地图 （谷歌、天地图、高德，矢量、影像地图）

* 相关文档：

  [地图切片下载工具使用说明(doc) ](http://map.netposa.com:9500/doc/tags/%E7%A6%BB%E7%BA%BF%E5%9C%B0%E5%9B%BE%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B7/%E5%9C%B0%E5%9B%BE%E5%88%87%E7%89%87%E4%B8%8B%E8%BD%BD%E5%B7%A5%E5%85%B7%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.doc) ,地图下载工具使用文档

##### 1.3.3 地图名词

* 地图服务、地图切片

##### 1.3.4 坐标系

  * WGS84坐标
  * 百度坐标
  * 火星坐标系
  * 墨卡托投影

  ​

#### 1.3 SDK接口使用说明文档

http://map.netposa.com:9500/doc/tags/NPGIS%20JS%20SDK%E6%8E%A5%E5%8F%A3%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3.PDF



#### 1.4 区域生成

- [多边形](http://map.netposa.com:9500/newroot/gis-manager/demos/Geometry/Polygon.html)
- [几何绘制工具](http://map.netposa.com:9500/newroot/gis-manager/demos/Tools/DrawingTool.html) （84坐标系，可以直接使用；徐汇的是平面坐标系）




### 二、智慧小区（三维地图）

#### 2.1 基础信息

* 网址：`http://15.128.21.140:28080/#/index/communityNew/2`

* 浏览器：`IE 11`

* 控制：`unity3d`

* 代码：

  ```html
  <embed src="http://15.128.21.231/diting/diting.unity3d"
         type="application/vnd.unity"
         firstframecallback="UnityObject2.instances[0].firstFrameCallback()"
         enabledebugging="0"
         disablecontextmenu="true"
   >
  ```

* 问题：重点查看 `unity3d`游戏引擎



#### 2.2 三维地图弹窗

* 一标六实小区统计页面（`modules/controllers/community/community2dCtrl.js`）
* 一标六实小区二维地图页面（`modules/controllers/community/2dMapCtrl.js`）

##### 2.2.1 楼栋

* UI视图

  ![3D地图点击弹出层](img/20180426121308.jpg)

* 代码：（`clickBuilding()`）

  * 模板：`template/html/modules/buildingHouse/building.html`



##### 2.2.2 住户

* UI

  ![住户](img/people-pop.png)

* 代码：（`clickResident()`）

  * 模板：`template/html/modules/buildingHouse/house.html`


* 点击证件号跳转

  | 说明                              | UI                              |                                  |                                  |
  | --------------------------------- | ------------------------------- | -------------------------------- | -------------------------------- |
  | 住户信息                          | 车辆信息                        | 门禁记录                         | 人脸抓拍                         |
  | ![住房信息](img/people-house.png) | ![车辆信息](img/people-car.png) | ![门禁记录](img/people-door.png) | ![人脸抓拍](img/people-face.png) |
  |                                   |                                 |                                  |                                  |



### 三、依图网接口调用

#### 3.1 用户登录

> 系统所有的操作都需要先进行用户登录

* 登录接口: `http://${ip}:${port}/${prefix}/login`

* 登录后会返回 `session_id`, 后续操作

* 入参：

  ```json
  {
      name: 'dfwl',
      password: '0fef*****e92' // md5加密后的32位密文
  }
  ```

* 返回

  ```json
  {
      message: 'OK',
      rtn: 0,
      session_id: '1247572224@DEFAULT'
  }
  ```


#### 3.2 布控

* 第 1步: 登录(如果登录过,就使用 `session id`)

* 第 2步: 查看摄像头列表, 查找到所需要的摄像头, 并拿到摄像头 `id`

  ​	如果所需要的摄像头不在列表之中, 那么创建摄像头,并拿到摄像头 id
  	注: 摄像头相关的接口:   `http://${ip}:${port}/${prefix}/camera`

* 第 3步: 查看人像库列表, 查找到需要布控的人像库, 拿到人像库 `id`, 如果人像库没有, 则需要建库和导入图片
* 第 4步: 用摄像头 id列表和人像库 id列表来创建一个布控, 布控相关接口:
  `http://${ip}:${port}/${prefix}/surveillance/task`

##### 3.2.1 查看布控 

* 请求类型： `http(get)` 请求

* 请求地址： `http://${ip}:${port}/${prefix}/surveillance/task`

* 返回结果：

  ```json
  {
      message: "OK",
      rtn: 0,
      surveillances: [
          {
              id: "0",
              name: "",
          }
      ]
  }
  
  
  ```

  


#### 3.3 人脸抓拍

* 接口地址：`business/api/condition/query_camera `

* ```js
  var yitu_getFacePicsByCondition = function(){
      
  }
  ```

#### 3.4 报警查询接口(实有力量，关注人员)  

* 接口地址：`business/api/hit/alert`



#### 3.5 徐汇人像依图网逻辑

* `business/api/login` （`POST`）- 登录后，获取 `session_id`
* `business/api/surveillance/task`  （`GET`）查看布控
  * 返回布控列表， `surveillances.units.camera_id`：布控单元列表-摄像头id
* `http://${ip}:${port}/${prefix}/camera` （`GET`）查看摄像头 / 摄像头区域列表
* `query_camera` - 条件查询接口( 摄像头查询）
  * 入参：`camera_ids`，`surveillances.units.camera_id`
* `alert`  surveillance_ids: 布控单元ID




### 四、技术归类

* ocx视频：`chrome 30`、`chrome 40`，`IE 11`
* 二维地图: `NPGIS`
* 三维地图: `unity3d `  游戏引擎
* 布控播放器：`ocx`
