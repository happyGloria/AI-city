/**
 * Created by lihouhua on 2016/4/25.
 */
define(['controllers/controllers', 'config/mapConfig', 'config/common', '/lib/other/socket.io.js','layer',  'player', 'npgis2', 'zTree'],
    function (controllers, mapConfig, util, io,layer) {
        var homeCtrl = ['$scope', '$compile', 'mapService', 'homePageService', function ($scope, $compile, mapService, homePageService) {
            debugger;
            var flag = localStorage.getItem('macTrackFromFile');
            $scope.macArr = [];
            if(localStorage.getItem("macTrack")){
                $scope.mac = localStorage.getItem("macTrack");
                if(flag){
                  $scope.macArr = JSON.parse($scope.mac);
                  $scope.mac =  $scope.macArr[0].mac;
                }
                // localStorage.removeItem("macTrack");
                // localStorage.removeItem("macTrackFromFile");
            }       
            var ICON_SMALL = 26; //图层小图标
            var ICON_NORMAL = 30; //图层大图标
            var ICON_CLUSTER = 44; //图层聚合图标
            var FONT_SIZE = 10;
            $scope.macPoints = []; // 地图上需要展示的点位信息

            //当地图初始化完成时调用
            window.mapSuccess = function (map) {
                var ctr = new NPMapLib.Controls.MousePositionControl();
                map.addControl(ctr);
                map.setZoom(16);
                setTimeout(function () {
                map.setCenter(new NPMapLib.Geometry.Point(13517414.427704,3655076.5945409));
                }, 1000);
                $scope.macTrack();
            };

            // 折叠筛选条件
            $scope.toggleFilter = function () {
                $('.left-filter').slideToggle(300);
                $('.head-btn').toggleClass('arrow-up');
            };
            
            // 初始化页面
            $scope.initPage = function () {
                debugger
                //初始化地图
                setTimeout(function () {
                    var theme = sessionStorage.getItem('theme') || 'default';
                    if (theme == 'dark') {
                        mapConfig.config.VectorUrl = mapConfig.config.DarkUrl;
                    }
                    mapOpera.init('macTrackId', mapConfig.config);
                }, 200);
                $scope.startTime = util.changeDayToString(util.addDays(new Date(),-7)); //初始化查询的开始日期
                $scope.endTime = util.changeDayToString(util.addDays(new Date(), 1)); //初始化查询的结束日期
                util.initDayPicker($('#startTime'),{
                    onSelectDate:function(value,dom){
                        debugger;
                        if(new Date($(dom).val()).getTime() > new Date($scope.endTime).getTime()){
                            notify.warn("开始时间不能大于结束时间");
                            $(dom).val($scope.startTime);
                            return;
                        }
                        $scope.startTime = $(dom).val();
                    }
                });
                util.initDayPicker($('#endTime'),{
                    onSelectDate:function(value,dom){
                        debugger;
                        if(new Date($scope.startTime).getTime() > new Date($(dom).val()).getTime()){
                            notify.warn("开始时间不能大于结束时间")
                            $(dom).val($scope.endTime);
                            return;
                        }
                        $scope.endTime = $(dom).val();
                    }
                });
            };
            $scope.initPage();

            $scope.macTrack = function (index) {
                debugger;
                if (index == 1) {
                    $scope.startTime = $('[ng-model="startTime"]').val();
                    $scope.endTime = $('[ng-model="endTime"]').val();
                    console.log($scope.startTime)
                    console.log($scope.endTime)
                }else{
                    $scope.startTime = $scope.startTime;
                    $scope.endTime =  $scope.endTime
                }
                var params = {
                    pageSize:100,
                    pageNumber:1,
                    startTime: $scope.startTime+" 00:00:00",
                    endTime: $scope.endTime+" 23:59:59",
                    userMac: $scope.mac
                };
                if (!params.userMac) {
                    notify.warn('请输入正确的mac地址');
                    return;
                }
                if (params.endTime <= params.startTime) {
                    notify.warn('开始时间时间不得晚于结束时间');
                    return;
                }
                var loadingLayer = layer.load(1, {
                    shade: [0.3, '#fff']
                });
                if(flag){
                    $scope.startTime = $scope.macArr[$scope.macArr.length-1].time.split(" ")[0];
                    $scope.endTime =  $scope.macArr[0].time.split(" ")[0];
                    params.startTime = $scope.startTime+" 00:00:00";
                    params.endTime = $scope.endTime+" 23:59:59";
                }
                var promise = mapService.captrueMacList(params);
                debugger
                promise.then(function (resp) {
                    debugger
                    layer.close(loadingLayer);
                    $scope.resultLists = resp.data.list;
                    $scope.resultLists.forEach(function (item, index) {
                        $scope.createMarker(item, index)
                    });
                }).catch(function () {
                
                }).finally(function () {
                
                });
            };
            
            // 地图上显示对应点位
            $scope.createMarker = function (data, index,clikced) {
                var pt = new NPMapLib.Geometry.Point(data.lon, data.lat);
                if(clikced){
                    var size = new NPMapLib.Geometry.Size(40, 40);
                }else{
                    var size = new NPMapLib.Geometry.Size(32, 32);
                }
                var icon = new NPMapLib.Symbols.Icon("/template/img/map/Flag.png", size);
                //文本标记
                var label = new NPMapLib.Symbols.Label(index + 1 + ''); //一个图像标注
                label.setOffset(new NPMapLib.Geometry.Size(0, (size.height + 6) / 2));
                //设置样式
                label.setStyle({
                    fontSize: 12, //文字大小
                    fontFamily: '宋体', //字体
                    color: '#fff', //文字前景色
                    align: 'center', //对方方式
                    isBold: true //是否粗体
                });

                //图像标注
                var marker = new NPMapLib.Symbols.Marker(pt);
                marker.setIcon(icon);
                marker.setLabel(label);
                if (index === 0) {
                    console.log(marker, icon, label)
                }
                mapOpera.map.addOverlay(marker);
                marker.addEventListener(NPMapLib.MAP_EVENT_CLICK, function () {
                    $scope.$apply(function () {
                        $scope.resultLists.forEach(function (item) {
                            item.active = false;
                        });
                        $scope.resultLists[index].active = true;
                    });
                });
                lastClickIconMarker = {};
                lastClickIconMarker.marker = marker;
                lastClickIconMarker.item = data;
                lastClickIconMarker.index = index;
            };
            var lastClickIconMarker = null;
            // 列表信息点击，返回当前点位中心
            $scope.chooseMarker = function (item,$index) {
                var lat = item.lat,
                    lon = item.lon,
                    center = new NPMapLib.Geometry.Point(lon, lat),
                    zoom = mapOpera.map.getMaxZoom();
                $scope.resultLists.forEach(function (result) {
                    result.active = false;
                });
                item.active = true;
                if(!!lastClickIconMarker){
                    mapOpera.map.removeOverlay(lastClickIconMarker.marker);
                    $scope.createMarker(lastClickIconMarker.item,lastClickIconMarker.index);
                }
                $scope.createMarker(item,$index,true);
                mapOpera.map.centerAndZoom(center, zoom);
            };
            
            //离开页面时，销毁地图实例
            $scope.$on('$destroy', function () {
                window.mapSuccess = null;
                window.clickBayonet = null;
                if (window.mapMain) {
                    window.mapMain.clearOverlays();
                    window.mapMain.destroyMap();
                    window.mapMain = null;
                }
            });
        }];
        return homeCtrl;
    });
