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
                                [ 121.47560682410649, 31.01384298861847 ],
                                [ 121.51626292993991, 31.00778669160105 ],
                                [ 121.52040376155647, 30.91864587904125 ],
                                [ 121.47355126197134, 30.877583015100452 ],
                                [ 121.42569975504014, 30.87776865743584 ],
                                [ 121.42844702010949, 30.927235144248396 ],
                                [ 121.43532381265447, 30.96903410607209 ],
                                [ 121.47560682410649, 31.01384298861847 ]
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

                $scope.mapLoadSuccess = false;
                //当地图初始化完成时调用
				window.mapSuccess = function(map) {
					var ctr = new NPMapLib.Controls.MousePositionControl();
					map.addControl(ctr);
					map.setZoom(12);
					setTimeout(function() {
						map.setCenter(new NPMapLib.Geometry.Point(121.47568239694685,30.916563451192317));
						huaTianLinLunKuo();
                        $scope.mapLoadSuccess = true;
                        $scope.$emit('mapLoadSuccess', $scope.mapLoadSuccess);
					}, 1500);
				};

                //画小区轮廓
				var psArr = [];

				$scope.drawbiankuang = function(villageCode) {
					//地图控件
					psArr = [];
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
                                console.log(psArr, 91)
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
								// openCommunity(data);
							});
                            $scope.$emit('InitPositionArr', { "MapPsArr": psArr, "MapPs": ps });
						})(data, ps);
                        
					});
				}
            }
		];
		return twoDMapCtrl;
	});