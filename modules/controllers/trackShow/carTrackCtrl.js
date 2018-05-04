/**
 * Created by lihouhua on 2016/4/25.
 */
define(['controllers/controllers', 'config/mapConfig', 'config/common', '/lib/other/socket.io.js', 'player', 'npgis2', 'zTree'],
    function (controllers, mapConfig, util, io) {
        var homeCtrl = ['$scope', '$compile', 'mapService', 'homePageService', function ($scope, $compile, mapService, homePageService) {

            var ICON_SMALL = 26; //图层小图标
            var ICON_NORMAL = 30; //图层大图标
            var ICON_CLUSTER = 44; //图层聚合图标
            var FONT_SIZE = 10;


            //当地图初始化完成时调用
            window.mapSuccess = function (map) {
                // mapOpera.cluster.removeOverlayLayer('kakou');
                var ctr = new NPMapLib.Controls.MousePositionControl();
                map.addControl(ctr);
                // kakouLayer = null;
                //map.setCenter(new NPMapLib.Geometry.Point(118.69586343351942, 31.9476295101541));
                map.setZoom(4);
            };


            //初始化地图
            setTimeout(function () {
                var theme = sessionStorage.getItem('theme') || 'default';
                if (theme == 'dark') {
                    mapConfig.config.VectorUrl = mapConfig.config.DarkUrl;
                }
                mapOpera.init('carTrackId', mapConfig.config);
            }, 200);

            // 折叠筛选条件
            $scope.toggleFilter = function () {
                $('.left-filter').slideToggle(300);
                $('.head-btn').toggleClass('arrow-up');
            };
            // 初始化页面
            $scope.initPage = function () {


                $scope.startTime = util.changeDayToString(new Date()); //初始化查询的开始日期
                $scope.endTime = util.changeDayToString(util.addDays(new Date(), 1)); //初始化查询的结束日期
                util.initDayPicker($('.calendInput'));


            };

            $scope.initPage();

            $scope.carTrack = function () {
                $scope.startTime = $('[ng-model="startTime"]').val();
                $scope.endTime = $('[ng-model="endTime"]').val();


                var params = {
                    trailType: 'car',
                    startTime: $scope.startTime,
                    endTime: $scope.endTime,
                    carNo: $scope.carNum
                };
                if (!util.plateNumber.test(params.carNo)) {
                    notify.warn('请输入正确的车牌号码!');
                    return;
                }
                if (params.endTime <= params.startTime) {
                    notify.warn('开始时间时间不得晚于结束时间');
                    return;
                }
                var promise = mapService.queryTrack(params);
                promise.then(function (resp) {
                    if(resp&&resp.data&&resp.data.length>0){
                        _.each(resp.data, function(t){
                           t.address = '卡口1';
                            if(t.dwbh == '320114100000000061'){
                                t.address = '卡口1';
                            }else if(t.dwbh == '320114100000000062'){
                                t.address = '卡口2';
                            }else if(t.dwbh == '320114100000000063'){
                                t.address = '卡口3';
                            }else{
                                t.address = '卡口4';
                            }
                        });
                        $scope.resultLists = resp.data;
                        $scope.resultLists.forEach(function (item, index) {
                            if(!item.address) item.address = '--';
                            if(!item.speend) item.speed = '--';
                            $scope.createMarker(item, index);
                        })
                    }
                }).catch(function () {

                }).finally(function () {

                });



            };

            // 地图上显示对应点位
            $scope.createMarker = function (data, index) {
                var pt = new NPMapLib.Geometry.Point(data.lon, data.lat);
                var size = new NPMapLib.Geometry.Size(32, 32);
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
                mapOpera.map.addOverlay(marker);
                marker.addEventListener(NPMapLib.MAP_EVENT_CLICK, function () {
                    // 获取对应车辆详情


                    var pointer = new NPMapLib.Geometry.Point(data.lon, data.lat);
                    var status = false;

                    $scope.$apply(function () {
                        $scope.resultLists.forEach(function (item) {
                            item.active = false;
                        });
                        $scope.resultLists[index].active = true;
                        var params = {carNo:data.hphm};
                        var promise = mapService.queryCarInfo(params);
                        var content = utils.html.build("carInfo", {});
                        promise.then(function (ret) {
                            $scope.carInfo =  ret.data[0];
                            status = true
                        });
                        if(!!$scope.carInfo){
                            mapOpera.openInfoWindow(pointer, 'point', content, {
                                isIwOne:true,
                                width: 220,
                                height: 170,
                                offset: new NPMapLib.Geometry.Size(0, -20)
                            });
                        }
                    });



                });

            };

            // $scope.getCarInfo = function (carNo) {
            //     console.log(carNo)
            //
            //
            // };

            $scope.chooseItem = function (item) {
                $scope.resultLists.forEach(function (result) {
                    result.active = false;
                });
                item.active = true;
                var lat = item.lat,
                    lon = item.lon,
                    center = new NPMapLib.Geometry.Point(lon, lat),
                    zoom = mapOpera.map.getMaxZoom();
                mapOpera.map.centerAndZoom(center, zoom);
            };


            //离开页面时，销毁地图实例
            $scope.$on('$destroy', function () {
                window.mapSuccess = null;
                window.clickBayonet = null;
                if (window.mapMain) {
                    // mapOpera.cluster.removeOverlayLayer('kakou');
                    window.mapMain.clearOverlays();
                    // mapOpera.param.infoWindowLis = {'camera': [],'wif': [],'kakou': []};
                    window.mapMain.destroyMap();
                    window.mapMain = null;
                }
            });
        }];
        return homeCtrl;
    });
