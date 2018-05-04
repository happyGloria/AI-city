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
        var key = "id_" + villageCode;
        // console.log(key)
        var companyid = localStorage.getItem(key);
        // console.log(companyid)
        localStorage.removeItem(key);
        $scope.initParams = {
          pageSize: 10,
          pageNumber: 1,
          companyid: companyid,
          name: "",
          sex: "",
          credentialNo: "",
          bornaddress: "",
          liveadress: "",
          phone: "",
          villageCode: villageCode
        };
        $scope.page1 = {
          totalRow: 0,
          count: 0
        };
        $scope.sexArr = [{
          code: "男",
          name: "男"
        }, {
          code: "女",
          name: "女"
        }];
        //查询1
        $scope.peopleDetail = function(value) {
          $scope.loader = true;
          if (value) {
            $scope.initParams.pageNumber = 1;
          }
          var req1 = {
            pageSize: $scope.initParams.pageSize,
            pageNumber: $scope.initParams.pageNumber,
            companyid: $scope.initParams.companyid,
            name: $scope.initParams.name,
            sex: $scope.initParams.sex,
            credentialNo: $scope.initParams.credentialNo,
            bornaddress: $scope.initParams.bornaddress,
            liveadress: $scope.initParams.liveadress,
            phone: $scope.initParams.phone,
            villageCode: $scope.initParams.villageCode
          };
          var promise = moreService.peopleDetailList(req1);
          promise.then(function(resp) {
            if (resp.resultCode == 200) {
              $scope.peopleDetailaData = resp.data.list;
              $scope.page1.totalRow = resp.data.totalRow
            }
          }).catch(function() {}).finally(function() {
            $scope.loader = false;
          });
        };
        $scope.peopleDetail();

        /**跳转一人一档
         *
         */
        $scope.lalerPeopleFile = function(index) {
          var id = index;
          url = window.location.href.split("/#")[0] + "/#index/peoplefile/" + id + "/" + villageCode;
          window.open(url);
        };

      }
    ];
    return doorRecordCtrl;
  });