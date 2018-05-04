/**
 * 一人一档
 * Created by zmm on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify', '/lib/other/socket.io.js','yituFace'], function(app, controllers, $, configFile, common, notify, io,yituFace) {
	var doorRecordCtrl = ['$scope', '$http','$state', '$stateParams', 'moreService', '$compile', '$timeout', 'communityService','communityAllService', 'communityRightModuleService',
		function($scope,$http, $state, $stateParams, moreService, $compile, $timeout, communityService,communityAllService, rightService) {
			// $("html").css({
			//              fontSize: 70.9 + 'px'
			//          });
			$("#shijuFile").attr("href","openChrome:http://172.19.59.17/screen/fe936c40-75ec-43f7-90d4-9e4be7c642d1?name="+$stateParams.id);
			var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"' + 'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
			if ($stateParams.villageCode == 'undefined') {
				$stateParams.villageCode = '';
			}
			var villageCode = $stateParams.villageCode || '';
			$scope.villageCode = villageCode;
			window.onResize = function() {
				var baseWidth = 1920;
				var screenWidth = document.body.clientWidth;
				windowHtmlSize = screenWidth / baseWidth * 100;
				var defSize = screenWidth / baseWidth;
				var axisFontSize = defSize * 24;
				$("html").css({
					fontSize: windowHtmlSize + 'px'
				});
				$("body").css("visibility", "visible");
			}
			$(window).resize(function() {
				onResize();
			})
			$(".layout").find("div").eq(0).css({
				"padding-top": "0px"
			});
			var idcardNo = $stateParams.id;
			$scope.idcardNo = idcardNo;
			//展示多少条数据
			$scope.maxInformationCount = 10;
			//默认右边展示住房信息
			$scope.showInformation = 'housingInformation' //'housingInformation';
			//人物标签
			$scope.peopleArrMap = {
				"独居老人": "bg-blue,独居老人",
				"楼组长": "bg-orange,楼组长",
				"志愿者": "bg-mauve,志愿者",
				"精神病人": "bg-red,精神病人",
				"安置帮教": "bg-green,安置帮教",
				"涉毒对象": "bg-yellow,涉毒对象",
				"视线对象": "bg-brown,视线对象"
			};
			$scope.changeCarIndex = 0;
			$scope.peopleFile = {};
			$scope.hasNoResult = "暂无数据";
			// Mac切换
			$scope.macTab = {
				macListIndex: 0,
				macTabIndex: 0,
				nextCarDisabled: true,
				prevCarDisabled: true
			}
			//事件切换
			$scope.eventIndex = 0;
			function getBlobBydataURI(base64, type) {
				var binary = atob(base64);
				var array = [];
				for (var i = 0; i < binary.length; i++) {
					array.push(binary.charCodeAt(i));
				}
				return new Blob([new Uint8Array(array)], {
					type: type
				});
			}
			/**
			 * 基本信息
			 * @return {[type]} [description]
			 */
			$scope.peopleFileFun = function() {
				var req1 = {
					"villageCode": "",
					"credentialNo": idcardNo,
					"credentialType":10
				};
				var promise = moreService.peopleFile(req1);
				promise.then(function(resp) {
					if (resp.resultCode == 200) {
						$scope.peopleFile = resp.data;
						$scope.changeInformation('housingInformation');
						if (null != resp.data.label) {
							//遍历获取人物标签
							$scope.peopleFile.bqArr = [];
							var bqArr = $scope.peopleFile.label.split(",");
							$scope.peopleFile.bqArr = $scope.peopleFile.bqArr.concat(bqArr);

							$.each($scope.peopleFile.bqArr, function(j, x) {
								$scope.peopleFile.bqArr[j] = {};
								if ("" != x && $scope.peopleArrMap[x] != undefined) {
									$scope.peopleFile.bqArr[j].bg = $scope.peopleArrMap[x].split(",")[0]
									$scope.peopleFile.bqArr[j].name = $scope.peopleArrMap[x].split(",")[1]
								}
							})
						}
					}
				}).catch(function() {}).finally(function() {});
			};
			$scope.peopleFileFun();
			/**
			 * 人脸抓拍
			 */
			var start = moment().subtract(7, 'days').format("YYYY-MM-DD");
          	var end = moment().add(1,'days').format("YYYY-MM-DD");
			$scope.faceBuKong=[];
			function getFacelibMapper(){
                communityAllService.getFacelibMapper({
                    villageCode:$scope.villageCode
                }).then(function(resp) {                       
                    if(resp.resultCode == '200') {
                       $scope.faceBuKong=resp.data;
                    }
                }).catch(function(){}).finally(function() {});
           }
            getFacelibMapper();
			$scope.searchCheckFaceInformation = function() {
				// debugger
				$scope.showInformationLoading = true;
				$scope.notShuju = false;
			    imgSrcToBase64New('/zhsq/file/show?path=' + $scope.peopleFile.idCardPic, function(data) {
			    	var img64Url = data.split(",")[1];
			    	$scope.img64Url = img64Url;
			    	// localStorage.setItem('faceTrack', img64Url);
                var param = {
                    picture_image_content_base64: img64Url
                };
                yituFace.yitu_upLoadPic(param, function(resp) {
                    
                    if (resp.rtn != 0) {
                        return;
                    }
                    var face_image_id = resp.results[0].face_image_id;
                    function searchContrastFace(){
						var param = {
	                    "order": { "timestamp": -1 },
	                    "start": 0,
	                    "limit": 100,
	                    "condition":{
	                        "timestamp":{
	                            "$gte":new Date(start).getTime()/1000,
	                            "$lte":new Date(end).getTime()/1000
	                        }
	                    },
	                    "retrieval": {
	                        "face_image_id": face_image_id,
	                        "threshold": 75,//相似度
	                        "using_ann": true,
	                        "camera_ids": $scope.yituIdArr
	                    }
	                };
	                yituFace.yitu_contrastFace(param, function(data) {
	                    if (0 == data.rtn) {
	                    	if (data.results.length == 0) {
	                    		$scope.notShuju = true;	
	                    	}else{
	                    		$scope.showInformationLoading = false;
	                    	}
	                        $.each(data.results, function(i, v) {
	                            if (v.face_image_uri && v.face_image_uri != "") {
	                                v.faceUrl = yituFace.yituFace_Pic + base64encode(v.face_image_uri);
	                            }
	                            if (v.picture_uri && v.picture_uri != "") {
	                                v.picUrl = yituFace.yituFace_Pic + base64encode(v.picture_uri);
	                            } else {
	                                v.picUrl = "";
	                            }
	                            v.name = $scope.yituIdToCameraNameObj[v.camera_id];
	                            v.lon = $scope.yituIdLon[v.camera_id].lon;
	                            v.lat = $scope.yituIdLon[v.camera_id].lat;
	                            v.captureTime = moment(v.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
	                            v.similarity = Number(v.similarity).toFixed(2);
	                        })
	                        $scope.$apply(function() {
	                            $scope.facePath = data.results;
	                            // debugger
	                            // console.log($scope.facePath)
	                            var len = $scope.facePath.length;
	                            if (len > 20) {
	                                $scope.facePath = $scope.facePath.slice(0, 20);
	                            }
	                        });
	                    } else {
								
	                    }
	                });
					}
                    if(!$scope.yituIdArr || $scope.yituIdArr.length == 0){
						searchYituCamera(searchContrastFace);
						return;
					}
					searchContrastFace();
                })
			    });
                  

            }
			/**
			 * 开门记录
			 * @return {[type]} [description]
			 */
			$scope.searchDoorRecordInformation = function() {
				$scope.doorRecords = [];
				$scope.queryOpenRecord = function() {
					var req1 = {
						villageCode: villageCode,
						startTime: "",
						endTime: "",
						pageSize: $scope.maxInformationCount,
						pageNumber: 1,
						pushType: 2,
						peopleName: "",
						deviceName: "",
						credentialNo: idcardNo
					};
					var promise = moreService.openDoorRecord(req1);
					promise.then(function(resp) {
						if (resp.resultCode == 200) {
							$scope.doorRecords = resp.data.openRecord.list;
							if ($scope.doorRecords && $scope.doorRecords.length == 0) {
								$scope.notShuju = true;
							} else {
								$scope.showInformationLoading = false;
							}
						}
					}).catch(function() {}).finally(function() {});
				};
				$scope.queryOpenRecord();
				//门禁图片接口
				$scope.doorImgClick = function(item) {
                    var src = common.getUrl(item.imgUrl);
                    var img = '<img src="' + src + '" style="width:100%;height:100%"/>';
                    layer.open({
                        type: 1,
                        title: "门禁图片",
                        skin: 'dark-layer',
                        area: ['6rem', '3.9rem'],
                        shade: 0.8,
                        closeBtn: 1,
                        shadeClose: true,
                        content: img,
                        end: function(index, layero) {
                            // swObj.shade.show("false");
                        },
                        success: function(layero) {
                            $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'))
                            $(layero).append(iframe);
                        }
                    })
                }
                
				var videoId;
				//门禁视频接口
				$scope.doorVideoClick = function(item) {
                    debugger
                    sessionStorage.setItem("videoSrc", JSON.stringify(item.videoUrl));
                    var url = item.videoUrl.split(",");
                    var height = "650px";
                    if(url.length == 1){
                        height = "350px";
                    }
                    videoId = layer.open({
                        type: 2,
                        title: "门禁视频",
                        skin: 'dark-layer',
                        area: ['535px', height],
                        shade: 0.8,
                        closeBtn: 1,
                        shadeClose: true,
                        content: ['../../../lib/video/video.html', 'no'],
                        end: function(index, layero) {
                            videoId = null;
                            // swObj.shade.show("false");
                        },
                        success: function(layero) {
                            $(layero).find("iframe").eq(0).contents().find("html").css('font-size', $("html").css('font-size'))
                            $(layero).append(iframe);
                        }
                    });
                }
			}

			/**
			 * 住户信息
			 * @return {[type]} [description]
			 */
			$scope.searchHousingInformation = function() {
				//多套房问题先不考虑

				//通过身份证查楼栋号、房间号，可能查出多套房
				var req = {
					villageCode: villageCode,
					credentialNo: idcardNo,
					credentialType:10
				};
				moreService.getHouseInfoList(req).then(function(resp) {
					if (resp.resultCode == '200') {
						$scope.houseInfoData = resp.data[0];
						$scope.residentInfo();
					}
				});
				$scope.peopleType = {
					"1":"户籍人员",
					"2":"来沪人员",
					"3":"境外人员",
					"4":"临时人员",
					"99":"其他",
				};
				$scope.getPeopleType = function(value){
					return $scope.peopleType[value];
				};
				//通过楼栋号、房间号查该户人员信息
				var houseparam;
				$scope.residentInfo = function() {
					//调住户信息接口
					houseparam = {
						"villageCode": villageCode || "",
						"houseNo": $scope.houseInfoData.houseNo || "",
						"buildingNo": $scope.houseInfoData.buildingNo || "",
						"year": '2017'
					}
					getResidentInfo(houseparam);
				};
				function getResidentInfo(houseparam){
		            communityService.residengtInfo(houseparam).then(function(resp) {
		              if (resp.resultCode == '200') {
		                $scope.loader = false;
		                $scope.houseData = resp.data;
		                if ($scope.houseData && $scope.houseData.length == 0) {
							$scope.notShuju = true;
							return;
						}else{
							$scope.showInformationLoading = false;
						}
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
		          };
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
			}

			/**
			 * 车辆tab
			 * 
			 */
			$scope.carTab = {
				carListIndex: 0,
				carTabIndex: 0,
				nextCarDisabled: true,
				prevCarDisabled: true
			}
			var carIndex = null;
			$scope.prevOrNextCar = function(val, tab) {
				debugger
				$scope.carTab.nextCarDisabled = true;
				$scope.carTab.prevCarDisabled = true;
				if (tab) {
					$scope.carTab.carListIndex = val;
				} else {
					$scope.carTab.carListIndex += val;
				}
				if (val == 1 & $scope.carTab.carListIndex != 0 && $scope.carTab.carListIndex % 3 == 0) {
					$scope.carTab.carTabIndex = $scope.carTab.carListIndex;
				}
				if (val == -1 & $scope.carTab.carListIndex != 0 && ($scope.carTab.carListIndex + 1) % 3 == 0) {
					$scope.carTab.carTabIndex = $scope.carTab.carListIndex - 2;
				}
				if ($scope.carTab.carListIndex >= ($scope.carNoData.length - 1)) {
					$scope.carTab.carListIndex = $scope.carNoData.length - 1;
					$scope.carTab.nextCarDisabled = false;
				}
				if ($scope.carTab.carListIndex <= 0) {
					$scope.carTab.carListIndex = 0;
					$scope.carTab.prevCarDisabled = false;
				}
				$scope.showCarTab.breakRuleRecord = false;
				$scope.showCarTab.passRecord = false;
				$scope.showCarTab.villageCarRecord = true;
				carIndex = $scope.carNoData[val];
				$scope.villageCarFun();
			}
			/**
			 * 车辆信息
			 * @return {[type]} [description]
			 */
			$scope.searchCarInformation = function() {
				$scope.showInformationLoading = false;
				// $scope.peopleFile.plateNo = "沪G77568"
				$scope.showCarTab = {
					"villageCarRecord": false,
					"breakRuleRecord": false,
					"passRecord": false
				}

				/**
				 * 查询是否有车，获取车牌号
				 * @type {Array}
				 */
				// $scope.carNoData = [];
				// var carNoParam = {
				// 	liveAddress: $scope.peopleFile.address
				// };
				// var promise0 = moreService.getCarNo(carNoParam);
				// promise0.then(function(resp) {
				// 	if (resp.resultCode == 200) {
				// 		$scope.carNoData = resp.data;
				// 		if ($scope.carNoData && $scope.carNoData.length == 0) {
				// 			$scope.notShuju = true;
				// 			return;
				// 		} else {
				// 			$scope.showInformationLoading = false;
				// 		}
				// 		//初始化页面
				// 		$scope.showCarTab.villageCarRecord = true;
				// 		$scope.villageCarFun();
				// 		$scope.prevOrNextCar(0)
				// 	}
				// }).catch(function() {}).finally(function() {});

				/**
				 * 小区过车记录
				 * pushType:3   过车
				 * tollgateType:1  小区出入口
				 */
				$scope.villageCarFun = function() {
					debugger
					$scope.showNoDate = false;
					$scope.childShowLoading = true;
					$scope.childNotShuju = false;
					$scope.carListData = [];
					var req1 = {
						villageCode: villageCode,
						startTime: "",
						endTime: "",
						pageSize: $scope.maxInformationCount,
						pageNumber: 1,
						plateNumber: carIndex,
						pushType: 3,
						tollgateType: 1
					};
					var promise = moreService.captrueCarList(req1);
					promise.then(function(resp) {
						if (resp.resultCode == 200) {
							debugger
							$scope.carListData = resp.data.acrossVehicle.list;
							$scope.childShowLoading = false;
							if ($scope.carListData && $scope.carListData.length == 0) {
								$scope.childNotShuju = true;
								$scope.showNoDate = true;
								return;
							} else {
								$scope.childShowLoading = false;
							}
						}
					}).catch(function() {}).finally(function() {});
				}

				/**
				 * 违章记录
				 * 
				 */
				$scope.peccancytypeCodeType = {
					"13450": "禁止标线",
					"13010": "逆向行驶",
					"10250": "人行横道线",
					"10251": "网格线",
					"10180": "机占非",
					"0251": "网格线",
					"12080": "不按所需方向",
					"10391": "违章停车",
					"13440": "禁令标志指示的",
					"13457": "路边黄实线违停",
					"99": "违章停车"
				};
				$scope.getPeccancytypeName = function(value){
					return $scope.peccancytypeCodeType[value]
				}
				$scope.breakRuleFun = function() {
					debugger
					$scope.showNoDate = false;
					$scope.childShowLoading = true;
					$scope.childNotShuju = false;
					$scope.breakRuleData = [];
					var req1 = {
						carNo: carIndex,
						pageSize:$scope.maxInformationCount 
					};
					var promise = moreService.getWeiTing(req1);
					promise.then(function(resp) {
						if (resp.resultCode == 200) { 
							$scope.breakRuleData = resp.data;
							$scope.childShowLoading = false;
							if ($scope.breakRuleData && $scope.breakRuleData.length == 0) {
								$scope.childNotShuju = true;
								$scope.showNoDate = true;
								return;
							} else {
								$scope.childShowLoading = false;
							}
						}
					}).catch(function() {}).finally(function() {});
				}
				/**
				 * 卡口过车记录
				 * 
				 * 
				 */
				
				$scope.passFun = function() {
					$scope.showNoDate = false;
					$scope.childShowLoading = true;
					$scope.childNotShuju = false;
					$scope.passData = [];
					var req1 = {
						carNo:carIndex,
						pageSize:$scope.maxInformationCount
					};
					var promise = moreService.getKakou(req1);
					promise.then(function(resp) {
						if (resp.resultCode == 200) {
							$scope.passData = resp.data;
							$.each($scope.passData,function(i,v){
								v.inouttime = v.inouttime.replace(/\//g,'-');
								v.platepic = 'http://15.128.16.68:8080' + v.platepic
							})
							$scope.childShowLoading = false;
							if ($scope.passData && $scope.passData.length == 0) {
								$scope.childNotShuju = true;
								$scope.showNoDate = true;
								return;
							} else {
								$scope.childShowLoading = false;
							}
						}
					}).catch(function() {}).finally(function() {});
				}

				if (!$scope.peopleFile.plateNo) {
					$scope.carNoData = [];
					$scope.notShuju = true;
				}else{
					debugger
					$scope.carNoData = $scope.peopleFile.plateNo.split(',');
					// $scope.notShuju = false;
					// $scope.showInformationLoading = true;
					$scope.prevOrNextCar(0);
				}
				
				/**
				 * [changeCarTab 切换记录tab]
				 * @param  {[type]} tabName [description]
				 * @return {[type]}         [description]
				 */
				$scope.changeCarTab = function(tabName) {
					debugger
					$scope.childShowLoading = true;
					for (var key in $scope.showCarTab) {
						$scope.showCarTab[key] = false;
					}
					$scope.showCarTab[tabName] = true;
					if (tabName == "villageCarRecord") {
						$scope.villageCarFun();
					}
					if (tabName == "breakRuleRecord") {
						$scope.breakRuleFun();
					}
					if (tabName == "passRecord") {
						$scope.passFun();
					}
				}
			}

			/**
			 * 事件tab
			 * @param  {[type]} val [description]
			 * @param  {[type]} tab [description]
			 * @return {[type]}     [description]
			 */
			$scope.prevOrNextEvent = function(val, tab) {
				if (tab) {
					$scope.eventIndex = val;
				} else {
					$scope.eventIndex += val;
				}
				if ($scope.eventIndex >= $scope.eventListData.length) {
					$scope.eventIndex = $scope.eventListData.length - 1;
				}
				if ($scope.eventIndex < 0) {
					$scope.eventIndex = 0;
				}
			}
			/**
			 * 事件
			 * @return {[type]} [description]
			 */
			$scope.searchEventInformation = function() {
				$scope.eventIndex = 0;
				$scope.eventListData = [];
				var req1 = {
					villageCode: "",
					credentialNo: idcardNo, //'320101192606180823',
					phoneNo: "", //'15921650693',
					pageSize: $scope.maxInformationCount,
					pageNumber: 1
				};
				//	                 $scope.eventListData=[
				//	                   {labelType:'110警情',
				//	                   list:[{name:'110警情'}]},
				//	                    {labelType:'感知离开',
				//	                   list:[{name:'感知离开'}]}, 
				//	                    {labelType:'刷卡异常',
				//	                   list:[{name:'刷卡异常'}]}
				//	                 ]
				//	                 $scope.showInformationLoading = false;
				var promise = moreService.getSomeoneAffair(req1);
				promise.then(function(resp) {
					if (resp.resultCode == 200) {
						debugger
						$scope.eventListData = resp.data;
						if ($scope.eventListData[0].result.length ==0 && $scope.eventListData[1].result.length==0) {
							$scope.notShuju = true;
							return;
						} else {
							$scope.showInformationLoading = false;
						}
					}
				}).catch(function() {}).finally(function() {});
			}

			/**
			 * 单位信息
			 * @return {[type]} [description]
			 */
			$scope.searchCompanyInformation = function() {
				$scope.companyData = [];
				var req1 = {
					credentialNo: $scope.idcardNo,
					pageSize: $scope.maxInformationCount,
					pageNumber: 1,
					companyid: "",
					villageCode: villageCode,
					name: "",
					companyName: "",
					credentialType:""
				};
				var promise = moreService.peopleDetailList(req1);
				promise.then(function(resp) {
					if (resp.resultCode == 200) {
						$scope.companyData = resp.data.list;
						if ($scope.companyData.length == 0) {
							$scope.notShuju = true;
							return;
						} else {
							$scope.showInformationLoading = false;
						}
					}
				}).catch(function() {}).finally(function() {});
			}

			/**
			 * 告警
			 * @return {[type]} [description]
			 */
			$scope.searchGiveAlarmInformation = function() {
				var start = moment().subtract(30, 'days').format("YYYY-MM-DD HH:mm:ss");
				var end = moment().format("YYYY-MM-DD HH:mm:ss");
				$scope.doorAlarmList = []
				var req1 = {
					pageSize: $scope.maxInformationCount,
					pageNumber: 1,
					startTime: start,
					endTime: end,
					villageCode: villageCode,
					type: "",
					credentialNo: idcardNo,
					eventDealState: ""
				};
				var promise = moreService.getDoorAlarmList(req1);
				promise.then(function(resp) {
					if (resp.resultCode == 200) {
						debugger
						$scope.doorAlarmData = resp.data.list;
						if ($scope.doorAlarmData && $scope.doorAlarmData.length == 0) {
							$scope.notShuju = true;
						} else {
							$scope.showInformationLoading = false;
						}
						// $.each($scope.doorAlarmData, function(i, item) {
						// 	if(item.credentialNo == $scope.idcardNo) {
						// 	$scope.doorAlarmList.push({
						// 		warningTime: item.warningTime,
						// 		typeDesc: item.typeDesc
						// 	});
						// 	}
						// });
					}
				}).catch(function() {}).finally(function() {
					// layer.close(index);
					$scope.loader = false;
				});
			}

			/**
			 * mac tab
			 * @param  {[type]} val [description]
			 * @param  {[type]} tab [description]
			 * @return {[type]}     [description]
			 */
			$scope.prevOrNextMac = function(val, tab) {
				debugger
				$scope.macTab.nextCarDisabled = true;
				$scope.macTab.prevCarDisabled = true;
				if (tab) {
					$scope.macTab.macListIndex = val;
				} else {
					$scope.macTab.macListIndex += val;
				}
				if (val == 0 && $scope.macTab.macListIndex == 0) {
					$scope.macTab.prevCarDisabled = false;
				}
				if (val == 1 && $scope.macTab.macListIndex != 0 && $scope.macTab.macListIndex % 3 == 0) {
					$scope.macTab.macTabIndex = $scope.macTab.macListIndex;
				}
				if (val == -1 && $scope.macTab.macListIndex != 0 && ($scope.macTab.macListIndex + 1) % 3 == 0) {
					$scope.macTab.macTabIndex = $scope.macTab.macListIndex - 2;
				}
				if ($scope.macTab.macListIndex >= ($scope.macData.length - 1)) {
					$scope.macTab.macListIndex = $scope.macData.length - 1;
					$scope.macTab.nextCarDisabled = false;
				}
				if ($scope.macTab.macListIndex <= 0) {
					$scope.macTab.macListIndex = 0;
					$scope.macTab.prevCarDisabled = false;
				}
				macIndex = $scope.macData[$scope.macTab.macListIndex].mac;
				$scope.showMacRecord = false;
				$scope.userMacFun();
			}

			/**
			 * mac信息
			 * @return {[type]} [description]
			 */
			$scope.searchCaptrueMacInformation = function() {
				/**
				 * 查询移动设备mac
				 * @type {Array}
				 */
				$scope.showMacRecord = false;
				$scope.macData = [];
				var macParam = {
					villageCode: villageCode,
					phoneNo: "",
					pageNumber: 1,
					pageSize: $scope.maxInformationCount,
					credentialNo: idcardNo
				};
				var promise0 = moreService.getUserMacList(macParam);
				promise0.then(function(resp) {
					if (resp.resultCode == 200) {
						$scope.macData = resp.data.list;
						// $scope.macData = [{mac:'BC6C21AA3E3E'}];
						if ($scope.macData.length == 0) {
							$scope.notShuju = true;
							return;
						} else {
							$scope.showInformationLoading = false;
						}
						$.each($scope.macData, function(i, item) {
							item.shebei = '设备' + (i + 1);
						});
						if ($scope.macData.length != 0) {
							$scope.prevOrNextMac(0);
						}
					}
				}).catch(function() {}).finally(function() {});

				/**
				 * mac记录
				 * @type {Object}
				 */
				$scope.userMacFun = function() {
					var req1 = {
						villageCode: villageCode,
						pageSize: $scope.maxInformationCount,
						pageNumber: 1,
						phoneNo: "",
						userMac: macIndex
					};
					var promise = moreService.getWifiDataList(req1);
					promise.then(function(resp) {
						if (resp.resultCode == 200) {
							$scope.showMacRecord = true;
							debugger
							$scope.maRecordData = resp.data.list;
							if ($scope.maRecordData.length == 0) {
								$scope.notShuju = true;
								return;
							} else {
								$scope.showInformationLoading = false;
							}
						}
					}).catch(function() {}).finally(function() {});
				}

			}

			/**
			 * 烟感信息
			 * @return {[type]} [description]
			 */
			$scope.searchSmokeDeviceInformation = function() {
				// $scope.peopleFile.address = '上海市徐汇区钦州路田林十二村53-602';
				/*
				 *消防报警记录
				 */
				$scope.smokeAlarmList = function() {
					var req1 = {
						villageCode: villageCode,
						startTime: "",
						endTime: "",
						pageSize: 10,
						pageNumber: 1,
						pushType: 5,
						buildingNo:$scope.peopleFile.buildingNo,
						houseNo:$scope.peopleFile.houseNo
						// address: $scope.peopleFile.residenceAddress
					};
					var promise = moreService.captrueCarList(req1);
					promise.then(function(resp) {
						if (resp.resultCode == 200) {
							debugger
							$scope.smokeData = resp.data.fireFighting.list;
							if ($scope.smokeData && $scope.smokeData.length == 0) {
								$scope.notShuju = true;
								return;
							} else {
								$scope.showInformationLoading = false;
							}
						}
					}).catch(function() {}).finally(function() {});
				};
				$scope.smokeAlarmList();
				/*
				 *消防设备
				 */
				$scope.smokeDeviceList = function() {
					var req2 = {
						villageCode: villageCode,
						pageSize: $scope.maxInformationCount,
						pageNumber: 1,
						buildingNo:$scope.peopleFile.buildingNo,
						houseNo:$scope.peopleFile.houseNo
						// detailAddress: $scope.peopleFile.residenceAddress,
					};
					var promise = moreService.smokeDeviceList(req2);
					promise.then(function(resp) {
						if (resp.resultCode == 200) {
							$scope.smokeDeviceData = resp.data.list;
							if ($scope.smokeDeviceData && $scope.smokeDeviceData.length == 0) {
								$scope.notShuju = true;
								return;
							} else {
								$scope.showInformationLoading = false;
							}
						}
					}).catch(function() {}).finally(function() {});
				};
				$scope.smokeDeviceList();
			}

			/**
			 * 切换查看信息
			 * @param  {[type]} val [description]
			 * @return {[type]}     [description]
			 */
			$scope.changeInformation = function(val) {
				$scope.showInformationLoading = true;
				$scope.notShuju = false;
				$scope.hasNoResult = "暂无数据";
				//住房信息
				if (val == 'housingInformation') {
					$scope.showInformation = 'housingInformation';
					$scope.searchHousingInformation();
				}
				//车辆信息
				if (val == 'carInformation') {
					$scope.showInformation = 'carInformation';
					$scope.searchCarInformation();
				}
				//单位信息
				if (val == 'companyInformation') {
					$scope.showInformation = 'companyInformation';
					$scope.searchCompanyInformation();
				}
				//门禁记录
				if (val == 'doorRecordInformation') {
					$scope.showInformation = 'doorRecordInformation';
					$scope.searchDoorRecordInformation();
				}
				//MAC
				if (val == 'captrueMacInformation') {
					$scope.showInformation = 'captrueMacInformation';
					$scope.searchCaptrueMacInformation();
				}
				//告警信息
				if (val == 'giveAlarmInformation') {
					$scope.showInformation = 'giveAlarmInformation';
					$scope.searchGiveAlarmInformation();
				}
				//人脸抓拍
				if (val == 'checkFaceInformation') {
					$timeout(function() {
						if (isDouble) {
							return;
						}
						$scope.showInformation = 'checkFaceInformation';
						$scope.searchCheckFaceInformation();
					}, 500)
				}
				//事件
				if (val == 'eventInformation') {
					$scope.showInformation = 'eventInformation';
					$scope.searchEventInformation();
				}
				//烟感信息
				if (val == 'smokeDeviceInformation') {
					$scope.showInformation = 'smokeDeviceInformation';
					$scope.searchSmokeDeviceInformation();
				}
			}
			var isDouble = false;
			//双击人脸
			$scope.dbchangeInformation = function() {
				isDouble = true;
				$timeout(function() {
					isDouble = false;
				}, 500)
				$scope.showInformation = 'checkFaceInformation';
				$scope.searchCheckFaceInformation();
			}


			/**
			 * [queryWaterElectric 水电煤]
			 * @return {[type]} [description]
			 */
			$scope.queryWaterElectric = function() {
				var electricData = $scope.electricNum;
				var gasData = $scope.gasNum;
				var waterData = $scope.waterNum;
				debugger
				// 存储值：将对象转换为Json字符串
				sessionStorage.setItem('user', JSON.stringify(electricData));
				sessionStorage.setItem('user2', JSON.stringify(gasData));
				sessionStorage.setItem('user3', JSON.stringify(waterData));
				// var url = window.location.href.split("/#")[0]+"/#/index/waterElectricChart/";
				// layer.open({
				//   type: 2,
				//   title: '水电煤',
				//   skin: 'dark-layer',
				//   shade: 0.7,
				//   shadeClose: true,
				//   area: ['100%', '100%'],
				//   anim: 2,
				//   content: [url, 'yes'], //iframe的url，no代表不显示滚动条
				//   end: function(){ //此处用于演示
				//   }
				// });
			};
			/**
			 * 点击更多
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */
			$scope.clickMore = function(index) {
				var type = index;
				var url = "www.baidu.com";
				if (type == 1) {
					url = window.location.href.split("/#")[0] + "#/index/doorrecord/";
					$scope.initParams = {
						pName: "",
						deviceName: "",
						IdentityCard: $scope.idcardNo,
						startTime: "",
						endTime: "",
						pageSize: 10,
						pageNumber: 1,
						OpenType: "",
					};
					localStorage.setItem('doorParam', JSON.stringify($scope.initParams));
					window.open(url);
				}
				if (type == 2) {
					url = "/#index/communityCar/";
					var req1 = {
						PlateNumber: "",
						startTime: "",
						endTime: "",
						pageSize: 10,
						pageNumber: 1,
						inOut: "",
						ChannelInOutType: "",
						liveAddress: $scope.peopleFile.address
					};
					localStorage.setItem('carParam', JSON.stringify(req1));
					window.open(url);
				}
				if (type == 3) {
					url = "/#index/communityMac/";
					var req1 = {
						startTime: "",
						endTime: "",
						address: "",
						ZJHM: $scope.idcardNo,
						pageSize: 10,
						pageNumber: 1,
						baseMac: "",
						mac: "",
						XM: "",
						phonenumber: "",
					};
					localStorage.setItem('macParam', JSON.stringify(req1));
					window.open(url);
				}
			};

			/**
			 * [地图查看]
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */
			$scope.toMapTrack = function(index) {
				var url = "www.baidu.com";
				if (index == 1) {
					url = "#/index/trackShow/faceTrack/";
					localStorage.setItem('faceTrack', $scope.img64Url);
					// localStorage.setItem('faceData', JSON.stringify($scope.facePath));
					window.open(url);
				}
				if (index == 2) {
					url = "#/index/trackShow/macTrack/";
					console.log($scope.macData[$scope.macTab.macListIndex].mac)
					debugger
					if ($scope.maRecordData.length > 0) {
						localStorage.setItem('macTrack', JSON.stringify($scope.macData));
						localStorage.setItem('macTrackFromFile', true);
						window.open(url);
					} else {
						notify.warn("暂无mac信息")
					}
				}
			};
			//车辆违章照片
            $scope.clickPicToLarge = function(item) {
             	debugger
	            var src = item;
	            var img = '<img src="' + src + '" style="width:100%;height:100%"/>';
	            layer.open({
	              type: 1,
	              title: false,
	              area: ['640px', '360px'],
	              shade: 0.8,
	              closeBtn: 0,
	              shadeClose: true,
	              content: img,
	              end: function(index, layero) {
	                // swObj.shade.show("false");
	              },
	              success: function(layero) {
	                $(layero).append(iframe);
	              }
	            });
	          }
			setTimeout(function() {
				onResize();
			}, 0)

			//查询依图摄像机
			function searchYituCamera(callBack){
				var req = {
                        villageCode:'',
                        cameraName:'',
                        cameraType:'5',//TODO换成和依图对接的类型5
                        pageNumber: 1,
                        pageSize: 999,
                     }
                     $scope.cameraSelectList = [];
                    //抓拍摄像机ID和摄像机name的对应关系
                    $scope.yituIdToCameraNameObj = {};
                    //抓拍摄像机id数组
                    $scope.yituIdArr = [];
                    //抓拍摄像机对象的经纬度
                    $scope.yituIdLon = {};
                    communityAllService.queryMapInfo('camera',req).then(function(resp) {
                    if(resp.resultCode == '200') {
                        
                        angular.forEach(resp.data.list,function(data){
                            if(data.ytCameraId){
                                var obj={
                                    F_ID:data.ytCameraId+'@DEFAULT',
                                    F_Name:data.name,
                                    lon:data.lon,
                                    lat:data.lat
                                }
                             $scope.cameraSelectList.push(obj);
                             $scope.yituIdToCameraNameObj[obj.F_ID] = obj.F_Name;
                             $scope.yituIdArr.push(obj.F_ID);
                             $scope.yituIdLon[obj.F_ID] = {
                                lon:data.lon,
                                lat:data.lat
                             };
                            }
                        });
                        callBack();
                    }
                    }).catch(function() {}).finally(function() {});
			}

		}
	];
	return doorRecordCtrl;
});