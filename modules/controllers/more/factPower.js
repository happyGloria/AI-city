/**
 * 实有力量
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery','/modules/config/configFile.js','config/common', 'notify','laydate'],
    function (app, controllers, $,configFile,common, notify,laydate) {
        var doorRecordCtrl = ['$scope', '$state', '$http','$stateParams', 'moreService','$compile','$timeout',
            function ($scope,$state,$http,$stateParams,moreService,$compile,$timeout) {
                $(".layout").find("div").eq(0).css({"padding-top":"0px"});
                var villageCode = $stateParams.villageCode;
                $scope.villageCode = villageCode;
                var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"' + 'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
                $scope.initParams = {
                   pageSize:10,
                   pageNumber:1,
                   credentialNo:"",
                   certificatesName:"",
                   residentialAddress:"",
                   phonenumber:"",
                   mac:"",
                   label:"",
                   villageCode:villageCode,
                   policeNumber:"",
                   department:""
                };
                var key = 'resident_' + villageCode;
                var val = JSON.parse(localStorage.getItem(key));
                localStorage.removeItem(key);

                switch(val){
                  case "1":
                      $scope.initParams.villageCode ="";
                      $scope.initParams.label = "警员";
                      break;
                  case "2":
                      $scope.initParams.villageCode ="";
                      $scope.initParams.label = "居委干部";
                      break;
                  case "3":
                      $scope.initParams.villageCode ="";
                      $scope.initParams.label = "楼组长";
                      break;
                  case "4":
                      $scope.initParams.villageCode ="";
                      $scope.initParams.label = "志愿者";
                      break;
                  case "5":
                      $scope.initParams.villageCode ="";
                      $scope.initParams.label = "保安";
                      break;
                  case "6":
                      $scope.initParams.villageCode ="";
                      $scope.initParams.label = "保洁";
                      break;
                  case "7":
                      $scope.initParams.villageCode ="";
                      $scope.initParams.label = "保绿";
                      break;
                  case "8":
                      $scope.initParams.villageCode ="";
                      $scope.initParams.label = "快递";
                      break;
                }
                //初始化参数
                var key = 'factPower_' + villageCode;
                if (localStorage.getItem(key)) {
                   var urlParam = JSON.parse(localStorage.getItem(key));
                   // console.log(urlParam.name)
                   var label= urlParam.name;
                   // urlParam.name
                    $scope.initParams.label = label;
                   localStorage.removeItem(key);
                }
                $scope.page1={
                   totalRow:0,
                   count:0
                };
                  
                $scope.factPower = function(value){
                  $scope.loader = true;
                   if (value) {
                      $scope.initParams.pageNumber = 1;
                    }
                   var req1 = {
                      pageSize:$scope.initParams.pageSize,
                      pageNumber:$scope.initParams.pageNumber,
                      credentialNo:$scope.initParams.credentialNo,
                      certificatesName:$scope.initParams.certificatesName,
                      residentialAddress:$scope.initParams.residentialAddress,
                      phonenumber:$scope.initParams.phonenumber,
                      mac:$scope.initParams.mac,
                      label:$scope.initParams.label,
                      villageCode:$scope.initParams.villageCode,
                      policeNumber:$scope.initParams.policeNumber,
                      department:$scope.initParams.department
                   };
                   var promise = moreService.queryFactPower(req1);
                      promise.then(function (resp) {
                         if (resp.resultCode == 200) {
                            $scope.factPowerData = resp.data.list;
                            $scope.page1.totalRow=resp.data.totalRow          
                         }
                      }).catch(function() {}).finally(function() {
                        $scope.loader = false;
                      });
                };

                function policeFun(){
                  $scope.policeParams = {
                    pageSize:10,
                    pageNumber:1,
                    pcMark:2,
                    pcNumber:"",
                    department:"",
                    policeName:"",
                    policeMobileNo:""
                  };
                  $scope.policePage={
                     totalRow:0,
                     count:0
                  };
                  $scope.police = function(){
                    // var req = {
                    //   pageSize:$scope.policeParams.pageSize,
                    //   pageNumber:$scope.policeParams.pageNumber,
                    //   pcMark:$scope.policeParams.pcMark,
                    //   pcNumber:$scope.policeParams.pcNumber,
                    //   department:$scope.policeParams.department,
                    //   policeName:$scope.policeParams.policeName,
                    //   policeMobileNo:$scope.policeParams.policeMobileNo
                    // };
                    var a = {};
                    if($scope.policeParams.pageNumber==""){
                      a.pageNum = $scope.policeParams.pageNumber
                    }
                    if($scope.policeParams.pageSize==""){
                      a.pageSize = $scope.policeParams.pageSize
                    }
                    if($scope.policeParams.pcNumber==""||$scope.policeParams.pcNumber==null){
                      a.policeNumber = $scope.policeParams.pcNumber
                    }
                    if($scope.policeParams.policeName==""||$scope.policeParams.policeName==null){
                      a.name = $scope.policeParams.policeName
                    }
                    if($scope.policeParams.policeMobileNo==""||$scope.policeParams.policeMobileNo==null){
                      a.telephoneNumber = $scope.policeParams.policeMobileNo
                    }
                    if($scope.policeParams.department==""||$scope.policeParams.department==null){
                      a.department = $scope.policeParams.department
                    }
                    var a = {
                      pageNum:$scope.policeParams.pageNumber,
                      pageSize:$scope.policeParams.pageSize,
                      policeNumber:$scope.policeParams.pcNumber,
                      name:$scope.policeParams.policeName,
                      telephoneNumber:$scope.policeParams.policeMobileNo,
                      department:$scope.policeParams.department
                    }
                    debugger;
                    moreService.findPoliceMenInfoByCondition(a).then(function(resp){
                      debugger;
                      $scope.policeData = resp.data.list;
                      $scope.policePage.totalRow=resp.data.totalRow
                    })
                  };
                  $scope.police();
                }
                if (val == "1") {
                  policeFun();
                }else{
                  $scope.factPower();
                }

                $scope.toResident = function(item) {
                  var obj = {
                    "villageCode":item.villageCode,
                    "buildingNo":item.buildingNo,
                    "houseNo":item.houseNo,
                    // "year":'2017'
                  };
                  var key = "resident_" + item.villageCode;
                  localStorage.setItem(key, JSON.stringify(obj));
                  var url ="../../../template/html/modules/buildingHouse/house.html?villageCode="+item.villageCode;
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
                      $(layero).find("iframe").eq(0).contents().find("html").css('font-size','83px');
                    }
                  });
                };
                
                $scope.locationFun = function(item){
                  var list = [];
                  // item.lon = 13516817.539;
                  // item.lat = 3655058.811;
                  list.push(item);
                  sessionStorage.setItem("locationForPower",JSON.stringify(list));
                  var url = "../../../template/html/modules/clean2dMap/clean2dMap.html";
                  layer.open({
                    type: 2,
                    title: "位置信息",
                    skin: 'dark-layer',
                    shade: 0.7,
                    shadeClose: true,
                    area: ['8.8rem', '5rem'],
                    anim: 2,
                    scrollbar: false,
                    content: [url, 'no'], //iframe的url，no代表不显示滚动条
                    end: function() { //此处用于演示
                    },
                    success: function(layero, index) {
                      $(layero).find("iframe").eq(0).contents().find("html").css('font-size','83px');
                    }
                  });
                }

                //change警员标签
                $scope.policeTab = {
                    info:true,
                    gps:false
                };
                $scope.changePoliceTab = function(type){
                  for(var key in $scope.policeTab){
                      $scope.policeTab[key] = false;
                  }
                  $scope.policeTab[type] = true;
                  laydate.render({
                    elem: '#warningStartTime',
                    type: "datetime",
                    value: $scope.policeGpsParams.startTime || initStartTime,
                    done: function(value, date, endDate) {
                      $scope.policeGpsParams.startTime = value;
                    }
                  });

                  laydate.render({
                    elem: '#warningEndTime',
                    type: "datetime",
                    value: $scope.policeGpsParams.endTime || initEndTime,
                    done: function(value, date, endDate) {
                      $scope.policeGpsParams.endTime = value;
                    }
                  });
                }

                //警员排班表start
                $scope.serviceModeNameList = configFile.serviceModeNameList;
                $scope.departmentList = configFile.departmentList;
                $scope.workStatusNameList = configFile.workStatusNameList;
                var initStartTime = moment().format("YYYY-MM-DD 00:00:00");
                var initEndTime = moment().format("YYYY-MM-DD 23:59:59");
                $scope.policeGpsParams = {
                  pageSize:10,
                  pageNumber:1,
                  villageCode:$scope.villageCode,
                  peopleName:"",
                  policeNumber:"",
                  serviceMode:"1,2,3,4,5",
                  startTime:initStartTime,
                  endTime:initEndTime,
                  serviceMode:"",
                  telephone:"",
                  regionCode:"",
                  departmentNo:"",
                  workStatus:"",
                  type:"1"
                };
                $scope.policeGps = function(){
                  $scope.policeGpsPage={
                     totalRow:0,
                     count:0
                  };
                  $scope.policeGpsParams.serviceMode = $scope.policeGpsParams.serviceMode == '' ? '1,2,3,4,5':$scope.policeGpsParams.serviceMode;
                  $scope.policeGpsParams.workStatus = $scope.policeGpsParams.workStatus == '' ? '0,1,2,3':$scope.policeGpsParams.workStatus;
                  var req = {
                    pageSize:$scope.policeGpsParams.pageSize,
                    pageNumber:$scope.policeGpsParams.pageNumber,
                    villageCode:$scope.policeGpsParams.villageCode,
                    peopleName:$scope.policeGpsParams.peopleName,
                    policeNumber:$scope.policeGpsParams.policeNumber,
                    serviceMode:$scope.policeGpsParams.serviceMode,
                    startTime:$scope.policeGpsParams.startTime,
                    endTime:$scope.policeGpsParams.endTime,
                    serviceMode:$scope.policeGpsParams.serviceMode,
                    telephone:$scope.policeGpsParams.telephone,
                    regionCode:$scope.policeGpsParams.regionCode,
                    departmentNo:$scope.policeGpsParams.departmentNo,
                    workStatus:$scope.policeGpsParams.workStatus,
                    type:$scope.policeGpsParams.type
                  };
                  moreService.getPoliceTable(req).then(function(resp){
                    $.each(resp.data.list,function(i,v){
                      v.communityName = configFile.communityCodeToName[v.villageCode];
                      v.serviceName = configFile.serviceModeToName[v.serviceMode+''];
                      v.workStatusName = configFile.workStatusToName[v.workStatus+''];
                    })
                    $scope.policeGpsData = resp.data.list;
                    $scope.policeGpsPage.totalRow=resp.data.totalRow
                  })
                };
                $scope.policeGps();
                $scope.uploadImg = function() {
                  $('#imageFile').unbind("change").bind("change", function() {
                      uploadPicFun();
                  });
                };
                 //上传excel到服务器
                function uploadPicFun() {
                  var data = new FormData();
                  var filesArr = document.querySelector('input[type=file]').files;
                  if(filesArr.length == 0){
                      return;
                  }
                  var name = filesArr[0].name;
                  var typeName = name.substring(name.lastIndexOf('.'),name.length);
                  if(typeName == '.xlsx' || typeName == '.xls'){
                      data.append('file', filesArr[0]);
                      $http({
                        method: 'POST',
                        url: "/zhsq/police/uploadExcel",
                        data: data,
                        headers: {
                          'Content-Type': undefined
                        },
                        transformRequest: angular.identity
                      }).success(function(resp) {
                        //上传成功的操作
                        if (resp.data && resp.data.isSuccessed) {
                            notify.success("EXCEL上传成功！")
                        } else {
                          var messageTitle = resp.data.message ? resp.data.message : 'EXCEL上传失败'
                          notify.warn(messageTitle);
                        }
                      }).error(function(error) {});
                  }else{
                    notify.warn('请选择正确的EXCEL格式！');
                  }
                }
                  //模板下载
                  $scope.downedExcel=function(){
                   window.open("./chajian/execl.xlsx"); 
                  }


                //警员排班表end
            }
        ];
        return doorRecordCtrl;
    });