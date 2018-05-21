define(['controllers/controllers', 'jquery', '/modules/config/basicConfig.js'],function(controllers, $, basicConfig) {
    var zTreeSearchCtrl = ['$scope','$rootScope', function($scope, $rootScope){
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
                    villageCode: '',
                    children:[                   
                        {
                            name:'南桥镇',
                            open:true,
                            // children: basicConfig.villageAllInfo
                            children: [
                                { 
                                    name: '杨王村',
                                    villageCode: '310120101234',
                                    map2d:{ "center": "121.49291636012474, 30.89821546263072" }
                                },
                                { 
                                    name: '江海村',
                                    villageCode: '310120101203',
                                    map2d:{ "center": "121.4307955058236, 30.89933443349524" }
                                }
                            ]
                        },
                        {
                            name:'金汇镇',
                            open:true,
                            children: [
                                { name: '新强村', villageCode: '310120106203' },
                                { name: '金碧汇虹苑小区', villageCode: '310120106005' }
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
            },
            focus: function(e){
                var curZtreeBox = $(e.target).parent().next('.SearchTree');
                curZtreeBox.show()
            },
            keyup: function(){
                this.communityAllInfo = getTreeName($.extend(true,[],communityAllInfoCopy),this.communityName);						
            },
            defaultVillage: function(item){
                $scope.zTreeSearch.communityName = item.name;
                $scope.$emit('setCurVillageAllInfo', item);
                $(".SearchTree").css("display","none");
            },
            communityLocation: function(item){
                $scope.zTreeSearch.communityName = item.name;
                $scope.$emit('setCurVillageAllInfo', item);
                $(".SearchTree").css("display","none");

                map.setZoom(15);
                map.setCenter(new NPMapLib.Geometry.Point(item.map2d.center.split(',')[0], item.map2d.center.split(',')[1]));
                angular.forEach(psArr, function(ps) {
                    if(item.villageCode == ps.villageCode) {
                        ps.setStyle({
                            color: 'red', //颜色
                            fillColor: '#00b99e', //填充颜色
                            weight: 2, //宽度，以像素为单位
                            opacity: 1, //透明度，取值范围0 - 1
                            fillOpacity: 0.01 //填充的透明度，取值范围0 - 1,
                            //lineStyle: NPMapLib.LINE_TYPE_DASH //样式
                        });
                    } else {
                        ps.setStyle({
                            color: '#00b99e', // '#ffc700', //颜色
                            fillColor: '#ff0000', // '#ffc700', //填充颜色
                            weight: 2, //宽度，以像素为单位
                            opacity: 0.01, //透明度，取值范围0 - 1
                            fillOpacity: 0.01 //填充的透明度，取值范围0 - 1,
                            //lineStyle: NPMapLib.LINE_TYPE_DASH //样式
                        });
                    }
                })     
            }
        }

        var communityAllInfoCopy = $.extend(true, [], $scope.zTreeSearch.communityAllInfo);

        $scope.$on('mapLoadSuccessd', function(e, data){
            psArr = data;
        })
    }]
    return zTreeSearchCtrl;
})