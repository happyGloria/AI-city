/**
 * 创建地图
 */
(function () {

    // var e = NPMapLibMapProxy = function () {
    //     e.prototype._mapId = null;
    // };

    // e.prototype.createMap = function (mapId, config) {
    //     debugger
    //     e.prototype._mapId = mapId || "mapId";
    //     //初始化变量
    //     mapOpera.param.vectorLayer = null;
    //     mapOpera.param.satelliteLayer = null;
    //     mapOpera.param.isTiandiOnline = false;

    //     //创建地图
    //     var map = {};
    //     var callback = function (mapConfig) {
    //         var options = {
    //             minZoom: parseInt(mapConfig.MinZoom, 10),
    //             maxZoom: parseInt(mapConfig.MaxZoom, 10),
    //             restrictedExtent: mapConfig.RestrictedExtent,
    //             centerPoint: mapConfig.CenterPoint,
    //             defaultZoom: parseInt(mapConfig.DefaultZoom, 10),
    //             projection: mapConfig.Projection,
    //             displayProjection: mapConfig.DisplayProjection
    //         };

    //         if(mapConfig.Category == 'baidu'){
    //             /*var url = ["http://online1.map.bdimg.com/tile/?qt=tile&x=${x}&y=${y}&z=${z}&styles=pl&udt=20150605&scaler=1",
    //                 "http://online2.map.bdimg.com/tile/?qt=tile&x=${x}&y=${y}&z=${z}&styles=pl&udt=20150605&scaler=1",
    //                 "http://online3.map.bdimg.com/tile/?qt=tile&x=${x}&y=${y}&z=${z}&styles=pl&udt=20150605&scaler=1"];*/
    //             map = e.prototype._createBaiduMap(options);
    //         }
    //         else if(mapConfig.Category == 'gaode'){
    //             map = e.prototype._createGaodeMap(options);
    //         }
    //         else if(mapConfig.Category == 'QQ'){
    //             var url = [
    //                 "http://rt0.map.gtimg.com/realtimerender?z=${z}&x=${x}&y=${y}&type=vector&style=0&v=1.1.2",
    //                 "http://rt1.map.gtimg.com/realtimerender?z=${z}&x=${x}&y=${y}&type=vector&style=0&v=1.1.2",
    //                 "http://rt2.map.gtimg.com/realtimerender?z=${z}&x=${x}&y=${y}&type=vector&style=0&v=1.1.2",
    //                 "http://rt3.map.gtimg.com/realtimerender?z=${z}&x=${x}&y=${y}&type=vector&style=0&v=1.1.2"
    //             ];
    //             map = e.prototype._createQQMap(url, options);
    //         }
    //         else if(mapConfig.Category == 'superMap'){
    //             var url = ["http://t1.supermapcloud.com/FileService/image?"];
    //             map = e.prototype._createSuperMap(url, options);
    //         }
    //         else if(mapConfig.Category == 'acgis'){

    //         }
    //         else if (mapConfig.Category == "tiandi") {
    //             map = e.prototype._createTiandiMap(mapConfig.VectorUrl, mapConfig.SatelliteUrl, options);
    //         }
    //         else if (mapConfig.Category == "tiandi_old") {
    //             map = e.prototype._createTiandiMap_Old(mapConfig.VectorUrl, options);
    //         }
    //         else if (mapConfig.Category == "tiandi_online") {
    //             map = e.prototype._createTiandiMap_Online(options);
    //         }
    //         else if (mapConfig.Category == "pgis") {
    //             map = e.prototype._createPGISMap(mapConfig.VectorUrl, mapConfig.SatelliteUrl, options);
    //         }
    //         else if (mapConfig.Category == "npgis") {
    //             map = e.prototype._createNPGISMap(mapConfig.VectorUrl, mapConfig.SatelliteUrl, options);
    //         }

    //         //隐藏卫星图
    //         if (mapOpera.param.vectorLayer && mapOpera.param.satelliteLayer) {
    //             var hideSatellite = function () {
    //                 if (mapOpera.param.isTiandiOnline) {
    //                     mapOpera.param.satelliteLayer[0].hide();
    //                     mapOpera.param.satelliteLayer[1].hide();
    //                 } else {
    //                     mapOpera.param.satelliteLayer.hide();
    //                 }
    //             };

    //             map.updateSize();
    //             hideSatellite();

    //             //解决首次缩放时仍显示卫星图 BUG
    //             map.addEventListener(NPMapLib.MAP_EVENT_ZOOM_END, function () {
    //                 map.removeEventListener(NPMapLib.MAP_EVENT_ZOOM_END);

    //                 hideSatellite();
    //                 map.fullExtent(options.defaultZoom);
    //             });
    //             map.zoomInFixed();
    //         }
    //         if(!!map){
    //             window.mapMain = mapOpera.map = mapOpera.param.map = map;
    //         }
    //         //return map;
    //     };

    //     // 加载地图配置
    //     /*$.ajax({
    //         type: "POST",
    //         url: "/Map/Config/Get",
    //         async: false,
    //         success: function (data) {
    //             console.log("地图配置：");
    //             console.log(data);
    //             try {
    //                 result = npResult.build(data);
    //                 if (result.isSucceed()) {
    //                     callback(result.getData(data));
    //                 }
    //             } catch (e) {
    //                 console.error("创建地图失败: " + e.message);
    //             }
    //         },
    //         error: function () {
    //             alert('加载地图配置失败！');
    //         }
    //     });*/
    //     //配置南京市的坐标
    //     debugger
    //     callback(config);

    //     return map;
    // };

    var e = NPMapLibMapProxy = function(configUrl) {
        // debugger
        this.configUrl = configUrl;
    }

    e.prototype.createMap = function(mapId, opts) {
        // debugger
        var option = opts || {};
        var mapConfig;
        mapId = mapId == null ? "mapId" : mapId;
        $.ajax({
                async: false,
                dataType: 'json',
                url: opts.mapConfigUrl || '/lib/map/mapConfig.json?v=' + new Date().getTime(),
                type: 'get'
            })
            .then(
                function(res) {
                    mapConfig = res;
                },
                function() {

                });
        var map = window.map = new NPMapLib.Map(document
            .getElementById(mapId), mapConfig.mapOpts);
        if(!mapOpera.map){
            window.mapMain = mapOpera.map = mapOpera.param.map = map;
        }
        /** ****基础图层***** */
        var baseLayer = [],
            vectorLayerItem, sattilateLayerItem, baseLayerItem, vectorBaseLayer = [],
            sattilateBaseLayer = [],
            layerType;
        for (var i = 0, len = mapConfig.vectorLayer.length; i < len; i++) {
            vectorLayerItem = mapConfig.vectorLayer[i];
            layerType = vectorLayerItem.layerType
                .split('.');
            baseLayerItem = new NPMapLib.Layers[layerType[layerType.length - 1]](
                vectorLayerItem.layerOpt.url,
                vectorLayerItem.layerName,
                vectorLayerItem.layerOpt);            
            vectorBaseLayer.push(baseLayerItem);
            baseLayer.push(baseLayerItem);
        }
        map.addLayers(baseLayer);
        option.callback && option.callback(map);
        window.mapSuccess && window.mapSuccess(map);
        return map;
    };

    //创建PGIS地图
    e.prototype._createPGISMap = function (vectorUrl, satelliteUrl, options) {
        // 创建地图
        var map = this._createMapOnly(options);
        if (!map) {
            return null;
        }

        // 图层参数
        var layerOpts = {
            centerPoint: map._mapAdapter._opts.centerPoint,
            type: "png",
            maxResolution: 2,
            resolutions: [1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 0.0006866455078125, 0.00034332275390625, 0.000171661376953125, 0.0000858306884765625, 0.00004291534423828125, 0.000021457672119140625, 0.000010728836059570312, 0.000005364418029785156, 0.000002682209014892578, 0.000001341104507446289, 6.705522537231445e-7, 3.3527612686157227e-7],
            tileOrigin: [-180, 90],
            units: "Lat-66"
        };

        var layers = [];

        // 添加矢量图层
        if (vectorUrl) {
            var vectorLayer = new NPMapLib.Layers.EzMapTileLayer(vectorUrl, "vectorLayer", $.extend({}, layerOpts, {
                isBaseLayer: true
            }));
            layers.push(vectorLayer);
            mapOpera.param.vectorLayer = vectorLayer;
        }

        // 添加卫星图层
        if (satelliteUrl) {
            var satelliteLayer = new NPMapLib.Layers.EzMapTileLayer(satelliteUrl, "satelliteLayer", $.extend({}, layerOpts, {
                isBaseLayer: !vectorUrl
            }));
            layers.push(satelliteLayer);
            mapOpera.param.satelliteLayer = satelliteLayer;
        }

        map.addLayers(layers);
        window.mapSuccess && window.mapSuccess(map);
        return map;
    };

    //创建天地图-离线地图
    e.prototype._createTiandiMap = function (vectorUrl, satelliteUrl, options) {        
        // 创建地图
        var map = this._createMapOnly(options);
        if (!map) {
            return null;
        }

        // 图层参数
        var layerOpts = {
            mapType: '',
            type: 'png',
            centerPoint: map._mapAdapter._opts.centerPoint,
            fullExtent: [-180, -90, 180, 90],
            topLevel: 0,
            bottomLevel: 18,
            isBaseLayer: true,
            isLocalMap: true,
            zoomOffset: 0
        };

        var layers = [];

        // 添加矢量图层
        if (vectorUrl) {
            var vectorLayer = new NPMapLib.Layers.TDMapLayer(vectorUrl + "/Vector/", "vector", $.extend({}, layerOpts, {
                type: "png",
                isBaseLayer: true
            }));
            layers.push(vectorLayer);
            mapOpera.param.vectorLayer = vectorLayer;
        }

        // 添加卫星图层
        if (satelliteUrl) {
            var satelliteLayer = new NPMapLib.Layers.TDMapLayer(satelliteUrl + "/Vector/", "satellite", $.extend({}, layerOpts, {
                type: "jpg",
                isBaseLayer: !vectorUrl
            }));
            layers.push(satelliteLayer);
            mapOpera.param.satelliteLayer = satelliteLayer;
        }

        map.addLayers(layers);

        return map;
    };

    //创建天地图-离线地图（切片和标记分离版本，不支持卫星地图）
    e.prototype._createTiandiMap_Old = function (vectorUrl, options) {
        // 创建地图
        var map = this._createMapOnly(options);
        if (!map) {
            return null;
        }

        // 图层参数
        var layerOpts = {
            mapType: '',
            type: 'png',
            centerPoint: map._mapAdapter._opts.centerPoint,
            fullExtent: [-180, -90, 180, 90],
            topLevel: 0,
            bottomLevel: 18,
            isBaseLayer: true,
            isLocalMap: true,
            zoomOffset: 0
        };

        //创建切片图层
        var layerSLYX = new NPMapLib.Layers.TDMapLayer("http://tile1.tianditu.com/DataServer", "ditu", $.extend({}, layerOpts, {
            isBaseLayer: true,
            mapType: 'EMap',
            mirrorUrls: [vectorUrl + "/vec_c/"]
        }));

        //创建标注图层
        var layerBZ = new NPMapLib.Layers.TDMapLayer("http://tile1.tianditu.com/DataServer", "biaozhu", $.extend({}, layerOpts, {
            isBaseLayer: false,
            mapType: 'ESatellite',
            mirrorUrls: [vectorUrl + "/cva_c/"]
        }));

        map.addLayers([layerSLYX, layerBZ]);

        return map;
    };

    //创建天地图-在线地图
    e.prototype._createTiandiMap_Online = function (options) {
        var url = ["http://t4.tianditu.com/DataServer",
            "http://t5.tianditu.com/DataServer",
            "http://t6.tianditu.com/DataServer"];
        options.projection = "EPSG:4326";
        var mapConfigResult =  {
            "mapOpts": options,
            "vectorLayer": [{
                "layerName": "tiandiBaseMap1",
                "layerType": "NPMapLib.Layers.TDMapLayer",
                "layerOpt": {
                    "url": url,
                    //"centerPoint": [121.4832066789972, 31.275096754271267],
                    "isBaseLayer": true,
                    mapType: "EMap"
                }
            },{
                layerName: 'tiandiBaseMap2',
                layerType: "NPMapLib.Layers.TDMapLayer",
                layerOpt: {
                    url: url,
                    isBaseLayer: false,
                    mapType: "ESatellite"
                }
            }],
            "sattilateLayer": [{
                layerName: 'tiandiBaseMap3',
                layerType: "NPMapLib.Layers.TDMapLayer",
                layerOpt: {
                    url: url,
                    isBaseLayer: true,
                    mapType: "img_c"
                }
            }]
        };
        var map = this._createMapOnly(mapConfigResult);
        window.mapMain = mapOpera.map = mapOpera.param.map = map;
        window.mapSuccess && window.mapSuccess(map);
        return map;


        //创建地图
       /* var map = this._createMapOnly(options);
        if (!map) {
            return null;
        }
        //图层地址
        var url = ["http://t2.tianditu.com/DataServer", "http://t4.tianditu.com/DataServer"];
        var layers = [];

        // 添加矢量图层
        if (vectorVisible) {
            var vec_c = new NPMapLib.Layers.TDMapLayer(url, "vec_c", { isBaseLayer: true, mapType: 'EMap' }); // 矢量图
            var cva_c = new NPMapLib.Layers.TDMapLayer(url, "cva_c", { isBaseLayer: false, mapType: 'ESatellite' }); // 矢量图标注
            layers.push(vec_c, cva_c);
            mapOpera.param.vectorLayer = [vec_c, cva_c];
        }

        // 添加卫星图层
        if (satelliteVisible) {
            var img_c = new NPMapLib.Layers.TDMapLayer(url, "img_c", { isBaseLayer: !vectorVisible, mapType: 'img_c' }); // 卫星图
            var cia_c = new NPMapLib.Layers.TDMapLayer(url, "cia_c", { isBaseLayer: false, mapType: 'cia_c' }); // 卫星图标注

            layers.push(img_c, cia_c);
            mapOpera.param.satelliteLayer = [img_c, cia_c];
        }
        mapOpera.param.isTiandiOnline = true;
        map.addLayers(layers);
        return map;*/
    };

    //创建百度在线地图
    e.prototype._createBaiduMap = function(options){
        var mapConfigResult =  {
            "mapOpts": options,
            "vectorLayer": [{
                "layerName": "baiduBaseMap1",
                "layerType": "NPMapLib.Layers.BaiduTileLayer",
                "layerOpt": {
                    "url": [ "http://online1.map.bdimg.com/tile/?qt=tile&x=${x}&y=${y}&z=${z}&styles=pl&udt=20150605&scaler=1",
                        "http://online2.map.bdimg.com/tile/?qt=tile&x=${x}&y=${y}&z=${z}&styles=pl&udt=20150605&scaler=1",
                        "http://online3.map.bdimg.com/tile/?qt=tile&x=${x}&y=${y}&z=${z}&styles=pl&udt=20150605&scaler=1"],
                    //"centerPoint": [121.4832066789972, 31.275096754271267],
                    "isBaseLayer": true
                }
            }],
            "sattilateLayer": [{
                "layerName": "baiduBaseMap2",
                "layerType": "NPMapLib.Layers.BaiduTileLayer",
                "layerOpt": {
                    "url": ["http://shangetu0.map.bdimg.com/it/u=x=${x};y=${y};z=${z};v=009;type=sate&fm=46&udt=20150601"],
                    // "centerPoint": [118.20568160775129,39.63166172960006],
                    "isBaseLayer": true
                }
            }]
        };
        var map = this._createMapOnly(mapConfigResult);
        window.mapMain = mapOpera.map = mapOpera.param.map = map;
        window.mapSuccess && window.mapSuccess(map);
        return map;
    };

    //创建高德在线地图
    e.prototype._createGaodeMap = function(options){
        var mapConfigResult =  {
            "mapOpts": options,
            "vectorLayer": [{
                "layerName": "shanghaiBaseMap1",
                "layerType": "NPMapLib.Layers.GaoDeLayer",
                "layerOpt": {
                    "url": ["http://webrd01.is.autonavi.com/appmaptile??lang=zh_cn&size=1&scale=1&style=7", "http://webrd02.is.autonavi.com/appmaptile??lang=zh_cn&size=1&scale=1&style=7", "http://webrd03.is.autonavi.com/appmaptile??lang=zh_cn&size=1&scale=1&style=7", "http://webrd04.is.autonavi.com/appmaptile??lang=zh_cn&size=1&scale=1&style=7"],
                    //"centerPoint": [121.4832066789972, 31.275096754271267],
                    "isBaseLayer": true
                }
            }],
            "sattilateLayer": [{
                "layerName": "shanghaiBaseMap2",
                "layerType": "NPMapLib.Layers.GaoDeLayer",
                "layerOpt": {
                    "url": ["http://webst01.is.autonavi.com/appmaptile?style=6"],
                   // "centerPoint": [118.20568160775129,39.63166172960006],
                    "isBaseLayer": true
                }
            }]
        };
        var map = this._createMapOnly(mapConfigResult);
        window.mapMain = mapOpera.map = mapOpera.param.map = map;
        window.mapSuccess && window.mapSuccess(map);
        return map;
    };

    //创建QQ在线地图
    e.prototype._createQQMap = function(url, options){

        var map = this._createMapOnly(options);
        var option = {
            fullExtent: [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892],
            sateTiles: false,
            isBaseLayer: true
        };
        var layerSLYX = new NPMapLib.Layers.QQMapLayer(url, 'ditu', option);
        map.addLayers([layerSLYX]);
        return map;
    };

    //创建超图
    e.prototype._createSuperMap = function(url, options){
        var map = this._createMapOnly(options);
        var layerSLYX = new NPMapLib.Layers.SuperMapLayer(url, "ditu");
        map.addLayers([layerSLYX]);
        return map;
    };

    //创建NPGIS地图
    e.prototype._createNPGISMap = function (vectorUrl, satelliteUrl) {
        var mapContainer = document.getElementById(e.prototype._mapId);
        var map;
        var callback = function (url, layerName, layerInfo) {
            var baseLayer;
            if (layerInfo.layerType) {
                if (!map) {
                    map = new NPMapLib.Map(mapContainer, {
                        minZoom: parseInt(layerInfo.minZoom),
                        maxZoom: parseInt(layerInfo.maxZoom),
                        defaultZoom: parseInt(layerInfo.defaultZoom),
                        restrictedExtent: layerInfo.restrictedExtent,
                        projection: "EPSG:" + layerInfo.projection,
                        centerPoint: layerInfo.centerPoint
                    });
                }
                baseLayer = new NPMapLib.Layers.NPLayer(url, layerName, {
                    isBaseLayer: true,
                    layerInfo: layerInfo
                });
                map.addLayer(baseLayer);
            } else {
                var resoutions = $.map(layerInfo.tileInfo.lods, function (f) {
                    return f.resolution;
                });
                var extent = [layerInfo.fullExtent.xmin,
					layerInfo.fullExtent.ymin,
					layerInfo.fullExtent.xmax,
					layerInfo.fullExtent.ymax
                ];
                if (!map) {
                    map = new NPMapLib.Map(mapContainer, {
                        minZoom: 0,
                        maxZoom: resoutions.length - 1,
                        restrictedExtent: extent,
                        projection: "EPSG:" + layerInfo.tileInfo.spatialReference.wkid
                    });
                }
                baseLayer = new NPMapLib.Layers.ArcgisTileLayer(
					url, layerName, {
					    isBaseLayer: true,
					    layerInfo: layerInfo
					});
                map.addLayer(baseLayer);
                map.zoomToExtent(new NPMapLib.Geometry.Extent(extent[0], extent[1], extent[2], extent[3]));
            }

            if (baseLayer) {
                if (layerName == "vector") {
                    mapOpera.param.vectorLayer = baseLayer;
                } else {
                    mapOpera.param.satelliteLayer = baseLayer;
                }
            }
            if(!mapOpera.map){
                window.mapMain = mapOpera.map = mapOpera.param.map = map;
            }
            window.mapSuccess && window.mapSuccess(map);
            return map;
        };

        var createMap = function (url) {
            debugger
            $.ajax({
                type: "get",
                url: url,
                async: false,
                dataType: 'jsonp',
                success: function (layerInfo) {
                    var layerName = (url == vectorUrl) ? "vector" : "satellite";
                    callback(url, layerName, layerInfo);

                },
                error: function () {
                    var name = (url == vectorUrl) ? "矢量图" : "卫星图";
                    alert('加载“' + name + '”配置失败！');
                }
            });
        };

        if (vectorUrl) {
            createMap(vectorUrl);
        }

        //if (satelliteUrl) {
        //    createMap(satelliteUrl);
        //}

        //return map;
    }


    //仅创建地图，不添加图层
    e.prototype._createMapOnly = function (options) {
        // 地图参数
        var defaults = {
            minZoom: 10, //地图允许展示的最小缩放级别
            maxZoom: 18, //地图允许展示的最大缩放级别
            restrictedExtent: [0, 0, 0, 0], //地图显示的限制范围(需要限制范围时再定义)
            centerPoint: [0 ,0], //地图显示的中心点(centerPoint和restrictedExtent设置一个即可)
            //projection: "EPSG:4326", //地图的投影方式
            projection: "EPSG:900913", //地图的投影方式
            displayProjection: "EPSG:4326", //地图的显示投影方式
            defaultZoom: 0 //地图初始Zoom，默认为地图最小Zoom
        }

        var settings = $.extend({}, defaults, options.mapOpts || options);

        //restrictedExtent未提供时置为空
        if (settings.restrictedExtent == defaults.restrictedExtent) {
            settings.restrictedExtent = null;
        }
        //centerPoint未提供时根据restrictedExtent计算
        if (!settings.centerPoint || settings.centerPoint == defaults.centerPoint) {
            if (!settings.restrictedExtent || settings.restrictedExtent.length != 4) {
                alert("加载地图失败: 中心坐标和限制区域都为空");
                return null;
            }

            //根据restrictedExtent计算centerPoint
            var lon = (parseFloat(settings.restrictedExtent[0]) + parseFloat(settings.restrictedExtent[2])) / 2;
            var lat = (parseFloat(settings.restrictedExtent[1]) + parseFloat(settings.restrictedExtent[3])) / 2;
            settings.centerPoint = [lon, lat];
        }

        // 创建地图
        var mapContainer = document.getElementById(e.prototype._mapId);
        //var map = new NPMapLib.Map(mapContainer, settings);
        options.mapOpts = settings;
        var mapConfig = new MapPlatForm.Base.MapConfig();
        var resultJson = mapConfig.createMap(mapContainer, options);
        resultJson.map.mapConfig = mapConfig;
        return resultJson.map;
    }
})();
