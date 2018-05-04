/**
 * 
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify'],
  function(app, controllers, $, configFile, common, notify) {
    var doorRecordCtrl = ['$scope', '$state', '$stateParams', 'moreService', '$compile', '$timeout',
      function($scope, $state, $stateParams, moreService, $compile, $timeout) {
        $(".layout").find("div").eq(0).css({
          "padding-top": "0px"
        });
        var villageCode = $stateParams.villageCode || '';
        var hrefHead = window.location.href.split("#")[0];
        $scope.villageName = configFile.communityCodeToName[villageCode];
        $scope.initParams = {
          pageSize: 10,
          pageNumber: 1,
          buildingNo:"",
          houseNo:"",
          type:"",
          villageCode: villageCode
        };
        $scope.page1 = {
          totalRow: 0,
          count: 0
        };
        $scope.houseTypeMap = [{
          code: "1",
          name: "自住房"
        }, {
          code: "2",
          name: "出租房"
        },{
          code: "3",
          name: "闲置房"
        }];
        //查询1
        $scope.queryHouse = function(value) {
          $scope.loader = true;
          if (value) {
            $scope.initParams.pageNumber = 1;
          }
          var req1 = {
            pageSize: $scope.initParams.pageSize,
            pageNumber: $scope.initParams.pageNumber,
            buildingNo: $scope.initParams.buildingNo,
            houseNo: $scope.initParams.houseNo,
            type:$scope.initParams.type,
            villageCode: $scope.initParams.villageCode
          };
          var promise = moreService.factHouseList(req1);
          promise.then(function(resp) {
            if (resp.resultCode == 200) {
              $scope.factHouseData = resp.data.list;
              $scope.page1.totalRow = resp.data.totalRow;
            }
          }).catch(function() {}).finally(function() {
            $scope.loader = false;
          });
        };

        //住户信息
        $scope.toResident = function(item) {
          debugger;
          var obj = {
            "villageCode":item.villageCode,
            "buildingNo":item.buildingNo,
            "houseNo":item.houseNo,
            // "year":'2017'
          };
          var key = "resident_" + villageCode;
          localStorage.setItem(key, JSON.stringify(obj));
          ///var url = hrefHead + "/#/index/clickResident/"+villageCode;
          var url="/template/html/modules/buildingHouse/house.html?villageCode="+villageCode
          var residentLayer = layer.open({
            type: 2,
            title: "住户信息",
            skin: 'dark-layer',
            shade: 0.7,
            shadeClose: true,
            area: ['8.8rem', '530px'],
            anim: 2,
            scrollbar: false,
            content: [url, 'no'], //iframe的url，no代表不显示滚动条
            end: function() { //此处用于演示
            },
            success: function(layero, index) {
              // $(layero).append(iframe);
              $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size')) 
            }
          });
        };
        $scope.queryHouse();

        

      }
    ];
    return doorRecordCtrl;
  });