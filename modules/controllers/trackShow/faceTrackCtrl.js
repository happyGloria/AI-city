/**
 * Created by lihouhua on 2016/4/25.
 */
define(['controllers/controllers', 'config/mapConfig', 'config/common', '/lib/other/socket.io.js', 'layer', 'yituFace', 'player', 'npgis2', 'zTree'],
    function(controllers, mapConfig, util, io, layer, yituFace) {
        var homeCtrl = ['$scope', '$compile', 'mapService', 'homePageService', '$http','communityAllService', 'communityRightModuleService', function($scope, $compile, mapService, homePageService, $http,communityAllService, communityRightModuleService) {
            $(".layout").find("div").eq(0).css({
                "padding-top": "0px"
            });
            var markerArr = [];
            //是否有带照片进当前页面
            var flag = false;
            $scope.facePath = {
                arr: [],
                img: "/template/img/user-man.png"
            };
            var faceImgUrl = {
                path: "http://15.128.21.207/bimg_upload/",
                path64: "data:image/png;base64,"
            };
            if (localStorage.getItem("faceTrack")) {
                $scope.photoStr = localStorage.getItem("faceTrack");
                $scope.facePath.img = faceImgUrl.path64 + $scope.photoStr;
                //localStorage.removeItem("faceTrack");
                flag = true;
            }
            if (localStorage.getItem("faceData")) {
                $scope.faceData = JSON.parse(localStorage.getItem("faceData"));
                //localStorage.removeItem("faceData");
            }
            var ICON_SMALL = 26; //图层小图标
            var ICON_NORMAL = 30; //图层大图标
            var ICON_CLUSTER = 44; //图层聚合图标
            var FONT_SIZE = 10;
            var mapObj = null;
            //当地图初始化完成时调用
            window.mapSuccess = function(map) {
                // mapOpera.cluster.removeOverlayLayer('kakou');
                var ctr = new NPMapLib.Controls.MousePositionControl();
                map.addControl(ctr);
                // kakouLayer = null;
                map.setZoom(15);
                setTimeout(function() {
                    map.setCenter(new NPMapLib.Geometry.Point(13517414.427704, 3655076.5945409));
                }, 1000);
                mapObj = map;
            };


            //初始化地图
            setTimeout(function() {
                var theme = sessionStorage.getItem('theme') || 'default';
                if (theme == 'dark') {
                    mapConfig.config.VectorUrl = mapConfig.config.DarkUrl;
                }
                mapOpera.init('faceTrackId', mapConfig.config);
            }, 200);

            // 折叠筛选条件
            $scope.toggleFilter = function() {
                $('.left-filter').slideToggle(300);
                $('.head-btn').toggleClass('arrow-up');
            };
            // 初始化页面
            $scope.initPage = function() {
                // 相似度
                $scope.similarityOptions = {
                    list: [
                        ['90', '90'],
                        ['85', '85',true],
                        ['80', '80'],
                        ['75', '75'],
                        ['70', '70'],
                        ['65', '65']
                    ],
                    current: '85'
                };
                var similarity = DropDownList.create({
                    container: $('.similarity'),
                    attrs: {
                        id: 'similarity', // 给dropdownlist一个id
                        column: 3, // 展示4行
                        width: 203, // 宽度为150px
                        height: 30 // 每个option选项的高度
                    },
                    options: $scope.similarityOptions.list
                });
                similarity.change(function() {
                    $scope.similarityOptions.current = this.value;
                });
                if ($scope.faceData && $scope.faceData.length > 0) {
                    for (var i = 0; i < $scope.faceData.length; i++) {
                        debugger;
                        if ($scope.faceData[0].LogTime.substr(0, 10) == $scope.faceData[$scope.faceData.length - 1].LogTime.substr(0, 10)) {
                            $scope.endTime = util.changeDayToString(util.addDays(new Date($scope.faceData[i].LogTime.substr(0, 10)), 1));
                            $scope.startTime = $scope.faceData[i].LogTime.substr(0, 10);
                        } else {
                            if (i == 0) {
                                $scope.endTime = $scope.faceData[i].LogTime.substr(0, 10);
                            }
                            if (i == $scope.faceData.length - 1) {
                                $scope.startTime = $scope.faceData[i].LogTime.substr(0, 10);
                            }
                        }
                    }
                } else {
                    $scope.startTime = util.changeDayToString(util.addDays(new Date(), -7)); //初始化查询的开始日期
                    $scope.endTime = util.changeDayToString(util.addDays(new Date(), 1)); //初始化查询的结束日期
                }
                util.initDayPicker($('#startTime'), {
                    onSelectDate: function(value, dom) {
                        debugger;
                        if (new Date($(dom).val()).getTime() > new Date($scope.endTime).getTime()) {
                            notify.warn("开始时间不能大于结束时间");
                            $(dom).val($scope.startTime);
                            return;
                        }
                        $scope.startTime = $(dom).val();
                    }
                });
                util.initDayPicker($('#endTime'), {
                    onSelectDate: function(value, dom) {
                        debugger;
                        if (new Date($scope.startTime).getTime() > new Date($(dom).val()).getTime()) {
                            notify.warn("开始时间不能大于结束时间")
                            $(dom).val($scope.endTime);
                            return;
                        }
                        $scope.endTime = $(dom).val();
                    }
                });
            };

            $scope.initPage();
            $scope.faceFeature = null;
            $scope.uploadImg = function() {
                // $('#imageFile').trigger('click');
                $('#imageFile').change(function() {
                    debugger;
                    flag = false;
                    inputToBase64(this, uploadPicFun);
                });

            };

            //上传图片到服务器
            function uploadPicFun(picBase64) {
                // var param = {
                //     picture_image_content_base64: picBase64,
                // };
                //yituFace.yitu_upLoadPic(param, function(resp) {
                    // debugger;
                    // if (resp.rtn != 0) {
                    //     alert(resp.message);
                    //     return;
                    // }
                    // $scope.$apply(function() {
                    //     $scope.facePath.img = yituFace.yituFace_Pic + base64encode(resp.results[0].face_image_uri);
                    //     $scope.facePath.face_image_id = resp.results[0].face_image_id;
                        if (flag) {
                            $scope.contrasFaceFun(picBase64);
                          }
                    // })
                //})
            }

            //input选中的图片转成base64
            function inputToBase64(input_file, callBack) {
                /*input_file：文件按钮对象*/
                /*get_data: 转换成功后执行的方法*/
                debugger;
                if (typeof(FileReader) === 'undefined') {
                    alert("抱歉，你的浏览器不支持 FileReader，不能将图片转换为Base64，请使用现代浏览器操作！");
                } else {
                    try {
                        /*图片转Base64 核心代码*/
                        var file = input_file.files[0];
                        //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件  
                        if (!/image\/\w+/.test(file.type)) {
                            alert("请确保文件为图像类型");
                            return false;
                        }
                        var reader = new FileReader();
                        reader.onload = function() {
                            var base64 = this.result.split(",")[1];
                            callBack(base64);
                        }
                        reader.readAsDataURL(file);
                    } catch (e) {
                        alert('图片转Base64出错啦！' + e.toString())
                    }
                }
            }

            //查询人脸检索接口,当前接口暂时不能按时间查询
            $scope.contrasFaceFun = function(picBase64) {
                debugger
                $.each(markerArr,function(i,v){
                    mapOpera.map.removeOverlay(v);
                })
                // if(!$scope.facePath.face_image_id){
                //     alert("请先上传图片")
                //     return;
                // }
                function contrastFaceSun(){
                    var param = {
                    "order": { "timestamp": -1 },
                    "start": 0,
                    "limit": 100,
                    "condition":{
                        "timestamp":{
                            "$gte":new Date($scope.startTime).getTime()/1000,
                            "$lte":new Date($scope.endTime).getTime()/1000
                        }
                    },
                    "retrieval": {
                        "face_image_id": $scope.facePath.face_image_id,
                        "picture_image_content_base64":picBase64,
                        "threshold": Number($scope.similarityOptions.current),//相似度
                        "using_ann": true,
                        "camera_ids": $scope.yituIdArr
                    }
                };
                yituFace.yitu_contrastFace(param, function(data) {
                    if (0 == data.rtn) {
                        debugger;
                            $.each(data.results, function(i, v) {
                                v.name = $scope.yituIdToCameraNameObj[v.camera_id];
                                // getyitu_camerasList(v,cameraList);
                                if (v.face_image_uri && v.face_image_uri != "") {
                                    v.faceUrl = yituFace.yituFace_Pic + base64encode(v.face_image_uri);
                                }
                                if (v.picture_uri && v.picture_uri != "") {
                                    v.picUrl = yituFace.yituFace_Pic + base64encode(v.picture_uri);
                                } else {
                                    v.picUrl = "";
                                }
                                v.captureTime = moment(v.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
                                v.similarity = Number(v.similarity).toFixed(2);
                                v.lon = $scope.yituIdLon[v.camera_id].lon;
                                v.lat = $scope.yituIdLon[v.camera_id].lat;
                            });
                            $scope.$apply(function() {
                                $scope.facePath.arr = data.results;
                                var len = $scope.facePath.arr.length;
                                // if (len > 20) {
                                //     $scope.facePath.arr = $scope.facePath.arr.slice(0, 20);
                                // };
                                angular.forEach($scope.facePath.arr,function(data){
                                      getCamera(data);
                                });
                                markerArr = [];
                                angular.forEach($scope.facePath.arr,function(data,index){
                                      $scope.createMarker(data, index);
                                });
                            });
                    } else {
                        alert(data.message);
                    }
                });
                }
                if(!$scope.yituIdArr || $scope.yituIdArr.length == 0){
                    searchYituCamera(contrastFaceSun);
                    return;
                }
                contrastFaceSun();
            };
            function getCamera(obj){
                   angular.forEach($scope.cameraSelectList,function(data){        
                        if(obj.camera_id==(data.ytCameraId+'@DEFAULT')){
                                obj.lon=data.lon;
                                obj.lat=data.lat;
                         }
                    });
                }
            $scope.uploadImg();

            function getBlobBydataURI(base64, type) {
                var binary = atob(base64);
                var array = [];
                for (var i = 0; i < binary.length; i++) {
                    array.push(binary.charCodeAt(i));
                }
                return new Blob([new Uint8Array(array)], {
                    type: type
                });
            }

            socket = null;
            //获取摄像机经纬度
            $scope.queryCamera = function() {
                debugger
                console.log("111")
                var promise = mapService.queryCameraId();
                promise.then(function(resp) {
                    if (resp.resultCode == 200) {
                        console.log("222")
                        $scope.cameraList = resp.data;
                        console.log($scope.cameraList)
                        $scope.cameraMap = {};
                        $scope.cameraList.forEach(function(item) {
                            //id
                            $scope.cameraMap[item.F_ID] = item;
                            // console.log("2")
                            // console.log($scope.cameraMap)
                        });
                        console.log($scope.cameraMap)
                        console.log("cameraMap")
                    }

                }).catch(function() {

                }).finally(function() {

                });
            };
            // 地图绘制覆盖物相关操作
            $scope.createMarker = function(data, index, clikced) {
                //13518099.375138,3659025.0447834
                //data.lon, data.lat
                var pt = new NPMapLib.Geometry.Point(data.lon, data.lat);
                if (clikced) {
                    var size = new NPMapLib.Geometry.Size(40, 40);
                } else {
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
                markerArr.push(marker);
                marker.addEventListener(NPMapLib.MAP_EVENT_CLICK, function() {
                    // 点击回调
                    $scope.$apply(function() {
                        $scope.facePath.arr.forEach(function(item) {
                            item.active = false;
                        });
                        $scope.facePath.arr[index].active = true;
                        $scope.chooseMarker($scope.facePath.arr[index], index);
                    });
                });
                lastClickIconMarker = {};
                lastClickIconMarker.marker = marker;
                lastClickIconMarker.item = data;
                lastClickIconMarker.index = index;
            };


            // 列表信息点击，返回当前点位中心

            $scope.chooseMarker = function(item, $index) {
                debugger;
                $scope.currentFace = item;
                $scope.currentIndex = $index;
                layer.open({
                    type: 1,
                    title: '全景图',
                    maxmin: false,
                    area: ['8rem', '5.50rem'],
                    shadeClose: true,
                    content: '', //$('#layer-org-create'),
                    success: function(layero) {
                        angular.element(layero).find('.layui-layer-content').addClass('layer-drop').append($compile($('#fullscreen-layer').html())($scope));
                    },
                    end: function() { //层销毁后触发的回调

                    },
                    yes: function(index, layero) { //确定

                    },
                    cancel: function(index, layero) { //取消

                    }
                });
            };
            var lastClickIconMarker = null;
            $scope.positionMarker = function(item, $index) {
                debugger;
                if (!item.lat || !item.lon) {
                    return;
                }
                var lat = item.lat,
                    lon = item.lon,
                    center = new NPMapLib.Geometry.Point(lon, lat),
                    zoom = mapOpera.map.getMaxZoom();
                $scope.facePath.arr.forEach(function(result) {
                    result.active = false;
                });
                item.active = true;
                if (!!lastClickIconMarker) {
                    mapOpera.map.removeOverlay(lastClickIconMarker.marker);
                    $scope.createMarker(lastClickIconMarker.item, lastClickIconMarker.index);
                }
                $scope.createMarker(item, $index, true);
                mapOpera.map.centerAndZoom(center, zoom)
            }
            $scope.pre = function() {
                if (!!$scope.facePath.arr.length) {
                    if ($scope.currentIndex === 0) {
                        layer.msg('已经是第一张了！');
                        return false;
                    } else {
                        --$scope.currentIndex;
                        $scope.currentFace = $scope.facePath.arr[$scope.currentIndex];
                        $scope.facePath.arr.forEach(function(item) {
                            item.active = false;
                        });
                        $scope.facePath.arr[$scope.currentIndex].active = true;

                    }
                }
            }
            $scope.next = function() {
                if (!!$scope.facePath.arr.length) {
                    if ($scope.currentIndex === $scope.facePath.arr.length) {
                        layer.msg('已经是最后一张了！');
                        return false;
                    } else {
                        ++$scope.currentIndex;
                        $scope.currentFace = $scope.facePath.arr[$scope.currentIndex];
                        $scope.facePath.arr.forEach(function(item) {
                            item.active = false;
                        });
                        $scope.facePath.arr[$scope.currentIndex].active = true;
                    }
                }
            }
            //离开页面时，销毁地图实例
            $scope.$on('$destroy', function() {
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
            //查询依图摄像机
            function searchYituCamera(callBack){
                var req = {
                        villageCode:'',
                        cameraName:'',
                        cameraType:'5',//TODO换成和依图对接的类型5
                        pageNumber: 1,
                        pageSize: 999,
                     }
                     $scope.cameraSelectList = [];
                    //抓拍摄像机ID和摄像机name的对应关系
                    $scope.yituIdToCameraNameObj = {};
                    //抓拍摄像机id数组
                    $scope.yituIdArr = [];
                    //抓拍摄像机对象的经纬度
                    $scope.yituIdLon = {};
                    communityAllService.queryMapInfo('camera',req).then(function(resp) {
                    if(resp.resultCode == '200') {
                        
                        angular.forEach(resp.data.list,function(data){
                            if(data.ytCameraId){
                                var obj={
                                    F_ID:data.ytCameraId,
                                    F_Name:data.name,
                                    lon:data.lon,
                                    lat:data.lat
                                }
                             $scope.cameraSelectList.push(obj);
                             $scope.yituIdToCameraNameObj[obj.F_ID] = obj.F_Name;
                             $scope.yituIdArr.push(obj.F_ID);
                             $scope.yituIdLon[obj.F_ID] = {
                                lon:data.lon,
                                lat:data.lat
                             };
                            }
                        });
                        callBack();
                    }
                    }).catch(function() {}).finally(function() {});
            }
            $scope.cameraSelectList=[];
                cameraInit();
                function cameraInit(){
                    var req = {
                        villageCode:'',
                        cameraName:'',
                        cameraType: '5',
                        pageNumber: 1,
                        pageSize: 999,
                     }
                    communityAllService.queryMapInfo('camera',req).then(function(resp) {
                    if(resp.resultCode == '200') {
                        debugger
                       $scope.cameraSelectList= resp.data.list;
                       debugger
                       uploadPicFun($scope.photoStr);
                    }
                    }).catch(function() {}).finally(function() {});
                }
        }];
        return homeCtrl;
    });
