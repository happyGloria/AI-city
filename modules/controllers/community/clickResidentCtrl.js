/**
 * 楼栋
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify'],
  function(app, controllers, $, configFile, common, notify) {
    var building = ['$scope', '$state', '$stateParams', 'communityService', '$compile',
      function($scope, $state, $stateParams, communityService, $compile) {
        $(".layout").find("div").eq(0).css({
          "padding-top": "0px"
        });
        var villageCode = $stateParams.villageCode || '';
        var key = 'resident_' + villageCode;
        var resident = $scope.resident = JSON.parse(localStorage.getItem(key));
        // var nowYear=new Date();
        // $scope.nowYear=nowYear.getFullYear();
        // resident = {
        //   buildNum:buildparam.name,
        //   id:id
        // };
        localStorage.removeItem(key);
        $scope.loader = true;

        $scope.peopleArrMap = {
          "独居老人": "bg-blue,独居老人",
          "楼组长": "bg-orange,楼组长",
          "志愿者": "bg-mauve,志愿者",
          "精神病人": "bg-red,精神病人",
          "安置帮教": "bg-green,安置帮教",
          "涉毒对象": "bg-yellow,涉毒对象",
          "视线对象": "bg-brown,视线对象"
        };
        var houseparam;
        $scope.residentInfo = function() {
          //调住户信息接口
          houseparam = {
            "villageCode": resident.villageCode || "",
            "houseNo": resident.houseNo || "",
            "buildingNo": resident.buildingNo || "",
            "year":'2017'
          }
          getResidentInfo(houseparam);
          
        };
        $scope.residentInfo();

        function getResidentInfo(houseparam){
            communityService.residengtInfo(houseparam).then(function(resp) {
              if (resp.resultCode == '200') {
                $scope.loader = false;

                $scope.houseData = resp.data;
                $.each(resp.data.peopleList, function(k, w) {
                  w.lableArr = [];
                  if (w.label != null) {
                    var lablerArr = w.label.split(",");
                    w.lableArr = w.lableArr.concat(lablerArr);
                    $.each(w.lableArr, function(j, x) {
                      if ("" != x) {
                        w.lableArr[j] = {};
                        w.lableArr[j].bg = $scope.peopleArrMap[x].split(",")[0];
                        w.lableArr[j].name = $scope.peopleArrMap[x].split(",")[1];
                      }
                    })
                  }
                })
                //户弹窗中的水电煤
                $scope.electricNum =$scope.houseData.electricpower;
                $scope.gasNum = $scope.houseData.gas;
                $scope.waterNum = $scope.houseData.water;
                var month= parseInt($("#selectMonth").val())-1;
                $scope.waterModel =  $scope.waterNum[month]==0?0 : $scope.waterNum[month]?$scope.waterNum[month]: '--';
                $scope.electricModel =$scope.electricNum[month]==0?0:$scope.electricNum[month]?$scope.electricNum[month]: '--';
                $scope.gasModel = $scope.gasNum[month]==0?0:$scope.gasNum[month]?$scope.gasNum[month]: '--';
              }
            });
          }
        //change事件
        $scope.onChange = function() {
          $("#selectMonth").on('change', function() {
            var month = parseInt($(this).val())-1;
            //改变水电煤ng-model
                $scope.waterModel =  $scope.waterNum[month]==0?0:$scope.waterNum[month]?$scope.waterNum[month] :'--';
                $scope.electricModel =$scope.electricNum[month]==0?0:$scope.electricNum[month]?$scope.electricNum[month]: '--';
                $scope.gasModel = $scope.gasNum[month]==0?0:$scope.gasNum[month]?$scope.gasNum[month]: '--';
                $scope.$apply()
          })
        };
        $scope.onChange();
        $scope.yearChange = function() {
          $("#selectYear").on('change', function() {
            houseparam.year = $(this)[0].value;
            getResidentInfo(houseparam);
          })
        };
        $scope.yearChange();

        //to chart
        $scope.queryWaterElectric = function() {
          var electricData = $scope.electricNum;
          var gasData = $scope.gasNum;
          var waterData = $scope.waterNum;
          // 存储值：将对象转换为Json字符串
          var key1 = 'user_' + villageCode;
          var key2 = 'user2_' + villageCode;
          var key3 = 'user3_' + villageCode;
          sessionStorage.setItem(key1, JSON.stringify(electricData));
          sessionStorage.setItem(key2, JSON.stringify(gasData));
          sessionStorage.setItem(key3, JSON.stringify(waterData));

          var url = window.location.href.split("/#")[0] + "/#/index/waterElectricChart/" + villageCode;
          window.open(url);
        };

        //一人一档
        $scope.viewPeoplefile = function(id) {
          var url = window.location.href.split("/#")[0] + "/#/index/peoplefile/" + id + "/" + villageCode;
          window.open(url);

        }

      }
    ];
    return building;
  });