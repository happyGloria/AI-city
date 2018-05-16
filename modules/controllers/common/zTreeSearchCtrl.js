define(['controllers/controllers', 'jquery'],function(controllers, $) {
    var zTreeSearchCtrl = ['$scope', function($scope){
        //搜索树
        function getTreeName(layer, val) {
            var newLayer = [];
            for(var i = 0, len = layer.length; i < len; i++) {
                var children = layer[i].children;
                if(children && children.length > 0) {
                    layer[i].children = getTreeName(children, val);
                    if(layer[i].children.length == 0) {
                        if(layer[i].name.indexOf(val) !== -1) {
                            newLayer.push(layer[i]);
                        }
                    } else {
                        newLayer.push(layer[i]);
                    }
                } else {
                    if(layer[i].name.indexOf(val) !== -1) {
                        newLayer.push(layer[i]);
                    }
                }
            }
            return newLayer;
        }
        /* 树状搜索 */
        $scope.zTreeSearch = {
            communityAllInfo:[
                {
                    name:'奉贤区',
                    open:true,
                    id:'1',
                    children:[                   
                        {
                            name:'南桥镇',
                            open:true,
                            // children: basicConfig.villageAllInfo
                            children: [
                                { 
                                    name: '杨王村', 
                                    open: true, 
                                    villageCode: '310120101234',
                                    map2d:{
                                        "center": "13517386.928907,3655120.6969577",
                                        "geometry": {
                                            "coordinates": [
                                                [
                                                    [
                                                        [13517181.741499998, 3655202.4809999987],
                                                        [13517239.950000003, 3655056.4306999967],
                                                        [13517312.939199999, 3654907.1657000035],
                                                        [13517425.685000002, 3654917.9033999965],
                                                        [13517425.685000002, 3654930.1750999987],
                                                        [13517506.217699997, 3654930.9421000034],
                                                        [13517507.751699999, 3654944.7476999983],
                                                        [13517525.3922, 3654948.5825999975],
                                                        [13517560.673199996, 3654946.2815999985],
                                                        [13517572.177900001, 3654949.3495000005],
                                                        [13517576.0128, 3654953.1843999997],
                                                        [13517573.711800002, 3654990.7664000019],
                                                        [13517552.2364, 3655198.6174999997],
                                                        [13517444.414300002, 3655159.6626000032],
                                                        [13517380.9142, 3655298.5691],
                                                        [13517182.476300001, 3655212.0502000004],
                                                        [13517181.741499998, 3655202.4809999987]
                                                    ]
                                                ]
                                            ],
                                            "type": "MultiPolygon"
                                        },
                                    }
                                },
                                { 
                                    name: '江海村', 
                                    open: true, 
                                    villageCode: '310120101203',
                                    map2d:{
                                        "center": "13516948.194300003,3655262.3752999976"
                                    }
                                }
                            ]
                        },
                        {
                            name:'金汇镇',
                            open:true,
                            children: [
                                { name: '金星村', open: true, villageCode: '310120106203' },
                                { name: '金碧汇虹苑小区', open: true, villageCode: '310120106005' }
                            ]
                        },
                    ]
                }
            ],
            open: function(item){
                item.open = !item.open;
                $scope.$apply();
            },
            blur: function(){
                console.log('trigger blur')
                // if($("#zTreeVillage").is(":visible")){
                //     $("#zTreeVillage").css("display","none");
                // }
            },
            focus: function(){
                console.log('trigger focus...')
                $("#zTreeVillage").css("display","block");
                // $(".slimScrollDiv").css("display","block");
                // 添加滚动条
                // var slimScrollDivW = $('.slimScrollDiv').width();
                // slimScrollDivW = $('.slimScrollDiv').children().first().width();
                // $(".zTreeVillage").slimScroll({
                //     width: '',
                //     height: '2.5rem',
                //     size: '8px', //组件宽度
                //     color: '#7E7D7D', //滚动条颜色#0565b0
                //     opacity: 0.1, //滚动条透明度
                //     alwaysVisible: false, //是否 始终显示组件
                //     railVisible: true, //是否 显示轨道
                //     railColor: '#0565b0', //轨道颜色
                //     railOpacity: 0.1, //轨道透明度
                //     railClass: 'slimScrollRail', //轨道div类名 
                //     barClass: 'slimScrollBar', //滚动条div类名
                //     wrapperClass: 'slimScrollDiv', //外包div类名
                //     allowPageScroll: false, //是否 使用滚轮到达顶端/底端时，滚动窗口
                //     wheelStep: 20, //滚轮滚动量
                //     borderRadius: '7px', //滚动条圆角
                //     railBorderRadius: '7px' //轨道圆角
                // });
            },
            keyup: function(){
                this.communityAllInfo = getTreeName($.extend(true,[],communityAllInfoCopy),this.communityName);						
            },
            communityLocation: function(item){
                // $scope.villageCode
                $scope.$emit('setCurVillageAllInfo', item);
                $("#zTreeVillage").css("display","none");
                // $(".slimScrollDiv").css("display","none");
                map.setZoom(18);
                map.setCenter(new NPMapLib.Geometry.Point(item.map2d.center.split(',')[0], item.map2d.center.split(',')[1]));
                // var searchFlag = true;
                // angular.forEach(psArr, function(ps) {
                //     if(searchFlag){
                //         if(item.villageCode == ps.villageCode) {
                //             ps.setStyle({
                //                 color: 'red', //颜色
                //                 fillColor: '#00b99e', //填充颜色
                //                 weight: 2, //宽度，以像素为单位
                //                 opacity: 1, //透明度，取值范围0 - 1
                //                 fillOpacity: 0.01 //填充的透明度，取值范围0 - 1,
                //                 //lineStyle: NPMapLib.LINE_TYPE_DASH //样式
                //             })
                //         }
                //     }
                // })
            }
        }
    }]
    return zTreeSearchCtrl;
})