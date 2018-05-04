/**
 * Mac
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify', 'laydate'],
  function(app, controllers, $, configFile, common, notify, laydate) {
    var doorRecordCtrl = ['$scope', '$state', '$stateParams', 'moreService', '$compile', '$timeout',
      function($scope, $state, $stateParams, moreService, $compile, $timeout) {
        $(".layout").find("div").eq(0).css({
          "padding-top": "0px"
        });
        var villageCode = $stateParams.villageCode;
        $scope.villageName = configFile.communityCodeToName[villageCode];
        function init(){
          var key = "macParam" + villageCode;
          if (localStorage.getItem(key)) {
            $scope.macRecordParams = JSON.parse(localStorage.getItem(key));
            localStorage.removeItem(key);
          }
          macRecordFun();
        }
        /**
         * mac记录
         */
        function macRecordFun() {
          $scope.macRecordParams = $scope.macRecordParams || {
            villageCode: villageCode,
            startTime: "",
            endTime: "",
            pageSize: 10,
            pageNumber: 1,
            pushType: 4,
            peopleName: "",
            credentialNo: "",
            phoneNo: "",
            deviceName: "",
            userMac: ""
          };
          $scope.macRecordPage = {
            totalRow: 0,
            count: 0
          };

          laydate.render({
            elem: '#startTime',
            type: "datetime",
            value: "",
            done: function(value, date, endDate) {
              debugger
              $scope.macRecordParams.startTime = value;
            }
          });

          laydate.render({
            elem: '#endTime',
            type: "datetime",
            value: "",
            done: function(value, date, endDate) {
              debugger
              $scope.macRecordParams.endTime = value;
            }
          });

          $scope.captrueMacList = function(value) {
            debugger;
            $scope.loader = true;
            if (value) {
              $scope.macRecordParams.pageNumber = 1;
            }
            var req1 = {
              villageCode:$scope.macRecordParams.villageCode,
              startTime: $scope.macRecordParams.startTime,
              endTime: $scope.macRecordParams.endTime,
              pageSize: $scope.macRecordParams.pageSize,
              pageNumber: $scope.macRecordParams.pageNumber,
              pushType: $scope.macRecordParams.pushType,
              peopleName: $scope.macRecordParams.peopleName,
              credentialNo: $scope.macRecordParams.credentialNo,
              phoneNo: $scope.macRecordParams.phoneNo,
              deviceName: $scope.macRecordParams.deviceName,
              userMac: $scope.macRecordParams.userMac
            };

            var promise = moreService.captrueMacList(req1);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                $scope.macData = resp.data.wifi.list;
                $scope.macRecordPage.totalRow = resp.data.wifi.totalRow;
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.captrueMacList();
        }

        /**
         * mac设备
         */
        function macDeviceFun() {
          $scope.macDeviceParams = {
            pageSize: 10,
            pageNumber: 1,
            villageCode: villageCode,
            name: "",
            detailAddress: "",
            deviceId: "",
            apName: "",
          };
          $scope.macDevicePage = {
            totalRow: 0,
            count: 0
          };
          $scope.wifiList = function() {
            $scope.loader = true;
            var req2 = {
              pageSize: $scope.macDeviceParams.pageSize,
              pageNumber: $scope.macDeviceParams.pageNumber,
              villageCode: $scope.macDeviceParams.villageCode,
              deviceName: $scope.macDeviceParams.name,
              detailAddress: $scope.macDeviceParams.detailAddress,
              deviceId: $scope.macDeviceParams.deviceId,
              apName: $scope.macDeviceParams.apName,
            };
            var promise = moreService.wifiList(req2);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                $scope.wifiListData = resp.data.list;
                $scope.macDevicePage.totalRow = resp.data.totalRow
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.wifiList();
        }

        /**
         * tab
         */
        $scope.showTab = {
          "macRecord": true,
          "macDevice": false,
        }
        $scope.changeTab = function(tabName, clickTab) {
          debugger;
          for (var key in $scope.showTab) {
            $scope.showTab[key] = false;
          }
          $scope.showTab[tabName] = true;

          if (tabName == "macRecord") {
            macRecordFun();
          }
          if (tabName == "macDevice") {
            macDeviceFun();
          }
        }

        //
        $scope.toPeopleFile = function(item) {
          if (!item.ZJHM) {
            notify.warn("暂无此人身份证号码");
            return;
          }
          window.open(window.location.href.split("/#")[0] + "/#/index/peopleFile/:" + item.ZJHM + '/' + villageCode)
        }

        init();
      }
    ];
    return doorRecordCtrl;
  });