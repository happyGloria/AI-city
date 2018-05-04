/**
 * 消防
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify', 'laydate'],
  function(app, controllers, $, configFile, common, notify, laydate) {
    var doorRecordCtrl = ['$scope', '$state', '$stateParams', 'moreService', '$compile', '$timeout',
      function($scope, $state, $stateParams, moreService, $compile, $timeout) {
        $(".layout").find("div").eq(0).css({
          "padding-top": "0px"
        });
        var villageCode = $stateParams.villageCode || '';
        $scope.villageName = configFile.communityCodeToName[villageCode];
        function init() {
          var key = "yanganType_" + villageCode;
          if (localStorage.getItem(key)) {
            var sessionParam = {};
            sessionParam = JSON.parse(localStorage.getItem(key));
            localStorage.removeItem(key);

            $scope.fireRecordParams = {
              villageCode:villageCode,
              buildingNo: sessionParam.buildingNo || "",
              deviceNo: sessionParam.deviceNo || "",
              startTime: "",
              endTime: "",
              pageSize: 10,
              pageNumber: 1,
              address: sessionParam.address || "",
              type: "",
              floorNo: "",
              houseNo: sessionParam.houseNo || "",
            };
          }
          fireRecordFun();
        }
        /**
         * 消防记录
         * @param  {[type]} localStorage.getItem("yanganType") [description]
         * @return {[type]}                                    [description]
         */
        function fireRecordFun() {
          $scope.fireRecordParams = $scope.fireRecordParams || {
            villageCode:villageCode,
            startTime: "",
            endTime: "",
            pageSize: 10,
            pageNumber: 1,
            pushType:5,
            buildingNo: "",
            deviceNo: "",
            detailAddress: "",
            type: "",
            floorNo: "",
            houseNo: "",
          };
          $scope.fireRecordPage = {
            totalRow: 0,
            count: 0
          };
          $scope.alarmMsgType = [{
            code: "1",
            name: "火警"
          }, {
            code: "2",
            name: "电表"
          },{
            code: "3",
            name: "室外消火栓"
          },{
            code: "4",
            name: "电弧"
          },{
            code: "5",
            name: "室内消火栓"
          }];

          //
          laydate.render({
            elem: '#startTime',
            type: "datetime",
            value: "",
            done: function(value, date, endDate) {
              $scope.fireRecordParams.startTime = value;
            }
          });

          laydate.render({
            elem: '#endTime',
            type: "datetime",
            value: "",
            done: function(value, date, endDate) {
              $scope.fireRecordParams.endTime = value;
            }
          });

          $scope.smokeAlarmList = function(value) {
            $scope.loader = true;
            if (value) {
              $scope.fireRecordParams.pageNumber = 1;
            }
            var req1 = {
              villageCode: $scope.fireRecordParams.villageCode,
              startTime: $scope.fireRecordParams.startTime,
              endTime: $scope.fireRecordParams.endTime,
              pageSize: $scope.fireRecordParams.pageSize,
              pageNumber: $scope.fireRecordParams.pageNumber,
              buildingNo: $scope.fireRecordParams.buildingNo,
              deviceNo: $scope.fireRecordParams.deviceNo,
              detailAddress: $scope.fireRecordParams.detailAddress,
              type: $scope.fireRecordParams.type,
              floorNo: $scope.fireRecordParams.floorNo,
              houseNo: $scope.fireRecordParams.houseNo,
            };

            var promise = moreService.smokeAlarmList(req1);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                debugger;
                $scope.smokeData = resp.data.list;
                $scope.fireRecordPage.totalRow = resp.data.totalRow;
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.smokeAlarmList();
        }

        /**
         * [消防设备]
         * @param  {[type]} localStorage.getItem("yanganType") [description]
         * @return {[type]}                                    [description]
         */
        function fireDeviceFun() {
          $scope.fireDeviceParams = {
            pageSize: 10,
            pageNumber: 1,
            villageCode: villageCode,
            deviceNo: "",
            name: "",
            stateCode: "",
            detailAddress: "",
            buildingNo: "",
            floorNo: "",
            houseNo: "",

          };
          $scope.fireDevicePage = {
            totalRow: 0,
            count: 0
          };
          $scope.stateArr = [{
            code: "",
            name: "请选择"
          }, {
            code: "1",
            name: "正常"
          }, {
            code: "0",
            name: "异常"
          }];
          $scope.smokeDeviceList = function() {
            $scope.loader = true;
            var req2 = {
              pageSize: $scope.fireDeviceParams.pageSize,
              pageNumber: $scope.fireDeviceParams.pageNumber,
              villageCode: $scope.fireDeviceParams.villageCode,
              deviceNo: $scope.fireDeviceParams.deviceNo,
              name: $scope.fireDeviceParams.name,
              stateCode: $scope.fireDeviceParams.stateCode,
              detailAddress: $scope.fireDeviceParams.detailAddress,
              buildingNo: $scope.fireDeviceParams.buildingNo,
              floorNo: $scope.fireDeviceParams.floorNo,
              houseNo: $scope.fireDeviceParams.houseNo,
            };
            var promise = moreService.smokeDeviceList(req2);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                $scope.smokeDeviceData = resp.data.list;
                $scope.fireDevicePage.totalRow = resp.data.totalRow
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.smokeDeviceList();
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
              fireRecordFun();
            }
            if (tabName == "fireDevice") {
              fireDeviceFun();
            }
        }

        init();

      }
    ];
    return doorRecordCtrl;
  });