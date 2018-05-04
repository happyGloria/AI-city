/**
 * car
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery','/modules/config/configFile.js','config/common', 'notify'],
    function (app, controllers, $,configFile,common, notify) {
        var doorRecordCtrl = ['$scope', '$state', '$stateParams', 'moreService','$compile','$timeout',
            function ($scope,$state,$stateParams,moreService,$compile,$timeout) {
                $(".layout").find("div").eq(0).css({"padding-top":"0px"});
                var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"'+'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
                var villageCode = $stateParams.villageCode;
               //初始化参数
               $scope.initParams = {
                  pageSize:10,
                  pageNumber:1,
                  villageCode:villageCode
               };
               $scope.page1={
                  totalRow:0,
                  count:0
               };

               //查询开门记录
               $scope.queryFireStation = function(value){
                $scope.loader = true;
                 if (value) {
                            $scope.initParams.pageNumber = 1;
                        }
                 var req1 = {
                    pageSize:$scope.initParams.pageSize,
                    pageNumber:$scope.initParams.pageNumber,
                    villageCode:$scope.initParams.villageCode
                 };
                  
                  var promise = moreService.getFireStation(req1);
                     promise.then(function (resp) {
                        if (resp.resultCode == 200) {
                           $scope.jingGaiData = resp.data.list;
                           $scope.page1.totalRow=resp.data.totalRow          
                        }
                     }).catch(function() {}).finally(function() {
                      $scope.loader = false;
                     });
               };
               $scope.queryFireStation();
              
            }
        ];
        return doorRecordCtrl;
    });