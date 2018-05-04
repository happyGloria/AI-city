/**
 * 一标六实小区统计页面
 * Created by xx on 2017/11/28.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'notify', 'echarts-dark', 'controllers/community/communityRightModuleCtrl', 'config/common', 'npgis2','yituFace'],
	function(app, controllers, $, configFile, notify, dark, communityRightModuleCtrl, utils,npgis2,yituFace){
		var communityAllCtrl = ['$scope', '$state', '$stateParams', 'communityAllService', 'mapService', '$compile', 'communityRightModuleService', 'moreService', '$interval',
			function($scope, $state, $stateParams, communityAllService, mapService, $compile, rightService, moreService, $interval) {

				$(".layout").find("div").eq(0).css({
					"padding-top": "0px"
				});
				$scope.communityName='田林十二村';
				$scope.villageCode = $stateParams.id || '310104006001';
				angular.forEach(configFile.communityAllInfo,function(data){
                     if(data.villageCode==$scope.villageCode){
                          $scope.communityName=data.name;
                     }
				});
				$scope.startTime=utils.changeDayToString(utils.addDays(new Date(),-1));
				$scope.leaveCount = 0;
				$scope.findCount = 0;
				$scope.factCount = 0;
				$scope.CaseCount = 0;
				var gpsPoint, powerPoint;
				var cameraList;
				var lastedID;

				//当地图初始化完成时调用
				window.mapSuccess = function(map) {
					var ctr = new NPMapLib.Controls.MousePositionControl();
					//var ctrl = new NPMapLib.Controls.NavigationControl();
					map.addControl(ctr);
					//map.addControl(ctrl);
					setTimeout(function() {
					}, 1000);
				};

				//查询感知离开
				$scope.queryPeople = function() {
					communityAllService.queryPeopleCount().then(function(data) {
						if(data.resultCode == '200') {

						} else {
							//notify.warn('无法获取警情图表数据');
						}
					});
				}

				$scope.queryCompany = function() {
					communityAllService.queryCompanyCount().then(function(data) {
						if(data.resultCode == '200') {
							$scope.companyCount = data.data;
						} else {
							$scope.companyCount = 0;
							//notify.warn('无法获取警情图表数据');
						}
					});
				}

				$scope.queryDevice = function() {
					communityAllService.queryDeviceCount().then(function(data) {
						if(data.resultCode == '200') {
							
							$scope.deviceCount = data.data[10].num;
						} else {
							//notify.warn('无法获取警情图表数据');
						}
					});
				}

				$scope.queryPower = function() {
					communityAllService.queryPowerCount().then(function(data) {
						if(data.resultCode == '200') {
							
							$scope.powerCount = data.data[7].num;
							//$scope.powerCount = 7;
						} else {
							//notify.warn('无法获取警情图表数据');
						}
					});
				}

				$scope.queryCase = function() {
					communityAllService.queryCaseCount().then(function(data) {
						if(data.resultCode == '200') {
							
							$scope.caseCount = data.data.policeInfoToday;
						} else {
							//notify.warn('无法获取警情图表数据');
						}
					});
				}

				$scope.queryPowerDay = function() {
					communityAllService.queryPowerDay().then(function(data) {
						if(data.resultCode == '200') {
							
							//$scope.powerCount = data.data[6].num;
							var list = data.data;
							var newArray = list;
							var personArray = [];
							for(var i = 0; i < list.length; i++) {
								var lon = list[i].lon;
								var lat = list[i].lat;
								list[i].person = [];
								for(var z = 0; z < newArray.length; z++) {
	
									var lon1 = newArray[z].lon;
									var lat1 = newArray[z].lat;
									if(lon === lon1 && lat === lat1) {
									
										var obj = {
											BQ: newArray[z].BQ,
											XM: newArray[z].XM,
											ZJHM: newArray[z].ZJHM,
											address: newArray[z].address,
											baseMac: newArray[z].baseMac
										};
										list[i].person.push(obj);
										// if( z != 0){
										//   list.splice(z,1);
										// }
									}
								}
							}
							powerPoint = data.data;
							setPowerPoint();
						} else {
							//notify.warn('无法获取警情图表数据');
						}
					});
				}

				var time = utils.changeDayToString(new Date());
                var gpsPoint = [];
                //gps
				$scope.queryPoliceHour = function() {
					var req = {
						villageCode: '',
						pageNumber: 1,
						pageSize: 999,
						radioIds: '',
						startTime:utils.changeDayToString(utils.addSeconds(new Date(),-1))+" 00:00:00",
						endTime: utils._changeDayToObject(new Date())+":00"
					};
					communityAllService.findGpsByPage(req).then(function(data) {
						if(data.resultCode == '200') {
							debugger
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
					mapOpera.cluster.addClusterMarkers('gps', gpsPoint);
					gpsLayer.setZIndex(600);
					gpsPoint = {};
				}

				var powerLayer;
				var setPowerPoint = function() {
					powerLayer = mapOpera.cluster.createOverlayLayer('power', {
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
						clusteronmouseover: function(e, isCluster) {},
						click: function(e) {
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
						}
					});
					powerLayer.show();
					powerLayer.setZIndex(600);
					//$scope.isShowGps = true;
					mapOpera.cluster.addClusterMarkers('power', powerPoint);
					powerPoint = {};
				}

				var polygon, marker;
				$scope.isShowGps = true;
				$scope.isShowPower = true;
				$scope.isShowDevices = false;
				$scope.isShowWiFi = false;

				//楼栋
				$scope.isShowbuilding = true;
				var buildingPoint = []
				var buildingLayer = null;
        
				//出入口
				$scope.isShowDoorway = false;
				var doorwayPoint = [];
				var doorwayLayer = null;
                //gps
				$scope.isShowGps = false;
				var gpsPoint = [];
				var gpsLayer = null;
				//实有警情
				$scope.isShowAlerts = false;
				var alertsPoint = [];
				var alertsLayer = null;
				//出入口
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

				//ck
				$scope.isShowCk = false;
				var ckPoint = [];
				var ckLayer = null;

				//门禁
				$scope.isShowDoor = false;
				var doorPoint = [];
				var doorLayer = null;
				//道路小区摄像头
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

				var filter = function(arry) {
					var newArry = [];
					for(i = 0; i < arry.length; i++) {
						if(arry[i].lon != "" && arry[i].lat != "") {
							newArry.push(arry[i]);
						}
					}
					return newArry
				}

				var getUrl = function(url) {
					var newUrl = window.location.href.split("/#")[0] + 'PBD' + url;
					return newUrl
				}

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
										removeWindow();
										debugger
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
								$scope.isShowMac = true;
								macLayer.setZIndex(600);
								addOverlayer('mac');
								// addOverlayer('faceRealPower',$scope.faceRealPower);
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
								$scope.isShowAlerts = true;
								alertsLayer.setZIndex(600);
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
										removeWindow();
										clickBuilding(e.buildingNo,e.villageCode, e.villageCode);
										// var picUrl = getUrl(e.picUrl);
										// var position = e.location.lon +','+ e.location.lat;
										// openWindow(2,position,e.name,e.address,picUrl);
										// addEvents1();
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
								buildingLayer.setZIndex(600);
								addOverlayer('building');
							}
							break;

					    //小区出入口
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
								doorwayLayer.setZIndex(600);
								addOverlayer('doorway');
							}
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

							//wifi
						case 53:
							if(wifiLayer) {
								// if(wifiLayer.isVisible()) {
								// 	wifiLayer.hide();
								// 	$scope.isShowWifi = false;
								// } else {
								// 	wifiLayer.show();
								// 	$scope.isShowWifi = true;
								// 	//addOverlayer();isChecked
								// }
								if(!isChecked) {
									wifiLayer.hide();
									$scope.isShowWifi = false;
								} else {
									wifiLayer.show();
									$scope.isShowWifi = true;
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
								wifiLayer.setZIndex(600);
								addOverlayer('wifi');
							}
							break;
						//ck
						case 50:
							if(ckLayer) {
								if(!isChecked) {
									ckLayer.hide();
									$scope.isShowCk = false;
									window.isShowCk =  false;
								} else {
									ckLayer.show();
									$scope.isShowCk = true;
									window.isShowCk =  true;
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
								window.isShowCk =  true;
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
								BayonetLayer.setZIndex(600);
								addOverlayer('bayonet');
							}
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
										removeWindow();
										var position = e.location.lon + ',' + e.location.lat;
										var picUrl = utils.getUrl(e.picUrl);
										var obj = {
											name: '车棚:' + e.name,
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
								shedLayer.show();
								$scope.isShowShed = true;
								addOverlayer('shed');
							}
							shedLayer.setZIndex(600);
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
									//addOverlayer();
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
//										rightService.queryVideoById(e.cameraId).then(function(resp) {
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
//										})

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
								cameraLayer.setZIndex(600);
								addOverlayer('camera');
							}
							break;
							case 512:
							if(cameraLayer2) {
								if(!isChecked) {
									cameraLayer2.hide();
									$scope.isShowCamera2 = false;
								} else {
									cameraLayer2.show();
									$scope.isShowCamera2 = true;
									//addOverlayer();
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
//										rightService.queryVideoById(e.cameraId).then(function(resp) {
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
//										})

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
								cameraLayer2.setZIndex(600);
								addOverlayer('camera2');
							}
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
										var picUrl = ""; //utils.getUrl(e.picUrl);
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
								doorLayer.setZIndex(600);
								addOverlayer('door');
							}
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
								smokeLayer.setZIndex(600);
								addOverlayer('smoke');
							}
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
								arcLayer.setZIndex(600);
								addOverlayer('arc');
							};
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
								fireplugLayer.setZIndex(600);
								addOverlayer('fireplug');
							};
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
								firehouseLayer.setZIndex(400);
								addOverlayer('firehouse');
							};
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
										url: 'map-cluster-green-4.png',
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
										var picUrl = utils.getUrl(e.picUrl);
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
								sewerLayer.setZIndex(600);
								addOverlayer('sewer');
							};
							break;

					}
				}

				//信息窗口
				var infoWindow = null;
				var faceInfoWindow = null;
				//				var carInfoWindow = null;
				var doorInfoWindow = null;
				var gpsInfoWindow = null;
				var powerInfoWindow = null;
				var alarmInfoWindow = null;

				var openAlarmWindow = function(obj) {
					if(obj.type == '1') {
						var str = '<div class="map-coalLayer layui-anim-fadein" id="alarm">';
						str += '<span>' + obj.address + '' + obj.msg + '</span>';
						//str += '<span class="time">'+ obj.time +'</span>';
						str += '</div>';
					} else if(obj.type == '3') {
						var str = '<div class="map-waterLayer layui-anim-fadein" id="alarm">';
						str += '<span>' + obj.address + '' + obj.msg + '</span>';
						str += '<span class="time">' + obj.time + '</span>';
						str += '</div>';
					} else {
						var str = '<div class="map-electricityLayer layui-anim-fadein" id="alarm">';
						str += '<span>' + obj.address + '' + obj.msg + '</span>';
						str += '<span class="time">' + obj.time + '</span>';
						str += '</div>';
					}
					var position = obj.position;
					position = new NPMapLib.Geometry.Point(position.split(',')[0], position.split(',')[1]);
					// var title = '';
					// var content = '';
					// var paddingForPopups = new NPMapLib.Geometry.Extent(15, 15, 15, 15);
					var offset = new NPMapLib.Geometry.Size(120, -200);
					alarmInfoWindow = new NPMapLib.Symbols.InfoWindow(position, "", str, {
						width: 216, //信息窗宽度，单位像素
						height: 80, //信息窗高度，单位像素
						autoSize: false,
						offset: offset, //信息窗位置偏移值
						iscommon: false, //是否为普通窗体（不带箭头）
						enableCloseOnClick: false, //移动地图，不关闭信息窗口。
						//paddingForPopups: paddingForPopups, //信息窗自动弹回后，距离四边的值。isAdaptation为true时，该设置有效。
						isAnimationOpen: false, //信息窗打开时，地图是否平滑移动，默认不平滑移动。
						isAdaptation: false, //信息窗位置是否自适应，默认不自适应。
						positionBlock: {
							imageSrc: '/template/img/space.gif',
							imageSize: {
								width: 1,
								height: 1
							}
						}
					});
					//转换为像素坐标
					var posPixel = map.pointToPixel(alarmInfoWindow);
					map.addOverlay(alarmInfoWindow);
					alarmInfoWindow.open(null, false);
				}

				$("#alarm").on('click', function() {
					if(alarmInfoWindow) {
						alarmInfoWindow.close();
						alarmInfoWindow = null;
					}
					window.open('/index/#/factEvent/', '_blank');
				})

				var openPowerWindow = function(obj) {
					var person = obj.person;
//					var bq = obj.bq;
//					if(bq.indexOf(',') > 0) {
//						bq = bq.split(',');
//					}
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
					// var title = '';
					// var content = '';
					// var paddingForPopups = new NPMapLib.Geometry.Extent(15, 15, 15, 15);
					// var offset = new NPMapLib.Geometry.Size(0, 0);
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
					// var title = '';
					// var content = '';
					// var paddingForPopups = new NPMapLib.Geometry.Extent(15, 15, 15, 15);
					// var offset = new NPMapLib.Geometry.Size(0, 0);
					gpsInfoWindow = new NPMapLib.Symbols.InfoWindow(position, "", str, {
						width: 160, //信息窗宽度，单位像素
						height: 120, //信息窗高度，单位像素
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

				//定时烟感报警窗口
				var smoketimer = null;
				var smokeMarker;
				var openSmokePop = function() {
					//window.clearInterval(smoketimer);
					// if (alarmInfoWindow) {
					//     alarmInfoWindow.close();
					//     alarmInfoWindow = null;
					// }
					map.removeOverlay(smokeMarker);
					// if( i >= $scope.alarmdata.length){
					//     window.clearInterval(smoketimer);
					//     i = 0;
					//     return;
					// } 
					var lon = $scope.alarmdata.lon;
					var lat = $scope.alarmdata.lat;
					var address = $scope.alarmdata.address;
					var time = $scope.alarmdata.alarmTime;
					var type = $scope.alarmdata.alarmType;
					var msg = $scope.alarmdata.alarmMsg;
					var position = lon + ',' + lat;
					var size = new NPMapLib.Geometry.Size(400, 400);
					var smokeObj = {
						address: address,
						msg: msg,
						time: time,
						type: type,
						position: position
					};
					if(typeof(lon) != 'undefined' && typeof(lat) != 'undefined') {
						var pt = new NPMapLib.Geometry.Point(lon, lat);
						if(type == 1) {
							var icon = new NPMapLib.Symbols.Icon("/template/img/newmap/smokeGif.gif", size);
						} else if(type == 3) {
							var icon = new NPMapLib.Symbols.Icon("/template/img/newmap/waterGif.gif", size);
						} else {
							var icon = new NPMapLib.Symbols.Icon("/template/img/newmap/lightGif.gif", size);
						}
						smokeMarker = new NPMapLib.Symbols.Marker(pt);
						smokeMarker.setIcon(icon);
						smokeMarker.setData({
							'mouseover': 'haha'
						});
						map.addOverlay(smokeMarker);
						openAlarmWindow(smokeObj);
						alarmClick();
					} else {
						//alert("人脸坐标不对")
					}
				}

				var alarmClick = function() {
					smokeMarker.addEventListener('click', function(p, d) {
						if(alarmInfoWindow) {
							alarmInfoWindow.close();
							alarmInfoWindow = null;
						}
						map.removeOverlay(smokeMarker);
						window.open('/#/index/factEvent/', '_blank');
					});
				}

				//定时弹出人脸抓拍窗口
				var facedata = [];
				//var facetimer = null;
				var faceInfoWindow=null;
				var faceMarker;
				var timestamp=0;
				$scope.$on('faceScoket',function(scope,data){
						//window.clearInterval(facetimer);
						if(faceInfoWindow) {
							faceInfoWindow.close();
							faceInfoWindow = null;
						}
						if(!!map){
							map.removeOverlay(faceMarker);
	                        facedata=data;
	                        if(facedata[0].timestamp!==timestamp|| timestamp==0 ){
	                            timestamp=facedata[0].timestamp;
	                             openFacePop();
	                        }
						}
				});
				var openFacePop = function() {
					var i = 0;
					//facetimer = setInterval(function() {
						if(faceInfoWindow) {
							faceInfoWindow.close();
							faceInfoWindow = null;
						}
						map.removeOverlay(faceMarker);
						if(i >= facedata.length) {
							window.clearInterval(facetimer);
							i = 0;
							return;
						}
						var lon = facedata[i].lon;
						var lat = facedata[i].lat;
						var pic = facedata[i].faceUrl;
						var time = facedata[i].captureTime;
						var name = facedata[i].name;
						var position = lon + ',' + lat;
						var size = new NPMapLib.Geometry.Size(32, 32);
						var faceObj = {
							pic: pic,
							time: time,
							name: name,
							position: position
						};
						if(typeof(lon) != 'undefined' && typeof(lat) != 'undefined') {
							var pt = new NPMapLib.Geometry.Point(lon, lat);
							var icon = new NPMapLib.Symbols.Icon("/template/img/newmap/face.png", size);
							faceMarker = new NPMapLib.Symbols.Marker(pt);
							faceMarker.setIcon(icon);
							map.addOverlay(faceMarker);
							openFaceWindow(faceObj);
						} else {
							//alert("人脸坐标不对")
						}
						setTimeout(function(){
							 if(faceInfoWindow) {
							faceInfoWindow.close();
							faceInfoWindow = null;
						}
						map.removeOverlay(faceMarker);
						},1500);
					//}, 3000)
					//facetimer;
				}

				var openFaceWindow = function(obj) {
					var str = '<div class="map-layerCon map-layerCon-face">';
					str += '<div class="title">抓拍人脸</div>';
					str += '<div class="face-mapCon clearfix">';
					str += '<a class="img-box" style="width:80px;height:80px;" href="' + obj.pic + '" target="_blank">';
					str += '<img src="' + obj.pic + '" style="width:80px;height:80px;"/>';
					str += '</a>';
					str += '<div class="message-box" style="padding-left:95px;">';
					str += '<p>' + obj.name + '</p>';
					str += '<p>' + obj.time + '</p>';
					str += '</div>';
					str += '</div>';
					str += '</div>';
					var position = obj.position;
					position = new NPMapLib.Geometry.Point(position.split(',')[0], position.split(',')[1]);
					// var title = '';
					// var content = '';
					// var paddingForPopups = new NPMapLib.Geometry.Extent(15, 15, 15, 15);
					// var offset = new NPMapLib.Geometry.Size(0, 0);
					faceInfoWindow = new NPMapLib.Symbols.InfoWindow(position, "", str, {
						width: 200, //信息窗宽度，单位像素
						height: 130, //信息窗高度，单位像素
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
					map.addOverlay(faceInfoWindow);
					faceInfoWindow.open(null, false);
				}

				//定时弹出车辆抓拍窗口
				var cartimer = null;
				var carMarker;
				var websocket = null;
				var socketIp =configFile.websocketIP;
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
							"villageCode": $scope.villageCode,
							"pushType": "3"
						}));
					}
					websocket.onerror = function() {
						websocket = new WebSocket(socketIp);
					};
					//接收到消息的回调方法

					websocket.onmessage = function(event) {
						$scope.carData = JSON.parse(event.data).data;
						console.log($scope.carData);
						if($scope.carData === undefined){
							return false;
						}
						if($scope.carData.length == 0){
							return false;
						}
						if(JSON.stringify($scope.carData) === "{}"){
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
					// var title = '';
					// var content = '';
					// var paddingForPopups = new NPMapLib.Geometry.Extent(15, 15, 15, 15);
					// var offset = new NPMapLib.Geometry.Size(0, 0);
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
				}

				//定时弹出门禁记录
				var doortimer = null;
				var openDoorPop = function(type, testdata) {
					var i = 0;
					var doorMarker;
					var doortimer = setInterval(function() {
						if(doorInfoWindow) {
							doorInfoWindow.close();
							doorInfoWindow = null;
						}
						map.removeOverlay(doorMarker);
						if(i >= $scope.doordata.length) {
							window.clearInterval(doortimer);
							i = 0;
							return;
						}
						var lon = $scope.doordata[i].lon;
						var lat = $scope.doordata[i].lat;
						var time = $scope.doordata[i].OpenedTime;
						var name = $scope.doordata[i].pName;
						var address = $scope.doordata[i].buildingName;
						var type = $scope.doordata[i].openType;
						var position = lon + ',' + lat;
						var size = new NPMapLib.Geometry.Size(32, 32);
						var pt = new NPMapLib.Geometry.Point(lon, lat);
						var doorObj = {
							time: time,
							type: type,
							name: name,
							address: address,
							position: position
						};
						if(typeof(lon) != 'undefined' && typeof(lat) != 'undefined') {
							var icon = new NPMapLib.Symbols.Icon("/template/img/newmap/door.png", size);
							doorMarker = new NPMapLib.Symbols.Marker(pt);
							doorMarker.setIcon(icon);
							map.addOverlay(doorMarker);
							openDoorWindow(obj);
						} else {
							//alert("门禁坐标不对")
						}
						i++;
					}, 8000)
					doortimer;
				}

				var openDoorWindow = function(obj) {

					var str = '<div class="map-layerCon" style="top:10%;">';
					str += '<div class="title">11111</div>';
					str += '<div class="text-mapCon">';
					str += '<p class="name">' + obj.name + '</p>';
					str += '<p>' + obj.address + '</p>';
					str += '<p>' + obj.time + '</p>';
					str += '</div>';
					str += '</div>';
					var w = 200;
					var h = 80;
					var position = position;
					position = new NPMapLib.Geometry.Point(position.split(',')[0], position.split(',')[1]);
					// var title = '';
					// var content = '';
					// var paddingForPopups = new NPMapLib.Geometry.Extent(15, 15, 15, 15);
					// var offset = new NPMapLib.Geometry.Size(0, 0);
					doorInfoWindow = new NPMapLib.Symbols.InfoWindow(position, "", str, {
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
							imageSrc: '/template/img/newmap/arrow.png',
							imageSize: {
								width: 20,
								height: 11
							}
						}
					});
					//转换为像素坐标
					var posPixel = map.pointToPixel(position);
					map.addOverlay(doorInfoWindow);
					doorInfoWindow.open(null, false);
				};
				$scope.$on("openInforwindow",function($scope,data){
					if(infoWindow){
						removeWindow();
					}
					if(!window.isShowCk){
						return;
					}
					map.setCenter(new NPMapLib.Geometry.Point(data.lon, data.lat));
					var position = data.lon + ',' + data.lat;
					var obj = {
						userAddress: data.userAddress?data.userAddress:undefined,
						userName: data.userName?data.userName:undefined,
						alarmTime: data.alarmTime?data.alarmTime:undefined,
						alarmDesc:data.alarmDesc?data.alarmDesc:undefined,
						chargePersonName:data.chargePersonName?data.chargePersonName:undefined,
						chargePersonTelphone:data.chargePersonTelphone?data.chargePersonTelphone:undefined,
						position:position
					};
					openWindow(obj);
				});
				//信息窗口
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
						str += '<p>' + '用户地址：' + obj.userAddress + '</p>';
					}
					if(typeof(obj.userName) != 'undefined') {
						str += '<p>' + '用户：' + obj.userName + '</p>';
					}
					if(typeof(obj.alarmTime) != 'undefined') {
						str += '<p>'+ '报警时间：' + obj.alarmTime + '</p>';
					}
					if(typeof(obj.alarmDesc) != 'undefined') {
						str += '<p>'+ '报警详情：' + obj.alarmDesc + '</p>';
					}
					if(typeof(obj.chargePersonName) != 'undefined') {
						str += '<p>'+ '负责人：' + obj.chargePersonName + '</p>';
					}
					if(typeof(obj.chargePersonTelphone) != 'undefined') {
						str += '<p>'+ '联系方式：' + obj.chargePersonTelphone + '</p>';
					}


					if(typeof(obj.address) != 'undefined') {
						str += '<p style="width:160px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">' + obj.address + '</p>';
					}
					if(obj.companyid && obj.companyid != '') {
						str += ('<p><a href="/#/index/peopleDetail/' + obj.villageCode + '" target="_blank">查看从业人员</a></p>');
					} 
					//caseDesc
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
						width: 200, //信息窗宽度，单位像素
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
				}

				var addEvents1 = function() {
					//左键单击
					//alert(111);
					map.addEventListener(NPMapLib.MAP_EVENT_CLICK, function(point) {
						//alert("您左键单击了地图！点击的经纬度为：" + point.lon + "," + point.lat);
						removeWindow();
					});
				}

				$scope.$on("realPowerEvent",function(scope,data){
					$scope.faceRealPower = [];
					$.each(data,function(i,v){
						$scope.faceRealPower.push({
							label:v.label,
							lat:v.lat,
							lon:v.lon,
							certificatesName:v.name,
							credentialNo:v.person_id,
							residentialAddress:v.cameraName,
							deviceId:"",
							villageCode:$stateParams.id,
							collectTime:moment(v.hit_detail.timestamp*1000).format("YYYY-MM-DD HH:mm:ss"),
							cardNumAndlonlat:v.person_id+v.lat+v.lon+""
						})
					})
					if($scope.isShowMac){
						macLayer = null;
						$scope.toggleLayer(21,2);
					}
				})
				//在图层上添加覆盖物
				var addOverlayer = function(layerName) {
					//实有mac力量
					switch(layerName) {
						case 'mac':
							if($scope.isShowMac) {
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: $scope.villageCode //'101226000001'
									};
									communityAllService.queryMapInfo(id, req).then(function(data) {
										debugger;
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
					                            return a.cardNumAndlonlat
					                        });
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
										villageCode: $scope.villageCode
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
							              villageCode: $scope.villageCode,
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
										villageCode:$scope.villageCode
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
								//查询进出口
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: $scope.villageCode,
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
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

						case 'wifi':
							//显示wifi
							if($scope.isShowWifi) {
								//查询进出口
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: $scope.villageCode,
										deviceId: '',
										detailAddress: '',
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
											
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
							//小区显示摄像头
							if($scope.isShowCamera) {
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: $scope.villageCode,
										cameraType: "1,2",
										pageNumber: 1,
										pageSize: 9999,
										cameraName:''
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
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
									communityAllService.queryMapInfo(id, req).then(function(data) {
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
						case 'bayonet':
							//显示卡口
							if($scope.isShowBayonet) {
								$scope.queryMapInfoData = function(id) {
									var req = {
										tollgateType:'1',
										villageCode: $scope.villageCode,
										tollgateID: '',
										name: '',
										place: '',
										status: '',
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
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
										villageCode: $scope.villageCode,
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
						case 'door':
							//显示门禁
							if($scope.isShowDoor) {
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: $scope.villageCode,
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
							//显示烟感  消防(1. 烟感2. 电表 3. 室外消火栓 4. 电弧)设备列表
							if($scope.isShowSmoke) {
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: $scope.villageCode,
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
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: $scope.villageCode,
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
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: $scope.villageCode,
										buildingNo: '',
										deviceNo: '',
										detailAddress: '',
										type: 3,
										floorNo: '',
										houseNo: '',
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
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
								$scope.queryMapInfoData = function(id) {
									var req = {
										villageCode: $scope.villageCode,
										stationId: '',
										name: '',
										acdeviceId: '',
										pageNumber: 1,
										pageSize: 999
									}
									communityAllService.queryMapInfo(id, req).then(function(data) {
										if(data.resultCode == '200') {
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
										villageCode: $scope.villageCode,
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

				//选择配置图层
				$scope.layerList = [{
						id: 1,
						name: '动态感知',
						isChecked: 2,
						hasChild: 'true',
						child: [{
								id: 11,
								name: '人脸抓拍',
								isChecked: 2
							},
							{
								id: 12,
								name: '车辆过车',
								isChecked: 2
							},
							{
								id: 23,
								name: '实时警情',
								isChecked: 2
							}
							// ,
							// {
							// 	id: 12,
							// 	name: '开门感知',
							// 	isChecked: 2
							// }
						]
					},
					{
						id: 2,
						name: '实有力量',
						isChecked: 2,
						hasChild: 'true',
						child: [{
								id: 21,
								name: '实有力量',
								isChecked: 2
							},
							{
								id: 22,
								name: '实时警力',
								isChecked: 2
							}
						]
					},
					{
						id: 3,
						name: '实有房屋',
						isChecked: 0
					},
					{
						id: 4,
						name: '实有单位',
						isChecked: 0
					},
					{
						id: 5,
						name: '实有安防设施',
						isChecked: 0,
						hasChild: 'true',
						child: [{
								id: 50,
								name: 'CK',
								isMouseOn: 'false',
								isChecked: 0
							},
							{
								id: 52,
								name: '卡口',
								isMouseOn: 'false',
								isChecked: 0
							},
							{
								id: 49,
								name: '车棚',
								isMouseOn: 'false',
								isChecked: 0
							},
							{
								id: 53,
								name: 'wifi',
								isMouseOn: 'false',
								isChecked: 0
							},
							{
								id: 54,
								name: '门禁',
								isMouseOn: 'false',
								isChecked: 0
							},
							{
								id: 51,
								name: '监控',
								isMouseOn: 'false',
								isChecked: 0,
								hasChild: 'true',
								child: [{
								id: 511,
								name: '小区监控',
								isMouseOn: 'false',
								isChecked: 0
								},
								{
								id: 512,
								name: '道路监控',
								isMouseOn: 'false',
								isChecked: 0
								}
								]
							},
							{
								id: 551,
								name: '消防',
								isMouseOn: 'false',
								isChecked: 0,
								hasChild: 'true',
								child: [

									{
										id: 551,
										name: '烟感',
										isChecked: 0
									},
									{
										id: 552,
										name: '电气',
										isChecked: 0
									},
									{
										id: 553,
										name: '消防栓',
										isChecked: 0
									},
									{
										id: 554,
										name: '微型消防站',
										isChecked: 0
									},

								]
							}
						]
					},
					{
						id: 6,
						name: '小区出入口',
						isChecked: 0
					},
					{
						id: 7,
						name: '窨井盖',
						isChecked: 0
					}
				];
				//向下查找
				function getLayerisChecked(layer, isChecked) {
					//if (!layer || !layer.length) return;
					for(var i = 0, len = layer.length; i < len; i++) {
						layer[i].isChecked = isChecked;
						var childs = layer[i].child;
						if(childs && childs.length > 0) {
							layer[i].child = getLayerisChecked(childs, isChecked);
						} else {
							///$scope.laterArr.push(layer[i].id);
							//alert(layer[i].id)
							$scope.toggleLayer(layer[i].id,layer[i].isChecked);
						}
					}
					return layer;
				}
				$scope.layerMouse = function(layer, state) {
					if(state == 'enter') {
						layer.isMouseOn = "true";
					} else {
						layer.isMouseOn = "false";
					}
				}
				//向上查找
				function getLayerisCheckedAll(layer, frist) {
					var isChecked = 0;
					if(frist) {
						for(var i = 0, len = layer.length; i < len; i++) {
							//				            layer[i].isChecked=isChecked;
							var childs = layer[i].child;
							if(childs && childs.length > 0) {
								layer[i].isChecked = getLayerisCheckedAll(childs);
							}
						}
						return layer;
					} else {
						for(var i = 0, len = layer.length; i < len; i++) {
							//				            layer[i].isChecked=isChecked;
							var childs = layer[i].child;
							if(childs && childs.length > 0) {
								layer[i].isChecked = getLayerisCheckedAll(childs);
							}
							if(layer[i].isChecked == 0) {
								isChecked++;
							}
						}
						return isChecked == layer.length ? 0 : isChecked == 0 ? 2 : 1;
					}
				}
				//选择配置图层
				$scope.laterArr = [];
				$scope.selectLayer = function(layer) {				
					$scope.laterArr = [];
					//removeWindow();
					if(layer.id == 1) {
						return
					}
					// if(!window.mapMain)return;

					if(layer.isChecked == 1 || layer.isChecked == 0) {
						layer.isChecked = 2;
						if(layer.child) {
							layer.child = getLayerisChecked(layer.child, 2);
						} else {
							//$scope.laterArr.push(layer.id);
							$scope.toggleLayer(layer.id,layer.isChecked);
						}
					} else {
						layer.isChecked = 0;
						if(layer.child) {
							layer.child = getLayerisChecked(layer.child, 0);
						} else {
							//$scope.laterArr.push(layer.id);
							$scope.toggleLayer(layer.id,layer.isChecked);
						}
					}
					$scope.layerList = getLayerisCheckedAll($scope.layerList, "frist");
					// alert($scope.laterArr);

				};

				$scope.closeLayer = function() {
					layer.closeAll();
				}

				//
				function clickBuilding(buildingNo,villageCode, villageCode) {
					var buildparam = {
						name: buildingNo
					};
					localStorage.setItem("build_" + villageCode, JSON.stringify(buildparam));
					// var url = window.location.href.split("/#")[0] + "/#/index/clickBuilding/" + villageCode;
					var url = '../../../template/html/modules/buildingHouse/building.html?villageCode='+villageCode;
					var residentLayer = layer.open({
						type: 2,
						title: "楼栋",
						skin: 'dark-layer',
						shade: 0.7,
						shadeClose: true,
						area: ['7.2rem', '7.8rem'],
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
					// var url = window.location.href.split("/#")[0] + "/#/index/clickResident/"+$scope.villageCode;
					var url = "../../../template/html/modules/buildingHouse/house.html?villageCode="+$scope.villageCode;
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
                $scope.drawbiankuang = function(data) {
						var mapGeometry = new MapPlatForm.Base.MapGeometry(map);
						var ps = mapGeometry.getGeometryByGeoJson(data.map2d.geometry, map);
	                        ps.setStyle({
								color: '#ffc700', // '#ffc700', //颜色
								fillColor:'', // '#ffc700', //填充颜色
								weight: 2, //宽度，以像素为单位
								opacity: 0, //透明度，取值范围0 - 1
								fillOpacity: 0.01 //填充的透明度，取值范围0 - 1,
								//lineStyle: NPMapLib.LINE_TYPE_DASH //样式
							});
						    // ps.setZIndex(120);
						     map.addOverlay(ps);
				}
				//打开数据详情列表
				$scope.openList = function(url) {
					var newurl = window.location.href.split("/#")[0] + url
					window.open(url, '_blank');
				}

				//离开页面时地图销毁，清空定时器
				$scope.$on('$destroy', function() {
					window.mapSuccess = null;
					window.clickBayonet = null;
					if(window.mapMain) {
						window.mapMain.clearOverlays();
						window.mapMain.destroyMap();
						window.mapMain = null;
					}
				});
                //当地图初始化完成时调用
				window.mapSuccess = function(map) {
					setTimeout(function() {
						angular.forEach(configFile.communityAllInfo, function(data) {
							if(data.villageCode == $scope.villageCode) {
								map.setZoom(18);
								map.setCenter(new NPMapLib.Geometry.Point(data.map2d.center.split(',')[0], data.map2d.center.split(',')[1]));
							    $scope.drawbiankuang(data);
							}
						});
						$scope.toggleLayer(22,2);
						$scope.toggleLayer(21,2);
						$scope.toggleLayer(23,2);
						//推送车辆
						openCarPop();
					}, 1500);
				};

				//es6 promise的用法，低版本浏览器请转换成es5语法
				function promiseFun(){
					debugger;
					if(!!window.Promise){
						promiseUseFun();
					}else{
						notPromiseUseFun();
					}
					function promiseUseFun(){
						var promise1 = new Promise(function(resolve,reject){
							communityAllService.sixEntityCount({
							villageCode: $scope.villageCode
							}).then(function(resp) {
								if(resp.resultCode == '200') {
									$scope.sixEntityCountData = resp.data;
									resolve($scope.sixEntityCountData);
								}
							}).catch(function() {}).finally(function() {});
						});
						var param = [$scope.villageCode+""];
		                $scope.findAndLeaveObj = {
		                    findObj:{
		                        num:0
		                    },
		                    leaveObj:{
		                        num:0
		                    }
		            	}
						var promiseYituFind = new Promise(function(resolve,reject){
							yituFace.yitu_dossier("incoming_dossier",param,function(data){
		                        debugger;
		                        if(data.statistic_info.length>0){
		                            $.each(data.statistic_info,function(i,v){
		                                $scope.findAndLeaveObj.findObj.num += v.delta_num;
		                            });
		                            resolve($scope.findAndLeaveObj.findObj.num);
		                        }
		                    })
						});
						var promiseYituLeave = new Promise(function(resolve,reject){
							yituFace.yitu_dossier("leaving_dossier",param,function(data){
		                        debugger;
		                        if(data.statistic_info.length>0){
		                            $.each(data.statistic_info,function(i,v){
		                                $scope.findAndLeaveObj.leaveObj.num += v.delta_num;
		                            });
		                            resolve($scope.findAndLeaveObj.leaveObj.num);
		                        }
		                    });
						});
						Promise.all([promise1,promiseYituFind,promiseYituLeave]).then(function(result){
							debugger;
							$scope.sixEntityCountData.peopleCount = $scope.sixEntityCountData.peopleCount + result[1] - result[2];
						})
					}

					function notPromiseUseFun(){
						var num = 0;
						communityAllService.sixEntityCount({
						villageCode: $scope.villageCode
						}).then(function(resp) {
							num++
							if(resp.resultCode == '200') {
								$scope.sixEntityCountData = resp.data;
								lastDataHander();
							}
						}).catch(function() {}).finally(function() {});
						var param = [$scope.villageCode+""];
		                $scope.findAndLeaveObj = {
		                    findObj:{
		                        num:0
		                    },
		                    leaveObj:{
		                        num:0
		                    }
		            	};
		            	yituFace.yitu_dossier("incoming_dossier",param,function(data){
	                        debugger;
	                        num++;
	                        if(data.statistic_info.length>0){
	                            $.each(data.statistic_info,function(i,v){
	                                $scope.findAndLeaveObj.findObj.num += v.delta_num;
	                            });
	                            lastDataHander();
	                        }
	                    });
	                    yituFace.yitu_dossier("leaving_dossier",param,function(data){
	                        debugger;
	                        num++;
	                        if(data.statistic_info.length>0){
	                            $.each(data.statistic_info,function(i,v){
	                                $scope.findAndLeaveObj.leaveObj.num += v.delta_num;
	                            });
	                            lastDataHander();
	                        }
	                    });
	                    function lastDataHander(){
	                    	if(3 == num){
	                    		$scope.sixEntityCountData.peopleCount = $scope.sixEntityCountData.peopleCount + $scope.findAndLeaveObj.findObj.num - $scope.findAndLeaveObj.leaveObj.num;
	                    	}
	                    }
					}
				}

				var init = function() {
					// $scope.$on("mapInitEvent",function(event,initObj){
					// //初始化地图
					// mapOpera.init('2dMap');
					// })
					//初始化地图
					setTimeout(function() {
						mapOpera.init('2dMap');
					}, 500)
					//左边统计查询
					promiseFun();
				}
				init();
			}
		];
		return communityAllCtrl;
	});