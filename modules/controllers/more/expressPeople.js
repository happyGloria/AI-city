/**
 * 快递人员
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify','yituFace'],
  function(app, controllers, $, configFile, common, notify,yituFace) {
    var doorRecordCtrl = ['$scope', '$state', '$stateParams', 'moreService', '$compile', '$timeout', 'communityRightModuleService','communityAllService',
      function($scope, $state, $stateParams, moreService, $compile, $timeout, rightService,communityAllService) {
        $(".layout").find("div").eq(0).css({
          "padding-top": "0px"
        });
        var villageCode = $stateParams.villageCode || '';
        $scope.villageName = configFile.communityCodeToName[villageCode];
        /**
         * 
         */
        $scope.initParams = {
          pageSize:8,
          pageNumber:1,
          credentialNo:"",
          certificatesName:"",
          residentialAddress:"",
          phonenumber:"",
          mac:"",
          label:'快递',
          villageCode:villageCode,
          policeNumber:"",
          department:""
        };
        $scope.expressPeoplePage = {
          totalRow: 0,
          count: 0
        }
        $scope.expressPeople = function() {
          $scope.loader = true;
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
          promise.then(function(resp) {
            if (resp.resultCode == 200) {
              $scope.expressPeopleData = resp.data.list;
              $scope.expressPeoplePage.totalRow = resp.data.totalRow;
              $.each($scope.expressPeopleData,function(i,v){
                imgSrcToBase64(v.idCardPic,function(data){
                  v.base64Url = data.split(",")[1];
                  uploadPicFun(v.base64Url,function(data){
                    contrastFaceFun(data.results[0].face_image_id,function(data){
                      debugger;
                      v.faceArr = data.results;
                      v.times = data.results.length;
                      $scope.$apply();
                      // console.log(a.certificatesName == v.certificatesName);
                    });
                  });
                },true);
              })
            }
          }).catch(function() {}).finally(function() {
            $scope.loader = false;
          });
        }

        //查看详细照片
        var swiper = null;
        $scope.viewPicFun = function(item) {
          $scope.captureFacePic = item.faceArr;
          setTimeout(function() {
            layer.open({
              type: 1,
              title: "抓拍照片",
              area: ['640px', '360px'],
              shade: 0.8,
              skin: 'dark-layer',
              closeBtn: 1,
              shadeClose: true,
              content: $("#realPowerPhoto"),
              end: function(index, layero) {},
              success: function(layero) {
                if (!!swiper) {
                  swiper.destroy();
                }
                swiper = new Swiper('.swiper-container', {
                  slidesPerView: 3,
                  spaceBetween: 30,
                  slidesPerGroup: 3,
                  // loop: true,
                  // loopFillGroupWithBlank: true,
                  pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                  },
                  navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }
                });
              }
            });
          }, 0)
        }

        //上传图片到服务器
        function uploadPicFun(picBase64,callBack) {
            debugger;
            var param = {
                picture_image_content_base64: picBase64
            };
            // console.log(picBase64);
            yituFace.yitu_upLoadPic(param, function(resp) {
                debugger;
                if (resp.rtn != 0) {
                    alert(resp.message);
                    return;
                }
                $scope.$apply(function() {
                  callBack(resp);
                })
            })
        }

        //根据图片检索快递人员抓拍照片(1:n)
        function contrastFaceFun(faceImgId,callBack){
            var param = {
              "order": { "timestamp": -1 },
              "start": 0,
              "limit": 5000,
              "condition":{
                  "timestamp":{
                      "$gte":new Date(1970-01-01).getTime()/1000,
                      "$lte":new Date().getTime()/1000
                  }
              },
              "retrieval": {
                  "face_image_id": faceImgId,
                  "threshold": 75,//相似度
                  "using_ann": true,
                  "camera_ids": $scope.yituIdArr
              }
            };
            yituFace.yitu_contrastFace(param, function(data) {
              if (0 == data.rtn) {
                  debugger;
                      $.each(data.results, function(i, v) {
                          v.name = $scope.yituIdToCameraNameObj[v.camera_id];
                          // getyitu_camerasList(v,cameraList);
                          if (v.face_image_uri && v.face_image_uri != "") {
                              v.faceUrl = yituFace.yituFace_Pic + base64encode(v.face_image_uri);
                          }
                          if (v.picture_uri && v.picture_uri != "") {
                              v.picUrl = yituFace.yituFace_Pic + base64encode(v.picture_uri);
                          } else {
                              v.picUrl = "";
                          }
                          v.captureTime = moment(v.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
                          v.similarity = Number(v.similarity).toFixed(2);
                          v.lon = $scope.yituIdLon[v.camera_id].lon;
                          v.lat = $scope.yituIdLon[v.camera_id].lat;
                      });
                      callBack(data)
              } else {
                  alert(data.message);
              }
          });
        }

        //查询和依图相关摄像头数组
        function initYituCamera(){
            var req = {
              villageCode:'',
              cameraName:'',
              cameraType:'5',//TODO换成和依图对接的类型5
              pageNumber: 1,
              pageSize: 999,
            }
            //摄像机ID和摄像机name的对应关系
            $scope.yituIdToCameraNameObj = {};
            //摄像机id数组
            $scope.yituIdArr = [];
            //摄像机对象的经纬度
            $scope.yituIdLon = {};
            //摄像机对应的小区编号
            $scope.yituIdToValligeCode = {};
            communityAllService.queryMapInfo('camera',req).then(function(resp) {
            if(resp.resultCode == '200') {
                debugger;
                angular.forEach(resp.data.list,function(data){
                    if(data.ytCameraId){
                        var obj={
                            F_ID:data.ytCameraId+'@DEFAULT',
                            F_Name:data.name,
                            lon:data.lon,
                            lat:data.lat,
                            villageCode:data.villageCode
                        }
                        // $scope.cameraSelectList.push(obj);
                        $scope.yituIdToCameraNameObj[obj.F_ID] = obj.F_Name;
                        $scope.yituIdArr.push(obj.F_ID);
                        $scope.yituIdToValligeCode[obj.F_ID] = obj.villageCode;
                        $scope.yituIdLon[obj.F_ID] = {
                            lon:data.lon,
                            lat:data.lat
                        };
                    }
                });
                $scope.expressPeople();
            }
          }).catch(function() {}).finally(function() {});
        }

        initYituCamera()
      }
    ];
    return doorRecordCtrl;
  });