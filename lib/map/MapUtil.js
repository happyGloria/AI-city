/**
 * 地图基本操作
 */

var mapOpera = {
    map: null //地图对象
};
mapOpera.param = {
    mapContainer: null, //地图容器
    map: null, //地图对象，同 mapOpera.map
    measuretool: null, //测量工具
    drawtool: null, //绘制工具
    overviewctrl: null, //鹰眼控件
    Navictrl: null, //导航控件
    versionCtrl: null, //版本控件
    scaleCtrl: null, //比例尺控件
    mousePoCtrl: null, //鼠标位置控件
    animation: null, //动画
    infoWindowIndex: 1,
    // userdefineLayer: null, //自定义层
    infoWindow: null, //信息窗口
    lastInfoWindow: null, //信息窗口 add by wdb 16.5.6
    infoWindowList: {'camera': [],'wif': [],'kakou': [],'point':[]}, //信息窗口列表
    vectorLayer: null, //矢量图基础图层
    satelliteLayer: null, //卫星图基础图层
    isTiandiOnline: false, //是否为天地图在线地图
    scriptPath: "lib/map/v1.0.3.3/Netposa/img/" // 当前脚本路径，末尾包含斜杠
};


/**
 * 设置Init.js中使用的Netposa/img的路径(Init.js获取路径方法有bug)
 */
OpenLayers.ImgPath = mapOpera.param.scriptPath;

/**
 * 初始化地图
 * @param  {[string]} mapId 地图容器id
 */
mapOpera.init = function(mapId, config) {
    //销毁之前可能创建的地图，防止重复调用
    if (window.mapMain) {
        window.mapMain.destroyMap();
        window.mapMain = null;
    }

    //console.info("地图版本: " + NPMapLib.VERSION_NUMBER);

    mapId = mapId || "mapId";
    mapOpera.param.mapContainer = document.getElementById(mapId);

    //地图容器没有加载完毕
    if (!mapOpera.param.mapContainer) {
        return;
    }

    var map = window.mapMain = mapOpera.map = mapOpera.param.map = new NPMapLibMapProxy().createMap(mapId, config);

    if (map == null) {
        return false;
    }

    //设置是否禁用浏览器事件，默认为true(禁止)
    //mapOpera.map.setFallThrough(false);

    //==========控件==========
    // 导航控件
    //mapOpera.param.naviCtrl = new NPMapLib.Controls.NavigationControl();
    //mapOpera.param.zoomAnimationCtrl = new NPMapLib.Controls.zoomAnimationControl();
    //map.addControl(mapOpera.param.naviCtrl);
    //map.addControl(mapOpera.param.zoomAnimationCtrl);

    // 比例尺控件
    // mapOpera.param.scaleCtrl = new NPMapLib.Controls.ScaleControl();
    // map.addControl(mapOpera.param.scaleCtrl);

    // 版权控件
    // mapOpera.param.versionCtrl = new NPMapLib.Controls.CopyRightControl('©2015 东方网力&nbsp;© <a target="_blank" href="http://www.netposa.com/">Netposa</a>');
    // map.addControl(mapOpera.param.versionCtrl);

    // 鼠标位置控件
    // mapOpera.param.mousePoCtrl = new NPMapLib.Controls.MousePositionControl();
    // map.addControl(mapOpera.param.mousePoCtrl);

    //鹰眼控件
    //mapOpera.param.overviewCtrl = new NPMapLib.Controls.OverviewControl();
    //map.addControl(mapOpera.param.overviewCtrl);

    //比例尺控件
    //mapOpera.param.scaleCtrl = new NPMapLib.Controls.ScaleControl();
    //map.addControl(mapOpera.param.scaleCtrl);

    //==========工具==========
    // 测量工具
    mapOpera.param.measuretool = new NPMapLib.Tools.MeasureTool(map.id);

    // 绘图工具
    mapOpera.param.drawtool = new NPMapLib.Tools.DrawingTool(map.id);

    //矢量图和卫星图都存在时显示地图类型切换层
    if (mapOpera.param.vectorLayer && mapOpera.param.satelliteLayer) {
        $("#mapType").unbind("click").bind("click", function() {
            if ($(this).attr("data-value") == "s") { // 切换到卫星图
                if (mapOpera.param.isTiandiOnline) { //在线天地图有2个图层
                    mapOpera.param.satelliteLayer[0].show();
                    mapOpera.param.satelliteLayer[1].show();
                    mapOpera.param.vectorLayer[0].hide();
                    mapOpera.param.vectorLayer[1].hide();
                } else {
                    mapOpera.param.vectorLayer.hide();
                    mapOpera.param.satelliteLayer.show();
                }

                $(this).attr("data-value", "v").find(".text").text("地图");
            } else { // 切换到矢量图
                if (mapOpera.param.isTiandiOnline) {
                    mapOpera.param.vectorLayer[0].show();
                    mapOpera.param.vectorLayer[1].show();
                    mapOpera.param.satelliteLayer[0].hide();
                    mapOpera.param.satelliteLayer[1].hide();
                } else {
                    mapOpera.param.satelliteLayer.hide();
                    mapOpera.param.vectorLayer.show();
                }

                $(this).attr("data-value", "s").find(".text").text("卫星");
            }
        }).show();
    } else {
        $("#mapType").hide();
    }

    return true;
};

/**
 * 添加标记，返回添加的标记
 */
mapOpera.addMarker = function(options) {
    // 默认参数
    var defaults = {
        lonlat: {
            lon: 0,
            lat: 0
        },
        icon: {
            url: null,
            width: 0,
            height: 0
        },
        label: {
            content: null,
            offset: {
                width: 0,
                height: 0
            },
            style: {
                fontSize: 14,
                fontFamily: 'Arial',
                color: "White",
                isBold: false
            }
        },
        offset: {
            width: 0,
            height: 0
        },
        dataId: "",
        dataType: 0,
        click: null
    };

    var settings = $.extend(true, {}, defaults, options);

    if (!settings.lonlat.lon || !settings.lonlat.lat) {
        console.warn("settings.lonlat is undefined");
        return null;
    }

    if (!settings.icon.url || !settings.icon.width || !settings.icon.height) {
        console.warn("settings.icon is undefined");
        return null;
    }

    // url中不包含路径分割符“/”时添加当前图片路径
    if (settings.icon.url.indexOf("/") == -1) {
        settings.icon.url = mapOpera.param.scriptPath + settings.icon.url;
    }

    // icon
    var icon = new NPMapLib.Symbols.Icon(settings.icon.url, new NPMapLib.Geometry.Size(settings.icon.width, settings.icon.height));

    // create marker
    var marker = new NPMapLib.Symbols.Marker(settings.lonlat, {
        offset: settings.offset
    });
    marker.setIcon(icon);

    // set lable
    if (settings.label && settings.label.content) {
        var label = new NPMapLib.Symbols.Label(settings.label.content, {
            offset: settings.label.offset
        });

        label.setStyle(settings.label.style);

        marker.setLabel(label);
    }

    // add to map
    mapOpera.map.addOverlay(marker);

    // set user data
    if (settings.dataId) {
        marker.dataId = settings.dataId;
    }

    if (settings.dataType) {
        marker.dataType = settings.dataType;
    }

    if ($.isFunction(settings.click)) {
        marker.addEventListener("click", settings.click);
    }

    return marker;
};

/**
 * 通过单击鼠标选择位置方式手动添加标记
 */
mapOpera.addMarkerManual = function(options, fn) {
    mapOpera.map.activateMouseContext("单击左键添加，右键退出<br/>添加后可拖动");

    // 右键取消
    mapOpera.map.addEventListener(NPMapLib.MAP_EVENT_RIGHT_CLICK, function(lonlat) {
        mapOpera.map.deactivateMouseContext();
        mapOpera.map.removeEventListener(NPMapLib.MAP_EVENT_CLICK);
        mapOpera.map.removeEventListener(NPMapLib.MAP_EVENT_RIGHT_CLICK);
    });

    // 点击左键添加
    mapOpera.map.addEventListener(NPMapLib.MAP_EVENT_CLICK, function(lonlat) {
        mapOpera.map.deactivateMouseContext();
        mapOpera.map.removeEventListener(NPMapLib.MAP_EVENT_CLICK);
        mapOpera.map.removeEventListener(NPMapLib.MAP_EVENT_RIGHT_CLICK);

        // 添加标记
        options.lonlat = lonlat;
        var marker = mapOpera.addMarker(options);
        if (marker && $.isFunction(options.click)) {
            // 允许拖动
            marker.enableEditing(NPMapLib.ModifyFeature_DRAG);

            // 拖动后重新打开信息窗
            marker.addEventListener(NPMapLib.MARKER_EVENT_DRAG_END, function() {
                options.click(marker);
            });

            options.click(marker);
        }

        // 回调用户方法
        if ($.isFunction(fn)) {
            fn(marker);
        }
    });
};

/**
 * 清除鼠标内容和地图单击事件
 * @return {[type]} [description]
 */
mapOpera.clearMouseContextAndMapClick = function() {
    mapOpera.map.deactivateMouseContext();
    mapOpera.map.removeEventListener(NPMapLib.MAP_EVENT_CLICK);
};

/**
 * 清空基本图层上的所有覆盖物，取消地图工具
 */
mapOpera.clear = function(layerName) {
    //mapOpera.param.measuretool.cancel();
    //mapOpera.param.drawtool.cancel();
    if(!mapOpera.map){
        return;
    }
    mapOpera.map.removeEventListener(NPMapLib.MAP_EVENT_CLICK);
    var currentLayer = mapOpera.param[layerName];
    if(!!currentLayer){
        currentLayer.removeAllOverlays();
    }
    mapOpera.map.clearOverlays();
    mapOpera.closeInfoWindow();
};

/**
 * 批量删除标记
 * @param  {[type]} key   [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
mapOpera.removeMarkersByParam = function(key, value) {
    var markers = [];

    var overlays = mapOpera.map.getOverlays();
    for (var name in overlays) {
        if (overlays.hasOwnProperty(name)) {
            var marker = overlays[name];
            if (marker.overlayType == 5 && marker[key] == value) {
                markers.push(marker);
            }
        }
    }

    mapOpera.map.removeOverlays(markers);
};
/**
 * 批量移除所有匹配的覆盖物
 * @param  {[type]} key   [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
mapOpera.removeByParam = function(key, value) {
    var ols = [];

    var overlays = mapOpera.map.getOverlays();
    for (var name in overlays) {
        if (overlays.hasOwnProperty(name)) {
            var ol = overlays[name];
            if (ol[key] == value) {
                ols.push(ol);
            }
        }
    }

    mapOpera.map.removeOverlays(ols);
};


/**
 * 根据标记数据的属性搜索
 * @param  {[type]} key   [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
mapOpera.getMarkersByParam = function(key, value) {
    var markers = [];

    var overlays = mapOpera.map.getOverlays();
    for (var name in overlays) {
        if (overlays.hasOwnProperty(name)) {
            var marker = overlays[name];
            if (marker.overlayType == 5 && marker[key] == value) {
                markers.push(marker);
            }
        }
    }

    return markers;
};

/**
 * 根据标记数据的属性搜索，设置所有满足条件标记的显示属性
 * @param {[type]} key     [description]
 * @param {[type]} value   [description]
 * @param {[type]} visible [description]
 */
mapOpera.setMarkersVisibleByParam = function(key, value, visible) {
    var overlays = mapOpera.map.getOverlays();
    for (var name in overlays) {
        if (overlays.hasOwnProperty(name)) {
            var marker = overlays[name];
            if (marker.overlayType == 5 && marker[key] == value) {
                if (visible) {
                    marker.show();
                } else {
                    marker.hide();
                }
            }
        }
    }
};

//获取路径的长度
mapOpera.getDistance = function(map, dataJson, index){
    var distance = 0,
        d,
        length = index !== void 0 ? ++index : dataJson.length;
    for (var i = 1; i < length; i++) {
        d = map.getDistance(dataJson[i - 1], dataJson[i]);
        distance += d;
    }
    return distance;


    /*var distance = 0;
    for(var i = 1; i< dataJson.length; i++){
        distance += map.getDistance(dataJson[i-1], dataJson[i]);
    }
    return distance;*/
};

mapOpera.getDrawMills = function(map, dataJson, index, speed) {
    var distance = mapOpera.getDistance(map, dataJson, index);
    return distance / speed;
};


mapOpera.getDrawSprit = function(ps, map, speed, stepIndex) {
    var distance = 0,
        d,
        index = 0,
        tempIndex,
        step = 0,
        gisToolKit = new NPMapLib.GisToolKit();
    for (var i = 1; i < ps.length; i++) {
        // d = Math.sqrt((ps[i - 1].lon - ps[i].lon) * (ps[i - 1].lon - ps[i].lon) + (ps[i - 1].lat - ps[i].lat) * (ps[i - 1].lat - ps[i].lat));
        d = map.getDistance(ps[i - 1], ps[i]);
        distance += d;
        tempIndex = distance / speed;
        if (i === ps.length - 1 && tempIndex === stepIndex) {
            index = i;
            step = 0;
            break;
        }
        if (tempIndex > stepIndex) {
            index = i - 1;
            step = Math.round(stepIndex - (distance - d) / speed);
            break;
        }
    }
    return {
        index: index,
        step: step
    };
},

//给maker添加事件
mapOpera.addEventToMarker = function(layerName, marker){
    if(marker.isLast){
        marker.removeEventListener(NPMapLib.MARKER_EVENT_MOUSE_OVER);
        marker.removeEventListener(NPMapLib.MARKER_EVENT_MOUSE_OUT);
        marker.addEventListener(NPMapLib.MARKER_EVENT_MOUSE_OVER, function(e) {
            var imgUrl = 'template/img/map/blue.png';
            var siz = new NPMapLib.Geometry.Size(20, 33);
            var ico2 = new NPMapLib.Symbols.Icon(imgUrl, siz);
            e.setIcon(ico2);
            e.refresh();
        });
        marker.addEventListener(NPMapLib.MARKER_EVENT_MOUSE_OUT, function(e) {
            var imageurl = 'template/img/map/pink.png';
            var siz = new NPMapLib.Geometry.Size(20, 33);
            var ico1 = new NPMapLib.Symbols.Icon(imageurl, siz);
            e.setIcon(ico1);
            e.refresh();
        });
    }
    marker.removeEventListener(NPMapLib.MARKER_EVENT_CLICK);
    marker.addEventListener(NPMapLib.MARKER_EVENT_CLICK, function() {
        var content = utils.html.build("cityTemplate", {
            title: marker.infor.name,
            Longitude: marker.infor.lon,
            Latitude: marker.infor.lat,
            Location: marker.infor.address,
            mobile: marker.infor.mobile,
            carNo: marker.infor.carNo
        });
        mapOpera.openInfoWindow(marker.getPosition(), layerName, content, {
            width: 260,
            height: 140,
            offset: new NPMapLib.Geometry.Size(0, -10)
        });
    });
};

//创建车的动画轨迹
mapOpera.createCarAnimationLine = function(layerName, dataJson){
    var currentLayer = mapOpera.param[layerName];
    if(currentLayer){
        mapOpera.param.map.removeLayerByName(layerName);
    }
    var layer = new NPMapLib.Layers.OverlayLayer(layerName);
    mapOpera.param[layerName] = layer;
    mapOpera.param.map.addLayer(layer);
    var points = [];
    for (var i = 0; i < dataJson.length; i++) {
        var point = dataJson[i];
        var p = new NPMapLib.Geometry.Point(point.lon, point.lat);
        points.push(p);
    }

    var markers = [];
    for (var i = 0; i < points.length; i++) {
        var marker = new NPMapLib.Symbols.Marker(points[i]);
        marker.cIndex = i;
        marker.infor = dataJson[i];
        var tempIcon;
        var tempLabel;
        if (i == 0) {
             tempLabel = null;
             tempIcon = new NPMapLib.Symbols.Icon('template/img/map/begin.png', new NPMapLib.Geometry.Size(26, 26));
             } else if (i == points.length - 1) {
             tempLabel = null;
             tempIcon = new NPMapLib.Symbols.Icon('template/img/map/stop.png', new NPMapLib.Geometry.Size(26, 26));
         } else {
            tempIcon = new NPMapLib.Symbols.Icon('template/img/map/pink.png', new NPMapLib.Geometry.Size(20, 33));
            tempLabel = new NPMapLib.Symbols.Label(i+1+'', {
                offset: new NPMapLib.Geometry.Size(0, 18)
            }); //一个图像标注
            //设置样式
            tempLabel.setStyle({
                fontSize: 12, //文字大小
                color: '#fff', //文字前景色
                //align: 'cm', //对方方式
                isBold: true //是否粗体
            });
        }
        marker.setIcon(tempIcon);
        var sameMarker = _.filter(markers, function(mark){
            return mark._position.lon == marker._position.lon && mark._position.lat == marker._position.lat;
        });
        var off = new NPMapLib.Geometry.Size(0, -12*sameMarker.length);
        marker.setOffset(off);

        if(!!tempLabel){
            var off2 = new NPMapLib.Geometry.Size(0, -24*sameMarker.length+18);
            tempLabel.setOffset(off2);
            marker.tempLabel = tempLabel;
            marker.setLabel(tempLabel);
            marker.isLast = true;
        }
        points[i].marker = marker;
        markers.push(marker);
    }

    var offset = new NPMapLib.Geometry.Size(0, -12);
    var headerMarker = new NPMapLib.Symbols.Marker(points[0], {
        offset: offset
    });

    var icon = new NPMapLib.Symbols.Icon('template/img/map/car.png', new NPMapLib.Geometry.Size(26, 26));
    headerMarker.setIcon(icon);
    layer.addOverlay(headerMarker);
    var animationLine;
    if (headerMarker) {
        animationLine = new NPMapLib.Symbols.AnimationLine(mapOpera.param.map.id, points, {
            headerMarker: headerMarker,
            color: '#00a1f2',
            opacity: 0.8,
            weight: 2
        });
    } else {
        animationLine = new NPMapLib.Symbols.AnimationLine(mapOpera.param.map.id, points, {
            color: '#00a1f2',
            opacity: 0.8,
            weight: 2
        });
    }

    animationLine.setLayer(layer);
    animationLine.setSpeed(100);
    animationLine.markers = markers;
    animationLine.events.register('preDraw', function(evt) {
         var marker = markers[evt.index];
         layer.addOverlay(marker);
         if(marker.tempLabel){
         marker.removeEventListener(NPMapLib.MARKER_EVENT_MOUSE_OVER);
         marker.removeEventListener(NPMapLib.MARKER_EVENT_MOUSE_OUT);
         marker.addEventListener(NPMapLib.MARKER_EVENT_MOUSE_OVER, function(e) {
         var imgUrl = 'template/img/map/blue.png';
         var siz = new NPMapLib.Geometry.Size(20, 33);
         var ico2 = new NPMapLib.Symbols.Icon(imgUrl, siz);
         e.setIcon(ico2);
         e.refresh();
         });
         marker.addEventListener(NPMapLib.MARKER_EVENT_MOUSE_OUT, function(e) {
             var imageurl = 'template/img/map/pink.png';
             var siz = new NPMapLib.Geometry.Size(20, 33);
             var ico1 = new NPMapLib.Symbols.Icon(imageurl, siz);
             e.setIcon(ico1);
             e.refresh();
         });
         }
         marker.removeEventListener(NPMapLib.MARKER_EVENT_CLICK);
         marker.addEventListener(NPMapLib.MARKER_EVENT_CLICK, function() {
             /*var content = utils.html.build("cityTemplate", {
                 title: marker.infor.name,
                 Longitude: marker.infor.lon,
                 Latitude: marker.infor.lat,
                 Location: marker.infor.address,
                 mobile: marker.infor.mobile,
                 carNo: marker.infor.carNo
             });
             mapOpera.openInfoWindow(marker.getPosition(), layerName, content, {
                 width: 260,
                 height: 140,
                 offset: new NPMapLib.Geometry.Size(0, -10)
             });*/
         });
    });
    return animationLine;
};

//创建人的动画轨迹
mapOpera.createAnimationLine = function(layerName, dataJson) {
    var currentLayer = mapOpera.param[layerName];
    if(currentLayer){
        mapOpera.param.map.removeLayerByName(layerName);
    }
    var layer = new NPMapLib.Layers.OverlayLayer(layerName);
    mapOpera.param[layerName] = layer;
    mapOpera.param.map.addLayer(layer);
    var points = [];
    for (var i = 0; i < dataJson.length; i++) {
        var point = dataJson[i];
        var p = new NPMapLib.Geometry.Point(point.lon, point.lat);
        points.push(p);
    }

    var markers = [];
    for (var i = 0; i < points.length; i++) {
        var marker = new NPMapLib.Symbols.Marker(points[i]);
        marker.cIndex = i;
        marker.infor = dataJson[i];
        var tempIcon;
        var tempLabel;
        /*if (i == 0) {
            tempLabel = null;
            tempIcon = new NPMapLib.Symbols.Icon('template/img/map/begin.png', new NPMapLib.Geometry.Size(26, 26));
        } else if (i == points.length - 1) {
            tempLabel = null;
            tempIcon = new NPMapLib.Symbols.Icon('template/img/map/stop.png', new NPMapLib.Geometry.Size(26, 26));
        } else {*/
            tempIcon = new NPMapLib.Symbols.Icon('template/img/map/pink.png', new NPMapLib.Geometry.Size(20, 33));
            tempLabel = new NPMapLib.Symbols.Label(i+1+'', {
                offset: new NPMapLib.Geometry.Size(0, 18)
            }); //一个图像标注
            //设置样式
            tempLabel.setStyle({
                fontSize: 12, //文字大小
                color: '#fff', //文字前景色
                //align: 'cm', //对方方式
                isBold: true //是否粗体
            });
        //}
        marker.setIcon(tempIcon);
        var sameMarker = _.filter(markers, function(mark){
            return mark._position.lon == marker._position.lon && mark._position.lat == marker._position.lat;
        });
        var off = new NPMapLib.Geometry.Size(0, -12*sameMarker.length);
        marker.setOffset(off);

        if(!!tempLabel){
            var off2 = new NPMapLib.Geometry.Size(0, -24*sameMarker.length+18);
            tempLabel.setOffset(off2);
            marker.tempLabel = tempLabel;
            marker.setLabel(tempLabel);
            marker.isLast = true;
        }
        points[i].marker = marker;
        markers.push(marker);
    }

    var offset = new NPMapLib.Geometry.Size(0, -12);
    var headerMarker = new NPMapLib.Symbols.Marker(points[0], {
        offset: offset
    });

    var icon = new NPMapLib.Symbols.Icon('template/img/map/peop.png', new NPMapLib.Geometry.Size(26, 26));
    headerMarker.setIcon(icon);
    layer.addOverlay(headerMarker);
    var animationLine;
    if (headerMarker) {
        animationLine = new NPMapLib.Symbols.AnimationLine(mapOpera.param.map.id, points, {
            headerMarker: headerMarker,
            color: '#00a1f2',
            opacity: 0.8,
            weight: 2
        });
    } else {
        animationLine = new NPMapLib.Symbols.AnimationLine(mapOpera.param.map.id, points, {
            color: '#00a1f2',
            opacity: 0.8,
            weight: 2
        });
    }

    animationLine.setLayer(layer);
    animationLine.setSpeed(100);
    animationLine.markers = markers;
    /*animationLine.events.register('preDraw', function(evt) {
        var marker = markers[evt.index];
        layer.addOverlay(marker);
        if(marker.tempLabel){
            marker.removeEventListener(NPMapLib.MARKER_EVENT_MOUSE_OVER);
            marker.removeEventListener(NPMapLib.MARKER_EVENT_MOUSE_OUT);
            marker.addEventListener(NPMapLib.MARKER_EVENT_MOUSE_OVER, function(e) {
                var imgUrl = 'template/img/map/blue.png';
                var siz = new NPMapLib.Geometry.Size(20, 33);
                var ico2 = new NPMapLib.Symbols.Icon(imgUrl, siz);
                e.setIcon(ico2);
                e.refresh();
            });
            marker.addEventListener(NPMapLib.MARKER_EVENT_MOUSE_OUT, function(e) {
                var imageurl = 'template/img/map/pink.png';
                var siz = new NPMapLib.Geometry.Size(20, 33);
                var ico1 = new NPMapLib.Symbols.Icon(imageurl, siz);
                e.setIcon(ico1);
                e.refresh();
            });
        }
        marker.removeEventListener(NPMapLib.MARKER_EVENT_CLICK);
        marker.addEventListener(NPMapLib.MARKER_EVENT_CLICK, function() {
            var content = utils.html.build("cityTemplate", {
                title: marker.infor.name,
                Longitude: marker.infor.lon,
                Latitude: marker.infor.lat,
                Location: marker.infor.address,
                mobile: marker.infor.mobile,
                carNo: marker.infor.carNo
            });
            mapOpera.openInfoWindow(marker.getPosition(), layerName, content, {
                width: 260,
                height: 140,
                offset: new NPMapLib.Geometry.Size(0, -10)
            });
        });
    });*/


    return animationLine;
};

//接收到推送的消息后，进行弹出框展示
mapOpera.showMarkDetail = function(obj){
    if(!obj){
        return;
    }
    var templateId = '';
    var width = 82;
    var height = 120;
    if(obj.layerName == 'camera'){
        templateId = 'cameraTemplate';
        width = 82;
        height = 120;
    }else if(obj.layerName == 'wif'){
        templateId = 'wifiTemplate';
        width = 92;
        height = 32;
    }else{
        templateId = 'kakouTemplate';
        width = 160;
        height = 120;
    }

    obj.location = new NPMapLib.Geometry.Point(obj.lon, obj.lat);
    var content = utils.html.build(templateId, {
        headImg: obj.headImg,//小图
        guid: obj.mac,
        title: obj.title
    });


    var infoWindow = null;
    var popElement = mapOpera.openInfoWindow(obj.location, obj.layerName, content, {
        width: width,
        height: height
    });
    return {infoWindow: infoWindow, popElement: popElement};
};

//打开信息窗口
mapOpera.openInfoWindow = function(lonlat, title, content, options, callback) {
    //mapOpera.closeInfoWindow(); // 关闭已打开
    var lastInf = _.find(mapOpera.param.infoWindowList[title], function(info){
        var po = info.getPosition();
        return po.lon == lonlat.lon && po.lat==lonlat.lat;
    });
    if(!!lastInf){
        lastInf.close();
        lastInf = null;
        var list = mapOpera.param.infoWindowList[title];
        mapOpera.param.infoWindowList[title] = _.filter(list, function(info){
            var p = info.getPosition();
            return !(p.lon == lonlat.lon && p.lat==lonlat.lat);
        });
    }

    //关闭地图工具栏
    /*$("#mapToolbar").find(".mark.active, .select.active").each(function () {
        console.log("close toolbar");
        $(this).click();
    });*/

    // 信息框默认选项
    var defaults = {
        offset: new NPMapLib.Geometry.Size(0, 0), //信息窗位置偏移值
        iscommon: false, //是否为普通窗体（不带箭头）
        enableCloseOnClick: false, //移动地图，不关闭信息窗口。
        //autoSize: true, //窗口大小是否自适应
        //paddingForPopups: new NPMapLib.Geometry.Extent(15, 15, 15, 15), //信息窗自动弹回后，距离四边的值。isAdaptation为true时，该设置有效。
        isAnimationOpen: false, //信息窗打开时，地图是否平滑移动，默认不平滑移动。
        //isAdaptation: true, //信息窗位置是否自适应，默认不自适应。
        positionBlock: { // 尾巴图片
            imageSrc: mapOpera.param.scriptPath + (options.isIwOne ? 'iw-tail.png' : 'iw-tail3.png'),
            imageSize: {
                width: 15,
                height: 12
            }
        }
    };

    // 合并用户选项到设置
    var settings = $.extend({}, defaults, options);
    var dialogElement = content;

    if (!content) {
        // 创建对话框元素
        dialogElement = mapOpera._createNPMapDialogElement();
    }

    // 设置标题和内容
    var $dialog = $(dialogElement).clone();

    // 未设置宽度或高度时大小自适应
    if (!settings.width || !settings.height) {
        settings.autoSize = true;
    } else {
        $dialog.css({
            width: settings.width - 2,
            height: settings.height - 2
        });
    }

    //$dialog.find(".npmap-dialog-titlebar > .title").html(title);
    //$dialog.find(".npmap-dialog-content").html(content);

    var infoWindowContent = $dialog[0];

    // 创建信息窗
    var infoWindow = new NPMapLib.Symbols.InfoWindow(lonlat, title, infoWindowContent, settings);
    var length = mapOpera.param.infoWindowIndex;
    infoWindow.realId = title + '_' + length;
    mapOpera.map.addOverlay(infoWindow);
    $(infoWindowContent).find(".npmap-dialog-titlebar > .close").attr({'realId': infoWindow.realId});
    // 单击对话框关闭按钮关闭信息窗
    $(infoWindowContent).find(".npmap-dialog-titlebar > .close").click(function(e) {
        mapOpera.closeInfoWindow(e.target, title);
    }).css("background-image", mapOpera.param.scriptPath + "close.png"); // 为解决相对路径下图片无法显示问题
    // 绑定事件
    if(!!options.eventsConfig){
        var eventLists = options.eventsConfig;
        eventLists.forEach(function (item) {
            var dom = item.selector || '',
                eventType = item.eventType||'click',
                params = item.params||'',
                cb = item.callback||function () {console.log('no callback')};
            $(infoWindowContent).on(eventType,dom,function () {
                cb(params);
            })

        });
    }
    

    // 打开信息框
    infoWindow.open(null, false);

    mapOpera.param.lastInfoWindow = mapOpera.param.infoWindow;
    mapOpera.param.infoWindowList[title].push(infoWindow);
    mapOpera.param.infoWindowIndex++;
    mapOpera.param.infoWindow = infoWindow;
    callback&&callback(infoWindow);
    return infoWindowContent;
};

// 在地图元素所在的容器中（.olMapViewport 相对定位）打开绝对定位对话框
mapOpera.openFixedInfoWindow = function(title, content, options) {
    mapOpera.closeInfoWindow(); // 关闭已打开

    options = options || {};
    var width = options.width || 400;
    var height = options.height || 300;

    var defaults = {
        "position": "absolute",
        "z-index": 1001,
        "top": "50%",
        "left": "50%",
        "margin-left": -width / 2 + "px",
        "margin-top": -height / 2 + "px"
    };

    var settings = $.extend({}, defaults, options);

    // 创建对话框元素
    var dialogElement = mapOpera._createNPMapDialogElement();

    // 设置标题和内容
    var $dialog = $(dialogElement).clone();
    $dialog.css({
        width: width,
        height: height
    });
    $dialog.find(".title").html(title);
    $dialog.find(".npmap-dialog-content").html(content);

    // 单击对话框关闭按钮关闭对话框
    $dialog.find(".npmap-dialog-titlebar > .close").click(function(e) {
        mapOpera.closeInfoWindow();
    }).css("background-image", mapOpera.param.scriptPath + "close.png"); // 为解决相对路径下图片无法显示问题

    // 添加到容器并显示
    if ($("#FixedInfoWindow").length === 0) {
        $("<div id='FixedInfoWindow' class='fixed-infowindow' style='position:absolute;display:none;'></div>").appendTo($(mapOpera.param.mapContainer));
    }
    $("#FixedInfoWindow").html($dialog).css(settings).show();
};

mapOpera._createNPMapDialogElement = function() {
    var dialogElement = mapOpera._InfoWindowContentDialogElement;
    if (!dialogElement) {
        var lines = [];
        lines.push('<div class="npmap-dialog">');
        lines.push('  <div class="npmap-dialog-titlebar">');
        lines.push('    <span class="title">标题</span>');
        lines.push('    <span class="close"></span>');
        lines.push('  </div>');
        lines.push('  <div class="npmap-dialog-content">内容</div>');
        lines.push('</div>');

        dialogElement = mapOpera._InfoWindowContentDialogElement = lines.join("");
    }
    return dialogElement;
};
/**
 * 打开通用信息窗（底部无箭头）
 */
mapOpera.openCommonInfoWindow = function(lonlat, content) {
    mapOpera.closeInfoWindow(); // 关闭已打开

    // 创建信息窗
    var infoWindow = new NPMapLib.Symbols.InfoWindow(lonlat, "", (content.jquery ? content[0] : content), {
        iscommon: true
    });
    mapOpera.map.addOverlay(infoWindow);
    infoWindow.open();

    mapOpera.param.lastInfoWindow = mapOpera.param.infoWindow;
    mapOpera.param.infoWindow = infoWindow;
};

// 自动调整信息窗位置，解决监控点在地图边缘时打开的信息窗超出地图范围显示不全问题
mapOpera.autoPositionInfoWindow = function(iwLonlat, iwSize, callback) {
    // 先检查监控点到地图边缘的距离，不够显示信息窗时自动放大
    var offset = mapOpera.map.pointToPixel(iwLonlat); //坐标位置到地图边缘的距离 x, y
    var minOffset = { //信息窗的最小偏移量
        x: Math.floor(iwSize.width / 2.0),
        y: iwSize.height
    };

    if (offset.x < minOffset.x - 10 || offset.y < minOffset.y - 10) { //-10, 避免计算误差
        //先移动地图
        var movePixel = { x: 0, y: 0 };
        if (offset.x < minOffset.x) {
            movePixel.x = minOffset.x - offset.x;
        }
        if (offset.y < minOffset.y) {
            movePixel.y = minOffset.y - offset.y;
        }
        mapOpera.map.addEventListener(NPMapLib.MAP_EVENT_MOVE_END, function() {
            mapOpera.map.removeEventListener(NPMapLib.MAP_EVENT_MOVE_END);

            //移动后再次判断信息窗是否会被遮住
            //若仍被遮住则放大到最大级别并居中
            offset = mapOpera.map.pointToPixel(iwLonlat);
            if (offset.x < minOffset.x - 10 || offset.y < minOffset.y - 10) { //-10, 避免计算误差
                var maxZoom = mapOpera.map.getMaxZoom();
                if (maxZoom != mapOpera.map.getZoom()) {
                    mapOpera.map.addEventListener(NPMapLib.MAP_EVENT_ZOOM_END, function() {
                        mapOpera.map.removeEventListener(NPMapLib.MAP_EVENT_ZOOM_END);
                        callback(); //打开信息窗
                    });
                    mapOpera.map.centerAndZoom(iwLonlat, maxZoom);
                }
            } else {
                callback(); //打开信息窗
            }
        });
        mapOpera.map.panByPixel(-movePixel.x, -movePixel.y);
    } else {
        callback(); //打开信息窗
    }
}

/**
 * 关闭信息窗
 * 由于调用close()后调用open()无法打开，所以为了后面能够打开，此处的关闭实为隐藏
 */
mapOpera.closeInfoWindow = function(target, title) {
    if(!!target){
        var realId = target.getAttribute('realId');
        var currentInfoWindow = _.find(mapOpera.param.infoWindowList[title], function(info){
            return info.realId == realId;
        });
        if(!!currentInfoWindow){
            mapOpera.param.infoWindowList[title] = _.filter(mapOpera.param.infoWindowList[title], function(inf){
                return inf.realId != realId;
            });
            currentInfoWindow.close();
        }
        return;
    }
    //关闭信息窗
    if (mapOpera.param.lastInfoWindow) {
        mapOpera.param.lastInfoWindow.close();
    }
    if (mapOpera.param.infoWindow) {
        mapOpera.param.infoWindow.close();
    }
};

// 地图操作
// centerAndZoom(center:Point,zoom:Number)
mapOpera.centerAndZoom = function(center, zoom) {
    mapOpera.map.centerAndZoom(center, zoom);
};

//获得图层上的标注图形
mapOpera.getContaiMarkers = function(layer, geometry) {
    var markers = layer.containFeatures(geometry, function(feature) {
        if (feature instanceof NPMapLib.Symbols.ClusterMarker) {
            return true;
        }
        return false;
    });
    if (markers && markers.length > 0) {
        return markers;
    }
    return [];
};
//==============================通用方法=================================//
mapOpera.utils = {};
/**
 * [ajax description]
 * @param  {[type]} url     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
mapOpera.utils.ajax = function(options) {
    /*
    options{data,dataType,
        success(data, textStatus, jqXHR),
        error: function (jqXHR, textStatus, errorMsg),
        complete: function (jqXHR, textStatus)
    }
     */

    var defaults = {
        type: "POST",
        async: true,
        statusCode: {
            404: function() {
                alert('page not found');
            },
            500: function() {
                alert('server error');
            }
        }
    };

    var settings = $.extend({}, defaults, options);

    $.ajax(settings);
};

/**
 * 打开全屏窗口，双屏时显示在第2屏
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
mapOpera.utils.open = function(url) {
    window.open(url, 'newwindow', 'height=' + screen.height + ',width=' + screen.width + ',top=0,left=' + screen.width + ',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no,depended=yes');
};

var utils = utils || {};
utils.ajax = (function() {
    var ajaxDefaults = {
        type: "POST",
        async: true,
        success: function(data, textStatus, jqXHR) {
            console.info("ajax success");
        },
        error: function(jqXHR, textStatus, errorMsg) {
            console.info("ajax error");
        },
        complete: function(jqXHR, textStatus) {
            console.info("ajax complete");
        },
        statusCode: {
            404: function() {
                console.info("ajax statusCode: 404");
            },
            500: function() {
                console.info("ajax statusCode: 500");
            }
        }
    };

    // utils.ajax.get#
    function get(options) {
        $.ajax($.extend({
            type: "GET"
        }, ajaxDefaults, options));
    }

    // utils.ajax.post#
    function post(options) {
        $.ajax($.extend({
            type: "POST"
        }, ajaxDefaults, options));
    }

    return {
        get: get,
        post: post
    };
})();
utils.html = (function() {
    // #utils.html.build#
    function buildContentByTemplate(templateId, dataJson) {
        if (!$.isPlainObject(dataJson)) {
            return "dataJson !isPlainObject";
        }
        // var $container = $($("#" + templateId).clone().children());
        var $container = $("<div>");
        $container.html($("#" + templateId).html());
        $container = $container.children();

        $container.find('.title').text(dataJson['title']);
        /*$container.find('.long').text(dataJson['Longitude']);
        $container.find('.lati').text(dataJson['Latitude']);
        $container.find('.location').text(dataJson['Location']);
        if ($container.find('.idd')) {
            $container.find('.idd').text(dataJson['ID']);
        }
        if ($container.find('.limt')) {
            $container.find('.limt').text(dataJson['Limit']);
        }

        if ($container.find('.address')) {
            $container.find('.address').text(dataJson['address']);
        }*/
        if(!!dataJson['headImg']){
            $container.find('.headImg').attr('src', dataJson['headImg']);
        }

        if(!!dataJson['guid']){
            $container.find('.guid').text(dataJson['guid']);
        }
        /*if(!dataJson['mobile']){
            if($container.find('.mobile')){
                $container.find('.mobile').hide();
            }
        }else{
            $container.find('.loca').hide();
            if($container.find('.mobile')){
                $container.find('.mobilePhone').text(dataJson['mobile']);
            }
        }

        if(!dataJson['carNo']){
            if($container.find('.smallCar')){
                $container.find('.smallCar').hide();
            }
        }else{
            $container.find('.loca').hide();
            if($container.find('.smallCar')){
                $container.find('.carNo').text(dataJson['carNo']);
            }
        }*/
        // if ($.isPlainObject(dataJson)) {
        //  for (var name in dataJson) {
        //      if (dataJson.hasOwnProperty(name)) {
        //          $container.find("[data-name='" + name + "']").text(dataJson[name]).val(dataJson[name]);
        //      }
        //  }
        // }

        return $container;
    }

    // #utils.html.open#
    var _latestOpenWin = null;

    function open(url) {
        if (_latestOpenWin) {
            try {
                _latestOpenWin.close();
                _latestOpenWin = null;
            } catch (e) {
                console.error("close latest win error: " + e.message);
            }
        }

        var swidth = screen.width;
        var sheight = screen.height;
        _latestOpenWin = window.open(url, 'newwindow', 'height=' + sheight + ',width=' + swidth + ',top=0,left=' + swidth + ',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no,depended=yes');
    }

    // 获取元素的横坐标
    // #utils.html.getX#
    function getX(e) {
        var offset = e.offsetLeft;
        if (e.offsetParent !== null) offset += getX(e.offsetParent);
        return offset;
    }

    return {
        build: buildContentByTemplate,
        open: open,
        getX: getX
    };
})();
utils.data = (function() {
    // 从数组中查找包含指定属性名和值的项
    // #utils.data.find#
    function find(objArray, key, value) {
        if ($.isArray(objArray)) {
            for (var i = 0; i < objArray.length; i++) {
                if (objArray[i].hasOwnProperty(key)) { // 是否包含该属性
                    if (objArray[i][key] == value) { // 属性值是否相同
                        return objArray[i];
                    }
                }
            }
        }
        return null;
    }

    return {
        find: find
    };
})();
