/**
 * 
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery','/modules/config/configFile.js','config/common', 'notify'],
    function (app, controllers, $,configFile,common, notify) {
        var doorRecordCtrl = ['$scope', '$state', '$stateParams', 'moreService','$compile',
            function ($scope,$state,$stateParams,moreService,$compile) {
                $(".layout").find("div").eq(0).css({"padding-top":"0px"});
               /*
               *
               */
                  if(localStorage.getItem("carType")){
                    $scope.type = localStorage.getItem("carType");
                    console.log($scope.type)
                    // $scope.macTrack();
                    localStorage.removeItem("carType");
                  }
                  //inCount
                  //初始化参数
                  $scope.initParams = {
                     pageSize:8,
                     pageNumber:1,
                     type:$scope.type //"inCount"
                  };
                  $scope.page1={
                     totalRow:0,
                     count:0
                  };
                  
                  //查询1
                  $scope.carStatus = function(value){
                    debugger
                    $scope.loader = true;
                     if (value) {
                            $scope.initParams.pageNumber = 1;
                        }
                     var req1 = {
                        pageSize:$scope.initParams.pageSize,
                        pageNumber:$scope.initParams.pageNumber,
                        type:$scope.initParams.type,
                     };
                     var promise = moreService.queryCarStatus(req1);
                        promise.then(function (resp) {
                           if (resp.resultCode == 200) {
                            debugger
                              $scope.carStatusData = resp.data.list;
                              $scope.page1.totalRow=resp.data.totalRow          
                           }
                        }).catch(function() {}).finally(function() {
                          $scope.loader = false;
                        });

                  };
                  $scope.carStatus();

                  //跳
                  $scope.toCatList = function(index){
                    var car = index;
                    localStorage.setItem('PlateNumber',car);
                    // var title = "从业人员详情";
                    url = window.location.href.split("/#")[0]+"/#/index/communityCar/";
                    window.open(url);
                  //   var moreLayer = null;
                  //   moreLayer = layer.open({
                  //   type: 2,
                  //   title:title,
                  //   skin: 'dark-layer',
                  //   shade: 0.7,
                  //   shadeClose: true,
                  //   area: ['100%', '100%'],
                  //   anim: 2,
                  //   content: [url, 'yes'], //iframe的url，no代表不显示滚动条
                  //   end: function(){ //此处用于演示
                  //   },
                  //   success:function(layero, index){
                  //       debugger
                  //       //$(layero).append(iframe);
                  //   }
                  // });
                };
              
               

              

            }
        ];
        return doorRecordCtrl;
    });