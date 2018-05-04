
define(['app', 'controllers/controllers', 'jquery','/modules/config/configFile.js','config/common', 'notify'],
    function (app, controllers, $,configFile,common, notify) {
        var MacCtrl = ['$scope', '$state', '$stateParams','moreService','$compile','$timeout',
            function ($scope,$state,$stateParams,moreService,$compile,$timeout) {
            	 $(".layout").find("div").eq(0).css({"padding-top":"0px"});
            	  //初始化参数
            	  if(localStorage.getItem('toMacParams')){
            	  	$scope.toMacParams= JSON.parse(localStorage.getItem('toMacParams'))
            	  }else{
            	  	return false;
            	  }
            	  //'0001a0b7d6a4417590f42d970c9b3265'
                  $scope.initParams = {
                     pageSize:10,
                     pageNumber:1,
                     carRecordId:$scope.toMacParams.Id
                  };
                  $scope.page1={
                     totalRow:0,
                     count:0
                  };
                   //查询mac
                  $scope.searchMac = function(){
                    $scope.loader = true;
                     var promise = moreService.carRecordMacDetail($scope.initParams);
                        promise.then(function (resp) {
                        	$scope.loader = false;
                           if (resp.resultCode == 200) {
                              $scope.MacData = resp.data.list;
                              $scope.page1.totalRow=resp.data.totalRow          
                           }
                        }).catch(function() {}).finally(function() {
                          $scope.loader = false;
                        });

                  };
                  $scope.searchMac();
            }];
        return MacCtrl;
    });