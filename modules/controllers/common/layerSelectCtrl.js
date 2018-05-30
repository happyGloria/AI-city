define(['controllers/controllers', 'jquery', '/modules/config/basicConfig.js'],function(controllers, $, basicConfig) {
    var layerSearchCtrl = ['$scope', function($scope){
        $scope.layerList = basicConfig.layerList;
        //向下查找
        function getLayerisChecked(layer, isChecked) {
            for(var i = 0, len = layer.length; i < len; i++) {
                layer[i].isChecked = isChecked;
                var childs = layer[i].child;
                if(childs && childs.length > 0) {
                    layer[i].child = getLayerisChecked(childs, isChecked);
                } else {
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
                    var childs = layer[i].child;
                    if(childs && childs.length > 0) {
                        layer[i].isChecked = getLayerisCheckedAll(childs);
                    }
                }
                return layer;
            } else {
                for(var i = 0, len = layer.length; i < len; i++) {
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
            if(layer.id == 0){
                if(layer.isChecked == 2) {
                    angular.forEach(psArr, function(ps) {
                        ps.setStyle({
                            color: '#00b99e', // '#ffc700', //颜色
                            fillColor: '#00b99e', // '#ffc700', //填充颜色
                            weight: 0, //宽度，以像素为单位
                            opacity: 0, //透明度，取值范围0 - 1
                            fillOpacity:0.001 //填充的透明度，取值范围0 - 1,
                            //lineStyle: NPMapLib.LINE_TYPE_DASH //样式
                        });
                    })
                }else{
                    angular.forEach(psArr, function(ps) {
                        ps.setStyle({
                            color: '#00b99e', // '#ffc700', //颜色
                            fillColor: '#00b99e', // '#ffc700', //填充颜色
                            weight: 2, //宽度，以像素为单位
                            opacity: 0, //透明度，取值范围0 - 1
                            fillOpacity: 0.3 //填充的透明度，取值范围0 - 1,
                            //lineStyle: NPMapLib.LINE_TYPE_DASH //样式
                        });
                    })
                }
            }
            $scope.laterArr = [];
            if(layer.isChecked == 1 || layer.isChecked == 0) {
                layer.isChecked = 2;
                if(layer.child) {
                    layer.child = getLayerisChecked(layer.child, 2);
                } else {
                    $scope.toggleLayer(layer.id,layer.isChecked);
                }
            } else {
                layer.isChecked = 0;
                if(layer.child) {
                    layer.child = getLayerisChecked(layer.child, 0);
                } else {
                    $scope.toggleLayer(layer.id,layer.isChecked);
                }
            }
            $scope.layerList = getLayerisCheckedAll($scope.layerList, "frist");
        };
        
        $scope.$on('mapLoadSuccessd', function(e, data){
            psArr = data;
        })
        $scope.$on('toggleLayerMethod', function(e, data){
            $scope.toggleLayer = data
            // 地图加载完成后，小区勾选高度显示
            $scope.selectLayer({id: 0, isChecked: 0})
        })
    }]
    return layerSearchCtrl;
})