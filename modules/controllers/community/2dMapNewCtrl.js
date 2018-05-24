/**
 * 一标六实小区二维地图页面
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/basicConfig.js', 'notify', 'echarts-dark', 'config/common', 'npgis2','yituFace'],
	function(app, controllers, $, basicConfig, notify, dark, utils, npgis2,yituFace) {
		var twoDMapCtrl = ['$scope', '$state', '$stateParams', 'communityAllService', 'mapService', '$compile', 'communityRightModuleService', 'moreService', '$interval',
			function($scope, $state, $stateParams, communityAllService, mapService, $compile, rightService, moreService, $interval) {

				var tianLinPs =null;
				var isTianLinShow=true;
				function huaTianLinLunKuo(){
                    var geometry={
                        "type": "Polygon",
						"coordinates": [
							[
								[121.43886745935846, 30.77473353989906],
								[121.41135168283003, 30.81831866986294],
								[121.36466890252184, 30.836007800975132],
								[121.33176121145458, 30.946185664497794],
								[121.34066580029375, 30.97735830610781],
								[121.48499497441921, 31.020413688176077],
								[121.67259713281722, 30.98815474879805],
								[121.7164794392232, 30.979851591778488],
								[121.77625232174478, 30.945142019988534],
								[121.77625668748327, 30.89274455247968],
								[121.76869265536013, 30.876245607709233],
								[121.76731941773085, 30.85150285002237],
								[121.66712643498212, 30.845687821169925],
								[121.53048577405231, 30.81271207805664],
								[121.43886745935846, 30.77473353989906]
							]
						]
                    }
                    
					var mapGeometry = new MapPlatForm.Base.MapGeometry(map);
					tianLinPs = mapGeometry.getGeometryByGeoJson(geometry, map);
                    tianLinPs.setStyle({
                        color: '#ffc700', // '#ffc700', //颜色
                        fillColor:'', // '#ffc700', //填充颜色
                        weight: 4, //宽度，以像素为单位
                        opacity: 0, //透明度，取值范围0 - 1
                        fillOpacity: 0.01 //填充的透明度，取值范围0 - 1,
                    });
                    tianLinPs.setZIndex(0);
                    map.addOverlay(tianLinPs);
				}

                var init = function() {
					setTimeout(function() {
						mapOpera.init('2dMap');
					}, 500)
				}
				init();

                // $scope.mapLoadSuccess = [];
                //当地图初始化完成时调用
				window.mapSuccess = function(map) {
					// 矩形框选功能
					var mapTools =new MapPlatForm.Base.MapTools(map)
					var ctr = new NPMapLib.Controls.MousePositionControl();
					map.addControl(ctr);
					map.setZoom(11);
					setTimeout(function() {
						map.setCenter(new NPMapLib.Geometry.Point(121.54235741904752,30.9103111981994));
						huaTianLinLunKuo();
						openCarPop();

						var style = {
							color: "blue", //颜色
							fillColor: "red", //填充颜色
							weight: 2, //宽度，以像素为单位
							opacity:1, //透明度，取值范围0 - 1
							fillOpacity: 0.1, //填充的透明度，取值范围0 - 1,
							strokeColor: 'blue',
							strokeDashstyle:'dash',
							lineStyle: NPMapLib.LINE_TYPE_DASH //样式
						};
						$scope.drawRectangle=function(){
							map.removeOverlay($scope.geometry);
							//框选不太准，画出来的框会偏左上，需要往右下画
							mapTools.drawRectangle(function(res,geometry){
								console.log(res)
								var selectCameraList=$scope.cameraList.filter(function(v){
									return v.lat>=res.bottom && v.lat<=res.top && v.lon>=res.left && v.lon>=res.right
								})
								console.log(selectCameraList)
								$scope.geometry=geometry
								map.addOverlay(geometry);
							},style)
						}
						$scope.cancelDraw=function(){
							map.removeOverlay($scope.geometry);
							mapTools.cancelDraw();
						}

						// 实有安防设施 - 监控 - 小区监控、道路监控
						$scope.toggleLayer(511,2);
						$scope.toggleLayer(512,2);

                        $scope.$emit('mapLoadSuccess', $scope.drawbiankuang());
						$scope.$emit('toggleLayerFn', $scope.toggleLayer)
					}, 1500);
				};

				/*===============地图撒点=====================*/
				//楼栋
				$scope.isShowbuilding = true;
				var buildingPoint = []
				var buildingLayer = null;
				//gps
				$scope.isShowGps = false;
				var gpsPoint = [];
				var gpsLayer = null;
				//实有警情
				$scope.isShowAlerts = false;
				var alertsPoint = [];
				var alertsLayer = null;
				//出入口
				$scope.isShowDoorway = false;
				var doorwayPoint = [];
				var doorwayLayer = null;
				//实有力量mac
				$scope.isShowMac = false;
				var macPoint = [];
				var macLayer = null;
				//实有单位
				$scope.isShowEmployer = false;
				var employerPoint = [];
				var employerLayer = null;

				//wifi
				$scope.isShowWifi = false;
				var wifiPoint = [];
				var wifiLayer = null;

				//门禁
				$scope.isShowDoor = false;
				var doorPoint = [];
				var doorLayer = null;
				//摄像头
				$scope.isShowCamera = false;
				var cameraPoint = [];
				var cameraLayer = null;
                //道路摄像头
				$scope.isShowCamera2 = false;
				var cameraPoint2 = [];
				var cameraLayer2 = null;
				//烟感
				$scope.isShowSmoke = false;
				var smokePoint = [];
				var smokeLayer = null;

				//ck
				$scope.isShowCk = false;
				var ckPoint = [];
				var ckLayer = null;
				//电弧
				$scope.isShowArc = false;
				var arcPoint = [];
				var arcLayer = null;

				//消防拴
				$scope.isShowFireplug = false;
				var fireplugPoint = [];
				var fireplugLayer = null;

				//微型消防站
				$scope.isShowFirehouse = false;
				var firehousePoint = [];
				var firehouseLayer = null;

				//卡口
				$scope.isShowBayonet = false;
				var BayonetPoint = [];
				var BayonetLayer = null;

				//车棚
				$scope.isShowShed = false;
				var shedPoint = [];
				var shedLayer = null;

				//窨井盖
				$scope.isShowSewer = false;
				var sewerPoint = [];
				var sewerLayer = null;
				//信息窗口
				var infoWindow = null;
				var gpsLayer;
				var time = utils.changeDayToString(new Date());
				//gps
				$scope.queryPoliceHour = function() {
					var req = {
						villageCode:'',
						pageNumber: 1,
						pageSize: 999,
						radioIds: '',
						startTime:utils.changeDayToString(utils.addSeconds(new Date(),-1))+" 00:00:00",
						endTime: utils._changeDayToObject(new Date())+":00"
					}
					communityAllService.findGpsByPage(req).then(function(data) {
						if(data.resultCode == '200') {
							gpsPoint=data.data.list;
							setgps();
						} else {
						}
					});
				}
				var setgps = function() {
					gpsLayer = mapOpera.cluster.createOverlayLayer('gps', {
						icon: {
							url: 'gps.png',
							width: 32,
							height: 32
						},
						clusterIcon: {
							url: 'map-cluster-green-4.png',
							width: 44,
							height: 44
						},
						fontColor: '#fff',
						mouseover: function(e) {
							var style;
							if(e.pcMark==1){
                                style = {
								fontSize: 12,
								externalGraphic: 'template/img/newmap/chezai.png',
								graphicHeight: 36,
								graphicWidth: 36
							};
							}else{
                               style = {
								fontSize: 12,
								externalGraphic: 'template/img/newmap/gps.png',
								graphicHeight: 36,
								graphicWidth: 36
							};
							}
							e.changeStyle(style, true);
						},
						mouseout: function(e) {
							var style;
							if(e.pcMark==1){
							 style = {
								fontSize: 12,
								externalGraphic: 'template/img/newmap/chezai.png',
								graphicHeight: 32,
								graphicWidth: 32
							};
						   }else{
						   	style = {
								fontSize: 12,
								externalGraphic: 'template/img/newmap/gps.png',
								graphicHeight: 32,
								graphicWidth: 32
							};
						   } 
							e.changeStyle(style, true);
						},
						clusteronmouseover: function(e, isCluster) {},
						click: function(e) {
							removeWindow();
							var position = e.location.lon + ',' + e.location.lat;
							var obj = {
								position: position,
								RadioID: e.radioID,
								PCNumber: e.pcNumber,
								PoliceUnit: e.policeUnit,
								policeName:e.policeName,
								policeMobileNo:e.policeMobileNo,
								GPSDataTime: e.gpsDataTime,
								pcMark:e.pcMark
							}
							openGpsWindow(obj);
							addEvents1();
						}
					});
					gpsLayer.show();
					//$scope.isShowGps = true;
					mapOpera.cluster.addClusterMarkers('gps', gpsPoint);
					gpsLayer.setZIndex(600);
					gpsPoint = {};
				}
				var openGpsWindow = function(obj) {
					var str = '<div class="map-layerLine">';
					str += '<div class="list">';
					str += '<span class="text">电台ID：' + obj.RadioID + '</span>';
					if(obj.pcMark==1){
                      str += '<span class="text">车牌号：' + obj.PCNumber + '</span>';
					}else{
                      str += '<span class="text">警号：' + obj.PCNumber + '</span>';
					}
					if(obj.policeName){
                     str += '<span class="text">警员名称:' + obj.policeName + '</span>';
					}
					if(obj.policeMobileNo){
                     str += '<span class="text">警员手机:' + obj.policeMobileNo + '</span>';
					}
					str += '<span class="text">' + obj.GPSDataTime + '</span>';
					str += '</div>'
					str += '</div>';
					var position = obj.position;
					position = new NPMapLib.Geometry.Point(position.split(',')[0], position.split(',')[1]);
					gpsInfoWindow = new NPMapLib.Symbols.InfoWindow(position, "", str, {
						width: 160, //信息窗宽度，单位像素
						height: 140, //信息窗高度，单位像素
						autoSize: false,
						//offset: offset, //信息窗位置偏移值
						iscommon: false, //是否为普通窗体（不带箭头）
						enableCloseOnClick: false, //移动地图，不关闭信息窗口。
						//paddingForPopups: paddingForPopups, //信息窗自动弹回后，距离四边的值。isAdaptation为true时，该设置有效。
						isAnimationOpen: false, //信息窗打开时，地图是否平滑移动，默认不平滑移动。
						isAdaptation: false, //信息窗位置是否自适应，默认不自适应。
						positionBlock: {
							imageSrc: '/template/img/newmap/map-layer-arrow1.png',
							imageSize: {
								width: 12,
								height: 9
							}
						}
					});
					//转换为像素坐标
					var posPixel = map.pointToPixel(gpsInfoWindow);
					map.addOverlay(gpsInfoWindow);
					gpsInfoWindow.open(null, false);
				}
				var openPowerWindow = function(obj) {
					var person = obj.person;
					var str = '<div class="map-layerLine">';
					str += '<div style="">共' + obj.person.length + '人</div>';
					str += '<div class="list" style="overflow-y:auto;height:100px">';
					if(person && person.length > 0) {
						for(var i = 0; i < person.length; i++) {
							str += '<span class="name"><a href="/#/index/peoplefile/' + person[i].ZJHM + '/'+person[i].villageCode+'" target="_blank">' + person[i].XM + '</a></span><label class="label-text label-text-orange" style="margin-left:3px;">' + person[i].BQ + '</label><br>';
						}
					}
					str += '</div>'
					str += '</div>';
					var w = 160;
					var h = 140;
					var position = obj.position;
					position = new NPMapLib.Geometry.Point(position.split(',')[0], position.split(',')[1]);
					powerInfoWindow = new NPMapLib.Symbols.InfoWindow(position, "", str, {
						width: w, //信息窗宽度，单位像素
						height: h, //信息窗高度，单位像素
						autoSize: false,
						//offset: offset, //信息窗位置偏移值
						iscommon: false, //是否为普通窗体（不带箭头）
						enableCloseOnClick: false, //移动地图，不关闭信息窗口。
						//paddingForPopups: paddingForPopups, //信息窗自动弹回后，距离四边的值。isAdaptation为true时，该设置有效。
						isAnimationOpen: false, //信息窗打开时，地图是否平滑移动，默认不平滑移动。
						isAdaptation: false, //信息窗位置是否自适应，默认不自适应。
						positionBlock: {
							imageSrc: '/template/img/newmap/map-layer-arrow1.png',
							imageSize: {
								width: 12,
								height: 9
							}
						}
					});
					//转换为像素坐标
					var posPixel = map.pointToPixel(powerInfoWindow);
					map.addOverlay(powerInfoWindow);
					powerInfoWindow.open(null, false);
				}
				//Gps警务
              
				var addEvents1 = function() {
					//左键单击
					//alert(111);
					// map.addEventListener(NPMapLib.MAP_EVENT_RIGHT_CLICK,function(){
					// 	debugger;
					// 		// mapTools.cancelMeasure();
					// 	});
					// map.addEventListener(NPMapLib.MAP_EVENT_CLICK, function(point) {
					// 	debugger;
                    //     // document.getElementById("searchCommunityMap").blur();
				    //     // $(".communityAllNew-search-ztree").css("display","none");
				    //     // $(".slimScrollDiv").css("display","none");
					// 	// removeWindow();
					// });
				};
				var removeWindow = function() {
					if(infoWindow) {
						infoWindow.close();
						infoWindow = null;
					}
					if(gpsInfoWindow) {
						gpsInfoWindow.close();
						gpsInfoWindow = null;
					}
					if(powerInfoWindow) {
						powerInfoWindow.close();
						powerInfoWindow = null;
					}
					if(communityInfoWindow) {
						communityInfoWindow.close();
						communityInfoWindow = null;
					}
				}
				//信息窗口
				var infoWindow = null;
				var gpsInfoWindow = null;
				var powerInfoWindow = null;
				var communityInfoWindow = null;


				var openWindow = function(obj) {
					if(obj.companyid && obj.companyid != '') {
						localStorage.setItem('id_'+obj.villageCode, obj.companyid);
					}
					var str = '<div class="map-layerCon">';
					str += '<div class="cars-mapCon11">';
					if(obj.pic) {
						str += '<a class="img-box" style="width:150px;height:80px;" href="' + obj.pic + '" target="_blank">';
						str += '<img src="' + obj.pic + '" style="width:150px;height:80px;"/>';
						str += '</a>';
					}
					str += '<div style="margin-top:5px;">';
					if(typeof(obj.name) != 'undefined') {
						str += '<p>' + obj.name + '</p>';
					}

					//ck
					if(typeof(obj.userAddress) != 'undefined') {
						str += '<p>' + obj.userAddress + '</p>';
					}
					if(typeof(obj.userName) != 'undefined') {
						str += '<p>' + obj.userName + '</p>';
					}
					if(typeof(obj.alarmTime) != 'undefined') {
						str += '<p>' + obj.alarmTime + '</p>';
					}
					if(typeof(obj.alarmDesc) != 'undefined') {
						str += '<p>' + obj.alarmDesc + '</p>';
					}
					if(typeof(obj.chargePersonName) != 'undefined') {
						str += '<p>' + obj.chargePersonName + '</p>';
					}
					if(typeof(obj.chargePersonTelphone) != 'undefined') {
						str += '<p>' + obj.chargePersonTelphone + '</p>';
					}

					if(typeof(obj.address) != 'undefined') {
						str += '<p>' + obj.address + '</p>';
					}
					if(obj.companyid && obj.companyid != '') {
						str += ('<p><a href="/#/index/peopleDetail/' + obj.villageCode + '" target="_blank">查看从业人员</a></p>');
					}
					if(obj.caseDesc && obj.caseDesc != '') {
                     str += '<p style="width:160px;">' + obj.caseDesc + '</p>';					
                    } 
                    if(obj.time && obj.time != '') {
                     str += '<p style="width:160px;">' + obj.time + '</p>';					
                    } 
					str += '</div>';
					str += '</div>';
					str += '</div>';
					var position = obj.position;
					position = new NPMapLib.Geometry.Point(position.split(',')[0], position.split(',')[1]);
					// var title = '';
					// var content = '';
					// var paddingForPopups = new NPMapLib.Geometry.Extent(15, 15, 15, 15);
					//var offset = new NPMapLib.Geometry.Size(0, 0);
					infoWindow = new NPMapLib.Symbols.InfoWindow(position, "", str, {
						width: 170, //信息窗宽度，单位像素
						height: 180, //信息窗高度，单位像素
						autoSize: false,
						//offset: offset, //信息窗位置偏移值
						iscommon: false, //是否为普通窗体（不带箭头）
						enableCloseOnClick: false, //移动地图，不关闭信息窗口。
						//paddingForPopups: paddingForPopups, //信息窗自动弹回后，距离四边的值。isAdaptation为true时，该设置有效。
						isAnimationOpen: false, //信息窗打开时，地图是否平滑移动，默认不平滑移动。
						isAdaptation: false, //信息窗位置是否自适应，默认不自适应。
						positionBlock: {
							imageSrc: '/template/img/newmap/arrow.png',
							imageSize: {
								width: 20,
								height: 11
							}
						}
					});
					//转换为像素坐标
					var posPixel = map.pointToPixel(position);
					map.addOverlay(infoWindow);
					infoWindow.open(null, false);
				}
				var getUrl = function(url) {
					var newUrl = window.location.href.split("/#")[0] + 'zhsq' + url;
					return newUrl
				}

				//定时弹出车辆抓拍窗口
				var cartimer = null;
				var carMarker;
				var websocket = null;
				var socketIp = basicConfig.websocketIP;
				$scope.carData = {};
				var i = 0;
				var carInterval = null;
				var carMarkerArr = [];
				var carInfoWindowArr = [];
				var carInfoWindow = null;


				function openCarPop() {
					if(websocket == null) {
						//判断当前浏览器是否支持WebSocket
						if('WebSocket' in window) {
							websocket = new WebSocket(socketIp);
						} else {
							alert('Not support websocket')
						}
					}

					websocket.onopen = function(event) {
						websocket.send(JSON.stringify({
							"villageCode": '',
							"pushType": "3"
						}));
						console.log("success");
					}
					websocket.onerror = function() {
						websocket = new WebSocket(socketIp);
					};
					//接收到消息的回调方法

					websocket.onmessage = function(event) {
						$scope.carData = JSON.parse(event.data).data;
						console.log($scope.carData);
						// debugger
						if($scope.carData.length == 0){
							return false;
						}
						$interval.cancel(carInterval);
						var i = 0;
						var num = $scope.carData.length;
						carInterval = $interval(function() {
							if(carInfoWindow){
								angular.forEach(carMarkerArr, function(data) {
									map.removeOverlay(data);
								})
								carInfoWindow.close();
								carMarker.hide();
							}
							if(i >= num){
								$interval.cancel(carInterval);
								return false;
							}else{
								intercalCarLay(i);
								i++
							}
						}, 1000);

					}

					//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
					window.onbeforeunload = function() {
						websocket.close();

					}
				}

				function intercalCarLay(val) {
					var car = $scope.carData[val];
					var lon = car.lon;
					var lat = car.lat;
					var pic = car.platePic;
					var time = car.inOutTime;
					var number = car.plateNumber;
					var type = car.inOutType;
					var door = car.tollgateName;
					var address = car.address;
					var position = lon + ',' + lat;
					var size = new NPMapLib.Geometry.Size(32, 32);
					var carObj = {
						pic: pic,
						door: door,
						time: time,
						type: type,
						number: number,
						address: address,
						position: position
					};
					var pt = new NPMapLib.Geometry.Point(lon, lat);
					var icon = new NPMapLib.Symbols.Icon("/template/img/newmap/car.png", size);
					carMarker = new NPMapLib.Symbols.Marker(pt);
					carMarker.setIcon(icon);
					map.addOverlay(carMarker);
					if(typeof(lon) != 'undefined' && typeof(lat) != 'undefined') {
						openCarWindow(carObj);
					} else {
						//alert("车辆坐标不对")
					}

				}
				var openCarWindow = function(obj) {
					var str = '<div class="map-layerCon">';
					str += '<div class="title">抓拍车辆</div>';
					str += '<div class="cars-mapCon">';
					str += '<div class="img-box">';
					str += '<img src="/zhsq/file/show?path='+obj.pic + '" />';
					str += '</div>';
					str += '<div class="message-box">';
					str += '<p class="name">' + obj.number + '</p>';
					str += '<p>' + obj.time + '</p>';
					str += '<p>' + (obj.address|| '') + '</p>';
					str += '</div>';
					str += '</div>';
					str += '</div>';
					var position = obj.position;
					position = new NPMapLib.Geometry.Point(position.split(',')[0], position.split(',')[1]);
					carInfoWindow = new NPMapLib.Symbols.InfoWindow(position, "", str, {
						width: 200, //信息窗宽度，单位像素
						height: 150, //信息窗高度，单位像素
						autoSize: false,
						//offset: offset, //信息窗位置偏移值
						iscommon: false, //是否为普通窗体（不带箭头）
						enableCloseOnClick: false, //移动地图，不关闭信息窗口。
						//paddingForPopups: paddingForPopups, //信息窗自动弹回后，距离四边的值。isAdaptation为true时，该设置有效。
						isAnimationOpen: false, //信息窗打开时，地图是否平滑移动，默认不平滑移动。
						isAdaptation: false, //信息窗位置是否自适应，默认不自适应。
						positionBlock: {
							imageSrc: '/template/img/newmap/arrow.png',
							imageSize: {
								width: 20,
								height: 11
							}
						}
					});
					//转换为像素坐标
					var posPixel = map.pointToPixel(position);
					map.addOverlay(carInfoWindow);
					carInfoWindow.open(null, false);
				};

				var faceInterval = null;
				//控制显示或不显示图层
				$scope.toggleLayer = function(number,isChecked) {
					switch(number) {
						//实有力量mac
						case 21:
							if(macLayer) {
								if(macLayer.isVisible()) {
									macLayer.hide();
									$scope.isShowMac = false;
								} else {
									macLayer.show();
									$scope.isShowMac = true;
									//addOverlayer();
								}
							} else {
								macLayer = mapOpera.cluster.createOverlayLayer('mac', {
									icon: {
										url: 'power.png',
										width: 38,
										height: 27.5
									},
									clusterIcon: {
										url: 'map-cluster-green-4.png',
										width: 44,
										height: 44
									},
									fontColor: '#fff',
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/power.png',
											graphicHeight: 27.5,
											graphicWidth: 38
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/power.png',
											graphicHeight: 27.5,
											graphicWidth: 38
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										//debugger;
										removeWindow();
										var position = e.location.lon + ',' + e.location.lat;
										var count = e.person.length;
										var obj = {
											count: count,
											person: e.person,
											position: position,
											name: e.XM,
											bq: e.BQ,
											zjhm: e.ZJHM,
											address: e.address
										};
										openPowerWindow(obj);
										addEvents1();
									},
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								macLayer.show();
								macLayer.setZIndex(600);
								$scope.isShowMac = true;
								addOverlayer('mac');
							};
							break;
							//gps警务
						case 22:
							if(gpsLayer) {
								if(gpsLayer.isVisible()) {
									gpsLayer.hide();
								} else {
									gpsLayer.show();
									//addOverlayer();
								}
							} else {
								$scope.queryPoliceHour();
							}
							break;
						//实有警情
						case 23:
							if(alertsLayer) {
								if(alertsLayer.isVisible()) {
									alertsLayer.hide();
									$scope.isShowAlerts = false;
								} else {
									alertsLayer.show();
									$scope.isShowAlerts = true;
									//addOverlayer();
								}
							} else {
								alertsLayer = mapOpera.cluster.createOverlayLayer('alerts', {
									icon: {
										url: 'alert.png',
										width: 38,
										height: 27.5
									},
									clusterIcon: {
										url: 'map-cluster-green-4.png',
										width: 44,
										height: 44
									},
									fontColor: '#fff',
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/alert.png',
											graphicHeight: 24,
											graphicWidth: 24,
											label: e.precinctName,
											labelYOffset: 28,
											labelBackgroundColor: '#0bb92e',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#0bb92e"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/alert.png',
											graphicHeight: 27.5,
											graphicWidth: 38,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										removeWindow();
										var position = e.location.lon + ',' + e.location.lat;
										removeWindow();
										var obj = {
											position: position,
											name: e.precinctName,
											address:e.caseAddress,
											pic:'',
											caseDesc:e.caseDesc,
											time:e.createTime
										};
										openWindow(obj);
										addEvents1();
									},
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								alertsLayer.show();
								alertsLayer.setZIndex(600);
								$scope.isShowAlerts = true;
								addOverlayer('alerts');
							};
							break;
							//楼栋号
						case 3:
							if(buildingLayer) {
								if(buildingLayer.isVisible()) {
									buildingLayer.hide();
									$scope.isShowbuilding = false;
								} else {
									buildingLayer.show();
									$scope.isShowbuilding = true;
									//addOverlayer();
								}
							} else {
								buildingLayer = mapOpera.cluster.createOverlayLayer('building', {
									icon: {
										url: 'building2.png',
										width: 22,
										height: 22
									},
									clusterIcon: {
										url: 'map-cluster-green-4.png',
										width: 44,
										height: 44
									},
									fontColor: '#fff',
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/building2.png',
											graphicHeight: 24,
											graphicWidth: 24,
											label: e.buildingNo,
											labelYOffset: 28,
											labelBackgroundColor: '#0bb92e',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#0bb92e"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/building2.png',
											graphicHeight: 22,
											graphicWidth: 22,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										$scope.villageCode=e.villageCode;
										;
										removeWindow();
										clickBuilding(e.buildingNo,e.villageCode);
									},
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								buildingLayer.show();
								$scope.isShowbuilding = true;
								addOverlayer('building');
							}
							buildingLayer.setZIndex(600);
							break;
							//出入口
						case 6:
							if(doorwayLayer) {
								if(doorwayLayer.isVisible()) {
									doorwayLayer.hide();
									$scope.isShowdoorway = false;
								} else {
									doorwayLayer.show();
									$scope.isShowdoorway = true;
									//addOverlayer();
								}
							} else {
								doorwayLayer = mapOpera.cluster.createOverlayLayer('doorway', {
									icon: {
										url: 'doorway.png',
										width: 32,
										height: 32
									},
									clusterIcon: {
										url: 'map-cluster-yellow-4.png',
										width: 44,
										height: 44
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/doorway.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.name,
											labelYOffset: 28,
											labelBackgroundColor: '#c6a847',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#c6a847"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/doorway.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										removeWindow();
										var picUrl = utils.getUrl(e.picUrl);
										var position = e.location.lon + ',' + e.location.lat;
										var obj = {
											position: position,
											name: e.name,
											address:'',
											pic: picUrl
										};
										openWindow(obj);
										addEvents1();
									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								doorwayLayer.show();
								$scope.isShowdoorway = true;
								addOverlayer('doorway');
							}
							doorwayLayer.setZIndex(600);
							break;

							//实有单位
						case 4:
							if(employerLayer) {
								if(employerLayer.isVisible()) {
									employerLayer.hide();
									$scope.isShowEmployer = false;
								} else {
									employerLayer.show();
									$scope.isShowEmployer = true;
									//addOverlayer();
								}
							} else {
								employerLayer = mapOpera.cluster.createOverlayLayer('employer', {
									icon: {
										url: 'employer.png',
										width: 32,
										height: 32
									},
									clusterIcon: {
										url: 'map-cluster-green-4.png',
										width: 44,
										height: 44
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/employer.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.companyName,
											labelYOffset: 28,
											labelBackgroundColor: '#26bba5',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#26bba5"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/employer.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										;
										removeWindow();
										var picUrl = utils.getUrl(e.companyPic);
										var position = e.location.lon + ',' + e.location.lat;
										var name = e.companyName;
										var address = e.companyAdress;
										var companyid = e.companyid;
										var villageCode = e.villageCode;
										var obj = {
											position: position,
											name: name,
											address: address,
											pic: picUrl,
											companyid: companyid,
											villageCode: villageCode
										};
										openWindow(obj);
										addEvents1();
									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								employerLayer.show();
								$scope.isShowEmployer = true;
								addOverlayer('employer');
							}
							employerLayer.setZIndex(600);
							break;
						//ck
						case 50:
							if(ckLayer) {
								if(!isChecked) {
									ckLayer.hide();
									$scope.isShowCk = false;
								} else {
									ckLayer.show();
									$scope.isShowCk = true;
								}
							} else {
								ckLayer = mapOpera.cluster.createOverlayLayer('ck', {
									icon: {
										url: 'ck.png',
										width: 32,
										height: 32
									},
									clusterIcon: {
										url: 'map-cluster-back-4.png',
										width: 44,
										height: 44
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/ck.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.userName,
											labelYOffset: 28,
											labelBackgroundColor: '#6701df',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#6701df"
										};
										if (e.alarmType === "警报") {
											style.externalGraphic = 'template/img/newmap/ck_hover.png';
										}
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/ck.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										if (e.alarmType === "警报") {
											style.externalGraphic = 'template/img/newmap/ck_hover.png';
										}
										e.changeStyle(style, true);
									},
									click: function(e) {
										removeWindow();
										var position = e.location.lon + ',' + e.location.lat;
										var obj = {
											userAddress: e.userAddress,
											userName: e.userName,
											alarmTime: e.alarmTime,
											alarmDesc:e.alarmDesc,
											chargePersonName:e.chargePersonName,
											chargePersonTelphone:e.chargePersonTelphone,
											position:position
										};
										openWindow(obj);
										addEvents1();
									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								ckLayer.show();
								$scope.isShowCk = true;
								ckLayer.setZIndex(600);
								addOverlayer('ck');
							}
							break;
						//卡口
						case 52:
							if(BayonetLayer) {
								if(!isChecked) {
									BayonetLayer.hide();
									$scope.isShowBayonet = false;
								} else {
									BayonetLayer.show();
									$scope.isShowBayonet = true;
									//addOverlayer();
								}
							} else {
								BayonetLayer = mapOpera.cluster.createOverlayLayer('bayonet', {
									icon: {
										url: 'bayonet.png',
										width: 32,
										height: 32
									},
									clusterIcon: {
										url: 'map-cluster-blue-4.png',
										width: 44,
										height: 44
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/bayonet.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.name,
											labelYOffset: 28,
											labelBackgroundColor: '#00ad6a',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#00ad6a"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/bayonet.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										removeWindow();
										var position = e.location.lon + ',' + e.location.lat;
										var picUrl = utils.getUrl(e.picUrl);
										var obj = {
											name: '卡口:' + e.name,
											address: "地址:" + e.place|| '',
											pic: picUrl,
											position: position
										};
										openWindow(obj);
										addEvents1();
									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								BayonetLayer.show();
								$scope.isShowBayonet = true;
								addOverlayer('bayonet');
							}
							BayonetLayer.setZIndex(600);
							break;
							//车棚
						case 49:
							if(shedLayer) {
								if(!isChecked) {
									shedLayer.hide();
									$scope.isShowShed = false;
								} else {
									shedLayer.show();
									$scope.isShowShed = true;
									//addOverlayer();
								}
							} else {
								shedLayer = mapOpera.cluster.createOverlayLayer('shed', {
									icon: {
										url: 'shed.png',
										width: 32,
										height: 32
									},
									clusterIcon: {
										url: 'map-cluster-blue-4.png',
										width: 44,
										height: 44
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/shed.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.name,
											labelYOffset: 28,
											labelBackgroundColor: '#00ad6a',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#00ad6a"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/shed.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										//无照片，return
										return;
										// removeWindow();
										// var position = e.location.lon + ',' + e.location.lat;
										// var picUrl = utils.getUrl(e.picUrl);
										// var obj = {
										// 	name: '车棚:' + e.name,
										// 	address: "地址:" + e.place|| '',
										// 	pic: picUrl,
										// 	position: position
										// };
										// openWindow(obj);
										// addEvents1();
									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								shedLayer.show();
								$scope.isShowShed = true;
								addOverlayer('shed');
							}
							shedLayer.setZIndex(600);
							break;
							//wifi
						case 53:
							if(wifiLayer) {
								if(!isChecked) {
									wifiLayer.hide();
									$scope.isShowWifi = false;
								} else {
									wifiLayer.show();
									$scope.isShowWifi = true;
									//addOverlayer();
								}
							} else {
								wifiLayer = mapOpera.cluster.createOverlayLayer('wifi', {
									icon: {
										url: 'wifi.png',
										width: 32,
										height: 32
									},
									clusterIcon: {
										url: 'map-cluster-back-4.png',
										width: 44,
										height: 44
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/wifi.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.name,
											labelYOffset: 28,
											labelBackgroundColor: '#6701df',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#6701df"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/wifi.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										removeWindow();
										var position = e.location.lon + ',' + e.location.lat;
										var picUrl = utils.getUrl(e.picUrl);
										var obj = {
											name: e.name,
											address: e.detailAddress,
											pic:picUrl,
											position: position
										};
										openWindow(obj);
										addEvents1();
									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								wifiLayer.show();
								$scope.isShowWifi = true;
								addOverlayer('wifi');
							}
							wifiLayer.setZIndex(600);
							break;
						case 54:
							if(doorLayer) {
								if(!isChecked) {
									doorLayer.hide();
									$scope.isShowDoor = false;
								} else {
									doorLayer.show();
									$scope.isShowDoor = true;
									//addOverlayer();
								}
							} else {
								doorLayer = mapOpera.cluster.createOverlayLayer('door', {
									icon: {
										url: 'door.png',
										width: 32,
										height: 32
									},
									clusterIcon: {
										url: 'map-cluster-blue-4.png',
										width: 44,
										height: 44
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/door.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.deviceName,
											labelYOffset: 28,
											labelBackgroundColor: '#04a627',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#04a627"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/door.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										removeWindow();
										var picUrl = utils.getUrl(e.picUrl);
										var position = e.location.lon + ',' + e.location.lat;
										var name = e.deviceName;
										var address = "mac:" + e.mac;
										var obj = {
											position: position,
											name: name,
											address: address,
											pic: picUrl
										};
										openWindow(obj);
										addEvents1();
									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								doorLayer.show();
								$scope.isShowDoor = true;
								addOverlayer('door');
							}
							doorLayer.setZIndex(600);
							break;

							//摄像头
						case 511:
							if(cameraLayer) {
								if(!isChecked) {
									cameraLayer.hide();
									$scope.isShowCamera = false;
								} else {
									cameraLayer.show();
									$scope.isShowCamera = true;
									addOverlayer();
								}
							} else {
								cameraLayer = mapOpera.cluster.createOverlayLayer('camera', {
									icon: {
										url: 'camera.png',
										width: 32,
										height: 32
									},
									clusterIcon: {
										url: 'map-cluster-blue-4.png',
										width: 44,
										height: 44
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/camera.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.name,
											labelYOffset: 28,
											labelBackgroundColor: '#00a9e9',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#00a9e9"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/camera.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										var obj={
											cameraIp:e.cameraIp,
											cameraPort:e.cameraPort,
											login:e.login,
											password:e.password,
											name:e.name,
											pvgChannelID:e.pvgChannelID
										}
											localStorage.setItem("ocxVideoSrc",JSON.stringify(obj));
											var cameraLayer = layer.open({
												type: 2,
												title: "视频播放",
												skin: 'dark-layer',
												area: ['8.6rem', '6.5rem'],
												shade: 0.8,
												closeBtn: 1,
												shadeClose: true,
												content: ['../../../lib/video/ocx_video.html', 'no'],
												end: function(index, layero) {
													cameraLayer = null;
													localStorage.removeItem(ocxVideoSrc);
												},
												success: function(layero) {
													$(layero).find("iframe").contents().find("html").css('font-size', $("html").css('font-size'))
												}
											});
									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								cameraLayer.show();
								$scope.isShowCamera = true;
								addOverlayer('camera');
							}
							cameraLayer.setZIndex(600);
							break;
						case 512:
							if(cameraLayer2) {
								if(!isChecked) {
									cameraLayer2.hide();
									$scope.isShowCamera2 = false;
								} else {
									cameraLayer2.show();
									$scope.isShowCamera2 = true;
									addOverlayer();
								}
							} else {
								cameraLayer2 = mapOpera.cluster.createOverlayLayer('camera2', {
									icon: {
										url: 'camera2.png',
										width: 32,
										height: 32
									},
									clusterIcon: {
										url: 'map-cluster-blue-4.png',
										width: 44,
										height: 44
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/camera2.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.name,
											labelYOffset: 28,
											labelBackgroundColor: '#00a9e9',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#00a9e9"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/camera2.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										var obj={
											cameraIp:e.cameraIp,
											cameraPort:e.cameraPort,
											login:e.login,
											password:e.password,
											name:e.name,
											pvgChannelID:e.pvgChannelID
										}
											localStorage.setItem("ocxVideoSrc",JSON.stringify(obj));
											var cameraLayer = layer.open({
												type: 2,
												title: "视频播放",
												skin: 'dark-layer',
												area: ['8.6rem', '6.5rem'],
												shade: 0.8,
												closeBtn: 1,
												shadeClose: true,
												content: ['../../../lib/video/ocx_video.html', 'no'],
												end: function(index, layero) {
													cameraLayer = null;
													localStorage.removeItem(ocxVideoSrc);
												},
												success: function(layero) {
													$(layero).find("iframe").contents().find("html").css('font-size', $("html").css('font-size'))
												}
											});

									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								cameraLayer2.show();
								$scope.isShowCamera2 = true;
								addOverlayer('camera2');
							}
							cameraLayer2.setZIndex(600);
							break;
							//烟感
						case 551:
							if(smokeLayer) {
								if(!isChecked) {
									smokeLayer.hide();
									$scope.isShowSmoke = false;
								} else {
									smokeLayer.show();
									$scope.isShowSmoke = true;
									//addOverlayer();
								}
							} else {
								smokeLayer = mapOpera.cluster.createOverlayLayer('smoke', {
									icon: {
										url: 'smoke.png',
										width: 32,
										height: 32
									},
									clusterIcon: {
										url: 'map-cluster-blue-4.png',
										width: 44,
										height: 44
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/smoke.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.name,
											labelYOffset: 28,
											labelBackgroundColor: '#4fbfd3',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#4fbfd3"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/smoke.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										;
										removeWindow();
										var picUrl = utils.getUrl(e.picUrl);
										var position = e.location.lon + ',' + e.location.lat;
										var name = e.name;
										var address = e.detailAddress;
										var obj = {
											position: position,
											name: name,
											address: address,
											pic: picUrl
										};
										openWindow(obj);
										addEvents1();
									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								smokeLayer.show();
								$scope.isShowSmoke = true;
								addOverlayer('smoke');
							}
							smokeLayer.setZIndex(600);
							break;

							//电弧
						case 552:
							if(arcLayer) {
								if(!isChecked) {
									arcLayer.hide();
									$scope.isShowArc = false;
								} else {
									arcLayer.show();
									$scope.isShowArc = true;
									//addOverlayer();
								}
							} else {
								arcLayer = mapOpera.cluster.createOverlayLayer('arc', {
									icon: {
										url: 'arc.png',
										width: 32,
										height: 32
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/arc.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.name,
											labelYOffset: 28,
											labelBackgroundColor: '#ffa400',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#ffa400"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/arc.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										;
										removeWindow();
										var picUrl = utils.getUrl(e.picUrl);
										var position = e.location.lon + ',' + e.location.lat;
										var name = e.name;
										var address = e.detailAddress;
										var obj = {
											position: position,
											name: name,
											address: address,
											pic: picUrl
										};
										openWindow(obj);
										addEvents1();
									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								arcLayer.show();
								$scope.isShowArc = true;
								addOverlayer('arc');
							};
							arcLayer.setZIndex(600);
							break;

							//消防拴
						case 553:
							if(fireplugLayer) {
								if(!isChecked) {
									fireplugLayer.hide();
									$scope.isShowFireplug = false;
								} else {
									fireplugLayer.show();
									$scope.isShowFireplug = true;
									//addOverlayer();
								}
							} else {
								fireplugLayer = mapOpera.cluster.createOverlayLayer('fireplug', {
									icon: {
										url: 'fireplug.png',
										width: 32,
										height: 32
									},
									clusterIcon: {
										url: 'map-cluster-red-4.png',
										width: 44,
										height: 44
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/fireplug.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.name,
											labelYOffset: 28,
											labelBackgroundColor: '#ee2d28',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#ee2d28"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/fireplug.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										;
										removeWindow();
										var picUrl = utils.getUrl(e.picUrl);
										var position = e.location.lon + ',' + e.location.lat;
										var name = e.name;
										var address = e.detailAddress;
										var obj = {
											position: position,
											name: name,
											address: address,
											pic: picUrl
										};
										openWindow(obj);
										addEvents1();
									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								fireplugLayer.show();
								$scope.isShowFireplug = true;
								addOverlayer('fireplug');
							};
							fireplugLayer.setZIndex(600);
							break;
							//微型消防站
						case 554:
							if(firehouseLayer) {
								if(!isChecked) {
									firehouseLayer.hide();
									$scope.isShowFirehouse = false;
								} else {
									firehouseLayer.show();
									$scope.isShowFirehouse = true;
									//addOverlayer();
								}
							} else {
								firehouseLayer = mapOpera.cluster.createOverlayLayer('firehouse', {
									icon: {
										url: 'firehouse.png',
										width: 32,
										height: 32
									},
									clusterIcon: {
										url: 'map-cluster-yellow-4.png',
										width: 44,
										height: 44
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/firehouse.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.name,
											labelYOffset: 28,
											labelBackgroundColor: '#0fbeff',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#0fbeff"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/firehouse.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										;
										removeWindow();
										var picUrl = utils.getUrl(e.picUrl);
										var position = e.location.lon + ',' + e.location.lat;
										var obj = {
											pic: picUrl,
											name: e.name,
											address: e.detailAddress,
											position: position
										};
										openWindow(obj);
										addEvents1();
									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								firehouseLayer.show();
								$scope.isShowFirehouse = true;
								addOverlayer('firehouse');
							};
							firehouseLayer.setZIndex(400);
							break;

							//窨井盖
						case 7:
							if(sewerLayer) {
								if(sewerLayer.isVisible()) {
									sewerLayer.hide();
									$scope.isShowSewer = false;
								} else {
									sewerLayer.show();
									$scope.isShowSewer = true;
									//addOverlayer();
								}
							} else {
								sewerLayer = mapOpera.cluster.createOverlayLayer('sewer', {
									icon: {
										url: 'yjg.png',
										width: 32,
										height: 32
									},
									clusterIcon: {
										url: 'map-cluster-yellow-4.png',
										width: 44,
										height: 44
									},
									mouseover: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/yjg.png',
											graphicHeight: 36,
											graphicWidth: 36,
											label: e.name,
											labelYOffset: 28,
											labelBackgroundColor: '#0fbeff',
											labelBackGroundRXY: 2,
											labelBackGroundMargin: 10,
											showArrow: true,
											labelBackGroundStroke: "#0fbeff"
										};
										e.changeStyle(style, true);
									},
									mouseout: function(e) {
										var style = {
											fontSize: 12,
											externalGraphic: 'template/img/newmap/yjg.png',
											graphicHeight: 32,
											graphicWidth: 32,
											label: '',
										};
										e.changeStyle(style, true);
									},
									click: function(e) {
										removeWindow();
										var picUrl=utils.getUrl(e.picUrl);
										var position = e.location.lon + ',' + e.location.lat;
										var obj = {
											pic: picUrl,
											name: e.equipmentType,
											address: e.equipmentAddress,
											position: position
										};
										openWindow(obj);
										addEvents1();
									},
									fontColor: '#fff',
									isAsynchronous: false,
									labelYOffset: 28,
									//设置文案背景的圆角矩形的弧度，默认为0
									labelBackGroundRXY: 3,
									//设置文案的左右边距，默认为0
									labelBackGroundMargin: 5,
								})
								sewerLayer.show();
								$scope.isShowSewer = true;
								addOverlayer('sewer');
							};
							sewerLayer.setZIndex(600);
							break;
						case 11:
							if (isChecked == 0) {
								clearInterval(faceInterval);
							}else if(isChecked == 2){
								faceInterval = setInterval(function() {
										queryFaceInit()
								},2000)
							}
							break;
						case 12:
							if (isChecked == 0) {
								websocket.close();;
							}else if(isChecked == 2){
								openCarPop();
							}
							break;
					}
				}

				//在图层上添加覆盖物
				var addOverlayer = function(layerName) {
					
					//mac
					switch(layerName) {
                        case 'mac':
							if($scope.isShowMac) {
								
								$scope.queryMapInfoData = function(id) {
									
									var req = {
										villageCode: ''
									};
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {

											var list = data.data;
											$.each(list,function(i,v){
												v.cardNumAndlonlat = v.credentialNo+v.lat+v.lon+""
											})
											if(!!$scope.faceRealPower && $scope.faceRealPower.length > 0){
												list = list.concat($scope.faceRealPower);
												list.sort(function(a,b){
													return Number(moment(a.collectTime).format('X')) - Number(moment(a.collectTime).format('X'))
												})
											}

											//去重start
											list = _.uniq(list,false,function(a){
					                            return a.cardNumAndlonlat;
					                        });
					                        $.each(list,function(i,v){
					                            // if(v.name == "诸林珍"){
					                            //     console.log(v);
					                            // }
					                            // if(v.certificatesName == "董明伦"){
					                            // 	console.log(v);
					                            // }
					                            if(v.certificatesName == "范福贞"){
					                        		console.log(v);
					                        	}
					                        })
					                        //去重end
											var personArray = [];
											for(var i = 0; i < list.length; i++) {
												var lon = list[i].lon;
												var lat = list[i].lat;
												list[i].person = [];
												for(var z = 0; z < list.length; z++) {
													var lon1 = list[z].lon;
													var lat1 = list[z].lat;
													if(lon === lon1 && lat == lat1) {
														var obj = {
															BQ: list[z].label,
															XM: list[z].certificatesName,
															ZJHM: list[z].credentialNo,
															address: list[z].residentialAddress,
															baseMac: list[z].deviceId,
															villageCode:list[z].villageCode
														};
														list[i].person.push(obj);
													}
												}
											}
											macPoint = list;
											if(macPoint && (macPoint.length >= 0)) {
												mapOpera.cluster.addClusterMarkers('mac', macPoint);
											}
										} else {
											notify.warn('无法获取楼栋信息');
										}
									});
								}
								$scope.queryMapInfoData('mac');
							}
							break;
						case 'building':
							if($scope.isShowbuilding) {
								
								//查询进出口
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: ''
									};
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											buildingPoint = data.data;
											if(buildingPoint && (buildingPoint.length >= 0)) {
												mapOpera.cluster.addClusterMarkers('building', buildingPoint);
											}
										} else {
											notify.warn('无法获取楼栋信息');
										}
									});
								}
								$scope.queryMapInfoData('building');
							}
							break;
                        	//查询实有警情
                        case 'alerts':
							if($scope.isShowAlerts) {
								$scope.queryMapInfoData = function(id) {
									var req = {
							              villageCode:'',
							              pageSize:30,
							              pageNumber: 1,
							              inboundTimeStart:moment().format("YYYY-MM-DD 00:00:00"),
							              inboundTimeEnd: moment().format("YYYY-MM-DD HH:mm:ss"),
							              caseId: '',
							              calleeNo: '',
							              callerName:'',
							              caseAddress: '',
							              caseDesc: '',
							              eventDealState:''
							            };
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											alertsPoint = data.data.list;
											if(alertsPoint && (alertsPoint.length >= 0)) {
												  angular.forEach(alertsPoint,function(data){
                                                        data.lon=data.coordinateX;
                                                        data.lat=data.coordinateY;
												  });
												mapOpera.cluster.addClusterMarkers('alerts', alertsPoint);
											}
										} else {
											notify.warn('无法获取楼栋信息');
										}
									});
								}
								$scope.queryMapInfoData('alerts');
							}
							break;
						case 'doorway':
							//显示doorway
							if($scope.isShowdoorway) {
								
								//查询进出口
								$scope.queryMapInfoData = function(id) {
									var req={
										villageCode:''
									}
									communityAllService.queryMapInfo(id,req).then(function(data) {
										if(data.resultCode == '200') {
											doorwayPoint = data.data;
											if(doorwayPoint && (doorwayPoint.length >= 0)) {
												mapOpera.cluster.addClusterMarkers('doorway', doorwayPoint);
											}
										} else {
											notify.warn('无法获取出入口地图信息');
										}
									});
								}
								$scope.queryMapInfoData('doorway');
							}
							break;

						case 'employer':
							//显示实有单位
							if($scope.isShowEmployer) {
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: '',
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											;
											employerPoint = data.data.list;
											if(employerPoint && (employerPoint.length >= 0)) {
												mapOpera.cluster.addClusterMarkers('employer', employerPoint);
											}
										} else {
											notify.warn('无法获取出入口地图信息');
										}
									});
								}
								$scope.queryMapInfoData('employer');
							}
							break;
						case 'bayonet':
							//显示卡口
							if($scope.isShowBayonet) {
								$scope.queryMapInfoData = function(id) {
									var req = {
										tollgateType:'1',
										villageCode: '',
										tollgateID: '',
										name: '',
										place: '',
										status: '',
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											;
											BayonetPoint = data.data.list;
											if(BayonetPoint && (BayonetPoint.length >= 0)) {
												mapOpera.cluster.addClusterMarkers('bayonet', BayonetPoint);
											}
										} else {
											notify.warn('无法获取出入口地图信息');
										}
									});
								}
								$scope.queryMapInfoData('bayonet');
							}
							break;
						case 'shed':
							//显示车棚
							if($scope.isShowShed) {
								$scope.queryMapInfoData = function(id) {
									var req = {
										tollgateType:'3',
										villageCode: '',
										tollgateID: '',
										name: '',
										place: '',
										status: '',
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											shedPoint = data.data.list;
											if(shedPoint && (shedPoint.length >= 0)) {
												mapOpera.cluster.addClusterMarkers('shed', shedPoint);
											}
										} else {
											notify.warn('无法获取出入口地图信息');
										}
									});
								}
								$scope.queryMapInfoData('shed');
							}
							break;
						case 'wifi':
							//显示wifi
							if($scope.isShowWifi) {
								
								//查询进出口
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: '',
										deviceId: '',
										detailAddress: '',
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											;
											wifiPoint = data.data.list;
											if(wifiPoint && (wifiPoint.length >= 0)) {
												mapOpera.cluster.addClusterMarkers('wifi', wifiPoint);
											}
										} else {
											notify.warn('无法获取出入口地图信息');
										}
									});
								}
								$scope.queryMapInfoData('wifi');
							}
							break;
         				case 'ck':
							//显示ck
							if($scope.isShowCk) {
								//查询进出口
								$scope.queryMapInfoData = function(id) {
									var req = {};
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											ckPoint = data.data.list;
											if(ckPoint && (ckPoint.length >= 0)) {
												mapOpera.cluster.addClusterMarkers('ck', ckPoint);
											}
										} else {
											notify.warn('无法获取出入口地图信息');
										}
									});
								}
								$scope.queryMapInfoData('ck');
							}
							break;

						case 'camera':
							//显示摄像头
							if($scope.isShowCamera) {
								
								//查询进出口
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: '',
										cameraName:'',
										cameraType: "1,2",
										pageNumber: 1,
										pageSize: 9999,
									}
									debugger;
									communityAllService.queryMapInfo(id, req).then(function(data) {
										debugger;
										if(data.resultCode == '200') {
											;
											cameraPoint = data.data.list;
											if(cameraPoint && (cameraPoint.length >= 0)) {
												mapOpera.cluster.addClusterMarkers('camera', cameraPoint);
											}
										} else {
											notify.warn('无法获取出入口地图信息');
										}
									});
								}
								$scope.queryMapInfoData('camera');
							}
							break;
							case 'camera2':
							//道路摄像头
							if($scope.isShowCamera2) {
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: '',
										cameraType: 4,
										pageNumber: 1,
										pageSize: 9999,
										cameraName:''
									}
									debugger;
									communityAllService.queryMapInfo(id, req).then(function(data) {
										debugger;
										if(data.resultCode == '200') {
											cameraPoint2 = data.data.list;
											if(cameraPoint2 && (cameraPoint2.length >= 0)) {
												mapOpera.cluster.addClusterMarkers('camera2', cameraPoint2);
											}
										} else {
											notify.warn('无法获取出入口地图信息');
										}
									});
								}
								$scope.queryMapInfoData('camera');
							}
							break;
						case 'door':
							//显示门禁
							if($scope.isShowDoor) {
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: '',
										deviceId: '',
										deviceType: '',
										mac: '',
										buildingNo: '',
										houseNo: '',
										state: '',
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											doorPoint = data.data.list;
											if(doorPoint && (doorPoint.length >= 0)) {
												mapOpera.cluster.addClusterMarkers('door', doorPoint);
											}
										} else {
											notify.warn('无法获取出入口地图信息');
										}
									});
								}
								$scope.queryMapInfoData('door');
							}
							break;
						case 'smoke':
							//显示烟感
							if($scope.isShowSmoke) {
								
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: '',
										buildingNo: '',
										deviceNo: '',
										detailAddress: '',
										type: 1,
										floorNo: '',
										houseNo: '',
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											;
											smokePoint = data.data.list;
											if(smokePoint && (smokePoint.length >= 0)) {
												//												var newSmokePoint = filter(smokePoint);
												mapOpera.cluster.addClusterMarkers('smoke', smokePoint);
											}
										} else {
											notify.warn('无法获取出入口地图信息');
										}
									});
								}
								$scope.queryMapInfoData('smoke');
							}
							break;

						case 'arc':
							//电弧
							if($scope.isShowArc) {
								
								//
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: '',
										buildingNo: '',
										deviceNo: '',
										detailAddress: '',
										type: 4,
										floorNo: '',
										houseNo: '',
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											;
											arcPoint = data.data.list;
											if(arcPoint && (arcPoint.length > 0)) {
												mapOpera.cluster.addClusterMarkers('arc', arcPoint);
											} else {
												notify.warn('暂无电弧设备信息');
											}
										} else {
											notify.warn('无法获取电弧信息');
										}
									});
								}
								$scope.queryMapInfoData('arc');
							}
							break;

						case 'fireplug':
							//显示消防拴
							if($scope.isShowFireplug) {
								
								//
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: '',
										buildingNo: '',
										deviceNo: '',
										detailAddress: '',
										type: '3,5',
										floorNo: '',
										houseNo: '',
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											;
											fireplugPoint = data.data.list;
											if(fireplugPoint && (fireplugPoint.length >= 0)) {
												mapOpera.cluster.addClusterMarkers('fireplug', fireplugPoint);
											}
										} else {
											notify.warn('无法获取出入口地图信息');
										}
									});
								}
								$scope.queryMapInfoData('fireplug');
							}
							break;

						case 'firehouse':
							//显示微型消防站
							if($scope.isShowFirehouse) {
								
								//
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: '',
										stationId: '',
										name: '',
										acdeviceId: '',
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											;
											firehousePoint = data.data.list;
											if(firehousePoint && (firehousePoint.length >= 0)) {
												mapOpera.cluster.addClusterMarkers('firehouse', firehousePoint);
											}
										} else {
											notify.warn('无法获取出入口地图信息');
										}
									});
								}
								$scope.queryMapInfoData('firehouse');
							}
							break;

						case 'sewer':
							//显示窨井盖
							if($scope.isShowSewer) {
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode:'',
										pageNumber: 1,
										pageSize: 999,
										startTime: '',
										endTime: ''
									};
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											sewerPoint = data.data.list;
											if(sewerPoint && (sewerPoint.length >= 0)) {
												
												mapOpera.cluster.addClusterMarkers('sewer', sewerPoint);
											}
										} else {
											notify.warn('无法获取出入口地图信息');
										}
									});
								}
								$scope.queryMapInfoData('sewer');
							}
							break;
					}
				};

				//画小区轮廓
				$scope.drawbiankuang = function(villageCode) {
					//地图控件
					var psArr = [];
					angular.forEach(basicConfig.villageAllInfo, function(data) {
						var mapGeometry = new MapPlatForm.Base.MapGeometry(map);
						var ps = mapGeometry.getGeometryByGeoJson(data.map2d.geometry, map);
						if(villageCode == data.villageCode) {
							ps.setStyle({
								color: '#ffc700', //颜色
								fillColor: '#ffc700', //填充颜色
								weight: 2, //宽度，以像素为单位
								opacity: 0.01, //透明度，取值范围0 - 1
								fillOpacity: 0.01 //填充的透明度，取值范围0 - 1,
							});
						} else {
							ps.setStyle({
								color: '#00b99e', // '#ffc700', //颜色
								fillColor: '#00b99e', // '#ffc700', //填充颜色
								weight: 2, //宽度，以像素为单位
								opacity: 0.01, //透明度，取值范围0 - 1
								fillOpacity: 0.01 //填充的透明度，取值范围0 - 1,
							});
						}
						ps.villageCode = data.villageCode;
						ps.setZIndex(120);
						map.addOverlay(ps);
						psArr.push(ps);
						
						(function(data, ps) {
							ps.addEventListener(NPMapLib.MARKER_EVENT_CLICK, function(point) {
								angular.forEach(psArr, function(data) {
									data.setStyle({
										color: '#f00', // '#ffc700', //颜色
										fillColor: '', // '#ffc700', //填充颜色
										weight: 2, //宽度，以像素为单位
										opacity: 0, //透明度，取值范围0 - 1
										fillOpacity: 0.01 //填充的透明度，取值范围0 - 1,
										//lineStyle: NPMapLib.LINE_TYPE_DASH //样式
									});
								})
								point.setStyle({
									color: '#ff0', //颜色
									fillColor: '#ffc700', //填充颜色
									weight: 2, //宽度，以像素为单位
									opacity: 0, //透明度，取值范围0 - 1
									fillOpacity: 0.01 //填充的透明度，取值范围0 - 1,
									//lineStyle: NPMapLib.LINE_TYPE_DASH //样式
								});
								removeWindow();
							});
						})(data, ps);
						
					});
		
					return psArr;
				}

				//点击默一栋楼
				//
				function clickBuilding(buildingNo,villageCode) {
					var buildparam = {
						name: buildingNo
					};
					localStorage.setItem("build_" +villageCode, JSON.stringify(buildparam));
					// var url = window.location.href.split("#")[0] + "/#/index/clickBuilding/" + villageCode;
					var url = '../../../template/html/modules/buildingHouse/building.html?villageCode='+villageCode;
					var residentLayer = layer.open({
						type: 2,
						title: "楼栋",
						skin: 'dark-layer',
						shade: 0.7,
						shadeClose: true,
						area: ['7rem', '7.8rem'],
						anim: 2,
						scrollbar: false,
						content: [url, 'no'], //iframe的url，no代表不显示滚动条
						end: function() { //此处用于演示
						},
						success: function(layero, index) {
							$(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'))
						}
					});
				}
				window.clickResident = function() {
					;
					// var url = window.location.href.split("#")[0] + "/#/index/clickResident/"+$scope.villageCode;
					var url = '../../../template/html/modules/buildingHouse/house.html?villageCode='+$scope.villageCode;
					var residentLayer = layer.open({
						type: 2,
						title: "住户",
						skin: 'dark-layer',
						shade: 0.7,
						shadeClose: true,
						area: ['8.8rem', '7.5rem'],
						anim: 2,
						scrollbar: false,
						content: [url, 'no'], //iframe的url，no代表不显示滚动条
						end: function() { //此处用于演示
						},
						success: function(layero, index) {
							$(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'))
						}
					});
				}
            }
		];
		return twoDMapCtrl;
	});