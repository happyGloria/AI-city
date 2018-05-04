/**
 * factpeople
 * Created by zrr on 2016/7/28.
 */
define(['app', 'controllers/controllers', 'jquery', '/modules/config/configFile.js', 'config/common', 'notify','yituFace'],
  function(app, controllers, $, configFile, common, notify,yituFace) {
    var doorRecordCtrl = ['$scope', '$state', '$stateParams', 'moreService', '$compile', '$timeout',
      function($scope, $state, $stateParams, moreService, $compile, $timeout) {
        $(".layout").find("div").eq(0).css({
          "padding-top": "0px"
        });
        var iframe = '<iframe id="iframebar" src="about:blank" frameBorder=0  marginHeight=0 marginWidth=0 style="position:absolute;visibility:inherit; top:0px;left:0px;height:100%;width:100%;z-index:-1;"' + 'filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"></iframe>';
        var villageCode = $stateParams.villageCode || '';
        var urlParam = {};
        $scope.villageName = configFile.communityCodeToName[villageCode];
        function init() {
          statisticsFun();
        };
        /**
         * 数据统计
         * @type {[type]}
         */

        function statisticsFun() {
          function initiInside() {
            //查询实有人口类别接口
            var req = {
              "villageCode": villageCode
            }
            var resultData;
            moreService.queryRealPeopleNum(req).then(function(resp) {
              resultData = resp;
                yituFace.yitu_dossier("incoming_dossier",[villageCode],function(data){
                  debugger
                  if(data.statistic_info.length>0){
                    resultData.data.peopleRecord.peopleDiscoveryCount=data.statistic_info[0].delta_num || 0;
                }
                  yituFace.yitu_dossier("leaving_dossier",[villageCode],function(data){
                    if(data.statistic_info.length>0){
                      resultData.data.peopleRecord.peopleLeaveCount=data.statistic_info[0].delta_num || 0;
                  }
                   afterGetData(resp);
                });
              });
            }).catch(function(){}).finally(function(){
              afterGetData(resultData);
            });
           
          };
          initiInside()

          function afterGetData(data) {
            var bqRecordArrY = [];
            var bqRecordArrX = [];
            var bqRecordLen = data.data.labelRecord.length;
            for (var i = 0; i < bqRecordLen; i++) {
              bqRecordArrX.push(data.data.labelRecord[i].name);
              bqRecordArrY.push(data.data.labelRecord[i].num);
            }
            var ageConfig = {
              "age1": "1-16岁",
              "age2": "17-40岁",
              "age3": "41-60岁",
              "age4": "61-79岁",
              "age5": "80以上"
            };
            var option = {
              // color:['#57b3c3','#3c5dcc'],
              title: {
                text: '男女比例',
                textStyle: {
                  color: '#ffffff'
                },
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              color: ["#eb4b3d", "#ffc001", "#7fb634", "#02b8cd"],
              series: [{
                name: '男女比例',
                type: 'pie',
                radius: '65%',
                center: ['50%', '60%'],
                data: [{
                  // value: getPieData(data.data.genderRecord[0].num, data.data.genderRecord[1].num),
                  value: data.data.genderRecord[0].num,
                  name: '女'
                }, {
                  value: data.data.genderRecord[1].num,
                  name: '男'
                }, ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }]
            };
            var dataFrom = [];
            var len = data.data.peopleTypeRecord.length;
            for (var i = 0; i < len; i++) {
              dataFrom.push({
                value: data.data.peopleTypeRecord[i].num,
                name: data.data.peopleTypeRecord[i].name
              })
            };
            var option1 = {
              // color:['#57b3c3','#3c5dcc'],
              title: {
                text: '户籍比例',
                textStyle: {
                  color: '#ffffff'
                },
                x: 'center'
              },
              color: ["#02b8cd", "#ffc001", "#7fb634", "#eb4b3d"],
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              series: [{
                type: 'pie',
                name: '户籍比例',
                radius: '65%',
                center: ['50%', '60%'],
                data: dataFrom,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }]
            };
            //年龄
            var dataAge = [];
            for (var key in data.data.ageRecord) {
              dataAge.push({
                value: data.data.ageRecord[key],
                name: ageConfig[key]
              })
            }

            function getPieData(x, y) {
              return parseInt(4946 / (x + y) * x)
            }


            function getArrayPie(dataArr) {
              var totalData = 0;
              var nowTotalData = 0;
              //取出总数量
              dataArr.forEach(function(ele, index) {
                totalData += ele.value;
              });
              for (var i = 0; i < dataArr.length; i++) {
                // 记录处理过得
                if (i != dataArr.length - 1) {
                  dataArr[i].value = parseInt(dataArr[i].value / totalData * 4946);
                  nowTotalData += dataArr[i].value;
                } else {
                  dataArr[i].value = 4946 - nowTotalData;
                }
              }

              return dataArr;
            }
            // dataFrom = getArrayPie(dataFrom);
            // dataAge = getArrayPie(dataAge);

            var option2 = {
              title: {
                text: '年龄统计',
                textStyle: {
                  color: '#ffffff'
                },
                x: 'center'
              },
              color: ["#02b8cd", "#ffc001", "#7fb634", "#eb4b3d", "#40f200"],
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              series: [{
                type: 'pie',
                name: '年龄统计',
                radius: '65%',
                center: ['50%', '60%'],
                data: dataAge
              }]
            };
            var option3 = {
              title: {
                text: '人员标签',
                textStyle: {
                  color: '#ffffff'
                },
                x: 'center'
              },
              color: ['#3398DB'],
              tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '20%',
                containLabel: true,
                show: false
              },
              xAxis: [{
                type: 'category',
                data: bqRecordArrX,
                axisTick: {
                  alignWithLabel: true
                },
                axisLabel: {
                  interval: 0,
                  // rotate:45,//倾斜度 -90 至 90 默认为0  
                  margin: 10,
                  color: "#ffffff"
                },
                axisLine: {
                  lineStyle: {
                    color: "#ffffff"
                  }
                }
              }],
              yAxis: [{
                type: 'value',
                axisTick: {
                  length: 1
                },
                axisLabel: {
                  color: "#ffffff"
                },
                axisLine: {
                  lineStyle: {
                    color: "#ffffff"
                  }
                }
              }],
              series: [{
                name: '人员总数',
                type: 'bar',
                barWidth: '60%',
                data: bqRecordArrY,
                barWidth: 30
              }]
            };
            var realPeople = [{
              value: data.data.peopleRecord.peopleCount,
              name: "实际登记人口"
            }, {
              value: data.data.peopleRecord.peopleDiscoveryCount,
              name: "今日感知发现"
            }, {
              value: data.data.peopleRecord.peopleLeaveCount,
              name: "今日感知离开"
            }];
            $scope.allNum = Number(data.data.peopleRecord.peopleDiscoveryCount)+Number(data.data.peopleRecord.peopleLeaveCount);
            $scope.$apply();
            var option4 = {
              title: {
                text: '实有人口',
                textStyle: {
                  color: '#ffffff'
                },
                x: 'center'
              },
              color: ["#02b8cd", "#ffc001", "#7fb634", "#eb4b3d"],
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              series: [{
                type: 'pie',
                name: '实有人口',
                radius: '65%',
                center: ['50%', '60%'],
                data: realPeople
              }]
            };

            echarts.dispose(document.getElementById("main"))
            echarts.dispose(document.getElementById("main1"))
            echarts.dispose(document.getElementById("main2"))
            echarts.dispose(document.getElementById("main3"))
            echarts.dispose(document.getElementById("main4"))
            var myChart = echarts.init(document.getElementById('main'), 'dark');
            var myChart1 = echarts.init(document.getElementById('main1'), 'dark');
            var myChart2 = echarts.init(document.getElementById('main2'), 'dark');
            var myChart3 = echarts.init(document.getElementById('main3'), 'dark');
            var myChart4 = echarts.init(document.getElementById('main4'), 'dark');
            myChart.setOption(option);
            myChart1.setOption(option1);
            myChart2.setOption(option2);
            myChart3.setOption(option3);
            myChart4.setOption(option4);

            myChart.on('click', function(params) {
              urlParam.type = "sexType";
              urlParam.data = params.data;
              toFactPeoplePage();
            });
            myChart1.on('click', function(params) {
              urlParam.type = "fromType";
              urlParam.data = params.data;
              toFactPeoplePage()
            });
            myChart2.on('click', function(params) {
              urlParam.type = "ageType";
              urlParam.data = params.data;
              toFactPeoplePage()
            });
            myChart3.on('click', function(params) {
              urlParam.type = "peopleType";
              urlParam.data = {
                name: params.name,
                value: params.data
              };
              toFactPeoplePage()
            });
            myChart4.on('click', function(params) {
              if ("今日感知发现" == params.data.name || "今日感知离开" == params.data.name) {
                var paramToEvent = {
                  type: "senseFindOrLeave",
                  param: {
                    pageSize: 16,
                    pageNumber: 1
                  }
                };
              } else {
                return;
              }
              localStorage.setItem("factEvent"+villageCode, JSON.stringify(paramToEvent));
              toFactEventPage();
            })
          }

          function toFactPeoplePage() {
            $scope.changeTab('people', true)
          }

          function toFactEventPage() {
            var url = window.location.href.split("/#")[0] + "#/index/factEvent/" + villageCode;
            window.open(url);
          }
          //感知离开发现接口
          // function senceFindAndLeave() {
          //   moreService.querySenceFindAndLeave().then(function(resp) {
          //     //假数据，以后删掉start
          //     resp.data.syrkNum = 4946;
          //     //假数据，以后删掉end
          //     resp.data.discoveryNum = Number(resp.data.discoveryNum);
          //     resp.data.leaveNum = Number(resp.data.leaveNum);
          //     $scope.allNum = resp.data.discoveryNum + resp.data.leaveNum;
          //     var realPeople = [{
          //       value: resp.data.syrkNum,
          //       name: "实际登记人口"
          //     }, {
          //       value: resp.data.discoveryNum,
          //       name: "感知发现"
          //     }, {
          //       value: resp.data.leaveNum,
          //       name: "感知离开"
          //     }];
          //     var option4 = {
          //       title: {
          //         text: '实有人口',
          //         textStyle: {
          //           color: '#ffffff'
          //         },
          //         x: 'center'
          //       },
          //       color: ["#02b8cd", "#ffc001", "#7fb634", "#eb4b3d"],
          //       tooltip: {
          //         trigger: 'item',
          //         formatter: "{a} <br/>{b} : {c} ({d}%)"
          //       },
          //       series: [{
          //         type: 'pie',
          //         name: '实有人口',
          //         radius: '65%',
          //         center: ['50%', '60%'],
          //         data: realPeople
          //       }]
          //     };
          //     echarts.dispose(document.getElementById("main4"))
          //     var myChart4 = echarts.init(document.getElementById('main4'), 'dark');
          //     myChart4.setOption(option4);
          //     myChart4.on('click', function(params) {
          //       if ("感知发现" == params.name) {
          //         var paramToEvent = {
          //           type: "senseFind",
          //           param: {
          //             pageSize: 16,
          //             pageNumber: 1
          //           }
          //         };
          //       } else if ("感知离开" == params.name) {
          //         // moment().subtract(3,"days").format('YYYY-MM-DD HH:mm:ss')
          //         var paramToEvent = {
          //           type: "senseLeave",
          //           param: {
          //             startTime: "",
          //             endTime: "",
          //             pageSize: 10,
          //             pageNumber: 1,
          //             IdentityCard: ""
          //           }
          //         };
          //       } else {
          //         return;
          //       }
          //       localStorage.setItem("factEvent", JSON.stringify(paramToEvent));
          //       toFactEventPage();
          //     });
          //   })
          // }
        };

        /**
         * 人口信息
         * @type {[type]}
         */
        function peopleInfoFun() {
          $scope.initParams = {
            peopleType: "",
            credentialNo: "",
            peopleName: "",
            gender: "",
            nation: "",
            ageStart: "",
            ageEnd: "",
            residenceAddress: "",
            phoneNo: "",
            label: "",
            pageNumber: 1,
            pageSize: 10,
            villageCode: villageCode
          };
          $scope.peopleArrMap = [{
            "bg": "dujulaoren-label",
            "name": "独居老人",
            "active": false
          }, {
            "bg": "jingshenbingren-label",
            "name": "精神病人",
            "active": false
          }, {
            "bg": "anzhibangjiao-label",
            "name": "安置帮教",
            "active": false
          }, {
            "bg": "sheduduixiang-label",
            "name": "涉毒对象",
            "active": false
          }, {
            "bg": "shixianduixiang-label",
            "name": "视线对象",
            "active": false
          }, {
            "bg": "louzuzhang-label",
            "name": "楼组长",
            "active": false
          }, {
            "bg": "zhiyuanzhe-label",
            "name": "志愿者",
            "active": false
          }, {
            "bg": "zhiyuanzhe-label",
            "name": "保安",
            "active": false
          }, {
            "bg": "zhiyuanzhe-label",
            "name": "居委干部",
            "active": false
          }, {
            "bg": "zhiyuanzhe-label",
            "name": "居委消防站",
            "active": false
          }, {
            "bg": "zhiyuanzhe-label",
            "name": "失智人员",
            "active": false
          }
          ];
          $scope.sex = [{
            code: "男",
            name: "男"
          }, {
            code: "女",
            name: "女"
          }];
          $scope.peopleTypeArr = [{
            code: "1",
            name: "户籍人员"
          }, {
            code: "2",
            name: "来沪人员"
          }, {
            code: "3",
            name: "境外人员"
          }];
          $scope.peopleTypeMap = {
            "1":"户籍人员",
            "2":"来沪人员",
            "3":"境外人员",
          }
          $scope.getPeopleType = function(value){
            return $scope.peopleTypeMap[value]
          };
          $scope.peopleTypeCodeMap = {
            "户籍人员":"1",
            "来沪人员":"2",
            "境外人员":"3",
          }
          $scope.getPeopleTypeCodeMap = function(value){
            return $scope.peopleTypeCodeMap[value]
          };
          $scope.page1 = {
            totalRow: 0,
            count: 0
          };

          $scope.selectLabel = function(item) {
            item.active = !item.active;
          };

          //查询1
          $scope.factPeople1 = function(value) {
            debugger
            $scope.loader = true;
            if (value) {
              $scope.initParams.pageNumber = 1;
            }
            $scope.initParams.label = "";
            // $.each($scope.peopleArrMap, function(i, v) {
            //   if (v.active) {
            //     $scope.initParams.label = $scope.initParams.label + v.name + ",";
            //   }
            // })
            // $scope.initParams.label = $scope.initParams.label.substring(0, $scope.initParams.label.length - 1);
            var req1 = {
              label: $scope.initParams.label,
              peopleName: $scope.initParams.peopleName,
              gender: $scope.initParams.gender,
              nation: $scope.initParams.nation,
              credentialNo: $scope.initParams.credentialNo,
              phoneNo: $scope.initParams.phoneNo,
              residenceAddress: $scope.initParams.residenceAddress,
              pageSize: $scope.initParams.pageSize,
              pageNumber: $scope.initParams.pageNumber,
              peopleType: $scope.initParams.peopleType,
              ageStart: $scope.initParams.ageStart,
              ageEnd: $scope.initParams.ageEnd,
              villageCode: $scope.initParams.villageCode
            };

            if ("sexType" == urlParam.type && !value) {
              req1.gender = urlParam.data.name;
              $scope.initParams.gender = req1.gender;
              $scope.$apply();
            } else if ("fromType" == urlParam.type && !value) {
              req1.peopleType = $scope.getPeopleTypeCodeMap(urlParam.data.name);
              $scope.initParams.peopleType = req1.peopleType;
            } else if ("ageType" == urlParam.type && !value) {
              //TODO
              req1.ageStart = urlParam.data.name.split("-")[0].replace(/[^0-9]/ig, "");
              if (urlParam.data.name.split("-")[1]) {
                req1.ageEnd = urlParam.data.name.split("-")[1].replace(/[^0-9]/ig, "");
              } else {
                req1.ageEnd = "";
              }
              $scope.initParams.ageStart = req1.ageStart;
              $scope.initParams.ageEnd = req1.ageEnd;
            } else if ("peopleType" == urlParam.type && !value) {
              debugger
              // $scope.initParams.label = urlParam.data.name;
              $.each($scope.peopleArrMap, function(i, v) {
                if (urlParam.data.name == v.name) {
                  v.active = true;
                }
              });
            } else if ("securityType" == urlParam.type && !value) {
              var len = $scope.peopleArrMap.length;
              $scope.peopleArrMap[len - 2].checked = true;
              $scope.peopleArrMap[len - 1].checked = true;
              req1.label = "楼组长,志愿者";
            }
            $.each($scope.peopleArrMap, function(i, v) {
              if (v.active) {
                $scope.initParams.label = $scope.initParams.label + v.name + ",";
              }
            })
            $scope.initParams.label = $scope.initParams.label.substring(0, $scope.initParams.label.length - 1);
            req1.label = $scope.initParams.label;
            
            var promise = moreService.factPeople(req1);
            promise.then(function(resp) {
              if (resp.resultCode == 200) {
                $scope.factPeople = resp.data.list;
                $.each($scope.factPeople, function(i, v) {
                  if (v.label) {
                    v.labelArr = [];
                    var Arr = v.label.split(',');
                    $.each(Arr, function(j, k) {
                      var obj = {};
                      $.each($scope.peopleArrMap, function(l, m) {
                        if (k == m.name) {
                          obj.bg = m.bg;
                        }
                      })
                      obj.name = k;
                      v.labelArr.push(obj);
                    })
                  }
                })
                $scope.page1.totalRow = resp.data.totalRow;
              }
            }).catch(function() {}).finally(function() {
              $scope.loader = false;
            });
          };
          $scope.factPeople1();

          $timeout(function() {
            var insertHtml = "<label class='control-label pull-left'>实有力量</label>";
            $("#factpeople").find('div').eq(4).append(insertHtml);
            // $(".pagination-wrap .total-count-class").hide();
          }, 20);
        };

        //切换tab
        $scope.showTab = {
          "statistics": true,
          "people": false
        }
        $scope.changeTab = function(tabName, clickTab) {
          for (var key in $scope.showTab) {
            $scope.showTab[key] = false;
          }
          $scope.showTab[tabName] = true;

          if (tabName == "statistics") {
            statisticsFun();
          }
          if (tabName == "people") {
            peopleInfoFun();
          }
        }

        //跳档案
        $scope.lalerPeopleFile = function(index) {
          var id = index;
          var title = "档案";
          url = window.location.href.split("/#")[0] + "/#/index/peoplefile/" + id + "/" + villageCode;
          window.open(url);
        };

        init();
      }
    ];
    return doorRecordCtrl;
  });