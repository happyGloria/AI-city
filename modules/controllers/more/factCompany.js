/**
 * 实有单位
 * Created by mww on 2018/01/17.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify'],
  function(app, controllers, $, configFile, common, notify) {
    var doorRecordCtrl = ['$scope', '$state', '$stateParams', 'moreService', '$compile',
      function($scope, $state, $stateParams, moreService, $compile) {
        $(".layout").find("div").eq(0).css({
          "padding-top": "0px"
        });
        /*
         *
         */
        var villageCode = $stateParams.villageCode || '';
        $scope.villageName = configFile.communityCodeToName[villageCode];
        $scope.initParams = {
          pageSize: 10,
          pageNumber: 1,
          villageCode: villageCode,
          companyName: ""
        };
        $scope.page1 = {
          totalRow: 0,
          count: 0
        };

        $scope.factCompany = function(value) {
          $scope.loader = true;
          if (value) {
            $scope.initParams.pageNumber = 1;
          }
          var req1 = {
            pageSize: $scope.initParams.pageSize,
            pageNumber: $scope.initParams.pageNumber,
            villageCode: $scope.initParams.villageCode,
            companyName: $scope.initParams.companyName
          };
          var promise = moreService.factCompanyList(req1);
          promise.then(function(resp) {
            if (resp.resultCode == 200) {
              $scope.factCompanyData = resp.data.list;
              $scope.page1.totalRow = resp.data.totalRow
            }
          }).catch(function() {}).finally(function() {
            $scope.loader = false;
          });

        };
        $scope.factCompany();

        //跳--从业人员详情
        $scope.layerPeopleDetail = function(index) {
          debugger
          var companyid = index;
          var key = "id_" + villageCode;
          localStorage.setItem(key, companyid);
          var title = "从业人员详情";
          url = window.location.href.split("/#")[0] + "/#/index/peopleDetail/" + villageCode;
          window.open(url);

        };

      }
    ];
    return doorRecordCtrl;
  });