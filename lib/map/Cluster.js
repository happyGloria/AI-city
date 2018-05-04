/**
 * 聚合标注
 */
mapOpera.cluster = (function() {
	//停止添加覆盖物
	var isStopAddOverlay = false;

        //停止添加覆盖物方法
	function setStopAddOverlay(){
		isStopAddOverlay = true;
		console.warn('isStopAddOverlay = true;');
	}

	// 创建聚合覆盖物图层
	function createOverlayLayer(layerName, options) {
        var templateId = 'jizhanTemplate';
        var settings = {};
		var defaults = {
			icon: {
				url: "kakou.png",
				width: 30,
				height: 30
			},
			clusterIcon: {
				url: "bigKakou.png",
				width: 60,
				height: 70
			},
			click: function(obj) {
				if(!!obj){
				    if(obj.markType == 'wif'){
				        return;
                    }
                    var title = obj.name;
                    if(obj.markType == 'kakou'){
                        title = obj.name;
                    }
					var content = utils.html.build(templateId, {
						title: title,
						Longitude: obj.location.lon,
						Latitude: obj.location.lat,
                        Limit:obj.limit,
						Location: obj.name,
                        address: obj.address,
                        guid: obj.guid
					});
                    var height = 152;
                    var width = 260;

                    if(!!obj.ip){
                        height = 202;
                    }

                    if(!!obj.address){
                        height = 165;
                        width = 270;
                    }

                    if(obj.markType == 'camera'){
                        templateId = 'cameraTemplate';
                        width = 82;
                        height = 120;
                    }else if(obj.markType == 'wif'){
                        templateId = 'wifiTemplate';
                        width = 82;
                        height = 32;
                    }else{
                        templateId = 'kakouTemplate';
                        width = 160;
                        height = 120;
                    }
					mapOpera.openInfoWindow(obj.location, layerName, content, {
						width: width,
						height: height
					});
                    if(obj.markType == 'kakou'){
                        window.clickBayonet&&window.clickBayonet(obj);
                    }
				}
			},
			fontColor: "transparent"
		};
        
		settings = $.extend({}, defaults, options);
		settings.clusterIcon.url = '/template/img/newmap/' + settings.clusterIcon.url;
		settings.icon.url = '/template/img/newmap/' + settings.icon.url;
        var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0);
        var offsetY = 10;
        if(!!isIE){
            offsetY = 6;
        }
		var e = new NPMapLib.Layers.OverlayLayer(layerName, true, {
			getUrl: function(count, clusterMarker) {	
				if (count) { // 大图
					return settings.clusterIcon.url; // 大图
				} else { // 小图
				    if (clusterMarker.alarmType === "警报") {
				        return 'template/img/newmap/ck_hover.png'; //使用自定义图片
				    }
				    if (clusterMarker.pcMark == 1) {
				        return 'template/img/newmap/chezai.png'; //使用自定义图片
				    }
					return settings.icon.url;
				}
			},
			getImageSize: function (count, clusterMarker) {
				if (count) { // 大图
					return {
						width: settings.clusterIcon.width,
						height: settings.clusterIcon.height
					};
				} else { // 小图
				    if (clusterMarker.imageSize) {
				        return clusterMarker.imageSize; //使用自定义图片大小
				    }
					return {
						width: settings.icon.width,
						height: settings.icon.height
					};
				}
			},
			getRotation: function(count, clusterMarker) { // 获取标注图标的角度
				if (count || !clusterMarker.angle) {
					return 0;
				} else {
					return clusterMarker.angle;
				}
			},
			click: settings.click,
            mouseover: settings.mouseover,
            mouseout: settings.mouseout,
            clusteronmouseover: settings.clusteronmouseover,
			fontColor: settings.fontColor,
		    //clusterClickModel: "slice",
            labelYOffset: offsetY,//聚合数字的垂直偏移量
            //labelYOffsetIE: -10,//聚合数字的垂直偏移量,IE下
			maxZoom: mapOpera.map.getMaxZoom(10) // 达到maxZoom时，聚合点全部展开
		});
		mapOpera.param.map.addLayer(e);
		mapOpera.param[layerName] = e;

		return e;
	}

	//删除覆盖物图层
	function removeOverlayLayer(layerName){
		mapOpera.param.map.removeLayerByName(layerName);
		mapOpera.param[layerName] = null;
	};

	/**
	 * 添加聚合标注到聚合覆盖物图层
	 * @param {[type]} layerName [聚合覆盖物图层名]
	 * @param {[type]} dataJson  [标注数据数组，必须包含属性：lon, lat，可选属性：dataId, dataType]
	 */
	function addClusterMarkers(layerName, dataJson) {
	    //console.info("addClusterMarkers..");
		debugger;
		var layer = mapOpera.param[layerName];

		if (!layer) {
		    console.warn("OverlayLayer not found: " + layerName);
			return;
		}

		if (!$.isArray(dataJson)) {
			console.warn("dataJson 不能为空");
			return;
		}

		// 创建单个聚合物e
		var points = [];
		$.each(dataJson, function(i, item) {
			if (!item || !item.lon || !item.lat) {
				return;
			}
			/*var isMappage =  window.location.hash.indexOf('#/index/map/') >= 0 || window.location.hash.indexOf('#/index/mapManagement/') >= 0;

			//当该标记为true时，停止添加覆盖物
			if(!isMappage){
				console.error('isStopAddOverlay: true');
				dataJson = [];
				//mapOpera.param.map.destroyMap();
				return false;
			}*/

			var p = new NPMapLib.Symbols.ClusterMarker(
				{
					lon: parseFloat(item.lon),
					lat: parseFloat(item.lat)
				}, 
				{
					markType: item.markType
				}
			);
			for(var key in item){
				p[key] = item[key];
			}
			points.push(p);
		});

	    // 创建聚合覆盖物
		//console.error("clusterPoints: " + points.length);
		var clusterPoints = new NPMapLib.Symbols.ClusterPoints(points, {
		    distance: 200, //多少距离聚合到一起
		    threshold: 6 // 聚合点位少于threshold撒开
		});
		//clusterPoints.setData({mapId: mapOpera.map.id});
	    // 添加到聚合覆盖物图层（会自动清除之前添加的覆盖物）
		layer.addOverlay(clusterPoints);
	}

    /**
     *创建非聚合图层
     */
    function createSmallOverlayLayer(layerName){
        var e = new NPMapLib.Layers.OverlayLayer(layerName, false);
        mapOpera.param[layerName] = e;
        mapOpera.param.map.addLayer(e);
        return e;
    }

	/**
     *在覆盖物图层上添加非聚合图形标记
	 */
	function addMarkers(layerName, dataJson) {

		var layer = mapOpera.param[layerName];

		if (!layer) {
			console.warn("OverlayLayer not found: " + layerName);
			return;
		}

		if (!$.isArray(dataJson)) {
			console.warn("dataJson 不能为空");
			return;
		}

		$.each(dataJson, function(i, item) {
			if (!item || !item.lon || !item.lat) {
				console.warn("lonlat is empty: " + item);
				return;
			}

			var isMappage =  window.location.hash.indexOf('#/index/map/') >= 0;

			//当该标记为true时，停止添加覆盖物
			if(!isMappage){
				console.error('isStopAddOverlay: true');
				dataJson = [];
				//mapOpera.param.map.destroyMap();
				return false;
			}
            var center = new NPMapLib.Geometry.Point(item.lon, item.lat);
			var p = new NPMapLib.Symbols.Marker(center);
			var size = new NPMapLib.Geometry.Size(26,26);
            var title='';
            var icon = null;
            if(!item.jizhan){
                icon = new NPMapLib.Symbols.Icon('template/img/map/control_small.png', size);
                title='重点区域';
            }else{
                icon = new NPMapLib.Symbols.Icon('template/img/map/jizhan_small.png', size);
                title='基站信息';
            }

			icon.setAnchor(new NPMapLib.Geometry.Size(-size.width/ 2, -size.height/2));
			p.setIcon(icon);
			layer.addOverlay(p);

            p.addEventListener(NPMapLib.CIRCLE_EVENT_MOUSE_OVER, function(e){
                var imgUrl = 'template/img/map/control.png';
                if(!!item.jizhan){
                    imgUrl = 'template/img/map/jizhan.png';
                }
                var siz = new NPMapLib.Geometry.Size(30, 30);
                var ico2 = new NPMapLib.Symbols.Icon(imgUrl, siz);
                ico2.setAnchor(new NPMapLib.Geometry.Size(-siz.width/ 2, -siz.height/2));
                e.setIcon(ico2);
                e.refresh();
            });
            p.addEventListener(NPMapLib.CIRCLE_EVENT_MOUSE_OUT, function(e){
                var imageurl = 'template/img/map/control_small.png';
                if(!!item.jizhan){
                    imageurl = 'template/img/map/jizhan_small.png';
                }
                var siz = new NPMapLib.Geometry.Size(26, 26);
                var ico1 = new NPMapLib.Symbols.Icon(imageurl, siz);
                ico1.setAnchor(new NPMapLib.Geometry.Size(-siz.width/ 2, -siz.height/2));
                e.setIcon(ico1);
                e.refresh();
                //console.log(ico1)
            });
            p.addEventListener(NPMapLib.CIRCLE_EVENT_CLICK, function(){
                var content = utils.html.build("jizhanTemplate", {
                    title: title,
                    ID:item.ip,
                    Longitude: item.lon,
                    Latitude: item.lat,
                    Location: item.name,
                    Limit:item.limit
                });
                var height = 152;
                if(!!item.jizhan){
                    height = 202;
                }
                mapOpera.openInfoWindow(center, layerName, content, {
                    width: 260,
                    height: height
                });
            });
		});


	}

	function getClusterMarker(layerName, dataId) {
		if (mapOpera.param[layerName]) {
		    var clusterPoints = mapOpera.param[layerName].getOverlaysArry()[0];
		    if (!clusterPoints) { //图层中没有标注时会返回undefined
		        return;
		    }
			var clusterMarkers = clusterPoints.getClusterPoints();

			var length = clusterMarkers.length;
			for (var i = 0; i < length; i++) {
				if (clusterMarkers[i].dataId == dataId) {
					return clusterMarkers[i];
				}
			}
		}
		return null;
	}

	return {
		createOverlayLayer: createOverlayLayer,
		removeOverlayLayer: removeOverlayLayer,
		addClusterMarkers: addClusterMarkers,
		getClusterMarker: getClusterMarker,
        createSmallOverlayLayer: createSmallOverlayLayer,
		addMarkers: addMarkers,
		setStopAddOverlay: setStopAddOverlay
	};
})();
