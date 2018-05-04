/**
 * 楼栋
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery','/modules/config/configFile.js','config/common', 'notify'],
    function (app, controllers, $,configFile,common, notify) {
        var building = ['$scope', '$state', '$stateParams', 'communityService','$compile',
            function ($scope,$state,$stateParams,communityService,$compile) {
            $(".layout").find("div").eq(0).css({"padding-top":"0px"});
            var villageCode = $stateParams.villageCode || '';
            $scope.villageName = configFile.communityCodeToName[villageCode];
            var key = 'build_' + villageCode;
            // alert('0')
            if (localStorage.getItem(key)) {
              var buildStr = localStorage.getItem(key);
              var buildparam = JSON.parse(buildStr);//楼栋号:buildparam.name
              $scope.buildNum = buildparam.name;
              localStorage.removeItem(key);
            }
            $scope.loader = true;
            $scope.maxFloor = 0;
            var buildData = $scope.buildData=  [];
            $scope.laberMap = {
                   "独居老人":"oldMan-icon,独居老人",
                   "楼组长":"worthy-icon,楼组长",
                   "志愿者":"love-icon,志愿者",
                   "精神病人":"psychopath-icon,精神病人",
                   "安置帮教":"anzhibangjiao-icon,安置帮教",
                   "涉毒对象":"addict-icon,涉毒对象",
                   "视线对象":"sightPeople-icon,视线对象",
                   "烟感":"smoke-icon,烟感"
                }; 
              $scope.clickBuilding = function(){
                  var req = {
                    buildingNo:$scope.buildNum,
                    villageCode:villageCode
                  }
                  //调建筑信息接口
                  communityService.buildingInfo(req).then(function(resp){
                      if (resp.resultCode == '200') {
                          $scope.loader = false;
                          $scope.buildData = resp.data.sort(function(a,b){
                            return parseInt(b.floorName) - parseInt(a.floorName);
                          })
                          var maxHouseNum = 4;
                          $.each($scope.buildData,function(i,v){
                              if (v.floorName > $scope.maxFloor) {
                                $scope.maxFloor = v.floorName;
                              }
                              console.log($scope.maxFloor)
                              //
                              $.each(v.list,function(k,w){
                                if (w.type == "闲置房") {
                                  w.addClass = true;
                                  w.xianzhifang = true;
                                }else if (w.type =="自住房") {
                                  w.zizhufang = true;
                                }else if(w.type =="出租房"){
                                   w.chuzufang = true;
                                }else{
                                  w.type = ""
                                }
                                if (v.list.length > maxHouseNum) {
                                  maxHouseNum = v.list.length;
                                }
                                  //加人物标签
                                  w.lableArr = [];
                                  if(w.label != null){
                                     var lablerArr = w.label.split(",");
                                     w.lableArr = w.lableArr.concat(lablerArr);
                                     $.each(w.lableArr,function(j,x){
                                        for( m in $scope.laberMap){
                                          if (m == x) {
                                            if("" != x && "null" != x){
                                              w.lableArr[j] = {};
                                               w.lableArr[j].bg = $scope.laberMap[x].split(",")[0];
                                               w.lableArr[j].name = $scope.laberMap[x].split(",")[1];
                                            }
                                          }
                                        }
                                     })
                                   }
                              })
                          })
                          //动态计算.house-body宽度
                          var houseBodyWidth = 1.2 + 1.5*maxHouseNum;
                          $(".modal-house .house-body").css({"width":houseBodyWidth+"rem"})

                      }
                  })
              };
              $scope.clickBuilding();

              var residentlayer = null;
              $scope.clickResident = function(value){
                if (value.addClass) {
                  return;
                }else{
                  var obj = {
                      "villageCode":villageCode,
                      "buildingNo":$scope.buildNum,
                      "houseNo":value.houseNo
                    };
                    var key = 'resident_' + villageCode;
                    localStorage.setItem(key, JSON.stringify(obj));
                    window.parent.clickResident();
                }
                    
              };
    
            }
        ];
        return building;
    });