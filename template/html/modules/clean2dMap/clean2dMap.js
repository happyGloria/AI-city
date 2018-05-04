define(['angular','jquery'],function(angular,$){
	//初始化angular
	var initAngularFun = function(){
		var app = angular.module('myApp',[]);
		app.controller('clean2dMapCtrl',['$scope',function($scope){
			console.log(222);
		}]);
		angular.bootstrap(document.getElementById("clean2dMapId"), ['myApp']);
	}

	var gpsInfoWindow = null;
	var openGpsWindow = function(obj) {
		var str = '<div class="map-layerLine">';
		str += '<div class="list">';
        str += '<span class="text">警号:' + obj.policeNumber + '</span>';
		if('' != obj.peopleName){
         str += '<span class="text">警员名称:' + obj.peopleName + '</span>';
		}
		if('' != obj.serviceName){
         str += '<span class="text">勤务模式:' + obj.serviceName + '</span>';
		}
		if('' != obj.remark){
         str += '<span class="text">状态:' + obj.remark + '</span>';
		}
		if('' != obj.telephone){
         str += '<span class="text">警员手机:' + obj.telephone + '</span>';
		}
		if(!!obj.mrowTime){
			str += '<span class="text">' + obj.mrowTime + '</span>';
		}
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
		var posPixel = mapOpera.map.pointToPixel(gpsInfoWindow);
		mapOpera.map.addOverlay(gpsInfoWindow);
		gpsInfoWindow.open(null, false);
	}

	//地图撒点方法,pointList每个item包含lon,lat信息
	var gpsLayer;
	var drawIconList = function(name,pointList){
		require(['npgis2'],function(){
			var center = new NPMapLib.Geometry.Point(pointList[0].lon, pointList[0].lat);
            var zoom = mapOpera.map.getMaxZoom();
            mapOpera.map.centerAndZoom(center, zoom);
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
                            var style = {
								fontSize: 12,
								externalGraphic: '/template/img/newmap/gps.png',
								graphicHeight: 36,
								graphicWidth: 36
							}
							e.changeStyle(style, true);
						},
						mouseout: function(e) {
						   	var style = {
								fontSize: 12,
								externalGraphic: '/template/img/newmap/gps.png',
								graphicHeight: 32,
								graphicWidth: 32
							};
							e.changeStyle(style, true);
						},
						clusteronmouseover: function(e, isCluster) {},
						click: function(e) {
							// !!gpsInfoWindow && gpsInfoWindow.close();
							// gpsInfoWindow = null;
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
						}
			});
			gpsLayer.show();
			mapOpera.cluster.addClusterMarkers('gps', pointList);
			gpsLayer.setZIndex(600);
			gpsPoint = {};
		});
	}

	//初始化地图
	var initMap = function(){
		require(['npgis2'],function(){
			mapOpera.init('2dMap');
		})
	}

	window.mapSuccess = function(map){
		huaTianLinLunKuo();
		var pointList = JSON.parse(sessionStorage.getItem("locationForPower"));
		drawIconList("police",pointList);
	}

	var tianLinPs =null;
	function huaTianLinLunKuo(){
		var geometry={
			"coordinates": [
				[
					[
						[13518202.444819100,3656182.291735010], 
						[13517947.604847200,3656259.571888650], 
						[13517789.262972400,3656325.675667770], 
						[13517680.946371800,3656452.003665740], 
						[13517431.933448200,3656714.647353040], 
						[13517328.342484000,3656838.619281170], 
						[13517320.072704100,3656852.595705130], 
						[13517307.258547400,3656867.757299610], 
						[13517241.265756600,3656956.977999760], 
						[13517074.838536700,3657236.904992530], 
						[13516969.475217100,3657397.706206690], 
						[13516932.176117900,3657454.626770650], 
						[13516768.084213300,3657739.319813070], 
						[13516674.560087300,3657919.377291230], 
						[13516667.219690300,3657937.345963110], 
						[13516636.581589800,3657927.726823000], 
						[13516642.467629300,3657906.753602850], 
						[13516645.317317800,3657888.245897650], 
						[13516647.022146400,3657869.597206810], 
						[13516647.575621200,3657850.878729190], 
						[13516646.202617200,3657832.204654960], 
						[13516644.106224700,3657811.269016300], 
						[13516640.607019800,3657790.569159320], 
						[13516634.770750600,3657767.987909140], 
						[13516628.232039100,3657747.994651170], 
						[13516620.757965400,3657728.707821910], 
						[13516611.179858900,3657708.950873970], 
						[13516600.666227600,3657690.840887700], 
						[13516589.217004700,3657673.671919870], 
						[13516579.169068300,3657660.266570920], 
						[13516567.017298000,3657645.920684550], 
						[13516554.865043900,3657632.751004620], 
						[13516542.478423900,3657620.757466680], 
						[13516528.455177900,3657609.234822760], 
						[13516514.665110200,3657598.888183560], 
						[13516476.781452600,3657583.340240390], 
						[13516451.234392800,3657571.326585780], 
						[13516408.264695900,3657568.284687980], 
						[13516334.276515500,3657557.286445900], 
						[13516008.497604900,3657571.995916070], 
						[13515870.113582900,3657577.862463280], 
						[13515606.832776600,3657589.230285090], 
						[13515601.235705200,3657588.147599770], 
						[13515597.380818700,3657587.006314650], 
						[13515592.732799700,3657584.724357290], 
						[13515589.390060400,3657581.543018680], 
						[13515587.134480300,3657578.137609180], 
						[13515585.136630600,3657573.705388600], 
						[13515578.643325800,3657494.028992670], 
						[13515572.912121700,3657399.534967890], 
						[13515577.695548700,3657268.092764460], 
						[13515614.490637600,3657148.800128300], 
						[13515680.672903200,3657036.376119290], 
						[13515687.010148200,3657024.294752490], 
						[13515713.075732600,3656750.867125780], 
						[13515741.165696500,3656512.538036850], 
						[13515749.686197400,3656460.624701470], 
						[13515788.283038400,3656225.455364310], 
						[13515810.121932600,3656029.208462930], 
						[13515820.633563900,3655972.163118100], 
						[13515849.360251800,3655876.781689380], 
						[13515863.203874400,3655834.864924610], 
						[13516000.402199300,3655407.676328240], 
						[13516116.911863100,3655040.761062210], 
						[13516156.831344200,3654908.025288300], 
						[13516172.260434800,3654867.008535510], 
						[13516185.147145600,3654822.838643180], 
						[13516205.422280300,3654744.903104410], 
						[13516216.164308000,3654702.255187310], 
						[13516232.916120100,3654619.506032020], 
						[13516264.008547700,3654433.544497980], 
						[13516973.372622300,3654534.532183280], 
						[13517451.344061800,3654602.439588380], 
						[13517604.690523300,3654608.088917840], 
						[13518034.069656900,3654626.983152080], 
						[13518049.403260300,3654764.478217730], 
						[13518064.594458900,3654908.053095490], 
						[13518073.923992700,3654994.284446960], 
						[13518086.032948000,3655111.694078090], 
						[13518094.102682800,3655177.864225060], 
						[13518108.268746900,3655313.090753960], 
						[13518119.357903500,3655422.293956530], 
						[13518138.461871700,3655597.361916060], 
						[13518166.751455800,3655894.901664910], 
						[13518202.444819100,3656182.291735010]

					]
				]
			],
			"type": "MultiPolygon"
		};
		var mapGeometry = new MapPlatForm.Base.MapGeometry(map);
		tianLinPs = mapGeometry.getGeometryByGeoJson(geometry, map);
        tianLinPs.setStyle({
			color: '#ffc700', // '#ffc700', //颜色
			fillColor:'', // '#ffc700', //填充颜色
			weight: 4, //宽度，以像素为单位
			opacity: 0, //透明度，取值范围0 - 1
			fillOpacity: 0.01 //填充的透明度，取值范围0 - 1,
			//lineStyle: NPMapLib.LINE_TYPE_DASH //样式
		});
	    tianLinPs.setZIndex(0);
	    map.addOverlay(tianLinPs);
	}
	return {
		initMap:initMap,
		initAngularFun:initAngularFun,
		drawIconList:drawIconList,
		openGpsWindow:openGpsWindow
	};
})