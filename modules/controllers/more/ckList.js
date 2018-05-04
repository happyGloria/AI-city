/**
 * 消防
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify', 'laydate'],
  function(app, controllers, $, configFile, common, notify, laydate) {
    var ckRecordCtrl = ['$scope', '$state', '$stateParams','moreService', '$compile', '$timeout',
      function($scope, $state, $stateParams, moreService, $compile, $timeout) {
        $(".layout").find("div").eq(0).css({
          "padding-top": "0px"
        });
        var villageCode = $stateParams.villageCode || '';
        $scope.villageName = configFile.communityCodeToName[villageCode];
        function init() {
          ckAlarm();
        };
        /**
         * ck报警
         */
        function ckAlarm() {
          $scope.fireRecordParams = {
            userName: "",
            userAddress: "",
            pageSize: 10,
            pageNumber: 1
          };
          $scope.fireRecordPage = {
            totalRow: 0,
            count: 0
          };

          $scope.ckAlarmList = function(value) {
            $scope.loader = true;
            if (value) {
              $scope.fireRecordParams.pageNumber = 1;
            }
            var req1 = {
              userName: $scope.fireRecordParams.userName,
              userAddress: $scope.fireRecordParams.userAddress,
              pageSize: $scope.fireRecordParams.pageSize,
              pageNumber: $scope.fireRecordParams.pageNumber
            };

            var promise = moreService.ckAlarmList(req1);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                $scope.ckAlarmData = resp.data.list;
                $scope.fireRecordPage.totalRow = resp.data.totalRow
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.ckAlarmList();
        }

        /**
         * [ck设备]
         */
        function ckDeviceFun() {
          $scope.fireDeviceParams = {
            userName: "",
            userAddress: "",
            pageSize: 10,
            pageNumber: 1
          };
          $scope.fireDevicePage = {
            totalRow: 0,
            count: 0
          };
          $scope.ckDeviceListAll = function(value) {
            $scope.loader = true;
            if (value) {
              $scope.fireDeviceParams.pageNumber = 1;
            }
            var req2 = {
                userName: $scope.fireDeviceParams.userName,
                userAddress: $scope.fireDeviceParams.userAddress,
                pageSize: $scope.fireDeviceParams.pageSize,
                pageNumber: $scope.fireDeviceParams.pageNumber
            };
            var promise = moreService.ckDeviceList(req2);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                $scope.ckDeviceData = resp.data.list;
                $scope.fireDevicePage.totalRow = resp.data.totalRow
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.ckDeviceListAll();
        }

        /**
         * tab
         */
        $scope.showTab = {
            "fireRecord" : true,
            "fireDevice" : false,
        }
        $scope.changeTab = function(tabName,clickTab){
            for(var key in $scope.showTab){
                $scope.showTab[key] = false;
            }
            $scope.showTab[tabName] = true;

            if (tabName == "fireRecord") {
              ckAlarm();
            }
            if (tabName == "fireDevice") {
              ckDeviceFun();
            }
        }

        init();

      }
    ];
    return ckRecordCtrl;
  });