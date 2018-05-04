/**
 * camera
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery','/modules/config/configFile.js','config/common', 'notify'],
    function (app, controllers, $,configFile,common, notify) {
        var doorRecordCtrl = ['$scope', '$state', '$stateParams', 'moreService','$compile','$timeout',
            function ($scope,$state,$stateParams,moreService,$compile,$timeout) {
                $(".layout").find("div").eq(0).css({"padding-top":"0px"});
                // $scope.pageFlag = false;
               /*
               *camera
               */
                var villageCode = $stateParams.villageCode;
                  //初始化参数
                  $scope.initParams = {
                     pageSize:10,
                     pageNumber:1,
                     name:"",
                     isOnline:"", 
                     cameraPort:"",
                     villageCode:villageCode,
                     cameraType:""
                  };
                  $scope.page1={
                     totalRow:0,
                     count:0
                  };
                  $scope.IsOnlineArr = [
                    {
                      code:"",
                      name:"请选择"
                    },{
                      code:"1",
                      name:"正常"
                    },{
                      code:"0",
                      name:"异常"
                    }
                  ];
                  $scope.cameraTypeArr =[
                    {
                      code:"1",
                      name:"普通摄像机"
                    },{
                      code:"2",
                      name:"人脸摄像机"
                    },
                    {
                      code:"3",
                      name:"车辆摄像机"
                    }
                  ];
                  //查询1
                  $scope.cameraList = function(value){
                     $scope.loader = true;
                     if (value) {
                            $scope.initParams.pageNumber = 1;
                        }
                     var req1 = {
                        pageSize:$scope.initParams.pageSize,
                        pageNumber:$scope.initParams.pageNumber,
                        name:$scope.initParams.name,
                        isOnline:$scope.initParams.isOnline, 
                        cameraPort:$scope.initParams.cameraPort,
                        villageCode:$scope.initParams.villageCode,
                        cameraType:$scope.initParams.cameraType
                     };
                     var promise = moreService.cameraList(req1);
                        promise.then(function (resp) {
                           if (resp.resultCode == 200) {
                              $scope.cameraData = resp.data.list;
                              $scope.page1.totalRow=resp.data.totalRow          
                           }
                        }).catch(function() {}).finally(function() {
                          $scope.loader = false;
                        });
                  };
                  $scope.cameraList();

                  // $scope.clickUntreated = function(item,$index){
                  //   debugger
                  //   item.IsOnline = '1';
                  //   // $scope.$apply()   
                  // }
              
               

              

            }
        ];
        return doorRecordCtrl;
    });